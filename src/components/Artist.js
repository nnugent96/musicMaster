import React from 'react';

const Artist = ({artist}) => {
  return (
    <div>
      <img className="profile-image" src={artist.images[1].url} alt="Artist Image" />
      <h2 style={{marginTop:"30px", marginBottom:"30px"}}>{artist.name}</h2>
    </div>
  )
}

export default Artist;
