import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const chartCss = `
  .cursor-usage-charts {
    min-width: 0;
    margin-bottom: 24px;
  }
  .cursor-usage-charts .chart-wrap {
    background: linear-gradient(180deg, #1f2540 25%, #262944 100%);
    border-radius: 12px;
    padding: 28px 28px 20px;
    font-family: var(--font-sans);
    box-sizing: border-box;
    max-width: 100%;
  }
  .cursor-usage-charts .chart-title {
    color: #d5d6e0;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    margin-bottom: 6px;
    opacity: 0.6;
  }
  .cursor-usage-charts .chart-headline {
    color: #fffffe;
    font-size: 15px;
    font-weight: 500;
    margin-bottom: 20px;
  }
  .cursor-usage-charts .legend {
    display: flex;
    gap: 20px;
    margin-bottom: 18px;
  }
  .cursor-usage-charts .legend-item {
    display: flex;
    align-items: center;
    gap: 7px;
    font-size: 12px;
    color: #d5d6e0;
    opacity: 0.9;
  }
  .cursor-usage-charts .legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 2px;
    flex-shrink: 0;
  }
  .cursor-usage-charts .charts-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 28px;
  }
  .cursor-usage-charts .chart-panel {
    position: relative;
    min-width: 0;
  }
  .cursor-usage-charts .panel-label {
    color: #d5d6e0;
    font-size: 12px;
    margin-bottom: 12px;
    opacity: 0.9;
  }
  @media (max-width: 540px) {
    .cursor-usage-charts .chart-wrap {
      padding: 20px 16px 16px;
    }
    .cursor-usage-charts .charts-row {
      grid-template-columns: 1fr;
      gap: 24px;
    }
  }
`;

const gridColor = "rgba(167,169,190,0.1)";
const textColor = "#d5d6e0";
const oct = "#545faa";
const mar = "#e53170";

const baseOpts = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: { display: false },
    tooltip: { enabled: false },
  },
  scales: {
    x: {
      grid: { display: false },
      border: { display: false },
      ticks: { color: textColor, font: { size: 11 }, padding: 6 },
    },
    y: {
      grid: { color: gridColor, drawBorder: false },
      border: { display: false, dash: [3, 3] },
      ticks: { color: textColor, font: { size: 11 }, padding: 8 },
    },
  },
};

function makeChart(
  canvas: HTMLCanvasElement,
  labels: string[],
  data: number[],
  colors: string[],
  maxY: number,
): Chart {
  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas 2D context unavailable");
  }
  return new Chart(ctx, {
    type: "bar",
    data: {
      labels,
      datasets: [
        {
          data,
          backgroundColor: colors,
          borderRadius: 5,
          borderSkipped: false,
          barPercentage: 0.55,
        },
      ],
    },
    options: {
      ...baseOpts,
      scales: {
        ...baseOpts.scales,
        y: {
          ...baseOpts.scales.y,
          max: maxY,
          ticks: {
            ...baseOpts.scales.y.ticks,
            stepSize: Math.ceil(maxY / 4),
          },
        },
      },
      animation: {
        onComplete(ctx) {
          const chart = ctx.chart;
          const c = chart.ctx;
          c.save();
          c.font = `500 12px ${getComputedStyle(document.body).fontFamily}`;
          c.textAlign = "center";
          c.textBaseline = "bottom";
          chart.data.datasets[0].data.forEach((val, i) => {
            const meta = chart.getDatasetMeta(0);
            const bar = meta.data[i];
            c.fillStyle = "#fffffe";
            c.fillText(Number(val).toLocaleString(), bar.x, bar.y - 5);
          });
          c.restore();
        },
      },
    },
  });
}

export function CursorUsageCharts() {
  const c1 = useRef<HTMLCanvasElement>(null);
  const c2 = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas1 = c1.current;
    const canvas2 = c2.current;
    if (!canvas1 || !canvas2) return;

    const charts: Chart[] = [
      makeChart(
        canvas1,
        ["Oct 2025", "Mar 2026"],
        [2509, 493],
        [oct, mar],
        2800,
      ),
      makeChart(canvas2, ["Oct 2025", "Mar 2026"], [79, 257], [oct, mar], 290),
    ];

    return () => {
      charts.forEach((ch) => ch.destroy());
    };
  }, []);

  return (
    <div className="cursor-usage-charts">
      <style>{chartCss}</style>
      <div className="chart-wrap">
        <div className="chart-title">Cursor usage — month totals</div>
        <div className="chart-headline">Oct 2025 vs Mar 2026</div>
        <div className="legend">
          <div className="legend-item">
            <div className="legend-dot" style={{ background: oct }} />
            Oct 2025
          </div>
          <div className="legend-item">
            <div className="legend-dot" style={{ background: mar }} />
            Mar 2026
          </div>
        </div>
        <div className="charts-row">
          <div className="chart-panel">
            <div className="panel-label">Tab completions accepted</div>
            <div style={{ position: "relative", height: 200 }}>
              <canvas ref={c1} />
            </div>
          </div>
          <div className="chart-panel">
            <div className="panel-label">Agent requests</div>
            <div style={{ position: "relative", height: 200 }}>
              <canvas ref={c2} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
