import React from 'react';
import ReactDOM from 'react-dom';

const Artist = ({ artist }) => {
  const { images, name, followers, genres} = artist;

  return (
    <div>
      <img className="profile-image" src={images[1] && images[1].url} alt="Artist Image" />
      <h2 style={{margin:"10px"}}>{name}</h2>
      <div style={{marginBottom:"30px"}}>
        <span>{followers.total} followers</span>
        <span> | </span>
        <span>{genres.join(', ')}</span>
      </div>
    </div>
  )
}

export default Artist;
