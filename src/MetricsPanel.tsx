import React, { useState } from 'react';
import type {
    MetricData
} from './metrics';
import {
    SEGMENTATION_METRICS
} from './metrics';
import { MetricItem } from './MetricItem';

interface MetricsPanelProps {
    gt: boolean[];
    pred: boolean[];
}

export const MetricsPanel: React.FC<MetricsPanelProps> = ({ gt, pred }) => {
    const [pinnedIds, setPinnedIds] = useState<Set<string>>(new Set(['dice', 'iou']));

    const togglePin = (id: string) => {
        setPinnedIds(prev => {
            const newPinned = new Set(prev);
            if (newPinned.has(id)) {
                newPinned.delete(id);
            } else {
                newPinned.add(id);
            }
            return newPinned;
        });
    };

    const data: MetricData = { gt, pred };

    // Separate metrics into pinned and unpinned arrays
    const pinnedMetrics = SEGMENTATION_METRICS.filter(m => pinnedIds.has(m.id));
    const unpinnedMetrics = SEGMENTATION_METRICS.filter(m => !pinnedIds.has(m.id));

    return (
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', minWidth: '350px' }}>

            <h3 style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '0.5rem', marginTop: 0 }}>
                Evaluation Metrics
            </h3>

            <div style={{ flex: 1, overflowY: 'auto', paddingRight: '10px' }}>
                {pinnedMetrics.length > 0 && (
                    <div style={{ marginBottom: '2rem' }}>
                        <h4 style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', position: 'sticky', top: 0, backgroundColor: 'white' }}>
                            Pinned
                        </h4>
                        {pinnedMetrics.map(metric => (
                            <MetricItem key={`pinned-${metric.id}`} metric={metric} data={data} isPinned={true} onTogglePin={togglePin} />
                        ))}
                    </div>
                )}

                <div>
                    <h4 style={{ color: '#64748b', fontSize: '0.875rem', textTransform: 'uppercase', position: 'sticky', top: 0, backgroundColor: 'white' }}>
                        All Metrics
                    </h4>
                    {unpinnedMetrics.map(metric => (
                        <MetricItem key={`unpinned-${metric.id}`} metric={metric} data={data} isPinned={false} onTogglePin={togglePin} />
                    ))}
                </div>
            </div>

        </div>);
};