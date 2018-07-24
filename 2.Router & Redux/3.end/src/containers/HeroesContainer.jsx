import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { selectHero, requestHero } from '../store/heroes';

import { SearchPanel, HeroGrid } from '../components';
import './HeroesContainer.css';

class HeroesContainer extends PureComponent {
  render() {
    const { heroList, onSelectHero, onSearchHero } = this.props;

    return (
      <div className="main">
        <SearchPanel searchHero={onSearchHero} />
        <HeroGrid
          heroList={heroList}
          selectHero={onSelectHero}
        />
      </div>
    );
  }
}

HeroesContainer.propTypes = {
  onSelectHero: PropTypes.func.isRequired,
  onSearchHero: PropTypes.func.isRequired,
  heroList: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

const mapStateToProps = state => ({
  heroList: state.heroes.heroList,
});

// It recieves dispatch as a param
// or pass an object and will inject dipatch dirrectly ex: const test = { funcProp: funcFromStore }
const mapDispatchToProps = dispatch => ({
  // sync example
  onSelectHero: (hero) => {
    dispatch(push(`/details/${hero.name}`));
    dispatch(selectHero(hero));
  },
  // async example with react sagas
  onSearchHero: (heroName) => {
    dispatch(requestHero(heroName));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(HeroesContainer);
