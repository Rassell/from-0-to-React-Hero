import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing.unit,
  },
});

class SearchPanel extends PureComponent {
  state = {
    heroName: '',
  }

  handleHeroNameChange = (event) => {
    this.setState({
      heroName: event.target.value,
    });
  }

  render() {
    const { heroName } = this.state;
    const { searchHero, clearSearch, classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <FormControl>
              <InputLabel htmlFor="hero-name">Hero Name</InputLabel>
              <Input id="hero-name" value={heroName} onChange={this.handleHeroNameChange} className={classes.input} />
            </FormControl>
            <Button color="primary" variant="contained" onClick={() => searchHero(heroName)} className={classes.button}>
              Search Hero
            </Button>
            <Button color="secondary" variant="contained" onClick={clearSearch} className={classes.button}>
              Clear Search
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

SearchPanel.propTypes = {
  searchHero: PropTypes.func.isRequired,
  clearSearch: PropTypes.func,
  classes: PropTypes.objectOf(PropTypes.string).isRequired,
};

SearchPanel.defaultProps = {
  clearSearch: () => {
    console.log('Hello from default Props'); //eslint-disable-line
  },
};

export default withStyles(styles)(SearchPanel);
