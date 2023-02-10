/**
 *
 * Drawer
 *
 */

import React, { memo, useEffect } from 'react';
import {
  Drawer as DrawerMui,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from '@material-ui/core';
import {
  Apps as AppsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Close as CloseIcon,
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
  const smallDevice = useMediaQuery((theme) => theme.breakpoints.down('xs'));

  useEffect(() => {
    const screenSizeChecker = async () => (
      smallDevice
        ? await dispatch(changeDrawerState(false))
        : await dispatch(changeDrawerState(true))
    );

    screenSizeChecker();
  }, [smallDevice]);

  return (
    <DrawerMui
      variant={smallDevice ? 'temporary' : 'permanent'}
      {...(
        smallDevice && {
          open: drawerState,
          onClose: () => dispatch(changeDrawerState(!drawerState)),
        }
      )}
      className={
        smallDevice
          ? classes.drawer
          : clsx(classes.drawer, {
            [classes.drawerOpen]: drawerState,
            [classes.drawerClose]: !drawerState,
          })
      }
      classes={{
        paper: smallDevice
          ? classes.drawerOpen
          : clsx({
            [classes.drawerOpen]: drawerState,
            [classes.drawerClose]: !drawerState,
          }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => dispatch(changeDrawerState(!drawerState))}>
          {
            smallDevice
              ? <CloseIcon />
              : drawerState
                && (theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />)
          }
        </IconButton>
      </div>

      <List>
        {
          map(menuList, (item, index) => (
            <ListItem
              key={`item-${item.name}-${index}`}
              button
              component={Link}
              to={item.url}
              selected={item.url === activeMenu}
              onClick={() => {
                (smallDevice && item.url !== activeMenu)
                  && dispatch(changeDrawerState(!drawerState));
                dispatch(changeActiveMenu(item.url));
              }}
            >
              <ListItemIcon
                {...(
                  !drawerState && {
                    className: classes.collapsedItemIcon,
                  }
                )}
              >
                {item.icon}
              </ListItemIcon>
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
