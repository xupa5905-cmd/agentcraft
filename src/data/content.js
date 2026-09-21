/**
 * 全站内容源。
 * 只需要改这一个文件，就能把整站换成你的真实资料 —— 视图层不写死任何文案。
 *
 * 图标名可用值见 src/core/icons.js 的 ICONS（例如 cpu / code / terminal /
 * database / bolt / shield / chart / bot / network / layers / spark / search /
 * cloud / lock / flow / globe / clock / eye / cube / settings / book / mail /
 * link / target / pulse / pin / user）。
 */

export const META = {
  siteName: 'AI PORTFOLIO',
  version: '0.2.0',
  builtAt: '2026-09',
  stack: '零依赖 · 原生 ES Modules · 内联 SVG'
};

export const PROFILE = {
  name: 'Mr. Xu',
  initials: 'XU',
  role: '全平台电商运营 · 结构化 Skill 工程',
  status: 'OPEN TO COLLABORATION',
  tagline: [
    '把运营经验写成可复用的 Skill。',
    '把重复判断交给 Agent。',
    '让工具加速思考，而不是替代思考。'
  ],
  intro:
    '我把电商运营里反复出现的判断，沉淀成 6 个边界清晰的能力包：先做诊断、再给方案，覆盖国内与跨境主流平台的选品定价、冷启动、投流操盘、利润与合规。',
  location: '中国',
  email: 'xupa5905@gmail.com',
  stats: [
    { value: 6, suffix: '', label: '在维护的 Skill' },
    { value: 6, suffix: '', label: '覆盖电商平台' },
    { value: 1567, suffix: 'KB', label: '能力包总体量' }
  ],
  links: [
    { label: '邮箱', href: 'mailto:xupa5905@gmail.com', icon: 'mail' },
    { label: '更多', href: '#contact', icon: 'link' }
  ]
};

export const NAV = [
  { id: 'hero', label: '首页' },
  { id: 'skills', label: '能力' },
  { id: 'agents', label: '机制' },
  { id: 'insights', label: '数据' },
  { id: 'about', label: '关于' },
  { id: 'contact', label: '联系' }
];

/**
 * 能力矩阵（真实数据）
 * group 用于筛选；level 取版本成熟度（v0.5.0 → 50，即向 1.0 的进度）；
 * structFiles 为结构文件数；size 单位 KB；short 用于图表轴标签。
 */
