import React, { Component } from "react";
import Artist from "./Artist";
import TopTracks from "./TopTracks";

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/'

class App extends Component {
  state = { 
    artistQuery: '',
    artist: {},
    topTracks: {}
  };
  
  updateArtistQuery = event => {
    console.log('event.target.value', event.target.value);
    this.setState({ artistQuery: event.target.value });
  }

  searchArtist = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artistQuery}`)
      .then(response => response.json())
      .then(json => {
        if (json.artists.total > 0){
          const artist = json.artists.items[0];

          this.setState({ artist });
          this.getTopTracks();
        }
      });
  }

  getTopTracks = () => {
    fetch(`${API_ADDRESS}/artist/${this.state.artist.id}/top-tracks`)
      .then(response => response.json())
      .then(json => this.setState( { topTracks: json.tracks } ));
  }

  handleKeyPress = event => {
    if (event.key === 'Enter'){
      this.searchArtist();
    }
  }

  render(){
    const { artist, topTracks } = this.state;

    return(
      <div>
        <h1>Music Master</h1>
        <input
          onChange={this.updateArtistQuery}
          onKeyPress={this.handleKeyPress}
          placeholder='Search for an Artist'
        />
        <button onClick={this.searchArtist}>Search</button>
        {
          artist.name ? (
            <div>
              <Artist artist={artist} />
              <TopTracks topTracks={topTracks} artistName={artist.name}/>
            </div>
          ) : <h3 style={{marginTop:"30px"}}>No Results found...</h3>
        }
      </div>
    );
  }
}

export default App;
