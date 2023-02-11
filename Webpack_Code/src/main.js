import count from './js/count';
import sum from './js/sum'
// 要想webpack打包资源，必须引入该资源
import './css/index.css'
import './less/index.less'
import './sass/test1.sass'
import './sass/test2.scss'
import './stylus/index.styl'
import './css/iconfont.css'

let version = 'ver 1';
console.log(version);
console.log(count(2, 1));
console.log(sum(1, 2, 3, 4));