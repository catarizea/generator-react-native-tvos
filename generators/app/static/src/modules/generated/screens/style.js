import styled from 'styled-components/native';
import theme from '../../../theme';
import { device } from '../../../constants/metrics';

export const HorizontalContainer = styled.View`
  flex: 1;
  flex-direction: row;
  background-color: ${theme.background}
`;

export const ImageOuterContainer = styled.View`
  flex: ${props => props.flex};
  justify-content: center;
  align-items: center;
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-radius: 3;
`;

export const ImageInnerContainer = styled.View`
  overflow: hidden;
  border-radius: 15;
`;

export const TextOuterContainer = styled.View`
  flex: ${props => props.flex};
  justify-content: center;
  align-items: flex-start;
`;

export const TextInnerContainer = styled.View`
  height: ${props => props.height};
  width: 100%;
  padding-right: 50;
  align-items: flex-start;
`;

export const Title = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.details.h1};
  font-size: ${theme.details.h1Size};
  font-weight: bold;
  margin-bottom: 30;
`;

export const Plot = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.details.p};
  font-size: ${theme.details.pSize};
`;

export const InfoLabelContainer = styled.View`
  flex-direction: row;
  margin-top: 10;
`;

export const InfoLabel = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.details.infoLabel};
  font-size: ${theme.details.infoLabelSize};
`;

export const InfoText = styled.Text`
  padding-left: 10;
  font-family: ${theme.fontFamily};
  color: ${theme.details.p};
  font-size: ${theme.details.infoLabelSize};
`;

export const VerticalListContainer = styled.View`
  width: ${device.width};
  align-items: center;
`;
