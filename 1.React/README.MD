# 1 - React (and Babel, eslint, webpack, etc. Basic configuration)

Start point Code for this chapter [here](/start).

Now lets explain the interesting point of the configuration for this "boilerplate"
___

Seeing that we are on 2018 and we want to write some ES6 code, and because this code normally is not understandable by NodeJS or current browsers so we have to transform it, this is were Babel comes to help us.

## Babel

> 💡 **[Babel](https://babeljs.io/)** tool that helps you write code in the latest version of JavaScript. When your supported environments don't support certain features natively, Babel will help you compile those features down to a supported version.

When we "execute" webpack this will call Babel in order to transform our ES6 and react code to fully "browser" understandable code, so lets configure it!

- Find the `.babelrc` file at the root of your project, which is a configuration file for your Babel.

```json
{
  "presets": [
    "env",
    "react"
  ],
  "plugins": ["transform-class-properties"]
}
```

- The first array with the values "env" and "react" tell babel to use these presets packages to transform our ES6 and JSX.
- The second one will tell babel to use transform-class-properties that transforms es2015 static class properties as well as properties declared with the es2016 property initializer syntax.

Btw: Preset vs Plugins tl;dr: Presets are just a collection of plugins.

Also we need some helper in order to build code with a correct structure and uniform of elements, Eslint will tell you this (with some help of editorconfig)!

## ESLint

> 💡 **[ESLint](http://eslint.org)** is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.

We are going to use airbnb style code (in react is one of the most used ones if not the top):

- Find the `.eslintrc` file at the root of your project, which is a configuration file for your Eslint.

```json
{
    "extends": "airbnb",
    "env": {
      "browser": true
    },
    "parser": "babel-eslint"
}
```

- As we are going to use airbnb configuration we just told eslint to extend this configuration
- env object allow us to configure flags for environment variables, in our case the browser one as we want to use **[fetch](http://urltofetch.com)**
- And last but not less important we told eslint to use babel parser package *to rely on Babel's parser* and later analyze.

## Editorconfig

> **[Editorconfig]()** helps developers define and maintain consistent coding styles between different editors and IDEs.

## Webpack

> 💡 **[Webpack](https://webpack.js.org/)** is a **module bundler**. Its main purpose is to bundle JavaScript files for usage in a browser, yet it is also capable of transforming, bundling, or packaging just about any resource or asset.

We will use webpack 4 that introduces the new "0 config" start, but some configuration is required (less than ever at least!)

- Find the `webpack.config.js` file at the root of your project, which is a configuration file for your Eslint.

```js
const HtmlWebPackPlugin = require('html-webpack-plugin');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?)$/,
        exclude: /node_modules/,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ],
      },
    ],
  },
  plugins: [new HtmlWebPackPlugin({
    template: './src/index.html',
  })],
};
```
(Remember that all will be executed from bottom to top)
- The configuration that is already known by webpack, thanks to 0 conf, is: the input and output of our application, src/index.js and bin/ respectively.
- Resolve will tell webpack with type of files have to read/expect in our case js for javascript and jsx for react
- rules: will be used to tell webpack what type of loader to use for each file:
    - .css: style-loader to inject `<style>` tags on our DOM and css-loader to load css external recourses 
    - .jsx?: will tell webpack to load .js and jsx files, because the X is optional thanks to ?, to use eslint-loader to get an idea of what is incorrectly formatted/coded and later compile it with babel-loader
- plugins: with HtmlWebPackPlugin we will generate an HTML5 file for and include all of our webpack bundles in the body using script tags using the template that we have specified, in this case our index.html in src (optional)

----

Now we will start (finally) programming! yeah! :bow:

## React

> 💡 **[React](https://facebook.github.io/react/)** is a library for building user interfaces by Facebook. It uses the **[JSX](https://facebook.github.io/react/docs/jsx-in-depth.html)** syntax to represent HTML elements and components while leveraging the power of JavaScript.

In this section we are going to render some text using React and JSX.

Let's go to index.js on src folder:

```js
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>Hello world</div>, document.getElementById('index'));
```

🏁 Run `yarn start` and go to `http://localhost:8000`. You should see "Hello world".

Thanks to HMR (starting webpack-dev-server with --hot flag) we wont need to reload the page as it will take care to reload only the parts that it needs

We are going to follow the container component structure.

Now we will create our first "container":

- Create folder container and inside that an App.css empty and App.jsx files with the following:

```jsx
import React, { PureComponent } from 'react';

import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="main">
        Hello world from a container!
      </div>
    );
  }
}

export default App;
```

We are importing React (for taking care of the jsx part of the class) and PureComponent (to build the correct structure) to create our class App that extends PureComponent and uses render method that returns an jsx element. (ignore for now the eslint errors about state-less, we will take care of this later).

- Also update index.js file like so:

```js
import React from 'react';
import ReactDOM from 'react-dom';

import App from './containers/App';

ReactDOM.render(<App />, document.getElementById('index')); //eslint-disable-line
```

🏁 Run `yarn start` and go to `http://localhost:8000`. You should see "Hello from a container".

Because building only containers an app can not live (well it can, but it wouldn't be a correct practice) we are going to build two components, HeroGrid and SearchPanel, lets start with the SearchPanel.

- create a new folder and a SearchPanel.jsx file inside with the following code:

```jsx
import React, { PureComponent } from 'react';

class SearchPanel extends PureComponent {
  state = {
    heroName: 'Input a Hero name',
  }
  
  render() {
    const { heroName } = this.state;

    return (
      <div className={classes.root}>
        <input type="text" value={heroName} />
      </div>
    );
  }
}

export default SearchPanel;
```

(ignore eslint errors, they will be solved later) We are building a component that extends [PureComponent](https://reactjs.org/docs/react-api.html#reactpurecomponent) class.

It have an internal state with a heroName parameter, and a render function that uses this heroName value to print an input.

- lets put it on action, lets update our App.jsx on containers folder to use this component:

```jsx
import React, { PureComponent } from 'react';
import SearchPanel from '../components/SearchPanel';
import './App.css';

class App extends PureComponent {
  render() {
    return (
      <div className="main">
        <SearchPanel />
      </div>
    );
  }
}

export default App;
```

🏁 Run `yarn start` and go to `http://localhost:8000`. You should see an input that display "Input a Hero name".

If you try to update/modify this value nothing will happen, that's because react follows the idea of immutability and one way binding, so until we don't update the state / get new props the render method wont be triggered. In order to update our state we have to tell react so.

- Let's update our SearchPanel.jsx to update the state of the component as we modify the value on the input

```jsx
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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

    return (
      <div className={classes.root}>
        <input type="text" value={heroName} onChange={this.handleHeroNameChange} />
      </div>
    );
  }
}

export default SearchPanel;

```
- Add two buttons that will execute functions one coming from the "father" App.jsx and another from Proptypes.

```jsx
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';

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

    return (
      <div>
        <AppBar position="sticky" color="default">
          <Toolbar>
            <FormControl>
              <InputLabel htmlFor="hero-name">Hero Name</InputLabel>
              <Input id="hero-name" value={heroName} onChange={this.handleHeroNameChange} />
            </FormControl>
            <Button color="primary" variant="contained" onClick={() => searchHero(heroName)}>
              Search Hero
            </Button>
            <Button color="secondary" variant="contained" onClick={clearSearch}>
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
};

SearchPanel.defaultProps = {
  clearSearch: () => {
    console.log('Hello from default Props'); //eslint-disable-line
  },
};

export default SearchPanel;
```

//TODO REVIEW FIRST DIV

Notice that we have defined some propTypes (and put some materialize styles/components), this will define the expected props we want to receive on this component as the default value that will have in case we don't receive some prop, in case is mark as not isRequired the default prop is "required" (see clearSearch Func)

- Now lets update our App.jsx in order to pass some functions

```jsx
import React, { PureComponent } from 'react';
import 'isomorphic-fetch';

import SearchPanel from '../components/SearchPanel';
import './App.css';

class App extends PureComponent {
  state = {
    heroList: [],
  }

  searchHero = (heroName) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&limit=30&apikey=YOURAPIKEYHERE`)
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
    return (
      <div className="main">
        <SearchPanel searchHero={this.searchHero} />
      </div>
    );
  }
}

export default App;
```

- Try to see what happens on the chrome/firefox/etc console if you modify the defaultProps and the propTypes

Now that we have pass our function to the SearchPanel and get response to set our state on the app, lets print the results.

- Create a HeroGrid on the components with the following code:

```jsx
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
```

This will be our first stateless component, this is the standard component structure when it doesn't have any state and just receive props from the father.

We are receiving a list of heroes and print it with a .map, with a specific structure inside.

- Before we put our component in our parent App lets create a index.js on this folder like so:

```js
import HeroGrid from './HeroGrid';
import SearchPanel from './SearchPanel';

export {
  HeroGrid,
  SearchPanel,
};
```

Because index.js is the file that will search if we don't specify anything on for example './test' so we can use it to export it on a much more easy way.

Now lets put this component inside our App.jsx in order to print some heroes!

```jsx
import React, { PureComponent } from 'react';
import 'isomorphic-fetch';

import { SearchPanel, HeroGrid } from '../components';
import './App.css';

class App extends PureComponent {
  state = {
    heroList: [],
  }

  searchHero = (heroName) => {
    fetch(`https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${heroName}&limit=30&apikey=6cd71265594cebcf1f95e7fdda633288`)
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

export default App;
```

Notice the multiple import on components:

```js
import { SearchPanel, HeroGrid } from '../components';
```

And the render that we are passing our state.heroList to the heroGrid component.

Go ahead and search some heroes! 

On the next section we will create a details page and connect all of this with react router and redux. this will help us to have a better structure and better control of our app like put some loading bar meanwhile we are waiting for a response from the server (new we can have it also, if you want try to make it!)
