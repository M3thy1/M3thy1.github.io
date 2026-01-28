import { useEffect, useRef } from 'react';

const MatrixRain = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let lastTime = 0;
    const frameInterval = 50; // Update every 50ms for performance

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resize();
    window.addEventListener('resize', resize);

    // Characters to display - mix of katakana, latin, and numbers
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops = new Array(columns).fill(1);
    
    // Random starting positions for varied effect
    drops.forEach((_, i) => {
      drops[i] = Math.random() * -100;
    });

    const draw = (currentTime) => {
      animationFrameId = requestAnimationFrame(draw);
      
      // Throttle frame rate
      if (currentTime - lastTime < frameInterval) return;
      lastTime = currentTime;

      // Semi-transparent black to create fade effect
      ctx.fillStyle = 'rgba(10, 10, 15, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = '#00ff41';
      ctx.font = `${fontSize}px JetBrains Mono`;

      for (let i = 0; i < drops.length; i++) {
        // Random character
        const char = chars[Math.floor(Math.random() * chars.length)];
        
        // Vary the green intensity for depth
        const intensity = Math.random();
        if (intensity > 0.95) {
          ctx.fillStyle = '#ffffff'; // White flash
        } else if (intensity > 0.8) {
          ctx.fillStyle = '#00ff41'; // Bright green
        } else if (intensity > 0.5) {
          ctx.fillStyle = '#00d4ff'; // Cyan variation
        } else {
          ctx.fillStyle = 'rgba(0, 255, 65, 0.5)'; // Dim green
        }
        
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        // Reset drop to top randomly after it reaches bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        
        drops[i]++;
      }
    };

    draw(0);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed inset-0 pointer-events-none z-0 opacity-20"
      style={{ mixBlendMode: 'screen' }}
    />
  );
};

export default MatrixRain;
