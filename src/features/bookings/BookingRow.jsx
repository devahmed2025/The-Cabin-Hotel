// import styled from 'styled-components';
// import { format, isToday } from 'date-fns';
// import { formatDistanceFromNow } from '../../utils/helpers';
// import { formatCurrency } from '../../utils/helpers';
// import Tag from '../../ui/Tag';
// import { useEffect, useState } from 'react';
// import {
//   HiEllipsisHorizontal,
//   HiEye,
//   HiPencil,
//   HiCalendarDays,
//   HiUser,
//   HiCurrencyDollar,
//   HiTrash,
// } from 'react-icons/hi2';
// import { Link } from 'react-router-dom';
// import CheckoutButton from '../check-in-out/CheckoutButton';
// import { useDeleteBooking } from './useDeleteBooking';
// import Modal from '../../ui/Modal';
// import ConfirmDelete from '../../ui/ConfirmDelete';

// const Row = styled.div`
//   display: grid;
//   grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
//   column-gap: 2.4rem;
//   align-items: center;
//   padding: 2rem 2.4rem;
//   background: linear-gradient(135deg, #ffffff 0%, #f8fafc 100%);
//   border-radius: 1.2rem;
//   margin-bottom: 1rem;
//   box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
//   border: 1px solid #e2e8f0;
//   transition: all 0.3s ease;
//   position: relative;
//   overflow: visible;
//   z-index: ${(props) => (props.hasActiveMenu ? '1000' : '1')}; /* Dynamic z-index */

//   &::before {
//     content: '';
//     position: absolute;
//     top: 0;
//     left: 0;
//     right: 0;
//     height: 3px;
//     background: ${(props) => {
//       switch (props.status) {
//         case 'unconfirmed':
//           return 'linear-gradient(90deg, #3b82f6, #1e40af)';
//         case 'checked-in':
//           return 'linear-gradient(90deg, #22c55e, #166534)';
//         case 'checked-out':
//           return 'linear-gradient(90deg, #94a3b8, #64748b)';
//         default:
//           return 'linear-gradient(90deg, #f59e0b, #d97706)';
//       }
//     }};
//   }

//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
//     background: linear-gradient(135deg, #ffffff 0%, #f1f5f9 100%);
//   }

//   border-bottom: none;
// `;

// const CabinInfo = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.4rem;
// `;

// const Cabin = styled.div`
//   font-size: 1.6rem;
//   font-weight: 700;
//   color: #1e293b;
//   font-family: 'Sono';
//   display: flex;
//   align-items: center;
//   gap: 0.6rem;

//   &::before {
//     content: '🏠';
//     font-size: 1.4rem;
//   }
// `;

// const Stacked = styled.div`
//   display: flex;
//   flex-direction: column;
//   gap: 0.4rem;
//   padding: 1rem;
//   background: linear-gradient(135deg, #f8fafc, #f1f5f9);
//   border-radius: 0.8rem;
//   border-left: 4px solid ${(props) => props.borderColor || '#e2e8f0'};

//   & span:first-child {
//     font-weight: 600;
//     font-size: 1.4rem;
//     color: #1e293b;
//     display: flex;
//     align-items: center;
//     gap: 0.5rem;
//   }

//   & span:last-child {
//     color: #64748b;
//     font-size: 1.2rem;
//     font-weight: 500;
//   }
// `;

// const GuestInfo = styled(Stacked)`
//   border-left-color: #8b5cf6;

//   & span:first-child::before {
//     content: '👤';
//     font-size: 1.2rem;
//   }
// `;

// const DateInfo = styled(Stacked)`
//   border-left-color: #06b6d4;

//   & span:first-child::before {
//     content: '📅';
//     font-size: 1.2rem;
//   }
// `;

// const StatusContainer = styled.div`
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// const EnhancedTag = styled.div`
//   display: inline-flex;
//   align-items: center;
//   gap: 0.5rem;
//   padding: 0.8rem 1.2rem;
//   border-radius: 2rem;
//   font-size: 1.2rem;
//   font-weight: 600;
//   text-transform: uppercase;
//   letter-spacing: 0.5px;

