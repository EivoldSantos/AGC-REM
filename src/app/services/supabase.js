import "react-native-url-polyfill";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://zkstmejvilutqvnbintn.supabase.co"
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inprc3RtZWp2aWx1dHF2bmJpbnRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzAxNTE1NjgsImV4cCI6MjA0NTcyNzU2OH0.kH4rM-Ts3R8yuXwcKYvIFQk281u-2GCBnd9Lv6iStkA"
        
export const supabase = createClient(supabaseUrl, supabaseKey);