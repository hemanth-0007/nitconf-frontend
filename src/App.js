import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Home from './components/Home';
import Dashboard from './components/Dashboard';
import PaperDetailedView from './components/PaperDetailedView';
import ViewStatus from './components/ViewStatus';
import Notification from './components/Notification';
import UploadAbstract from './components/UploadAbstract';
import ProtectedRoute from './components/ProtectedRoute';
import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/register" component={RegisterForm} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/dashboard" component={Dashboard} />
          <ProtectedRoute exact path="/dashboard/:paperId" component={PaperDetailedView} />
          <ProtectedRoute exact path="/view-status" component={ViewStatus} />
          <ProtectedRoute exact path="/notification" component={Notification} />
          <ProtectedRoute exact path="/upload-paper" component={UploadAbstract} />
          <Route path="*" component = {NotFound}/>
          <Redirect to="/login" />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;