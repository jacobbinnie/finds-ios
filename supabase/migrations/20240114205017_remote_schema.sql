revoke delete on table "public"."likes" from "anon";

revoke insert on table "public"."likes" from "anon";

revoke references on table "public"."likes" from "anon";

revoke select on table "public"."likes" from "anon";

revoke trigger on table "public"."likes" from "anon";

revoke truncate on table "public"."likes" from "anon";

revoke update on table "public"."likes" from "anon";

revoke delete on table "public"."likes" from "authenticated";

revoke insert on table "public"."likes" from "authenticated";

revoke references on table "public"."likes" from "authenticated";

revoke select on table "public"."likes" from "authenticated";

revoke trigger on table "public"."likes" from "authenticated";

revoke truncate on table "public"."likes" from "authenticated";

revoke update on table "public"."likes" from "authenticated";

revoke delete on table "public"."likes" from "service_role";

revoke insert on table "public"."likes" from "service_role";

revoke references on table "public"."likes" from "service_role";

revoke select on table "public"."likes" from "service_role";

revoke trigger on table "public"."likes" from "service_role";

revoke truncate on table "public"."likes" from "service_role";

revoke update on table "public"."likes" from "service_role";

alter table "public"."likes" drop constraint "likes_find_fkey";

alter table "public"."likes" drop constraint "likes_profile_fkey";

alter table "public"."places" drop constraint "places_mapbox_id_key";

alter table "public"."likes" drop constraint "likes_pkey";

drop index if exists "public"."likes_pkey";

drop index if exists "public"."places_mapbox_id_key";

drop table "public"."likes";

create table "public"."saves" (
    "created_at" timestamp with time zone not null default now(),
    "profile" uuid not null,
    "find" uuid not null,
    "id" uuid not null default gen_random_uuid()
);


alter table "public"."saves" enable row level security;

alter table "public"."finds" add column "vibe" text not null;

alter table "public"."finds" alter column "place" set not null;

alter table "public"."finds" alter column "rating" set data type text using "rating"::text;

alter table "public"."places" drop column "country";

alter table "public"."places" drop column "full_address";

alter table "public"."places" drop column "hashed_mapbox_id";

alter table "public"."places" drop column "lat";

alter table "public"."places" drop column "lng";

alter table "public"."places" drop column "locality";

alter table "public"."places" drop column "postcode";

alter table "public"."places" drop column "region";

alter table "public"."places" add column "google_maps_uri" text not null;

alter table "public"."places" add column "google_places_id" text not null;

alter table "public"."places" add column "short_formatted_address" text not null;

alter table "public"."places" add column "updated_at" timestamp with time zone not null default now();

alter table "public"."places" alter column "categories" set not null;

CREATE UNIQUE INDEX saves_pkey ON public.saves USING btree (id);

alter table "public"."saves" add constraint "saves_pkey" PRIMARY KEY using index "saves_pkey";

alter table "public"."saves" add constraint "saves_find_fkey" FOREIGN KEY (find) REFERENCES finds(id) not valid;

alter table "public"."saves" validate constraint "saves_find_fkey";

alter table "public"."saves" add constraint "saves_profile_fkey" FOREIGN KEY (profile) REFERENCES profile(id) not valid;

alter table "public"."saves" validate constraint "saves_profile_fkey";

grant delete on table "public"."saves" to "anon";

grant insert on table "public"."saves" to "anon";

grant references on table "public"."saves" to "anon";

grant select on table "public"."saves" to "anon";

grant trigger on table "public"."saves" to "anon";

grant truncate on table "public"."saves" to "anon";

grant update on table "public"."saves" to "anon";

grant delete on table "public"."saves" to "authenticated";

grant insert on table "public"."saves" to "authenticated";

grant references on table "public"."saves" to "authenticated";

grant select on table "public"."saves" to "authenticated";

grant trigger on table "public"."saves" to "authenticated";

grant truncate on table "public"."saves" to "authenticated";

grant update on table "public"."saves" to "authenticated";

grant delete on table "public"."saves" to "service_role";

grant insert on table "public"."saves" to "service_role";

grant references on table "public"."saves" to "service_role";

grant select on table "public"."saves" to "service_role";

grant trigger on table "public"."saves" to "service_role";

grant truncate on table "public"."saves" to "service_role";

grant update on table "public"."saves" to "service_role";

create policy "Enable update for users based on email"
on "public"."places"
as permissive
for update
to authenticated
using (true)
with check (true);


create policy "Enable delete for users based on user_id"
on "public"."saves"
as permissive
for delete
to authenticated
using ((auth.uid() = profile));


create policy "Enable insert for authenticated users only"
on "public"."saves"
as permissive
for insert
to authenticated
with check (true);


create policy "Enable read access for all users"
on "public"."saves"
as permissive
for select
to public
using (true);



