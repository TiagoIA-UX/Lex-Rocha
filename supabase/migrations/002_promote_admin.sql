-- Execute APÓS criar sua conta no Supabase Auth
-- Substitua o e-mail pelo seu e-mail de login

update public.profiles
set role = 'admin'
where id = (
  select id from auth.users
  where email = 'SEU_EMAIL@exemplo.com'
  limit 1
);
