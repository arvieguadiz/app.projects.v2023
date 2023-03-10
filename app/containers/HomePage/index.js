/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
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

// import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
// import makeSelectHomePage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from './messages';

import { changeActiveMenu } from '../Layouts/Drawer/actions';

// import useStyles from './styles';

export function HomePage({
  dispatch,
  location,
}) {
  // useInjectReducer({ key: 'homePage', reducer });
  // useInjectSaga({ key: 'homePage', saga });
  
  // const classes = useStyles();

  useEffect(() => {
    dispatch(changeActiveMenu(location.pathname));
  }, []);

  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Arvie - Portfolio">
        <title>Home</title>
        <meta name="description" content="Description of HomePage" />
      </Helmet>
      
      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </React.Fragment>
  );
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // homePage: makeSelectHomePage(),
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
)(HomePage);