//   ${(props) => {
//     switch (props.status) {
//       case 'unconfirmed':
//         return `
//           background: linear-gradient(135deg, #dbeafe, #bfdbfe);
//           color: #1e40af;
//           border: 2px solid #3b82f6;

//           &::before {
//             content: '⏳';
//             font-size: 1rem;
//           }
//         `;
//       case 'checked-in':
//         return `
//           background: linear-gradient(135deg, #dcfce7, #bbf7d0);
//           color: #166534;
//           border: 2px solid #22c55e;

//           &::before {
//             content: '✅';
//             font-size: 1rem;
//           }
//         `;
//       case 'checked-out':
//         return `
//           background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
//           color: #475569;
//           border: 2px solid #94a3b8;

//           &::before {
//             content: '🏁';
//             font-size: 1rem;
//           }
//         `;
//       default:
//         return `
//           background: linear-gradient(135deg, #fef3c7, #fde68a);
//           color: #92400e;
//           border: 2px solid #f59e0b;
//         `;
//     }
//   }}
// `;

// const Amount = styled.div`
//   font-family: 'Sono';
//   font-weight: 700;
//   font-size: 1.6rem;
//   color: #059669;
//   background: linear-gradient(135deg, #dcfce7, #bbf7d0);
//   padding: 1rem 1.2rem;
//   border-radius: 0.8rem;
//   border: 1px solid #22c55e;
//   text-align: center;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   gap: 0.4rem;

//   &::before {
//     content: '💰';
//     font-size: 1.2rem;
//   }
// `;

// const ActionMenu = styled.div`
//   position: relative;
//   display: flex;
//   justify-content: center;

//   & > button {
//     background: linear-gradient(135deg, #f8fafc, #e2e8f0);
//     border: 1px solid #cbd5e1;
//     border-radius: 0.8rem;
//     padding: 0.8rem;
//     cursor: pointer;
//     transition: all 0.2s ease;
//     color: #475569;

//     &:hover {
//       background: linear-gradient(135deg, #e2e8f0, #cbd5e1);
//       transform: scale(1.1);
//       color: #1e293b;
//     }
//   }

//   & .menu {
//     position: absolute;
//     top: 100%; /* Changed from 50% to 100% to position below the button */
//     right: 0; /* Changed from 50% to 0 for better positioning */
//     background: #ffffff;
//     border: 1px solid #e2e8f0;
//     border-radius: 1.2rem;
//     box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
//     padding: 0.8rem; /* Increased padding */
//     z-index: 9999; /* Increased z-index to ensure it's above everything */
//     display: flex;
//     flex-direction: column;
//     gap: 0.4rem;
//     min-width: 150px; /* Increased width */
//     margin-top: 0.5rem; /* Space between button and menu */

//     &::before {
//       content: '';
//       position: absolute;
//       top: -5px;
//       right: 1rem;
//       width: 10px;
//       height: 10px;
//       background: #ffffff;
//       border-left: 1px solid #e2e8f0;
//       border-top: 1px solid #e2e8f0;
//       transform: rotate(45deg);
//     }
//   }

//   & .menu-item {
//     background: none;
//     border: none;
//     cursor: pointer;
//     font-size: 1.4rem;
//     color: #475569;
//     border-radius: 0.8rem;
//     transition: all 0.2s ease;
//     font-weight: 500;
//     padding: 0.8rem 1.2rem; /* Added padding directly to menu item */
//     text-align: left;
//     width: 100%;

//     &:hover {
//       background: linear-gradient(135deg, #f1f5f9, #e2e8f0);
//       color: #1e293b;
//     }

//     a {
//       display: flex;
//       align-items: center;
//       gap: 0.8rem;
//       text-decoration: none;
//       color: inherit;
//       width: 100%;

//       &:hover {
//         transform: translateX(2px);
//       }

//       span {
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//       }
//     }
//   }
// `;

// function BookingRow({ booking }) {
//   const { id, startDate, endDate, numOfNight, totalPrice, status, cabins, guests } = booking;

