/** Данные визитки. Меняются здесь, при следующем старте приложение приведёт базу в соответствие. */
export interface SeedData {
  slug: string;
  name: string;
  title: string;
  description: string;
  links: { label: string; url: string }[];
  skills: { category: string; names: string[] }[];
  experience: {
    company: string;
    position: string;
    start: string; // YYYY-MM
    end?: string; // нет — работа продолжается
    achievements: string[];
  }[];
  projects: { name: string; url: string; description: string; technologies: string[] }[];
}

export const seedData: SeedData = {
  slug: 'sergey-arinin',
  name: 'Сергей Аринин',
  title: 'Fullstack-разработчик (TypeScript, Node.js)',
  description:
    'Разрабатываю веб-сервисы на TypeScript и Node.js: API, очереди, PostgreSQL и Redis, запуск в Docker и автодеплой через GitHub Actions. ' +
    'Делаю и клиентскую часть на Vue и React. За 4 недели с Claude Code довёл до продакшена коммерческий маркетплейс Thai Board.',
  links: [
    { label: 'GitHub', url: 'https://github.com/yaon1' },
    { label: 'Telegram', url: 'https://t.me/s_arinin' },
  ],
  skills: [
    { category: 'Backend', names: ['TypeScript', 'Node.js', 'NestJS', 'Fastify', 'GraphQL', 'REST API', 'WebSocket', 'PHP 8.4', 'BullMQ'] },
    { category: 'Базы данных', names: ['PostgreSQL', 'Prisma', 'Redis', 'MariaDB'] },
    { category: 'DevOps', names: ['Docker', 'Docker Compose', 'GitHub Actions', 'Git'] },
    { category: 'Frontend', names: ['Vue 3', 'Nuxt', 'React', 'Tailwind CSS', 'SCSS'] },
    { category: 'Качество кода', names: ['PHPUnit', 'PHPStan', 'Storybook'] },
    { category: 'Инструменты', names: ['Claude Code', 'MCP', 'Telegram Bot API'] },
  ],
  experience: [
    {
      company: 'Thai Board (фриланс)',
      position: 'Fullstack-разработчик, Tech Lead',
      start: '2026-02',
      achievements: [
        'Запустил коммерческий маркетплейс в Telegram от идеи до продакшена за 4 недели, работая с Claude Code',
        'Собрал бэкенд на PHP 8.4 (AMPHP), MariaDB, Redis, WebSocket, Telegram Bot API и Stars',
        'Сделал клиентскую часть на Nuxt 4, Vue 3 и TypeScript и UI-кит из около 150 компонентов со Storybook',
        'Настроил проверки качества (PHPUnit, PHPStan уровня 8), запуск в Docker Compose и автодеплой через GitHub Actions',
        'Реализовал интерфейс на трёх языках: русский, английский, тайский',
      ],
    },
    {
      company: 'Веб-студия',
      position: 'Ведущий программист',
      start: '2024-03',
      end: '2026-10',
      achievements: [
        'Разрабатывал клиентскую часть веб-приложений и лендинги по макетам Figma',
        'Работал с 1С-Битрикс и WordPress',
        'Писал ТЗ и раскладывал задачи на этапы для команды',
        'Внедрял AI-агентов в рабочие процессы студии',
      ],
    },
    {
      company: 'Digital-агентство',
      position: 'Frontend-разработчик',
      start: '2023-10',
      end: '2024-03',
      achievements: [
        'Верстал и дорабатывал сайты на JavaScript и TypeScript, React, Redux, SCSS',
        'Работал с WordPress, Bitrix, MODX, OpenCart и Tilda',
        'Ускорил загрузку страниц до 40%',
      ],
    },
    {
      company: 'IT-компания',
      position: 'Frontend-разработчик',
      start: '2023-05',
      end: '2023-09',
      achievements: ['Разрабатывал интерфейсы на React'],
    },
  ],
  projects: [
    {
      name: 'Thai Board',
      url: 'https://thaiboard.online',
      description: 'Коммерческий маркетплейс в Telegram: объявления, поиск, чаты, оплата через Telegram Stars.',
      technologies: ['PHP 8.4', 'Nuxt 4', 'MariaDB', 'Redis', 'Docker'],
    },
    {
      name: 'leadpilot',
      url: 'https://github.com/yaon1/leadpilot',
      description:
        'Ассистент приёма заявок: из Telegram или формы поля извлекаются LLM с проверкой по схеме, оператор подтверждает, сделка создаётся в CRM. Есть MCP-сервер, очереди и метрики.',
      technologies: ['TypeScript', 'Fastify', 'PostgreSQL', 'Redis', 'BullMQ', 'Docker'],
    },
    {
      name: 'vue-kit',
      url: 'https://github.com/yaon1/vue-kit',
      description: 'Набор компонентов для Vue 3.',
      technologies: ['Vue 3', 'TypeScript'],
    },
    {
      name: 'nuxt-telegram-auth',
      url: 'https://github.com/yaon1/nuxt-telegram-auth',
      description: 'Модуль входа через Telegram для Nuxt.',
      technologies: ['Nuxt', 'TypeScript'],
    },
    {
      name: 'uptime-board',
      url: 'https://github.com/yaon1/uptime-board',
      description: 'Панель мониторинга доступности сервисов.',
      technologies: ['TypeScript'],
    },
    {
      name: 'green-api-chat',
      url: 'https://github.com/yaon1/green-api-chat',
      description: 'Демо-чат на Green API (WhatsApp).',
      technologies: ['Vue 3', 'TypeScript'],
    },
    {
      name: 'Цифровая визитка',
      url: 'https://github.com/yaon1/digital-cv',
      description: 'Этот сервис: GraphQL API на NestJS и Prisma с Apollo Sandbox.',
      technologies: ['NestJS', 'Prisma', 'GraphQL', 'PostgreSQL', 'Docker'],
    },
  ],
};
