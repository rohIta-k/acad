-- Run this in Supabase SQL editor 
create policy "Allow public uploads"
on storage.objects
for insert
to public
with check (bucket_id = 'brand-asset');

create policy "Allow public reads"
on storage.objects
for select
to public
using (bucket_id = 'brand-asset');