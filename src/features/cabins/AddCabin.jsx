// import { useState } from 'react';
// import Button from '../../ui/Button';
// import Modal from '../../ui/Modal';
// import CreateCabinForm from './CreateCabinForm';

// function AddCabin() {
//   const [isOpenModal, setisOpenModal] = useState(false);
//   return (
//     // <Modal>
//     //   <Modal.Toggle opens="new-cabin">
//     <>
//       <Button onClick={() => setisOpenModal((show) => !show)}>Add new cabin</Button>
//       {isOpenModal && (
//         <Modal setisOpenModal={setisOpenModal}>
//           <CreateCabinForm setisOpenModal={setisOpenModal} />
//         </Modal>
//       )}
//     </>

//     // </Modal.Toggle>
//     //   <Modal.Window name="new-cabin">
//     //     <CreateCabinForm />
//     //   </Modal.Window>
//     // </Modal>
//   );
// }

// export default AddCabin;
import { useState } from 'react';
import Button from '../../ui/Button';
import Modal from '../../ui/Modal';
import CreateCabinForm from './CreateCabinForm';

function AddCabin() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Add new cabin</Button>
      {isOpen && (
        <Modal onClose={() => setIsOpen(false)}>
          <CreateCabinForm />
        </Modal>
      )}
    </>
  );
}

export default AddCabin;
