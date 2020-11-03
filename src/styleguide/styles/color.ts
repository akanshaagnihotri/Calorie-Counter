export type UiColor =
  | 'darkerPurple'
  | 'darkPurple'
  | 'purple'
  | 'white'
  | 'lightPurple'
  | 'lighterPurple'
  | 'red'
  | 'lighterRed'
  | 'transparent'
  | 'gray'
  | 'darkGray'
  | 'darkerGray'
  | 'defaultGray'
  | 'lightGray'
  | 'black';

const colorsMapping: { [k in UiColor]: string } = {
  darkerPurple: '#360AC3',
  darkPurple: '#5728EE',
  purple: '#8562F6',
  lightPurple: '#8c6ff0',
  lighterPurple: '#ccc9e6',
  defaultGray: 'rgb(243,243,243)',
  lightGray: '#e1e7e6',
  gray: '#ced5d4',
  darkGray: '#a4abaa',
  darkerGray: '#616766',
  white: '#fff',
  black: '#000314',
  red: '#aa1f48',
  lighterRed: '#e6d3d4',
  transparent: '#00000000',
};

export const uiColorToBaseColor = (color: UiColor): string => colorsMapping[color];
