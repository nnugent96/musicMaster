import React, { Component } from "react";
import Artist from "./Artist";
import Search from "./Search";

const API_ADDRESS = 'https://spotify-api-wrapper.appspot.com/'

class App extends Component {
  state = {
    artist: {},
    topTracks: {}
  };

  searchArtist = artistQuery => {
    fetch(`${API_ADDRESS}/artist/${artistQuery}`)
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

  render (){
    const { artist, topTracks } = this.state;

    return (
      <div>
        <h1>Music Master</h1>
        <Search searchArtist={ this.searchArtist }/>
        <Artist artist={artist} topTracks={topTracks} />
      </div>
    );
  }
}

export default App;
