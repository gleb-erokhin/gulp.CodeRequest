import gulp from 'gulp';

//Конфигурация
import path from '../gulp-config/path.js';

//Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';

//Обработка JS
const libsCss = () => {
    return gulp.src(path.libsCss.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'LIBS',
                message: error.message
            }))
        }))
        .pipe(newer(path.libsCss.dest))
        .pipe(gulp.src(path.libsCss.src))
        .pipe(gulp.dest(path.libsCss.dest));
}

export default libsCss;