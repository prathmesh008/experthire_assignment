'use client';

import { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

type SceneType = 
  | 'mirror' 
  | 'bedroom' 
  | 'commute' 
  | 'office' 
  | 'meeting' 
  | 'desk' 
  | 'conversation'
  | 'presentation'
  | 'celebration'
  | 'reflection'
  | 'default';

interface SceneCanvasProps {
  sceneType: SceneType;
  mood: 'dawn' | 'morning' | 'office' | 'tension' | 'resolution' | 'triumph';
  isTransitioning?: boolean;
}

// Color palettes for different moods
const moodColors = {
  dawn: {
    sky: ['#1a1a2e', '#16213e', '#0f3460'],
    accent: '#e94560',
    ambient: 'rgba(233, 69, 96, 0.1)',
    light: '#ffeaa7',
  },
  morning: {
    sky: ['#2d3436', '#636e72', '#b2bec3'],
    accent: '#fdcb6e',
    ambient: 'rgba(253, 203, 110, 0.15)',
    light: '#ffeaa7',
  },
  office: {
    sky: ['#2d3436', '#353b48', '#2f3640'],
    accent: '#74b9ff',
    ambient: 'rgba(116, 185, 255, 0.1)',
    light: '#dfe6e9',
  },
  tension: {
    sky: ['#1e1e2f', '#2d2d44', '#1a1a2e'],
    accent: '#e17055',
    ambient: 'rgba(225, 112, 85, 0.1)',
    light: '#fab1a0',
  },
  resolution: {
    sky: ['#1e3a5f', '#2d4a6f', '#1e5162'],
    accent: '#00cec9',
    ambient: 'rgba(0, 206, 201, 0.1)',
    light: '#81ecec',
  },
  triumph: {
    sky: ['#2d1b4e', '#4a2c6a', '#6b3fa0'],
    accent: '#a29bfe',
    ambient: 'rgba(162, 155, 254, 0.2)',
    light: '#dfe6e9',
  },
};

export default function SceneCanvas({ sceneType, mood, isTransitioning }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const [dimensions, setDimensions] = useState({ width: 1920, height: 1080 });
  const timeRef = useRef(0);

  useEffect(() => {
    const updateDimensions = () => {
      setDimensions({
        width: window.innerWidth * 2, // 2x for retina
        height: window.innerHeight * 2,
      });
    };
    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const colors = moodColors[mood];
    let animationId: number;

    const drawScene = (time: number) => {
      timeRef.current = time;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw background gradient
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      colors.sky.forEach((color, i) => {
        gradient.addColorStop(i / (colors.sky.length - 1), color);
      });
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Draw scene-specific elements
      switch (sceneType) {
        case 'mirror':
          drawMirrorScene(ctx, canvas, colors, time);
          break;
        case 'bedroom':
          drawBedroomScene(ctx, canvas, colors, time);
          break;
        case 'commute':
          drawCommuteScene(ctx, canvas, colors, time);
          break;
        case 'office':
          drawOfficeScene(ctx, canvas, colors, time);
          break;
        case 'meeting':
          drawMeetingScene(ctx, canvas, colors, time);
          break;
        case 'desk':
          drawDeskScene(ctx, canvas, colors, time);
          break;
        case 'conversation':
          drawConversationScene(ctx, canvas, colors, time);
          break;
        case 'presentation':
          drawPresentationScene(ctx, canvas, colors, time);
          break;
        case 'celebration':
          drawCelebrationScene(ctx, canvas, colors, time);
          break;
        case 'reflection':
          drawReflectionScene(ctx, canvas, colors, time);
          break;
        default:
          drawDefaultScene(ctx, canvas, colors, time);
      }

      // Add film grain
      addFilmGrain(ctx, canvas, time);

      // Add vignette
      addVignette(ctx, canvas);

      animationId = requestAnimationFrame(drawScene);
    };

    animationId = requestAnimationFrame(drawScene);

    return () => {
      cancelAnimationFrame(animationId);
    };
  }, [sceneType, mood, dimensions]);

  // ============ SCENE DRAWING FUNCTIONS ============

  function drawMirrorScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;
    const cx = w / 2;
    const cy = h / 2;

    // Room walls
    ctx.fillStyle = '#1a1a2e';
    ctx.fillRect(0, 0, w, h);

    // Floor
    const floorGradient = ctx.createLinearGradient(0, h * 0.6, 0, h);
    floorGradient.addColorStop(0, '#2a2a4a');
    floorGradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = floorGradient;
    ctx.fillRect(0, h * 0.6, w, h * 0.4);

    // Mirror frame (oval)
    const mirrorX = cx;
    const mirrorY = cy - h * 0.05;
    const mirrorW = w * 0.25;
    const mirrorH = h * 0.45;

    // Mirror glow
    ctx.save();
    ctx.shadowColor = colors.accent;
    ctx.shadowBlur = 60 + Math.sin(time / 1000) * 20;
    ctx.beginPath();
    ctx.ellipse(mirrorX, mirrorY, mirrorW * 0.52, mirrorH * 0.52, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.fill();
    ctx.restore();

    // Mirror frame
    ctx.beginPath();
    ctx.ellipse(mirrorX, mirrorY, mirrorW * 0.55, mirrorH * 0.55, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#8b7355';
    ctx.lineWidth = 20;
    ctx.stroke();

    // Inner gold trim
    ctx.beginPath();
    ctx.ellipse(mirrorX, mirrorY, mirrorW * 0.52, mirrorH * 0.52, 0, 0, Math.PI * 2);
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = 4;
    ctx.stroke();

    // Mirror glass
    const mirrorGradient = ctx.createRadialGradient(
      mirrorX - mirrorW * 0.2, mirrorY - mirrorH * 0.2, 0,
      mirrorX, mirrorY, mirrorW
    );
    mirrorGradient.addColorStop(0, 'rgba(200, 220, 255, 0.3)');
    mirrorGradient.addColorStop(0.5, 'rgba(150, 170, 200, 0.2)');
    mirrorGradient.addColorStop(1, 'rgba(100, 120, 150, 0.3)');
    
    ctx.beginPath();
    ctx.ellipse(mirrorX, mirrorY, mirrorW * 0.5, mirrorH * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = mirrorGradient;
    ctx.fill();

    // Woman silhouette in mirror (reflection)
    drawWomanSilhouette(ctx, mirrorX, mirrorY + mirrorH * 0.1, mirrorH * 0.35, colors.accent, 0.6, time);

    // Woman silhouette in front (viewer perspective - back view)
    drawWomanBack(ctx, cx, h * 0.75, h * 0.35, time);

    // Light source (lamp or window light)
    const lightX = w * 0.2;
    const lightY = h * 0.3;
    const lightGradient = ctx.createRadialGradient(lightX, lightY, 0, lightX, lightY, w * 0.3);
    lightGradient.addColorStop(0, `${colors.light}40`);
    lightGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = lightGradient;
    ctx.fillRect(0, 0, w, h);

    // Dresser/table below mirror
    ctx.fillStyle = '#3a3a5a';
    ctx.fillRect(cx - w * 0.15, h * 0.65, w * 0.3, h * 0.08);
    
    // Items on dresser
    // Perfume bottle
    ctx.fillStyle = colors.accent + '80';
    ctx.fillRect(cx - w * 0.08, h * 0.6, w * 0.03, h * 0.05);
    
    // Jewelry box
    ctx.fillStyle = '#5a4a6a';
    ctx.fillRect(cx + w * 0.03, h * 0.62, w * 0.05, h * 0.03);
  }

  function drawWomanSilhouette(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    opacity: number,
    time: number
  ) {
    ctx.save();
    ctx.globalAlpha = opacity;
    
    // Head
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.35, size * 0.12, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();

    // Hair
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.38, size * 0.14, size * 0.12, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    
    // Long hair sides
    ctx.beginPath();
    ctx.moveTo(x - size * 0.12, y - size * 0.35);
    ctx.quadraticCurveTo(x - size * 0.18, y - size * 0.1, x - size * 0.1, y + size * 0.1);
    ctx.lineTo(x - size * 0.08, y - size * 0.25);
    ctx.fill();
    
    ctx.beginPath();
    ctx.moveTo(x + size * 0.12, y - size * 0.35);
    ctx.quadraticCurveTo(x + size * 0.18, y - size * 0.1, x + size * 0.1, y + size * 0.1);
    ctx.lineTo(x + size * 0.08, y - size * 0.25);
    ctx.fill();

    // Neck
    ctx.fillRect(x - size * 0.04, y - size * 0.22, size * 0.08, size * 0.08);

    // Shoulders and torso
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y - size * 0.05);
    ctx.quadraticCurveTo(x - size * 0.15, y - size * 0.15, x - size * 0.04, y - size * 0.15);
    ctx.lineTo(x + size * 0.04, y - size * 0.15);
    ctx.quadraticCurveTo(x + size * 0.15, y - size * 0.15, x + size * 0.2, y - size * 0.05);
    ctx.lineTo(x + size * 0.12, y + size * 0.2);
    ctx.lineTo(x - size * 0.12, y + size * 0.2);
    ctx.closePath();
    ctx.fill();

    // Arms - one raised (like touching hair or face)
    ctx.beginPath();
    ctx.moveTo(x + size * 0.18, y - size * 0.05);
    const armWave = Math.sin(time / 2000) * size * 0.02;
    ctx.quadraticCurveTo(x + size * 0.25, y - size * 0.2 + armWave, x + size * 0.15, y - size * 0.3);
    ctx.lineWidth = size * 0.05;
    ctx.strokeStyle = color;
    ctx.lineCap = 'round';
    ctx.stroke();

    ctx.restore();
  }

  function drawWomanBack(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    time: number
  ) {
    ctx.save();
    
    const breathe = Math.sin(time / 1500) * size * 0.005;

    // Hair (long, flowing down back)
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.45, size * 0.15, size * 0.12, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    
    // Long hair down back
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, y - size * 0.45);
    ctx.quadraticCurveTo(x - size * 0.2, y - size * 0.2, x - size * 0.12, y);
    ctx.lineTo(x + size * 0.12, y);
    ctx.quadraticCurveTo(x + size * 0.2, y - size * 0.2, x + size * 0.15, y - size * 0.45);
    ctx.fill();

    // Head
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.42, size * 0.11, size * 0.13, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#d4a574';
    ctx.fill();

    // Neck
    ctx.fillRect(x - size * 0.04, y - size * 0.3, size * 0.08, size * 0.08);

    // Shoulders and back (wearing something)
    ctx.beginPath();
    ctx.moveTo(x - size * 0.22, y - size * 0.12 + breathe);
    ctx.quadraticCurveTo(x - size * 0.18, y - size * 0.22, x, y - size * 0.22);
    ctx.quadraticCurveTo(x + size * 0.18, y - size * 0.22, x + size * 0.22, y - size * 0.12 + breathe);
    ctx.lineTo(x + size * 0.15, y + size * 0.15);
    ctx.lineTo(x - size * 0.15, y + size * 0.15);
    ctx.closePath();
    ctx.fillStyle = '#4a3a5a'; // Robe or top color
    ctx.fill();

    ctx.restore();
  }

  function drawBedroomScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Walls
    ctx.fillStyle = '#1e1e2e';
    ctx.fillRect(0, 0, w, h);

    // Window with dawn light
    const windowX = w * 0.7;
    const windowY = h * 0.15;
    const windowW = w * 0.2;
    const windowH = h * 0.35;

    // Window glow
    const glowGradient = ctx.createRadialGradient(
      windowX + windowW / 2, windowY + windowH / 2, 0,
      windowX + windowW / 2, windowY + windowH / 2, windowW
    );
    glowGradient.addColorStop(0, colors.light + '60');
    glowGradient.addColorStop(1, 'transparent');
    ctx.fillStyle = glowGradient;
    ctx.fillRect(0, 0, w, h);

    // Window frame
    ctx.fillStyle = '#3a3a4a';
    ctx.fillRect(windowX - 10, windowY - 10, windowW + 20, windowH + 20);
    
    // Window glass (sunrise)
    const skyGradient = ctx.createLinearGradient(windowX, windowY, windowX, windowY + windowH);
    skyGradient.addColorStop(0, '#ff6b6b');
    skyGradient.addColorStop(0.5, '#feca57');
    skyGradient.addColorStop(1, '#48dbfb');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(windowX, windowY, windowW, windowH);

    // Window panes
    ctx.strokeStyle = '#3a3a4a';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.moveTo(windowX + windowW / 2, windowY);
    ctx.lineTo(windowX + windowW / 2, windowY + windowH);
    ctx.moveTo(windowX, windowY + windowH / 2);
    ctx.lineTo(windowX + windowW, windowY + windowH / 2);
    ctx.stroke();

    // Bed
    const bedX = w * 0.1;
    const bedY = h * 0.5;
    const bedW = w * 0.4;
    const bedH = h * 0.35;

    // Headboard
    ctx.fillStyle = '#4a3a3a';
    ctx.fillRect(bedX, bedY - h * 0.15, bedW, h * 0.2);

    // Mattress
    ctx.fillStyle = '#f8f8f8';
    ctx.fillRect(bedX, bedY, bedW, bedH * 0.3);

    // Blanket
    ctx.fillStyle = colors.accent + '80';
    ctx.fillRect(bedX, bedY + bedH * 0.1, bedW, bedH * 0.5);

    // Pillows
    ctx.fillStyle = '#ffffff';
    ctx.beginPath();
    ctx.ellipse(bedX + bedW * 0.25, bedY + bedH * 0.05, bedW * 0.15, bedH * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.ellipse(bedX + bedW * 0.65, bedY + bedH * 0.05, bedW * 0.15, bedH * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Person in bed (waking up)
    drawWomanInBed(ctx, bedX + bedW * 0.5, bedY + bedH * 0.2, bedH * 0.4, time);

    // Bedside table
    ctx.fillStyle = '#3a3a4a';
    ctx.fillRect(w * 0.52, h * 0.55, w * 0.08, h * 0.15);

    // Alarm clock
    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(w * 0.54, h * 0.52, w * 0.04, h * 0.04);
    ctx.fillStyle = colors.accent;
    ctx.font = `${h * 0.02}px monospace`;
    ctx.fillText('5:30', w * 0.545, h * 0.55);

    // Light rays from window
    ctx.save();
    ctx.globalAlpha = 0.1 + Math.sin(time / 2000) * 0.05;
    for (let i = 0; i < 5; i++) {
      ctx.beginPath();
      ctx.moveTo(windowX + windowW / 2, windowY + windowH / 2);
      ctx.lineTo(windowX - w * 0.3 + i * w * 0.15, h);
      ctx.lineTo(windowX - w * 0.3 + i * w * 0.15 + w * 0.1, h);
      ctx.closePath();
      ctx.fillStyle = colors.light;
      ctx.fill();
    }
    ctx.restore();
  }

  function drawWomanInBed(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    time: number
  ) {
    // Woman sitting up in bed
    const sitUp = Math.min(1, (time % 5000) / 2000); // Animation of sitting up
    
    ctx.save();
    
    // Hair
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.3 * sitUp, size * 0.15, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.25 * sitUp, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body under covers (slight mound)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    ctx.beginPath();
    ctx.ellipse(x, y + size * 0.2, size * 0.3, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    ctx.restore();
  }

  function drawCommuteScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Sky
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h * 0.6);
    skyGradient.addColorStop(0, '#1a1a2e');
    skyGradient.addColorStop(1, '#2d3436');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h * 0.6);

    // City buildings silhouette
    drawCitySilhouette(ctx, w, h, colors, time);

    // Road
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(0, h * 0.65, w, h * 0.35);

    // Road lines
    ctx.strokeStyle = '#ffeaa7';
    ctx.lineWidth = 8;
    ctx.setLineDash([40, 30]);
    ctx.beginPath();
    ctx.moveTo(0, h * 0.8);
    ctx.lineTo(w, h * 0.8);
    ctx.stroke();
    ctx.setLineDash([]);

    // Metro/train car
    drawMetroCar(ctx, w * 0.2, h * 0.5, w * 0.6, h * 0.25, colors, time);

    // Woman inside train (visible through window)
    drawWomanSitting(ctx, w * 0.4, h * 0.55, h * 0.15, colors.accent, time);
  }

  function drawCitySilhouette(
    ctx: CanvasRenderingContext2D,
    w: number,
    h: number,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    ctx.fillStyle = '#1a1a2e';
    
    const buildings = [
      { x: 0, width: w * 0.08, height: h * 0.3 },
      { x: w * 0.1, width: w * 0.05, height: h * 0.4 },
      { x: w * 0.17, width: w * 0.07, height: h * 0.35 },
      { x: w * 0.26, width: w * 0.04, height: h * 0.45 },
      { x: w * 0.32, width: w * 0.08, height: h * 0.38 },
      { x: w * 0.55, width: w * 0.06, height: h * 0.42 },
      { x: w * 0.63, width: w * 0.05, height: h * 0.32 },
      { x: w * 0.7, width: w * 0.08, height: h * 0.48 },
      { x: w * 0.8, width: w * 0.06, height: h * 0.36 },
      { x: w * 0.88, width: w * 0.12, height: h * 0.4 },
    ];

    buildings.forEach((b, i) => {
      const baseY = h * 0.65;
      ctx.fillStyle = `rgba(30, 30, 50, ${0.8 + i * 0.02})`;
      ctx.fillRect(b.x, baseY - b.height, b.width, b.height);

      // Windows
      ctx.fillStyle = colors.light + '40';
      const windowRows = Math.floor(b.height / (h * 0.04));
      const windowCols = Math.floor(b.width / (w * 0.015));
      for (let row = 0; row < windowRows; row++) {
        for (let col = 0; col < windowCols; col++) {
          if (Math.random() > 0.3) {
            ctx.fillRect(
              b.x + col * (w * 0.015) + w * 0.005,
              baseY - b.height + row * (h * 0.04) + h * 0.01,
              w * 0.008,
              h * 0.02
            );
          }
        }
      }
    });
  }

  function drawMetroCar(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    // Train body
    ctx.fillStyle = '#4a4a6a';
    ctx.beginPath();
    ctx.roundRect(x, y, w, h, 15);
    ctx.fill();

    // Windows
    const windowCount = 5;
    const windowWidth = w * 0.12;
    const windowGap = (w - windowWidth * windowCount) / (windowCount + 1);
    
    for (let i = 0; i < windowCount; i++) {
      const wx = x + windowGap + i * (windowWidth + windowGap);
      ctx.fillStyle = '#87ceeb40';
      ctx.fillRect(wx, y + h * 0.15, windowWidth, h * 0.5);
      
      // Window frame
      ctx.strokeStyle = '#3a3a5a';
      ctx.lineWidth = 4;
      ctx.strokeRect(wx, y + h * 0.15, windowWidth, h * 0.5);
    }

    // Train stripe
    ctx.fillStyle = colors.accent;
    ctx.fillRect(x, y + h * 0.75, w, h * 0.08);

    // Wheels
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.arc(x + w * 0.15, y + h + 10, 20, 0, Math.PI * 2);
    ctx.arc(x + w * 0.85, y + h + 10, 20, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawWomanSitting(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    time: number
  ) {
    ctx.save();
    ctx.globalAlpha = 0.8;

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.3, size * 0.12, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hair
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.35, size * 0.14, size * 0.1, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    // Body (professional attire)
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, y - size * 0.15);
    ctx.lineTo(x + size * 0.15, y - size * 0.15);
    ctx.lineTo(x + size * 0.12, y + size * 0.2);
    ctx.lineTo(x - size * 0.12, y + size * 0.2);
    ctx.closePath();
    ctx.fill();

    // Phone in hand
    ctx.fillStyle = '#1a1a2a';
    ctx.fillRect(x + size * 0.05, y, size * 0.08, size * 0.15);
    ctx.fillStyle = '#4a9eff';
    ctx.fillRect(x + size * 0.055, y + size * 0.02, size * 0.07, size * 0.1);

    ctx.restore();
  }

  function drawOfficeScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Office walls
    ctx.fillStyle = '#f5f5f5';
    ctx.fillRect(0, 0, w, h);

    // Floor
    ctx.fillStyle = '#e0e0e0';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Large windows
    for (let i = 0; i < 3; i++) {
      const wx = w * 0.1 + i * w * 0.3;
      ctx.fillStyle = '#87ceeb';
      ctx.fillRect(wx, h * 0.1, w * 0.2, h * 0.4);
      ctx.strokeStyle = '#ccc';
      ctx.lineWidth = 8;
      ctx.strokeRect(wx, h * 0.1, w * 0.2, h * 0.4);
    }

    // Desks
    drawOfficeDesk(ctx, w * 0.15, h * 0.6, w * 0.25, h * 0.15);
    drawOfficeDesk(ctx, w * 0.5, h * 0.6, w * 0.25, h * 0.15);

    // Woman at desk
    drawWomanAtDesk(ctx, w * 0.27, h * 0.5, h * 0.2, colors, time);

    // Other people (silhouettes)
    drawPersonSilhouette(ctx, w * 0.62, h * 0.5, h * 0.18, '#666', time);
    drawPersonSilhouette(ctx, w * 0.85, h * 0.55, h * 0.22, '#555', time);
  }

  function drawOfficeDesk(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    w: number,
    h: number
  ) {
    // Desk surface
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(x, y, w, h * 0.3);
    
    // Desk legs
    ctx.fillStyle = '#6b5344';
    ctx.fillRect(x + w * 0.05, y + h * 0.3, w * 0.05, h * 0.7);
    ctx.fillRect(x + w * 0.9, y + h * 0.3, w * 0.05, h * 0.7);

    // Monitor
    ctx.fillStyle = '#1a1a2a';
    ctx.fillRect(x + w * 0.35, y - h * 0.8, w * 0.3, h * 0.6);
    ctx.fillStyle = '#4a9eff';
    ctx.fillRect(x + w * 0.37, y - h * 0.75, w * 0.26, h * 0.5);
    
    // Monitor stand
    ctx.fillStyle = '#2a2a2a';
    ctx.fillRect(x + w * 0.45, y - h * 0.2, w * 0.1, h * 0.2);
  }

  function drawWomanAtDesk(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    // Chair
    ctx.fillStyle = '#2a2a3a';
    ctx.beginPath();
    ctx.ellipse(x, y + size * 0.3, size * 0.2, size * 0.08, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillRect(x - size * 0.15, y + size * 0.1, size * 0.3, size * 0.25);

    // Woman sitting
    // Hair
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.25, size * 0.12, size * 0.08, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.2, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, y - size * 0.05);
    ctx.lineTo(x + size * 0.15, y - size * 0.05);
    ctx.lineTo(x + size * 0.12, y + size * 0.15);
    ctx.lineTo(x - size * 0.12, y + size * 0.15);
    ctx.closePath();
    ctx.fill();

    // Arms on keyboard
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = size * 0.05;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x - size * 0.12, y);
    ctx.lineTo(x - size * 0.2, y + size * 0.1);
    ctx.moveTo(x + size * 0.12, y);
    ctx.lineTo(x + size * 0.2, y + size * 0.1);
    ctx.stroke();
  }

  function drawPersonSilhouette(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    time: number
  ) {
    ctx.fillStyle = color;
    
    // Head
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.3, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, y - size * 0.1);
    ctx.lineTo(x + size * 0.15, y - size * 0.1);
    ctx.lineTo(x + size * 0.1, y + size * 0.2);
    ctx.lineTo(x - size * 0.1, y + size * 0.2);
    ctx.closePath();
    ctx.fill();
  }

  function drawMeetingScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Meeting room
    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(0, 0, w, h);

    // Conference table
    ctx.fillStyle = '#4a3a2a';
    ctx.beginPath();
    ctx.ellipse(w / 2, h * 0.55, w * 0.35, h * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Whiteboard/screen
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(w * 0.3, h * 0.1, w * 0.4, h * 0.25);
    ctx.strokeStyle = '#888';
    ctx.lineWidth = 4;
    ctx.strokeRect(w * 0.3, h * 0.1, w * 0.4, h * 0.25);

    // People around table
    const positions = [
      { x: w * 0.25, y: h * 0.5, isHer: false },
      { x: w * 0.4, y: h * 0.45, isHer: true },
      { x: w * 0.6, y: h * 0.45, isHer: false },
      { x: w * 0.75, y: h * 0.5, isHer: false },
      { x: w * 0.35, y: h * 0.65, isHer: false },
      { x: w * 0.65, y: h * 0.65, isHer: false },
    ];

    positions.forEach((pos, i) => {
      if (pos.isHer) {
        drawWomanSilhouette(ctx, pos.x, pos.y, h * 0.15, colors.accent, 1, time);
      } else {
        drawPersonSilhouette(ctx, pos.x, pos.y, h * 0.12, '#555', time);
      }
    });

    // Spotlight on her (subtle)
    const spotlight = ctx.createRadialGradient(
      w * 0.4, h * 0.45, 0,
      w * 0.4, h * 0.45, h * 0.3
    );
    spotlight.addColorStop(0, colors.accent + '20');
    spotlight.addColorStop(1, 'transparent');
    ctx.fillStyle = spotlight;
    ctx.fillRect(0, 0, w, h);
  }

  function drawDeskScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Close-up of desk area
    ctx.fillStyle = '#1a1a2a';
    ctx.fillRect(0, 0, w, h);

    // Desk surface (large, takes most of screen)
    ctx.fillStyle = '#8b7355';
    ctx.fillRect(0, h * 0.5, w, h * 0.5);

    // Large monitor
    ctx.fillStyle = '#1a1a1a';
    ctx.fillRect(w * 0.2, h * 0.1, w * 0.6, h * 0.35);
    
    // Screen content
    ctx.fillStyle = '#0f0f1a';
    ctx.fillRect(w * 0.22, h * 0.12, w * 0.56, h * 0.31);
    
    // Code on screen
    ctx.font = `${h * 0.02}px monospace`;
    const codeLines = [
      '{ color: #61dafb }',
      'function handleSubmit() {',
      '  const data = await fetch...',
      '  return response.json();',
      '}',
    ];
    codeLines.forEach((line, i) => {
      ctx.fillStyle = i === 0 ? '#61dafb' : i % 2 === 0 ? '#98c379' : '#e5c07b';
      ctx.fillText(line, w * 0.25, h * 0.18 + i * h * 0.04);
    });

    // Keyboard
    ctx.fillStyle = '#2a2a3a';
    ctx.fillRect(w * 0.3, h * 0.55, w * 0.4, h * 0.1);

    // Coffee cup
    ctx.fillStyle = '#f5f5f5';
    ctx.beginPath();
    ctx.ellipse(w * 0.8, h * 0.58, w * 0.04, h * 0.03, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.fillStyle = '#6b4423';
    ctx.beginPath();
    ctx.ellipse(w * 0.8, h * 0.58, w * 0.035, h * 0.025, 0, 0, Math.PI * 2);
    ctx.fill();

    // Hands on keyboard
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(w * 0.4, h * 0.62, w * 0.03, h * 0.015, -0.2, 0, Math.PI * 2);
    ctx.ellipse(w * 0.6, h * 0.62, w * 0.03, h * 0.015, 0.2, 0, Math.PI * 2);
    ctx.fill();

    // Typing animation (cursor blink)
    if (Math.floor(time / 500) % 2 === 0) {
      ctx.fillStyle = '#61dafb';
      ctx.fillRect(w * 0.55, h * 0.26, w * 0.008, h * 0.025);
    }
  }

  function drawConversationScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Office hallway/break room
    ctx.fillStyle = '#f0f0f0';
    ctx.fillRect(0, 0, w, h);

    // Floor
    ctx.fillStyle = '#ddd';
    ctx.fillRect(0, h * 0.7, w, h * 0.3);

    // Two people talking (close up)
    // Her (on right)
    drawWomanProfile(ctx, w * 0.65, h * 0.45, h * 0.35, colors, time, true);
    
    // Other person (on left, facing her)
    drawPersonProfile(ctx, w * 0.35, h * 0.45, h * 0.32, '#555', time, false);

    // Speech bubbles effect
    drawSpeechIndicator(ctx, w * 0.5, h * 0.25, colors.accent, time);
  }

  function drawWomanProfile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    colors: typeof moodColors.dawn,
    time: number,
    facingLeft: boolean
  ) {
    ctx.save();
    if (facingLeft) {
      ctx.translate(x * 2, 0);
      ctx.scale(-1, 1);
    }

    // Hair
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.1, size * 0.2, size * 0.25, 0, 0, Math.PI * 2);
    ctx.fill();
    
    // Long hair back
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, y - size * 0.1);
    ctx.quadraticCurveTo(x - size * 0.25, y + size * 0.1, x - size * 0.15, y + size * 0.3);
    ctx.lineTo(x + size * 0.1, y + size * 0.3);
    ctx.quadraticCurveTo(x + size * 0.05, y + size * 0.1, x + size * 0.15, y - size * 0.1);
    ctx.fill();

    // Face
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(x + size * 0.05, y - size * 0.05, size * 0.12, size * 0.15, 0, 0, Math.PI * 2);
    ctx.fill();

    // Neck and shoulders
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.05, y + size * 0.1);
    ctx.lineTo(x + size * 0.15, y + size * 0.1);
    ctx.lineTo(x + size * 0.25, y + size * 0.25);
    ctx.lineTo(x - size * 0.15, y + size * 0.25);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawPersonProfile(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    time: number,
    facingLeft: boolean
  ) {
    ctx.save();
    if (!facingLeft) {
      ctx.translate(x * 2, 0);
      ctx.scale(-1, 1);
    }

    ctx.fillStyle = color;
    
    // Head
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.1, size * 0.15, size * 0.18, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shoulders
    ctx.beginPath();
    ctx.moveTo(x - size * 0.2, y + size * 0.15);
    ctx.lineTo(x + size * 0.2, y + size * 0.15);
    ctx.lineTo(x + size * 0.15, y + size * 0.35);
    ctx.lineTo(x - size * 0.15, y + size * 0.35);
    ctx.closePath();
    ctx.fill();

    ctx.restore();
  }

  function drawSpeechIndicator(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    color: string,
    time: number
  ) {
    // Animated dots indicating conversation
    for (let i = 0; i < 3; i++) {
      const delay = i * 200;
      const bounce = Math.sin((time + delay) / 300) * 10;
      ctx.fillStyle = color + '80';
      ctx.beginPath();
      ctx.arc(x - 30 + i * 30, y + bounce, 8, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  function drawPresentationScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Conference room
    ctx.fillStyle = '#1a1a2a';
    ctx.fillRect(0, 0, w, h);

    // Large presentation screen
    ctx.fillStyle = '#fff';
    ctx.fillRect(w * 0.15, h * 0.1, w * 0.7, h * 0.45);
    
    // Presentation content
    ctx.fillStyle = colors.accent;
    ctx.font = `bold ${h * 0.04}px sans-serif`;
    ctx.fillText('Q4 Strategy', w * 0.25, h * 0.2);
    
    // Chart bars
    const barColors = ['#e94560', '#00cec9', '#fdcb6e', '#a29bfe'];
    for (let i = 0; i < 4; i++) {
      const barHeight = (0.3 + Math.random() * 0.5) * h * 0.2;
      ctx.fillStyle = barColors[i];
      ctx.fillRect(w * 0.25 + i * w * 0.12, h * 0.45 - barHeight, w * 0.08, barHeight);
    }

    // Woman presenting (standing, confident pose)
    drawWomanPresenting(ctx, w * 0.12, h * 0.5, h * 0.35, colors, time);

    // Audience (backs of heads)
    for (let i = 0; i < 6; i++) {
      ctx.fillStyle = '#333';
      ctx.beginPath();
      ctx.ellipse(
        w * 0.25 + i * w * 0.1,
        h * 0.85,
        w * 0.03,
        h * 0.04,
        0, Math.PI, Math.PI * 2
      );
      ctx.fill();
    }

    // Spotlight effect on presenter
    const spotlight = ctx.createRadialGradient(
      w * 0.12, h * 0.5, 0,
      w * 0.12, h * 0.5, h * 0.4
    );
    spotlight.addColorStop(0, colors.light + '15');
    spotlight.addColorStop(1, 'transparent');
    ctx.fillStyle = spotlight;
    ctx.fillRect(0, 0, w, h);
  }

  function drawWomanPresenting(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    // Confident standing pose
    
    // Hair
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.35, size * 0.1, size * 0.08, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(x - size * 0.1, y - size * 0.35);
    ctx.quadraticCurveTo(x - size * 0.15, y - size * 0.2, x - size * 0.08, y - size * 0.1);
    ctx.lineTo(x + size * 0.08, y - size * 0.1);
    ctx.quadraticCurveTo(x + size * 0.15, y - size * 0.2, x + size * 0.1, y - size * 0.35);
    ctx.fill();

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.32, size * 0.08, size * 0.1, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body (professional attire)
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.12, y - size * 0.2);
    ctx.lineTo(x + size * 0.12, y - size * 0.2);
    ctx.lineTo(x + size * 0.1, y + size * 0.1);
    ctx.lineTo(x - size * 0.1, y + size * 0.1);
    ctx.closePath();
    ctx.fill();

    // Skirt/pants
    ctx.fillStyle = '#2a2a3a';
    ctx.beginPath();
    ctx.moveTo(x - size * 0.1, y + size * 0.1);
    ctx.lineTo(x + size * 0.1, y + size * 0.1);
    ctx.lineTo(x + size * 0.08, y + size * 0.35);
    ctx.lineTo(x - size * 0.08, y + size * 0.35);
    ctx.closePath();
    ctx.fill();

    // Arm pointing at screen
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = size * 0.04;
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(x + size * 0.1, y - size * 0.15);
    const wave = Math.sin(time / 1000) * size * 0.02;
    ctx.quadraticCurveTo(x + size * 0.2, y - size * 0.25 + wave, x + size * 0.3, y - size * 0.3);
    ctx.stroke();
  }

  function drawCelebrationScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Gradient background
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.6);
    gradient.addColorStop(0, '#3a2a5a');
    gradient.addColorStop(1, '#1a1a2e');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Confetti
    for (let i = 0; i < 100; i++) {
      const confettiX = (Math.sin(i * 0.5 + time / 1000) * w * 0.4 + w / 2 + i * 15) % w;
      const confettiY = ((time / 10 + i * 20) % h);
      const confettiColors = ['#e94560', '#fdcb6e', '#00cec9', '#a29bfe', '#ff6b6b'];
      ctx.fillStyle = confettiColors[i % confettiColors.length];
      ctx.save();
      ctx.translate(confettiX, confettiY);
      ctx.rotate((time / 500 + i) % (Math.PI * 2));
      ctx.fillRect(-5, -10, 10, 20);
      ctx.restore();
    }

    // Celebration group
    const people = [
      { x: w * 0.3, y: h * 0.55, isHer: false },
      { x: w * 0.45, y: h * 0.5, isHer: true },
      { x: w * 0.6, y: h * 0.55, isHer: false },
      { x: w * 0.75, y: h * 0.58, isHer: false },
    ];

    people.forEach((p, i) => {
      if (p.isHer) {
        drawWomanCelebrating(ctx, p.x, p.y, h * 0.3, colors, time);
      } else {
        drawPersonCelebrating(ctx, p.x, p.y, h * 0.25, '#555', time, i);
      }
    });

    // Sparkle effects
    for (let i = 0; i < 20; i++) {
      const sparkleX = w * 0.2 + Math.random() * w * 0.6;
      const sparkleY = h * 0.1 + Math.random() * h * 0.4;
      const sparkleSize = 5 + Math.random() * 10;
      const sparkleOpacity = 0.3 + Math.sin(time / 200 + i) * 0.3;
      
      ctx.fillStyle = `rgba(255, 255, 255, ${sparkleOpacity})`;
      drawSparkle(ctx, sparkleX, sparkleY, sparkleSize);
    }
  }

  function drawWomanCelebrating(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    // Hair
    ctx.fillStyle = '#2a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.35, size * 0.12, size * 0.1, 0, Math.PI, Math.PI * 2);
    ctx.fill();

    // Head
    ctx.fillStyle = '#d4a574';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.32, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Smile
    ctx.strokeStyle = '#8b6914';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(x, y - size * 0.28, size * 0.04, 0.1 * Math.PI, 0.9 * Math.PI);
    ctx.stroke();

    // Body
    ctx.fillStyle = colors.accent;
    ctx.beginPath();
    ctx.moveTo(x - size * 0.15, y - size * 0.18);
    ctx.lineTo(x + size * 0.15, y - size * 0.18);
    ctx.lineTo(x + size * 0.12, y + size * 0.15);
    ctx.lineTo(x - size * 0.12, y + size * 0.15);
    ctx.closePath();
    ctx.fill();

    // Arms raised in celebration
    ctx.strokeStyle = '#d4a574';
    ctx.lineWidth = size * 0.05;
    ctx.lineCap = 'round';
    
    const armWave = Math.sin(time / 200) * size * 0.05;
    
    ctx.beginPath();
    ctx.moveTo(x - size * 0.12, y - size * 0.1);
    ctx.quadraticCurveTo(x - size * 0.25, y - size * 0.3 + armWave, x - size * 0.2, y - size * 0.45);
    ctx.stroke();
    
    ctx.beginPath();
    ctx.moveTo(x + size * 0.12, y - size * 0.1);
    ctx.quadraticCurveTo(x + size * 0.25, y - size * 0.3 - armWave, x + size * 0.2, y - size * 0.45);
    ctx.stroke();
  }

  function drawPersonCelebrating(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    color: string,
    time: number,
    index: number
  ) {
    ctx.fillStyle = color;

    // Head
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.3, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Body
    ctx.beginPath();
    ctx.moveTo(x - size * 0.12, y - size * 0.15);
    ctx.lineTo(x + size * 0.12, y - size * 0.15);
    ctx.lineTo(x + size * 0.1, y + size * 0.15);
    ctx.lineTo(x - size * 0.1, y + size * 0.15);
    ctx.closePath();
    ctx.fill();

    // One arm raised
    ctx.strokeStyle = color;
    ctx.lineWidth = size * 0.05;
    ctx.beginPath();
    const armY = Math.sin(time / 300 + index) * size * 0.05;
    ctx.moveTo(x + size * 0.1, y - size * 0.1);
    ctx.lineTo(x + size * 0.2, y - size * 0.35 + armY);
    ctx.stroke();
  }

  function drawSparkle(ctx: CanvasRenderingContext2D, x: number, y: number, size: number) {
    ctx.beginPath();
    for (let i = 0; i < 4; i++) {
      const angle = (i * Math.PI) / 2;
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
    }
    ctx.stroke();
    
    ctx.beginPath();
    ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawReflectionScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Evening sky gradient
    const skyGradient = ctx.createLinearGradient(0, 0, 0, h);
    skyGradient.addColorStop(0, '#0f0f2a');
    skyGradient.addColorStop(0.5, '#1a1a3e');
    skyGradient.addColorStop(1, '#2a1a4a');
    ctx.fillStyle = skyGradient;
    ctx.fillRect(0, 0, w, h);

    // Stars
    for (let i = 0; i < 100; i++) {
      const starX = (i * 137.5) % w;
      const starY = (i * 73.3) % (h * 0.5);
      const twinkle = 0.3 + Math.sin(time / 500 + i) * 0.3;
      ctx.fillStyle = `rgba(255, 255, 255, ${twinkle})`;
      ctx.beginPath();
      ctx.arc(starX, starY, 1 + Math.random(), 0, Math.PI * 2);
      ctx.fill();
    }

    // City lights in distance
    for (let i = 0; i < 30; i++) {
      const lightX = i * (w / 30) + Math.random() * 20;
      const lightY = h * 0.55 + Math.random() * 20;
      ctx.fillStyle = colors.light + '60';
      ctx.beginPath();
      ctx.arc(lightX, lightY, 3 + Math.random() * 3, 0, Math.PI * 2);
      ctx.fill();
    }

    // Woman looking at view (from behind, at window or balcony)
    drawWomanAtWindow(ctx, w * 0.5, h * 0.65, h * 0.4, colors, time);

    // Window frame or balcony railing
    ctx.strokeStyle = '#3a3a4a';
    ctx.lineWidth = 10;
    ctx.strokeRect(w * 0.15, h * 0.5, w * 0.7, h * 0.45);

    // Ambient glow from city
    const cityGlow = ctx.createLinearGradient(0, h * 0.5, 0, h);
    cityGlow.addColorStop(0, 'transparent');
    cityGlow.addColorStop(1, colors.accent + '20');
    ctx.fillStyle = cityGlow;
    ctx.fillRect(0, h * 0.5, w, h * 0.5);
  }

  function drawWomanAtWindow(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    size: number,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    // Silhouette from behind, looking out
    
    // Hair
    ctx.fillStyle = '#1a1a1a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.35, size * 0.12, size * 0.1, 0, Math.PI, Math.PI * 2);
    ctx.fill();
    
    // Long hair
    ctx.beginPath();
    ctx.moveTo(x - size * 0.12, y - size * 0.35);
    ctx.quadraticCurveTo(x - size * 0.18, y - size * 0.15, x - size * 0.1, y + size * 0.05);
    ctx.lineTo(x + size * 0.1, y + size * 0.05);
    ctx.quadraticCurveTo(x + size * 0.18, y - size * 0.15, x + size * 0.12, y - size * 0.35);
    ctx.fill();

    // Head (back view)
    ctx.fillStyle = '#2a2a2a';
    ctx.beginPath();
    ctx.ellipse(x, y - size * 0.32, size * 0.1, size * 0.12, 0, 0, Math.PI * 2);
    ctx.fill();

    // Shoulders and back
    ctx.fillStyle = '#2a2a3a';
    ctx.beginPath();
    ctx.moveTo(x - size * 0.18, y - size * 0.15);
    ctx.quadraticCurveTo(x, y - size * 0.2, x + size * 0.18, y - size * 0.15);
    ctx.lineTo(x + size * 0.15, y + size * 0.2);
    ctx.lineTo(x - size * 0.15, y + size * 0.2);
    ctx.closePath();
    ctx.fill();

    // Subtle outline glow
    ctx.strokeStyle = colors.accent + '40';
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  function drawDefaultScene(
    ctx: CanvasRenderingContext2D,
    canvas: HTMLCanvasElement,
    colors: typeof moodColors.dawn,
    time: number
  ) {
    const w = canvas.width;
    const h = canvas.height;

    // Abstract atmospheric scene
    const gradient = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.7);
    gradient.addColorStop(0, colors.sky[0]);
    gradient.addColorStop(0.5, colors.sky[1]);
    gradient.addColorStop(1, colors.sky[2] || colors.sky[0]);
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, w, h);

    // Floating particles
    for (let i = 0; i < 50; i++) {
      const px = (w / 2 + Math.sin(time / 2000 + i * 0.5) * w * 0.3 + i * 20) % w;
      const py = (h / 2 + Math.cos(time / 3000 + i * 0.3) * h * 0.3 + i * 15) % h;
      const psize = 2 + Math.sin(time / 1000 + i) * 1;
      
      ctx.fillStyle = colors.accent + '40';
      ctx.beginPath();
      ctx.arc(px, py, psize, 0, Math.PI * 2);
      ctx.fill();
    }

    // Central focus glow
    const focusGlow = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w * 0.3);
    focusGlow.addColorStop(0, colors.ambient);
    focusGlow.addColorStop(1, 'transparent');
    ctx.fillStyle = focusGlow;
    ctx.fillRect(0, 0, w, h);
  }

  // ============ UTILITY FUNCTIONS ============

  function addFilmGrain(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, time: number) {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    const grainAmount = 8;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * grainAmount;
      data[i] += noise;
      data[i + 1] += noise;
      data[i + 2] += noise;
    }

    ctx.putImageData(imageData, 0, 0);
  }

  function addVignette(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    const gradient = ctx.createRadialGradient(
      canvas.width / 2, canvas.height / 2, canvas.width * 0.3,
      canvas.width / 2, canvas.height / 2, canvas.width * 0.8
    );
    gradient.addColorStop(0, 'transparent');
    gradient.addColorStop(1, 'rgba(0, 0, 0, 0.5)');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  return (
    <motion.div
      className="absolute inset-0 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: isTransitioning ? 0.5 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <canvas
        ref={canvasRef}
        width={dimensions.width}
        height={dimensions.height}
        className="w-full h-full"
        style={{ imageRendering: 'auto' }}
      />
    </motion.div>
  );
}
