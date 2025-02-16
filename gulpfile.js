import gulp from 'gulp';
import bSync from 'browser-sync';
import serverLive from 'gulp-server-livereload';

//Конфигурация, пути по умолчанию
import path from './gulp-config/path.js';
import app from './gulp-config/app.js';

// Задачи, выведенные таски по каждому типу отдельно
import clear from './gulp-task/clear.js';
import html from './gulp-task/html.js';
import img from './gulp-task/img.js';
import scss from './gulp-task/scss.js';
import js from'./gulp-task/js.js';
import font from'./gulp-task/font.js';

// сервер, перезагрузка страницы
const server = () => {
    return gulp.src(path.root)
        .pipe(serverLive(app.startServerConfig))
}
// const server = () => {
//     bSync.init({
//         server: {
//             baseDir: path.root
//         }
//     });
// }

// наблюдатель
const watcher = () => {
    gulp.watch(path.html.watch, html);
    gulp.watch(path.img.watch, img);
    gulp.watch(path.scss.watch, scss);
    gulp.watch(path.js.watch, js);
    gulp.watch(path.font.watch, font);
    // watch(path.font.watch, font).on('all', bSync.reload);
}

const build = gulp.series(
    clear,
    gulp.parallel(html, img, scss, js, font)
    // gulp.parallel(html, js, img, font, scss)
);

const dev = gulp.series(
    build,
    gulp.parallel(watcher, server)
);

// для експорта данных ES6 используем оператор export, задачу экспортируем как объект
export { html };
export { img };
export { scss };
export { js };
export { font };

// exports.html = html;
// exports.watch = watcher;
// exports.clear = clear;

// exports.default = app.isProd
export default app.isProd
    ? build
    : dev;

/**
 * команды запуска вынесены в npm скрипты
 * dev - npm start
 * build - npm run build
 */

// exports.default = series(
//     clear,
//     parallel(html, js, img, font),
//     parallel(watcher, server)
// );

// exports.build = series(
//     clear,
//     parallel(html, js, img, font),
//     parallel(watcher, server)
// );