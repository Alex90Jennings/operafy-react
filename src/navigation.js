export const COMING_SOON_PAGES = [
  {
    path: '/podcasts',
    title: 'Podcasts',
    description: 'Opera guides, singer interviews and stories from backstage.',
  },
  {
    path: '/charts',
    title: 'Charts',
    description: 'The most played arias and operas on Operafy, updated every week.',
  },
  {
    path: '/genres',
    title: 'Genres & moods',
    description: 'Bel canto, verismo, Wagnerian drama: recordings sorted by style and mood.',
  },
  {
    path: '/new-releases',
    title: 'New releases',
    description: 'Freshly restored historic recordings as soon as they are added.',
  },
  {
    path: '/discover',
    title: 'Discover',
    description: 'Personal recommendations based on what you listen to.',
  },
];

export const BROWSE_LINKS = [
  { to: '/home', label: 'Home' },
  ...COMING_SOON_PAGES.map(({ path, title }) => ({ to: path, label: title })),
];
