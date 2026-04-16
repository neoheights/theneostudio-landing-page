import React, { useRef } from 'react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
}

const SpotlightCard: React.FC<SpotlightCardProps> = ({ 
  children, 
  className = '', 
  spotlightColor = 'rgba(199, 214, 26, 0.25)' 
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;
    const rect = divRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    divRef.current.style.setProperty('--mouse-x', `${x}px`);
    divRef.current.style.setProperty('--mouse-y', `${y}px`);
    divRef.current.style.setProperty('--spotlight-color', spotlightColor);
  };

  return (
    <div 
      ref={divRef} 
      onMouseMove={handleMouseMove} 
      className={`card-spotlight ${className}`}
      style={{
        position: 'relative',
        borderRadius: '1.5rem',
        border: '1px solid rgba(0, 34, 124, 0.1)',
        backgroundColor: '#fff',
        padding: '2rem',
        overflow: 'hidden',
        // @ts-ignore
        '--mouse-x': '50%',
        '--mouse-y': '50%',
        '--spotlight-color': spotlightColor,
      } as React.CSSProperties}
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .card-spotlight::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at var(--mouse-x) var(--mouse-y), var(--spotlight-color), transparent 80%);
          opacity: 0;
          transition: opacity 0.5s ease;
          pointer-events: none;
        }
        .card-spotlight:hover::before {
          opacity: 1;
        }
        .card-spotlight > * {
          position: relative;
          z-index: 1;
        }
      `}} />
      {children}
    </div>
  );
};

export default SpotlightCard;
