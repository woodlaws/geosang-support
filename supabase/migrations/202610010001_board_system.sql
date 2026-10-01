begin;

create extension if not exists pgcrypto;

create type public.user_role as enum ('customer', 'admin');
create type public.post_kind as enum ('news', 'resource');
create type public.publish_status as enum ('draft', 'published');
create type public.download_access as enum ('public', 'lead');
create type public.consultation_status as enum ('received', 'reviewing', 'consulted', 'quoted', 'contracted', 'closed');
create type public.project_stage as enum ('collecting', 'strategy', 'production', 'review', 'revision', 'completed');
create type public.revision_status as enum ('requested', 'reviewing', 'resolved');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role public.user_role not null default 'customer',
  display_name text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.posts (
  id uuid primary key default gen_random_uuid(),
  kind public.post_kind not null,
  slug text not null,
  title text not null check (char_length(title) between 2 and 180),
  excerpt text not null default '' check (char_length(excerpt) <= 500),
  body text not null default '' check (char_length(body) <= 50000),
  category text not null,
  status public.publish_status not null default 'draft',
  is_pinned boolean not null default false,
  organization text,
  target_audience text,
  application_start date,
  application_end date,
  official_url text,
  verified_at date,
  download_access public.download_access,
  privacy_purpose text,
  privacy_items text,
  privacy_retention text,
  published_at timestamptz,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(kind, slug)
);

create table public.post_attachments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete cascade,
  bucket_id text not null check (bucket_id in ('public-resources','private-resources')),
  object_path text not null,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes between 1 and 20971520),
  created_at timestamptz not null default now()
);

create table public.download_requests (
  id uuid primary key default gen_random_uuid(),
  post_id uuid not null references public.posts(id) on delete restrict,
  name text not null check (char_length(name) between 2 and 50),
  phone text not null check (char_length(phone) between 8 and 30),
  company text check (char_length(company) <= 100),
  privacy_consent boolean not null check (privacy_consent),
  marketing_consent boolean not null default false,
  requested_at timestamptz not null default now()
);