export const SKILLS = [
  {
    id: 'tiktok-shop',
    name: 'TikTok Shop 跨境运营专家',
    short: 'TikTok',
    icon: 'globe',
    group: '跨境电商',
    version: '0.2.0',
    size: 242,
    structure: '结构 1',
    structFiles: 1,
    role: '选品定价 · 冷启动 · 内容投流 · 达人联盟 · 履约合规',
    desc: '先按国家 / 主体 / 店型 / 阶段 / 证据时效五个维度做诊断，再给可执行方案，覆盖选品定价、利润测算、冷启动、短视频与直播、达人联盟、GMV Max 与履约合规全链路。',
    highlights: [
      '真人种草视频的卖点证据提取',
      '泰国 / 美国市场的结构化改编',
      'GMV Max 与达人联盟投放协同'
    ],
    tags: ['跨境电商', '选品定价', '达人联盟', 'GMV Max'],
    level: 20,
    usage: '诊断 → 方案 → 证据核验'
  },
  {
    id: 'tmall',
    name: '天猫店铺运营专家',
    short: '天猫',
    icon: 'chart',
    group: '国内电商',
    version: '0.5.0',
    size: 249,
    structure: '结构 1-6',
    structFiles: 6,
    role: '真实利润 · 词包运营 · 计划护栏',
    desc: '以真实利润为核心。v0.5.0 新增商品动态角色、三类经营模型、三阶段状态机、两组四象限、词包生命周期、计划重叠抢量判断与全站批量计划护栏。',
    highlights: [
      '商品动态角色 + 三类经营模型',
      '三阶段状态机 + 两组四象限',
      '词包生命周期 + 计划重叠抢量判断',
      '全站批量计划护栏'
    ],
    tags: ['真实利润', '词包运营', '状态机', '计划护栏'],
    level: 50,
    usage: '利润口径 → 状态机 → 计划护栏'
  },
  {
    id: 'pdd',
    name: '拼多多店铺运营专家',
    short: '拼多多',
    icon: 'bolt',
    group: '国内电商',
    version: '0.2.0',
    size: 143,
    structure: '结构 1-4',
    structFiles: 4,
    role: '真实利润 · 跨域诊断 · 投产优化',
    desc: '以真实利润为核心，覆盖跨域诊断、冷启动、商品漏斗、选品定价与活动、自然流量与付费协同、投产优化等模块。',
    highlights: [
      '跨域诊断 + 冷启动',
      '商品漏斗 + 选品定价活动',
      '自然流量与付费协同',
      '投产优化'
    ],
    tags: ['真实利润', '跨域诊断', '漏斗优化', '投产优化'],
    level: 20,
    usage: '诊断 → 漏斗 → 投放协同'
  },
  {
    id: 'jd',
    name: '京东店铺运营专家',
    short: '京东',
    icon: 'shield',
    group: '国内电商',
    version: '0.2.0',
    size: 304,
    structure: '结构 1-5',
    structFiles: 5,
    role: '退款后利润 · 合规履约 · 数据质量',
    desc: '以退款后利润与合规履约为核心，覆盖冷启动、漏斗与页面、选品定价活动、搜索与付费、合规诊断。v0.2.0 新增千次展现成本、预算节奏、放量前数据质量门、系统故障分流、同 SKU 归因核验与活动恢复期基线。',
    highlights: [
      '千次展现成本 + 预算节奏',
      '放量前数据质量门',
      '系统故障分流',
      '同 SKU 归因核验 + 活动恢复期基线'
    ],
    tags: ['退款后利润', '合规履约', '数据质量门', '归因核验'],
    level: 20,
    usage: '质量门 → 停损分流 → 归因核验'
  },
  {
    id: 'qianchuan',
    name: '抖音千川 AI 托管操盘专家',
    short: '千川',
    icon: 'bot',
    group: '国内电商',
    version: '0.2.0',
    size: 375,
    structure: '结构 1-1',
    structFiles: 1,
    role: '净成交 ROI · 策略决策 · 受控执行',
    desc: '以真实利润与净成交 ROI 为核心，采用「策略决策 + 官方 API 受控执行」双 Skill 结构，覆盖冷启动、起量放量、控本止损、素材生命周期、短视频与直播投流及团队协同。',
    highlights: [
      '策略决策 + 官方 API 受控执行双 Skill',
      '只读取数 + 数据质量核验',
      '定时报表 + 运行监控 + 幂等回读',
      '授权边界内的受控写入'
    ],
    tags: ['净成交 ROI', '官方 API', '受控执行', '幂等回读'],
    level: 20,
    usage: '取数核验 → 策略 → 幂等回读'
  },
  {
    id: 'amazon',
    name: '亚马逊运营专家',
    short: '亚马逊',
    icon: 'cube',
    group: '跨境电商',
    version: '0.1.0',
    size: 254,
    structure: '结构 1-7',
    structFiles: 7,
    role: '真实利润 · 账号安全 · 全链路',
    desc: '以真实利润与账号安全为核心，覆盖店铺诊断、市场选品、评论 VOC、Listing 转化、付费广告、利润库存、账号健康与数据采集。',
    highlights: [
      '店铺诊断 + 市场选品',
      '评论 VOC + Listing 转化',
      '付费广告 + 利润库存',
      '账号健康 + 数据采集'
    ],
    tags: ['真实利润', '账号安全', 'VOC', 'Listing'],
    level: 10,
    usage: '诊断 → 选品 → 转化 → 健康度'
  }
];

const TOTAL_KB = SKILLS.reduce((a, s) => a + s.size, 0);
const TOTAL_STRUCT = SKILLS.reduce((a, s) => a + s.structFiles, 0);
const PLATFORMS = SKILLS.length;

/**
 * 运行机制 —— 6 个能力包共享的、反复出现的判断动作。
 * 全部从 SKILLS 里真实存在的机制提炼，不含虚构条目。
 * group 用于筛选：口径 / 流程 / 复盘
 */
