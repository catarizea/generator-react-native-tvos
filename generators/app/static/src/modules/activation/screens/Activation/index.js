import React from 'react';
import PropTypes from 'prop-types';
import { injectIntl } from 'react-intl';
import Container from '../../../../components/Container';
import Heading from '../../../../components/Heading';
import PreloaderScreen from '../../../../components/PreloaderScreen';
import messages from './messages';

const Activation = props => {
  const { activationCode, intl: { formatMessage } } = props;

  if (!activationCode) {
    return <PreloaderScreen />;
  }

  return (
    <Container centered>
      <Heading>{formatMessage(messages.activateTitle)}</Heading>
      <Heading>{activationCode}</Heading>
    </Container>
  );
};

Activation.propTypes = {
  activationCode: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool,
  ]).isRequired,
  intl: PropTypes.object.isRequired,
};

export default injectIntl(Activation);