//   const guestName = guests?.fullName ?? 'Unknown guest';
//   const email = guests?.email ?? 'No email';
//   const cabinName = cabins?.name ?? 'No cabin';
//   const safeStatus = status ?? 'unknown';

//   const [showForm, setShowForm] = useState(false);
//   const [showActions, setShowActions] = useState(false);

//   // state for deleting booking
//   const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

//   const { isDeleting, deleteBooking } = useDeleteBooking();
//   //handling confirm booking delete
//   async function handleDeleteConfirm() {
//     await deleteBooking(id);
//     console.log('Deleting booking ID:', id);

//     setShowDeleteConfirm(false);
//   }

//   useEffect(() => {
//     function handleClickOutside(e) {
//       if (!e.target.closest('.action-menu')) {
//         setShowActions(false);
//       }
//     }

//     document.addEventListener('click', handleClickOutside);
//     return () => document.removeEventListener('click', handleClickOutside);
//   }, [deleteBooking, id]);

//   return (
//     <Row role="row" status={safeStatus} hasActiveMenu={showActions}>
//       <CabinInfo>
//         <Cabin>{cabinName}</Cabin>
//       </CabinInfo>

//       <GuestInfo>
//         <span>{guestName}</span>
//         <span>{email}</span>
//       </GuestInfo>

//       <DateInfo>
//         <span>
//           {isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} → {numOfNight ?? 0} nights
//         </span>
//         <span>
//           {startDate ? format(new Date(startDate), 'MMM dd yyyy') : 'Unknown'} —{' '}
//           {endDate ? format(new Date(endDate), 'MMM dd yyyy') : 'Unknown'}
//         </span>
//       </DateInfo>

//       <StatusContainer>
//         <EnhancedTag status={safeStatus}>{safeStatus.replace('-', ' ')}</EnhancedTag>
//       </StatusContainer>

//       <Amount>{formatCurrency(totalPrice ?? 0)}</Amount>

//       <ActionMenu className="action-menu">
//         <button onClick={() => setShowActions((prev) => !prev)}>
//           <HiEllipsisHorizontal size={20} />
//         </button>

//         {showActions && (
//           <div className="menu">
//             <button className="menu-item">
//               <Link to={`/bookings/${id}`}>
//                 <HiEye />
//                 <span>View Details</span>
//               </Link>
//             </button>

//             {safeStatus === 'unconfirmed' && (
//               <button className="menu-item">
//                 <Link to={`/checkin/${id}`}>
//                   <HiCalendarDays />
//                   <span>Check In</span>
//                 </Link>
//               </button>
//             )}
//             <button
//               onClick={() => {
//                 setShowDeleteConfirm(true);
//                 setShowActions(false);
//               }}
//               disabled={isDeleting}
//             >
//               <HiTrash /> Delete
//             </button>
//             {safeStatus === 'checked-in' && (
//               <button className="menu-item">
//                 <CheckoutButton bookingId={id} />
//               </button>
//             )}
//           </div>
//         )}
//         {showDeleteConfirm && (
//           <Modal onClose={() => setShowDeleteConfirm(false)}>
//             <ConfirmDelete
//               resource="Booking"
//               onConfirm={handleDeleteConfirm}
//               closeModal={() => setShowDeleteConfirm(false)}
//               disabled={isDeleting}
//             />
//           </Modal>
//         )}
//       </ActionMenu>
//     </Row>
//   );
// }

// export default BookingRow;

