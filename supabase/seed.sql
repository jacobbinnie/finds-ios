--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 15.4 (Ubuntu 15.4-1.pgdg20.04+1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Data for Name: audit_log_entries; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."audit_log_entries" ("instance_id", "id", "payload", "created_at", "ip_address") VALUES
	('00000000-0000-0000-0000-000000000000', '92b5b7e1-ce5a-4b40-b857-36f0cce33408', '{"action":"user_confirmation_requested","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"user","traits":{"provider":"email"}}', '2023-08-25 22:29:34.229173+00', ''),
	('00000000-0000-0000-0000-000000000000', '2ba3d1b7-913b-404a-8f8a-1572674eec57', '{"action":"user_signedup","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"team"}', '2023-08-25 22:29:46.188565+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e6ec8e9a-405a-46a4-b404-4b9a21397856', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 02:56:01.921637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aaeca58d-1940-421f-a4d3-6ee4aa0a88fa', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-08-30 03:01:00.779576+00', ''),
	('00000000-0000-0000-0000-000000000000', '3b0ccbaa-73a6-4dc8-9fed-21b63ac81d1e', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 03:01:56.480931+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c2945529-13f1-4225-bdc2-d8723c4759f9', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-08-30 03:03:14.310821+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f0293604-b714-4ed3-a704-e2a14d308151', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 03:09:42.152662+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a69e3e33-326e-4af1-84a9-7c2aa553bca1', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 03:12:09.369701+00', ''),
	('00000000-0000-0000-0000-000000000000', '096b70db-b7a4-493a-a577-6dffa1437968', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-08-30 03:55:42.716071+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd672343a-5372-42c8-81a9-b8a5e3dd15c7', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 03:56:17.026477+00', ''),
	('00000000-0000-0000-0000-000000000000', '927a392c-5caf-4e13-9e11-4b6bdff1f462', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 05:04:16.740212+00', ''),
	('00000000-0000-0000-0000-000000000000', '70bd3f63-b644-495e-9d25-80764a7e9ae0', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 05:04:16.740864+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7133f78-8e45-44dc-a46a-281d1e778e25', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 06:02:22.684836+00', ''),
	('00000000-0000-0000-0000-000000000000', 'eb43adae-93ed-4875-a05e-e1c609b58228', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 06:02:22.686061+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed117dea-7fdf-4882-84a7-2e798691f07e', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 06:56:06.732696+00', ''),
	('00000000-0000-0000-0000-000000000000', '7ed95e41-589b-4b2a-b7f4-daf0bf647034', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 07:10:41.460243+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9cc4498-91f3-4bf2-8a21-4f7247d08031', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 07:10:41.461621+00', ''),
	('00000000-0000-0000-0000-000000000000', '361e4cbb-8e17-4c07-b2f7-a1d67db9a013', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 08:53:21.023846+00', ''),
	('00000000-0000-0000-0000-000000000000', '57a9fce7-ee7a-4c3e-83a3-04caaed35811', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 08:53:21.024696+00', ''),
	('00000000-0000-0000-0000-000000000000', 'a44e95fa-2732-4a61-bc37-9310057d6f78', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 08:53:24.367995+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f9012b7f-8b24-416e-8eb3-9f4202543661', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 08:53:24.368762+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fb796aef-5c14-4fd8-8b36-23533da405e3', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 20:23:34.389593+00', ''),
	('00000000-0000-0000-0000-000000000000', '0d04e4c9-0b4d-4345-bd8b-ddeacfff7311', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 20:23:34.390927+00', ''),
	('00000000-0000-0000-0000-000000000000', '3dc05411-4523-4b23-8217-6527c9904608', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 21:20:28.647813+00', ''),
	('00000000-0000-0000-0000-000000000000', '251640da-2b1f-426f-91d4-d305f707b05c', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 21:20:28.648521+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f2e87af7-b152-4606-8a35-7d757a027df3', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 21:20:28.682193+00', ''),
	('00000000-0000-0000-0000-000000000000', '9d05a4f6-8194-40ff-9baf-e9926324a7d0', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 21:20:28.682804+00', ''),
	('00000000-0000-0000-0000-000000000000', '28541f24-fa98-4544-949a-dce54e53fba9', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 21:21:37.834011+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f32e22cb-bab4-45d2-bc6d-65de4c5d7b39', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-30 21:21:37.835961+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd24d835d-882b-4d81-86cd-aa34d75b4018', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 21:22:08.130314+00', ''),
	('00000000-0000-0000-0000-000000000000', '5a8164c8-89a5-4400-a387-35ac76c8ebb9', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-30 21:53:20.917772+00', ''),
	('00000000-0000-0000-0000-000000000000', '64c6daab-0d4f-4211-9712-ade02822634d', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 00:00:07.066184+00', ''),
	('00000000-0000-0000-0000-000000000000', '350efb74-16db-4bda-99e5-c97378e006a0', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 00:00:07.06683+00', ''),
	('00000000-0000-0000-0000-000000000000', '0effbc9b-c075-4098-8dd5-2ddc1bfee2b0', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-08-31 00:00:09.987701+00', ''),
	('00000000-0000-0000-0000-000000000000', '01a11d61-20b3-4c55-9dbc-512a34432da2', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-31 01:08:34.26214+00', ''),
	('00000000-0000-0000-0000-000000000000', '9118643e-a030-4ae8-9a74-99e6cc25afab', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 02:08:56.391516+00', ''),
	('00000000-0000-0000-0000-000000000000', '521718ac-6270-4e87-bbca-61e3c7c628e7', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 02:08:56.392222+00', ''),
	('00000000-0000-0000-0000-000000000000', '49366189-2b25-4c01-9ed1-e84e60d24aa1', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 03:07:19.272489+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e5b2d693-f3d6-4b14-a0ff-1a90e4b93967', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 03:07:19.273199+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cd65ad97-00f5-4c72-bc0f-3521e23a1923', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 04:05:09.348684+00', ''),
	('00000000-0000-0000-0000-000000000000', '1b77f81e-e12d-4c60-b1d5-fa0d200de666', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 04:05:09.349342+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fe2d74a5-edac-4854-a383-205a0f7f1128', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-08-31 05:04:54.786286+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd2089dec-e07c-4d85-b500-db21e7b6fffa', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 06:23:41.957421+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f24e873-1f23-41be-b0a9-d954934e1f7e', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 06:23:41.958095+00', ''),
	('00000000-0000-0000-0000-000000000000', '925ac03a-b864-49b3-9f73-8cb98dabc29c', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 20:01:12.591785+00', ''),
	('00000000-0000-0000-0000-000000000000', '16cb7cde-160e-47c0-92f1-3045b71c455c', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 20:01:12.59249+00', ''),
	('00000000-0000-0000-0000-000000000000', 'df1022ef-f3a7-4a69-9a7e-62ff0e1e999f', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 20:05:31.63637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b58a15b9-db68-47b7-b5eb-6e82b93cf498', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 20:05:31.637079+00', ''),
	('00000000-0000-0000-0000-000000000000', '53bb66b3-c2ae-4cec-b2d9-fafd2744ff98', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 21:02:22.997475+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e71ab254-0997-4dbd-8858-0c07826c5c64', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 21:02:22.998175+00', ''),
	('00000000-0000-0000-0000-000000000000', '301a8a47-33ab-43b0-8897-46926f244b96', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 21:51:16.116357+00', ''),
	('00000000-0000-0000-0000-000000000000', 'aad31bed-a8ba-4627-b5df-b7a24db03981', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 21:51:16.117005+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b8cc338-fd38-4ba4-bdcc-0e69dc548b79', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 21:51:20.406086+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd3f13d09-326b-46cd-8a01-db934c20e1b1', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 21:51:20.406738+00', ''),
	('00000000-0000-0000-0000-000000000000', '85feac2e-d34a-4da8-b8f3-d1bba0b25795', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 22:31:28.191282+00', ''),
	('00000000-0000-0000-0000-000000000000', '7b1073eb-ec51-4193-92af-95aa534f26f4', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 22:31:28.192211+00', ''),
	('00000000-0000-0000-0000-000000000000', '42b71016-55cd-4739-b556-08d587c4950d', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 22:50:39.303668+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ce0b4666-a952-4778-a4fe-da961f89d47e', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-08-31 22:50:39.304474+00', ''),
	('00000000-0000-0000-0000-000000000000', '6a537288-ccee-41ec-90a8-869972beb432', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-08-31 23:20:15.779277+00', ''),
	('00000000-0000-0000-0000-000000000000', '2f0368b5-957c-4e8e-a664-acec40af0090', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-09-01 00:23:23.211604+00', ''),
	('00000000-0000-0000-0000-000000000000', '364b17ba-bdac-4f67-abd1-debec6172214', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 01:43:40.583021+00', ''),
	('00000000-0000-0000-0000-000000000000', '54e84a64-c0cc-44ad-b635-820f170cfd26', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 01:43:40.58369+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f6b541ab-bef4-4e44-85ad-c6ec7f0888d9', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 02:45:06.116023+00', ''),
	('00000000-0000-0000-0000-000000000000', '4fe94bba-fe09-4035-b8a7-cae0d9ee39dc', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 02:45:06.116724+00', ''),
	('00000000-0000-0000-0000-000000000000', '3ade12aa-6caf-423f-b1cd-39c4141a4714', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 09:48:38.744557+00', ''),
	('00000000-0000-0000-0000-000000000000', '195ffe20-e4a6-4744-aebc-7dedb98f8561', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 09:48:38.745189+00', ''),
	('00000000-0000-0000-0000-000000000000', '02315076-6f63-4e4d-896b-405c5b8dfe53', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 19:32:13.019122+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f95531df-44fd-4be6-ba29-639cd8892d99', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 19:32:13.019935+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e7573741-c68f-4982-8c33-e4166216ce30', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 22:06:24.928533+00', ''),
	('00000000-0000-0000-0000-000000000000', 'dbe9014a-af74-4d6e-9fe6-415b4e2e66ec', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-01 22:06:24.929227+00', ''),
	('00000000-0000-0000-0000-000000000000', '66878f22-ef9a-4821-87cd-ae490d292ccb', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-09-02 03:02:57.640857+00', ''),
	('00000000-0000-0000-0000-000000000000', '28ea8a48-e220-46e5-ae2f-96a572f3ac01', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-09-02 03:10:53.785198+00', ''),
	('00000000-0000-0000-0000-000000000000', '6b4894de-5e3b-4bcd-b4d2-525c1aa6d545', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-09-03 02:35:48.656108+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cae17f68-3b60-480a-b1e7-7921c7b048fe', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-09-06 20:14:18.948737+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f69c6364-15f0-4cad-841a-961bf7e6e79c', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-09-07 01:32:20.883584+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd268bcec-154c-48df-84c4-11de0f995b17', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-07 08:38:54.064722+00', ''),
	('00000000-0000-0000-0000-000000000000', 'ed5230f4-7377-4985-bbf9-1dd8751c1ee9', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-07 08:38:54.06632+00', ''),
	('00000000-0000-0000-0000-000000000000', '9fdc30b3-fdab-41d5-8285-41fab1761bcd', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-07 22:49:53.464419+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f8b79cea-a363-4896-9eae-6a3457b94cdf', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-07 22:49:53.465534+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd31e1d6f-0cc3-4ed1-aebd-81c5603503f8', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-09 02:42:32.851583+00', ''),
	('00000000-0000-0000-0000-000000000000', '5315d566-fcd0-4c08-80b0-3c8f50e46891', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-09 02:42:32.852323+00', ''),
	('00000000-0000-0000-0000-000000000000', '9478a507-c17c-42bb-b294-79304b790a6d', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"email"}}', '2023-09-10 22:34:22.644794+00', ''),
	('00000000-0000-0000-0000-000000000000', '93924a97-e6ce-4693-a42c-ef18f7383abc', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-11 02:07:23.592905+00', ''),
	('00000000-0000-0000-0000-000000000000', '56a2c469-81e0-4d61-8857-9fdd63dc1ed9', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-11 02:07:23.594473+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd40f805e-50e9-4017-a254-ac58d6e353cf', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-11 10:17:45.250726+00', ''),
	('00000000-0000-0000-0000-000000000000', '1552ca1a-585c-489e-ae96-010503750dbf', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-09-11 10:17:45.251707+00', ''),
	('00000000-0000-0000-0000-000000000000', '53144846-40a5-4ca1-b371-cc92319e68cb', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-18 21:47:33.259379+00', ''),
	('00000000-0000-0000-0000-000000000000', '67d89e39-2443-4df9-a5b9-681d9ad16922', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-18 21:53:10.812849+00', ''),
	('00000000-0000-0000-0000-000000000000', '4f4df844-1ef1-469a-bab9-a1d422bbd469', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-18 22:16:35.707091+00', ''),
	('00000000-0000-0000-0000-000000000000', '624ba15d-2a1a-46e8-9b98-117b2e7de33f', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-12-18 22:20:53.727527+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e22e791e-a143-483b-a540-7d295447cb79', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-18 22:25:31.728254+00', ''),
	('00000000-0000-0000-0000-000000000000', 'fc07d1f2-af52-4195-aa15-04a946b1744c', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-12-18 22:31:10.444625+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c8a9ea71-f2fd-40c9-923a-0430dff675d0', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-18 22:54:21.192243+00', ''),
	('00000000-0000-0000-0000-000000000000', '86eedb6a-8676-463a-b7d5-dae90f0b7365', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-12-18 23:01:40.288743+00', ''),
	('00000000-0000-0000-0000-000000000000', '912928d2-92e7-47bd-a6a1-5410ca9d9266', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-18 23:09:49.744607+00', ''),
	('00000000-0000-0000-0000-000000000000', '87ebbe5d-e768-43dc-84aa-471303865e01', '{"action":"logout","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account"}', '2023-12-18 23:09:59.695586+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c0c810a1-73a2-4e8d-9129-bb55ef3ae02b', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-19 01:35:32.19322+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b170e14f-9de1-40b6-9598-2048cacddf8d', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 14:06:40.258497+00', ''),
	('00000000-0000-0000-0000-000000000000', '609b8a73-49e5-4d65-b64a-54b2724fe9ad', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 14:06:40.259307+00', ''),
	('00000000-0000-0000-0000-000000000000', 'e89b3b41-6025-4e81-b9f4-d69c503abd0d', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 15:05:02.402072+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c9e48e79-0c9c-4f49-b36a-776c4ca7dfa6', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 15:05:02.402698+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd8fa0ee0-d325-4b01-89ff-eeaed878d916', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 16:03:05.90248+00', ''),
	('00000000-0000-0000-0000-000000000000', '1802c607-7cb1-4e88-b1e0-29856cca5dab', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 16:03:05.903122+00', ''),
	('00000000-0000-0000-0000-000000000000', 'cbe22620-f20f-46d6-96cd-e507c3c19ff7', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 17:01:13.785239+00', ''),
	('00000000-0000-0000-0000-000000000000', '608586db-ff4f-408b-8144-d52a132f4a33', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 17:01:13.78591+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f5ed2369-ad7d-4e5f-83b1-5913ed8da0d6', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 17:59:19.740512+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b19c3f54-4658-40ea-9cd8-8ef27e51d020', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 17:59:19.74119+00', ''),
	('00000000-0000-0000-0000-000000000000', '8b128adb-3719-4647-ad68-41563e23ec4d', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 18:57:42.735979+00', ''),
	('00000000-0000-0000-0000-000000000000', '04bbba5c-dbdb-45dc-bfcb-2655e6ab547d', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 18:57:42.736614+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f7bc6d66-3ee3-44d7-8194-ef020053e045', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 19:56:01.82991+00', ''),
	('00000000-0000-0000-0000-000000000000', 'f87e88ca-5ab8-4c82-94db-5536686133a2', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 19:56:01.830685+00', ''),
	('00000000-0000-0000-0000-000000000000', '50734073-7ea6-4a3e-96bf-875bd615404d', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 21:04:55.138025+00', ''),
	('00000000-0000-0000-0000-000000000000', 'b6a7ad13-7b93-438b-8b58-08445f955914', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 21:04:55.138637+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd16bf4e2-23e6-4bfc-8b21-024c36125533', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 22:03:06.021739+00', ''),
	('00000000-0000-0000-0000-000000000000', '87e89867-13ac-4967-9622-2c166700dc4e', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 22:03:06.022419+00', ''),
	('00000000-0000-0000-0000-000000000000', 'c6e04561-f07c-4d04-9089-133aba0c659c', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 23:01:12.076823+00', ''),
	('00000000-0000-0000-0000-000000000000', '763cf601-ceb3-4cbf-9cde-e7bb02b9c60f', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-19 23:01:12.077403+00', ''),
	('00000000-0000-0000-0000-000000000000', 'db5dcf69-e02b-44b9-9718-45c23dae7629', '{"action":"login","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"account","traits":{"provider":"apple"}}', '2023-12-19 23:43:50.347396+00', ''),
	('00000000-0000-0000-0000-000000000000', '0b463efd-0cc9-4de8-936f-f2911fe016bc', '{"action":"user_signedup","actor_id":"6950e9f0-582b-4da0-8dbe-f31e8f8f903b","actor_username":"alexn400@gmail.com","actor_via_sso":false,"log_type":"team","traits":{"provider":"apple"}}', '2023-12-19 23:44:12.799611+00', ''),
	('00000000-0000-0000-0000-000000000000', '5bb7bd8a-d4d6-4f78-9deb-b1f0b9f27a49', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-20 01:57:06.374891+00', ''),
	('00000000-0000-0000-0000-000000000000', 'd29d7c44-580c-4483-8f08-b7a06530c9b4', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-20 01:57:06.375503+00', ''),
	('00000000-0000-0000-0000-000000000000', '4532aab7-8eb8-4f8a-9e27-5e8e4877609b', '{"action":"token_refreshed","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-20 02:56:46.983794+00', ''),
	('00000000-0000-0000-0000-000000000000', '950eb6db-c944-473b-9004-9feeb6a0d63c', '{"action":"token_revoked","actor_id":"2d0ef82e-b61b-4ec0-b830-462044785ad6","actor_username":"hello@jacobbinnie.com","actor_via_sso":false,"log_type":"token"}', '2023-12-20 02:56:46.984409+00', '');


--
-- Data for Name: flow_state; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."flow_state" ("id", "user_id", "auth_code", "code_challenge_method", "code_challenge", "provider_type", "provider_access_token", "provider_refresh_token", "created_at", "updated_at", "authentication_method") VALUES
	('a4ac53dc-955d-4360-ba1f-a340c90177fa', '2d0ef82e-b61b-4ec0-b830-462044785ad6', '037c9d62-3e74-43a1-ab17-fb281c844967', 's256', 'wXoxlcUDiBu4mLHU7PWV3bxJrU3yHbTjUx5JShMAnjk', 'email', '', '', '2023-08-25 22:29:34.230341+00', '2023-08-25 22:29:34.230341+00', 'email/signup');


--
-- Data for Name: users; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."users" ("instance_id", "id", "aud", "role", "email", "encrypted_password", "email_confirmed_at", "invited_at", "confirmation_token", "confirmation_sent_at", "recovery_token", "recovery_sent_at", "email_change_token_new", "email_change", "email_change_sent_at", "last_sign_in_at", "raw_app_meta_data", "raw_user_meta_data", "is_super_admin", "created_at", "updated_at", "phone", "phone_confirmed_at", "phone_change", "phone_change_token", "phone_change_sent_at", "email_change_token_current", "email_change_confirm_status", "banned_until", "reauthentication_token", "reauthentication_sent_at", "is_sso_user", "deleted_at") VALUES
	('00000000-0000-0000-0000-000000000000', '6950e9f0-582b-4da0-8dbe-f31e8f8f903b', 'authenticated', 'authenticated', 'alexn400@gmail.com', '', '2023-12-19 23:44:12.800195+00', NULL, '', NULL, '', NULL, '', '', NULL, '2023-12-19 23:44:12.800859+00', '{"provider": "apple", "providers": ["apple"]}', '{"iss": "https://appleid.apple.com", "sub": "000475.f1111780a0dd48cb99ac7f1f0ddd5473.2344", "email": "alexn400@gmail.com", "provider_id": "000475.f1111780a0dd48cb99ac7f1f0ddd5473.2344", "custom_claims": {"auth_time": 1703029451}, "email_verified": true, "phone_verified": false}', NULL, '2023-12-19 23:44:12.794104+00', '2023-12-19 23:44:12.802359+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL),
	('00000000-0000-0000-0000-000000000000', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'authenticated', 'authenticated', 'hello@jacobbinnie.com', '$2a$10$N6VR2RKt1uv78rSSpv02ju9OWVRt0f18Ruxw1viAs2O9UZfAsFJUS', '2023-08-25 22:29:46.189173+00', NULL, '', '2023-08-25 22:29:34.231428+00', '', NULL, '', '', NULL, '2023-12-19 23:43:50.347926+00', '{"provider": "email", "providers": ["email", "apple"]}', '{"iss": "https://appleid.apple.com", "sub": "000705.eb3cbcc7f9e744699ed4919c9987edd4.1929", "email": "hello@jacobbinnie.com", "provider_id": "000705.eb3cbcc7f9e744699ed4919c9987edd4.1929", "custom_claims": {"auth_time": 1703029429}, "email_verified": true, "phone_verified": false}', NULL, '2023-08-25 22:29:34.221586+00', '2023-12-20 02:56:46.986153+00', NULL, NULL, '', '', NULL, '', 0, NULL, '', NULL, false, NULL);


--
-- Data for Name: identities; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."identities" ("provider_id", "user_id", "identity_data", "provider", "last_sign_in_at", "created_at", "updated_at", "id") VALUES
	('2d0ef82e-b61b-4ec0-b830-462044785ad6', '2d0ef82e-b61b-4ec0-b830-462044785ad6', '{"sub": "2d0ef82e-b61b-4ec0-b830-462044785ad6", "email": "hello@jacobbinnie.com"}', 'email', '2023-08-25 22:29:34.227908+00', '2023-08-25 22:29:34.227967+00', '2023-08-25 22:29:34.227967+00', '338fdddf-9013-4ecf-88f9-ee4da533f5f9'),
	('000705.eb3cbcc7f9e744699ed4919c9987edd4.1929', '2d0ef82e-b61b-4ec0-b830-462044785ad6', '{"iss": "https://appleid.apple.com", "sub": "000705.eb3cbcc7f9e744699ed4919c9987edd4.1929", "email": "hello@jacobbinnie.com", "provider_id": "000705.eb3cbcc7f9e744699ed4919c9987edd4.1929", "custom_claims": {"auth_time": 1703029429}, "email_verified": true, "phone_verified": false}', 'apple', '2023-12-18 21:47:33.25558+00', '2023-12-18 21:47:33.255636+00', '2023-12-19 23:43:50.344864+00', 'df48c5c4-a7f9-4ed6-aa16-427036a1c617'),
	('000475.f1111780a0dd48cb99ac7f1f0ddd5473.2344', '6950e9f0-582b-4da0-8dbe-f31e8f8f903b', '{"iss": "https://appleid.apple.com", "sub": "000475.f1111780a0dd48cb99ac7f1f0ddd5473.2344", "email": "alexn400@gmail.com", "provider_id": "000475.f1111780a0dd48cb99ac7f1f0ddd5473.2344", "custom_claims": {"auth_time": 1703029451}, "email_verified": true, "phone_verified": false}', 'apple', '2023-12-19 23:44:12.797243+00', '2023-12-19 23:44:12.797294+00', '2023-12-19 23:44:12.797294+00', 'a293bc97-6ceb-446a-94d5-f7eaa716e39f');


--
-- Data for Name: instances; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sessions; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."sessions" ("id", "user_id", "created_at", "updated_at", "factor_id", "aal", "not_after", "refreshed_at", "user_agent", "ip", "tag") VALUES
	('837359e6-2d3e-4a4c-9c20-ae6d40f896db', '2d0ef82e-b61b-4ec0-b830-462044785ad6', '2023-12-19 01:35:32.193867+00', '2023-12-19 23:01:12.08004+00', NULL, 'aal1', NULL, '2023-12-19 23:01:12.079969', 'Expo/2.29.6 CFNetwork/1474 Darwin/23.1.0', '65.246.174.98', NULL),
	('21173e7b-b4c8-4aa4-b3a0-192ce5d45672', '6950e9f0-582b-4da0-8dbe-f31e8f8f903b', '2023-12-19 23:44:12.800929+00', '2023-12-19 23:44:12.800929+00', NULL, 'aal1', NULL, NULL, 'Expo/1017565 CFNetwork/1485 Darwin/23.1.0', '65.246.174.98', NULL),
	('c839ba14-af2d-4369-beec-ed8e1c7ec334', '2d0ef82e-b61b-4ec0-b830-462044785ad6', '2023-12-19 23:43:50.347993+00', '2023-12-20 02:56:46.987159+00', NULL, 'aal1', NULL, '2023-12-20 02:56:46.98708', 'Expo/1017565 CFNetwork/1485 Darwin/23.1.0', '74.64.232.183', NULL);


--
-- Data for Name: mfa_amr_claims; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."mfa_amr_claims" ("session_id", "created_at", "updated_at", "authentication_method", "id") VALUES
	('837359e6-2d3e-4a4c-9c20-ae6d40f896db', '2023-12-19 01:35:32.195621+00', '2023-12-19 01:35:32.195621+00', 'oauth', '1f1518c6-19e7-45ed-902e-db11128b3365'),
	('c839ba14-af2d-4369-beec-ed8e1c7ec334', '2023-12-19 23:43:50.350011+00', '2023-12-19 23:43:50.350011+00', 'oauth', '376af553-a015-452c-b83c-e83f30449768'),
	('21173e7b-b4c8-4aa4-b3a0-192ce5d45672', '2023-12-19 23:44:12.802587+00', '2023-12-19 23:44:12.802587+00', 'oauth', '9239ee2b-d797-495c-ac27-4aa963655945');


--
-- Data for Name: mfa_factors; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: mfa_challenges; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: refresh_tokens; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--

INSERT INTO "auth"."refresh_tokens" ("instance_id", "id", "token", "user_id", "revoked", "created_at", "updated_at", "parent", "session_id") VALUES
	('00000000-0000-0000-0000-000000000000', 54, 'zJCjfgQRmsQwLSneiMUc_w', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 01:35:32.194526+00', '2023-12-19 14:06:40.259969+00', NULL, '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 55, 'eIGbQsnVuk7aDppdBgL47w', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 14:06:40.260622+00', '2023-12-19 15:05:02.403239+00', 'zJCjfgQRmsQwLSneiMUc_w', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 56, 'F8P1sJbMkkbEbC1GFKSN3g', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 15:05:02.403579+00', '2023-12-19 16:03:05.903637+00', 'eIGbQsnVuk7aDppdBgL47w', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 57, '7ECIW9Q8wUx_mt_fBfDOeg', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 16:03:05.903978+00', '2023-12-19 17:01:13.786578+00', 'F8P1sJbMkkbEbC1GFKSN3g', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 58, 'GJoytsNk1QNFBYpP2cgTAg', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 17:01:13.786934+00', '2023-12-19 17:59:19.741666+00', '7ECIW9Q8wUx_mt_fBfDOeg', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 59, 'uj_Xh9oChAuPPERlHaWYKQ', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 17:59:19.744264+00', '2023-12-19 18:57:42.737192+00', 'GJoytsNk1QNFBYpP2cgTAg', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 60, 'X4xqeu8jCVRgl4BGOczTAA', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 18:57:42.737562+00', '2023-12-19 19:56:01.831354+00', 'uj_Xh9oChAuPPERlHaWYKQ', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 61, 'oRfiBKrqTbYKDNFKbeDv9w', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 19:56:01.831735+00', '2023-12-19 21:04:55.139238+00', 'X4xqeu8jCVRgl4BGOczTAA', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 62, '5vvLg13dMTVpsBQVDLa_dw', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 21:04:55.139538+00', '2023-12-19 22:03:06.023106+00', 'oRfiBKrqTbYKDNFKbeDv9w', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 63, 'qOTcx6PfaMaE-0QE2T2thA', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 22:03:06.023445+00', '2023-12-19 23:01:12.078106+00', '5vvLg13dMTVpsBQVDLa_dw', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 64, 'iMzPB_lUTSg_eGgo93h2fA', '2d0ef82e-b61b-4ec0-b830-462044785ad6', false, '2023-12-19 23:01:12.078392+00', '2023-12-19 23:01:12.078392+00', 'qOTcx6PfaMaE-0QE2T2thA', '837359e6-2d3e-4a4c-9c20-ae6d40f896db'),
	('00000000-0000-0000-0000-000000000000', 66, '46Q5OhaDDpRq10J82QWt2A', '6950e9f0-582b-4da0-8dbe-f31e8f8f903b', false, '2023-12-19 23:44:12.801558+00', '2023-12-19 23:44:12.801558+00', NULL, '21173e7b-b4c8-4aa4-b3a0-192ce5d45672'),
	('00000000-0000-0000-0000-000000000000', 65, 'KqnxDcD66qWUEiqQ62YIfQ', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-19 23:43:50.348764+00', '2023-12-20 01:57:06.375984+00', NULL, 'c839ba14-af2d-4369-beec-ed8e1c7ec334'),
	('00000000-0000-0000-0000-000000000000', 67, 'JkxK_GvwTk2OrlFnP7WmJg', '2d0ef82e-b61b-4ec0-b830-462044785ad6', true, '2023-12-20 01:57:06.376381+00', '2023-12-20 02:56:46.984992+00', 'KqnxDcD66qWUEiqQ62YIfQ', 'c839ba14-af2d-4369-beec-ed8e1c7ec334'),
	('00000000-0000-0000-0000-000000000000', 68, 'boLO42Y3wg57rkrhw9YS5Q', '2d0ef82e-b61b-4ec0-b830-462044785ad6', false, '2023-12-20 02:56:46.985309+00', '2023-12-20 02:56:46.985309+00', 'JkxK_GvwTk2OrlFnP7WmJg', 'c839ba14-af2d-4369-beec-ed8e1c7ec334');


--
-- Data for Name: sso_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_providers; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: saml_relay_states; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: sso_domains; Type: TABLE DATA; Schema: auth; Owner: supabase_auth_admin
--



--
-- Data for Name: key; Type: TABLE DATA; Schema: pgsodium; Owner: supabase_admin
--



--
-- Data for Name: places; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."places" ("created_at", "lat", "lng", "name", "full_address", "locality", "postcode", "region", "country", "id", "hashed_mapbox_id", "categories") VALUES
	('2023-08-31 22:50:11.736437+00', 174.694107, -36.588402, 'Cafe Puff', '17 Cammish Lane Unit H2, Orewa 0931, New Zealand', 'West Village', '0931', NULL, 'New Zealand', '0ccaae5b-3b28-4bd3-a32f-ba57a952db6a', 'd0813ac6fcc9fdca5acb6eb43f83f893', '{restaurant,food,"food and drink"}'),
	('2023-09-07 01:33:06.362793+00', -94.588576, 39.087716, 'Cafe Gratitude', '333 Southwest Blvd, Kansas City, Missouri 64108, United States of America', 'East Village', '64108', 'Missouri', 'United States of America', '5dfc4af9-e9ae-4f35-a2c2-9c3b935a4e24', 'c28fe919c71f75ce2f0f79b93b4fb9e8', '{restaurant,food,"food and drink","breakfast restaurant"}'),
	('2023-09-03 02:36:35.146563+00', -104.66786080552744, 39.85791166147092, 'Coffee Beanery', '8400 Pena Blvd, Denver, Colorado 80249, United States of America', 'Flat Iron', '80249', 'Colorado', 'United States of America', '44bb9542-1679-48b6-8807-20c68c2bd1be', '03548fc723492c2a60f100d5b9dbd561', '{food,"food and drink","coffee shop",coffee,café,"fast food restaurant",teahouse}'),
	('2023-09-02 03:03:38.020213+00', -71.126721, 42.345352, 'Union Square Donuts', '409 Harvard St, Brookline, Massachusetts 02446, United States of America', 'Midtown', '02446', 'Massachusetts', 'United States of America', '07d55b3a-c96e-46af-8cdc-bf2a514725a6', '0ec00fa1a517984e1e55c3cccb51e3a7', '{food,"food and drink",restaurant,"coffee shop",coffee,café,"american restaurant","donut shop","bagel shop"}'),
	('2023-08-31 22:55:56.485505+00', 9.655067, 44.147282, 'Tosca Bistrot', 'Via Roma 34, 19016 Monterosso al Mare, Italy', 'Financial District', '19016', NULL, 'Italy', 'a4a5f999-9b4f-41e4-aa3f-3b34a45d110e', 'cae7bbe8c404bb49ce11614e04ad358f', '{food,"food and drink",restaurant,"italian restaurant"}'),
	('2023-08-31 23:19:37.327206+00', -73.98743, 40.722297, 'Katz''s Delicatessen', '205 E Houston St, New York, New York 10002, United States of America', 'Central Park', '10002', 'New York', 'United States of America', '9e87692d-6321-4edc-97c8-395833718e3f', 'a89c91a8fbbfa1198db735b49d2bfc5c', '{restaurant,food,"food and drink","fast food restaurant","sandwich shop"}'),
	('2023-09-01 00:23:54.045636+00', 2.342967, 48.872823, 'La Comete', '19 Rue Du Faubourg Montmartre, 75009 Paris, France', 'Chinatown', '75009', NULL, 'France', 'b9688e7d-67a5-4175-8cae-08bd4b0c0beb', 'ccc42808f01fd043cc5fb6fbcd146bd4', '{food,"food and drink",restaurant,bar,nightlife,"cocktail bar","french restaurant"}');


--
-- Data for Name: profile; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."profile" ("id", "created_at", "username", "firstname", "image") VALUES
	('2d0ef82e-b61b-4ec0-b830-462044785ad6', '2023-08-30 03:57:20.733218+00', 'jacobbinnie', 'Jacob', 'https://pbs.twimg.com/profile_images/1712912818142433281/ZERmqIL9_400x400.jpg');


--
-- Data for Name: finds; Type: TABLE DATA; Schema: public; Owner: postgres
--

INSERT INTO "public"."finds" ("created_at", "user_id", "review", "rating", "id", "photos", "place") VALUES
	('2023-08-31 22:50:12.094626+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'Love this place for coffee!', 9, '3bfa1edf-e1d2-4ae7-8c36-d0f5d1b2969b', '{"/Users/jacobbinnie/Downloads/demo/1.jpeg"}', '0ccaae5b-3b28-4bd3-a32f-ba57a952db6a'),
	('2023-08-31 23:19:38.259533+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'One of my fave sandwich shops in East Village!', 8, 'fb10cad9-e356-49b2-b3dd-2794377ed1fd', '{"/Users/jacobbinnie/Downloads/demo/2.jpeg"}', '0ccaae5b-3b28-4bd3-a32f-ba57a952db6a'),
	('2023-09-01 00:23:54.907177+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'Best duck I’ve ever had!', 10, '112b7a1f-75fe-47b7-8473-3881e9b7c085', '{"/Users/jacobbinnie/Downloads/demo/3.jpeg"}', '0ccaae5b-3b28-4bd3-a32f-ba57a952db6a'),
	('2023-09-02 03:03:38.381557+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'hjkdfxjkdfjkjkdsjksdjksdfjkhsdfsd', 8, 'f1d9d8a4-27ce-45bc-a31a-d049ba273345', '{"/Users/jacobbinnie/Downloads/demo/4.jpeg"}', '44bb9542-1679-48b6-8807-20c68c2bd1be'),
	('2023-09-03 02:36:36.063576+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'Yooooo love this place ', 8, 'f99177d0-5b55-4d7c-a676-58f4500e7125', '{"/Users/jacobbinnie/Downloads/demo/5.jpeg"}', '9e87692d-6321-4edc-97c8-395833718e3f'),
	('2023-08-31 22:55:57.41526+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'Some of the best seafood I’ve had in my life! Some of the best seafood I’ve had in my life! Some of the best seafood I’ve had in my life! Some of the best seafood I’ve had in my life!', 9, 'c5747080-877d-45d7-a2a1-40f658a851c8', '{"/Users/jacobbinnie/Downloads/demo/6.jpeg"}', '5dfc4af9-e9ae-4f35-a2c2-9c3b935a4e24'),
	('2023-09-07 01:33:07.307707+00', '2d0ef82e-b61b-4ec0-b830-462044785ad6', 'Really love the quality of food and coffee here!', 9, 'dbb85bb1-7959-4cfe-a176-3f13cb8b4d8e', '{"/Users/jacobbinnie/Downloads/demo/7.jpeg"}', '07d55b3a-c96e-46af-8cdc-bf2a514725a6');


--
-- Data for Name: likes; Type: TABLE DATA; Schema: public; Owner: postgres
--



--
-- Data for Name: buckets; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: objects; Type: TABLE DATA; Schema: storage; Owner: supabase_storage_admin
--



--
-- Data for Name: secrets; Type: TABLE DATA; Schema: vault; Owner: supabase_admin
--



--
-- Name: refresh_tokens_id_seq; Type: SEQUENCE SET; Schema: auth; Owner: supabase_auth_admin
--

SELECT pg_catalog.setval('"auth"."refresh_tokens_id_seq"', 68, true);


--
-- Name: key_key_id_seq; Type: SEQUENCE SET; Schema: pgsodium; Owner: supabase_admin
--

SELECT pg_catalog.setval('"pgsodium"."key_key_id_seq"', 1, false);


--
-- Name: likes_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('"public"."likes_id_seq"', 1, false);


--
-- PostgreSQL database dump complete
--

RESET ALL;
