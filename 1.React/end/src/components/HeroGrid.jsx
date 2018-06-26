import React from 'react';
import PropTypes from 'prop-types';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';

const HeroGrid = props => (
  <div>
    <GridList cellHeight={180}>
      {props.heroList.map(hero => (
        <GridListTile key={hero.id}>
          <img src={`${hero.thumbnail.path}.jpg`} alt={hero.title} />
          <GridListTileBar
            title={hero.name}
            subtitle={<span>description: {hero.description}</span>}
            actionIcon={
              <IconButton>
                <InfoIcon />
              </IconButton>
            }
          />
        </GridListTile>
      ))}
    </GridList>
  </div>
);

HeroGrid.propTypes = {
  heroList: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default HeroGrid;
