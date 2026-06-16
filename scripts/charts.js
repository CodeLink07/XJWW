// charts.js
// Chart.js 包装：所有图表统一在此实例化
(function (global) {
  'use strict';

  // 全局 Chart.js 默认配置
  function applyChartDefaults() {
    if (typeof Chart === 'undefined') return;
    Chart.defaults.color = '#8b96b0';
    Chart.defaults.font.family = "'Inter', 'JetBrains Mono', system-ui, sans-serif";
    Chart.defaults.font.size = 11;
    Chart.defaults.borderColor = 'rgba(255, 255, 255, 0.06)';
    Chart.defaults.animation = { duration: 600, easing: 'easeOutQuart' };
    Chart.defaults.plugins.legend.display = false;
  }

  applyChartDefaults();

  // 共用 tooltip 配置
  const tooltipStyle = {
    backgroundColor: 'rgba(13, 19, 37, 0.95)',
    titleColor: '#e6ecf5',
    bodyColor: '#e6ecf5',
    borderColor: 'rgba(93, 204, 170, 0.3)',
    borderWidth: 1,
    padding: 10,
    cornerRadius: 8,
    displayColors: true,
    titleFont: { size: 12, weight: '600' },
    bodyFont: { size: 12 },
    boxPadding: 4
  };

  // 网格线样式
  const gridStyle = {
    color: 'rgba(255, 255, 255, 0.04)',
    drawTicks: false
  };

  const axisStyle = {
    ticks: { color: '#5a6376', font: { size: 10.5, family: "'JetBrains Mono', monospace" } },
    grid: gridStyle,
    border: { display: false }
  };

  /**
   * 同分人数柱状图（单年）
   */
  function renderCountBar(canvas, year, scoreMin, scoreMax) {
    const data = FJ_DATA.getData(year);
    if (!data) return null;
    const rows = data.rows.filter(r => r.score >= scoreMin && r.score <= scoreMax);
    const color = FJ_DATA.getColor(year);

    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: rows.map(r => r.score),
        datasets: [{
          data: rows.map(r => r.count),
          backgroundColor: rows.map(r => {
            const lines = FJ_DATA.getMeta().key_lines[year];
            if (r.score >= lines?.te_zhao) return color + 'cc';
            if (r.score >= lines?.ben_ke) return '#ffb84ccc';
            return '#5a637680';
          }),
          borderColor: color,
          borderWidth: 0,
          borderRadius: 2,
          barPercentage: 0.85,
          categoryPercentage: 0.95
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              title: (items) => `${items[0].label} 分`,
              label: (item) => `同分人数: ${item.raw.toLocaleString()} 人`
            }
          }
        },
        scales: {
          x: { ...axisStyle, title: { display: true, text: '分数', color: '#5a6376', font: { size: 10 } } },
          y: { ...axisStyle, beginAtZero: true, title: { display: true, text: '同分人数', color: '#5a6376', font: { size: 10 } } }
        }
      }
    });
  }

  /**
   * 分数-位次 累计曲线
   */
  function renderRankCurve(canvas, year) {
    const data = FJ_DATA.getData(year);
    if (!data) return null;
    const rows = data.rows;
    const color = FJ_DATA.getColor(year);
    const lines = FJ_DATA.getMeta().key_lines[year];

    // 标注关键分数线
    const annotations = [];
    if (lines?.te_zhao) {
      const r = FJ_DATA.getRankByScore(year, lines.te_zhao);
      if (r) annotations.push({ x: lines.te_zhao, label: `特招线 ${lines.te_zhao}` });
    }
    if (lines?.ben_ke) {
      annotations.push({ x: lines.ben_ke, label: `本科线 ${lines.ben_ke}` });
    }

    return new Chart(canvas, {
      type: 'line',
      data: {
        labels: rows.map(r => r.score),
        datasets: [{
          data: rows.map(r => r.cumulative),
          borderColor: color,
          backgroundColor: (ctx) => {
            const chart = ctx.chart;
            const { ctx: c, chartArea } = chart;
            if (!chartArea) return color + '20';
            const gradient = c.createLinearGradient(0, chartArea.top, 0, chartArea.bottom);
            gradient.addColorStop(0, color + '40');
            gradient.addColorStop(1, color + '00');
            return gradient;
          },
          borderWidth: 2,
          pointRadius: 0,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: color,
          pointHoverBorderColor: '#fff',
          pointHoverBorderWidth: 2,
          fill: true,
          tension: 0.15
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: {
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              title: (items) => `${items[0].label} 分`,
              label: (item) => `累计位次: ${item.raw.toLocaleString()} 名`
            }
          }
        },
        scales: {
          x: {
            ...axisStyle,
            title: { display: true, text: '分数（从高到低）', color: '#5a6376', font: { size: 10 } },
            ticks: {
              ...axisStyle.ticks,
              maxTicksLimit: 12,
              autoSkip: true
            }
          },
          y: {
            ...axisStyle,
            title: { display: true, text: '累计位次', color: '#5a6376', font: { size: 10 } },
            ticks: {
              ...axisStyle.ticks,
              callback: (v) => v >= 10000 ? (v / 10000).toFixed(0) + '万' : v.toLocaleString()
            }
          }
        }
      }
    });
  }

  /**
   * 多年同分人数对比（柱状）
   */
  function renderCompareCount(canvas, compareData) {
    return new Chart(canvas, {
      type: 'bar',
      data: {
        labels: compareData.map(d => d.year + '年'),
        datasets: [{
          data: compareData.map(d => d.count || 0),
          backgroundColor: compareData.map(d => FJ_DATA.getColor(d.year) + 'cc'),
          borderColor: compareData.map(d => FJ_DATA.getColor(d.year)),
          borderWidth: 1,
          borderRadius: 6,
          barPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              title: (items) => items[0].label,
              label: (item) => `同分人数: ${item.raw.toLocaleString()} 人`
            }
          }
        },
        scales: {
          x: { ...axisStyle },
          y: { ...axisStyle, beginAtZero: true }
        }
      }
    });
  }

  /**
   * 多年累计位次对比（柱状/折线）
   */
  function renderCompareCum(canvas, compareData, type = 'bar') {
    const cfg = {
      type,
      data: {
        labels: compareData.map(d => d.year + '年'),
        datasets: [{
          data: compareData.map(d => d.cumulative || 0),
          backgroundColor: type === 'bar' ? compareData.map(d => FJ_DATA.getColor(d.year) + 'cc') : 'transparent',
          borderColor: compareData.map(d => FJ_DATA.getColor(d.year)),
          borderWidth: 2,
          borderRadius: type === 'bar' ? 6 : 0,
          fill: false,
          tension: 0.3,
          pointRadius: 5,
          pointBackgroundColor: compareData.map(d => FJ_DATA.getColor(d.year)),
          pointBorderColor: '#0a0e1a',
          pointBorderWidth: 2,
          barPercentage: 0.7
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              title: (items) => items[0].label,
              label: (item) => `累计位次: ${item.raw.toLocaleString()} 名`
            }
          }
        },
        scales: {
          x: { ...axisStyle },
          y: {
            ...axisStyle,
            beginAtZero: true,
            ticks: {
              ...axisStyle.ticks,
              callback: (v) => v >= 10000 ? (v / 10000).toFixed(0) + '万' : v.toLocaleString()
            }
          }
        }
      }
    };
    return new Chart(canvas, cfg);
  }

  /**
   * 多年同分人数叠加曲线（按分数）
   */
  function renderOverlay(canvas, years) {
    const datasets = years.map(y => {
      const data = FJ_DATA.getData(y);
      const color = FJ_DATA.getColor(y);
      return {
        label: y + '年',
        data: data.rows.map(r => ({ x: r.score, y: r.count })),
        borderColor: color,
        backgroundColor: color + '20',
        borderWidth: 1.5,
        pointRadius: 0,
        pointHoverRadius: 4,
        fill: false,
        tension: 0.2
      };
    });

    return new Chart(canvas, {
      type: 'line',
      data: { datasets },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'nearest', axis: 'x', intersect: false },
        plugins: {
          tooltip: {
            ...tooltipStyle,
            callbacks: {
              title: (items) => `${items[0].parsed.x} 分`,
              label: (item) => `${item.dataset.label}: ${item.parsed.y.toLocaleString()} 人`
            }
          },
          legend: { display: true, position: 'top', align: 'end', labels: { boxWidth: 12, boxHeight: 12, padding: 12, color: '#8b96b0', font: { size: 11.5 } } }
        },
        scales: {
          x: {
            type: 'linear',
            ...axisStyle,
            title: { display: true, text: '分数', color: '#5a6376', font: { size: 10 } },
            reverse: true,
            ticks: { ...axisStyle.ticks, stepSize: 20 }
          },
          y: {
            ...axisStyle,
            beginAtZero: true,
            title: { display: true, text: '同分人数', color: '#5a6376', font: { size: 10 } }
          }
        }
      }
    });
  }

  global.FJ_CHARTS = {
    renderCountBar,
    renderRankCurve,
    renderCompareCount,
    renderCompareCum,
    renderOverlay
  };
})(window);
