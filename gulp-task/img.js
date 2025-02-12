import gulp from'gulp';

//Конфигурация
/**
 * path - пути сохранения файлов
 * app - конфигурации плагинов gulp
 */
import path from'../gulp-config/path.js';
import app from'../gulp-config/app.js';

//Плагины
/**
 * gulp-imagemin - 
 */
import plumber from'gulp-plumber';
import notify from'gulp-notify';
import imagemin from'gulp-imagemin';
import newer from'gulp-newer';
import webp from'gulp-webp';
import gulpIf from'gulp-if';

//Обработка IMG
const img = () => {
    return gulp.src(path.img.src, {encoding: false})
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
        // .pipe(dest(path.img.dest))
        // .pipe(src(path.img.src))
        // .pipe(newer(path.img.dest))
        // обработка фото и выгрузка
        // сработает только при запуске таска в пежиме продакшина
        // .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
        .pipe(imagemin(app.imagemin))
        .pipe(gulp.dest(path.img.dest))
}

module.exports = img;

/**
 * gulpIf нужен для выбора возможности запуска плагина в режиме разработки или продакшина, 1 параметр тип запуска, через запятую 2 параметр нужный плагин
 */