import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://naepymixqonguigtgywy.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_GQ_-1kwmbqosZdp6yi60MA_ixUbIADq'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
