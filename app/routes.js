import React from 'react';
import { IndexRoute, Route } from 'react-router';
import App from './components/App';
import Home from './components/Home';
import Contact from './components/Contact';
import NotFound from './components/NotFound';
import Login from './components/Account/Login';
import Catalogue from './components/Account/Catalogue';
import CatalogueDetail from './components/Account/CatalogueDetail';
import AddCatalogue from './components/Account/AddCatalogue';
import CataloguesTagged from './components/Account/CataloguesTagged';
import Signup from './components/Account/Signup';
import Profile from './components/Account/Profile';
import Test from './components/Test';
import Forgot from './components/Account/Forgot';
import Reset from './components/Account/Reset';

export default function getRoutes(store) {
  const ensureAuthenticated = (nextState, replace) => {
    if (!store.getState().auth.token) {
      replace('/login');
    }
  };
  const skipIfAuthenticated = (nextState, replace) => {
    if (store.getState().auth.token) {
      replace('/');
    }
  };
  const clearMessages = () => {
    store.dispatch({
      type: 'CLEAR_MESSAGES'
    });
  };
  return (
    <Route path="/" component={App}>
      <IndexRoute component={Login} onLeave={clearMessages}/>
      <Route path="/home" component={Home} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/contact" component={Contact} onLeave={clearMessages}/>
      <Route path="/login" component={Login} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/signup" component={Signup} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="/account" component={Profile} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/user/:username" component={Catalogue} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/getCatalogue/:catalogueId" component={CatalogueDetail} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/tags/:tag" component={CataloguesTagged} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/addCatalogue" component={AddCatalogue} onEnter={ensureAuthenticated} onLeave={clearMessages}/>
      <Route path="/test" component={Test} onLeave={clearMessages}/>
      <Route path="/forgot" component={Forgot} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path='/reset/:token' component={Reset} onEnter={skipIfAuthenticated} onLeave={clearMessages}/>
      <Route path="*" component={NotFound} onLeave={clearMessages}/>
    </Route>
  );
}
