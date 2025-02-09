const { src, dest, watch, series, parallel } = require('gulp');

const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const bSync = require('browser-sync').create();

const html = () => {
    return src('./src/html/*.html')
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'HTML',
                message: error.message
            }))
        }))
        .pipe(fileInclude())
        .pipe(size({ title: "до" }))
        .pipe(htmlmin({
            collapseWhitespace: true
        }))
        .pipe(size({ title: "после" }))
        .pipe(dest('./public'))
        .pipe(bSync.stream());
}

// сервер
const server = () => {
    bSync.init({
        server: {
            baseDir: "./public"
        }
    })
}

// наблюдатель
const watcher = () => {
    watch('./src/html/**/*.html', html)
}

exports.html = html;
exports.watch = watcher;

exports.dev = series(
    html,
    parallel(watcher, server)
);