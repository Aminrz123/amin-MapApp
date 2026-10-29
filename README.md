# Min Kort App

En mobilapp lavet med Expo. Man logger ind, sætter markers på et kort og kan se og slette dem igen. Alle markers gemmes i Supabase.

## Sådan starter du appen

1. Installér pakkerne:
   ```
   npm install
   ```
2. Kopiér `.env.example` til `.env.local` og indsæt din Supabase-URL og nøgle.
3. Kør `supabase.sql` i Supabase under SQL Editor.
4. Start appen:
   ```
   npx expo start
   ```
5. Scan QR-koden med Expo Go på telefonen.

## Skærme

- **Login**: log ind eller opret en bruger
- **Forside**: knapper til kortet, listen og log ud
- **Kort**: langt tryk sætter en ny marker
- **Markers**: liste over alle markers
- **Detaljer**: viser én marker og kan slette den
