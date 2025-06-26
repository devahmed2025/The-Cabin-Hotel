

import styled from 'styled-components';
import { useState, useEffect } from 'react';

import CreateCabinForm from './CreateCabinForm';
import { useDeleteCabin } from './useDeleteCabin';
import { formatCurrency } from '../../utils/helpers';
import { HiPencil, HiSquare2Stack, HiTrash, HiEllipsisVertical } from 'react-icons/hi2';
import { useCreateCabin } from './useCreateCabin';
import Modal from '../../ui/Modal';
import ConfirmDelete from '../../ui/ConfirmDelete';

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 0.6fr 1.8fr 2.2fr 1fr 1fr 1fr;
  column-gap: 2.4rem;
  align-items: center;
  padding: 1.4rem 2.4rem;

  &:not(:last-child) {
    border-bottom: 1px solid var(--color-grey-100);
  }
`;

const Img = styled.img`
  display: block;
  width: 6.4rem;
  aspect-ratio: 3 / 2;
  object-fit: cover;
  object-position: center;
  transform: scale(1.5) translateX(-7px);
`;

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: 'Sono';
`;

const Price = styled.div`
  font-family: 'Sono';
  font-weight: 600;
`;

const Discount = styled.div`
  font-family: 'Sono';
  font-weight: 500;
  color: var(--color-green-700);
`;

const ActionMenu = styled.div`
  position: relative;

  & .menu {
    position: absolute;
    top: 100%;
    right: 0;
    background: var(--color-grey-0);
    border: 1px solid var(--color-grey-100);
    border-radius: 6px;
    box-shadow: var(--shadow-sm);
    padding: 0.4rem;
    z-index: 10;
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }

  & button {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 0.6rem 1rem;
    background: none;
    border: none;
    cursor: pointer;
    font-size: 1.4rem;
    color: var(--color-grey-700);

    &:hover {
      background-color: var(--color-grey-100);
    }
  }
`;

function CabinRow({ cabin }) {
  const [showForm, setShowForm] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const { isDeleting, deleteCabin } = useDeleteCabin();
  const { isCreating, createCabin } = useCreateCabin();

  const { id: cabinId, name, maxCapacity, regularPrice, discount, image, description } = cabin;

  function handleDuplicate() {
    createCabin({
      name: `Copy of ${name}`,
      maxCapacity,
      regularPrice,
      discount,
      image,
      description,
    });
    setShowActions(false);
  }

  function handleDeleteConfirm() {
    deleteCabin(cabinId);
    setShowDeleteConfirm(false);
  }

  // Close the dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(e) {
      if (!e.target.closest('.action-menu')) {
        setShowActions(false);
      }
    }
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  return (
    <>
      <TableRow role="row">
        <Img src={image} />
        <Cabin>{name}</Cabin>
        <div>Fits up to {maxCapacity} guests</div>
        <Price>{formatCurrency(regularPrice)}</Price>
        {discount ? <Discount>{formatCurrency(discount)}</Discount> : <span>&mdash;</span>}

        <ActionMenu className="action-menu">
          <button onClick={() => setShowActions((prev) => !prev)}>
            <HiEllipsisVertical size={20} />
          </button>

          {showActions && (
            <div className="menu">
              <button disabled={isCreating} onClick={handleDuplicate}>
                <HiSquare2Stack /> Duplicate
              </button>
              <button
                onClick={() => {
                  setShowForm(true);
                  setShowActions(false);
                }}
              >
                <HiPencil /> Edit
              </button>
              <button
                onClick={() => {
                  setShowDeleteConfirm(true);
                  setShowActions(false);
                }}
                disabled={isDeleting}
              >
                <HiTrash /> Delete
              </button>
            </div>
          )}
        </ActionMenu>
      </TableRow>

      {/* Edit Modal */}
      {showForm && (
        <Modal onClose={() => setShowForm(false)}>
          <CreateCabinForm cabinToEdit={cabin} />
        </Modal>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <Modal onClose={() => setShowDeleteConfirm(false)}>
          <ConfirmDelete
            resource="cabin"
            onConfirm={handleDeleteConfirm}
            closeModal={() => setShowDeleteConfirm(false)}
            disabled={isDeleting}
          />
        </Modal>
      )}
    </>
  );
}

export default CabinRow;
