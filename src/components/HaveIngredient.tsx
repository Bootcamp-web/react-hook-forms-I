import React from 'react';
import { useIngredient } from '../lib/useIngredients';

export const HaveIngredient = ({ ing }) => {
  const {ingredients  = useIngredient();

  if ((ing)) {
    return (
      <p style={{ color: 'green' }}>
        {' '}
        I have
        {' '}
        {ing}
      </p>
    );
  }
  return (
    <p style={{ color: 'red' }}>
      {' '}
      I dont have any
      {' '}
      {ing}
    </p>
  );
};