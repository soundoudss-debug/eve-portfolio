export const ROLE_MODES = {
  DEFAULT: 'DEFAULT',
  GAME: 'GAME',
  COMMERCIAL: 'COMMERCIAL',
  MCN: 'MCN',
};

export const VALID_ROLES = Object.values(ROLE_MODES);

export const projects = [
  {
    id: '01',
    slug: 'game-pv',
    title: { en: 'GAME PV RE-EDIT', zh: '游戏 PV 重剪' },
    category: { en: 'Video Editing / PV', zh: '视频剪辑 / PV' },
    categoryCode: 'GAME',
    description: {
      en: 'A game PV re-edit focusing on music-driven editing, cinematic pacing and visual storytelling.',
      zh: '游戏 PV 重剪项目，重点展示音乐驱动剪辑、镜头节奏、叙事与视觉表现。',
    },
    role: { en: 'Video Editor', zh: '视频剪辑' },
    tools: ['Premiere Pro', 'After Effects'],
    video: '/assets/projects/game-pv/video.mp4',
    cover: '/assets/projects/game-pv/cover.jpg',
    tags: { en: ['Editing', 'VFX', 'After Effects'], zh: ['剪辑', '视效', 'After Effects'] },
    about: {
      en: 'A game PV re-edit project exploring music-driven editing techniques, cinematic pacing and visual storytelling through rhythm and motion.',
      zh: '游戏 PV 重剪项目，探索音乐驱动剪辑、电影感节奏与视觉叙事。',
    },
    isMotion: false,
    processSteps: ['moodboard', 'storyboard', 'editing', 'color', 'sound'],
    breakdownItems: ['tracking', 'compositing', 'typography'],
    priority: {
      DEFAULT: 1,
      GAME: 1,
      COMMERCIAL: 4,
      MCN: 6,
    },
  },
  {
    id: '02',
    slug: 'motion-typography',
    title: { en: 'TYPOGRAPHY MOTION', zh: '排版动态设计' },
    category: { en: 'Motion Design / Typography', zh: '动态设计 / 排版' },
    categoryCode: 'MOTION',
    description: {
      en: 'Typography and layout-driven motion design exploring kinetic type, grid systems and visual rhythm.',
      zh: '以排版和版式为核心的动态设计，探索文字动效、网格系统与视觉节奏。',
    },
    role: { en: 'Motion Designer', zh: '动态设计师' },
    tools: ['After Effects', 'Premiere Pro'],
    video: '/assets/projects/motion-vfx/typography-video.mp4',
    cover: '/assets/projects/motion-vfx/typography-cover.jpg',
    tags: { en: ['Motion', 'Typography', 'After Effects'], zh: ['动态', '排版', 'After Effects'] },
    about: {
      en: 'A motion design project focused on typography and layout systems, exploring kinetic type, grid-based compositions and visual rhythm.',
      zh: '以文字排版和版式系统为核心的动态设计项目，探索文字动效、网格构图与视觉节奏。',
    },
    isMotion: true,
    motionBreakdown: [
      'typography',
      'compositing',
      'expressions',
      'camera3d',
    ],
    processSteps: ['moodboard', 'storyboard', 'motionDesign', 'color', 'sound'],
    breakdownItems: ['typography', 'compositing', 'expressions'],
    priority: {
      DEFAULT: 2,
      GAME: 3,
      COMMERCIAL: 2,
      MCN: 4,
    },
  },
  {
    id: '03',
    slug: 'motion-dynamic',
    title: { en: 'DYNAMIC MOTION VFX', zh: '动态视觉特效' },
    category: { en: 'Motion Design / VFX', zh: '动态设计 / 视效' },
    categoryCode: 'MOTION',
    description: {
      en: 'Dynamic motion design and visual effects focusing on particle systems, tracking, compositing and expressions.',
      zh: '动态视觉与视效项目，展示粒子系统、跟踪、合成与表达式等后期技术。',
    },
    role: { en: 'Motion Designer / VFX Artist', zh: '动态设计师 / 视效' },
    tools: ['After Effects', 'Premiere Pro'],
    video: '/assets/projects/motion-vfx/video.mp4',
    cover: '/assets/projects/motion-vfx/cover.jpg',
    tags: { en: ['VFX', 'Motion', 'After Effects'], zh: ['视效', '动态', 'After Effects'] },
    about: {
      en: 'An After Effects based motion graphics and VFX project demonstrating tracking, particle systems, compositing, expressions and typography animation.',
      zh: '基于 After Effects 的动态视觉与视效项目，展示跟踪、粒子系统、合成、表达式与文字动画等技术。',
    },
    isMotion: true,
    motionBreakdown: [
      'motionTracking',
      'particleSystem',
      'expressions',
      'camera3d',
      'compositing',
      'rotoMask',
      'typography',
    ],
    processSteps: ['moodboard', 'storyboard', 'motionDesign', 'vfx', 'color', 'sound'],
    breakdownItems: ['tracking', 'particle', 'rotoscoping', 'compositing', 'typography', 'expressions'],
    priority: {
      DEFAULT: 3,
      GAME: 2,
      COMMERCIAL: 3,
      MCN: 5,
    },
  },
  {
    id: '04',
    slug: 'fashion-film',
    title: { en: 'FASHION FILM', zh: '时尚品牌电影感影像' },
    category: { en: 'Commercial Video / Fashion Film', zh: '商业视频 / 时尚影像' },
    categoryCode: 'COMMERCIAL',
    description: {
      en: 'A cinematic fashion-oriented video exploring composition, rhythm, color and visual atmosphere.',
      zh: '以时尚视觉为方向的电影感影像，探索构图、节奏、色彩与视觉氛围。',
    },
    role: { en: 'Video Editor / Colorist', zh: '剪辑 / 调色' },
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    video: '/assets/projects/fashion-film/video.mp4',
    cover: '/assets/projects/fashion-film/cover.jpg',
    tags: { en: ['Commercial', 'Color', 'Cinematic'], zh: ['商业', '调色', '电影感'] },
    about: {
      en: 'A fashion-oriented cinematic video project focusing on composition, rhythm, color grading and visual atmosphere.',
      zh: '时尚方向的电影感影像项目，重点探索构图、节奏、调色与视觉氛围。',
    },
    isMotion: false,
    processSteps: ['moodboard', 'storyboard', 'editing', 'color', 'sound'],
    breakdownItems: ['compositing', 'typography'],
    priority: {
      DEFAULT: 4,
      GAME: 5,
      COMMERCIAL: 1,
      MCN: 3,
    },
  },
  {
    id: '05',
    slug: 'vlog',
    title: { en: 'VLOG / LIFESTYLE FILM', zh: 'Vlog / 生活方式影像' },
    category: { en: 'Editing / Lifestyle', zh: '剪辑 / 生活方式' },
    categoryCode: 'MCN',
    description: {
      en: 'A lifestyle-oriented editing project focusing on storytelling, rhythm, music and color.',
      zh: '生活方式影像项目，重点展示素材组织、音乐节奏、叙事与调色。',
    },
    role: { en: 'Video Editor', zh: '视频剪辑' },
    tools: ['Premiere Pro', 'DaVinci Resolve'],
    video: '/assets/projects/vlog/video.mp4',
    cover: '/assets/projects/vlog/cover.jpg',
    tags: { en: ['Vlog', 'Storytelling', 'Color'], zh: ['Vlog', '叙事', '调色'] },
    about: {
      en: 'A lifestyle editing project showcasing material organization, music rhythm, storytelling and color grading.',
      zh: '生活方式影像剪辑项目，展示素材组织、音乐节奏、叙事与调色能力。',
    },
    isMotion: false,
    processSteps: ['moodboard', 'editing', 'color', 'sound'],
    breakdownItems: ['compositing'],
    priority: {
      DEFAULT: 5,
      GAME: 6,
      COMMERCIAL: 6,
      MCN: 1,
    },
  },
  {
    id: '06',
    slug: 'selected-edits',
    title: { en: 'SELECTED EDITS', zh: '精选剪辑作品' },
    category: { en: 'Personal Work / Music Edit', zh: '个人作品 / 音乐剪辑' },
    categoryCode: 'EDIT',
    description: {
      en: 'Selected personal music edits and creative visual experiments.',
      zh: '个人音乐剪辑与创意视觉实验精选。',
    },
    role: { en: 'Editor / Creator', zh: '剪辑 / 创作者' },
    tools: ['Premiere Pro', 'After Effects'],
    video: '/assets/projects/personal-edits/video01.mp4',
    cover: '/assets/projects/personal-edits/cover.jpg',
    tags: { en: ['Editing', 'Creative', 'Music'], zh: ['剪辑', '创意', '音乐'] },
    about: {
      en: 'A collection of personal music edits and visual experiments showcasing creative editing and rhythm.',
      zh: '个人音乐剪辑与视觉实验合集，展示创意剪辑与节奏感。',
    },
    isMotion: false,
    linkToPersonal: true,
    processSteps: ['editing', 'color', 'sound'],
    breakdownItems: ['compositing', 'typography'],
    priority: {
      DEFAULT: 6,
      GAME: 4,
      COMMERCIAL: 5,
      MCN: 2,
    },
  },
];

export function getProjectBySlug(slug) {
  return projects.find((p) => p.slug === slug);
}

export function normalizeRole(roleParam) {
  if (!roleParam) return ROLE_MODES.DEFAULT;
  const upper = roleParam.toUpperCase();
  if (VALID_ROLES.includes(upper)) return upper;
  return ROLE_MODES.DEFAULT;
}

export function sortProjectsByRole(projectList, role) {
  const currentRole = normalizeRole(role);
  return [...projectList].sort((a, b) => {
    const priorityA = a.priority?.[currentRole] ?? a.priority?.DEFAULT ?? 99;
    const priorityB = b.priority?.[currentRole] ?? b.priority?.DEFAULT ?? 99;
    return priorityA - priorityB;
  });
}

export function getAdjacentProjects(slug, role) {
  const sorted = sortProjectsByRole(projects, role);
  const currentIndex = sorted.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) return { prev: null, next: null };
  const prev = currentIndex > 0 ? sorted[currentIndex - 1] : null;
  const next = currentIndex < sorted.length - 1 ? sorted[currentIndex + 1] : null;
  return { prev, next };
}
