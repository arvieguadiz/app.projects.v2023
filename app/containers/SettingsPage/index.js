/**
 *
 * SettingsPage
 *
 */

import React, { memo, useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { FormattedMessage } from 'react-intl';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
// import clsx from 'clsx';

import { useInjectSaga } from 'utils/injectSaga';
import { useInjectReducer } from 'utils/injectReducer';
import makeSelectSettingsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import messages from './messages';

import { changeActiveMenu } from '../Layouts/Drawer/actions';

// import useStyles from './styles';

export function SettingsPage({
  dispatch,
  location,
}) {
  useInjectReducer({ key: 'settingsPage', reducer });
  useInjectSaga({ key: 'settingsPage', saga });
  
  // const classes = useStyles();

  useEffect(() => {
    dispatch(changeActiveMenu(location.pathname));
  }, []);

  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Arvie - Portfolio">
        <title>Settings</title>
        <meta name="description" content="Description of SettingsPage" />
      </Helmet>

      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </React.Fragment>
  );
}

SettingsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  settingsPage: makeSelectSettingsPage(),
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
)(SettingsPage);
