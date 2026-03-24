import React, { useState, useEffect } from 'react';
import { GridCanvas } from './GridCanvas';
import type { DrawMode } from './types';
import { MetricsPanel } from './MetricsPanel';
import { ConfusionMatrix } from './ConfusionMatrix';
import { FaGithub, FaLinkedin } from "react-icons/fa";
import 'katex/dist/katex.min.css';
import { InfoModal } from './InfoModal';
import { METRIC_RICH_CONTENT } from './metricLibrary';

interface ToolButtonProps {
    label: string;
    color: string;
    active: boolean;
    onClick: () => void;
}

const ToolButton: React.FC<ToolButtonProps> = ({ label, color, active, onClick }) => {
    const style: React.CSSProperties = {
        padding: '8px 16px',
        borderRadius: '6px',
        cursor: 'pointer',
        fontWeight: 'bold',
        transition: 'all 0.2s ease',
        border: `2px solid ${color}`,
        backgroundColor: active ? 'transparent' : color,
        color: active ? color : '#ffffff',
    };

    return <button style={style} onClick={onClick}>{label}</button>;
};

export const App: React.FC = () => {
    const [gridSize, setGridSize] = useState<number>(32);
    const [brushSize, setBrushSize] = useState<number>(2);
    const [drawMode, setDrawMode] = useState<DrawMode>('pred');
    const [gtData, setGtData] = useState<boolean[]>([]);
    const [predData, setPredData] = useState<boolean[]>([]);
    const [clearTrigger, setClearTrigger] = useState<number>(0);
    const [activeModalMetricId, setActiveModalMetricId] = useState<string | null>(null);
    const [persistedId, setPersistedId] = useState<string | null>(null);
    useEffect(() => {
        if (activeModalMetricId) {
            setPersistedId(activeModalMetricId);
        }
    }, [activeModalMetricId]);
    const handleOpenModal = (id: string) => setActiveModalMetricId(id);
    const handleCloseModal = () => setActiveModalMetricId(null);
    const modalData = persistedId ? METRIC_RICH_CONTENT[persistedId] : null;
    return (
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
            <div style={{ display: 'flex', gap: '3rem', padding: '1rem', flex: '0 0 auto' }}>

                {/* Top Left */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <header>
                        <h1 style={{ margin: '0rem', fontSize: '1.5rem' }}>Segmentation Lab <img src='/favicon.svg' style={{width: '7%', marginTop:'0px', marginBottom: '-2px'}}></img></h1>
                    </header>

                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', background: '#ffffff', padding: '0rem', borderRadius: '8px' }}>
                        <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                            Grid: {gridSize} x {gridSize}
                            <input type="range" min="16" max="128" step="16" value={gridSize} onChange={e => setGridSize(Number(e.target.value))} style={{ display: 'block', marginTop: '1px' }} />
                        </label>
                        <label style={{ fontSize: '0.9rem', fontWeight: 'bold' }}>
                            Brush: {brushSize} x {brushSize}
                            <input type="range" min="1" max="10" step="1" value={brushSize} onChange={e => setBrushSize(Number(e.target.value))} style={{ display: 'block', marginTop: '1px' }} />
                        </label>
                    </div>

                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <ToolButton label="Ground Truth" color="#3b82f6" active={drawMode === 'gt'} onClick={() => setDrawMode('gt')} />
                        <ToolButton label="Prediction" color="#ef4444" active={drawMode === 'pred'} onClick={() => setDrawMode('pred')} />
                        <ToolButton label="Eraser" color="#64748b" active={drawMode === 'erase'} onClick={() => setDrawMode('erase')} />
                        <button
                            onClick={() => setClearTrigger(t => t + 1)}
                            style={{ marginLeft: 'auto', border: 'none', background: 'none', color: '#94a3b8', cursor: 'pointer', textDecoration: 'underline' }}
                        >
                            Clear All
                        </button>
                    </div>

                    <GridCanvas
                        gridSize={gridSize}
                        canvasSize={512}
                        drawMode={drawMode}
                        brushSize={brushSize}
                        clearTrigger={clearTrigger}
                        onUpdate={(gt, pred) => { setGtData(gt); setPredData(pred); }}
                    />
                </div>

                {/* Top Right */}
                <div style={{ flex: 1, height: '700px' }}>
                    <MetricsPanel gt={gtData} pred={predData} onShowInfo={handleOpenModal} />
                </div>
            </div>
            <div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', padding: '0 2rem 2rem 3rem' }}>
                    {/* Bottom Left */}
                    <ConfusionMatrix gt={gtData} pred={predData} />

                    {/* Bottom Right */}
                    <section style={{ backgroundColor: '#ffffff', padding: '0rem 0' }}>
                        Not sure what will go in this corner yet...
                        Perhaps instance information? Perhaps nothing?
                    </section>

                </div>
            </div>
            <article style={{ padding: '1rem 2rem', background: '#ffffff', borderTop: '1px solid #e2e8f0', flex: 1 }}>
                <div style={{ maxWidth: '800px', margin: '0 auto', lineHeight: '1.6' }}>
                    <h2>Metric Deep-Dive</h2>
                    <p>Lorem Ipsum etc. etc.</p>
                </div>
            </article>
            <footer className="border-t border-gray-200 py-10 px-4 mt-20">
                <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">

                    <p className="text-gray-500 text-sm font-medium">
                        © {new Date().getFullYear()} Sebastian Oßner
                    </p>

                    <div className="flex items-center gap-5">
                        <a
                            href="https://github.com/ossner"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="GitHub"
                            className="text-gray-400 hover:text-black transition-all duration-300"
                        >
                            <FaGithub size={24} />
                        </a>
                        <a
                            href="https://linkedin.com/in/ossner"
                            target="_blank"
                            rel="noopener noreferrer"
                            aria-label="LinkedIn"
                            className="text-gray-400 hover:text-[#0077b5] transition-all duration-300"
                        >
                            <FaLinkedin size={24} />
                        </a>
                    </div>

                </div>
            </footer>
            <InfoModal
                isOpen={!!activeModalMetricId}
                onClose={handleCloseModal}
                title={modalData?.title || ""}
            >
                {modalData?.content}
            </InfoModal>
        </div>
    );
};

export default App;