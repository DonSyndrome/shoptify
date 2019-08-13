const object = {
  colors: {
    SpotifyGreen: '#84bd00',
    SpotifyBlack: '#000000',
    SpotifyGrey: '#828282',
    SpotifySand: '#ecebe8',
    SpotifyWhite: '#ffffff',

  },
  breakPoint: {
    tablet: '976px',
    desktop: '1200px',
  },
  mixins: {
    heroMinHeight: 'min-height:calc(100vh - 50px);',
    dropShadow: 'box-shadow: 0px 10px 13px -11px rgba(79,79,79,1);',
    'box-shadow-sm': 'box-shadow: 0px 9px 9px -10px rgba(0,0,0,0.79);',
    'box-shadow-md': 'box-shadow: 0px 9px 12px -7px rgba(0,0,0,0.79);',
    'box-shadow-lg': 'box-shadow: 0px 9px 41px -14px rgba(0,0,0,0.45);',
    'spotify-color-gradient': 'background: -webkit-linear-gradient(top, #84bd00 0%,#b0e05e 100%);',

  },
};
export default object;
