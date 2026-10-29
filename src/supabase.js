import 'expo-sqlite/localStorage/install'
import { createClient } from '@supabase/supabase-js'
import { AppState } from 'react-native'

// Værdierne ligger i .env.local (se .env.example)
const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage, // gem sessionen på telefonen
    autoRefreshToken: true, // forny token automatisk
    persistSession: true, // forbliv logget ind efter genstart
    detectSessionInUrl: false, // ingen URL på mobil
  },
})

// Forny kun token, mens appen er åben
AppState.addEventListener('change', (state) => {
  if (state === 'active') {
    supabase.auth.startAutoRefresh()
  } else {
    supabase.auth.stopAutoRefresh()
  }
})
