import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 34px;
    margin: auto;
    max-width: 1300px;
    display: grid;
    grid-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    grid-template-areas:
        'totalv ft lt totalt'
        'circle . table table'
        'balance balance permonth permonth';
`;

export const BalanceWrapper = styled.div`
    display: grid;
    margin: auto;
    width: 100%;
    grid-gap: 8px;
    grid-template-columns: 1fr 1fr 1fr 1fr;
`;
