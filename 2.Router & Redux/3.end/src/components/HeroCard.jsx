import React from 'react';
import PropTypes from 'prop-types';

const HeroDetails = ({ name }) => {
  if (!name) return <div>No Hero Selected</div>;

  return (
    <div>
      {name}
    </div>
  );
};

HeroDetails.propTypes = {
  name: PropTypes.string.isRequired,
};

export default HeroDetails;
