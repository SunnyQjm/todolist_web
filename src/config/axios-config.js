import {
    ServerConfig
} from './server-info-config'
import axios from 'axios'

axios.defaults.baseURL = ServerConfig.BASE_URL;
axios.defaults.headers.post['Content-Type'] = 'application/json';