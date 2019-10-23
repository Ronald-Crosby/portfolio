'use strict'

const purgecss = require('@fullhuman/postcss-purgecss')({
  content: ['./**/*.html'],
  whitelist: ['transition-background'],
  defaultExtractor: content => content.match(/[A-Za-z0-9-_:/]+/g) || []
})

module.exports = {
  plugins: [
    require('postcss-easy-import'),
    require('postcss-nested'),
    require('tailwindcss'),
    require('autoprefixer'),
    require('cssnano'),
    ...process.env.NODE_ENV === 'production'
      ? [purgecss]
      : []
  ]
}

