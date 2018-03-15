import styled from 'styled-components/native';
import theme from '../../theme';

export const OuterBox = styled.View`
  height: ${props => props.outerHeight};
  width: ${props => props.outerWidth};
  margin-left: ${props => props.firstMarginLeft};
  margin-right: ${props => props.lastMarginRight};
  justify-content: center;
  align-items: center;
  shadow-color: black;
  shadow-opacity: 0.3;
  shadow-radius: 3;
`;

export const InnerBox = styled.View`
  width: ${props => props.innerWidth};
  height: ${props => props.innerHeight};
  border-radius: 10;
  justify-content: flex-end;
  align-items: center;
  overflow: hidden;
  background-color: ${theme.featured.background};
`;

export const TextBox = styled.View`
  height: 150;
  width: 100%;
  padding-top: 20;
  padding-left: 20;
`;

export const FeaturedText = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.featured.h2};
  font-size: ${theme.featured.h2Size};
  font-weight: bold;
`;

export const TitleText = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.featured.h1};
  font-size: ${theme.featured.h1Size};
  font-weight: normal;
  margin-top: 5;
  margin-bottom: 5;
`;

export const DescriptionText = styled.Text`
  font-family: ${theme.fontFamily};
  color: ${theme.featured.p};
  font-size: ${theme.featured.pSize};
  font-weight: normal;
`;
