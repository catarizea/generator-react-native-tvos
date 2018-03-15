import color from 'color';
import { convertToRgb as rgb } from './helpers';

const sky = color('#CAEBF2');
const carbon = color('#A9A9A9');
const watermelon = color('#FF3B3F');
const neutral = color('#EFEFEF');
const defaultFontFamily = 'Lato';

const theme = {
  fontFamily: defaultFontFamily,
  background: rgb(neutral),
  heading: rgb(carbon),
  button: {
    focused: rgb(watermelon),
    blured: rgb(watermelon.lighten(0.5)),
  },
  featuredHero: {
    h1: rgb(watermelon),
    h2: rgb(carbon),
    p: rgb(carbon.lighten(0.5)),
    background: rgb(sky),
  },
  featured: {
    h1: rgb(carbon.darken(0.5)),
    h1Size: 37,
    h2: rgb(watermelon),
    h2Size: 25,
    p: rgb(carbon),
    pSize: 30,
    truncateAt: 50,
    background: '#FFFFFF',
    box: {
      innerWidth: 700,
      innerHeight: 500,
      outerWidth: 750,
      outerHeight: 600,
    },
  },
  category: {
    h1: '#FFFFFF',
    background: rgb(watermelon),
    box: {
      innerWidth: 220,
      innerHeight: 70,
      outerWidth: 270,
      outerHeight: 120,
    },
  },
  poster: {
    focused: {
      h1: rgb(carbon),
      h2: rgb(carbon.lighten(0.5)),
    },
    blured: {
      h1: '#FFFFFF',
      h2: '#FFFFFF',
    },
    box: {
      innerWidth: 280,
      innerHeight: 400,
      outerWidth: 330,
      outerHeight: 550,
    },
    title: rgb(carbon.darken(0.3)),
    titleSize: 25,
  },
  details: {
    h1: rgb(carbon),
    h1Size: 60,
    h2: rgb(carbon),
    h3: rgb(carbon),
    p: rgb(carbon),
    pSize: 40,
    infoLabel: rgb(carbon),
    infoLabelSize: 30,
    box: {
      innerWidth: 220,
      innerHeight: 70,
      outerWidth: 270,
      outerHeight: 120,
      labelSize: 30,
    },
    truncateAt: 150,
  },
};

export default theme;
