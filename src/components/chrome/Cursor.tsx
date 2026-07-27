/**
 * PrivoLabs — Cursor (React Island)
 * Source: 02-DESIGN-SYSTEM.md §3.2
 *
 * Custom cursor that replaces the default fine-pointer.
 * Features a dot that tracks instantly and a ring that lerps behind it.
 * Disables entirely on touch devices or under reduced-motion.
 * client:load
 */

import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [state, setState] = useState<'default' | 'link' | 'button' | 'media' | 'text'>('default');
  const [isPressed, setIsPressed] = useState(false);

  useEffect(() => {
    // Check for touch / coarse pointer
    const isTouch = matchMedia('(pointer: coarse)').matches;
    const isReduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (isTouch || isReduced) return;
    
    setIsVisible(true);
    document.body.style.cursor = 'none';

    let mx = window.innerWidth / 2;
    let my = window.innerHeight / 2;
    let rx = mx;
    let ry = my;
    let ticking = true;

    const onPointerMove = (e: PointerEvent) => {
      mx = e.clientX;
      my = e.clientY;
      
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mx}px, ${my}px, 0)`;
      }

      // Determine hover state
      const target = e.target as HTMLElement;
      
      if (!(target instanceof Element)) return;

      // Look for specific cursor overrides
      const override = target.closest('[data-cursor]');
      if (override) {
        setState(override.getAttribute('data-cursor') as any);
        return;
      }

      // Implicit states based on element type
      const link = target.closest('a, label, .has-dropdown > span');
      const btn = target.closest('button, .btn, select, [role="button"], input[type="submit"], input[type="button"]');
      
      if (btn) {
        setState('button');
      } else if (link) {
        setState('link');
      } else {
        const style = window.getComputedStyle(target);
        if (style.cursor === 'text' || target.tagName === 'INPUT' || target.tagName === 'TEXTAREA') {
          setState('text');
        } else {
          setState('default');
        }
      }
    };

    const onPointerDown = () => setIsPressed(true);
    const onPointerUp = () => setIsPressed(false);

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('pointerup', onPointerUp, { passive: true });

    const loop = () => {
      if (!ticking) return;
      
      // Lerp
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      
      requestAnimationFrame(loop);
    };
    
    loop();

    return () => {
      ticking = false;
      document.body.style.cursor = '';
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointerup', onPointerUp);
    };
  }, [state]); // re-bind to get current state in closure if needed, though state is mostly used in render

  if (!isVisible) return null;

  return (
    <div className={`cursor-container state-${state} ${isPressed ? 'pressed' : ''}`} style={{ pointerEvents: 'none', zIndex: 9999 }}>
      {/* The trailing ring */}
      <div
        ref={ringRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div className="cursor-ring" style={{ transform: 'translate(-50%, -50%)' }}>
          {state === 'media' && (
            <span className="font-mono label" style={{ color: 'var(--ink-900)' }}>VIEW</span>
          )}
        </div>
      </div>

      {/* The instant dot */}
      <div
        ref={dotRef}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          willChange: 'transform',
        }}
      >
        <div className="cursor-dot" style={{ transform: 'translate(-50%, -50%)' }} />
      </div>

      <style>{`
        .cursor-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
        }

        /* Default state */
        .cursor-ring {
          width: 28px;
          height: 28px;
          border-radius: var(--r-full);
          border: 1px solid var(--ink-400);
          transition: scale var(--t-fast) var(--ease-out),
                      border-color var(--t-fast) var(--ease-out),
                      background var(--t-fast) var(--ease-out),
                      opacity var(--t-fast) var(--ease-out);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cursor-dot {
          width: 6px;
          height: 6px;
          background: var(--brand-500);
          border-radius: var(--r-full);
          transition: opacity var(--t-fast) var(--ease-out),
                      width var(--t-fast) var(--ease-out),
                      height var(--t-fast) var(--ease-out),
                      border-radius var(--t-fast) var(--ease-out);
        }

        /* Link state & Button state */
        .state-link .cursor-dot,
        .state-button .cursor-dot {
          scale: 2;
        }

        /* Media state */
        .state-media .cursor-ring {
          scale: 2.5;
          background: var(--brand-500);
          border-color: var(--brand-500);
        }
        .state-media .cursor-dot {
          opacity: 0;
        }

        /* Text state */
        .state-text .cursor-ring {
          opacity: 0;
        }
        .state-text .cursor-dot {
          width: 2px;
          height: 24px;
          border-radius: 0;
        }

        /* Pressed state */
        .pressed .cursor-ring {
          scale: 0.88 !important;
        }
      `}</style>
    </div>
  );
}
