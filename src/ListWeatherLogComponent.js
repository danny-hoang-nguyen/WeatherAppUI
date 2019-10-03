import React, {Component} from 'react'

import ApiService from "./service/ApiService"

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
        <div>

            <h2 className="text-center">User Details</h2>
                {/* <button className="btn btn-danger" onClick={() => this.addUser()}> Add User</button> */}
            <div className="container">
                <div className="row">
                <div className="col-1"> </div>
                    <div className="col-10">
                        <table className="table table-borderless">
                            <thead>
                                <tr>
                                    {/* <th className="hidden">Id</th> */}
                                    <th class="text-center"></th>
                                    <th class="text-center"></th>
                                    <th class="text-center"> </th>
                                    <th class="text-center"></th>
                                    <th class="text-center"></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.logs.map(
                                log =>
                                            <tr key={log.id}>
                                                {/* <td>{log.id}</td> */}
                                                <td>{log.cityName}</td>
                                                <td>{log.logDate}</td>
                                                <td>{log.tempC}</td>
                                                <td>                
                                               
                                                {log.wmainType}
                                                
                                                </td>
                                                <td>
                                                {/* <img src="http://openweathermap.org/img/wn/10d@2x.png"></img> */}
                                                <img src={`http://openweathermap.org/img/wn/${log.wicon}@2x.png`}/>
                                                {/* {log.wicon} */}
                                                </td>
                                                <td>{log.salary}</td>
                                                <td>
                                                    <button className="btn btn-success" onClick={() => this.deleteLog(log.id)}> Delete</button>
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