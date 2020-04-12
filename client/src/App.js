import React, {Fragment, useEffect} from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/profile-forms/CreateProfile';
import EditProfile from './components/profile-forms/EditProfile';
import AddEducationForm from './components/profile-forms/AddEducationForm';
import AddExperienceForm from './components/profile-forms/AddExperienceForm';
import PrivateRoute from './components/routing/PrivateRoute';
import Alert from './components/layout/Alert';
import Register from './components/auth/Register';
//Redux
import {Provider} from 'react-redux'
import {loadToken} from './actions/auth-actions'
import setAuthToken from './helpers/setAuthToken'
import store from './store'


import './App.css';


if(localStorage.token) {
  setAuthToken(localStorage.token);
}

const  App = () => {
useEffect (() => {
  store.dispatch(loadToken());
}, [])
{
  return (
  <Provider store={store}>
<Router>
<Fragment>
      <Navbar />
      <Route exact path="/" component={Landing} />
      <section className="container">

        <Alert />
        <Switch>
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/dashboard" component={Dashboard} />
        <PrivateRoute exact path="/create-profile" component={CreateProfile} />
        <PrivateRoute exact path="/edit-profile" component={EditProfile} />
        <PrivateRoute exact path="/add-education" component={AddEducationForm} />
        <PrivateRoute exact path="/add-experience" component={AddExperienceForm} />
        </Switch>

      </section>
</Fragment>

</Router> 
</Provider>)
    
}

}
export default App;