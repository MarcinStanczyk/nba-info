import type { Config } from 'tailwindcss'

const config: Config = {
  // Wyłącz WSZYSTKIE domyślne presets Tailwinda
  presets: [],
  // Brak jakichkolwiek rozszerzeń - TYLKO nasze zmienne z @theme
  extend: {},
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
}

export default config