create sequence public.consultation_number_seq;
create table public.consultation_requests (
  id uuid primary key default gen_random_uuid(),
  receipt_number text not null unique default ('GSC-' || to_char(current_timestamp at time zone 'Asia/Seoul','YYYYMMDD') || '-' || lpad(nextval('public.consultation_number_seq')::text, 5, '0')),
  name text not null check (char_length(name) between 2 and 50),
  phone text not null check (char_length(phone) between 8 and 30),
  email text check (char_length(email) <= 120),
  company text check (char_length(company) <= 100),
  industry text not null check (char_length(industry) <= 100),
  program_name text not null check (char_length(program_name) <= 180),
  progress_status text not null check (progress_status in ('신청 준비 중','신청 완료','선정 완료')),
  services text[] not null default '{}',
  message text not null check (char_length(message) between 5 and 3000),
  desired_period text check (char_length(desired_period) <= 100),
  estimated_budget text check (char_length(estimated_budget) <= 100),
  privacy_consent boolean not null check (privacy_consent),
  marketing_consent boolean not null default false,
  status public.consultation_status not null default 'received',
  assignee_id uuid references public.profiles(id),
  source_payload jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.consultation_history (
  id uuid primary key default gen_random_uuid(),
  consultation_id uuid not null references public.consultation_requests(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  kind text not null check (kind in ('status','internal_note','customer_reply')),
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now()
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 180),
  service_scope text not null default '',
  stage public.project_stage not null default 'collecting',
  schedule_start date,
  schedule_end date,
  requests text not null default '',
  manager_id uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_members (
  project_id uuid not null references public.projects(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key(project_id, user_id)
);

create table public.project_comments (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  author_id uuid not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 5000),
  created_at timestamptz not null default now()
);

create table public.revision_requests (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  requested_by uuid not null references public.profiles(id),
  body text not null check (char_length(body) between 1 and 5000),
  status public.revision_status not null default 'requested',
  admin_reply text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.project_files (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references public.projects(id) on delete cascade,
  uploaded_by uuid not null references public.profiles(id),
  object_path text not null unique,
  file_name text not null,
  mime_type text not null,
  size_bytes bigint not null check (size_bytes between 1 and 20971520),
  file_kind text not null check (file_kind in ('submission','deliverable','report')),
  created_at timestamptz not null default now()
);

create table public.submission_rate_limits (
  key_hash text not null,
  action text not null,
  window_started_at timestamptz not null,
  request_count integer not null default 1,
  primary key(key_hash, action, window_started_at)
);

create index posts_public_list_idx on public.posts(kind, status, is_pinned desc, published_at desc);
create index consultation_status_idx on public.consultation_requests(status, created_at desc);
create index project_members_user_idx on public.project_members(user_id, project_id);

create schema if not exists private;
revoke all on schema private from public;
grant usage on schema private to anon, authenticated;

create or replace function private.is_admin()
returns boolean language sql stable security definer set search_path = '' as $$
  select exists(select 1 from public.profiles p where p.id = (select auth.uid()) and p.role = 'admin');
$$;

create or replace function private.is_project_member(target_project uuid)
returns boolean language sql stable security definer set search_path = '' as $$
  select private.is_admin() or exists(select 1 from public.project_members pm where pm.project_id = target_project and pm.user_id = (select auth.uid()));
$$;
revoke all on function private.is_admin() from public;
revoke all on function private.is_project_member(uuid) from public;
grant execute on function private.is_admin() to anon, authenticated;
grant execute on function private.is_project_member(uuid) to authenticated;

do $$ declare t text; begin
  foreach t in array array['profiles','posts','post_attachments','download_requests','consultation_requests','consultation_history','projects','project_members','project_comments','revision_requests','project_files','submission_rate_limits'] loop
    execute format('alter table public.%I enable row level security', t);
    execute format('revoke all on table public.%I from anon, authenticated', t);
  end loop;
end $$;

grant select on public.posts, public.post_attachments to anon, authenticated;
grant select, insert, update, delete on all tables in schema public to authenticated;
grant usage on sequence public.consultation_number_seq to authenticated;

create policy posts_public_select on public.posts for select to anon, authenticated using (status = 'published' or private.is_admin());
create policy posts_admin_insert on public.posts for insert to authenticated with check (private.is_admin());
create policy posts_admin_update on public.posts for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy posts_admin_delete on public.posts for delete to authenticated using (private.is_admin());

create policy attachments_public_select on public.post_attachments for select to anon, authenticated using (
  exists(select 1 from public.posts p where p.id = post_id and p.status = 'published' and bucket_id = 'public-resources') or private.is_admin()
);
create policy attachments_admin_all on public.post_attachments for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy profiles_self_or_admin_select on public.profiles for select to authenticated using (id = (select auth.uid()) or private.is_admin());
create policy profiles_admin_update on public.profiles for update to authenticated using (private.is_admin()) with check (private.is_admin());

create policy downloads_admin_only on public.download_requests for select to authenticated using (private.is_admin());
create policy consultations_admin_only on public.consultation_requests for select to authenticated using (private.is_admin());
create policy consultations_admin_update on public.consultation_requests for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy consultation_history_admin_all on public.consultation_history for all to authenticated using (private.is_admin()) with check (private.is_admin());

create policy projects_member_select on public.projects for select to authenticated using (private.is_project_member(id));
create policy projects_admin_write on public.projects for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy members_self_select on public.project_members for select to authenticated using (user_id = (select auth.uid()) or private.is_admin());
create policy members_admin_write on public.project_members for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy comments_member_select on public.project_comments for select to authenticated using (private.is_project_member(project_id));
create policy comments_member_insert on public.project_comments for insert to authenticated with check (author_id = (select auth.uid()) and private.is_project_member(project_id));
create policy comments_admin_update on public.project_comments for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy revisions_member_select on public.revision_requests for select to authenticated using (private.is_project_member(project_id));
create policy revisions_member_insert on public.revision_requests for insert to authenticated with check (requested_by = (select auth.uid()) and private.is_project_member(project_id));
create policy revisions_admin_update on public.revision_requests for update to authenticated using (private.is_admin()) with check (private.is_admin());
create policy files_member_select on public.project_files for select to authenticated using (private.is_project_member(project_id));
create policy files_member_insert on public.project_files for insert to authenticated with check (uploaded_by = (select auth.uid()) and private.is_project_member(project_id));
create policy files_admin_delete on public.project_files for delete to authenticated using (private.is_admin());

insert into storage.buckets(id, name, public, file_size_limit, allowed_mime_types) values
('public-resources','public-resources',true,20971520,array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','image/jpeg','image/png']),
('private-resources','private-resources',false,20971520,array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','image/jpeg','image/png']),
('project-files','project-files',false,20971520,array['application/pdf','application/vnd.openxmlformats-officedocument.wordprocessingml.document','application/vnd.openxmlformats-officedocument.spreadsheetml.sheet','application/zip','image/jpeg','image/png'])
on conflict(id) do update set public=excluded.public, file_size_limit=excluded.file_size_limit, allowed_mime_types=excluded.allowed_mime_types;

create policy storage_admin_manage on storage.objects for all to authenticated using (private.is_admin()) with check (private.is_admin());
create policy project_storage_select on storage.objects for select to authenticated using (
  bucket_id = 'project-files' and private.is_project_member(((storage.foldername(name))[1])::uuid)
);
create policy project_storage_insert on storage.objects for insert to authenticated with check (
  bucket_id = 'project-files' and private.is_project_member(((storage.foldername(name))[1])::uuid)
);
create policy public_resource_upload_admin on storage.objects for insert to authenticated with check (bucket_id in ('public-resources','private-resources') and private.is_admin());

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = '' as $$
begin
  insert into public.profiles(id, display_name) values(new.id, coalesce(new.raw_user_meta_data->>'name','')) on conflict(id) do nothing;
  return new;
end; $$;
revoke all on function public.handle_new_user() from public, anon, authenticated;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

commit;
