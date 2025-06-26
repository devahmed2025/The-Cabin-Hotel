// // first strip of subapase

// import { createClient } from '@supabase/supabase-js';

// export const supabaseUrl = 'https://ajnszqhdwjtzomyvhomw.supabase.co';
// const supabaseKey =
//   'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFqbnN6cWhkd2p0em9teXZob213Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1NDgwNjQsImV4cCI6MjA2NjEyNDA2NH0.1_muBWHsLhEfUdBu6EWxNuEeztiWV29giv8bfqkxgKc';
// const supabase = createClient(supabaseUrl, supabaseKey);

// export default supabase;

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export { supabaseUrl }; // ✅ add this line if you need it
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
