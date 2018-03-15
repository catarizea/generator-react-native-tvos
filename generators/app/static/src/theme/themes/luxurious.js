import color from 'color';
import { convertToRgb as rgb } from './helpers';

const navyBlue = color('#0F1626');
const leather = color('#AB987A');
const coral = color('#FF533D');
const eggshell = color('#F5F5F5');
const defaultFontFamily = 'Roboto';

const theme = {
  fontFamily: defaultFontFamily,
  background: rgb(navyBlue),
  heading: rgb(eggshell),
  button: {
    focused: rgb(coral),
    blured: rgb(coral.lighten(0.5)),
  },
  featuredHero: {
    h1: rgb(coral),
    h2: rgb(leather),
    p: rgb(leather.lighten(0.5)),
    background: rgb(eggshell),
  },
  featured: {
    h1: rgb(navyBlue),
    h1Size: 37,
    h2: rgb(coral),
    h2Size: 25,
    p: rgb(leather),
    pSize: 30,
    truncateAt: 50,
    background: rgb(eggshell),
    box: {
      innerWidth: 700,
      innerHeight: 500,
      outerWidth: 750,
      outerHeight: 600,
    },
  },
  category: {
    h1: rgb(navyBlue),
    background: rgb(eggshell.darken(0.3)),
    box: {
      innerWidth: 220,
      innerHeight: 70,
      outerWidth: 270,
      outerHeight: 120,
    },
  },
  poster: {
    focused: {
      h1: rgb(leather),
      h2: rgb(leather.lighten(0.5)),
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
    title: rgb(eggshell.darken(0.5)),
    titleSize: 25,
  },
  details: {
    h1: rgb(leather),
    h1Size: 60,
    h2: rgb(leather.lighten(0.75)),
    h3: rgb(leather.lighten(0.5)),
    p: rgb(leather.lighten(0.5)),
    pSize: 40,
    infoLabel: rgb(leather.lighten(0.3)),
    infoLabelSize: 30,
    box: {
      innerWidth: 220,
      innerHeight: 70,
      outerWidth: 270,
      outerHeight: 120,
      labelSize: 30,
    },
    truncateAt: 200,
  },
};

export default theme;
