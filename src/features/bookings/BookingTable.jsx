

import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import BookingRow from './BookingRow';
import { useBookings } from './useBookings';
import { useSearchParams } from 'react-router-dom';
import SortableHeader from '../cabins/SortableHeader';
import Pagination, { PAGE_SIZE } from '../../ui/Pagination';

const Table = styled.div`
  border: 1px solid var(--color-grey-200);
  font-size: 1.4rem;
  background-color: var(--color-grey-0);
  border-radius: 7px;
  overflow: hidden;
`;

const TableHeader = styled.header`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;

  background-color: var(--color-grey-50);
  border-bottom: 1px solid var(--color-grey-100);
  text-transform: uppercase;
  letter-spacing: 0.4px;
  font-weight: 600;
  color: var(--color-grey-600);
  padding: 1.6rem 2.4rem;
`;
function BookingTable() {
  const { bookings, isLoading, count } = useBookings();

  if (isLoading) return <Spinner />;
  if (!bookings || bookings.length === 0) return <p>No bookings found.</p>;

  return (
    <Table role="table">
      <TableHeader role="row">
        <SortableHeader field="cabin.name" label="Cabin" />
        <SortableHeader field="guests.fullName" label="Guest" />
        <SortableHeader field="startDate" label="Dates" />
        <SortableHeader field="status" label="Status" />
        <SortableHeader field="totalPrice" label="Amount" />
        <div></div>
      </TableHeader>

      {bookings.map((booking) => (
        <BookingRow booking={booking} key={booking.id} />
      ))}

      <Pagination count={count} />
    </Table>
  );
}

export default BookingTable;

