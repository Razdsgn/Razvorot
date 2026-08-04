"use client";

import { useEffect, useRef, useState } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  baseSize: number;
}

export default function DynamicBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const particlesRef = useRef<Particle[]>([]);
  const animationRef = useRef<number>();
  const hueRef = useRef(0);

  const PARTICLE_COUNT = 150;
  const MAX_DIST = 150;
  const MOUSE_RADIUS = 120;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initParticles();
    };

    const initParticles = () => {
      const w = canvas.width;
      const h = canvas.height;
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        size: Math.random() * 3 + 1.5,
        baseSize: Math.random() * 3 + 1.5,
      }));
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMouse({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();

    const draw = () => {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Плавно меняем оттенок (hue) каждую секунду
      hueRef.current += 0.08;
      const baseHue = (hueRef.current % 360) / 360;

      // Обновляем частицы
      const particles = particlesRef.current;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;

        // Случайное блуждание
        p.vx += (Math.random() - 0.5) * 0.04;
        p.vy += (Math.random() - 0.5) * 0.04;
        // Ограничиваем скорость
        const maxSpeed = 0.6;
        const speed = Math.hypot(p.vx, p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        // Отталкивание от мыши
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < MOUSE_RADIUS && dist > 0) {
          const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS;
          const angle = Math.atan2(dy, dx);
          const push = force * 0.5;
          p.vx += Math.cos(angle) * push;
          p.vy += Math.sin(angle) * push;
        }

        // Отражение от границ
        if (p.x < 0) { p.x = 0; p.vx *= -0.5; }
        if (p.x > w) { p.x = w; p.vx *= -0.5; }
        if (p.y < 0) { p.y = 0; p.vy *= -0.5; }
        if (p.y > h) { p.y = h; p.vy *= -0.5; }
      }

      // Отрисовка соединений (линий)
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.hypot(dx, dy);
          if (dist < MAX_DIST) {
            const alpha = 1 - dist / MAX_DIST;
            const hue = (baseHue + i * 0.001) % 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = `hsla(${hue * 360 + 230}, 80%, 70%, ${alpha * 0.4})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Отрисовка частиц
      for (const p of particles) {
        const hue = (baseHue + p.x * 0.0005) % 1;
        const radius = p.size * (0.8 + 0.4 * Math.sin(Date.now() * 0.002 + p.x));
        ctx.beginPath();
        ctx.arc(p.x, p.y, radius, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${hue * 360 + 230}, 90%, 70%, 0.7)`;
        ctx.shadowColor = `hsla(${hue * 360 + 230}, 90%, 70%, 0.3)`;
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouse]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 -z-10 block h-full w-full"
      style={{ background: "var(--background)" }}
    />
  );
}