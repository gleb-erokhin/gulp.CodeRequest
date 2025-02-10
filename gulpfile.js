const { watch, series, parallel } = require('gulp');
const bSync = require('browser-sync').create();

//Конфигурация, пути по умолчанию
const path = require('./config/path.js');

// Задачи, выведенные таски по каждому типу отдельно
const clear = require('./task/clear.js');
const html = require('./task/html.js');
const js = require('./task/js.js');
const img = require('./task/img.js');
const font = require('./task/font.js');

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
}

exports.html = html;
exports.js = js;
exports.img = img;
exports.font = font;
exports.watch = watcher;
exports.clear = clear;

exports.default = series(
    clear,
    parallel(html, js, img, font),
    parallel(watcher, server)
);