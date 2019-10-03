import React , {Component}from 'react'
import ApiService from "./service/ApiService"
// import mydata from "./resource/city.list.json"

class SearchWeatherComponent extends Component {
    constructor(props){
        super(props);

        // console.log('json data:' + data);
        this.state ={
            // searchText: null,
            searchResults: '', 
            suggestions: [],
            text: '',
            // items: [],
        }

        this.items = [
            'David',
            'Daniel',
            'Sarah',
            'Jane',
        ]

    }
    onTextChange=(e)=> {
        const value=e.target.value;
        let suggestions=[];
        if(value.length>0) {
            const regex = new RegExp(`^${value}`,'i');
            suggestions=this.items.sort().filter(v=>regex.test(v));
            console.log(suggestions);
        } 
            this.setState(()=>({suggestions, text:value}));
        // this.setState({searchText: value});
        // console.log('search text is:::' + this.state.searchText);
        // ApiService.fetchLog(e.target.value).then(e => {
        //     this.setState({searchResults: e.value})
        // });
    }
    selecteSuggestion(value) {
        this.setState(()=>({
            text: value,
            suggestions :[],
        }))
    }
    renderSuggestion(){
        const {suggestions} = this.state;
        if(suggestions.length===0){
            return null;
        }
        return(
            <ul>
                {suggestions.map((item)=><li onClick={()=>this.selecteSuggestion(item)}>{item}</li>)}
            </ul>
        )
    }
    // performSearch = () => {
    //     const {searchResults} = this.state;
       
    //     fetch(`http://localhost:8080/fetch-log?cityName=Hanoi`)
    //       .then(response => response.json())
    //       .then(responseData => {
    //         this.setState({
    //             searchResults: responseData.data,
    //         //   loading: false
    //         });
    //       })
    //       .catch(error => {
    //         console.log('Error fetching and parsing data', error);
    //       });

    //     if(searchResults.length===0){
    //         return null;
    //     }
    //     return (
    //     <ul>
    //         {
    //             searchResults.map((item)=><li>{item.cityName}</li>)
    //         }
    //     </ul>
    //     )
    //   }

    deleteLog(logId) {
        ApiService.deleteLog(logId)
           .then(res => {
            //    this.setState({message : 'Log deleted successfully.'});
               this.setState({searchResults: ''});
           })

    }
    returnDiv(){
        const {searchResults} = this.state;
        if(searchResults!=='')
        return (
            <div className="container">
                <div className="row">
                <div className="col-1"> </div>
                    <div className="col-10">
                    
                    <div>
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
                                    // this.state.logs.map(
                                // log =>
                                            <tr key={searchResults.id}>
                                                {/* <td>{log.id}</td> */}
                                                <td>{searchResults.cityName}</td>
                                                <td>{searchResults.logDate}</td>
                                                <td>{searchResults.tempC} C/{searchResults.tempK} K</td>
                                                <td>                
                                               
                                                {searchResults.wmainType}
                                                
                                                </td>
                                                <td>
                                                {/* <img src="http://openweathermap.org/img/wn/10d@2x.png"></img> */}
                                                <img src={`http://openweathermap.org/img/wn/${searchResults.wicon}@2x.png`}/>
                                                {/* {log.wicon} */}
                                                </td>
                                                {/* <td>{log.salary}</td> */}
                                                <td>
                                                    <button className="btn btn-success" onClick={() => this.deleteLog(searchResults.id)}> Delete</button>
                                                    {/* <button className="btn btn-success" onClick={() => this.editUser(user.id)}> Edit</button> */}
                                                </td>
                                            </tr>
                                    // )
                                }
                            </tbody>
                    </table>
         
          </div>
                    
                    </div>
                    <div className="col-1"> </div>
            </div>
            </div>      
       
        )
      }
    getFetchedLog() {
        const {searchResults} = this.state;
        ApiService.fetchLog(this.state.text)
           .then(res => {
               this.setState({searchResults : res.data});
               if(searchResults.length===0) {
                   console.log('no search found');
               } 
               else {
                   console.log(searchResults);
                // {this.returnDiv(searchResults)}
                    // <div>
                    // <ul>
                    //   <li>2</li>  
                    //   <li>3</li>  
                    // </ul>
                    // </div>
                //     <ul> {
                //         <li>{searchResults.cityName}</li>
                //     }         
                // </ul>
                    // <span>{searchResults.id}</span>
                    
               }
            //    this.setState({logs: this.state.logs.filter(log => log.id !== logId)});
           })

    }
    render () {
        const {text} = this.state;
        // console.log(mydata[0].name);
        // for (var i = 0; i < mydata.length; i++)
        //  {
        //      var obj = mydata[i];
        //      console.log("Name: " + obj.name + ", " + obj.last_name);
        //      this.items[i] = obj.name;
        //  }
        return(
            <div>
            <input value={text} onChange={this.onTextChange} type="text" id="cityN"/> 
                    {this.renderSuggestion()}
           
             <button className="btn btn-danger" onClick={() => this.getFetchedLog()}> Search</button>
                {this.returnDiv()}
            </div>
           
        )
    }
}
export default SearchWeatherComponent;