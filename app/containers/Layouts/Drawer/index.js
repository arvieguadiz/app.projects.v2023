/**
 *
 * Drawer
 *
 */

import React, { memo } from 'react';
import {
  Divider,
  Drawer as DrawerMui,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import {
  Apps as AppsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
} from '@material-ui/icons';
import { useTheme } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { map } from 'lodash';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import {
  changeDrawerState,
  changeActiveMenu,
} from './actions';
import makeSelectDrawer, {
  makeSelectDrawerState,
  makeSelectActiveMenu,
} from './selectors';
import reducer from './reducer';
import saga from './saga';
// import messages from './messages';

import useStyles from './styles';

const menuList = [
  { name: 'Home', url: '/', icon: <HomeIcon /> },
  { name: 'Apps', url: '/apps', icon: <AppsIcon /> },
  { name: 'Settings', url: '/settings', icon: <SettingsIcon /> },
];

export function Drawer({
  dispatch,
  drawerState,
  activeMenu,
}) {
  useInjectReducer({ key: 'drawer', reducer });
  useInjectSaga({ key: 'drawer', saga });
  
  const classes = useStyles();
  const theme = useTheme();

  return (
    <DrawerMui
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerState,
        [classes.drawerClose]: !drawerState,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: drawerState,
          [classes.drawerClose]: !drawerState,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => dispatch(changeDrawerState(!drawerState))}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>

      <Divider />

      <List>
        {
          map(menuList, (item, index) => (
            <ListItem
              key={`item-${item.name}-${index}`}
              button
              component={Link}
              to={item.url}
              selected={item.url === activeMenu}
              onClick={() => dispatch(changeActiveMenu(item.url))}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.name} />
            </ListItem>
          ))
        }
      </List>
    </DrawerMui>
    // <FormattedMessage {...messages.header} />
  );
}

Drawer.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  drawer: makeSelectDrawer(),
  drawerState: makeSelectDrawerState(),
  activeMenu: makeSelectActiveMenu(),
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
)(Drawer);
