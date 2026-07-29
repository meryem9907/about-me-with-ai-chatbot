import type { PxlKitData } from '@pxlkit/core';

export const Redo: PxlKitData = {
  name: 'redo',
  size: 16,
  category: 'ui',
  grid: [
    '................',
    '................',
    '...........G....',
    '...........GG...',
    '.....GGGGGGGGG..',
    '...GGGGGGGGGG...',
    '..GGGG.....G....',
    '..GGGG..........',
    '..GGGG..........',
    '..GGGG..........',
    '...GGGG.........',
    '....GGGG........',
    '......GGGGG.....',
    '................',
    '................',
    '................',
  ],
  palette: {
    'G': '#f0f9d1',
  },
  tags: ['redo', 'forward', 'repeat', 'history'],
};
