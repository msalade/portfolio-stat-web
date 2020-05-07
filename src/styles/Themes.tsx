import React, { FC } from 'react';
import { ThemeProvider } from 'styled-components';

import themes from './theme';

const Theme: FC = ({ children }) => (
    <ThemeProvider theme={themes}>{children}</ThemeProvider>
);

export default Theme;
