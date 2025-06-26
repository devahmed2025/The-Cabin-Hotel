// import { HiXMark } from 'react-icons/hi2';
// import styled from 'styled-components';

// const StyledModal = styled.div`
//   position: fixed;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   background-color: var(--color-grey-0);
//   border-radius: var(--border-radius-lg);
//   box-shadow: var(--shadow-lg);
//   padding: 3.2rem 4rem;
//   transition: all 0.5s;
// `;

// const Overlay = styled.div`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100vh;
//   background-color: var(--backdrop-color);
//   backdrop-filter: blur(4px);
//   z-index: 1000;
//   transition: all 0.5s;
// `;

// const Button = styled.button`
//   background: none;
//   border: none;
//   padding: 0.4rem;
//   border-radius: var(--border-radius-sm);
//   transform: translateX(0.8rem);
//   transition: all 0.2s;
//   position: absolute;
//   top: 1.2rem;
//   right: 1.9rem;

//   &:hover {
//     background-color: var(--color-grey-100);
//   }

//   & svg {
//     width: 2.4rem;
//     height: 2.4rem;
//     /* Sometimes we need both */
//     /* fill: var(--color-grey-500);
//     stroke: var(--color-grey-500); */
//     color: var(--color-grey-500);
//   }
// `;

// function Modal({ children, setisOpenModal }) {
//   return (
//     <Overlay>
//       <StyledModal>
//         <Button onClick={() => setisOpenModal((prev) => !prev)}>
//           <HiXMark />
//         </Button>
//         <div>{children}</div>
//       </StyledModal>
//     </Overlay>
//   );
// }

// export default Modal;
import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import styled from 'styled-components';
import { HiXMark } from 'react-icons/hi2';

// Overlay with flexbox to center modal
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: var(--backdrop-color);
  backdrop-filter: blur(4px);
  z-index: 1000;
  padding: 2rem;
  overflow-y: auto;
`;

// Modal box itself
const StyledModal = styled.div`
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-lg);
  padding: 3.2rem 4rem;
  position: relative;
  max-width: 90rem;
  width: 100%;
  max-height: 100%;
  overflow-y: auto;
  z-index: 1001;
`;

// Close button in corner
const CloseButton = styled.button`
  background: none;
  border: none;
  padding: 0.4rem;
  border-radius: var(--border-radius-sm);
  position: absolute;
  top: 1.2rem;
  right: 1.9rem;

  &:hover {
    background-color: var(--color-grey-100);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-500);
  }
`;

function Modal({ children, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(e) {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose?.();
      }
    }

    function handleEscape(e) {
      if (e.key === 'Escape') onClose?.();
    }

    function handleExternalClose(e) {
      if (e.detail?.type === 'close-modal') onClose?.();
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);
    window.addEventListener('modal:close', handleExternalClose);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
      window.removeEventListener('modal:close', handleExternalClose);
    };
  }, [onClose]);

  return createPortal(
    <Overlay>
      <StyledModal ref={modalRef}>
        <CloseButton onClick={onClose}>
          <HiXMark />
        </CloseButton>
        {children}
      </StyledModal>
    </Overlay>,
    document.body,
  );
}

export default Modal;
