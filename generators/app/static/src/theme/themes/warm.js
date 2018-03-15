import color from 'color';
import { convertToRgb as rgb } from './helpers';

const grain = color('#D7CEC7');
const blackboard = color('#565656');
const oxblood = color('#76323F');
const tan = color('#C09F80');
const defaultFontFamily = 'Ubuntu';

const theme = {
  fontFamily: defaultFontFamily,
  background: rgb(grain),
  heading: rgb(blackboard),
  button: {
    focused: rgb(oxblood),
    blured: rgb(oxblood.lighten(0.5)),
  },
  featuredHero: {
    h1: rgb(oxblood),
    h2: rgb(blackboard),
    p: rgb(blackboard.lighten(0.5)),
    background: '#FFFFFF',
  },
  featured: {
    h1: rgb(blackboard),
    h1Size: 37,
    h2: rgb(tan),
    h2Size: 25,
    p: rgb(blackboard.lighten(0.3)),
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
    h1: rgb(blackboard),
    background: rgb(tan),
    box: {
      innerWidth: 220,
      innerHeight: 70,
      outerWidth: 270,
      outerHeight: 120,
    },
  },
  poster: {
    focused: {
      h1: rgb(blackboard),
      h2: rgb(blackboard.lighten(0.5)),
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
    title: rgb(oxblood),
    titleSize: 25,
  },
  details: {
    h1: rgb(blackboard),
    h1Size: 60,
    h2: rgb(blackboard.lighten(0.75)),
    h3: rgb(blackboard.lighten(0.5)),
    p: rgb(blackboard.lighten(0.5)),
    pSize: 40,
    infoLabel: rgb(blackboard.lighten(0.3)),
    infoLabelSize: 30,
    box: {
      innerWidth: 220,
      innerHeight: 70,
      outerWidth: 270,
      outerHeight: 120,
      labelSize: 30,
    },
    truncateAt: 140,
  },
};

export default theme;