export const MECHANISMS = [
  {
    id: 'profit-first',
    name: '真实利润口径',
    icon: 'target',
    group: '口径',
    summary: '所有能力包都以真实利润为第一口径，而不是 GMV 或成交额。口径不统一时，后面的优化全是错的。',
    scope: '适用于全部 6 个能力包',
    tags: ['真实利润', '退款后利润', '净成交 ROI'],
    metrics: [
      { label: '覆盖', value: '6 / 6 个包' },
      { label: '首要指标', value: '真实利润' }
    ]
  },
  {
    id: 'diagnose-first',
    name: '先诊断，再给动作',
    icon: 'search',
    group: '流程',
    summary: '不直接给方案。先用固定维度做一次诊断，再据此推导动作 —— TikTok Shop 用国家 / 主体 / 店型 / 阶段 / 证据时效五个维度。',
    scope: 'TikTok Shop 五维诊断 · 亚马逊店铺诊断 · 拼多多跨域诊断 · 京东合规诊断',
    tags: ['五维诊断', '店铺诊断', '跨域诊断'],
    metrics: [
      { label: '诊断维度', value: '5 个' },
      { label: '覆盖', value: '4 个包' }
    ]
  },
  {
    id: 'data-gate',
    name: '放量前数据质量门',
    icon: 'shield',
    group: '流程',
    summary: '任何放量动作之前必须先过数据质量门：数据不达标就不放量，避免在脏数据上放大错误决策。',
    scope: '京东 v0.2.0 新增 · 千川数据质量核验',
    tags: ['数据质量门', '放量前置', '取数核验'],
    metrics: [
      { label: '引入版本', value: '京东 v0.2.0' },
      { label: '作用点', value: '放量之前' }
    ]
  },
  {
    id: 'controlled-exec',
    name: '策略与执行分离',
    icon: 'bot',
    group: '流程',
    summary: '千川能力包拆成两个 Skill：一个只做策略决策，另一个通过官方 API 受控执行。写入动作被限制在明确授权边界内。',
    scope: '抖音千川 AI 托管操盘专家',
    tags: ['双 Skill', '官方 API', '授权边界'],
    metrics: [
      { label: '结构', value: '2 个 Skill' },
      { label: '分工', value: '决策 + 执行' }
    ]
  },
  {
    id: 'attribution',
    name: '归因核验与恢复基线',
    icon: 'chart',
    group: '复盘',
    summary: '用同 SKU 归因核验判断动作是否真的起效，并给出活动恢复期基线，避免把自然波动误判成优化效果。',
    scope: '京东 v0.2.0 · 活动与投放复盘',
    tags: ['同 SKU 归因', '恢复期基线', '复盘'],
    metrics: [
      { label: '方法', value: '同 SKU 对比' },
      { label: '产出', value: '恢复基线' }
    ]
  },
  {
    id: 'structure',
    name: '结构文件分层',
    icon: 'layers',
    group: '复盘',
    summary: '每个能力包拆成多个独立结构文件，支持按模块加载与单独迭代，而不是一个大而全的提示词。',
    scope: '6 个能力包 · 合计 24 个结构文件',
    tags: ['模块化', '可迭代', '结构文件'],
    metrics: [
      { label: '结构文件', value: '24 个' },
      { label: '总体量', value: '1567 KB' }
    ]
  }
];

/** 机制分组，用于筛选栏 */
export const MECH_GROUPS = ['口径', '流程', '复盘'];

/**
 * 数据看板 —— 全部由 SKILLS 真实字段推导，不引入估算值。
 * 月度调用等使用强度数据待你补充日志后替换（见 bySize / structRank 的写法）。
 */
