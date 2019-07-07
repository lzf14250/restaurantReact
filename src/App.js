import React, { Component } from 'react';
import { Navbar, NavbarBrand } from 'reactstrap';
import Main from './components/MainComponent'
import { tsConstructorType } from '@babel/types';

class App extends Component {
 
  render() {
    return (
      <div>
        <Main />
      </div>
    );
  }
}

export default App;
