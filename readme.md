# notes

a minimalist notes app

## features

- create, edit, delete notes
- real-time auto-save
- user auth (email + password)
- sidebar with previews
- minimalist light ui

## tech stack

- next.js (app router, server components)
- supabase (auth + database)
- tailwind css
- shadcn/ui
- typescript

## setup

1. **clone the repo**

```bash
git clone https://github.com/bogdea/notes.git
cd notes
```

2. **install dependencies**

```bash
npm install
```

3. **env setup**

- create a file called `.env.local` in the root directory
- add:

```ini
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

4. **run dev server**

```bash
npm run dev
```

## license

[MIT License](https://opensource.org/licenses/MIT) © 2025 Madalin Bogdea
