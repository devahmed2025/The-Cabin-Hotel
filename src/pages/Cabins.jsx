import { useState } from 'react';
import CabinTable from '../features/cabins/CabinTable';
import Heading from '../ui/Heading';
import Row from '../ui/Row';
import Button from '../ui/Button';
import CreateCabinForm from '../features/cabins/CreateCabinForm';
import AddCabin from '../features/cabins/AddCabin';
import CabinTableOperations from './CabinTableOperations';
import Pagination from '../ui/Pagination';

function Cabins() {
  // const [showForm, setShowForm] = useState(false);

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">All cabins</Heading>
        <CabinTableOperations />
        <p>Filter / Sort</p>
      </Row>

      <Row>
        <CabinTable />
        <AddCabin />
      </Row>
     
    </>
  );
}

export default Cabins;
