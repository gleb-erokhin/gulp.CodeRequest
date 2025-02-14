import gulp from'gulp';

//Конфигурация
import path from'../gulp-config/path.js';
import app from'../gulp-config/app.js';

//Плагины
import plumber from'gulp-plumber';
import notify from'gulp-notify';
import autoprefixer from'gulp-autoprefixer';
import csso from'gulp-csso';
import shorthand from'gulp-shorthand';
import rename from'gulp-rename';
import replace from'gulp-replace';
import size from'gulp-size';
import webpCss from'gulp-webp-css';
import sourceMaps from'gulp-sourcemaps';
import groupMediaQueries from'gulp-group-css-media-queries';
import gulpIf from'gulp-if';

import dartSass from'sass';
import gulpSass from'gulp-sass';
const sass = gulpSass(dartSass);
import sassGlob from'gulp-sass-glob';


//Обработка scss
/**
 * autoprefixer - для префиксов, настройки описаны в packege.json
 * gulp-shorthand - для сокращения записей те которые можно сократить
 * webpCss - подключение webp файлов в scss файле.
 * app.isDev - будет работать только в запуске режима разработки
 * app.isProd - будет работать только в запуске режима продакшина
 */
const scss = () => {
    return gulp.src(path.scss.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'SCSS',
                message: error.message
            }))
        }))
        .pipe(sourceMaps.init())
        .pipe(autoprefixer())
        .pipe(sassGlob())
        .pipe(gulpIf(app.isProd, groupMediaQueries()))
        .pipe(sass())
        .pipe(webpCss())
        .pipe(sourceMaps.write())
        .pipe(size({title: "main.css"}))
        .pipe(gulp.dest(path.scss.dest))
        .pipe(csso())
        .pipe(rename({suffix: ".min"}))
        .pipe(size({title: "main.min.css"}))
        .pipe(gulp.dest(path.scss.dest))
        // .pipe(shorthand())

        
        // .pipe(
        //     replace(
        //         /(['"]?)(\.\.\/)+(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
        //         '$1$2$3$4$6$1'
        //     )
        // )
        // .pipe(size({title: "main.css"}))
        // .pipe(gulp.dest(path.scss.dest))
        // .pipe(rename({suffix: ".min"}))
        // .pipe(csso())
        // .pipe(gulp.dest(path.scss.dest, { sourcemaps: !app.isProd }))
}

export default scss;