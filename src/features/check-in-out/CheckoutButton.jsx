import Button from '../../ui/Button';
import { useCheckOut } from './useCheckOut';

function CheckoutButton({ bookingId }) {
  const { isLoading, updateBooking } = useCheckOut();

  return (
    <Button variation="primary" size="small" onClick={async () => await updateBooking(bookingId)} disabled={isLoading}>
      Check out
    </Button>
  );
}

export default CheckoutButton;