import styled from 'styled-components';
import { format, isToday } from 'date-fns';
import { formatDistanceFromNow } from '../../utils/helpers';
import { formatCurrency } from '../../utils/helpers';
import Tag from '../../ui/Tag';
import { useEffect, useState } from 'react';
import {
  HiEllipsisHorizontal,
  HiEye,
  HiPencil,
  HiCalendarDays,
  HiUser,
  HiCurrencyDollar,
  HiTrash,
} from 'react-icons/hi2';
import { Link } from 'react-router-dom';
import CheckoutButton from '../check-in-out/CheckoutButton';
import { useDeleteBooking } from './useDeleteBooking';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const Row = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 2rem 2.4rem;
  background-color: var(--color-grey-0);
  border-radius: var(--border-radius-lg);
  margin-bottom: 1rem;
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-200);
  transition: all 0.3s ease;
  position: relative;
  overflow: visible;
  z-index: ${(props) => (props.hasActiveMenu ? '1000' : '1')};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${(props) => {
      switch (props.status) {
        case 'unconfirmed':
          return 'linear-gradient(90deg, var(--color-brand-500), var(--color-brand-800))';
        case 'checked-in':
          return 'linear-gradient(90deg, var(--color-green-500), var(--color-green-800))';
        case 'checked-out':
          return 'linear-gradient(90deg, var(--color-grey-400), var(--color-grey-600))';
        default:
          return 'linear-gradient(90deg, var(--color-yellow-500), var(--color-yellow-800))';
      }
    }};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-md);
    background-color: var(--color-grey-50);
  }

  border-bottom: none;
`;

const CabinInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 700;
  color: var(--color-grey-800);
  font-family: 'Sono';
  display: flex;
  align-items: center;
  gap: 0.6rem;

  &::before {
    content: '🏠';
    font-size: 1.4rem;
  }
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  padding: 1rem;
  background-color: var(--color-grey-50);
  border-radius: var(--border-radius-md);
  border-left: 4px solid ${(props) => props.borderColor || 'var(--color-grey-200)'};

  & span:first-child {
    font-weight: 600;
    font-size: 1.4rem;
    color: var(--color-grey-800);
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
    font-weight: 500;
  }
`;

const GuestInfo = styled(Stacked)`
  border-left-color: var(--color-indigo-500);

  & span:first-child::before {
    content: '👤';
    font-size: 1.2rem;
  }
`;

const DateInfo = styled(Stacked)`
  border-left-color: var(--color-blue-500);

  & span:first-child::before {
    content: '📅';
    font-size: 1.2rem;
  }
`;

const StatusContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const EnhancedTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.8rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;

  ${(props) => {
    switch (props.status) {
      case 'unconfirmed':
        return `
          background-color: var(--color-blue-100);
          color: var(--color-blue-700);
          border: 2px solid var(--color-brand-500);
          
          &::before {
            content: '⏳';
            font-size: 1rem;
          }
        `;
      case 'checked-in':
        return `
          background-color: var(--color-green-100);
          color: var(--color-green-700);
          border: 2px solid var(--color-green-500);
          
          &::before {
            content: '✅';
            font-size: 1rem;
          }
        `;
      case 'checked-out':
        return `
          background-color: var(--color-grey-100);
          color: var(--color-grey-700);
          border: 2px solid var(--color-grey-400);
          
          &::before {
            content: '🏁';
            font-size: 1rem;
          }
        `;
      default:
        return `
          background-color: var(--color-yellow-100);
          color: var(--color-yellow-700);
          border: 2px solid var(--color-yellow-500);
        `;
    }
  }}
`;

const Amount = styled.div`
  font-family: 'Sono';
  font-weight: 700;
  font-size: 1.6rem;
  color: var(--color-green-700);
  background-color: var(--color-green-100);
  padding: 1rem 1.2rem;
  border-radius: var(--border-radius-md);
  border: 1px solid var(--color-green-500);
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.4rem;

  &::before {
    content: '💰';
    font-size: 1.2rem;
  }
