import { definePreset } from '@primeuix/themes';
import Aura from '@primeuix/themes/aura';

const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          50: '#fbeaea',
          100: '#f3c5c7',
          200: '#ea9fa2',
          300: '#e07a7d',
          400: '#d75458',
          500: '#cd2e33',
          600: '#a6252a',
          700: '#741c21',
          800: '#501419',
          900: '#2c0c10',
          950: '#20090c',
        },
        surface: {
          0: '#fafafa',
          50: '#fafafa',
          100: '#f4f4f5',
          200: '#e4e4e7',
          300: '#d4d4d8',
          400: '#a1a1aa',
          500: '#71717a',
          600: '#52525b',
          700: '#3f3f46',
          800: '#27272a',
          900: '#18181b',
          950: '#09090b',
        },
      },
      dark: {
        primary: {
          50: '#fff1f5',
          100: '#ffe0e7',
          200: '#ffc2d0',
          300: '#ffa3b9',
          400: '#ff85a2',
          500: '#ff668b',
          600: '#e65073',
          700: '#cc3a5b',
          800: '#b32443',
          900: '#99102c',
          950: '#590414',
        },
        surface: {
          0: '#09090b',
          50: '#09090b',
          100: '#18181b',
          200: '#27272a',
          300: '#3f3f46',
          400: '#52525b',
          500: '#71717a',
          600: '#a1a1aa',
          700: '#d4d4d8',
          800: '#e4e4e7',
          900: '#f4f4f5',
          950: '#fafafa',
        },
      },
    },
  },
});

export default MyPreset;
