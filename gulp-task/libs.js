import gulp from 'gulp';

//Конфигурация
import path from '../gulp-config/path.js';

//Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import newer from 'gulp-newer';

//Обработка JS
const libs = () => {
    return gulp.src(path.libs.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'LIBS',
                message: error.message
            }))
        }))
        .pipe(newer(path.libs.dest))
        .pipe(gulp.src(path.libs.src))
        .pipe(gulp.dest(path.libs.dest));
}

export default libs;