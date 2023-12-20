create table "public"."saves" (
    "created_at" timestamp with time zone not null default now(),
    "user_id" uuid not null,
    "review" text not null,
    "rating" numeric not null,
    "id" uuid not null default gen_random_uuid(),
    "photos" text[] not null,
    "place" uuid
);


alter table "public"."saves" enable row level security;

CREATE UNIQUE INDEX saves_id_key ON public.saves USING btree (id);

CREATE UNIQUE INDEX saves_pkey ON public.saves USING btree (id);

alter table "public"."saves" add constraint "saves_pkey" PRIMARY KEY using index "saves_pkey";

alter table "public"."saves" add constraint "saves_id_key" UNIQUE using index "saves_id_key";

alter table "public"."saves" add constraint "saves_place_fkey" FOREIGN KEY (place) REFERENCES places(id) not valid;

alter table "public"."saves" validate constraint "saves_place_fkey";

alter table "public"."saves" add constraint "saves_user_id_fkey" FOREIGN KEY (user_id) REFERENCES profile(id) not valid;

alter table "public"."saves" validate constraint "saves_user_id_fkey";

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


