import React from 'react';

interface ConfusionMatrixProps {
  gt: boolean[];
  pred: boolean[];
}

export const ConfusionMatrix: React.FC<ConfusionMatrixProps> = ({ gt, pred }) => {
  let tp = 0, fp = 0, fn = 0, tn = 0;
  for (let i = 0; i < gt.length; i++) {
    if (gt[i] && pred[i]) tp++;
    else if (!gt[i] && pred[i]) fp++;
    else if (gt[i] && !pred[i]) fn++;
    else tn++;
  }

  const total = gt.length || 1;

  const cellStyle = (bgColor: string, textColor: string = 'white'): React.CSSProperties => ({
    backgroundColor: bgColor,
    color: textColor,
    padding: '1.25rem',
    borderRadius: '8px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: '120px',
    boxShadow: 'inset 0 0 10px rgba(0,0,0,0.05)'
  });

  const labelStyle: React.CSSProperties = {
    fontSize: '0.75rem',
    textTransform: 'uppercase',
    fontWeight: 'bold',
    marginBottom: '4px',
    opacity: 0.9
  };

  const countStyle: React.CSSProperties = {
    fontSize: '1.5rem',
    fontWeight: '800'
  };

  return (
    <div style={{ marginTop: '0rem', marginBottom: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ marginBottom: '1rem', marginTop: '0rem', color: '#475569' }}>Confusion Matrix</h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr 1fr', gap: '10px', alignItems: 'center' }}>
        {/* Empty corner */}
        <div></div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#ef4444' }}>Pred Positive</div>
        <div style={{ textAlign: 'center', fontWeight: 'bold', color: '#64748b' }}>Pred Negative</div>

        {/* Row 1: GT Positive */}
        <div style={{ fontWeight: 'bold', marginRight:'10px', color: '#3b82f6', transform: 'rotate(-90deg)', height: '0', width: '0', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            GT Positive
        </div>
        <div style={cellStyle('#22c55e')}>
          <span style={labelStyle}>TP (Green)</span>
          <span style={countStyle}>{tp}</span>
          <span style={{ fontSize: '0.7rem' }}>{((tp/total)*100).toFixed(1)}%</span>
        </div>
        <div style={cellStyle('#3b82f6')}>
          <span style={labelStyle}>FN (Blue)</span>
          <span style={countStyle}>{fn}</span>
          <span style={{ fontSize: '0.7rem' }}>{((fn/total)*100).toFixed(1)}%</span>
        </div>

        {/* Row 2: GT Negative */}
        <div style={{ fontWeight: 'bold', marginRight:'10px',color: '#64748b', transform: 'rotate(-90deg)', height: '0', width: '0', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            GT Negative
        </div>
        <div style={cellStyle('#ef4444')}>
          <span style={labelStyle}>FP (Red)</span>
          <span style={countStyle}>{fp}</span>
          <span style={{ fontSize: '0.7rem' }}>{((fp/total)*100).toFixed(1)}%</span>
        </div>
        <div style={cellStyle('#f1f5f9', '#64748b')}>
          <span style={labelStyle}>TN</span>
          <span style={countStyle}>{tn}</span>
          <span style={{ fontSize: '0.7rem' }}>{((tn/total)*100).toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};