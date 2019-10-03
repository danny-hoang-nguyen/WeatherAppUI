import axios from 'axios'

const WEATHER_LOG_API = 'http://localhost:8080/weather-logs/'

class ApiService {

    fetchLog(searchText) {
        return axios.get('http://localhost:8080/fetch-log?cityName='+searchText)
    }
    retrieveLogs(){

        return axios.get(WEATHER_LOG_API);
        
    }

    deleteLog(logId) {
        return axios.delete(WEATHER_LOG_API + '/' + logId);
    }

  
}

export default new ApiService();
