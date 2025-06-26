// import styled from "styled-components";
// import Button from "./Button";
// import Heading from "./Heading";

// const StyledConfirmDelete = styled.div`
//   width: 40rem;
//   display: flex;
//   flex-direction: column;
//   gap: 1.2rem;

//   & p {
//     color: var(--color-grey-500);
//     margin-bottom: 1.2rem;
//   }

//   & div {
//     display: flex;
//     justify-content: flex-end;
//     gap: 1.2rem;
//   }
// `;

// function ConfirmDelete({ resource, onConfirm, disabled, closeModal }) {
//   function handleConfirmClick() {}

//   return (
//     <StyledConfirmDelete>
//       <Heading type="h3">Delete {resource}</Heading>
//       <p>
//         Are you sure you want to delete this {resource} permanently? This action
//         cannot be undone.
//       </p>

//       <div>
//         <Button variation="secondary" onClick={closeModal}>
//           Cancel
//         </Button>
//         <Button
//           variation="danger"
//           onClick={handleConfirmClick}
//           disabled={disabled}
//         >
//           Delete
//         </Button>
//       </div>
//     </StyledConfirmDelete>
//   );
// }

// export default ConfirmDelete;

import styled from 'styled-components';
import Button from './Button';
import Heading from './Heading';

const StyledConfirmDelete = styled.div`
  width: 40rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;

  & p {
    color: var(--color-grey-500);
    margin-bottom: 1.2rem;
  }

  & div {
    display: flex;
    justify-content: flex-end;
    gap: 1.2rem;
  }
`;

function ConfirmDelete({
  resource = 'item', // fallback in case resource is not passed
  onConfirm,
  disabled = false,
  closeModal,
}) {
  function handleConfirmClick() {
    if (onConfirm) onConfirm(); // Trigger deletion
    if (closeModal) closeModal(); // Close modal
  }

  return (
    <StyledConfirmDelete>
      <Heading type="h3">Delete {resource}</Heading>
      <p>Are you sure you want to delete this {resource} permanently? This action cannot be undone.</p>

      <div>
        <Button variation="secondary" onClick={closeModal} disabled={disabled}>
          Cancel
        </Button>

        <Button variation="danger" onClick={handleConfirmClick} disabled={disabled}>
          {disabled ? 'Deleting...' : 'Delete'}
        </Button>
      </div>
    </StyledConfirmDelete>
  );
}

export default ConfirmDelete;
