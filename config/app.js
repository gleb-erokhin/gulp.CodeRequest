/**
 * документация запуска с аргументами
 * isProd - в нее записываем результат проверки на предмет присутсивия аргумента --production в массиве argv, если --production есть то в переменную записывается true иначе будет false
 * isDev - обратное значение
 */
const isProd = process.argv.includes('--production');
const isDev = !isProd;

module.exports = {
    isProd: isProd,
    isDev: isDev,

    htmlmin: {
        // удаление всех пробелов html только для prodaction
        collapseWhitespace: isProd
    },

    webpack: {
        // формирование webpack также зависит от типа сборки
        mode: isProd ? "production" : "development"
    },

    imagemin: {
        verbose: true
    },

    fonter: {
        formats: ["ttf", "woff", "eot", "svg"]
    }
}