// import { useEffect, useState } from 'react';
// import { formatCurrency } from 'utils/helpers';

// import Spinner from 'ui/Spinner';
// import Row from 'ui/Row';
// import Heading from 'ui/Heading';
// import ButtonGroup from 'ui/ButtonGroup';
// import Button from 'ui/Button';
// import ButtonText from 'ui/ButtonText';
// import Checkbox from 'ui/Checkbox';

// import BookingDataBox from 'features/bookings/BookingDataBox';

// import { useBooking } from 'features/bookings/useBooking';
// import { useMoveBack } from 'hooks/useMoveBack';
// import { useCheckin } from './useCheckin';

// import styled from 'styled-components';
// import { box } from 'styles/styles';
// import { useSettings } from 'features/settings/useSettings';

// const Box = styled.div`
//   ${box}
//   padding: 2.4rem 4rem;
// `;

// function CheckinBooking() {
//   const [confirmPaid, setConfirmPaid] = useState(false);
//   const [addBreakfast, setAddBreakfast] = useState(false);

//   const { booking, isLoading } = useBooking();
//   const { mutate: checkin, isLoading: isCheckingIn } = useCheckin();
//   const moveBack = useMoveBack();
//   const { isLoading: isLoadingSettings, settings } = useSettings();

//   // Can't use as initial state, because booking will still be loading
//   useEffect(() => setConfirmPaid(booking?.isPaid ?? false), [booking]);

//   if (isLoading || isLoadingSettings) return <Spinner />;

//   const {
//     id: bookingId,
//     guests,
//     totalPrice,
//     numGuests,
//     hasBreakfast,
//     numNights,
//   } = booking;

//   const optionalBreakfastPrice =
//     numNights * settings.breakfastPrice * numGuests;

//   function handleCheckin() {
//     if (!confirmPaid) return;

//     if (addBreakfast)
//       checkin({
//         bookingId,
//         breakfast: {
//           hasBreakfast: true,
//           extrasPrice: optionalBreakfastPrice,
//           totalPrice: totalPrice + optionalBreakfastPrice,
//         },
//       });
//     else checkin({ bookingId, breakfast: {} });
//   }

//   // We return a fragment so that these elements fit into the page's layout
//   return (
//     <>
//       <Row type='horizontal'>
//         <Heading type='h1'>Check in booking #{bookingId}</Heading>
//         <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
//       </Row>

//       <BookingDataBox booking={booking} />

//       {/* LATER */}
//       {!hasBreakfast && (
//         <Box>
//           <Checkbox
//             checked={addBreakfast}
//             onChange={() => {
//               setAddBreakfast((add) => !add);
//               setConfirmPaid(false);
//             }}
//             id='breakfast'
//           >
//             Want to add breakfast for {formatCurrency(optionalBreakfastPrice)}?
//           </Checkbox>
//         </Box>
//       )}

//       <Box>
//         <Checkbox
//           checked={confirmPaid}
//           onChange={() => setConfirmPaid((confirm) => !confirm)}
//           // If the guest has already paid online, we can't even undo this
//           disabled={isCheckingIn || confirmPaid}
//           id='confirm'
//         >
//           I confirm that {guests.fullName} has paid the total amount of{' '}
//           {!addBreakfast
//             ? formatCurrency(totalPrice)
//             : `${formatCurrency(
//                 totalPrice + optionalBreakfastPrice
//               )} (${formatCurrency(totalPrice)} + ${formatCurrency(
//                 optionalBreakfastPrice
//               )} for breakfast)`}
//         </Checkbox>
//       </Box>

//       <ButtonGroup>
//         <Button onClick={handleCheckin} disabled={isCheckingIn || !confirmPaid}>
//           Check in booking #{bookingId}
//         </Button>
//         <Button variation='secondary' onClick={moveBack}>
//           Back
//         </Button>
//       </ButtonGroup>
//     </>
//   );
// }

// export default CheckinBooking;
import styled from 'styled-components';
import { useCheckin } from './useCheckin';
import { useBooking } from '../bookings/useBooking';
import { CreditCard, Home, Users, MapPin } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSettings } from '../settings/useSettings';
import { useEffect, useState } from 'react';
import Spinner from '../../ui/Spinner';
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 4rem 2rem;
  background: url(${(props) => props.bg}) center/cover no-repeat;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(12px);
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 0;
  }
