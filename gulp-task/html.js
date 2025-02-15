import gulp from 'gulp';

//Конфигурация
import path from '../gulp-config/path.js';
import app from '../gulp-config/app.js';

//Плагины
import fileInclude from 'gulp-file-include';
import htmlmin from 'gulp-htmlmin';
import size from 'gulp-size';
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import webphtml from 'gulp-webp-html-nosvg';
import gulpIf from 'gulp-if';
import replace from 'gulp-replace';
import formatHtml from 'gulp-format-html';

//Обработка HTML
const html = () => {
    return gulp.src(path.html.src)
        // .pipe(changed(path.html.dest))
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'HTML',
                message: error.message
            }))
        }))
        .pipe(fileInclude(app.fileIncludeConfig))
        .pipe(
            replace(
                /(?<=src=|href=|srcset=)(['"])(\.(\.)?\/)*(img|images|fonts|css|scss|sass|js|files|audio|video)(\/[^\/'"]+(\/))?([^'"]*)\1/gi,
                '$1./$4$5$7$1'
            ))
        .pipe(webphtml())
        .pipe(formatHtml())
        .pipe(size({ title: "до" }))
        .pipe(gulpIf(app.isProd, htmlmin(app.htmlmin)))
        .pipe(size({ title: "после" }))
        .pipe(gulp.dest(path.html.dest))
}

export default html;