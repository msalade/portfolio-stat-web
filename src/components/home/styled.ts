import styled, { css } from 'styled-components';

export const Wrapper = styled.div`
    padding: 34px;
    margin: auto;
    max-width: 1300px;
`;

export const Grid = styled.div<{ withBorder?: boolean }>`
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        'totalv ft lt totalt'
        'circle . table table'
        'balance balance permonth permonth';

    ${props =>
        props.withBorder &&
        css`
            .MuiPaper-root {
                box-shadow: none;
                border: 1px solid ${props.theme.black};
            }
        `}
`;

export const BalanceWrapper = styled.div`
    display: grid;
    margin: auto;
    width: 100%;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