`;

const Card = styled.div`
  background: white;
  border-radius: 1.2rem;
  padding: 2.4rem;
  max-width: 600px;
  width: 100%;
  z-index: 1;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  display: flex;
  flex-direction: column;
  gap: 1.8rem;
`;

const Title = styled.h1`
  font-size: 2.4rem;
  color: #1e293b;
  text-align: center;
  font-weight: bold;
`;

const Row = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 1.6rem;
  color: #334155;
  border-bottom: 1px solid #e2e8f0;
  padding: 1.2rem 0;
`;

const Label = styled.span`
  font-weight: 500;
  color: #64748b;
`;

const Value = styled.span`
  font-weight: 700;
  color: #1e293b;
`;

const Button = styled.button`
  background: linear-gradient(90deg, #059669, #047857);
  color: white;
  padding: 1rem 2rem;
  border: none;
  border-radius: 9999px;
  font-size: 1.6rem;
  font-weight: 600;
  cursor: pointer;
  margin-top: 1rem;
  transition: background 0.3s ease;
  &:hover {
    background: linear-gradient(90deg, #047857, #065f46);
  }
`;

const Loading = styled.div`
  font-size: 1.6rem;
  text-align: center;
  margin-top: 4rem;
  color: #64748b;
`;

const Error = styled.div`
  font-size: 1.6rem;
  text-align: center;
  margin-top: 4rem;
  color: #dc2626;
`;

function calculateNights(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
}

function CheckinBooking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isLoading, error } = useBooking();
  const [addBreakfast, setAddBreakfast] = useState(false);
  const [confirmPaid, setConfirmPaid] = useState(false);

  const { updateBooking, isCheckingIn } = useCheckin();
  const { settings } = useSettings();
  const breakFastPrice = settings?.breakFastPrice;
  if (isLoading) return <Loading>Loading booking details...</Loading>;
  if (!data || error) return <Error>Error fetching booking information</Error>;

  const {
    startDate,
    endDate,
    cabinPrice,
    extraPrice,
    totalPrice,
    isPaid,
    status,
    cabins,
    hasBreakfast,
    observations,
    guests,
  } = data;

  const nights = calculateNights(startDate, endDate);
  const breakfastTotal = addBreakfast ? nights * breakFastPrice : 0;

  const finishPrice = addBreakfast ? totalPrice + breakfastTotal : totalPrice;
  const safeStatus = status ?? 'unknown';

  const handleCheckin = async () => {
    if (!confirmPaid) return;
    await updateBooking(id); // ✅ pass it here
  };

  if (isCheckingIn) return <Spinner />;

  return (
    <Container bg={cabins?.image}>
      <Card>
        <Title>Check-In Booking #{id}</Title>
        <Row>
          <Label>Stay</Label>
          <Value>
            {startDate && endDate
              ? `${new Date(startDate).toDateString()} → ${new Date(endDate).toDateString()}`
              : 'N/A'}
          </Value>
        </Row>
        <Row>
          <Label>Nights</Label>
          <Value>{nights}</Value>
        </Row>
        <Row>
          <Label>Cabin</Label>
          <Value>{cabins?.name}</Value>
        </Row>
        <Row>
          <Label>Price</Label>
          <Value>${cabinPrice}</Value>
        </Row>
        <Row>
          <Label>Extras</Label>
          <Value>${extraPrice}</Value>
        </Row>

        <Row>
          <Label>
            Breakfast {nights} * {settings?.breakFastPrice} = {breakfastTotal}
          </Label>
          <Value>
            {' '}
            <input type="checkbox" checked={addBreakfast} onChange={(e) => setAddBreakfast(e.target.checked)} />
          </Value>
        </Row>
        {observations && (
          <Row>
            <Label>Notes</Label>
            <Value>{observations}</Value>
          </Row>
        )}
        <Row>
          <Label>Paid</Label>
          <Value>{isPaid ? 'Yes' : 'No'}</Value>
        </Row>
        <Row>
          <Label>Total</Label>
          <Value>${finishPrice}</Value>
        </Row>
        <Row>
          <Value>
            <input type="checkbox" checked={confirmPaid} onChange={(e) => setConfirmPaid(e.target.checked)} />{' '}
            <span>
              I confirm that guest #{guests.fullName} has paid the full amount (${finishPrice})
            </span>
          </Value>
        </Row>

        <Button disabled={!confirmPaid || isCheckingIn} onClick={() => handleCheckin()}>
          Check In Booking <span>{id}</span>
        </Button>
      </Card>
    </Container>
  );
}

export default CheckinBooking;
