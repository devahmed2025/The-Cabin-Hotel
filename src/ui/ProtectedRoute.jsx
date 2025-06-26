import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Spinner from './Spinner';
import { useUser } from '../features/authentication/useUser';


function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { user, error, isLoading } = useUser();

  useEffect(() => {
    if (!isLoading && (!user || error)) {
      navigate('/login');
    }
  }, [user, error, isLoading, navigate]);

  if (isLoading) return <Spinner />;

  return user ? children : null;
}

export default ProtectedRoute;
