import { useSearchParams } from 'react-router-dom';

function SortableHeader({ field, label }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentSort = searchParams.get('sortBy') || 'name-asc';

  const isActive = currentSort.startsWith(field);
  const direction = currentSort.endsWith('asc') ? 'asc' : 'desc';
  const newDirection = isActive && direction === 'asc' ? 'desc' : 'asc';

  const handleClick = () => {
    searchParams.set('sortBy', `${field}-${newDirection}`);
    setSearchParams(searchParams);
  };

  return (
    <div style={{ cursor: 'pointer', fontWeight: isActive ? 'bold' : 'normal' }} onClick={handleClick}>
      {label} {isActive ? (direction === 'asc' ? '↑' : '↓') : ''}
    </div>
  );
}
export default SortableHeader;