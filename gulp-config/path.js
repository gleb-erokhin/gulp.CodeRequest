import app from '../gulp-config/app.js';

const pathSrc = "./src";
// на основании типа запуска выбираем папку выгрузки для разработки и продакшина
const pathDest = app.isProd ? "./docs" : "./public";

export default {
    root: pathDest,
    html: {
        src: pathSrc + "/html/*.html",
        watch: pathSrc + "/html/**/*.html",
        dest: pathDest
    },
    js: {
        src: pathSrc + "/js/*.js",
        watch: pathSrc + "/js/**/*.js",
        dest: pathDest + "/js"
    },
    img: {
        src: pathSrc + "/img/*.{png,jpg,jpeg,gif,svg}",
        watch: pathSrc + "/img/**/*.{png,jpg,jpeg,gif,svg}",
        dest: pathDest + "/img"
    },
    font: {
        src: pathSrc + "/font/*.{eot,ttf,otc,ttc,woff,woff2,svg}",
        watch: pathSrc + "/font/**/*.{eot,ttf,otc,ttc,woff,woff2,svg}",
        dest: pathDest + "/font"
    },
    scss: {
        src: pathSrc + "/scss/*.scss",
        watch: pathSrc + "/scss/**/*.scss",
        dest: pathDest + "/css"
    }
}