import React from 'react';
import { InlineMath } from 'react-katex';
import katex from "katex";
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
                    The Dice Coefficient <InlineMath math="DSC" /> (also called the Dice-Sørensen coefficient) is a statistical tool used to gauge the similarity of two samples. In image segmentation, it measures the overlap between the segmented mask <InlineMath math="X" /> and the ground truth <InlineMath math="Y" />.
                </p>

                <div dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        String.raw`DSC(X,Y) = \frac{2 |X \cap Y|}{|X| + |Y|}`,
                        {
                            throwOnError: false,
                            strict: "ignore",
                            displayMode: true,
                        }
                    )
                }} />
                <p>
                    In binary segmentation, <InlineMath math="DSC" /> is equal to the <InlineMath math="F_1" />-score. More generally, <InlineMath math="F_1" /> is defined as the harmonic mean between precision and recall:
                </p>
                <div dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        String.raw`F_1 = 2*\frac{\text{precision}* \text{recall}}{\text{precision}+\text{recall}}`,
                        {
                            throwOnError: false,
                            strict: "ignore",
                            displayMode: true,
                        }
                    )
                }} />
                <p>
                    Dice has proven itself a popular loss function in segmentation problems, meaning that models learn to minimize <InlineMath math="1- DSC(X,Y)" />
                </p>
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h4>Confusion Matrix Formula</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                        <div dangerouslySetInnerHTML={{
                            __html: katex.renderToString(
                                String.raw`DSC = \frac{2*TP}{2*TP + FP + FN}`,
                                {
                                    throwOnError: false,
                                    strict: "ignore",
                                    displayMode: true,
                                }
                            )
                        }} />
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
                <a href="https://en.wikipedia.org/wiki/Dice-S%C3%B8rensen_coefficient" target="_blank">https://en.wikipedia.org/wiki/Dice-Sørensen_coefficient</a>
                <a href="https://en.wikipedia.org/wiki/F-score" target="_blank">https://en.wikipedia.org/wiki/F-score</a>
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

                <div dangerouslySetInnerHTML={{
                    __html: katex.renderToString(
                        String.raw`IoU(X,Y) = \frac{\text{Area of Overlap}}{\text{Area of Union}} = \frac{|X \cap Y|}{|X \cup Y|}`,
                        {
                            throwOnError: false,
                            strict: "ignore",
                            displayMode: true,
                        }
                    )
                }} />
                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h4>Confusion Matrix Formula</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                        <div dangerouslySetInnerHTML={{
                            __html: katex.renderToString(
                                String.raw`IoU = \frac{TP}{TP + FP + FN}`,
                                {
                                    throwOnError: false,
                                    strict: "ignore",
                                    displayMode: true,
                                }
                            )
                        }} />
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
                <a href="https://en.wikipedia.org/wiki/Jaccard_index#Jaccard_index_in_binary_classification_confusion_matrices" target="_blank">https://en.wikipedia.org/wiki/Jaccard_index</a>
            </div>
        )
    },
    precision: {
        title: "Precision (Specificity/PPV)",
        content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                    Precision goes by many names and is also known as specificity or positive predictive value. It quantifies the fraction of true positives among all predicted samples.
                </p>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h4>Confusion Matrix Formula</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                        <div dangerouslySetInnerHTML={{
                            __html: katex.renderToString(
                                String.raw`\text{Precision} = \frac{TP}{TP + FP}`,
                                {
                                    throwOnError: false,
                                    strict: "ignore",
                                    displayMode: true,
                                }
                            )
                        }} />
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
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        borderTopLeftRadius: '4px',
                                        borderBottomLeftRadius: '4px'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#ef4444',
                                        borderTopRightRadius: '4px',
                                        borderBottomRightRadius: '4px'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="https://en.wikipedia.org/wiki/Precision_and_recall" target="_blank">https://en.wikipedia.org/wiki/Precision_and_recall</a>
            </div>
        )
    },
    accuracy: {
        title: "Accuracy",
        content: (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <p>
                    Accuracy might sound like the "best" metric, but it is almost never used due to its systemic problems especially in segmentation.
                </p>
                <p>
                    Accuracy measures what percentage of the image the model "gets right" which includes background pixels being predicted correctly.
                    Since many segmentation tasks (especially in the medical domain) have an overwhelming share of background compared to foreground, accuracy might be very high if the prediction contains no pixels.
                </p>

                <div style={{ background: '#f8fafc', padding: '1rem', borderRadius: '8px', border: '1px solid #e2e8f0', textAlign: 'center' }}>
                    <h4>Confusion Matrix Formula</h4>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3em' }}>
                        <div dangerouslySetInnerHTML={{
                            __html: katex.renderToString(
                                String.raw`\text{Accuracy} = \frac{TP + TN}{P + N}`,
                                {
                                    throwOnError: false,
                                    strict: "ignore",
                                    displayMode: true,
                                }
                            )
                        }} />
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
                                        color: 'white',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        fontSize: '0.8rem',
                                        borderTopLeftRadius: '4px',
                                        borderBottomLeftRadius: '4px'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#3b82f6'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#f1f5f9'
                                    }}
                                ></div>
                                <div
                                    style={{
                                        width: '30px',
                                        height: '40px',
                                        background: '#ef4444',
                                        borderTopRightRadius: '4px',
                                        borderBottomRightRadius: '4px'
                                    }}
                                ></div>
                            </div>
                        </div>
                    </div>
                </div>
                <a href="https://en.wikipedia.org/wiki/Confusion_matrix" target="_blank">https://en.wikipedia.org/wiki/Confusion_matrix</a>
            </div>
        )
    },
};