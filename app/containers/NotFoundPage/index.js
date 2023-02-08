/**
 * NotFoundPage
 *
 * This is the page we show when the user visits a url that doesn't have a route
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
// import makeSelectNotFoundPage from './selectors';
// import reducer from './reducer';
// import saga from './saga';
import messages from './messages';

import { changeActiveMenu } from '../Layouts/Drawer/actions';

// import useStyles from './styles';

export function NotFound({
  dispatch,
  location,
}) {
  // useInjectReducer({ key: 'notFoundPage', reducer });
  // useInjectSaga({ key: 'notFoundPage', saga });
  
  // const classes = useStyles();

  useEffect(() => {
    dispatch(changeActiveMenu(location.pathname));
  }, []);

  return (
    <React.Fragment>
      <Helmet titleTemplate="%s | Arvie - Portfolio">
        <title>Not Found</title>
        <meta name="description" content="Description of NotFoundPage" />
      </Helmet>

      <h1>
        <FormattedMessage {...messages.header} />
      </h1>
    </React.Fragment>
  );
}

NotFound.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  // notFoundPage: makeSelectNotFoundPage(),
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
)(NotFound);
