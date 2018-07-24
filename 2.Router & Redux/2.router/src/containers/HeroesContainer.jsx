import React, { PureComponent } from 'react';
import 'isomorphic-fetch';

import { SearchPanel, HeroGrid } from '../components';
import './HeroesContainer.css';

class HeroesContainer extends PureComponent {
  state = {
    heroList: [],
  }

  searchHero = (heroName) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&limit=30&apikey=[]`)
      .then(response => response.json())
      .then(({ data }) => {
        if (data.results.length > 0) {
          this.setState({
            heroList: data.results,
          });
        }
      });
  }

  render() {
    const { heroList } = this.state;

    return (
      <div className="main">
        <SearchPanel searchHero={this.searchHero} />
        <HeroGrid heroList={heroList} />
      </div>
    );
  }
}

export default HeroesContainer;
