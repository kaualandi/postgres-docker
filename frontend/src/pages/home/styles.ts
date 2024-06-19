import { styled } from '../../../stitches.config';

export const Container = styled('div', {
  maxHeight: '100vh',
  overflowY: 'auto',
  padding: '30px',
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
  gap: '50px',

  '.buttons': {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '20px',
    margin: '20px 0 50px 0',
  },

  '.chip': {
    margin: '15px 5px 0 0',
  },

  '.content': {
    minWidth: '100px',
  },

  '@sm': {
    gridTemplateColumns: '1fr',
    gap: '30px',
  },
});
