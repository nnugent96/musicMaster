import React from 'react';
import spotifyLogo from "../assets/spotify_logo.png";

const TopTracks = ({topTracks, artistName}) => {
  return (
    topTracks.length && topTracks.length > 0 ?  (
      <table style={{textAlign:"justify", width:"100%"}}>
        <thead>
          <tr>
            <th></th>
            <th className="h3">Title</th>
            <th className="h3">Artists</th>
            <th className="h3">Duration</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {
            topTracks.map( track => {
              return (
                <tr key={track.id}>
                  <td style={{margin:"20px"}}>
                    <img src={track.album.images[2].url} alt="Album art." />
                  </td>
                  <td style={{paddingRight:"50px"}}>
                    {track.name}
                  </td>
                  <td style={{paddingRight:"50px"}}>
                    {artistName}
                    {
                      track.artists.map( art => {
                        if (art.name != artistName){
                          return (`, ${art.name}`)
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
        </tbody>
      </table>
    ) : <h3 style={{marginTop:"100px"}}>No tracks found</h3>
  )
}

const SongDuration = ({ duration_ms }) => {
  let duration_minutes = Math.round(duration_ms / 60000);
  let remaining_s = Math.round((duration_ms % 60000) / 1000);
  return(`${duration_minutes}:${remaining_s}`)
}

export default TopTracks;
