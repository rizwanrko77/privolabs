/**
 * PrivoLabs — TelemetryRail (React Island)
 * Source: 02-DESIGN-SYSTEM.md §3.12
 *
 * 96px fixed left column, persistent sitewide.
 * Displays: section number, vertical scroll hairline, live telemetry, section tick.
 * Values are measured, never hardcoded.
 *
 * client:load — must observe the load it reports on.
 *
 * Below 900px: collapses to top progress bar,
 * telemetry relocates to a collapsible footer strip.
 */

import { useEffect, useRef, useState } from 'react';
import { initTelemetry } from '../../lib/telemetry';

interface TelemetryValue {
  key: string;
  value: string;
}

export default function TelemetryRail() {
  const [metrics, setMetrics] = useState<TelemetryValue[]>([]);
  const [sectionNumber, setSectionNumber] = useState('01');
  const [isCompact, setIsCompact] = useState(false);
  const [footerExpanded, setFooterExpanded] = useState(false);
  const railRef = useRef<HTMLDivElement>(null);
  const initialised = useRef(false);

  // Initialise telemetry observers on mount
  useEffect(() => {
    if (initialised.current) return;
    initialised.current = true;

    // We don't read reducedMotion here, telemetry works identically either way.
    window.matchMedia('(prefers-reduced-motion: reduce)');

    initTelemetry((key: string, value: string) => {
      setMetrics((prev) => {
        const existing = prev.findIndex((m) => m.key === key);
        if (existing >= 0) {
          const updated = [...prev];
          updated[existing] = { key, value };
          return updated;
        }
        return [...prev, { key, value }];
      });
    });

    // Responsive check: collapse below 900px
    const mq = window.matchMedia('(min-width: 900px)');
    const handleResize = (e: MediaQueryListEvent | MediaQueryList) => {
      setIsCompact(!e.matches);
    };
    handleResize(mq);
    mq.addEventListener('change', handleResize);

    // Track section number via IntersectionObserver
    const sections = document.querySelectorAll('[data-section]');
    if (sections.length > 0) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const num =
                (entry.target as HTMLElement).dataset.section || '01';
              setSectionNumber(num.padStart(2, '0'));
            }
          });
        },
        { threshold: 0.3 }
      );

      sections.forEach((s) => sectionObserver.observe(s));

      return () => {
        mq.removeEventListener('change', handleResize);
        sectionObserver.disconnect();
      };
    }

    return () => {
      mq.removeEventListener('change', handleResize);
    };
  }, []);

  // Desktop rail (>= 900px)
  if (!isCompact) {
    return (
      <aside
        ref={railRef}
        className="telemetry-rail"
        aria-label="Performance telemetry"
        style={{
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0,
          width: '96px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '96px 0 32px',
          pointerEvents: 'none',
        }}
      >
        {/* Section number — split-flap style */}
        <div
          className="font-mono"
          style={{
            fontSize: 'var(--label)',
            fontWeight: 500,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--text-faint)',
          }}
          aria-label={`Section ${sectionNumber}`}
        >
          {sectionNumber}
        </div>

        {/* Vertical scroll hairline */}
        <div
          style={{
            flex: 1,
            width: '1px',
            background: 'var(--rule)',
            margin: '24px 0',
            position: 'relative',
          }}
        >
          {/* Orange tick — pulses 0.4 → 1 opacity on 3s cycle */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: '-2px',
              width: '5px',
              height: '5px',
              borderRadius: 'var(--r-full)',
              background: 'var(--brand-500)',
              animation: 'rail-pulse 3s ease-in-out infinite',
            }}
          />
        </div>

        {/* Live telemetry values */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '16px',
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.key}
              style={{ textAlign: 'center' }}
              aria-live="polite"
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '10px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                  marginBottom: '2px',
                }}
              >
                {m.key}
              </div>
              <div
                className="font-mono metric-value"
                style={{
                  fontSize: '11px',
                  color: 'var(--text-brand)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
        </div>

        {/* Caption */}
        <div
          className="font-mono"
          style={{
            fontSize: '8px',
            letterSpacing: '0.06em',
            color: 'var(--text-faint)',
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            marginTop: '16px',
            opacity: 0.6,
          }}
        >
          Measured on your device, this page load.
        </div>
      </aside>
    );
  }

  // Mobile/compact: collapsible footer strip
  return (
    <div
      className="telemetry-compact"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'var(--ink-900)',
        borderTop: '1px solid var(--rule)',
      }}
    >
      <button
        onClick={() => setFooterExpanded(!footerExpanded)}
        aria-expanded={footerExpanded}
        aria-label="Toggle performance metrics"
        className="font-mono"
        style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          padding: '8px 16px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          pointerEvents: 'auto',
          fontSize: '10px',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          color: 'var(--text-faint)',
        }}
      >
        {metrics.length > 0 && !footerExpanded && (
          <>
            {metrics.map((m) => (
              <span key={m.key} style={{ fontVariantNumeric: 'tabular-nums' }}>
                <span style={{ color: 'var(--text-faint)' }}>{m.key}</span>{' '}
                <span style={{ color: 'var(--text-brand)' }}>{m.value}</span>
              </span>
            ))}
          </>
        )}
        <span
          style={{
            transform: footerExpanded ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform var(--t-quick) var(--ease-out)',
            display: 'inline-block',
          }}
        >
          ▲
        </span>
      </button>

      {footerExpanded && (
        <div
          style={{
            padding: '12px 16px',
            display: 'flex',
            flexWrap: 'wrap',
            gap: '16px',
            justifyContent: 'center',
            borderTop: '1px solid var(--rule)',
          }}
        >
          {metrics.map((m) => (
            <div
              key={m.key}
              style={{ textAlign: 'center' }}
              aria-live="polite"
            >
              <div
                className="font-mono"
                style={{
                  fontSize: '9px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: 'var(--text-faint)',
                  marginBottom: '2px',
                }}
              >
                {m.key}
              </div>
              <div
                className="font-mono"
                style={{
                  fontSize: '13px',
                  color: 'var(--text-brand)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {m.value}
              </div>
            </div>
          ))}
          <div
            className="font-mono"
            style={{
              fontSize: '8px',
              color: 'var(--text-faint)',
              width: '100%',
              textAlign: 'center',
              opacity: 0.6,
            }}
          >
            Measured on your device, this page load.
          </div>
        </div>
      )}
    </div>
  );
}
