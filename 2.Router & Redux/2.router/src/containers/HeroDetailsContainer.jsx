import React from 'react';
import PropTypes from 'prop-types';
import 'isomorphic-fetch';

import { HeroCard } from '../components';

const HeroDetailsContainer = ({ match }) => (
  <HeroCard id={match.params.id} />
);

HeroDetailsContainer.propTypes = {
  match: PropTypes.shape({}),
};

HeroDetailsContainer.defaultProps = {
  match: {},
};

export default HeroDetailsContainer;
