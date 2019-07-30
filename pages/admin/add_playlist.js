import React from 'react';
// import Link from 'next/link'
// import AddPlylist from '../../components/AddPLaylist';
import AddPlylist from '../../src/components/AddPLaylistHOC';

const page =  ({data}) => (
  <div>
    <h1>
      this is the Add playlists page :D 
    </h1>
    <AddPlylist/>


    <style jsx>{`

      `}</style>
  </div>

)


  export default page
  