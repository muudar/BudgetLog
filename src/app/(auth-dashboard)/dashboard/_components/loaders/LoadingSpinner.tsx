import clsx from 'clsx';
import React from 'react';

type props = {
  size: number;
};

const LoadingSpinner = ({ size }: props) => {
  return (
    <div
      className={clsx(
        'animate-spin rounded-full border-t-4 border-primary',
        `size-${size}`
      )}
    />
  );
};

export default LoadingSpinner;
