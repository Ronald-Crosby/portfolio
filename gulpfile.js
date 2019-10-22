const gulp = require('gulp')
const { src, dest } = require('gulp')
const { series, parallel } = require('gulp')
const babel = require('gulp-babel')
const sourcemaps = require('gulp-sourcemaps')
const concat = require('gulp-concat')
const uglify = require('gulp-uglify')
const postcss = require('gulp-postcss')
const browserSync = require('browser-sync').create()

// CSS TASK
    // compile and move from ./public/src/main.css to ./public/build/main.css
    // add postcss in
        // add plugins as listed in postcss.config.js
        // on env.production run purgecss and cssnano
function css() {
    return src('./public/src/css/main.css')
        .pipe(sourcemaps.init())
            .pipe(postcss())
        .pipe(sourcemaps.write())
        .pipe(dest('./public/build'))
        .pipe(browserSync.stream())
}

// JS TASK
    // separate out JS tasks into their own files
    // compile JS from ./public/src/js/*.js to ./public/build/main.js
        // add gulp-babel plugin for ES6.
function js() {
    return src('./public/src/js/*.js')

        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('./public/build'))
        .pipe(browserSync.stream())
}

// HTML TASK
    // Move index.html from ./public/build/index.html
function html() {
    return src('./public/src/index.html')
        .pipe(dest('./public/build'))
        .pipe(browserSync.stream())
}

// IMG TASK
    // Images are already optimised for web via squoosh
    // move images from ./public/src/img to ./public/build/img
function img() {
    return src('./public/src/img/**/*')
        .pipe(dest('./public/build/img'))
}

// WATCH TASK
    // watch for changes on html, css and js files
    // run html, css and js tasks on save and refresh browser.
function watch() {
    browserSync.init({
        server: {
            baseDir: './public/build'
        }
    })
    gulp.watch('./public/src/*.html').on('change', browserSync.reload)
    gulp.watch('./public/src/css/*.css', css)
    gulp.watch('./public/src/js/*.js').on('change', browserSync.reload)
}

exports.css = css;
exports.js = js
exports.html = html
exports.img = img
exports.watch = watch
exports.default = series(css, js, html, img, watch)
exports.build = series(css, js, html, img)
