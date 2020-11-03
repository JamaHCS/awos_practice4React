/* eslint-disable react/destructuring-assignment */
import React from 'react';

const Vigence = (props) => {
  if (props.vigence === 1) {
    return <i className="fas fa-check" />;
  }
  return <i className="fas fa-times" />;
};

export default Vigence;