export const INSIGHTS = {
  totals: [
    { label: 'Skills', value: SKILLS.length, unit: '个', hint: '已沉淀并可调用' },
    { label: '覆盖平台', value: PLATFORMS, unit: '个', hint: '国内电商 4 · 跨境电商 2' },
    { label: '结构文件', value: TOTAL_STRUCT, unit: '个', hint: '跨 6 个能力包' },
    { label: '能力包体积', value: TOTAL_KB, unit: 'KB', hint: '结构化知识总量' }
  ],
  // 环形图：按能力类型（与筛选用的 platform 分组是两个维度）
  categories: [
    { label: '店铺运营', value: 3 },
    { label: '跨境运营', value: 2 },
    { label: '投流操盘', value: 1 }
  ],
  // 柱状图：各能力包体积（KB）
  bySize: SKILLS.map((s) => ({ label: s.short, value: s.size })),
  // 条形排行：结构文件数
  structRank: SKILLS.slice()
    .sort((a, b) => b.structFiles - a.structFiles)
    .map((s) => ({ label: s.short, value: s.structFiles })),
  // 迷你趋势：按上述顺序累计结构文件数，用于说明体量走势
  trend: SKILLS.slice()
    .sort((a, b) => a.structFiles - b.structFiles)
    .reduce((acc, s) => {
      const prev = acc.length ? acc[acc.length - 1] : 0;
      acc.push(prev + s.structFiles);
      return acc;
    }, []),
  // 清单表：能力包总览
  roster: SKILLS.map((s) => ({
    short: s.short,
    version: 'v' + s.version,
    structure: s.structure,
    size: s.size + ' KB',
    group: s.group
  })),
  caliber:
    '口径说明：以上数字全部来自能力包自身的真实元数据（版本、结构文件数、体积），不含任何估算的使用强度。月度调用 / 节省工时等待你提供执行日志后再补充。'
};

export const TIMELINE = [
  {
    when: '2026.09',
    what: '搭建零依赖作品集与发布链路',
    note: '用原生 ES Modules + 手写 SVG 重建站点，去掉全部外部依赖，改一个 content.js 即可换全站内容。'
  },
  {
    when: '2026.09',
    what: '能力包结构统一',
    note: '6 个平台能力包统一为「诊断 → 方案 → 核验」的三段式结构，共 24 个结构文件、1567 KB。'
  },
  {
    when: '2026.08',
    what: '京东 / TikTok Shop 升到 v0.2.0',
    note: '京东补千次展现成本、预算节奏与放量前数据质量门；TikTok Shop 补真人种草视频证据提取与泰国 / 美国市场改编。'
  },
  {
    when: '2026.07',
    what: '天猫升到 v0.5.0',
    note: '新增商品动态角色、三类经营模型、三阶段状态机与全站批量计划护栏，成为成熟度最高的能力包。'
  }
];

export const ABOUT = {
  paragraphs: [
    '我的主线是电商运营：天猫、拼多多、京东、抖音千川四条国内链路，加 TikTok Shop 与亚马逊两条跨境链路。这六个平台里反复出现的判断——选品定价、冷启动、放量止损、利润口径、合规履约——我把它们逐条写成了可复用的能力包。',
    '方法论上，我坚持「先定口径、再做诊断、最后给动作」。所有能力包都以真实利润（而非 GMV）为第一口径，方案里必须包含证据来源与时效，以及放量前需要满足的数据质量门。',
    '正在做的事：把「策略决策」与「受控执行」拆成两层，让 Agent 只负责取数、核验与回读，真正的写入动作限制在明确授权边界内。'
  ],
  principles: [
    {
      icon: 'target',
      title: '先定口径',
      desc: '利润与 ROI 的口径不统一，后面所有优化都是错的。先对齐口径，再谈动作。'
    },
    {
      icon: 'layers',
      title: '能力要沉淀',
      desc: '一次性经验没有价值，能被反复调用、带版本号迭代的才叫 Skill。'
    },
    {
      icon: 'eye',
      title: '过程要可见',
      desc: '每一次诊断都要留下证据与时效，放量前必须过数据质量门。'
    }
  ]
};

export const CONTACT = {
  title: '聊聊你的想法',
  desc: '如果你在做电商运营、想把手上的判断流程沉淀成 Skill，或者想聊聊 Agent 的受控执行怎么做，都欢迎直接找我。',
  lines: [
    { icon: 'mail', label: '邮箱', value: 'xupa5905@gmail.com', href: 'mailto:xupa5905@gmail.com' },
    { icon: 'pin', label: '坐标', value: '中国', href: null }
  ],
  terminal: {
    title: 'contact.sh',
    lines: [
      [{ t: 'c', v: '# 最快的方式：直接发邮件' }],
      [{ t: 'p', v: '$ ' }, { t: 's', v: 'mail -s "合作" ' }, { t: 'k', v: 'xupa5905@gmail.com' }]
    ]
  }
};

export const FOOT_NOTE = '本站为零依赖静态页面：无 CDN、无外链字体、图表与图标全部内联 SVG。';
