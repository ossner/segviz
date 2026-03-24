import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

export interface MetricDefinitionRich {
    title: string;
    content: React.ReactNode;
}

export const METRIC_RICH_CONTENT: Record<string, MetricDefinitionRich> = {
    dice: {
        title: "Dice Similarity Coefficient (F1-Score)",
        content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                    The Dice Coefficient <InlineMath math="DSC" /> is a statistical tool used to gauge the similarity of two samples. In image segmentation, it measures the overlap between the segmented mask (<InlineMath math="X" />) and the ground truth (<InlineMath math="Y" />).
                </p>

                <BlockMath math="DSC = \frac{2 |X \cap Y|}{|X| + |Y|}" />

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h4>Confusion Matrix Formula</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                        <BlockMath math="DSC = \frac{2*TP}{2*TP + FP + FN}" />

                        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Numerator */}
                            <div
                                style={{
                                    width: '30px',
                                    height: '40px',
                                    background: '#22c55e',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    borderRadius: '4px'
                                }}
                            >2x</div>

                            {/* Fraction bar */}
                            <div style={{ width: '100%', height: '2px', background: '#334155', margin: '4px 0' }} />

                            {/* Denominator */}
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#22c55e',
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        borderTopLeftRadius: '4px',
                                        borderBottomLeftRadius: '4px'
                                    }}
                                >2x</div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#ef4444'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#3b82f6',
                                        borderTopRightRadius: '4px',
                                        borderBottomRightRadius: '4px'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        )
    },
    iou: {
        title: "Intersection over Union (Jaccard Index)",
        content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                    The IoU <InlineMath math="IoU" /> is the standard metric for object detection and semantic segmentation challenges. It calculates the ratio of the intersection area to the union area of the two masks.
                </p>

                <BlockMath math="IoU = \frac{\text{Area of Overlap}}{\text{Area of Union}} = \frac{|X \cap Y|}{|X \cup Y|}" />

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h4>Confusion Matrix Formula</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                        <BlockMath math="IoU = \frac{TP}{TP + FP + FN}" />

                        <div style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center' }}>
                            {/* Numerator */}
                            <div
                                style={{
                                    width: '30px',
                                    height: '40px',
                                    background: '#22c55e',
                                    color: 'white',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    fontSize: '0.8rem',
                                    borderRadius: '4px'
                                }}
                            ></div>

                            {/* Fraction bar */}
                            <div style={{ width: '100%', height: '2px', background: '#334155', margin: '4px 0' }} />

                            {/* Denominator */}
                            <div style={{ display: 'flex' }}>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#22c55e',
                                        borderTopLeftRadius: '4px',
                                        borderBottomLeftRadius: '4px'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#ef4444'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#3b82f6',
                                        borderTopRightRadius: '4px',
                                        borderBottomRightRadius: '4px'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    },
};