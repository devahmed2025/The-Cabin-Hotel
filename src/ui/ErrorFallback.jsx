// src/components/ErrorFallback.jsx
import styled from 'styled-components';

const StyledErrorFallback = styled.main`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4.8rem;
`;

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 4.8rem;
  flex: 0 1 96rem;
  text-align: center;

  & h1 {
    margin-bottom: 1.6rem;
  }

  & p {
    font-family: 'Sono';
    margin-bottom: 3.2rem;
    color: var(--color-grey-500);
  }

  & pre {
    font-family: 'Sono';
    color: var(--color-red-700);
    margin-bottom: 3.2rem;
  }

  & button {
    padding: 1rem 2rem;
    border: none;
    background-color: var(--color-brand-600);
    color: white;
    border-radius: 0.5rem;
    font-weight: 600;
    cursor: pointer;
  }
`;

function ErrorFallback({ error, resetErrorBoundary }) {
  return (
    <StyledErrorFallback>
      <Box>
        <h1>Something went wrong</h1>
        <p>We apologize for the inconvenience. Please try again.</p>
        <pre>{error.message}</pre>
        <button onClick={resetErrorBoundary}>🔄 Try again</button>
      </Box>
    </StyledErrorFallback>
  );
}

export default ErrorFallback;
