import randomstring from 'random-string';
import { COMPONENTS_COUNTER } from '../constants/components';
import { device } from '../constants/metrics';
import theme from '../theme';

export const randomNumber = () => Math.floor((Math.random() * 100) + 1);

export const generateUniqueKeys = (howMany = COMPONENTS_COUNTER) => {
  const uniqueKeys = [];

  while (uniqueKeys.length < howMany) {
    const candidate = randomstring({ length: 4 });
    if (uniqueKeys.indexOf(candidate) === -1) {
      uniqueKeys.push(candidate);
    }
  }

  return uniqueKeys;
};

export const getColumnsNumber = childType => {
  const boxWidth = theme[childType].box.outerWidth;
  return Math.floor(device.width / boxWidth);
};
