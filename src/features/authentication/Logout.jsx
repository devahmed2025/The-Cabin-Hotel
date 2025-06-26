import { HiArrowLeftEndOnRectangle } from 'react-icons/hi2';
import ButtonIcon from '../../ui/ButtonIcon';
import {useLogout} from './useLogout';
import SpinnerMini from '../../ui/SpinnerMini';

function Logout() {
  const { logOut, isLoading } = useLogout();
  return (
    <ButtonIcon disabled={isLoading} onClick={logOut}>
      {isLoading ? <SpinnerMini /> : <HiArrowLeftEndOnRectangle />}
    </ButtonIcon>
  );
}

export default Logout;
