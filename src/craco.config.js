const CracoAlias = require('craco-alias');
const CracoLessPlugin = require('craco-less');
const { ReactPlugin } = require('craco-plugin-react');

module.exports = {
  plugins: [
    { plugin: CracoAlias },
    { plugin: CracoLessPlugin },
    { plugin: ReactPlugin }
  ],
  eslint: {
    enable: true,
    mode: 'file'
  },
  style: {
    postcss: {
      plugins: [
        require('tailwindcss'),
        require('autoprefixer'),
      ],
    },
  },
};
