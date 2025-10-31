# Supabase Setup Instructions

1. Go to [Supabase](https://supabase.com) and create a new project

2. Once your project is created, go to the SQL editor and execute the following SQL:

```sql
-- Enable RLS
alter table auth.users enable row level security;

-- Create tables
create table public.projects (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text not null,
    type text not null check (type in ('technical', 'creative')),
    tech_stack text[],
    links jsonb,
    certificate_url text,
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    user_id uuid references auth.users(id)
);

create table public.achievements (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text not null,
    type text not null check (type in ('technical', 'creative')),
    date timestamptz not null,
    certificate_url text,
    links text[],
    user_id uuid references auth.users(id)
);

create table public.blog_posts (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    content text not null,
    type text not null check (type in ('technical', 'creative')),
    tags text[],
    created_at timestamptz default now(),
    updated_at timestamptz default now(),
    user_id uuid references auth.users(id)
);

create table public.creative_highlights (
    id uuid default uuid_generate_v4() primary key,
    title text not null,
    description text not null,
    media_type text not null check (media_type in ('video', 'image', 'audio')),
    media_url text not null,
    date timestamptz not null,
    links text[],
    user_id uuid references auth.users(id)
);

-- Enable RLS on all tables
alter table public.projects enable row level security;
alter table public.achievements enable row level security;
alter table public.blog_posts enable row level security;
alter table public.creative_highlights enable row level security;

-- Create policies
create policy "Public read access"
    on public.projects for select
    using (true);

create policy "Public read access"
    on public.achievements for select
    using (true);

create policy "Public read access"
    on public.blog_posts for select
    using (true);

create policy "Public read access"
    on public.creative_highlights for select
    using (true);

-- Admin policies (authenticated users can modify)
create policy "Admin full access"
    on public.projects for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "Admin full access"
    on public.achievements for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "Admin full access"
    on public.blog_posts for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');

create policy "Admin full access"
    on public.creative_highlights for all
    using (auth.role() = 'authenticated')
    with check (auth.role() = 'authenticated');
```

3. Go to Authentication > Users and invite yourself as an admin user

4. Copy your project's URL and anon key from the project settings

5. Create a `.env.local` file with the following content:
```bash
NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

6. Deploy to Vercel and add these environment variables in your project settings

That's it! Your backend is now fully configured and ready to use.