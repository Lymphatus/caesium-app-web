import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt(
  {
    rules: {
      'vue/html-self-closing': 'off',
    },
  },
  {
    ignores: ['**/libcaesium-wasm.js'],
  },
);

// extends: [
//   'eslint:recommended',
//   'plugin:vue/vue3-recommended',
//   '@nuxt/eslint-config', // If you're using Nuxt's ESLint config
//   'plugin:prettier/recommended',
// ],
// plugins: ['prettier'],
// rules: {
//   'prettier/prettier': ['error'], // Shows Prettier issues as ESLint errors
//   // You can customize or disable other rules here
// },
