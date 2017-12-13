module.exports = {
  // Use your storybook config as entry
  entry: '.storybook/config.js',
  // If you want storybook addons:
  // entry: ['.storybook/config.js', '.storybook/addons.js']
  presets: [
    require('poi-preset-storybook')()
  ],

  // To use with React:
  // The order matters!
  presets: [
    require('poi-preset-storybook')()
  ]
}
