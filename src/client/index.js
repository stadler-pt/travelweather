import './style/main.scss'
import './style/content.scss'
import './style/header.scss'
import background from "./img/plane.webp"
import compass from "./img/map.jpg"

import { send } from "./functionality/main.js"
import { postData, getSkyData, getPictures, getSensible, getGeo, getData, getCountryData } from "./functionality/APIcalls"




export { send, postData, getSkyData, getPictures, getSensible, getGeo, getData, getCountryData }