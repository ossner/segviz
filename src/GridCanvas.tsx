import React, { useRef, useEffect, useState, useCallback } from 'react';
import type { DrawMode } from './types';

interface GridCanvasProps {
    gridSize: number;
    canvasSize: number;
    drawMode: DrawMode;
    clearTrigger: number;
    onUpdate: (gt: boolean[], pred: boolean[]) => void;
}

export const GridCanvas: React.FC<GridCanvasProps> = ({
    gridSize,
    canvasSize,
    drawMode,
    clearTrigger,
    onUpdate,
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [isDrawing, setIsDrawing] = useState(false);

    // We keep local references of the arrays to update the canvas instantly
    const gtRef = useRef<boolean[]>(new Array(gridSize * gridSize).fill(false));
    const predRef = useRef<boolean[]>(new Array(gridSize * gridSize).fill(false));

    // Reset arrays if grid size changes
    useEffect(() => {
        gtRef.current = new Array(gridSize * gridSize).fill(false);
        predRef.current = new Array(gridSize * gridSize).fill(false);
        drawCanvas();
        onUpdate(gtRef.current, predRef.current);
    }, [gridSize, clearTrigger]);

    const drawCanvas = useCallback(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const cellSize = canvasSize / gridSize;
        ctx.clearRect(0, 0, canvasSize, canvasSize);

        // Draw pixels
        for (let i = 0; i < gridSize * gridSize; i++) {
            const x = (i % gridSize) * cellSize;
            const y = Math.floor(i / gridSize) * cellSize;

            const isGt = gtRef.current[i];
            const isPred = predRef.current[i];

            if (isGt && isPred) {
                ctx.fillStyle = '#22c55e'; // Green (Intersection / TP)
            } else if (isGt) {
                ctx.fillStyle = '#3b82f6'; // Blue (Ground Truth / FN)
            } else if (isPred) {
                ctx.fillStyle = '#ef4444'; // Red (Prediction / FP)
            } else {
                ctx.fillStyle = '#f8fafc'; // Default empty
            }

            ctx.fillRect(x, y, cellSize, cellSize);

            // Optional: Light grid lines for smaller grids
            if (gridSize <= 32) {
                ctx.strokeStyle = '#e2e8f0';
                ctx.strokeRect(x, y, cellSize, cellSize);
            }
        }
    }, [gridSize, canvasSize]);

    const handleDraw = (e: React.MouseEvent<HTMLCanvasElement>) => {
        if (!isDrawing) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const cellSize = canvasSize / gridSize;
        const gridX = Math.floor(x / cellSize);
        const gridY = Math.floor(y / cellSize);

        if (gridX >= 0 && gridX < gridSize && gridY >= 0 && gridY < gridSize) {
            const index = gridY * gridSize + gridX;

            let changed = false;
            if (drawMode === 'gt' && !gtRef.current[index]) {
                gtRef.current[index] = true;
                changed = true;
            } else if (drawMode === 'pred' && !predRef.current[index]) {
                predRef.current[index] = true;
                changed = true;
            } else if (drawMode === 'erase' && (gtRef.current[index] || predRef.current[index])) {
                gtRef.current[index] = false;
                predRef.current[index] = false;
                changed = true;
            }

            if (changed) drawCanvas();
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width={canvasSize}
            height={canvasSize}
            style={{ cursor: 'crosshair', border: '1px solid #cbd5e1' }}
            onMouseDown={(e) => { setIsDrawing(true); handleDraw(e); }}
            onMouseMove={handleDraw}
            onMouseUp={() => {
                setIsDrawing(false);
                // Lift state up only when stroke finishes to prevent React render lag
                onUpdate([...gtRef.current], [...predRef.current]);
            }}
            onMouseLeave={() => setIsDrawing(false)}
        />
    );
};