import styled from 'styled-components';

export const Wrapper = styled.form`
    height: 300px;
    width: 200px;
    padding: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 20px;
    justify-content: space-evenly;
    box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.4);
`;

export const Error = styled.p`
    color: ${props => props.theme.red};
`;