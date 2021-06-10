import React from 'react';
import { Provider } from 'react-redux';
import Store from './store/configureStore';

import Search from './components/Search';
import Navigation from './nav/Navigation';

export default class App extends React.Component {
  render() {
    return(
      <Provider store={Store}>
        <Navigation />
      </Provider>
    );
  }
}