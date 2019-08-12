import React from 'react'
import Head from 'next/head';
import styles from '../../styles/index'

type Props = {
  alt:string, 
  src:string,
  width?:number | string ,
  height?:number | string,
  layout?:Layout,
}
export enum Layout {
  'fill', 'fixed', 'fixed-height', 'flex-item', 'intrinsic', 'nodisplay', 'responsive'
}

const Video: React.FunctionComponent<Props> = ({ alt, src,width,height,layout}) => {
    return (
      <>
      <Head>
        <script async custom-element="amp-video" src="https://cdn.ampproject.org/v0/amp-video-0.1.js" key='amp-video'></script>
      </Head>
      <div className="background">
        <amp-video width="720"
          height="405"
          src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          poster="https://peach.blender.org/wp-content/uploads/bbb-splash.png"
          layout="fill"
          autoplay>

          <div fallback>
            <p>Your browser doesn't support HTML5 video.</p>
          </div>
        </amp-video>

        </div>
   <style jsx>{`
   .background {
      position: absolute;
      top: 0;
      left: 0;
      height: 100vh;
      width: 100%;
    }
    :global(.i-amphtml-fill-content) {
      width: 100%;
      height: auto;
      max-height: none;
    }
   `}</style>
      </>
    )
}
export default Video