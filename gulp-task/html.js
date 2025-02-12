const { src, dest } = require('gulp');

//Конфигурация
const path = require('../gulp-config/path.js');
const app = require('../gulp-config/app.js');

//Плагины
const fileInclude = require('gulp-file-include');
const htmlmin = require('gulp-htmlmin');
const size = require('gulp-size');
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const webphtml = require('gulp-webp-html-nosvg');

//Обработка HTML
const html = () => {
    return src(path.html.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'HTML',
                message: error.message
            }))
        }))
        .pipe(fileInclude())
        .pipe(webphtml())
        .pipe(size({ title: "до" }))
        .pipe(htmlmin(app.htmlmin))
        .pipe(size({ title: "после" }))
        .pipe(dest(path.html.dest))
}

module.exports = html;