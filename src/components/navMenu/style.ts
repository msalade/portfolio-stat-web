import styled from 'styled-components';
import { Typography } from '@material-ui/core';

export const Link = styled(Typography).attrs(() => ({
    variant: 'subtitle1'
}))`
    cursor: pointer;
    padding-right: 16px;
`;
