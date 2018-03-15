import styled from 'styled-components/native';
import theme from '../../theme';

export const OuterBox = styled.View`
  height: ${props => props.outerHeight};
  width: ${props => props.outerWidth};
  marginLeft: ${props => 10 + props.firstMarginLeft};
  marginRight: ${props => 10 + props.lastMarginRight};
  justify-content: center;
  align-items: center;
`;

export const InnerBox = styled.View`
  width: ${props => props.innerWidth};
  height: ${props => props.innerHeight};
  border-radius: 6;
  justify-content: flex-start;
  align-items: center;
`;

export const PosterText = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.poster.title};
  font-size: ${theme.poster.titleSize};
  text-align: center;
  margin-top: 15;
`;
