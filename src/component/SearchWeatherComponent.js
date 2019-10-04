import React , {Component}from 'react'
import ApiService from "../service/ApiService"
import mydata from "../resource/test.json"
import '../css/SearchWeatherComponent.css'

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

        this.items = mydata;

    }
    onTextChange=(e)=> {
        const value=e.target.value;
        let suggestions=[];
        if(value.length>3) {
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
            this.setState({text:''});
               this.setState({searchResults: ''});
           })

    }
    returnDiv(searchResults){
        if(searchResults!=='')
        return (
        <div className="container">
                <div className="row">
                    <div className="col-1"> </div>
                    <div className="col-10">
                        <table className="table table-hover">
                            <thead>
                            </thead>
                            <tbody>
                                {
                 
                                    <tr key={searchResults.id}>
                                        <td>
                                            <img src={`http://openweathermap.org/img/wn/${searchResults.wicon}@2x.png`}/>
                                        </td>
                                        <td>
                                            {searchResults.cityName}  {'\n'}
                                            <b> {searchResults.logDate} </b>  
                                        </td>
                                        <td><span id="temp">{searchResults.tempC}°C</span> {searchResults.wmainType} {'\n'}
                                            {searchResults.windSpeed}m/s.  {searchResults.humidity}%,  {searchResults.pressure}hpa
                                        </td>
                                        
                                        <td>
                                            <button className="btn btn-danger" onClick={() => this.deleteLog(searchResults.id)}> Delete</button>
                                        </td>
                                    </tr>
                                }
                            </tbody>
                        </table>
                    </div>
                    <div className="col-1"> </div>
                </div>
              </div>    
        )
      }
    getFetchedLog() {
        const {searchResults} = this.state;
        if(this.state.text!=='') {
            ApiService.fetchLog(this.state.text.trim())
            .then(res => {
                this.setState({searchResults : res.data});
            }) 
        }
    }
render () {
        const {text} = this.state;
        return(

<div className="SearchWeatherComponent">
<div className="container">
                <div className="row">
                <div className="col-md-1"> </div>
                    <div className="col-md-10">
                     

                            <div className="input-group">
                            <input value={text} onChange={this.onTextChange} type="text" className="form-control" placeholder="City name (e.g: London)"/>

                    
                            
                    
                            
                            <span className="input-group-btn">
                                    <button className="btn btn-danger"  onClick={() => this.getFetchedLog()} type="button">Search</button>
                            </span>
                            </div>
                        
                     
                        <div className="row" id="suggestion">
                        {this.renderSuggestion()}
                        </div>
                       
                        </div>
                       
                <div className="col-md-1"> </div>
                </div>
            </div>  
            <br/>
<div className="container"> {this.returnDiv(this.state.searchResults)}</div>
</div>

   
           
        )
    }
}
export default SearchWeatherComponent;