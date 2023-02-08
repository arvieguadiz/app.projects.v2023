/**
 *
 * App.js
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 *
 */

import React, { memo, useMemo, useState } from 'react';
import {
  CssBaseline,
} from '@material-ui/core';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Switch, Route } from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import '../../assets/scss/main.scss';

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectApp from './selectors';
// import reducer from './reducer';
// import saga from './saga';

import { makeSelectTheme } from '../Layouts/Header/selectors';

import Header from '../Layouts/Header';
import Drawer from '../Layouts/Drawer';
import HomePage from 'containers/HomePage/Loadable';
import SettingsPage from 'containers/SettingsPage/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';

import useStyles from './styles';
// import GlobalStyle from '../../global-styles';

export function App({
  dispatch,
  currentTheme,
}) {
  // useInjectReducer({ key: 'app', reducer });
  // useInjectSaga({ key: 'app', saga });

  const classes = useStyles();
  
  const theme = useMemo(() => createTheme({
    palette: {
      type: currentTheme,
    },
  }), [currentTheme]);

  return (
    <ThemeProvider theme={theme}>
      <div className={classes.root}>
        <CssBaseline />

        <Header />

        <Drawer />

        <main className={classes.content}>
          <div className={classes.toolbar} />
          <Switch>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/settings" component={SettingsPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </main>
      </div>
      
      {/* <GlobalStyle /> */}
    </ThemeProvider>
  );
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // app: makeSelectApp(),
  currentTheme: makeSelectTheme(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

export default compose(
  withConnect,
  memo
)(App);
