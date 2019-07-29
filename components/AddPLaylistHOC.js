// const AddPlaylistForm = () => {
//   const [Playlist_name, setPlaylist_name] = useState('');
//   const [playlist_url, setplaylist_url] = useState('');
//   const [ThingComponenet, ThingComponenetValue] = createInput('input',useState('fuck'));
  

//   return (
//     <div>
//       <p>
//         {`
//           Playlist_name:${Playlist_name},
//           playlist_url: ${playlist_url},
//           Thing_componenet: ${ThingComponenetValue},
//         `}
//       </p>
//       <form action="#">    
//         <div className={'input-group'}>
//             <label htmlFor="playlist_name">playlist_name</label>
//             <input 
//               type="text"
//               name="playlist_name"
//               id="playlist_name"
//               value={Playlist_name}
//               onChange={(e)=>(setPlaylist_name(e.target.value))}
//               />
//         </div>
//         <div className={'input-group'}>
//             <label htmlFor="playlist-url">playlist_url</label>
//             <input 
//               type="text"
//               name="playlist_url"
//               id="playlist_url"
//               value={playlist_url}
//               onChange={(e)=>(setplaylist_url(e.target.value))}
//               />
//         </div>
//         <ThingComponenet key={'oneByOne'}/>
//       </form>
//       <style jsx >{`

//       .input-group {
//         display:flex;
//         flex-direction: column;
    
//       }

//         `}</style>
//     </div>
//   );
// }
// export default AddPLaylistHOC

import React, { Component } from 'react'
import PropTypes from 'prop-types'

export default class AddPLaylistHOC extends Component {
  static propTypes = {

  }
  constructor(props) {
    super(props)
  
    this.state = {
      fields:{
        'name':{
          value:'',
          validationRules:[],
        },
      }
    }
  }
  
  mapFieldsToInputs(field) {
    console.log(field);
    const Value= field.value;
    const SetValue = this.setState((state, props)=>{
      const newState = state;
      return newState
    });
    return (
      <div className={'input-group'} >
        <label htmlFor={inputName}>
            {inputName}
        </label>
        <input 
          key={inputName}
          type="text"
          name={inputName}
          id={inputName}
          value={Value}
          onChange={(e)=>(SetValue(e.target.value))}
          />
      </div>
    )
  }

  render() {

    const FormInputs = Object.keys(this.state.fields).map(this.mapFieldsToInputs);
    console.log(FormInputs);
    return (
      <div>
        {FormInputs}
      </div>
    )
  }
}

