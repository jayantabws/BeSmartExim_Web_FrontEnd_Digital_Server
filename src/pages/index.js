import React from 'react';
import Layout from '../components/Layout';
import { Switch, Route } from 'react-router-dom';
import Exchange from '../pages/exchange';
import List from '../pages/list';
import Analysis from '../pages/analysis';
import Workspace from '../pages/workspace';
import Savecontact from '../pages/savecontact';
import Markets from '../pages/markets';
import Profile from './profile';
import Wallet from './wallet';
import Settings from './settings';
import Login from './login';
import SelectPackeges from './select-packeges.jsx';
import Reset from './reset';
import OtpVerify from './otp-verify';
import OtpNumber from './otp-number';
import Lock from './lock';
import TermsAndConditions from './terms-and-conditions';
import NewsDetails from './news-details';
import Signup from './signup';
import Notfound from './notfound';

export default function index() {
  return (
    <>
      <Layout>
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/markets">
            <Markets />
          </Route>
          <Route path="/list">
            <List />
          </Route>
          <Route path="/analysis">
            <Analysis />
          </Route>
          <Route path="/workspace">
            <Workspace />
          </Route>
          <Route path="/savecontact">
            <Savecontact />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/wallet">
            <Wallet />
          </Route>
          <Route path="/settings">
            <Settings />
          </Route>
          <Route path="/exchange">
            <Exchange />
          </Route>
          <Route path="/select-packeges">
            <SelectPackeges />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/reset">
            <Reset />
          </Route>
          <Route path="/otp-verify">
            <OtpVerify />
          </Route>
          <Route path="/otp-number">
            <OtpNumber />
          </Route>
          <Route path="/lock">
            <Lock />
          </Route>
          <Route path="/terms-and-conditions">
            <TermsAndConditions />
          </Route>
          <Route path="/news-details">
            <NewsDetails />
          </Route>
          <Route path="/notfound">
            <Notfound />
          </Route>
        </Switch>
      </Layout>
    </>
  );
}
