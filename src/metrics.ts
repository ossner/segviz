// metrics.ts

// Extensible data payload. Future-proofed for instance/probability data.
export interface MetricData {
  gt: boolean[];
  pred: boolean[];
}

export interface MetricDefinition {
  id: string;
  name: string;
  calculate: (data: MetricData) => number | string;
}

// Helper to calculate the confusion matrix once per metric
const getConfusionMatrix = (gt: boolean[], pred: boolean[]) => {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < gt.length; i++) {
    if (gt[i] && pred[i]) tp++;
    else if (!gt[i] && pred[i]) fp++;
    else if (gt[i] && !pred[i]) fn++;
    else tn++;
  }
  return { tp, fp, fn, tn };
};

export const SEGMENTATION_METRICS: MetricDefinition[] = [
  {
    id: 'dice',
    name: 'Dice Score (F1)',
    calculate: ({ gt, pred }) => {
      const { tp, fp, fn } = getConfusionMatrix(gt, pred);
      if (tp + fp + fn === 0) return 1.0; // Perfect score if both are empty
      return (2 * tp) / (2 * tp + fp + fn);
    }
  },
  {
    id: 'iou',
    name: 'IoU (Jaccard)',
    calculate: ({ gt, pred }) => {
      const { tp, fp, fn } = getConfusionMatrix(gt, pred);
      if (tp + fp + fn === 0) return 1.0;
      return tp / (tp + fp + fn);
    }
  },
  {
    id: 'precision',
    name: 'Precision',
    calculate: ({ gt, pred }) => {
      const { tp, fp } = getConfusionMatrix(gt, pred);
      if (tp + fp === 0) return 0.0;
      return tp / (tp + fp);
    }
  },
  {
    id: 'recall',
    name: 'Recall (Sensitivity)',
    calculate: ({ gt, pred }) => {
      const { tp, fn } = getConfusionMatrix(gt, pred);
      if (tp + fn === 0) return 0.0;
      return tp / (tp + fn);
    }
  },
  {
    id: 'f2',
    name: 'F2 Score',
    calculate: ({ gt, pred }) => {
      const { tp, fp, fn } = getConfusionMatrix(gt, pred);
      if (tp + fp + fn === 0) return 1.0;
      return (5 * tp) / (5 * tp + 4 * fn + fp);
    }
  },
  {
    id: 'f05',
    name: 'F0.5 Score',
    calculate: ({ gt, pred }) => {
      const { tp, fp, fn } = getConfusionMatrix(gt, pred);
      if (tp + fp + fn === 0) return 1.0;
      return (1.25 * tp) / (1.25 * tp + 0.25 * fn + fp);
    }
  },
  {
    id: 'tversky',
    name: 'Tversky Index (\u03B1=0.3, \u03B2=0.7)',
    calculate: ({ gt, pred }) => {
      const { tp, fp, fn } = getConfusionMatrix(gt, pred);
      const alpha = 0.3; // Weight of False Positives
      const beta = 0.7;  // Weight of False Negatives
      if (tp + fp + fn === 0) return 1.0;
      return tp / (tp + alpha * fp + beta * fn);
    }
  },
  {
    id: 'ce',
    name: 'Binary Cross-Entropy',
    calculate: ({ gt, pred }) => {
      if (gt.length === 0) return 0.0;
      let loss = 0;
      const eps = 1e-7; // Prevent log(0)
      for (let i = 0; i < gt.length; i++) {
        const y = gt[i] ? 1 : 0;
        const yHat = pred[i] ? (1 - eps) : eps;
        loss += -(y * Math.log(yHat) + (1 - y) * Math.log(1 - yHat));
      }
      return loss / gt.length;
    }
  },
  {
    id: 'focal',
    name: 'Focal Loss (\u03B3=2)',
    calculate: ({ gt, pred }) => {
      if (gt.length === 0) return 0.0;
      let loss = 0;
      const eps = 1e-7;
      const gamma = 2;
      for (let i = 0; i < gt.length; i++) {
        const y = gt[i] ? 1 : 0;
        const yHat = pred[i] ? (1 - eps) : eps;
        if (y === 1) {
          loss += -Math.pow(1 - yHat, gamma) * Math.log(yHat);
        } else {
          loss += -Math.pow(yHat, gamma) * Math.log(1 - yHat);
        }
      }
      return loss / gt.length;
    }
  }
];