import React from 'react';
import Track from './Track';

class TopTracks extends React.Component {
  state = {
    playingAudio: false,
    audio: null, 
    playingUrl: null
  };

  playAudio = previewUrl => () => {
    const audio = new Audio(previewUrl);
    const { playingAudio, playingUrl } = this.state;

    if (!playingAudio) {
      audio.play();
      this.setState({ playingAudio: true, audio, playingUrl: previewUrl });
    } else if (playingUrl === previewUrl) {
      this.state.audio.pause();
      this.setState({ playingAudio: false });
    } else {
      this.state.audio.pause();
      audio.play();
      this.setState({ playingAudio: true, audio, playingUrl: previewUrl });
    }
  }

  render () {
    const { topTracks, artistName } = this.props;

    return (
      topTracks.length && topTracks.length > 0 ? (
        <table style={{textAlign:"justify", width:"100%"}}>
        <thead className="h3">
          <tr>
            <th></th>
            <th>Title</th>
            <th>Artists</th>
            <th>Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            topTracks.map( track => (
              <Track key={track.id} playAudio={this.playAudio(track.preview_url)}  track={track} artistName={artistName} />
            ))
          }
        </tbody>
      </table>
    ) : <h3 style={{margin:"100px"}}>No tracks found</h3>
    )
  }
}

export default TopTracks;
