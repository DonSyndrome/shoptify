import React, { useState } from 'react';
import Input from './useInput';

const AddPlaylistForm = () => {
  const [Playlist_name, setPlaylist_name] = useState('');
  const [playlist_url, setplaylist_url] = useState('');
  const [thing_value, setthing_value] = useState('fuck');
  
  const CustomInput = {
    inputName:'test',
    SetValue:setthing_value,
    Value:thing_value
  }

  return (
    <div>
      <p>
          Playlist_name:{Playlist_name},<br/>
          playlist_url: {playlist_url},<br/>
          Thing_componenet:{thing_value},<br/>
        
      </p>
      <form action="#">    
        <div className={'input-group'}>
            <label htmlFor="playlist_name">playlist_name</label>
            <input 
              type="text"
              name="playlist_name"
              id="playlist_name"
              value={Playlist_name}
              onChange={(e)=>(setPlaylist_name(e.target.value))}
              />
        </div>
        <div className={'input-group'}>
            <label htmlFor="playlist-url">playlist_url</label>
            <input 
              type="text"
              name="playlist_url"
              id="playlist_url"
              value={playlist_url}
              onChange={(e)=>(setplaylist_url(e.target.value))}
              />
        </div>
        <Input
        object={CustomInput}
        />
      </form>
      <style jsx >{`

      .input-group {
        display:flex;
        flex-direction: column;
    
      }

        `}</style>
    </div>
  );
}
export default AddPlaylistForm