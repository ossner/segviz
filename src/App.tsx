import React, { useState } from 'react';
import { GridCanvas } from './GridCanvas';
import type { DrawMode } from './types';
import { MetricsPanel } from './MetricsPanel';

export const App: React.FC = () => {
    const [gridSize, setGridSize] = useState<number>(32);
    const [drawMode, setDrawMode] = useState<DrawMode>('pred');
    const [gtData, setGtData] = useState<boolean[]>([]);
    const [predData, setPredData] = useState<boolean[]>([]);
    const [clearTrigger, setClearTrigger] = useState<number>(0);

    const handleUpdate = (gt: boolean[], pred: boolean[]) => {
        setGtData(gt);
        setPredData(pred);
    };

    return (
        <div style={{ display: 'flex', gap: '2rem', padding: '2rem', fontFamily: 'sans-serif' }}>

            {/* LEFT COLUMN: Controls & Canvas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2>Segmentation Visualizer</h2>

                {/* Controls */}
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                    <label>
                        Grid Size: {gridSize}x{gridSize}
                        <input
                            type="range"
                            min="16" max="64" step="16"
                            value={gridSize}
                            onChange={(e) => setGridSize(Number(e.target.value))}
                            style={{ marginLeft: '10px' }}
                        />
                    </label>
                </div>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className='pred-button'
                        onClick={() => setDrawMode('pred')}
                    >
                        ✏️ Prediction Pen
                    </button>
                    <button className='gt-button'
                        onClick={() => setDrawMode('gt')}
                    >
                        ✏️ Ground Truth Pen
                    </button>
                    <button className='erase-button'
                        onClick={() => setDrawMode('erase')}
                    >
                        🧼 Eraser
                    </button>
                    <button
                        onClick={() => setClearTrigger(prev => prev + 1)}
                        style={{ marginLeft: 'auto', backgroundColor: '#fee2e2', color: '#991b1b', border: '1px solid #fca5a5', borderRadius: '4px', cursor: 'pointer' }}
                    >
                        Clear Canvas
                    </button>
                </div>

                <GridCanvas
                    gridSize={gridSize}
                    canvasSize={512}
                    drawMode={drawMode}
                    clearTrigger={clearTrigger}
                    onUpdate={handleUpdate}
                />
            </div>

            <div style={{ flex: 1, overflow: 'hidden' }}>
                <MetricsPanel gt={gtData} pred={predData} />
            </div>
            
        </div>
    );
};

export default App;