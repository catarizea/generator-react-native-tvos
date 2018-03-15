import styled from 'styled-components/native';
import theme from '../../theme';

export const Label = styled.Text`
  font-family: ${theme.fontFamily};
  font-size: ${props => props.labelSize};
  font-weight: bold;
  color: ${theme.category.h1};
`;

export const OuterBox = styled.View`
  height: ${props => props.outerHeight};
  width: ${props => props.outerWidth};
  marginLeft: 0;
  marginRight: 0;
  justify-content: center;
  align-items: center;
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-radius: 3;
`;

export const InnerBox = styled.View`
  width: ${props => props.innerWidth};
  height: ${props => props.innerHeight};
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background-color: ${theme.category.background};
  flex-direction: row;
`;
