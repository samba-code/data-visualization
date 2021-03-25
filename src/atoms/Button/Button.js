import React from "react";
import styled from "styled-components";

import PropTypes from "prop-types";

const StyledButton = styled.button`
  background: ${(props) =>
    props.selected ? props.theme.primaryLight : props.theme.primary};
  color: white;
  padding: 4px 8px;
  border-radius: 3px;
  border: none;
`;

const Button = ({ children, ...props }) => (
  <StyledButton {...props}>{children}</StyledButton>
);

Button.propTypes = {
  selected: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

Button.defaultProps = {
  selected: false,
};

export default Button;
