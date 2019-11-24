import Head from 'next/head';
import React from 'react';
import { useAmp } from 'next/amp'


type Props = {};
const Pixel: React.FunctionComponent<Props> = () => {
  const isAmp = useAmp();
  const options = {
    "vars": {
        "pixelId": "525489491627419"
    },
    "triggers": {
        "trackPageview": {
            "on": "visible",
            "request": "pageview"
        }
    }
};
  if (isAmp) {
    return (
      <React.Fragment>
      <Head>
        <script async custom-element="amp-analytics" src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"></script>
      </Head>
      {/* 
      // @ts-ignore: amp-analytics.  */}
      <amp-analytics type="facebookpixel" id="facebook-pixel">
            <script type="application/json" dangerouslySetInnerHTML={{__html: JSON.stringify(options)}} >
            {/* {JSON.stringify(options)} */}
            </script>
                  {/* 
      // @ts-ignore: amp-analytics.  */}
      </amp-analytics>
      </React.Fragment>
    );
  } else {
    return null;
  }
};
export default Pixel