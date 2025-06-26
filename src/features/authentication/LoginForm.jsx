import { useState } from 'react';
import Button from '../../ui/Button';
import Form from '../../ui/Form';
import FormRow from '../../ui/FormRow';
import SpinnerMini from '../../ui/SpinnerMini';
import Input from '../../ui/Input';
// import { login } from '../../services/apiAuth';
import { useLogin } from './useLogin';
function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { isLogging, login } = useLogin();

  async function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password) return;
    await login({ email, password });
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address" orientation="vertical">
        <Input
          type="email"
          id="email"
          // This makes this form better for password managers
          autoComplete="username"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormRow>
      <FormRow label="Password" orientation="vertical">
        <Input
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </FormRow>
      <FormRow orientation="vertical">
        <Button disabled={isLogging} size="large">
          {isLogging ? <SpinnerMini /> : 'Login In'}
        </Button>
      </FormRow>
    </Form>
  );
}

export default LoginForm;
