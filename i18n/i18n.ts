import messages from './messages';

export default defineI18nConfig(() => ({
  legacy: false,
  // globalInjection: true,
  messages,
}));
