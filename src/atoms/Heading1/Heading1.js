import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';

import PropTypes from 'prop-types';

const StyledHeading1 = styled.div`
    font-size: ${rem("24px")};
    color: ${(props) => props.theme.primary};
    margin: 20px;
`;

const Heading1 = ({children}) => <StyledHeading1>{children}</StyledHeading1>;

Heading1.propTypes = {
    children: PropTypes.string
}

export default Heading1;