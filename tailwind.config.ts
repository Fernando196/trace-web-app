import type { Config } from 'tailwindcss'

export default <Partial<Config>>{
  content: ['./app/**/*.{vue,js,ts}'],
  theme: {
    extend: {
      colors: {
        bodyBg: '#F5F5F5',
        sidebarBg: '#1F2937',
        cardBg: '#FFFFFF',
        primary: '#3B82F6',
        primaryLight: '#60A5FA',
        textMain: '#111827',
        textSecondary: '#6B7280',
        borderColor: '#E5E7EB',
      },
    },
  },
  plugins: [],
}
