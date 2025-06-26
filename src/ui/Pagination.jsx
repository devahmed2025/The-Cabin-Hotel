// import { useState } from 'react';
// import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
// import { useSearchParams } from 'react-router-dom';
// import styled from 'styled-components';

// const StyledPagination = styled.div`
//   width: 100%;
//   display: flex;
//   align-items: center;
//   justify-content: space-between;
// `;

// const P = styled.p`
//   font-size: 1.4rem;
//   margin-left: 0.8rem;

//   & span {
//     font-weight: 600;
//   }
// `;

// const Buttons = styled.div`
//   display: flex;
//   gap: 0.6rem;
// `;

// const PaginationButton = styled.button`
//   background-color: ${(props) => (props.active ? ' var(--color-brand-600)' : 'var(--color-grey-50)')};
//   color: ${(props) => (props.active ? ' var(--color-brand-50)' : 'inherit')};
//   border: none;
//   border-radius: var(--border-radius-sm);
//   font-weight: 500;
//   font-size: 1.4rem;

//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.4rem;
//   padding: 0.6rem 1.2rem;
//   transition: all 0.3s;

//   &:has(span:last-child) {
//     padding-left: 0.4rem;
//   }

//   &:has(span:first-child) {
//     padding-right: 0.4rem;
//   }

//   & svg {
//     height: 1.8rem;
//     width: 1.8rem;
//   }

//   &:hover:not(:disabled) {
//     background-color: var(--color-brand-600);
//     color: var(--color-brand-50);
//   }
// `;

// const Page_Size = 10;
// function Pagination({ count }) {
//   const [searchParams, setSearchParams] = useSearchParams();
//   const currentPage = !searchParams.get('page') ? 1 : parseInt(searchParams.get('page'));
//   const pageCount = Math.ceil(count / Page_Size);

//   function NextPage() {
//     const next = currentPage === pageCount ? currentPage : currentPage + 1;
//     // if (next) {
//     //   setSearchParams({ page: next });
//     // }
//     searchParams.set('page', next);
//     setSearchParams(searchParams);
//   }
//   function PreviousPage() {
//     const prev = currentPage === 1 ? currentPage : currentPage - 1;
//     searchParams.set('page', prev);
//     setSearchParams(searchParams);
//   }
//   return (
//     <StyledPagination>
//       <P>
//         Showing <span>1</span> to <span>10</span> of <span>{count}</span> results
//       </P>
//       <Buttons>
//         <PaginationButton onClick={PreviousPage} disabled={currentPage === 1}>
//           <HiChevronDoubleLeft />
//           <span>Previous</span>
//         </PaginationButton>
//         <PaginationButton onClick={NextPage} disabled={currentPage === pageCount}>
//           <span>next</span>
//           <HiChevronDoubleRight />
//         </PaginationButton>
//       </Buttons>
//     </StyledPagination>
//   );
// }

// export default Pagination;

import { HiChevronDoubleLeft, HiChevronDoubleRight } from 'react-icons/hi2';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const P = styled.p`
  font-size: 1.4rem;
  margin-left: 0.8rem;

  & span {
    font-weight: 600;
  }
`;

const Buttons = styled.div`
  display: flex;
  gap: 0.6rem;
`;

const PaginationButton = styled.button`
  background-color: ${(props) => (props.active ? 'var(--color-brand-600)' : 'var(--color-grey-50)')};
  color: ${(props) => (props.active ? 'var(--color-brand-50)' : 'inherit')};
  border: none;
  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;
  padding: 0.6rem 1.2rem;
  transition: all 0.3s;

  & svg {
    height: 1.8rem;
    width: 1.8rem;
  }

  &:hover:not(:disabled) {
    background-color: var(--color-brand-600);
    color: var(--color-brand-50);
  }
`;

const PAGE_SIZE = 8;

function Pagination({ count }) {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = +searchParams.get('page') || 1;
  const pageCount = Math.ceil(count / PAGE_SIZE);

  const from = (currentPage - 1) * PAGE_SIZE + 1;
  const to = Math.min(currentPage * PAGE_SIZE, count);

  function updatePage(newPage) {
    searchParams.set('page', newPage);
    setSearchParams(searchParams);
  }

  return (
    <StyledPagination>
      <P>
        Showing <span>{from}</span> to <span>{to}</span> of <span>{count}</span> results
      </P>

      <Buttons>
        <PaginationButton onClick={() => updatePage(currentPage - 1)} disabled={currentPage === 1}>
          <HiChevronDoubleLeft />
          <span>Previous</span>
        </PaginationButton>

        <PaginationButton onClick={() => updatePage(currentPage + 1)} disabled={currentPage === pageCount}>
          <span>Next</span>
          <HiChevronDoubleRight />
        </PaginationButton>
      </Buttons>
    </StyledPagination>
  );
}

export default Pagination;
export { PAGE_SIZE };
