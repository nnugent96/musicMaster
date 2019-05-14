import React from 'react';
import spotifyLogo from "../assets/spotify_logo.png";

const Track = ({ track, artistName, playAudio }) => {
  const { album, name, duration_ms, external_urls, artists } = track;

  return (
    <tr onClick={playAudio}>
      <td>
        <img style={{ width:'80px', height:'80px' }} src={album.images[1].url} alt="Album art." />
      </td>
      <td>
        {name}
      </td>
      <td>
        {artistName}
        {
          artists.map( art => {
            if (art.name != artistName){
              return (`, ${art.name}`)
            }
          })
        }
      </td>
      <td>
        <SongDuration duration_ms={duration_ms} />
      </td>
      <td style={{width:"5px"}}>
        <a href={external_urls.spotify} target="_blank">
        <img
          src={spotifyLogo}
          alt="Spotify logo"
          width="75px"
        />
        </a>
      </td>
    </tr>
  )
}

const SongDuration = ({ duration_ms }) => {
  let duration_minutes = Math.round(duration_ms / 60000);
  let remaining_s = Math.round((duration_ms % 60000) / 1000);
  return(`${duration_minutes}:${remaining_s}`)
}

export default Track;
