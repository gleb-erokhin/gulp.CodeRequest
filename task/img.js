const { src, dest } = require('gulp');

//Конфигурация
const path = require('../config/path.js');
const app = require('../config/app.js');

//Плагины
const plumber = require('gulp-plumber');
const notify = require('gulp-notify');
const imagemin = require('gulp-imagemin');
const newer = require('gulp-newer');
const webp = require('gulp-webp');

//Обработка IMG
const img = () => {
    return src(path.img.src, {encoding: false})
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'IMAGE',
                message: error.message
            }))
        }))
        // проверка на новые фото чтобы старые не обрабатывать
        .pipe(newer(path.img.dest))
        // обработка фото webp
        .pipe(webp())
        .pipe(dest(path.img.dest))
        .pipe(src(path.img.src))
        .pipe(newer(path.img.dest))
        // обработка фото и выгрузка
        .pipe(imagemin(app.imagemin))
        .pipe(dest(path.img.dest))
}

module.exports = img;