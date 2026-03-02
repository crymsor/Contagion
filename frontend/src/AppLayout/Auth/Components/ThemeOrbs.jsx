import { useState, useRef, useEffect } from 'react';

const ThemeOrbs = ({ orbs, containerRef }) => {
  const animRef = useRef(null);

  useEffect(() => {
    const canvas = containerRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      orbs.forEach((o) => {
        o.angle += o.speed;
        const cx =
          (o.x + Math.sin(o.angle) * o.sineX) * canvas.width;
        const cy =
          (o.y + Math.cos(o.angle * o.cosY) * o.cosX) * canvas.height;
        const r = o.r * Math.min(canvas.width, canvas.height);
        const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        g.addColorStop(0, `rgba(${o.color},0.13)`);
        g.addColorStop(0.5, `rgba(${o.color},0.045)`);
        g.addColorStop(1, `rgba(${o.color},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.fill();
      });
      animRef.current = requestAnimationFrame(draw);
    };
    animRef.current = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, [orbs, containerRef]);

  return (
    <canvas
      ref={containerRef}
      className="absolute inset-0 pointer-events-none"
    />
  );
};

export default ThemeOrbs;
