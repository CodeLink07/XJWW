// views.js
// 视图渲染：概览 / 分数查询 / 多年对比 / 数据表格 / 关于
(function (global) {
  'use strict';

  const charts = {}; // 当前实例化的图表

  function destroyAllCharts() {
    Object.values(charts).forEach(c => c?.destroy());
    Object.keys(charts).forEach(k => delete charts[k]);
  }

  function setRoute(route) {
    document.querySelectorAll('.nav-link').forEach(el => {
      el.classList.toggle('active', el.dataset.route === route);
    });
  }

  // ====================== 概览页 ======================
  function renderOverview() {
    setRoute('#/');
    const tpl = document.getElementById('tpl-overview');
    const root = tpl.content.cloneNode(true);
    document.getElementById('view').replaceChildren(root);

    // 1. Hero 统计
    renderHeroStats();

    // 2. KPI 卡片
    renderKPICards();

    // 3. 关键分数线表格
    renderLinesTable();

    // 4. 600 分对比图
    FJ_DATA.onReady(() => {
      renderCompare600Charts();
    });
  }

  function renderHeroStats() {
    const meta = FJ_DATA.getMeta();
    const totalRows = FJ_DATA.getYears().reduce((s, y) => s + FJ_DATA.getData(y).rows.length, 0);
    const totalCandidates = FJ_DATA.getYears().reduce((s, y) => s + (meta.key_lines[y]?.total_candidates || 0), 0);

    const html = `
      <div class="hero-stat">
        <div class="hero-stat-label">YEARS</div>
        <div class="hero-stat-value">4<span class="unit">年</span></div>
        <div class="hero-stat-sub">2022 · 2023 · 2024 · 2025</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-label">DATA POINTS</div>
        <div class="hero-stat-value">${totalRows.toLocaleString()}<span class="unit">行</span></div>
        <div class="hero-stat-sub">覆盖 ~220–750 分</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-label">CANDIDATES</div>
        <div class="hero-stat-value">${(totalCandidates / 10000).toFixed(0)}<span class="unit">万 +</span></div>
        <div class="hero-stat-sub">物理类累计考生</div>
      </div>
      <div class="hero-stat">
        <div class="hero-stat-label">SOURCE</div>
        <div class="hero-stat-value" style="font-size: 18px;">eeafj.cn</div>
        <div class="hero-stat-sub">福建省教育考试院</div>
      </div>
    `;
    document.getElementById('heroStats').innerHTML = html;
  }

  function renderKPICards() {
    const meta = FJ_DATA.getMeta();
    const years = FJ_DATA.getYears();

    const html = years.map(y => {
      const data = FJ_DATA.getData(y);
      const lines = meta.key_lines[y];
      const color = FJ_DATA.getColor(y);
      // 600 分数据
      const r600 = FJ_DATA.getRankByScore(y, 600);
      return `
        <div class="kpi-card" data-year="${y}" style="--year-color: ${color};">
          <div class="kpi-year">${y}</div>
          <div class="kpi-row">
            <span class="kpi-row-label">特招线</span>
            <span class="kpi-row-value">${lines?.te_zhao || '—'}<span class="unit">分</span></span>
          </div>
          <div class="kpi-row">
            <span class="kpi-row-label">本科线</span>
            <span class="kpi-row-value">${lines?.ben_ke || '—'}<span class="unit">分</span></span>
          </div>
          <div class="kpi-row">
            <span class="kpi-row-label">专科线</span>
            <span class="kpi-row-value">${lines?.zhuan_ke || '—'}<span class="unit">分</span></span>
          </div>
          <div class="kpi-row">
            <span class="kpi-row-label">600 分位次</span>
            <span class="kpi-row-value">${r600?.cumulative?.toLocaleString() || '—'}</span>
          </div>
          <div class="kpi-row">
            <span class="kpi-row-label">考生总数</span>
            <span class="kpi-row-value">${(lines?.total_candidates / 10000).toFixed(1)}<span class="unit">万</span></span>
          </div>
        </div>
      `;
    }).join('');

    document.getElementById('kpiGrid').innerHTML = html;
  }

  function renderLinesTable() {
    const meta = FJ_DATA.getMeta();
    const years = FJ_DATA.getYears();

    const html = years.map(y => {
      const lines = meta.key_lines[y];
      const tzRank = FJ_DATA.getRankByScore(y, lines?.te_zhao)?.cumulative;
      const bkRank = FJ_DATA.getRankByScore(y, lines?.ben_ke)?.cumulative;
      const zkRank = FJ_DATA.getRankByScore(y, lines?.zhuan_ke)?.cumulative;
      const color = FJ_DATA.getColor(y);
      return `
        <tr>
          <td><span class="year-pill" style="--year-color: ${color}; border-color: ${color}40; color: ${color}; padding: 2px 8px; font-size: 12px;"><span class="dot"></span>${y}</span></td>
          <td>${lines?.te_zhao || '—'}</td>
          <td>${tzRank?.toLocaleString() || '—'}</td>
          <td>${lines?.ben_ke || '—'}</td>
          <td>${bkRank?.toLocaleString() || '—'}</td>
          <td>${lines?.zhuan_ke || '—'}</td>
          <td>${zkRank?.toLocaleString() || '—'}</td>
          <td>${lines?.total_candidates?.toLocaleString() || '—'}</td>
        </tr>
      `;
    }).join('');

    document.getElementById('linesTableBody').innerHTML = html;
  }

  function renderCompare600Charts() {
    const years = FJ_DATA.getYears();
    const data = years.map(y => {
      const r = FJ_DATA.getRankByScore(y, 600);
      return { year: y, count: r?.count || 0, cumulative: r?.cumulative || 0 };
    });

    if (charts.ovCount) charts.ovCount.destroy();
    if (charts.ovCum) charts.ovCum.destroy();
    charts.ovCount = FJ_CHARTS.renderCompareCount(document.getElementById('ovCountChart'), data);
    charts.ovCum = FJ_CHARTS.renderCompareCum(document.getElementById('ovCumChart'), data, 'line');
  }

  // ====================== 分数查询页 ======================
  function renderQuery() {
    setRoute('#/query');
    const tpl = document.getElementById('tpl-query');
    const root = tpl.content.cloneNode(true);
    document.getElementById('view').replaceChildren(root);

    FJ_DATA.onReady(() => {
      // 年份选择
      renderYearPills('queryYearPills', 2024, (year) => {
        if (currentScore) doScoreQuery();
        if (currentRank) doRankQuery();
      });

      // 绑定分数→位次事件
      const scoreInput = document.getElementById('scoreInput');
      const scoreSlider = document.getElementById('scoreSlider');
      const scoreSliderVal = document.getElementById('scoreSliderVal');
      scoreInput.addEventListener('input', () => {
        const v = +scoreInput.value;
        if (v >= 200 && v <= 750) {
          currentScore = v;
          doScoreQuery();
        }
      });
      scoreInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          currentScore = +scoreInput.value;
          doScoreQuery();
        }
      });
      scoreSlider.addEventListener('input', () => {
        const v = +scoreSlider.value;
        scoreSliderVal.textContent = v;
        scoreInput.value = v;
        currentScore = v;
        doScoreQuery();
      });
      document.getElementById('scoreQueryBtn').addEventListener('click', () => {
        currentScore = +scoreInput.value;
        doScoreQuery();
      });

      // 绑定位次→分数事件
      const rankInput = document.getElementById('rankInput');
      rankInput.addEventListener('input', () => {
        const v = +rankInput.value;
        if (v >= 1) {
          currentRank = v;
          doRankQuery();
        }
      });
      rankInput.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
          currentRank = +rankInput.value;
          doRankQuery();
        }
      });
      document.getElementById('rankQueryBtn').addEventListener('click', () => {
        currentRank = +rankInput.value;
        doRankQuery();
      });

      // 默认触发一次查询
      doScoreQuery(580);
    });
  }

  let currentScore = null;
  let currentRank = null;
  let currentQueryYear = 2024;

  function renderYearPills(containerId, activeYear, onChange) {
    const years = FJ_DATA.getYears();
    const html = years.map(y => {
      const color = FJ_DATA.getColor(y);
      return `<button class="year-pill ${y === activeYear ? 'active' : ''}" data-year="${y}" style="--year-color: ${color};">
        <span class="dot"></span>${y} 年
      </button>`;
    }).join('');
    const el = document.getElementById(containerId);
    el.innerHTML = html;
    el.addEventListener('click', e => {
      const btn = e.target.closest('.year-pill');
      if (!btn) return;
      el.querySelectorAll('.year-pill').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      onChange?.(+btn.dataset.year);
    });
  }

  function doScoreQuery(force) {
    if (force != null) currentScore = force;
    const score = currentScore ?? +document.getElementById('scoreInput').value;
    if (!score || score < 200 || score > 750) {
      document.getElementById('scoreResult').innerHTML = '';
      return;
    }
    currentScore = score;
    const year = getActiveYear('queryYearPills');
    if (!year) return;
    currentQueryYear = year;
    const r = FJ_DATA.getRankByScore(year, score);
    const cls = FJ_DATA.classifyByRank(year, r.cumulative);
    const lines = FJ_DATA.getMeta().key_lines[year];

    const schools = FJ_SCHOOLS.getRushSteadySafeSchools(r.cumulative);
    const tierInfo = FJ_SCHOOLS.getTierForRank(r.cumulative);

    let schoolsHtml = `
      <div style="margin-top: 20px; padding-top: 20px; border-top: 1px dashed var(--border-subtle);">
        <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 16px;">
          <h4 style="font-size: 14px; font-weight: 600; color: var(--text-primary);">🎓 院校推荐（冲稳保）</h4>
          <span style="font-size: 11px; color: var(--text-tertiary);">位次 ${r.cumulative.toLocaleString()} 对应层级</span>
        </div>
        <div class="schools-grid">
    `;

    ['rush', 'steady', 'safe'].forEach(mode => {
      const modeLabel = mode === 'rush' ? '冲' : mode === 'steady' ? '稳' : '保';
      const modeColor = mode === 'rush' ? '#ff8e3c' : mode === 'steady' ? '#5dccaa' : '#7cd9ff';
      const modeSchools = schools[mode];
      if (modeSchools.length > 0) {
        schoolsHtml += `
          <div class="school-section">
            <div class="school-section-header" style="--mode-color: ${modeColor};">
              <span class="mode-badge">${modeLabel}</span>
              <span class="mode-count">${modeSchools.length} 所</span>
            </div>
            <div class="school-list">
              ${modeSchools.slice(0, 5).map(school => `
                <div class="school-card" title="${school.notes}">
                  <div class="school-name">${school.name}</div>
                  <div class="school-info">${school.location} · ${school.type}</div>
                  <div class="school-rank">位次: ${school.minRank.toLocaleString()}-${school.maxRank.toLocaleString()}</div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      }
    });

    schoolsHtml += `
        </div>
        <div style="margin-top: 12px; padding: 12px; background: var(--bg-card-hover); border-radius: 8px; font-size: 12px; color: var(--text-tertiary);">
          <strong style="color: var(--text-secondary);">💡 填报建议：</strong>
          <span style="margin-left: 4px;">"冲"为略高于当前位次的院校（搏一搏），"稳"为匹配位次的院校（把握大），"保"为位次安全的院校（保底）。建议志愿填报遵循"冲-稳-保"策略，合理分配志愿梯度。</span>
        </div>
      </div>
    `;

    const html = `
      <div class="result-grid">
        <div class="result-item">
          <span class="result-item-label">分数</span>
          <span class="result-item-value accent">${score} <span style="font-size:13px; color: var(--text-tertiary);">分</span></span>
        </div>
        <div class="result-item">
          <span class="result-item-label">同分人数</span>
          <span class="result-item-value">${r.count.toLocaleString()}<span style="font-size:13px; color: var(--text-tertiary);"> 人</span></span>
        </div>
        <div class="result-item">
          <span class="result-item-label">累计位次</span>
          <span class="result-item-value secondary">${r.cumulative.toLocaleString()}<span style="font-size:13px; color: var(--text-tertiary);"> 名</span></span>
        </div>
        <div class="result-item">
          <span class="result-item-label">段位</span>
          <span><span class="tier-badge ${cls.tier}">${cls.label}</span></span>
        </div>
      </div>
      <div style="margin-top: 14px; padding-top: 12px; border-top: 1px dashed var(--border-subtle); font-size: 12px; color: var(--text-tertiary); line-height: 1.7;">
        <div>特招线 (${lines?.te_zhao}分) 对应位次：<strong style="color: var(--text-primary);">${(FJ_DATA.getRankByScore(year, lines?.te_zhao)?.cumulative || 0).toLocaleString()}</strong></div>
        <div>本科线 (${lines?.ben_ke}分) 对应位次：<strong style="color: var(--text-primary);">${(FJ_DATA.getRankByScore(year, lines?.ben_ke)?.cumulative || 0).toLocaleString()}</strong></div>
        <div>专科线 (${lines?.zhuan_ke}分) 对应位次：<strong style="color: var(--text-primary);">${(FJ_DATA.getRankByScore(year, lines?.zhuan_ke)?.cumulative || 0).toLocaleString()}</strong></div>
        <div style="margin-top: 8px;">当前位次对应院校层级：<strong style="color: ${tierInfo.color};">${tierInfo.label}</strong></div>
      </div>
      ${schoolsHtml}
    `;
    document.getElementById('scoreResult').innerHTML = html;

    // 更新滑块
    const slider = document.getElementById('scoreSlider');
    if (slider) {
      slider.value = score;
      document.getElementById('scoreSliderVal').textContent = score;
    }

    // 重新渲染图表
    refreshQueryCharts(year, score);
  }

  function doRankQuery() {
    const rank = currentRank ?? +document.getElementById('rankInput').value;
    if (!rank || rank < 1) {
      document.getElementById('rankResult').innerHTML = '';
      return;
    }
    currentRank = rank;
    const year = getActiveYear('queryYearPills');
    if (!year) return;
    const r = FJ_DATA.getScoreByRank(year, rank);
    const cls = FJ_DATA.classifyByRank(year, rank);
    const html = `
      <div class="result-grid">
        <div class="result-item">
          <span class="result-item-label">位次</span>
          <span class="result-item-value accent">${rank.toLocaleString()}<span style="font-size:13px; color: var(--text-tertiary);"> 名</span></span>
        </div>
        <div class="result-item">
          <span class="result-item-label">对应分数</span>
          <span class="result-item-value">${r.score}<span style="font-size:13px; color: var(--text-tertiary);"> 分</span></span>
          <span class="result-item-sub">该分数同分 ${r.count.toLocaleString()} 人</span>
        </div>
        <div class="result-item">
          <span class="result-item-label">段位</span>
          <span><span class="tier-badge ${cls.tier}">${cls.label}</span></span>
        </div>
      </div>
    `;
    document.getElementById('rankResult').innerHTML = html;
  }

  function refreshQueryCharts(year, score) {
    const lo = Math.max(200, score - 10);
    const hi = Math.min(750, score + 10);
    if (charts.queryCount) charts.queryCount.destroy();
    if (charts.queryCurve) charts.queryCurve.destroy();
    charts.queryCount = FJ_CHARTS.renderCountBar(document.getElementById('queryChart'), year, lo, hi);
    charts.queryCurve = FJ_CHARTS.renderRankCurve(document.getElementById('queryCurveChart'), year);
  }

  function getActiveYear(containerId) {
    const active = document.querySelector(`#${containerId} .year-pill.active`);
    return active ? +active.dataset.year : null;
  }

  // 绑定查询页事件
  function bindQueryEvents() {
    // 暴露到全局供 views 触发
    window.FJ_QUERY = {
      doScoreQuery,
      doRankQuery,
      onYearChange: (year) => {
        if (currentScore) doScoreQuery();
        if (currentRank) doRankQuery();
      }
    };
  }

  // ====================== 多年对比页 ======================
  let compareMode = 'score';
  let compareSelectedYears = [2022, 2023, 2024, 2025];

  function renderCompare() {
    setRoute('#/compare');
    const tpl = document.getElementById('tpl-compare');
    const root = tpl.content.cloneNode(true);
    document.getElementById('view').replaceChildren(root);

    FJ_DATA.onReady(() => {
      // 模式切换
      document.querySelectorAll('#compareModeTabs .mode-tab').forEach(tab => {
        tab.addEventListener('click', () => {
          document.querySelectorAll('#compareModeTabs .mode-tab').forEach(t => t.classList.remove('active'));
          tab.classList.add('active');
          compareMode = tab.dataset.mode;
          const label = compareMode === 'score' ? '分数' : '位次';
          const suffix = compareMode === 'score' ? '分' : '名';
          document.getElementById('compareSliceLabel').textContent = label;
          document.getElementById('compareSliceSuffix').textContent = suffix;
          document.getElementById('compareSliceInput').value = compareMode === 'score' ? 600 : 10000;
          document.getElementById('compareSliceInput').placeholder = compareMode === 'score' ? '例如 600' : '例如 10000';
          runCompare();
        });
      });

      // 年份多选
      renderCompareYearPills();
      // 触发按钮
      document.getElementById('compareRunBtn').addEventListener('click', runCompare);
      document.getElementById('compareSliceInput').addEventListener('keydown', e => {
        if (e.key === 'Enter') runCompare();
      });

      // 默认触发
      document.getElementById('compareSliceInput').value = 600;
      runCompare();
    });
  }

  function renderCompareYearPills() {
    const years = FJ_DATA.getYears();
    const html = years.map(y => {
      const color = FJ_DATA.getColor(y);
      return `<button class="year-pill active" data-year="${y}" style="--year-color: ${color};">
        <span class="dot"></span>${y}
      </button>`;
    }).join('');
    const el = document.getElementById('compareYearPills');
    el.innerHTML = html;
    el.addEventListener('click', e => {
      const btn = e.target.closest('.year-pill');
      if (!btn) return;
      btn.classList.toggle('active');
      runCompare();
    });
  }

  function getSelectedCompareYears() {
    return Array.from(document.querySelectorAll('#compareYearPills .year-pill.active')).map(b => +b.dataset.year).sort();
  }

  function runCompare() {
    const slice = +document.getElementById('compareSliceInput').value;
    if (!slice) return;
    const years = getSelectedCompareYears();
    if (years.length === 0) {
      document.getElementById('compareHint').textContent = '请至少选择一个年份';
      return;
    }
    const data = [];
    years.forEach(y => {
      if (compareMode === 'score') {
        const r = FJ_DATA.getRankByScore(y, slice);
        data.push({ year: y, count: r?.count || 0, cumulative: r?.cumulative || 0, score: slice });
      } else {
        const r = FJ_DATA.getScoreByRank(y, slice);
        data.push({ year: y, count: r?.count || 0, cumulative: slice, score: r?.score });
      }
    });

    // 更新标题
    if (compareMode === 'score') {
      document.getElementById('compareCountTitle').textContent = `${slice} 分 · 同分人数对比`;
      document.getElementById('compareCumTitle').textContent = `${slice} 分 · 累计位次对比`;
      document.getElementById('compareCountSub').textContent = '同年同分人数';
      document.getElementById('compareCumSub').textContent = '同年累计位次';
    } else {
      document.getElementById('compareCountTitle').textContent = `位次 ${slice} 名 · 对应分数同分人数`;
      document.getElementById('compareCumTitle').textContent = `位次 ${slice} 名 · 累计位次`;
      document.getElementById('compareCountSub').textContent = '各年位次对应分数段的同分人数';
      document.getElementById('compareCumSub').textContent = '位次固定为查询值';
    }

    // 重绘图表
    if (charts.compareCount) charts.compareCount.destroy();
    if (charts.compareCum) charts.compareCum.destroy();
    if (charts.compareOverlay) charts.compareOverlay.destroy();
    charts.compareCount = FJ_CHARTS.renderCompareCount(document.getElementById('compareCountChart'), data);
    charts.compareCum = FJ_CHARTS.renderCompareCum(document.getElementById('compareCumChart'), data, 'line');
    charts.compareOverlay = FJ_CHARTS.renderOverlay(document.getElementById('compareOverlayChart'), years);

    // 表格
    const baseRank = data[0]?.cumulative || 0;
    const html = data.map(d => {
      const diff = d.cumulative - baseRank;
      const diffStr = diff === 0 ? '— 基准 —' : (diff > 0 ? `+${diff.toLocaleString()}` : diff.toLocaleString());
      const diffClass = diff === 0 ? '' : (diff > 0 ? 'result-item-value warning' : 'result-item-value');
      const color = FJ_DATA.getColor(d.year);
      return `
        <tr>
          <td><span class="year-pill" style="--year-color: ${color}; border-color: ${color}40; color: ${color}; padding: 2px 8px; font-size: 12px;"><span class="dot"></span>${d.year}</span></td>
          <td>${d.count.toLocaleString()} 人</td>
          <td>${d.cumulative.toLocaleString()} 名</td>
          <td class="${diff === 0 ? '' : diffClass}">${diffStr}</td>
        </tr>
      `;
    }).join('');
    document.getElementById('compareResultBody').innerHTML = html;

    // 提示
    if (compareMode === 'score') {
      const ranks = data.map(d => d.cumulative).filter(Boolean);
      const minR = Math.min(...ranks), maxR = Math.max(...ranks);
      document.getElementById('compareHint').textContent = `${slice} 分在 ${years.length} 年间累计位次波动：${minR.toLocaleString()} – ${maxR.toLocaleString()}` + (maxR - minR > 0 ? `（差距 ${(maxR - minR).toLocaleString()} 名）` : '');
    } else {
      const scores = data.map(d => d.score).filter(Boolean);
      const minS = Math.min(...scores), maxS = Math.max(...scores);
      document.getElementById('compareHint').textContent = `位次 ${slice} 名在 ${years.length} 年间对应分数波动：${minS} – ${maxS} 分` + (maxS - minS > 0 ? `（差距 ${maxS - minS} 分）` : '');
    }
  }

  // ====================== 数据表格页 ======================
  let tableYear = 2024;
  let tableSort = { key: 'score', dir: 'desc' };
  let tableSearch = '';
  let tableFiltered = [];

  function renderTable() {
    setRoute('#/table');
    const tpl = document.getElementById('tpl-table');
    const root = tpl.content.cloneNode(true);
    document.getElementById('view').replaceChildren(root);

    FJ_DATA.onReady(() => {
      renderYearPills('tableYearPills', tableYear, (y) => {
        tableYear = y;
        refreshTable();
      });

      document.getElementById('tableSearch').addEventListener('input', e => {
        tableSearch = e.target.value.trim();
        refreshTable();
      });

      document.getElementById('tableExportBtn').addEventListener('click', exportTableCSV);

      document.querySelectorAll('#dataTable th.sortable').forEach(th => {
        th.addEventListener('click', () => {
          const key = th.dataset.sort;
          if (tableSort.key === key) {
            tableSort.dir = tableSort.dir === 'asc' ? 'desc' : 'asc';
          } else {
            tableSort.key = key;
            tableSort.dir = 'desc';
          }
          refreshTable();
        });
      });

      refreshTable();
    });
  }

  function refreshTable() {
    const rows = FJ_DATA.getRows(tableYear);
    let filtered = rows;
    if (tableSearch) {
      const s = parseInt(tableSearch, 10);
      if (!isNaN(s)) {
        filtered = rows.filter(r => String(r.score).includes(String(s)));
      } else {
        filtered = rows;
      }
    }
    filtered = [...filtered].sort((a, b) => {
      const av = a[tableSort.key], bv = b[tableSort.key];
      return tableSort.dir === 'asc' ? av - bv : bv - av;
    });
    tableFiltered = filtered;

    // meta
    const lines = FJ_DATA.getMeta().key_lines[tableYear];
    document.getElementById('tableMeta').innerHTML = `
      ${tableYear} 年 · 共 ${rows.length} 行 · 特招线 ${lines?.te_zhao} 分（位次 ${(FJ_DATA.getRankByScore(tableYear, lines?.te_zhao)?.cumulative || 0).toLocaleString()}） · 本科线 ${lines?.ben_ke} 分（位次 ${(FJ_DATA.getRankByScore(tableYear, lines?.ben_ke)?.cumulative || 0).toLocaleString()}）
    `;

    // 高亮搜索匹配
    const highlightScore = tableSearch ? parseInt(tableSearch, 10) : null;

    // 表格
    const html = filtered.slice(0, 500).map(r => {
      const cls = FJ_DATA.classifyByScore(tableYear, r.score);
      const isHL = highlightScore === r.score;
      return `
        <tr class="${isHL ? 'highlighted' : ''}">
          <td class="num">${r.score}</td>
          <td class="num">${r.count.toLocaleString()}</td>
          <td class="num">${r.cumulative.toLocaleString()}</td>
          <td>${cls ? `<span class="tier-badge ${cls.tier}">${cls.label}</span>` : ''}</td>
        </tr>
      `;
    }).join('');
    document.getElementById('dataTableBody').innerHTML = html || `<tr><td colspan="4" style="text-align: center; color: var(--text-tertiary); padding: 32px;">无匹配数据</td></tr>`;

    // 排序指示
    document.querySelectorAll('#dataTable th.sortable').forEach(th => {
      th.classList.remove('active-sort', 'asc', 'desc');
      if (th.dataset.sort === tableSort.key) {
        th.classList.add('active-sort', tableSort.dir);
      }
    });
  }

  function exportTableCSV() {
    const rows = tableFiltered;
    if (!rows.length) return;
    const header = '分数,同分人数,累计位次,段位\n';
    const lines = FJ_DATA.getMeta().key_lines[tableYear];
    const body = rows.map(r => {
      const cls = FJ_DATA.classifyByScore(tableYear, r.score);
      return `${r.score},${r.count},${r.cumulative},${cls?.label || ''}`;
    }).join('\n');
    const csv = '\ufeff' + header + body;
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `福建物理类一分一段_${tableYear}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // ====================== 关于页 ======================
  function renderAbout() {
    setRoute('#/about');
    const tpl = document.getElementById('tpl-about');
    const root = tpl.content.cloneNode(true);
    document.getElementById('view').replaceChildren(root);

    // 数据来源
    const sources = FJ_DATA.getMeta().data_sources;
    document.getElementById('aboutSourceList').innerHTML = sources.map(s =>
      `<li><a href="${s.url}" target="_blank" rel="noopener" style="color: var(--accent-primary);">${s.year} · ${s.label}</a></li>`
    ).join('');

    // 院校层级
    document.getElementById('tierList').innerHTML = FJ_SCHOOLS.SCHOOL_TIERS.map(t => `
      <li style="--tier-color: ${t.color};">
        <span class="tier-rank">位次 ≤ ${t.rankMax.toLocaleString()}</span>
        <span class="tier-name">${t.label}</span>
      </li>
    `).join('');
  }

  // 暴露到全局
  global.FJ_VIEWS = {
    renderOverview,
    renderQuery,
    renderCompare,
    renderTable,
    renderAbout,
    bindQueryEvents
  };
})(window);
