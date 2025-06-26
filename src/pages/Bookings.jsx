import Heading from '../ui/Heading';
import Row from '../ui/Row';
import BookingsTable from '.././features/bookings/BookingTable';
import BookingsTableOptions from '.././features/bookings/BookingTableOperations'
function Bookings() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All bookings</Heading>
        <BookingsTableOptions />
        {/* <p>TEST</p> */}
      </Row>
      <Row>
        <BookingsTable />
      </Row>
    </>
  );
}

export default Bookings;
