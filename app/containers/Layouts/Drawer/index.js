/**
 *
 * Drawer
 *
 */

import React, { memo, useEffect } from 'react';
import {
  Divider,
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
  ArrowBack as ArrowBackIcon,
  ArrowForward as ArrowForwardIcon,
  Close as CloseIcon,
  Email as EmailIcon,
  Folder as FolderIcon,
  Home as HomeIcon,
  Info as InfoIcon,
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

const menuLists = {
  menu1: [
    { name: 'Home', url: '/', icon: <HomeIcon /> },
    { name: 'Apps', url: '/apps', icon: <AppsIcon /> },
  ],
  menu2: null,
  menu3: [
    { name: 'Portfolio', url: '/portfolio', icon: <FolderIcon />, new_tab: true },
  ],
  menu4: null,
  menu5: [
    { name: 'Settings', url: '/settings', icon: <SettingsIcon /> },
    { name: 'Contact', url: '/contact', icon: <EmailIcon /> },
    { name: 'About', url: '/about', icon: <InfoIcon /> },
  ],
};

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
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: drawerState && !smallDevice,
        [classes.drawerClose]: !drawerState && !smallDevice,
      })}
      classes={{
        paper: clsx(classes.drawerOpen, {
          [classes.drawerOpen]: drawerState && !smallDevice,
          [classes.drawerClose]: !drawerState && !smallDevice,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={() => dispatch(changeDrawerState(!drawerState))}>
          {
            smallDevice
              ? <CloseIcon />
              : theme.direction === 'rtl' ? <ArrowForwardIcon /> : <ArrowBackIcon />
          }
        </IconButton>
      </div>

      <Divider />

      {
        map(menuLists, (item, index) => (
          item ? (
            <List key={`item-${index}`}>
              {
                map(item, (obj, idx) => (
                  <ListItem
                    key={`item-${obj.name}-${idx}`}
                    button
                    component={Link}
                    to={obj.url}
                    {...(
                      obj.new_tab ? ({
                        target: '_blank',
                      }) : ({
                        selected: obj.url === activeMenu,
                        onClick: () => {
                          (smallDevice && obj.url !== activeMenu)
                            && dispatch(changeDrawerState(!drawerState));
                          dispatch(changeActiveMenu(obj.url));
                        }
                      })
                    )}
                  >
                    <ListItemIcon
                      {...(
                        !drawerState && {
                          className: classes.collapsedItemIcon,
                        }
                      )}
                    >
                      {obj.icon}
                    </ListItemIcon>
                    <ListItemText primary={obj.name} />
                  </ListItem>
                ))
              }
            </List>
          ) : (
            <Divider key={`item-${index}`} />
          )
        ))
      }
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
