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
  owner: '你的名字',
  version: '0.2.0',
  builtAt: '2026-09',
  stack: '零依赖 · 原生 ES Modules · 内联 SVG'
};

export const PROFILE = {
  name: '你的名字',
  initials: 'YN',
  role: '全平台电商运营 · 结构化 Skill 工程',
  status: 'OPEN TO COLLABORATION',
  tagline: [
    '把运营经验写成可复用的 Skill。',
    '把重复判断交给 Agent。',
    '让工具加速思考，而不是替代思考。'
  ],
  intro:
    '我把电商运营里反复出现的判断，沉淀成 6 个边界清晰的能力包：先做诊断、再给方案，覆盖国内与跨境主流平台的选品定价、冷启动、投流操盘、利润与合规。',
  location: '中国 · 城市',
  email: 'xupa5905@gmail.com',
  stats: [
    { value: 6, suffix: '', label: '在维护的 Skill' },
    { value: 6, suffix: '', label: '覆盖电商平台' },
    { value: 1567, suffix: 'KB', label: '能力包总体量' }
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/xupa5905-cmd', icon: 'code' },
    { label: '邮箱', href: 'mailto:xupa5905@gmail.com', icon: 'mail' },
    { label: '更多', href: '#contact', icon: 'link' }
  ]
};

export const NAV = [
  { id: 'hero', label: '首页' },
  { id: 'skills', label: '能力' },
  { id: 'agents', label: 'Agent' },
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
 * Agent 作品：status 取 live / beta / lab
 * 说明：以下为占位结构，等你给出真实 Agent 清单后直接替换即可。
 */
export const AGENTS = [
  {
    id: 'agent-1',
    name: '示例 Agent 一',
    icon: 'bot',
    status: 'live',
    summary: '一句话说明这个 Agent 替谁解决了什么问题。',
    problem: '它接手前，这件事需要人工重复做 N 次、每次约 M 分钟。现在交给它自动完成。',
    stack: ['Node', 'LLM', 'Cron'],
    metrics: [
      { label: '状态', value: '已上线' },
      { label: '周期', value: '每日' },
      { label: '省时', value: '约 6h/周' }
    ],
    links: [
      { label: 'Demo', href: '#', icon: 'arrowOut' },
      { label: '仓库', href: '#', icon: 'code' }
    ]
  },
  {
    id: 'agent-2',
    name: '示例 Agent 二',
    icon: 'network',
    status: 'live',
    summary: '一句话说明它的触发条件和主要动作。',
    problem: '描述它替代的人工流程，以及你如何判断它做对了。',
    stack: ['Python', 'LLM', 'Webhook'],
    metrics: [
      { label: '状态', value: '已上线' },
      { label: '周期', value: '事件触发' },
      { label: '准确率', value: '约 94%' }
    ],
    links: [{ label: 'Demo', href: '#', icon: 'arrowOut' }]
  },
  {
    id: 'agent-3',
    name: '示例 Agent 三',
    icon: 'eye',
    status: 'beta',
    summary: '一句话说明它观察什么、输出什么判断。',
    problem: '描述它监控的指标和告警方式。',
    stack: ['Browser', 'LLM', 'SQLite'],
    metrics: [
      { label: '状态', value: '内测中' },
      { label: '周期', value: '每 15 分钟' },
      { label: '覆盖', value: '12 个源' }
    ],
    links: [{ label: '仓库', href: '#', icon: 'code' }]
  },
  {
    id: 'agent-4',
    name: '示例 Agent 四',
    icon: 'flow',
    status: 'beta',
    summary: '一句话说明它在流水线里的位置。',
    problem: '描述上游输入和下游消费方。',
    stack: ['Node', 'Queue', 'LLM'],
    metrics: [
      { label: '状态', value: '内测中' },
      { label: '周期', value: '每小时' },
      { label: '吞吐', value: '约 400/次' }
    ],
    links: [{ label: 'Demo', href: '#', icon: 'arrowOut' }]
  },
  {
    id: 'agent-5',
    name: '示例 Agent 五',
    icon: 'target',
    status: 'lab',
    summary: '一句话说明你在验证什么假设。',
    problem: '描述它目前的局限，以及它还没上线的原因。',
    stack: ['实验性', 'LLM'],
    metrics: [
      { label: '状态', value: '实验中' },
      { label: '周期', value: '手动' },
      { label: '进度', value: '约 40%' }
    ],
    links: [{ label: '笔记', href: '#', icon: 'book' }]
  },
  {
    id: 'agent-6',
    name: '示例 Agent 六',
    icon: 'spark',
    status: 'lab',
    summary: '一句话说明它的目标场景。',
    problem: '描述它面临的真实约束。',
    stack: ['实验性', 'RAG'],
    metrics: [
      { label: '状态', value: '实验中' },
      { label: '周期', value: '按需' },
      { label: '进度', value: '约 25%' }
    ],
    links: [{ label: '笔记', href: '#', icon: 'book' }]
  }
];

export const STATUS_LABEL = {
  live: { kind: 'live', text: '已上线' },
  beta: { kind: 'beta', text: '内测中' },
  lab: { kind: 'lab', text: '实验中' }
};

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
    { icon: 'code', label: 'GitHub', value: 'github.com/xupa5905-cmd', href: 'https://github.com/xupa5905-cmd' },
    { icon: 'pin', label: '坐标', value: '中国 · 城市', href: null }
  ],
  terminal: {
    title: 'contact.sh',
    lines: [
      [{ t: 'c', v: '# 最快的方式：直接发邮件' }],
      [{ t: 'p', v: '$ ' }, { t: 's', v: 'mail -s "合作" ' }, { t: 'k', v: 'xupa5905@gmail.com' }],
      [],
      [{ t: 'c', v: '# 或者在 GitHub 上找我' }],
      [{ t: 'p', v: '$ ' }, { t: 's', v: 'open ' }, { t: 'k', v: 'https://github.com/xupa5905-cmd' }]
    ]
  }
};

export const FOOT_NOTE = '本站为零依赖静态页面：无 CDN、无外链字体、图表与图标全部内联 SVG。';
