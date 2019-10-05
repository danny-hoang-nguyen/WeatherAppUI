import React, {Component} from 'react'

import ApiService from "../service/ApiService"
import '../css/ListWeatherLogComponent.css'

class ListWeatherLogComponent extends Component {
    constructor(props){
        super(props)
        this.state = {
            logs : [],
            message : null,
        }
        this.reloadLogList = this.reloadLogList.bind(this);
    }


    componentDidMount() {
  
        this.reloadLogList();
    }

    reloadLogList() {
 
        ApiService.retrieveLogs()
            .then((res) => {
                this.setState({logs: res.data})
            });
            
    }

    deleteLog(logId) {
        ApiService.deleteLog(logId)
           .then(res => {
               this.setState({message : 'Log deleted successfully.'});
               this.setState({logs: this.state.logs.filter(log => log.id !== logId)});
           })

    }

render(){
    return(
        <div className="container">

            <h2 className="text-center">Weather archive</h2>
            <div className="ListWeatherLogComponent">
                <div className="row">
                <div className="col-1"> </div>
                    <div className="col-10">
                        <table className="table table-hover">
                            <thead>
                            </thead>
                            <tbody>
                                {
                                    this.state.logs.map(
                                log =>
                                            <tr key={log.id}>
                                                <td>
                                                    <img src={`http://openweathermap.org/img/wn/${log.wicon}@2x.png`}/>
                                                </td>
                                                <td>
                                                    {log.cityName}  {'\n'}
                                                    {/* <b> {log.logDate} </b>   */}
                                             

                                                        {new Intl.DateTimeFormat('en-US', { 
                                                        year: 'numeric', month: 'long', day: '2-digit' 
                                                        }).format(log.wDate)}
                                               </td>
                                               <td>
                                                    <span id="temp">{log.tempC}°C</span> {log.wmainType} {'\n'}
                                                {log.windSpeed}m/s.  {log.humidity}%,  {log.pressure}hpa
                                                </td>
                                     
                                                <td>
                                                    <button className="btn btn-danger" onClick={() => this.deleteLog(log.id)}> Delete</button>
                                                    {/* <button className="btn btn-success" onClick={() => this.editUser(user.id)}> Edit</button> */}
                                                </td>
                                            </tr>
                                    )
                                }
                            </tbody>
                    </table>
                </div>
                <div className="col-1"> </div>
                </div>
            </div>

        </div>
    )
}
}

export default ListWeatherLogComponent;