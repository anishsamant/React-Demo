//Installation commands
//$ npm install --save youtube-api-search
//$ npm install --save lodash

import _ from 'lodash';
import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';        //import the searchBar component
import VideoList from './components/video_list';
import VideoDetail from './components/video_detail';

const API_KEY = 'AIzaSyB6N_-870qq9SVbdLQlFdLe98J_QnTf4Jk';

//Create a new component that produces HTML
class App extends Component {
	constructor(props) {
		super(props);

		this.state = { 
			videos: [],
			selectedVideo: null
		 };

		 this.videoSearch('blockchain');		
	}

	videoSearch(term) {
		YTSearch({key: API_KEY, term: term}, (videos) => {
			this.setState({ 
				videos: videos,
				selectedVideo: videos[0]
			 });
		});
	}

  render() {
		const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300)     //this function can only be called once every 300 ms.

    return (
			<div>
				<SearchBar onSearchTermChange = {term => this.videoSearch(term)}/>       {/*render the SearchBar component into the App component*/}
				<VideoDetail video={this.state.selectedVideo}/>													 {/*render the VideoDetail component into the App component*/}
				<VideoList 																					
					onVideoSelect = {selectedVideo => this.setState({selectedVideo}) }
					videos = {this.state.videos} />																				 {/*render the VideoList component into the App component*/}
			</div>
		);
	}  
}

//Take the generated HTML and put it on the page(in the DOM)
ReactDOM.render(<App />, document.querySelector('.container'));  //render the App component into the webpage