/**
 * PrivoLabs — Telemetry
 * Source: 01-ARCHITECTURE.md §6.3
 *
 * Values are measured from the visitor's browser, never hardcoded.
 * Used by the TelemetryRail component.
 */

export type TelemetryRenderer = (key: string, value: string) => void;

/**
 * Initialise performance observers and report measured values.
 * Each metric calls `render(key, formattedValue)` once settled.
 */
export function initTelemetry(render: TelemetryRenderer): void {
  // LCP — Largest Contentful Paint
  try {
    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lcp = entries.at(-1);
      if (lcp) {
        render('LCP', `${(lcp.startTime / 1000).toFixed(2)}s`);
      }
    }).observe({ type: 'largest-contentful-paint', buffered: true });
  } catch {
    // Safari may not support this observer type
  }

  // CLS — Cumulative Layout Shift
  try {
    let clsTotal = 0;
    new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        const layoutShift = entry as PerformanceEntry & {
          hadRecentInput: boolean;
          value: number;
        };
        if (!layoutShift.hadRecentInput) {
          clsTotal += layoutShift.value;
        }
      }
      render('CLS', clsTotal.toFixed(3));
    }).observe({ type: 'layout-shift', buffered: true });
  } catch {
    // Fallback if not supported
  }

  // JS bundle size — measured from resource timing
  window.addEventListener(
    'load',
    () => {
      const jsBytes = performance
        .getEntriesByType('resource')
        .filter((r) => r.name.endsWith('.js'))
        .reduce((sum, r) => {
          const resource = r as PerformanceResourceTiming;
          return sum + (resource.encodedBodySize || 0);
        }, 0);
      render('JS', `${Math.round(jsBytes / 1024)}kB`);
    },
    { once: true }
  );
}
