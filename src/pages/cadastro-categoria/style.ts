import styled from 'styled-components';

export const PageContent = styled.div`
  padding: 25px 35px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  height: 70%;
  gap: 15px;
  box-sizing: border-box;
`;

export const InputStyles = styled.div`
  width: 100%;
  height: 30%;
  label {
    padding: 0 0.5rem;
    font-weight: bold;
  }
  input,
  label {
    display: block;
  }

  input {
    min-width: 220px;
    /* width: 100%; */
    height: 32px;
    border: 1px solid #eaeaea;
    letter-spacing: 0.04rem;
    padding-inline-start: 8px;
  }
  .description {
    min-width: 220px;
    width: 100%;
    border: 1px solid #eaeaea;
    height: 32px;
    padding-inline-start: 8px;
  }

  @media (max-width: 1075px) {
    input {
      width: 65%;
    }
  }
`;
