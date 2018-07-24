import React from 'react';
import PropTypes from 'prop-types';

const HeroDetails = ({ id }) => {
  if (!id) return <div>No Hero Selected</div>;

  return (
    <div>
      {id}
    </div>
  );
};

HeroDetails.propTypes = {
  id: PropTypes.string.isRequired,
};

export default HeroDetails;
