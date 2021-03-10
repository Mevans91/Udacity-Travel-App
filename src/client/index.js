import "./styles/styles.scss";
import { getInfo } from './js/app';

export {
    getInfo
}

document.getElementById('submission').addEventListener('click', getInfo);
