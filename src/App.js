import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Home from './pages/Home';
import Outward from './pages/Outward';
import Inward from './pages/Inward';
import Person from './pages/Person';
import AddResource from './pages/AddResource';
import DashBoard from './pages/DashBoard';

function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/outward' component={Outward} />
          <Route path='/inward' component={Inward} />
          <Route path='/addPerson' component={Person} />
          <Route path='/addResource' component={AddResource} />
          <Route path='/dashBoard' component={DashBoard} />
        </Switch>
      </Router>
    </>
  );
}
//Saketh here

export default App;
