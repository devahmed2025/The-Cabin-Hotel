import Filter from '../ui/Filter';
import TableOperations from '../ui/TableOperations';
function CabinTableOperations() {
  return (
    <TableOperations>
      {/* <Filter/> */}
      <Filter
        filterField="status"
        options={[
          { value: 'all', label: 'All' },
          { value: 'with-discount', label: 'With-discount' },
          { value: 'no-discount', label: 'no-discount' },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
