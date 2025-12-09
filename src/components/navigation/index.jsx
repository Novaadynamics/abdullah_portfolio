'use client';

import { BtnList } from '@/app/data';
import NavButton from './NavButton';
import React, { useEffect, useState } from 'react';

const Navigation = ({ setHovered, hovered }) => {
  const angleIncrement = 360 / BtnList.length;

  const [rotation, setRotation] = useState(0);
  const [radius, setRadius] = useState(200);
  const [multiplier, setMultiplier] = useState({ x: 2, y: 1.2 });
  const [visibleButtons, setVisibleButtons] = useState([]);
  const [screenSize, setScreenSize] = useState('desktop');

  // Update radius/multipliers based on screen size
  useEffect(() => {
    const updateSize = () => {
      const width = window.innerWidth;
      if (width < 500) {
        setScreenSize('mobile');
        setRadius(60);
        setMultiplier({ x: 1.4, y: 1.2 });
      } else if (width < 640) {
        setScreenSize('mobile');
        setRadius(60);
        setMultiplier({ x: 1.6, y: 1.4 });
      } else if (width < 1024) {
        setScreenSize('tablet');
        setRadius(100);
        setMultiplier({ x: 1.6, y: 1 });
      } else {
        setScreenSize('desktop');
        setRadius(65);
        setMultiplier({ x: 6.5, y: 2 });
      }
    };

    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // Infinite rotation loop
  useEffect(() => {
    let frame;

    const animate = () => {
      if (!hovered) {
        setRotation((prev) => (prev + 0.15) % 360);
      }
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [hovered]);

  // Stagger button reveal
  useEffect(() => {
    BtnList.forEach((btn, i) => {
      setTimeout(() => {
        setVisibleButtons((prev) => [...prev, btn.label]);
      }, i * 300);
    });
  }, []);

  return (
    <div className="absolute z-0 flex h-1/2 w-full items-center justify-center mx-auto">
      <div className="relative flex w-max items-center justify-center mx-auto">
        {BtnList.map((btn, index) => {
          const angleDeg = index * angleIncrement + rotation;
          const angleRad = (angleDeg * Math.PI) / 180;

          // Compute x and y based on radius and multiplier
          let x = radius * Math.cos(angleRad) * multiplier.x;
          let y = radius * Math.sin(angleRad) * multiplier.y;

          const xSpacing = screenSize === 'desktop' ? 1 : screenSize === 'tablet' ? 1.2 : 1.5;
          x *= xSpacing;

          if (!visibleButtons.includes(btn.label)) return null;

          return (
            <NavButton
              setHovered={setHovered}
              hovered={hovered}
              key={btn.label}
              x={x}
              y={y}
              index={index}
              {...btn}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Navigation;
