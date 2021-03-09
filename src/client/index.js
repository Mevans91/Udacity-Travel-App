import "./styles/styles.scss";
import { getPix } from './js/getPix';
import { getGeo } from './js/getGeo';

export {
    getPix,
    getGeo 
}

document.getElementById('submission').addEventListener('click', getGeo);