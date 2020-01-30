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
    // compile and move from ./src/main.css to ./build/main.css
    // add postcss in
        // add plugins as listed in postcss.config.js
        // on env.production run purgecss and cssnano
function css() {
    return src('./src/css/main.css')
        .pipe(sourcemaps.init())
            .pipe(postcss())
        .pipe(sourcemaps.write())
        .pipe(dest('./build'))
        .pipe(browserSync.stream())
}

// JS TASK
    // separate out JS tasks into their own files
    // compile JS from ./src/js/*.js to ./build/main.js
        // add gulp-babel plugin for ES6.
function js() {
    return src('./src/js/*.js')

        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        .pipe(babel({
            presets: ['@babel/env']
        }))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest('./build'))
        .pipe(browserSync.stream())
}

// HTML TASK
    // Move index.html from ./build/index.html
function html() {
    return src('./src/index.html')
        .pipe(dest('./build'))
        .pipe(browserSync.stream())
}

// IMG TASK
    // Images are already optimised for web via squoosh
    // move images from ./src/img to ./build/img
function img() {
    return src('./src/img/**/*')
        .pipe(dest('./build/img'))
}

// FONTS TASK
    // Move font files to build folder
function fonts() {
    return src('./src/fonts/**/*')
        .pipe(dest('./build/fonts'))
}

// WATCH TASK
    // watch for changes on html, css and js files
    // run html, css and js tasks on save and refresh browser.
function watch() {
    browserSync.init({
        server: {
            baseDir: './build'
        }
    })
    gulp.watch('./src/*.html', html).on('change', browserSync.reload)
    gulp.watch('./src/css/**/*.css', css)
    gulp.watch('./src/js/**/*.js', js).on('change', browserSync.reload)
}

exports.css = css;
exports.js = js
exports.html = html
exports.img = img
exports.fonts = fonts
exports.watch = watch
exports.default = series(css, js, html, img, fonts, watch)
exports.build = series(css, js, html, img, fonts)
