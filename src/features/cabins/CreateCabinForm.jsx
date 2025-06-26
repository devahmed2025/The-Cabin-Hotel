// // import { useForm } from 'react-hook-form';

// // import Input from '../../ui/Input';
// // import Form from '../../ui/Form';

// // import Button from '../../ui/Button';
// // import FileInput from '../../ui/FileInput';
// // import Textarea from '../../ui/Textarea';
// // import FormRow from '../../ui/FormRow';

// // import { useCreateCabin } from './useCreateCabin';
// // import { useEditCabin } from './useEditCabin';

// // function CreateCabinForm({ cabinToEdit = {} }) {
// //   const { isCreating, createCabin } = useCreateCabin();
// //   const { isEditing, editCabin } = useEditCabin();
// //   const isWorking = isCreating || isEditing;

// //   const { id: editId, ...editValues } = cabinToEdit;
// //   const isEditSession = Boolean(editId);

// //   const { register, handleSubmit, reset, getValues, formState } = useForm({
// //     defaultValues: isEditSession ? editValues : {},
// //   });
// //   const { errors } = formState;

// //   function onSubmit(data) {
// //     const image = typeof data.image === 'string' ? data.image : data.image[0];

// //     if (isEditSession)
// //       editCabin(
// //         { newCabinData: { ...data, image }, id: editId },
// //         {
// //           onSuccess: (data) => {
// //             reset();
// //           },
// //         },
// //       );
// //     else console.log(data, 'data coming from form');
// //     createCabin(
// //       { ...data, image: image },
// //       {
// //         onSuccess: (data) => {
// //           reset();
// //         },
// //       },
// //     );
// //   }

// //   function onError(errors) {
// //     // console.log(errors);
// //   }

// //   return (
// //     <Form onSubmit={handleSubmit(onSubmit, onError)}>
// //       <FormRow label="Cabin name" error={errors?.name?.message}>
// //         <Input
// //           type="text"
// //           id="name"
// //           disabled={isWorking}
// //           {...register('name', {
// //             required: 'This field is required',
// //           })}
// //         />
// //       </FormRow>

// //       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
// //         <Input
// //           type="number"
// //           id="maxCapacity"
// //           disabled={isWorking}
// //           {...register('maxCapacity', {
// //             required: 'This field is required',
// //             min: {
// //               value: 1,
// //               message: 'Capacity should be at least 1',
// //             },
// //           })}
// //         />
// //       </FormRow>

// //       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
// //         <Input
// //           type="number"
// //           id="regularPrice"
// //           disabled={isWorking}
// //           {...register('regularPrice', {
// //             required: 'This field is required',
// //             min: {
// //               value: 1,
// //               message: 'Capacity should be at least 1',
// //             },
// //           })}
// //         />
// //       </FormRow>

// //       <FormRow label="Discount" error={errors?.discount?.message}>
// //         <Input
// //           type="number"
// //           id="discount"
// //           disabled={isWorking}
// //           defaultValue={0}
// //           {...register('discount', {
// //             required: 'This field is required',
// //             validate: (value) => value <= getValues().regularPrice || 'Discount should be less than regular price',
// //           })}
// //         />
// //       </FormRow>

// //       <FormRow label="Description for website" error={errors?.description?.message}>
// //         <Textarea
// //           type="number"
// //           id="description"
// //           defaultValue=""
// //           disabled={isWorking}
// //           {...register('description', {
// //             required: 'This field is required',
// //           })}
// //         />
// //       </FormRow>

// //       <FormRow label="Cabin photo">
// //         <FileInput
// //           id="image"
// //           accept="image/*"
// //           {...register('image', {
// //             // required: isEditSession ? false : 'This field is required',
// //             required: false,
// //           })}
// //         />
// //       </FormRow>

// //       <FormRow>
// //         {/* type is an HTML attribute! */}
// //         <Button variation="secondary" type="reset">
// //           Cancel
// //         </Button>
// //         <Button disabled={isWorking}>{isEditSession ? 'Edit cabin' : 'Create new cabin'}</Button>
// //       </FormRow>
// //     </Form>
// //   );
// // }

// // export default CreateCabinForm;

// import { useForm } from 'react-hook-form';

// import Input from '../../ui/Input';
// import Form from '../../ui/Form';
// import Button from '../../ui/Button';
// import FileInput from '../../ui/FileInput';
// import Textarea from '../../ui/Textarea';
// import FormRow from '../../ui/FormRow';

// import { useCreateCabin } from './useCreateCabin';
// import { useEditCabin } from './useEditCabin';

// import supabase, { supabaseUrl } from '../../services/supabase';

// function CreateCabinForm({ cabinToEdit = {}, setisOpenModal }) {
//   const { isCreating, createCabin } = useCreateCabin();
//   const { isEditing, editCabin } = useEditCabin();

//   const isWorking = isCreating || isEditing;
//   const { id: editId, ...editValues } = cabinToEdit;
//   const isEditSession = Boolean(editId);

//   const { register, handleSubmit, reset, getValues, formState } = useForm({
//     defaultValues: isEditSession ? editValues : {},
//   });

//   const { errors } = formState;

//   async function onSubmit(data) {
//     const imageFile = data.image?.[0];

//     let imagePath = data.image;

//     if (imageFile) {
//       const imageName = `${Math.random()}-${imageFile.name}`.replaceAll('/', '');
//       const { error: uploadError } = await supabase.storage.from('cabin-images').upload(imageName, imageFile);

