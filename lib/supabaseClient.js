import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qrgcpnagxqvmeqwbjuzb.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFyZ2NwbmFneHF2bWVxd2JqdXpiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzYzNTA5NzEsImV4cCI6MjA1MTkyNjk3MX0.q6bd0lp9HJevKzfcPp8jdFN53l6_8ewhj088l6R8xpM";

export const supabase = createClient(supabaseUrl, supabaseKey);
