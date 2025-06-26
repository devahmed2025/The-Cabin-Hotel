// import styled from 'styled-components';

// import Spinner from '../../ui/Spinner';
// import CabinRow from './CabinRow';
// import { useCabins } from './useCabins';
// import { useSearchParams } from 'react-router-dom';
// import SortableHeader from './SortableHeader';

// const Table = styled.div`
//   border: 1px solid var(--color-grey-200);

//   font-size: 1.4rem;
//   background-color: var(--color-grey-0);
//   border-radius: 7px;
//   overflow: hidden;
// `;

// const TableHeader = styled.header`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;

//   background-color: var(--color-grey-50);
//   border-bottom: 1px solid var(--color-grey-100);
//   text-transform: uppercase;
//   letter-spacing: 0.4px;
//   font-weight: 600;
//   color: var(--color-grey-600);
//   padding: 1.6rem 2.4rem;
// `;

// function CabinTable() {
//   const { isLoading, cabins } = useCabins();
//   console.log(cabins);
//   const [searchParams] = useSearchParams();
//   const discount = searchParams.get('discount');

//   if (isLoading) return <Spinner />;

//   let filteredCabins = cabins;
//   if (discount === 'with-discount') {
//     filteredCabins = cabins?.filter((cabin) => cabin?.discount > 0);
//   } else if (discount === 'no-discount') {
//     filteredCabins = cabins?.filter((cabin) => cabin?.discount === 0);
//   }
//   //sort by every col
//   const sortBy = searchParams.get('sortBy') || 'name-asc';

//   if (filteredCabins?.length > 0) {
//     const [field, direction] = sortBy.split('-');

//     filteredCabins.sort((a, b) => {
//       const valA = a[field];
//       const valB = b[field];

//       if (typeof valA === 'string') {
//         return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
//       }

//       return direction === 'asc' ? valA - valB : valB - valA;
//     });
//   }

//   return (
//     <Table role="table">
//       <TableHeader role="row">
//         <div></div>
//         <SortableHeader field="name" label="Cabin" />
//         <SortableHeader field="maxCapacity" label="Capacity" />
//         <SortableHeader field="regularPrice" label="Price" />
//         <SortableHeader field="discount" label="Discount" />
//         <div></div>
//         <div></div>
//       </TableHeader>
//       {filteredCabins.map((cabin) => (
//         <CabinRow cabin={cabin} key={cabin.id} />
//       ))}
//     </Table>
//   );
// }

// export default CabinTable;

import styled from 'styled-components';
import Spinner from '../../ui/Spinner';
import CabinRow from './CabinRow';
import { useCabins } from './useCabins';
import { useSearchParams } from 'react-router-dom';
import SortableHeader from './SortableHeader';
import Pagination from '../../ui/Pagination';

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

function CabinTable() {
  const { isLoading, cabins } = useCabins();
  const [searchParams] = useSearchParams();

  if (isLoading) return <Spinner />;

  // Filter by discount
  const discount = searchParams.get('status');
  let filteredCabins = cabins;
  if (discount === 'with-discount') {
    filteredCabins = cabins?.filter((c) => c.discount > 0);
  } else if (discount === 'no-discount') {
    filteredCabins = cabins?.filter((c) => c.discount === 0);
  }

  // Sort by query param
  const sortBy = searchParams.get('sortBy') || 'name-asc';
  const [field, direction] = sortBy.split('-');

  filteredCabins.sort((a, b) => {
    const valA = a[field];
    const valB = b[field];

    if (typeof valA === 'string') {
      return direction === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    }

    return direction === 'asc' ? valA - valB : valB - valA;
  });

  return (
    <Table role="table">
      <TableHeader role="row">
        <div></div>
        <SortableHeader field="name" label="Cabin" />
        <SortableHeader field="maxCapacity" label="Capacity" />
        <SortableHeader field="regularPrice" label="Price" />
        <SortableHeader field="discount" label="Discount" />
        <div></div>
        <div></div>
      </TableHeader>

      {filteredCabins.map((cabin) => (
        <CabinRow key={cabin.id} cabin={cabin} />
      ))}
      <Pagination count={filteredCabins.length} />
    </Table>
  );
}

export default CabinTable;
