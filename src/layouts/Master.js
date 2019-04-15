import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {connect} from 'react-redux';

import {compose} from 'redux';
import {withFirebase, withFirestore} from 'react-redux-firebase';
import * as userActions from '../store/actions/user';

class Master extends PureComponent {
  static propTypes = {
    children: PropTypes.element,
    getUserData: PropTypes.func.isRequired,
    firestore: PropTypes.shape({
      collection: PropTypes.func.isRequired,
    }).isRequired, // from withFirestore
    user: PropTypes.shape({
      user: PropTypes.object.isRequired,
      isLoaded: PropTypes.bool.isRequired,
    }).isRequired,
    auth: PropTypes.shape({
      uid: PropTypes.string.isRequired,
    }).isRequired, // from withFirebase
  };

  /* eslint-disable-next-line react/destructuring-assignment */
  componentDidMount() {
    const {getUserData, auth, firestore} = this.props;

    firestore
      .collection('users')
      .doc(`${auth.uid}`)
      .get()
      .then(doc => {
        if (doc.exists) {
          const userData = doc.data();

          getUserData(userData);
        }
      });
  }

  render() {
    const {children} = this.props;
    return <React.Fragment>{children}</React.Fragment>;
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    getUserData: () => dispatch(userActions.getUserData()),
  };
};

const mapStateToProps = (state, ownProps) => {
  const user = state.user || {};

  return {
    user,
  };
};

export default compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  withFirebase,
  withFirestore,
  connect(({firebase: {auth}}) => ({auth}))
)(Master);
