'use client';
import React, { useRef, useEffect, useCallback } from 'react';

interface Star {
    x: number;
    y: number;
    z: number;
    radius: number;
    opacity: number;
    color: string;
}

interface ShootingStar {
    x: number;
    y: number;
    length: number;
    speed: number;
    angle: number;
    opacity: number;
    life: number;
    maxLife: number;
}

interface Nebula {
    x: number;
    y: number;
    radius: number;
    color: string;
    opacity: number;
    pulseSpeed: number;
    pulsePhase: number;
}

const STAR_COLORS = ['#ffffff', '#c8d8ff', '#aabfff', '#ffd2a1', '#ffcccc', '#e0e0ff'];

const StarField: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const starsRef = useRef<Star[]>([]);
    const shootingStarsRef = useRef<ShootingStar[]>([]);
    const nebulaeRef = useRef<Nebula[]>([]);
    const animFrameRef = useRef<number>(0);
    const scrollRef = useRef(0);
    const mouseRef = useRef({ x: 0, y: 0 });

    const initStars = useCallback((width: number, height: number) => {
        const count = Math.min(Math.floor((width * height) / 2500), 600);
        const stars: Star[] = [];
        for (let i = 0; i < count; i++) {
            stars.push({
                x: Math.random() * width,
                y: Math.random() * height * 5,
                z: Math.random() * 3 + 0.5,
                radius: Math.random() * 1.8 + 0.3,
                opacity: Math.random() * 0.7 + 0.3,
                color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
            });
        }
        starsRef.current = stars;

        const nebulae: Nebula[] = [];
        const nebulaColors = [
            'rgba(95, 39, 205, 0.03)',
            'rgba(0, 240, 255, 0.02)',
            'rgba(138, 43, 226, 0.025)',
            'rgba(75, 0, 130, 0.03)',
            'rgba(0, 100, 255, 0.02)',
        ];
        for (let i = 0; i < 8; i++) {
            nebulae.push({
                x: Math.random() * width,
                y: Math.random() * height * 5,
                radius: Math.random() * 400 + 200,
                color: nebulaColors[Math.floor(Math.random() * nebulaColors.length)],
                opacity: Math.random() * 0.5 + 0.3,
                pulseSpeed: Math.random() * 0.002 + 0.001,
                pulsePhase: Math.random() * Math.PI * 2,
            });
        }
        nebulaeRef.current = nebulae;
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initStars(canvas.width, canvas.height);
        };
        resize();
        window.addEventListener('resize', resize);

        const handleScroll = () => {
            scrollRef.current = window.scrollY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });

        const handleMouse = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouse, { passive: true });

        let time = 0;
        const animate = () => {
            time += 0.016;
            const { width, height } = canvas;
            ctx.clearRect(0, 0, width, height);

            const scroll = scrollRef.current;
            const mx = (mouseRef.current.x / width - 0.5) * 2;
            const my = (mouseRef.current.y / height - 0.5) * 2;

            // Draw nebulae
            nebulaeRef.current.forEach((n) => {
                const parallaxY = n.y - scroll * 0.15;
                const pulse = Math.sin(time * n.pulseSpeed * 60 + n.pulsePhase) * 0.3 + 0.7;
                const grad = ctx.createRadialGradient(
                    n.x + mx * 10, parallaxY % (height * 5) + my * 10, 0,
                    n.x + mx * 10, parallaxY % (height * 5) + my * 10, n.radius
                );
                grad.addColorStop(0, n.color);
                grad.addColorStop(1, 'transparent');
                ctx.globalAlpha = n.opacity * pulse;
                ctx.fillStyle = grad;
                ctx.fillRect(
                    n.x - n.radius + mx * 10,
                    (parallaxY % (height * 5)) - n.radius + my * 10,
                    n.radius * 2,
                    n.radius * 2
                );
            });

            // Draw stars
            starsRef.current.forEach((star) => {
                const parallaxX = star.x + mx * star.z * 8;
                const parallaxY = (star.y - scroll * star.z * 0.3) % (height * 5);
                const adjustedY = parallaxY < -10 ? parallaxY + height * 5 : parallaxY;

                if (adjustedY < -10 || adjustedY > height + 10) return;

                const twinkle = Math.sin(time * (1 + star.z) + star.x) * 0.3 + 0.7;
                ctx.globalAlpha = star.opacity * twinkle;
                ctx.fillStyle = star.color;
                ctx.beginPath();
                ctx.arc(parallaxX, adjustedY, star.radius * star.z * 0.5, 0, Math.PI * 2);
                ctx.fill();

                // Add glow for brighter stars
                if (star.radius > 1.2) {
                    ctx.globalAlpha = star.opacity * twinkle * 0.15;
                    ctx.beginPath();
                    ctx.arc(parallaxX, adjustedY, star.radius * star.z * 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            // Shooting stars
            if (Math.random() < 0.003) {
                shootingStarsRef.current.push({
                    x: Math.random() * width,
                    y: Math.random() * height * 0.5,
                    length: Math.random() * 120 + 60,
                    speed: Math.random() * 12 + 8,
                    angle: Math.PI / 4 + (Math.random() - 0.5) * 0.3,
                    opacity: 1,
                    life: 0,
                    maxLife: Math.random() * 40 + 30,
                });
            }

            shootingStarsRef.current = shootingStarsRef.current.filter((ss) => {
                ss.life++;
                ss.x += Math.cos(ss.angle) * ss.speed;
                ss.y += Math.sin(ss.angle) * ss.speed;
                ss.opacity = 1 - ss.life / ss.maxLife;

                const grad = ctx.createLinearGradient(
                    ss.x, ss.y,
                    ss.x - Math.cos(ss.angle) * ss.length,
                    ss.y - Math.sin(ss.angle) * ss.length
                );
                grad.addColorStop(0, `rgba(255, 255, 255, ${ss.opacity})`);
                grad.addColorStop(1, 'rgba(255, 255, 255, 0)');

                ctx.globalAlpha = 1;
                ctx.strokeStyle = grad;
                ctx.lineWidth = 1.5;
                ctx.beginPath();
                ctx.moveTo(ss.x, ss.y);
                ctx.lineTo(
                    ss.x - Math.cos(ss.angle) * ss.length,
                    ss.y - Math.sin(ss.angle) * ss.length
                );
                ctx.stroke();

                return ss.life < ss.maxLife;
            });

            ctx.globalAlpha = 1;
            animFrameRef.current = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            cancelAnimationFrame(animFrameRef.current);
            window.removeEventListener('resize', resize);
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('mousemove', handleMouse);
        };
    }, [initStars]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                pointerEvents: 'none',
                background: 'linear-gradient(180deg, #000000 0%, #050510 30%, #0a0a1a 60%, #080818 100%)',
            }}
        />
    );
};

export default StarField;
