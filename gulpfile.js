const { watch, series, parallel } = require('gulp');
const bSync = require('browser-sync').create();

//Конфигурация, пути по умолчанию
const path = require('./config/path.js');

// Задачи, выведенные таски по каждому типу отдельно
const clear = require('./task/clear.js');
const html = require('./task/html.js');

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
}

exports.html = html;
exports.watch = watcher;
exports.clear = clear;

exports.default = series(
    clear,
    html,
    parallel(watcher, server)
);