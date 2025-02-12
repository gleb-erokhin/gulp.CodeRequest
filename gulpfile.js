const { watch, series, parallel } = require('gulp');
const bSync = require('browser-sync').create();

//Конфигурация, пути по умолчанию
const path = require('./gulp-config/path.js');
const app = require('./gulp-config/app.js');

// Задачи, выведенные таски по каждому типу отдельно
const clear = require('./gulp-task/clear.js');
const html = require('./gulp-task/html.js');
const js = require('./gulp-task/js.js');
const img = require('./gulp-task/img.js');
const font = require('./gulp-task/font.js');
const scss = require('./gulp-task/scss.js');

// сервер, перезагрузка страницы
const server = () => {
    bSync.init({
        server: {
            baseDir: path.root
        }
    });
}

// наблюдатель
const watcher = () => {
    watch(path.html.watch, html).on('all', bSync.reload);
    watch(path.js.watch, js).on('all', bSync.reload);
    watch(path.img.watch, img).on('all', bSync.reload);
    watch(path.font.watch, font).on('all', bSync.reload);
    watch(path.scss.watch, scss).on('all', bSync.reload);
}

const build = series (
    clear,
    parallel(html, js, img, font, scss)
);

const dev = series (
    build,
    parallel(watcher, server)
);

exports.html = html;
exports.js = js;
exports.img = img;
exports.font = font;
exports.watch = watcher;
exports.clear = clear;
exports.scss = scss;

exports.default = app.isProd
    ? build
    : dev;

/**
 * команды запуска вынесены в npm скрипты
 * dev - npm start
 * build - npm run build
 */

// exports.default = series(
//     clear,
//     parallel(html, js, img, font),
//     parallel(watcher, server)
// );

// exports.build = series(
//     clear,
//     parallel(html, js, img, font),
//     parallel(watcher, server)
// );