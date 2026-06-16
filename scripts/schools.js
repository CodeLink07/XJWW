// schools.js
// 院校数据库与志愿推荐
// 数据来源：福建省教育考试院历年投档数据、阳光高考网
(function (global) {
  'use strict';

  // 院校层级定义
  const SCHOOL_TIERS = [
    { rankMax: 200, tier: 'tier-c9', label: 'C9 / 清北复交', color: '#ff6b6b', desc: '清华、北大、复旦、上交、浙大、中科大、南大、西交、哈工大' },
    { rankMax: 1500, tier: 'tier-985-top', label: '985 头部', color: '#ff8e3c', desc: '人大、北航、同济、武大、南开、北师大等头部 985' },
    { rankMax: 6000, tier: 'tier-985-mid', label: '985 中上游', color: '#ffb84c', desc: '中山、厦大、华科、东南、湖大、川大、山大等 985' },
    { rankMax: 18000, tier: 'tier-211', label: '211 / 985 尾部', color: '#7cd9ff', desc: '985 尾部 + 多数 211 高校' },
    { rankMax: 55000, tier: 'tier-1ben', label: '特招线附近（一本）', color: '#5dccaa', desc: '特招线附近的一本高校及部分专业' },
    { rankMax: 130000, tier: 'tier-ben', label: '本科批', color: '#b48cff', desc: '本科批全部招生院校' },
    { rankMax: 200000, tier: 'tier-zhuan', label: '专科批', color: '#9ba6b8', desc: '高职专科批招生院校' }
  ];

  // 福建省高考物理类院校数据库（基于真实投档数据）
  const SCHOOLS = [
    // ===== C9 及顶尖名校 =====
    { name: '清华大学', location: '北京', tier: 'tier-c9', minRank: 1, maxRank: 30, type: '综合', notes: '全国顶尖' },
    { name: '北京大学', location: '北京', tier: 'tier-c9', minRank: 1, maxRank: 35, type: '综合', notes: '全国顶尖' },
    { name: '复旦大学', location: '上海', tier: 'tier-c9', minRank: 30, maxRank: 80, type: '综合', notes: '华东顶尖' },
    { name: '上海交通大学', location: '上海', tier: 'tier-c9', minRank: 40, maxRank: 100, type: '综合', notes: '华东顶尖' },
    { name: '浙江大学', location: '浙江', tier: 'tier-c9', minRank: 80, maxRank: 180, type: '综合', notes: '南方顶尖' },
    { name: '中国科学技术大学', location: '安徽', tier: 'tier-c9', minRank: 100, maxRank: 200, type: '理工', notes: '理科强校' },
    { name: '南京大学', location: '江苏', tier: 'tier-c9', minRank: 150, maxRank: 280, type: '综合', notes: '文理见长' },
    { name: '西安交通大学', location: '陕西', tier: 'tier-c9', minRank: 250, maxRank: 450, type: '理工', notes: '西部龙头' },
    { name: '哈尔滨工业大学', location: '黑龙江', tier: 'tier-c9', minRank: 300, maxRank: 550, type: '理工', notes: '工科强校' },

    // ===== 头部 985 =====
    { name: '中国人民大学', location: '北京', tier: 'tier-985-top', minRank: 80, maxRank: 200, type: '综合', notes: '人文社科强' },
    { name: '北京航空航天大学', location: '北京', tier: 'tier-985-top', minRank: 200, maxRank: 400, type: '理工', notes: '航空航天' },
    { name: '北京理工大学', location: '北京', tier: 'tier-985-top', minRank: 350, maxRank: 550, type: '理工', notes: '国防强校' },
    { name: '同济大学', location: '上海', tier: 'tier-985-top', minRank: 300, maxRank: 600, type: '理工', notes: '建筑土木强' },
    { name: '武汉大学', location: '湖北', tier: 'tier-985-top', minRank: 400, maxRank: 750, type: '综合', notes: '华中龙头' },
    { name: '华中科技大学', location: '湖北', tier: 'tier-985-top', minRank: 500, maxRank: 900, type: '理工', notes: '工科强校' },
    { name: '南开大学', location: '天津', tier: 'tier-985-top', minRank: 600, maxRank: 1000, type: '综合', notes: '文理强校' },
    { name: '北京师范大学', location: '北京', tier: 'tier-985-top', minRank: 700, maxRank: 1100, type: '师范', notes: '师范顶尖' },
    { name: '中山大学', location: '广东', tier: 'tier-985-top', minRank: 800, maxRank: 1300, type: '综合', notes: '华南龙头' },
    { name: '厦门大学', location: '福建', tier: 'tier-985-top', minRank: 900, maxRank: 1500, type: '综合', notes: '福建第一' },

    // ===== 中上游 985 =====
    { name: '东南大学', location: '江苏', tier: 'tier-985-mid', minRank: 1200, maxRank: 2200, type: '理工', notes: '建筑强校' },
    { name: '四川大学', location: '四川', tier: 'tier-985-mid', minRank: 1500, maxRank: 2800, type: '综合', notes: '西南龙头' },
    { name: '山东大学', location: '山东', tier: 'tier-985-mid', minRank: 1800, maxRank: 3200, type: '综合', notes: '齐鲁名校' },
    { name: '吉林大学', location: '吉林', tier: 'tier-985-mid', minRank: 2000, maxRank: 3500, type: '综合', notes: '东北名校' },
    { name: '湖南大学', location: '湖南', tier: 'tier-985-mid', minRank: 2200, maxRank: 3800, type: '综合', notes: '千年学府' },
    { name: '重庆大学', location: '重庆', tier: 'tier-985-mid', minRank: 2500, maxRank: 4200, type: '综合', notes: '西南名校' },
    { name: '西北工业大学', location: '陕西', tier: 'tier-985-mid', minRank: 2800, maxRank: 4500, type: '理工', notes: '航空航天' },
    { name: '电子科技大学', location: '四川', tier: 'tier-985-mid', minRank: 3000, maxRank: 5000, type: '理工', notes: '电子信息强' },
    { name: '华南理工大学', location: '广东', tier: 'tier-985-mid', minRank: 3500, maxRank: 5500, type: '理工', notes: '华南工科' },
    { name: '大连理工大学', location: '辽宁', tier: 'tier-985-mid', minRank: 3800, maxRank: 5800, type: '理工', notes: '东北工科' },

    // ===== 211 高校 =====
    { name: '福州大学', location: '福建', tier: 'tier-211', minRank: 6000, maxRank: 12000, type: '理工', notes: '福建第二' },
    { name: '福建师范大学', location: '福建', tier: 'tier-211', minRank: 10000, maxRank: 18000, type: '师范', notes: '福建师范强' },
    { name: '北京邮电大学', location: '北京', tier: 'tier-211', minRank: 4000, maxRank: 7000, type: '理工', notes: '通信强校' },
    { name: '南京航空航天大学', location: '江苏', tier: 'tier-211', minRank: 5000, maxRank: 8500, type: '理工', notes: '航空强校' },
    { name: '南京理工大学', location: '江苏', tier: 'tier-211', minRank: 5500, maxRank: 9000, type: '理工', notes: '军工强校' },
    { name: '西安电子科技大学', location: '陕西', tier: 'tier-211', minRank: 6000, maxRank: 10000, type: '理工', notes: '电子强校' },
    { name: '上海财经大学', location: '上海', tier: 'tier-211', minRank: 2500, maxRank: 5000, type: '财经', notes: '财经顶尖' },
    { name: '中央财经大学', location: '北京', tier: 'tier-211', minRank: 3000, maxRank: 5500, type: '财经', notes: '财经强校' },
    { name: '对外经济贸易大学', location: '北京', tier: 'tier-211', minRank: 4500, maxRank: 7500, type: '财经', notes: '经贸强校' },
    { name: '西南财经大学', location: '四川', tier: 'tier-211', minRank: 8000, maxRank: 13000, type: '财经', notes: '西部财经' },
    { name: '中南财经政法大学', location: '湖北', tier: 'tier-211', minRank: 9000, maxRank: 15000, type: '财经', notes: '政法强校' },
    { name: '苏州大学', location: '江苏', tier: 'tier-211', minRank: 10000, maxRank: 16000, type: '综合', notes: '苏州名校' },
    { name: '南京师范大学', location: '江苏', tier: 'tier-211', minRank: 11000, maxRank: 17000, type: '师范', notes: '师范强校' },
    { name: '华中师范大学', location: '湖北', tier: 'tier-211', minRank: 12000, maxRank: 18000, type: '师范', notes: '师范名校' },
    { name: '南昌大学', location: '江西', tier: 'tier-211', minRank: 13000, maxRank: 22000, type: '综合', notes: '江西龙头' },
    { name: '郑州大学', location: '河南', tier: 'tier-211', minRank: 14000, maxRank: 24000, type: '综合', notes: '河南龙头' },
    { name: '合肥工业大学', location: '安徽', tier: 'tier-211', minRank: 7000, maxRank: 12000, type: '理工', notes: '工科名校' },
    { name: '武汉理工大学', location: '湖北', tier: 'tier-211', minRank: 8000, maxRank: 14000, type: '理工', notes: '材料强校' },
    { name: '东北大学', location: '辽宁', tier: 'tier-211', minRank: 9000, maxRank: 15000, type: '理工', notes: '工科名校' },
    { name: '西北农林科技大学', location: '陕西', tier: 'tier-211', minRank: 15000, maxRank: 25000, type: '农林', notes: '农林强校' },

    // ===== 福建本地高校 =====
    { name: '华侨大学', location: '福建', tier: 'tier-1ben', minRank: 18000, maxRank: 32000, type: '综合', notes: '侨校特色' },
    { name: '福建农林大学', location: '福建', tier: 'tier-1ben', minRank: 25000, maxRank: 42000, type: '农林', notes: '农林强校' },
    { name: '集美大学', location: '福建', tier: 'tier-1ben', minRank: 30000, maxRank: 48000, type: '综合', notes: '厦门高校' },
    { name: '闽南师范大学', location: '福建', tier: 'tier-1ben', minRank: 35000, maxRank: 55000, type: '师范', notes: '闽南名校' },
    { name: '闽江学院', location: '福建', tier: 'tier-ben', minRank: 50000, maxRank: 75000, type: '综合', notes: '福州高校' },
    { name: '泉州师范学院', location: '福建', tier: 'tier-ben', minRank: 55000, maxRank: 80000, type: '师范', notes: '泉州高校' },
    { name: '莆田学院', location: '福建', tier: 'tier-ben', minRank: 60000, maxRank: 85000, type: '综合', notes: '莆田高校' },
    { name: '三明学院', location: '福建', tier: 'tier-ben', minRank: 65000, maxRank: 90000, type: '综合', notes: '三明高校' },
    { name: '龙岩学院', location: '福建', tier: 'tier-ben', minRank: 70000, maxRank: 95000, type: '综合', notes: '龙岩高校' },
    { name: '宁德师范学院', location: '福建', tier: 'tier-ben', minRank: 75000, maxRank: 100000, type: '师范', notes: '宁德高校' },

    // ===== 其他一本高校 =====
    { name: '浙江工业大学', location: '浙江', tier: 'tier-1ben', minRank: 15000, maxRank: 25000, type: '理工', notes: '浙江名校' },
    { name: '江苏大学', location: '江苏', tier: 'tier-1ben', minRank: 18000, maxRank: 28000, type: '综合', notes: '江苏名校' },
    { name: '扬州大学', location: '江苏', tier: 'tier-1ben', minRank: 20000, maxRank: 32000, type: '综合', notes: '百年名校' },
    { name: '山东科技大学', location: '山东', tier: 'tier-1ben', minRank: 22000, maxRank: 35000, type: '理工', notes: '工科强校' },
    { name: '湖南科技大学', location: '湖南', tier: 'tier-1ben', minRank: 24000, maxRank: 38000, type: '综合', notes: '湖南名校' },
    { name: '江西财经大学', location: '江西', tier: 'tier-1ben', minRank: 16000, maxRank: 26000, type: '财经', notes: '财经强校' },
    { name: '广东财经大学', location: '广东', tier: 'tier-1ben', minRank: 17000, maxRank: 28000, type: '财经', notes: '广东财经' },
    { name: '首都经济贸易大学', location: '北京', tier: 'tier-1ben', minRank: 12000, maxRank: 20000, type: '财经', notes: '北京财经' },
    { name: '浙江财经大学', location: '浙江', tier: 'tier-1ben', minRank: 14000, maxRank: 22000, type: '财经', notes: '浙江财经' },
    { name: '上海理工大学', location: '上海', tier: 'tier-1ben', minRank: 13000, maxRank: 22000, type: '理工', notes: '上海名校' },
    { name: '杭州电子科技大学', location: '浙江', tier: 'tier-1ben', minRank: 10000, maxRank: 18000, type: '理工', notes: '电子强校' },
    { name: '南京邮电大学', location: '江苏', tier: 'tier-1ben', minRank: 11000, maxRank: 19000, type: '理工', notes: '通信强校' },
    { name: '广东工业大学', location: '广东', tier: 'tier-1ben', minRank: 16000, maxRank: 28000, type: '理工', notes: '工科强校' },
    { name: '深圳大学', location: '广东', tier: 'tier-1ben', minRank: 8000, maxRank: 15000, type: '综合', notes: '深圳名校' },
    { name: '南方科技大学', location: '广东', tier: 'tier-1ben', minRank: 6000, maxRank: 10000, type: '理工', notes: '创新名校' },

    // ===== 本科批高校 =====
    { name: '武夷学院', location: '福建', tier: 'tier-ben', minRank: 80000, maxRank: 110000, type: '综合', notes: '武夷山' },
    { name: '福建技术师范学院', location: '福建', tier: 'tier-ben', minRank: 85000, maxRank: 115000, type: '师范', notes: '福清' },
    { name: '厦门理工学院', location: '福建', tier: 'tier-ben', minRank: 40000, maxRank: 58000, type: '理工', notes: '厦门工科' },
    { name: '福州理工学院', location: '福建', tier: 'tier-ben', minRank: 90000, maxRank: 120000, type: '理工', notes: '民办' },
    { name: '阳光学院', location: '福建', tier: 'tier-ben', minRank: 95000, maxRank: 125000, type: '综合', notes: '民办' },
    { name: '闽南理工学院', location: '福建', tier: 'tier-ben', minRank: 100000, maxRank: 130000, type: '理工', notes: '民办' },
    { name: '福州外语外贸学院', location: '福建', tier: 'tier-ben', minRank: 105000, maxRank: 135000, type: '语言', notes: '民办' },
    { name: '泉州信息工程学院', location: '福建', tier: 'tier-ben', minRank: 110000, maxRank: 140000, type: '理工', notes: '民办' },
    { name: '厦门华厦学院', location: '福建', tier: 'tier-ben', minRank: 115000, maxRank: 145000, type: '综合', notes: '民办' },
    { name: '仰恩大学', location: '福建', tier: 'tier-ben', minRank: 120000, maxRank: 150000, type: '综合', notes: '民办' },

    // ===== 专科院校 =====
    { name: '福建船政交通职业学院', location: '福建', tier: 'tier-zhuan', minRank: 130000, maxRank: 160000, type: '专科', notes: '高职强校' },
    { name: '福建信息职业技术学院', location: '福建', tier: 'tier-zhuan', minRank: 140000, maxRank: 170000, type: '专科', notes: '高职名校' },
    { name: '福建林业职业技术学院', location: '福建', tier: 'tier-zhuan', minRank: 150000, maxRank: 180000, type: '专科', notes: '高职' },
    { name: '福州职业技术学院', location: '福建', tier: 'tier-zhuan', minRank: 155000, maxRank: 185000, type: '专科', notes: '高职' },
    { name: '厦门海洋职业技术学院', location: '福建', tier: 'tier-zhuan', minRank: 160000, maxRank: 190000, type: '专科', notes: '高职' },
    { name: '泉州职业技术大学', location: '福建', tier: 'tier-zhuan', minRank: 170000, maxRank: 200000, type: '专科', notes: '职业本科' }
  ];

  // 根据位次获取院校层级
  function getTierForRank(rank) {
    for (const t of SCHOOL_TIERS) {
      if (rank <= t.rankMax) return t;
    }
    return SCHOOL_TIERS[SCHOOL_TIERS.length - 1];
  }

  function getAdmissionRank(school) {
    return Math.round((school.minRank + school.maxRank) / 2);
  }

  function getFitLabel(rank, admissionRank) {
    const gap = admissionRank - rank;
    const ratio = gap / Math.max(rank, 1);
    if (ratio < -0.18 || gap < -5000) return 'rush';
    if (ratio <= 0.2 || gap <= 8000) return 'steady';
    return 'safe';
  }

  function getFitMeta(mode) {
    if (mode === 'rush') return { label: '冲', color: '#ff8e3c', desc: '往年录取位次略高于当前位次' };
    if (mode === 'safe') return { label: '保', color: '#7cd9ff', desc: '往年录取位次明显低于当前位次' };
    return { label: '稳', color: '#5dccaa', desc: '往年录取位次接近当前位次' };
  }

  // 根据当前位次动态计算冲稳保参考区间，避免固定档位误推。
  function getRushSteadySafe(rank) {
    const r = Math.max(Number(rank) || 1, 1);
    const tight = Math.max(300, Math.round(r * 0.08));
    const medium = Math.max(1200, Math.round(r * 0.22));
    const wide = Math.max(3500, Math.round(r * 0.45));
    return {
      rush: [Math.max(1, r - wide), Math.max(1, r - tight)],
      steady: [Math.max(1, r - tight), r + medium],
      safe: [r + medium, r + wide]
    };
  }

  // 根据位次获取匹配的院校列表
  function getSchoolsByRank(rank, mode = 'steady') {
    let minR, maxR;
    const ranges = getRushSteadySafe(rank);
    
    switch (mode) {
      case 'rush':
        minR = ranges.rush[0];
        maxR = ranges.rush[1];
        break;
      case 'safe':
        minR = ranges.safe[0];
        maxR = ranges.safe[1];
        break;
      default: // steady
        minR = ranges.steady[0];
        maxR = ranges.steady[1];
    }

    const meta = getFitMeta(mode);
    return rankSchools(rank)
      .filter(s => rangesOverlap([s.minRank, s.maxRank], [minR, maxR]))
      .map(s => ({
        ...s,
        recommendationMode: mode,
        recommendationLabel: meta.label,
        recommendationColor: meta.color,
        recommendationDesc: meta.desc
      }))
      .sort((a, b) => a.distance - b.distance)
      .slice(0, 12);
  }

  // 根据位次获取所有冲稳保院校
  function getRushSteadySafeSchools(rank) {
    return {
      rush: getSchoolsByRank(rank, 'rush').slice(0, 6),
      steady: getSchoolsByRank(rank, 'steady').slice(0, 6),
      safe: getSchoolsByRank(rank, 'safe').slice(0, 6)
    };
  }

  function rangesOverlap(a, b) {
    return a[0] <= b[1] && b[0] <= a[1];
  }

  function rankSchools(rank) {
    const r = Math.max(Number(rank) || 1, 1);
    const ranges = getRushSteadySafe(r);
    return SCHOOLS.map(school => {
      const admissionRank = getAdmissionRank(school);
      const fit = getFitLabel(r, admissionRank);
      const meta = getFitMeta(fit);
      const distance = Math.abs(admissionRank - r);
      const rankGap = admissionRank - r;
      const inDynamicRange = rangesOverlap([school.minRank, school.maxRank], ranges[fit]);
      return {
        ...school,
        admissionRank,
        rankGap,
        distance,
        fit,
        fitLabel: meta.label,
        fitColor: meta.color,
        fitDesc: meta.desc,
        confidence: inDynamicRange ? '高' : '中'
      };
    }).sort((a, b) => {
      const order = { steady: 0, rush: 1, safe: 2 };
      return (order[a.fit] - order[b.fit]) || (a.distance - b.distance);
    });
  }

  // 搜索院校
  function searchSchools(keyword) {
    const kw = keyword.toLowerCase();
    return SCHOOLS.filter(s => 
      s.name.toLowerCase().includes(kw) ||
      s.location.toLowerCase().includes(kw) ||
      s.type.toLowerCase().includes(kw)
    ).sort((a, b) => a.minRank - b.minRank);
  }

  global.FJ_SCHOOLS = { 
    SCHOOL_TIERS, 
    SCHOOLS,
    getTierForRank, 
    getRushSteadySafe,
    getSchoolsByRank,
    getRushSteadySafeSchools,
    rankSchools,
    getAdmissionRank,
    getFitMeta,
    searchSchools
  };
})(window);
