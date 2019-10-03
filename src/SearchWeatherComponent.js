import React , {Component}from 'react'
import ApiService from "./service/ApiService"
// import mydata from "./resource/city.list.json"

class SearchWeatherComponent extends Component {
    constructor(props){
        super(props);

        // console.log('json data:' + data);
        this.state ={
            // searchText: null,
            searchResults: [], 
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
    performSearch = () => {
        const {searchResults} = this.state;
       
        fetch(`http://localhost:8080/fetch-log?cityName=Hanoi`)
          .then(response => response.json())
          .then(responseData => {
            this.setState({
                searchResults: responseData.data,
            //   loading: false
            });
          })
          .catch(error => {
            console.log('Error fetching and parsing data', error);
          });

        if(searchResults.length===0){
            return null;
        }
        return (
        <ul>
            {searchResults.map((item)=><li>{item.cityName}</li>)}
        </ul>
        )
      }
    getResults() {
        const {searchResults} = this.state;

        ApiService.fetchLog(this.state.text).then(res => {
            this.setState(()=>(
                {
                    searchResults: res.data,
                }
            ));
            console.log('result:::' + searchResults)
        });
        if(searchResults.length===0){
            return null;
        }
        return (
        <ul>
            {searchResults.map((item)=><li>{item.cityName}</li>)}
        </ul>
        )
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
             <div>
             <button className="btn btn-danger" onClick={() => this.getResults()}> Search</button>

            </div>
            </div>
           
        )
    }
}
export default SearchWeatherComponent;