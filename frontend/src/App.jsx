import { useRef, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './AppLayout/Auth/LoginPage';
import RegisterPage from './AppLayout/Auth/RegisterPage';
import ForgotPasswordPage from './AppLayout/Auth/ForgotPasswordPage';
import DashboardPage from './AppLayout/Dashboard/DashboardPage';

/* ── Custom cursor ─────────────────────────────────────────── */
const Cursor = () => {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ x: -100, y: -100 });
  const ringPos = useRef({ x: -100, y: -100 });
  const rafId   = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', onMove, { passive: true });

    const lerp = (a, b, t) => a + (b - a) * t;

    const loop = () => {
      if (dotRef.current) {
        dotRef.current.style.left = `${posRef.current.x}px`;
        dotRef.current.style.top  = `${posRef.current.y}px`;
      }
      if (ringRef.current) {
        ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.12);
        ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.12);
        ringRef.current.style.left = `${ringPos.current.x}px`;
        ringRef.current.style.top  = `${ringPos.current.y}px`;
      }
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);

    const onDown = () => {
      dotRef.current?.style.setProperty('width', '6px');
      dotRef.current?.style.setProperty('height', '6px');
      ringRef.current?.style.setProperty('width', '48px');
      ringRef.current?.style.setProperty('height', '48px');
    };
    const onUp = () => {
      dotRef.current?.style.setProperty('width', '12px');
      dotRef.current?.style.setProperty('height', '12px');
      ringRef.current?.style.setProperty('width', '36px');
      ringRef.current?.style.setProperty('height', '36px');
    };
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="custom-cursor" />
      <div ref={ringRef} className="custom-cursor-ring" />
    </>
  );
};

/* ── App Component ─────────────────────────────────────────── */
function App() {
  return (
    <BrowserRouter>
      <Cursor />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
