import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import SearchBar from './SearchBar.component'
import DataTable from './DataTable.component';
import RevenueSlider from './RevenueSlider.component';
import Typography from '@material-ui/core/Typography';

class FarmSearch extends Component {
  	
  	constructor(props) {
	    super(props);
	    this.state = {
			farms: []
		}
	}


  	componentDidMount() {
  		this.setState({ farms: {} });
      }

    /**
     * @param searchText The string in the search box
     * Initiate a call to the API to fetch farms matching the search query.
     * The back end is responsible for handling case
     */
    processSearchText (searchText) {
    	if(!searchText || searchText.length < 1 ) {
    		this.setState({ 'farms': {}});
    		return;
    	}
	    fetch('/api/farms/search/?name=' + encodeURIComponent(searchText))
	        .then(res => res.json())
	        .then((data) => {
	          let farmIDs = data.farmIDs;
	          if(farmIDs && farmIDs.length > 0) {
	          	let farms = {};
	          	let promises = [];

	          	for(let farm in farmIDs) {
	          		promises.push(fetch(`/api/farm/${farmIDs[farm]}`)
		          		.then(res => res.json())
		          		.then((data) => {
		          			farms[farm] = data;
		          		})
		          		.catch(console.log));
	          	}
	          	Promise.all(promises).then(
	          		(res) => {
	          			this.setState({ 'farms': farms});
	          		});
	          }
	        })
	        .catch(console.log);
      };

    /**
     * @param min The minimum revenue value
     * @param max The maximum revenue value
     * Initiate a call to the API to fetch farms within the range.
     */
    filterByRevenue (min, max) {	
	    fetch('/api/farms/revenue/?min=' + encodeURIComponent(min)+'&max='+ encodeURIComponent(max))
	        .then(res => res.json())
	        .then((data) => {
	          let farmIDs = data.farmIDs;
	          if(!farmIDs || farmIDs.length < 1) { // No farms found
	          	this.setState({ 'farms': {}});
    			return;
	          }
	          else {
	          	let farms = {};
	          	let promises = [];

	          	for(let farm in farmIDs) {
	          		promises.push(fetch(`/api/farm/${farmIDs[farm]}`)
		          		.then(res => res.json())
		          		.then((data) => {
		          			farms[farm] = data;
		          		})
		          		.catch(console.log));
	          	}
	          	Promise.all(promises).then(
	          		(res) => {
	          			this.setState({ 'farms': farms});
	          		});
	          }
	        })
	        .catch(console.log);
      };


  	render() {
		return (
			<div>
		    	<Typography variant="h1" >
		          Farm Search Tool
		        </Typography>
		      	<SearchBar onChange={ e => this.processSearchText(e)} />
		      	<RevenueSlider onChange={(min,max) => this.filterByRevenue(min,max)}/>
				<DataTable data={this.state.farms} />
		    </div>
		);
	}
}

export default FarmSearch
