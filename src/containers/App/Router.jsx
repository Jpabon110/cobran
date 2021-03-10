import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Layout from '../Layout/index';
import MainWrapper from './MainWrapper';

import LogIn from '../LogIn/index';
import Recover from '../RecoveryPass';
import ExamplePageOne from '../Example/index';
import Asignation from '../Asignation/index';
import AsignationStreach from '../AsignationStreach/index';
import UploadFileResume from '../UploadFileResume/index';
import UploadFileMora from '../UploadFileMora/index';
import Users from '../Users';
import Gestions from '../Gestions';
import BossView from '../BossView';
import GestionDetails from '../GestionDetails';
import RegisterUser from '../Users/components/userForm';
import Profile from '../Profile';
import ChangePassword from '../ChangePassword';

const Pages = () => (
  <Switch>
    <Route path="/pages/one" component={ExamplePageOne} />
    <Route path="/pages/asignation" component={Asignation} />
    <Route path="/pages/asignation-streach" component={AsignationStreach} />
    <Route path="/pages/upload-file-resume" component={UploadFileResume} />
    <Route path="/pages/upload-file-mora" component={UploadFileMora} />
    <Route path="/pages/users" component={Users} />
    <Route path="/pages/users/pages/gestions?stretch=31 A 60" component={Users} />
    <Route path="/pages/bossview" component={BossView} />
    <Route path="/pages/gestions" component={Gestions} />
    <Route exact path="/pages/gestionDetail/:id" component={GestionDetails} />
    <Route exact path="/pages/user/:id" component={RegisterUser} />
    <Route path="/pages/profile" component={Profile} />
    <Route path="/pages/change-password" component={ChangePassword} />
  </Switch>
);

const wrappedRoutes = () => (
  <div>
    <Layout />
    <div className="container__wrap">
      <Route path="/pages" component={Pages} />
    </div>
  </div>
);

const Router = () => (
  <MainWrapper>
    <main>
      <Switch>
        <Route exact path="/" component={LogIn} />
        <Route exact path="/log_in" component={LogIn} />
        <Route exact path="/recover" component={Recover} />
        <Route path="/" component={wrappedRoutes} />
      </Switch>
    </main>
  </MainWrapper>
);

export default Router;
