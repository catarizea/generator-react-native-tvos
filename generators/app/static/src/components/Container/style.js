import styled from 'styled-components/native';
import theme from '../../theme';
import { device } from '../../constants/metrics';

export const Container = styled.View`
  flex: 1;
  justify-content: flex-start;
  align-items: flex-start;
  background-color: ${theme.background};
`;

export const ContainerCentered = styled(Container)`
  justify-content: center;
  align-items: center;
`;

export const ContainerHorizontal = styled.View`
  flex-direction: row;
`;

export const ContainerHorizontalCentered = styled(ContainerHorizontal)`
  justify-content: center;
  align-items: center;
  width: ${device.width};
`;
