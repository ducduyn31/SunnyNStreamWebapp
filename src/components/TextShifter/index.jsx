import React from 'react';
import { Typography } from '@material-ui/core';
import PropTypes from 'prop-types';

const TextShifter = ({ generator, ...rest }) => <Typography {...rest}>{generator()}</Typography>;

TextShifter.propTypes = {
  generator: PropTypes.func.isRequired,
};

export default TextShifter;
