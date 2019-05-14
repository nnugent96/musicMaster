import React from 'react';
import TopTracks from './TopTracks';

const Artist = ({ artist, topTracks }) => {
  const { images, name, followers, genres} = artist;

  if (artist.name){
    return (
      <div>
        <img className="profile-image" src={images[1] && images[1].url} alt="Artist Image" />
        <h2 style={{margin:"10px"}}>{name}</h2>
        <div style={{marginBottom:"30px"}}>
          <span>{followers.total} followers</span>
          <span> | </span>
          <span>{genres.join(', ')}</span>
        </div>
        <TopTracks topTracks={topTracks} artistName={name} />
      </div>
    )
  } else {
    return (
      <h3 style={{marginTop:"30px"}}>No Results found...</h3>
    )
  }
}

export default Artist;
