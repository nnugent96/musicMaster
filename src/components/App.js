import React, { Component } from "react";
import spotifyLogo from "../assets/spotify_logo.png";

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
          artist ? (
            <div>
              <h2 style={{marginTop:"30px", marginBottom:"30px"}}>{artist.name}</h2>
            </div>
          ) : <h3 style={{marginTop:"30px"}}>No Results found...</h3>
        }
        {
          topTracks.length && topTracks.length > 0 ?  (
            <table style={{textAlign:"justify", width:"100%"}}>
              <tr>
                <th></th>
                <th className="h3">Title</th>
                <th className="h3">Artists</th>
                <th className="h3">Duration</th>
                <th></th>
              </tr>
              {
                topTracks.map( track => {
                  return (
                    <tr>
                      <td style={{margin:"20px"}}>
                        <img src={track.album.images[2].url} alt="Album art." />
                      </td>
                      <td style={{paddingRight:"50px"}}>
                        {track.name}
                      </td>
                      <td style={{paddingRight:"50px"}}>
                        {artist.name}
                        {
                          track.artists.map( art => {
                            if (art.name != artist.name){
                              return <t>, {art.name}</t>
                            }
                          })
                        }
                      </td>
                      <td>
                        <SongDuration duration_ms={track.duration_ms} />
                      </td>
                      <td>
                        <a href={track.external_urls.spotify} target="_blank">
                          <img
                            src={spotifyLogo}
                            alt="Spotify logo"
                            width="75px"
                            margin="-10px"
                          />
                        </a>
                      </td>
                    </tr>
                  );
                })
              }
            </table>
          ) : <h3 style={{marginTop:"100px"}}>No tracks found</h3>
        }
      </div>
    );
  }
}

const SongDuration = ({ duration_ms }) => {
  let duration_minutes = Math.round(duration_ms / 60000);
  let remaining_s = Math.round((duration_ms % 60000) / 1000);
  return(
    <t>{duration_minutes}:{remaining_s}</t>
  )
}

export default App;
