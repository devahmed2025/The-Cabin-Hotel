import supabase from './supabase';

export async function getSettings() {
  const { data, error } = await supabase.from('settings').select('*').single();

  if (error) {
    console.error(error);
    throw new Error('Settings could not be loaded');
  }
  return data;
}

// We expect a newSetting object that looks like {setting: newValue}
  
export async function updateSetting(newSetting) {
  const { data, error } = await supabase.from('settings').update(newSetting).eq('id', 1).select().single(); // required to ensure we get back the row as object

  if (error) {
    console.error(error);
    throw new Error('Settings could not be updated');
  }

  return data;
}
