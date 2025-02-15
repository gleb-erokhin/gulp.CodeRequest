import gulp from 'gulp';

//Конфигурация
import path from '../gulp-config/path.js';
import app from '../gulp-config/app.js';

//Плагины
import plumber from 'gulp-plumber';
import notify from 'gulp-notify';
import babel from 'gulp-babel';
import webpack from 'webpack-stream';
import sourceMaps from 'gulp-sourcemaps';

//Обработка JS
const js = () => {
    return gulp.src(path.js.src)
        .pipe(plumber({
            errorHandler: notify.onError(error => ({
                title: 'JS',
                message: error.message
            }))
        }))
        .pipe(sourceMaps.init())
        .pipe(babel())
        .pipe(webpack(app.webpack))
        .pipe(sourceMaps.write())
        .pipe(gulp.dest(path.js.dest));
}

export default js;