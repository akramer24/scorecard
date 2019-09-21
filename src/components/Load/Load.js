import React from 'react';

const Load = ({ loading }) => {
  return loading ? (
    <div className="loading-mask">
      <div className="loading-dot loading-dot-outer" />
      <div className="loading-dot loading-dot-inner" />
      <div className="loading-dot loading-dot-outer" />
    </div>
  ) : null;
}

export default Load;