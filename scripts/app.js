// app.js
// 应用入口：路由 + 初始化 + 状态管理
(function (global) {
  'use strict';

  const ROUTES = {
    '#/':        { name: 'overview', render: () => FJ_VIEWS.renderOverview() },
    '#/query':   { name: 'query',    render: () => FJ_VIEWS.renderQuery() },
    '#/compare': { name: 'compare',  render: () => FJ_VIEWS.renderCompare() },
    '#/table':   { name: 'table',    render: () => FJ_VIEWS.renderTable() },
    '#/about':   { name: 'about',    render: () => FJ_VIEWS.renderAbout() }
  };

  let currentChartSet = global.FJ_VIEWS ? null : null; // 占位

  function destroyAllCharts() {
    if (typeof Chart === 'undefined' || typeof Chart.getChart !== 'function') return;
    document.querySelectorAll('canvas').forEach(canvas => {
      const chart = Chart.getChart(canvas);
      if (chart) chart.destroy();
    });
  }

  function getRoute() {
    const hash = location.hash || '#/';
    return ROUTES[hash] ? hash : '#/';
  }

  function navigate(hash) {
    if (location.hash === hash) {
      // 强制重渲染同路由
      renderRoute();
    } else {
      location.hash = hash;
    }
  }

  function renderRoute() {
    const hash = getRoute();
    const route = ROUTES[hash];

    // 销毁当前所有 chart 实例，避免 canvas 复用报错
    destroyAllCharts();

    // 切换主视图
    try {
      route.render();
    } catch (e) {
      console.error(`Render ${hash} failed:`, e);
      const view = document.getElementById('view');
      if (view) {
        view.innerHTML = `
          <div style="padding: 48px; text-align: center; color: var(--text-secondary);">
            <h2 style="color: var(--accent-danger); margin-bottom: 12px;">页面渲染出错</h2>
            <p>${e.message || e}</p>
            <p style="margin-top: 16px; font-size: 12px;">请打开浏览器控制台查看详情</p>
          </div>
        `;
      }
    }

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'instant' });
  }

  function setDataStatus(state) {
    const dot = document.getElementById('dataStatus');
    const txt = document.getElementById('dataStatusText');
    if (!dot || !txt) return;
    dot.classList.remove('ready', 'error');
    if (state === 'loading') {
      txt.textContent = '加载中';
    } else if (state === 'ready') {
      dot.classList.add('ready');
      txt.textContent = '数据就绪';
    } else if (state === 'error') {
      dot.classList.add('error');
      txt.textContent = '加载失败';
    }
  }

  function bindNavLinks() {
    document.querySelectorAll('.nav-link, [data-route]').forEach(el => {
      el.addEventListener('click', e => {
        const route = el.dataset.route;
        if (route) {
          // 浏览器 hash 跳转原生处理即可，无需 preventDefault
        }
      });
    });
  }

  async function boot() {
    setDataStatus('loading');

    // 1. 加载数据
    try {
      await FJ_DATA.loadAll();
      setDataStatus('ready');
    } catch (e) {
      console.error('Failed to load data:', e);
      setDataStatus('error');
      const view = document.getElementById('view');
      if (view) {
        view.innerHTML = `
          <div style="padding: 64px; text-align: center; color: var(--text-secondary); max-width: 560px; margin: 0 auto;">
            <div style="font-size: 48px; margin-bottom: 16px;">⚠️</div>
            <h2 style="color: var(--accent-danger); margin-bottom: 12px;">数据加载失败</h2>
            <p style="line-height: 1.7;">无法读取 <code>data/meta.json</code> 或 <code>data/&lt;year&gt;.json</code>。<br>请通过本地 HTTP 服务器访问（不能直接双击 index.html）。</p>
            <p style="margin-top: 16px; font-size: 12px; color: var(--text-tertiary);">错误信息：${e.message || e}</p>
            <pre style="margin-top: 24px; padding: 16px; background: var(--bg-card); border-radius: 8px; font-size: 12px; text-align: left; color: var(--accent-primary);"># 推荐使用 Python 自带服务器：
cd d:\\NB
python -m http.server 8000
# 然后访问 http://localhost:8000</pre>
          </div>
        `;
      }
      return;
    }

    // 2. 绑定导航
    bindNavLinks();

    // 3. 监听 hash 变化
    window.addEventListener('hashchange', renderRoute);

    // 4. 首次渲染
    renderRoute();
  }

  // 等待 DOM 与依赖脚本就绪
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }

  // 暴露 navigate 供其他模块调用
  global.FJ_APP = { navigate, getRoute };
})(window);
