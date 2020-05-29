import styled from 'styled-components';

export const Wrapper = styled.div`
    padding: 24px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    .MuiList-root {
        width: 800px;
    }
`;

export const InputsWrapper = styled.div`
    display: flex; 
    justify-content: space-around;
    align-items: center;
    padding: 16px;

    .MuiFormControl-root.MuiTextField-root {
        margin-right: 16px;
    }
`;

export const ButtonsWrapper = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;
    width: 180px;
`;