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
 * gulp-imagemin - оптимизация изображений (9 версия ошибка acync/await)
 * gulp-newer - фильтрует уже обработанные файлы и при добавлении новых ранее обработанные не обрабатываются снова
 * gulp-webp - сжатие файлов в webp
 */

import plumber from'gulp-plumber';
import notify from'gulp-notify';
import imagemin from'gulp-imagemin';
import newer from'gulp-newer';
import webp from'gulp-webp';
import gulpIf from'gulp-if';

//Обработка IMG
const img = () => {
    return gulp.src(path.img.src, { encoding: false })
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'IMAGE',
                message: error.message
            }))
        }))

        // добавить в sccs тоже работу с webp

        // проверка на новые фото чтобы старые не обрабатывать
        .pipe(newer(path.img.dest))

        // обработка фото webp, и сохраняем сразу в папку
        .pipe(webp())
        .pipe(gulp.dest(path.img.dest))

        // снова запускаем метод исходных файлов, дополнительно отслеживая уже обработанные файлы 
        .pipe(gulp.src(path.img.src, { encoding: false }))
        .pipe(newer(path.img.dest))

        // сработает только при запуске таска в пежиме продакшина
        .pipe(gulpIf(app.isProd, imagemin(app.imagemin)))
        .pipe(gulp.dest(path.img.dest))
}

export default img;

/**
 * gulpIf нужен для выбора возможности запуска плагина в режиме разработки или продакшина, 1 параметр тип запуска, через запятую 2 параметр нужный плагин
 */