//       if (uploadError) {
//         console.error('Image upload failed:', uploadError.message);
//         return;
//       }
//       setisOpenModal(false);
//       imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
//     }

//     const cabinData = { ...data, image: imagePath };

//     if (isEditSession) {
//       editCabin(
//         { newCabinData: cabinData, id: editId },
//         {
//           onSuccess: () => reset(),
//         },
//       );
//     } else {
//       createCabin(cabinData, {
//         onSuccess: () => reset(),
//       });
//     }
//   }

//   return (
//     <Form onSubmit={handleSubmit(onSubmit)}>
//       <FormRow label="Cabin name" error={errors?.name?.message}>
//         <Input type="text" disabled={isWorking} {...register('name', { required: 'This field is required' })} />
//       </FormRow>

//       <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
//         <Input
//           type="number"
//           disabled={isWorking}
//           {...register('maxCapacity', {
//             required: 'This field is required',
//             min: { value: 1, message: 'Min is 1' },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Regular price" error={errors?.regularPrice?.message}>
//         <Input
//           type="number"
//           disabled={isWorking}
//           {...register('regularPrice', {
//             required: 'This field is required',
//             min: { value: 1, message: 'Min is 1' },
//           })}
//         />
//       </FormRow>

//       <FormRow label="Discount" error={errors?.discount?.message}>
//         <Input
//           type="number"
//           defaultValue={0}
//           disabled={isWorking}
//           {...register('discount', {
//             required: 'This field is required',
//             validate: (value) => value <= getValues().regularPrice || 'Must be less than price',
//           })}
//         />
//       </FormRow>

//       <FormRow label="Description" error={errors?.description?.message}>
//         <Textarea disabled={isWorking} {...register('description', { required: 'This field is required' })} />
//       </FormRow>

//       <FormRow label="Cabin photo">
//         <FileInput accept="image/*" disabled={isWorking} {...register('image')} />
//       </FormRow>

//       <FormRow>
//         <Button type="button" variation="secondary" onClick={closeModal}>
//           Cancel
//         </Button>
//         <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create Cabin'}</Button>
//       </FormRow>
//     </Form>
//   );
// }

// export default CreateCabinForm;

import { useForm } from 'react-hook-form';
import Input from '../../ui/Input';
import Form from '../../ui/Form';
import Button from '../../ui/Button';
import FileInput from '../../ui/FileInput';
import Textarea from '../../ui/Textarea';
import FormRow from '../../ui/FormRow';
import { useCreateCabin } from './useCreateCabin';
import { useEditCabin } from './useEditCabin';
import supabase, { supabaseUrl } from '../../services/supabase';

function CreateCabinForm({ cabinToEdit = {} }) {
  const { isCreating, createCabin } = useCreateCabin();
  const { isEditing, editCabin } = useEditCabin();

  const isWorking = isCreating || isEditing;
  const { id: editId, ...editValues } = cabinToEdit;
  const isEditSession = Boolean(editId);

  const { register, handleSubmit, reset, getValues, formState } = useForm({
    defaultValues: isEditSession ? editValues : {},
  });

  const { errors } = formState;

  function closeModal() {
    window.dispatchEvent(new CustomEvent('modal:close', { detail: { type: 'close-modal' } }));
  }

  async function onSubmit(data) {
    const imageFile = data.image?.[0];
    let imagePath = data.image;

    if (imageFile) {
      const imageName = `${Math.random()}-${imageFile.name}`.replaceAll('/', '');
      const { error: uploadError } = await supabase.storage.from('cabin-images').upload(imageName, imageFile);

      if (uploadError) {
        console.error('Image upload failed:', uploadError.message);
        return;
      }

      imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;
    }

    const cabinData = { ...data, image: imagePath };

    if (isEditSession) {
      editCabin(
        { newCabinData: cabinData, id: editId },
        {
          onSuccess: () => {
            reset();
            closeModal();
          },
        },
      );
    } else {
      createCabin(cabinData, {
        onSuccess: () => {
          reset();
          closeModal();
        },
      });
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
        <Input type="text" disabled={isWorking} {...register('name', { required: 'This field is required' })} />
      </FormRow>

      <FormRow label="Maximum capacity" error={errors?.maxCapacity?.message}>
        <Input
          type="number"
          disabled={isWorking}
          {...register('maxCapacity', {
            required: 'This field is required',
            min: { value: 1, message: 'Min is 1' },
          })}
        />
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          disabled={isWorking}
          {...register('regularPrice', {
            required: 'This field is required',
            min: { value: 1, message: 'Min is 1' },
          })}
        />
      </FormRow>

      <FormRow label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          defaultValue={0}
          disabled={isWorking}
          {...register('discount', {
            required: 'This field is required',
            validate: (value) => value <= getValues().regularPrice || 'Must be less than price',
          })}
        />
      </FormRow>

      <FormRow label="Description" error={errors?.description?.message}>
        <Textarea disabled={isWorking} {...register('description', { required: 'This field is required' })} />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput accept="image/*" disabled={isWorking} {...register('image')} />
      </FormRow>

      <FormRow>
        <Button type="button" variation="secondary" onClick={closeModal}>
          Cancel
        </Button>
        <Button disabled={isWorking}>{isEditSession ? 'Edit Cabin' : 'Create Cabin'}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
