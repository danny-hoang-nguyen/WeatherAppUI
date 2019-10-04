import axios from 'axios'
import { tsThisType } from '@babel/types';

const WEATHER_LOG_API = 'http://localhost:8080/weather-logs/'

class ApiService {

    fetchLog(searchText) {
        if(searchText!=='')
        return axios.get('http://localhost:8080/fetch-log?cityName='+ encodeURIComponent(searchText).replace(' ','%20'));
        return this.retrieveLogs();
    }
    retrieveLogs(){
        return axios.get(WEATHER_LOG_API); 
    }

    deleteLog(logId) {
        return axios.delete(WEATHER_LOG_API + '/' + logId);
    }

  
}

export default new ApiService();
