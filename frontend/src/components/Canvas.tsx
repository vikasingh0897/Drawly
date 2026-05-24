import { useEffect, useRef, useState } from 'react';
import { socket } from '../socket';

interface CanvasProps {
  roomId: string;
  isDrawer: boolean;
}

export default function Canvas({ roomId, isDrawer }: CanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [color, setColor] = useState('#000000');

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!ctx) return;

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 5;

    const handleDrawData = (data: { x: number; y: number; color: string; type: string }) => {
      ctx.strokeStyle = data.color;
      if (data.type === 'start') {
        ctx.beginPath();
        ctx.moveTo(data.x, data.y);
      } else if (data.type === 'move') {
        ctx.lineTo(data.x, data.y);
        ctx.stroke();
      }
    };

    const handleClear = () => {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height);
      ctx.beginPath();
    };

    socket.on('draw_data', handleDrawData);
    socket.on('canvas_clear', handleClear);

    return () => {
      socket.off('draw_data', handleDrawData);
      socket.off('canvas_clear', handleClear);
    };
  }, []);

  const getCoordinates = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;
    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY,
    };
  };

  const startDrawing = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawer) return;
    setIsDrawing(true);
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.moveTo(x, y);
    }
    socket.emit('draw_data', { roomId, x, y, color, type: 'start' });
  };

  const draw = (e: React.PointerEvent<HTMLCanvasElement>) => {
    if (!isDrawing || !isDrawer) return;
    const { x, y } = getCoordinates(e);
    const ctx = canvasRef.current?.getContext('2d');
    if (ctx) {
      ctx.lineTo(x, y);
      ctx.stroke();
    }
    socket.emit('draw_data', { roomId, x, y, color, type: 'move' });
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    if (!isDrawer) return;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (ctx && canvas) {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.beginPath();
    }
    socket.emit('canvas_clear', roomId);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-[800px] order-1 lg:order-2 shrink-0 lg:shrink">
      {isDrawer && (
        <div className="mb-2 flex gap-3 items-center justify-center w-full shrink-0">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="cursor-pointer w-8 h-8 p-0 border-0 rounded shadow bg-transparent"
          />
          <button
            onClick={clearCanvas}
            className="py-1.5 px-3 bg-[var(--color-surface-container-high)] text-[var(--color-on-surface)] border border-[var(--color-outline-variant)] rounded-[var(--radius-full)] text-xs font-semibold transition-colors cursor-pointer shadow-sm"
          >
            Clear
          </button>
        </div>
      )}

      {/* Enforce a maximum height limit on mobile dashboards to guarantee layout space */}
      <div className="w-full bg-white border-2 border-[var(--color-outline-variant)] rounded-[var(--radius-lg)] shadow-sm overflow-hidden aspect-[4/3] max-h-[35vh] sm:max-h-[45vh] lg:max-h-none">
        <canvas
          ref={canvasRef}
          width={800}
          height={600}
          className="w-full h-full touch-none"
          style={{ cursor: isDrawer ? 'crosshair' : 'not-allowed' }}
          onPointerDown={startDrawing}
          onPointerMove={draw}
          onPointerUp={stopDrawing}
          onPointerOut={stopDrawing}
        />
      </div>
    </div>
  );
}