`;

const ActionMenu = styled.div`
  position: relative;
  display: flex;
  justify-content: center;

  & > button {
    background-color: var(--color-grey-50);
    border: 1px solid var(--color-grey-300);
    border-radius: var(--border-radius-md);
    padding: 0.8rem;
    cursor: pointer;
    transition: all 0.2s ease;
    color: var(--color-grey-600);

    &:hover {
      background-color: var(--color-grey-200);
      transform: scale(1.1);
      color: var(--color-grey-800);
    }
  }

  & .menu {
    position: absolute;
    top: 100%;
    right: 0;
    background-color: var(--color-grey-0);
    border: 1px solid var(--color-grey-200);
    border-radius: var(--border-radius-lg);
    box-shadow: var(--shadow-md);
    padding: 0.8rem;
    z-index: 9999;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
    min-width: 150px;
    margin-top: 0.5rem;

    &::before {
      content: '';
      position: absolute;
      top: -5px;
      right: 1rem;
      width: 10px;
      height: 10px;
      background-color: var(--color-grey-0);
      border-left: 1px solid var(--color-grey-200);
      border-top: 1px solid var(--color-grey-200);
      transform: rotate(45deg);
    }
  }

  & .menu-item {
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    color: var(--color-grey-600);
    border-radius: var(--border-radius-md);
    transition: all 0.2s ease;
    font-weight: 500;
    padding: 0.8rem 1.2rem;
    text-align: left;
    width: 100%;

    &:hover {
      background-color: var(--color-grey-50);
      color: var(--color-grey-800);
    }

    a {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      text-decoration: none;
      color: inherit;
      width: 100%;

      &:hover {
        transform: translateX(2px);
      }

      span {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }
    }
  }
`;

function BookingRow({ booking }) {
  const { id, startDate, endDate, numOfNight, totalPrice, status, cabins, guests } = booking;

  const guestName = guests?.fullName ?? 'Unknown guest';
  const email = guests?.email ?? 'No email';
  const cabinName = cabins?.name ?? 'No cabin';
  const safeStatus = status ?? 'unknown';

  const [showForm, setShowForm] = useState(false);
  const [showActions, setShowActions] = useState(false);

  // state for deleting booking
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { isDeleting, deleteBooking } = useDeleteBooking();
  //handling confirm booking delete
  async function handleDeleteConfirm() {
    await deleteBooking(id);
    console.log('Deleting booking ID:', id);

    setShowDeleteConfirm(false);
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('.action-menu')) {
        setShowActions(false);
      }
    }

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [deleteBooking, id]);

  return (
    <Row role="row" status={safeStatus} hasActiveMenu={showActions}>
      <CabinInfo>
        <Cabin>{cabinName}</Cabin>
      </CabinInfo>

      <GuestInfo>
        <span>{guestName}</span>
        <span>{email}</span>
      </GuestInfo>

      <DateInfo>
        <span>
          {isToday(new Date(startDate)) ? 'Today' : formatDistanceFromNow(startDate)} → {numOfNight ?? 0} nights
        </span>
        <span>
          {startDate ? format(new Date(startDate), 'MMM dd yyyy') : 'Unknown'} —{' '}
          {endDate ? format(new Date(endDate), 'MMM dd yyyy') : 'Unknown'}
        </span>
      </DateInfo>

      <StatusContainer>
        <EnhancedTag status={safeStatus}>{safeStatus.replace('-', ' ')}</EnhancedTag>
      </StatusContainer>

      <Amount>{formatCurrency(totalPrice ?? 0)}</Amount>

      <ActionMenu className="action-menu">
        <button onClick={() => setShowActions((prev) => !prev)}>
          <HiEllipsisHorizontal size={20} />
        </button>

        {showActions && (
          <div className="menu">
            <button className="menu-item">
              <Link to={`/bookings/${id}`}>
                <HiEye />
                <span>View Details</span>
              </Link>
            </button>

            {safeStatus === 'unconfirmed' && (
              <button className="menu-item">
                <Link to={`/checkin/${id}`}>
                  <HiCalendarDays />
                  <span>Check In</span>
                </Link>
              </button>
            )}
            <button
              onClick={() => {
                setShowDeleteConfirm(true);
                setShowActions(false);
              }}
              disabled={isDeleting}
            >
              <HiTrash /> Delete
            </button>
            {safeStatus === 'checked-in' && (
              <button className="menu-item">
                <CheckoutButton bookingId={id} />
              </button>
            )}
          </div>
        )}
        {showDeleteConfirm && (
          <Modal onClose={() => setShowDeleteConfirm(false)}>
            <ConfirmDelete
              resource="Booking"
              onConfirm={handleDeleteConfirm}
              closeModal={() => setShowDeleteConfirm(false)}
              disabled={isDeleting}
            />
          </Modal>
        )}
      </ActionMenu>
    </Row>
  );
}

export default BookingRow;
