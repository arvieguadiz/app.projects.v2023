/**
 *
 * Header
 *
 */

import React, { memo } from 'react';
import {
  AppBar,
  IconButton,
  Toolbar,
  Typography
} from '@material-ui/core';
import {
  Brightness7 as Brightness7Icon,
  Menu as MenuIcon,
} from '@material-ui/icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import clsx from 'clsx';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import { changeTheme } from './actions';
import makeSelectHeader, { makeSelectTheme } from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import { changeDrawerState } from '../Drawer/actions';
import { makeSelectDrawerState } from '../Drawer/selectors';

import useStyles from './styles';

export function Header({
  dispatch,
  theme,
  drawerState,
}) {
  useInjectReducer({ key: 'header', reducer });
  useInjectSaga({ key: 'header', saga });
  
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: drawerState,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={() => dispatch(changeDrawerState(!drawerState))}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: drawerState,
          })}
        >
          <MenuIcon />
        </IconButton>
        
        <Typography variant="h6" noWrap className={classes.title}>
          Welcome!
        </Typography>

        <IconButton
          color="inherit"
          edge="end"
          onClick={() => dispatch(changeTheme(theme === 'dark' ? 'light' : 'dark'))}
        >
          <Brightness7Icon />
        </IconButton>
      </Toolbar>
    </AppBar>
    // <FormattedMessage {...messages.header} />
  );
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  header: makeSelectHeader(),
  theme: makeSelectTheme(),
  drawerState: makeSelectDrawerState(),
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
  memo,
)(Header);
