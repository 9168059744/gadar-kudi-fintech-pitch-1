import * as Supabase from '@supabase/supabase-js';

const supabaseUrl = 'https://wknvvwplpyancyscvdus.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrbnZ2d3BscHlhbmN5c2N2ZHVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODM1NTAwMzQsImV4cCI6MjA5OTEyNjAzNH0.YkfgNMitSnDeRWQ_NtmfX4omPlu2ECyQdQfdcYwd5-g';

export const supabase = Supabase.createClient(supabaseUrl, supabaseAnonKey);
