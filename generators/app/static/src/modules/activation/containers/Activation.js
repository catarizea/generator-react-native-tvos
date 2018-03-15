import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { activationActions } from '../../../redux/actionCreators';
import ActivationScreen from '../screens/Activation';

class Activation extends Component {
  componentWillMount() {
    const { fetchCode, fetchMe } = this.props;

    fetchMe().catch(() => {
      fetchCode().catch(() => {});

      this.polling = setInterval(() => {
        fetchMe().catch(() => {});
      }, 3000);
    });
  }

  componentWillUnmount() {
    if (this.polling) {
      clearInterval(this.polling);
    }
  }

  render() {
    const { activationCode } = this.props;
    return (
      <ActivationScreen activationCode={activationCode} />
    );
  }
}

Activation.propTypes = {
  activationCode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  fetchCode: PropTypes.func.isRequired,
  fetchMe: PropTypes.func.isRequired,
};

const mapStateToProps = ({ activation: { activationCode } }) => ({
  activationCode,
});

export default connect(mapStateToProps, activationActions)(Activation);
