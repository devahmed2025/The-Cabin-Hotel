import styled from 'styled-components';
import LoginForm from '../features/authentication/LoginForm';
import Logo from '../ui/Logo';
import Heading from '../ui/Heading';

const LoginLayout = styled.main`
  min-height: 100vh;
  display: flex;

  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2rem;
  gap: 1rem;
  
  background-color: var(--color-grey-50);
`;
const FormWrapper = styled.div`
  width: 100%;
  max-width: 60rem;
  text-align: center;
  background: white;
  padding: 3rem 2.4rem;
  border-radius: 1rem;
  box-shadow: 0 0.4rem 2rem rgba(0, 0, 0, 0.1);
`;


function Login() {
  return (
    <LoginLayout>
      <Logo />
      <Heading as="h4">Login into your account</Heading>
      <FormWrapper>
        <LoginForm />
      </FormWrapper>
    </LoginLayout>
  );
}


export default Login;
