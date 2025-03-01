import gulp from 'gulp';

//Конфигурация
import path from '../gulp-config/path.js';
import app from '../gulp-config/app.js';

//Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';
import fonter from 'gulp-fonter';
import ttf2woff2 from 'gulp-ttf2woff2';

//Обработка FONT
const font = () => {
    return gulp.src(path.font.src, app.fonterConfig)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'FONT',
                message: error.message
            }))
        }))
        .pipe(newer(path.font.dest))

        // .pipe(fonter(app.fonter))
        // .pipe(gulp.dest(path.font.dest))
        
        // конвертация шрифтов в формат woff2
        .pipe(ttf2woff2())
        .pipe(gulp.dest(path.font.dest))
}

export default font;