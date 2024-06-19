import { Card } from '@nextui-org/react';
import { styled } from '../../../stitches.config';

export const Container = styled(Card, {
  maxHeight: 'calc(100vh - 60px)',
});

export const Body = styled('div', {
  overflowY: 'auto',
  maxHeight: 'calc(100%)',
  padding: '0',
});

export const Item = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  padding: '1rem',
  gap: '0.5rem',

  h2: {
    fontSize: '16px',
    fontWeight: 500,
  },

  p: {
    fontSize: '14px',
  },

  '&:hover': {
    backgroundColor: '$loContrast',
  },
});
