// 2- importing the client subapase and fetvhingd data from supabase
import toast from 'react-hot-toast';
import supabase, { supabaseUrl } from './supabase';
// get post add put deltete logic lives here in api
export async function getCabins() {
  const { data, error } = await supabase.from('cabins').select('*');

  if (error) {
    console.error(error);
    throw new Error('Cabins could not be loaded');
  }

  return data;
}

export async function createEditCabin(newCabin, id) {
  const hasImagePath = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll('/', '');
  const imagePath = hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

  // 1. Create/edit cabin
  let query = supabase.from('cabins');

  // A) CREATE
  if (!id) query = query.insert([{ ...newCabin, image: imagePath }]);

  // B) EDIT
  if (id) query = query.update({ ...newCabin, image: imagePath }).eq('id', id);

  const { data, error } = await query.select().single();

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be created');
  }

  // 2. Upload image
  if (hasImagePath) return data;

  const { error: storageError } = await supabase.storage.from('cabin-images').upload(imageName, newCabin.image);

  // 3. Delete the cabin IF there was an error uplaoding image
  if (storageError) {
    await supabase.from('cabins').delete().eq('id', data.id);
    console.error(storageError);
    throw new Error('Cabin image could not be uploaded and the cabin was not created');
  }

  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from('cabins').delete().eq('id', id);

  if (error) {
    console.error(error);
    throw new Error('Cabin could not be deleted');
  }

  return data;
}
export async function creatCabin(newCabin) {
  let imagePath = null;

  const imageInput = newCabin.image;

  // 1. If image is a File object (from file input)
  if (imageInput instanceof File) {
    const imageName = `${Math.random()}-${imageInput.name}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: uploadError } = await supabase.storage.from('cabin-images').upload(imageName, imageInput);

    if (uploadError) {
      console.error('Image upload failed:', uploadError.message);
      throw new Error('Cabin image upload failed');
    }
  }

  // 2. If image is a URL string (cloning existing cabin)
  else if (typeof imageInput === 'string') {
    const response = await fetch(imageInput);
    const blob = await response.blob();
    const fileExt = imageInput.split('.').pop().split('?')[0];
    const imageName = `${Math.random()}.${fileExt}`.replaceAll('/', '');
    imagePath = `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`;

    const { error: uploadError } = await supabase.storage.from('cabin-images').upload(imageName, blob);

    if (uploadError) {
      console.error('Image re-upload failed:', uploadError.message);
      throw new Error('Cabin image could not be duplicated');
    }
  }

  // 3. Insert cabin with new image path
  const { data, error } = await supabase
    .from('cabins')
    .insert([{ ...newCabin, image: imagePath }])
    .select()
    .single();

  if (error) {
    console.error(error);

    if (error.code === '23505') {
      throw new Error('A cabin with this name already exists.');
    }

    throw new Error('Cabin could not be added');
  }

  return data;
}
