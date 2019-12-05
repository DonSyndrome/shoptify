import React from 'react';
import { MyNextPage } from '../../next-env';
import LP from '../../src/components/Templates/LP';

interface indexProps {
  data:any
}

const index:MyNextPage = ({ data }:indexProps) => {
  return (
    <main>
      <LP data={data} />
    </main>
  )
}
index.getInitialProps = async ({ query, req, res }) => {
  const { pid } = query
  if (pid ==='shmerkin'){
    const fakeData = {
      "slug" : "shmerkin",
      "background_image_url" : "https://storage.googleapis.com/tunelist/%D7%94%D7%99%D7%A8%D7%A7%D7%95%D7%9F_1",
      "spotify_uri" : "1wzxuc0QsyTuikci0zJYMy",
      "image_url" : "https://i.scdn.co/image/1ade32d0fc88e4288f799d66a7fe24fa9a2d1fe8",
      "author" : "NOROZ" + "," + "בוי אצ'י",
      "name" : "סיבוב אחרון",
      "query_params" : {
        "folow-playlist":[
          "337CNhCIoEaPIEppMQzVpV",
          "5XkPGlUtdgQpGy1AAkYeee",
          "7HHZEwjZcqeNzOigR2bodl"
        ],
        "folow-song":[
          "2AGaYvFmLu3PcfaI22khL8"
        ],
        "folow-artist":[
          "0rj0bYZWazgyJ3hZTDKQHD"
        ],
        "redirect":"https://open.spotify.com/track/2AGaYvFmLu3PcfaI22khL8"
      }
    };
    return { pid, data:fakeData };
  } else if (pid ==='lidor') {
    const lidorData = {
      "slug" : "lidor",
      "background_image_url" : "https://storage.googleapis.com/tunelist/Youtube%20Thumb.jpg",
      "spotify_uri" : "7MloLHoYylMgUYn2XRXHo0",
      "image_url" : "https://i.scdn.co/image/d8359489888ca1e3927919afc0fdc69590835e2b",
      "author" : "Lidor",
      "name" : "סיבוב אחרון",
      "query_params" : {
        "folow-playlist":[
          "337CNhCIoEaPIEppMQzVpV",
          "5XkPGlUtdgQpGy1AAkYeee",
          "7HHZEwjZcqeNzOigR2bodl"
        ],
        "folow-song":[
          "7MloLHoYylMgUYn2XRXHo0"
        ],
        "folow-artist":[
          "20ZRifjWvgvprM45GeJffR"
        ],
        "redirect":"https://open.spotify.com/track/7MloLHoYylMgUYn2XRXHo0"
      }
    };
    return { pid, data:lidorData };
  } else {
    res.redirect('/404');
  }
  // let mongoose = await req.mongodb;
  // const LandingPages = await mongoose.models.LandingPages;
  // const data = await Playlist.findOne(
  //   {
  //     "lp_slug": pid,
  //   },
  //   (err, docs) => {
  //     if (err) {
  //       console.log(err)
  //       return {};
  //     } else {
  //       return docs;
  //     }
  //   }
  // );
  // if (!data) {
  //   res.redirect('/404');
  // } else {
  //   return { pid, data };
  // }
}

export const config = { amp: true };
export default index
