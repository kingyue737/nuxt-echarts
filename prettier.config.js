/** @type {import("prettier").Config} */
export default {
  semi: false,
  singleQuote: true,
  overrides: [
    {
      files: ['docs/**/*', 'playground/**/*'],
      options: {
        plugins: ['prettier-plugin-tailwindcss'],
      },
    },
  ],
}
