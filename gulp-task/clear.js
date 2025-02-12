const del = require('del');

//Конфигурация
const path = require('../gulp-config/path.js');

// очистка
const clear = () => {
    return del(path.root);
}

module.exports = clear;