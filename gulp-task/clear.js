import del from 'del';

//Конфигурация
import path from '../gulp-config/path.js';

// очистка
const clear = () => {
    return del(path.root);
}

// module.exports = clear;
export default clear;