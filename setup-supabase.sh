#!/bin/bash

# Install Supabase CLI if not installed
if ! command -v supabase &> /dev/null
then
    npm install -g supabase
fi

# Initialize Supabase project
supabase init

# Start Supabase services locally
supabase start

# Create tables
supabase db execute "
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
"

# Create admin user
supabase auth user create --email admin@example.com --password your-strong-password

echo "Supabase setup completed!"
echo "Admin credentials:"
echo "Email: admin@example.com"
echo "Password: your-strong-password"
echo ""
echo "Please change these credentials immediately after first login!"