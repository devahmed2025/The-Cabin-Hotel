import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const Select = styled.select`
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-0);
  font-size: 1.4rem;
  padding: 0.6rem 1rem;
  border-radius: var(--border-radius-sm);
`;

function SortBy({ options }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentValue = searchParams.get('sortBy') || '';

  function handleChange(e) {
    searchParams.set('sortBy', e.target.value);
    setSearchParams(searchParams);
  }

  return (
    <Select value={currentValue} onChange={handleChange}>
      {options.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </Select>
  );
}

export default SortBy;
