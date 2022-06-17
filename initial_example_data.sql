--
-- PostgreSQL database dump
--

-- Dumped from database version 14.3
-- Dumped by pg_dump version 14.3

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

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: api_container; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_container (
    id bigint NOT NULL,
    type character varying(7) NOT NULL,
    liters numeric(4,2) NOT NULL
);


ALTER TABLE public.api_container OWNER TO birracraft;

--
-- Name: api_container_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_container_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_container_id_seq OWNER TO birracraft;

--
-- Name: api_container_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_container_id_seq OWNED BY public.api_container.id;


--
-- Name: api_customer; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_customer (
    id bigint NOT NULL,
    name character varying(30) NOT NULL,
    address character varying(120) NOT NULL,
    email character varying(254) NOT NULL,
    cellphone character varying(12) NOT NULL,
    type character varying(10) NOT NULL
);


ALTER TABLE public.api_customer OWNER TO birracraft;

--
-- Name: api_customer_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_customer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_customer_id_seq OWNER TO birracraft;

--
-- Name: api_customer_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_customer_id_seq OWNED BY public.api_customer.id;


--
-- Name: api_flavour; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_flavour (
    id bigint NOT NULL,
    name character varying(15) NOT NULL,
    description text NOT NULL,
    price_per_lt numeric(10,2) NOT NULL
);


ALTER TABLE public.api_flavour OWNER TO birracraft;

--
-- Name: api_flavour_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_flavour_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_flavour_id_seq OWNER TO birracraft;

--
-- Name: api_flavour_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_flavour_id_seq OWNED BY public.api_flavour.id;


--
-- Name: api_order; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_order (
    id bigint NOT NULL,
    date date NOT NULL,
    price numeric(10,2) NOT NULL,
    delivery_cost numeric(10,2) NOT NULL,
    total_amount numeric(10,2) NOT NULL,
    state character varying(9) NOT NULL,
    comment text NOT NULL,
    customer_id bigint NOT NULL,
    payment_id bigint
);


ALTER TABLE public.api_order OWNER TO birracraft;

--
-- Name: api_order_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_order_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_order_id_seq OWNER TO birracraft;

--
-- Name: api_order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_order_id_seq OWNED BY public.api_order.id;


--
-- Name: api_order_products; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_order_products (
    id bigint NOT NULL,
    order_id bigint NOT NULL,
    product_id bigint NOT NULL
);


ALTER TABLE public.api_order_products OWNER TO birracraft;

--
-- Name: api_order_products_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_order_products_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_order_products_id_seq OWNER TO birracraft;

--
-- Name: api_order_products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_order_products_id_seq OWNED BY public.api_order_products.id;


--
-- Name: api_payment; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_payment (
    id bigint NOT NULL,
    transaction integer NOT NULL,
    amount numeric(10,2) NOT NULL,
    method character varying(14) NOT NULL,
    quotas_id bigint NOT NULL
);


ALTER TABLE public.api_payment OWNER TO birracraft;

--
-- Name: api_payment_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_payment_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_payment_id_seq OWNER TO birracraft;

--
-- Name: api_payment_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_payment_id_seq OWNED BY public.api_payment.id;


--
-- Name: api_product; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_product (
    id bigint NOT NULL,
    code character varying(5) NOT NULL,
    arrived_date date NOT NULL,
    price numeric(10,2) NOT NULL,
    state character varying(10) NOT NULL,
    container_id bigint NOT NULL,
    flavour_id bigint NOT NULL
);


ALTER TABLE public.api_product OWNER TO birracraft;

--
-- Name: api_product_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_product_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_product_id_seq OWNER TO birracraft;

--
-- Name: api_product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_product_id_seq OWNED BY public.api_product.id;


--
-- Name: api_quota; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.api_quota (
    id bigint NOT NULL,
    current_quota integer NOT NULL,
    total_quota integer NOT NULL,
    value numeric(10,2) NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.api_quota OWNER TO birracraft;

--
-- Name: api_quota_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.api_quota_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.api_quota_id_seq OWNER TO birracraft;

--
-- Name: api_quota_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.api_quota_id_seq OWNED BY public.api_quota.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO birracraft;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO birracraft;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO birracraft;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO birracraft;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO birracraft;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO birracraft;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: auth_user; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.auth_user (
    id integer NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    is_superuser boolean NOT NULL,
    username character varying(150) NOT NULL,
    first_name character varying(150) NOT NULL,
    last_name character varying(150) NOT NULL,
    email character varying(254) NOT NULL,
    is_staff boolean NOT NULL,
    is_active boolean NOT NULL,
    date_joined timestamp with time zone NOT NULL
);


ALTER TABLE public.auth_user OWNER TO birracraft;

--
-- Name: auth_user_groups; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.auth_user_groups (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    group_id integer NOT NULL
);


ALTER TABLE public.auth_user_groups OWNER TO birracraft;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.auth_user_groups_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_groups_id_seq OWNER TO birracraft;

--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.auth_user_groups_id_seq OWNED BY public.auth_user_groups.id;


--
-- Name: auth_user_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.auth_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_id_seq OWNER TO birracraft;

--
-- Name: auth_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.auth_user_id_seq OWNED BY public.auth_user.id;


--
-- Name: auth_user_user_permissions; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.auth_user_user_permissions (
    id bigint NOT NULL,
    user_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_user_user_permissions OWNER TO birracraft;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.auth_user_user_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_user_user_permissions_id_seq OWNER TO birracraft;

--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.auth_user_user_permissions_id_seq OWNED BY public.auth_user_user_permissions.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id integer NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO birracraft;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO birracraft;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO birracraft;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO birracraft;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO birracraft;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: birracraft
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO birracraft;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: birracraft
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: birracraft
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO birracraft;

--
-- Name: api_container id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_container ALTER COLUMN id SET DEFAULT nextval('public.api_container_id_seq'::regclass);


--
-- Name: api_customer id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_customer ALTER COLUMN id SET DEFAULT nextval('public.api_customer_id_seq'::regclass);


--
-- Name: api_flavour id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_flavour ALTER COLUMN id SET DEFAULT nextval('public.api_flavour_id_seq'::regclass);


--
-- Name: api_order id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order ALTER COLUMN id SET DEFAULT nextval('public.api_order_id_seq'::regclass);


--
-- Name: api_order_products id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order_products ALTER COLUMN id SET DEFAULT nextval('public.api_order_products_id_seq'::regclass);


--
-- Name: api_payment id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_payment ALTER COLUMN id SET DEFAULT nextval('public.api_payment_id_seq'::regclass);


--
-- Name: api_product id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_product ALTER COLUMN id SET DEFAULT nextval('public.api_product_id_seq'::regclass);


--
-- Name: api_quota id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_quota ALTER COLUMN id SET DEFAULT nextval('public.api_quota_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: auth_user id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user ALTER COLUMN id SET DEFAULT nextval('public.auth_user_id_seq'::regclass);


--
-- Name: auth_user_groups id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_groups ALTER COLUMN id SET DEFAULT nextval('public.auth_user_groups_id_seq'::regclass);


--
-- Name: auth_user_user_permissions id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_user_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_user_user_permissions_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Data for Name: api_container; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_container (id, type, liters) FROM stdin;
1	Keg	10.00
2	Bottle	1.00
3	Growler	1.90
\.


--
-- Data for Name: api_customer; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_customer (id, name, address, email, cellphone, type) FROM stdin;
1	Vera	Carl Jacobsens Vej 39	vera@gmail.com	4533446677	Comerce
2	John Jhonson	Carl Jacobsens Vej 39	jj@gmail.com	4566778899	Particular
3	Carl Carlsberg	Carl Jacobsens Vej 39	cc@gmail.com	4511223344	Particular
4	La Birreria	Irigoyen 800, Ctes, Argentina	labirreria@birreria.com	543794663311	Comerce
5	TheRama	Buenos Aires 200, Ctes, Arg	therama@outlook.com	543794220099	Comerce
6	Barock	Nyhavn 1	barock@gmail.com	4566221133	Comerce
\.


--
-- Data for Name: api_flavour; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_flavour (id, name, description, price_per_lt) FROM stdin;
1	Ibera	IPA	2.00
2	Yarara	IPA	1.80
3	Parana	APA Red	1.40
4	Goya	Golden	1.20
5	Yatay	Golden	1.40
6	Yacare	IPA	2.20
7	Guarani	APA	1.50
\.


--
-- Data for Name: api_order; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_order (id, date, price, delivery_cost, total_amount, state, comment, customer_id, payment_id) FROM stdin;
1	2022-06-12	20.00	2.00	22.00	Pending	take the payment when the keg is retire	2	\N
\.


--
-- Data for Name: api_order_products; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_order_products (id, order_id, product_id) FROM stdin;
1	1	1
\.


--
-- Data for Name: api_payment; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_payment (id, transaction, amount, method, quotas_id) FROM stdin;
\.


--
-- Data for Name: api_product; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_product (id, code, arrived_date, price, state, container_id, flavour_id) FROM stdin;
1	542	2022-06-11	20.00	In Stock	1	1
2	540	2022-06-17	12.00	In Stock	1	4
3	304	2022-06-03	2.28	Empty	3	4
\.


--
-- Data for Name: api_quota; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.api_quota (id, current_quota, total_quota, value, date) FROM stdin;
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add user	4	add_user
14	Can change user	4	change_user
15	Can delete user	4	delete_user
16	Can view user	4	view_user
17	Can add content type	5	add_contenttype
18	Can change content type	5	change_contenttype
19	Can delete content type	5	delete_contenttype
20	Can view content type	5	view_contenttype
21	Can add session	6	add_session
22	Can change session	6	change_session
23	Can delete session	6	delete_session
24	Can view session	6	view_session
25	Can add container	7	add_container
26	Can change container	7	change_container
27	Can delete container	7	delete_container
28	Can view container	7	view_container
29	Can add customer	8	add_customer
30	Can change customer	8	change_customer
31	Can delete customer	8	delete_customer
32	Can view customer	8	view_customer
33	Can add flavour	9	add_flavour
34	Can change flavour	9	change_flavour
35	Can delete flavour	9	delete_flavour
36	Can view flavour	9	view_flavour
37	Can add quota	10	add_quota
38	Can change quota	10	change_quota
39	Can delete quota	10	delete_quota
40	Can view quota	10	view_quota
41	Can add product	11	add_product
42	Can change product	11	change_product
43	Can delete product	11	delete_product
44	Can view product	11	view_product
45	Can add payment	12	add_payment
46	Can change payment	12	change_payment
47	Can delete payment	12	delete_payment
48	Can view payment	12	view_payment
49	Can add order	13	add_order
50	Can change order	13	change_order
51	Can delete order	13	delete_order
52	Can view order	13	view_order
\.


--
-- Data for Name: auth_user; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.auth_user (id, password, last_login, is_superuser, username, first_name, last_name, email, is_staff, is_active, date_joined) FROM stdin;
1	pbkdf2_sha256$320000$K8GlGiZ78xL0IZkSpEpC2m$PJEKwRDxijPDjpdK4twSJrUpT5s4vdOIeaMGNBdzI+U=	\N	f	sam	Samuel	Smith	ss@gmail.com	f	t	2022-06-13 17:35:54.010585+00
\.


--
-- Data for Name: auth_user_groups; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.auth_user_groups (id, user_id, group_id) FROM stdin;
\.


--
-- Data for Name: auth_user_user_permissions; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.auth_user_user_permissions (id, user_id, permission_id) FROM stdin;
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	auth	user
5	contenttypes	contenttype
6	sessions	session
7	api	container
8	api	customer
9	api	flavour
10	api	quota
11	api	product
12	api	payment
13	api	order
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2022-06-13 17:30:03.523228+00
2	auth	0001_initial	2022-06-13 17:30:03.891016+00
3	admin	0001_initial	2022-06-13 17:30:04.034973+00
4	admin	0002_logentry_remove_auto_add	2022-06-13 17:30:04.07664+00
5	admin	0003_logentry_add_action_flag_choices	2022-06-13 17:30:04.098592+00
6	api	0001_initial	2022-06-13 17:30:04.36472+00
7	api	0002_alter_order_payment	2022-06-13 17:30:04.497732+00
8	api	0003_alter_product_arrived_date	2022-06-13 17:30:04.579331+00
9	api	0004_remove_order_products_order_products	2022-06-13 17:30:04.749402+00
10	contenttypes	0002_remove_content_type_name	2022-06-13 17:30:04.789446+00
11	auth	0002_alter_permission_name_max_length	2022-06-13 17:30:04.807444+00
12	auth	0003_alter_user_email_max_length	2022-06-13 17:30:04.821863+00
13	auth	0004_alter_user_username_opts	2022-06-13 17:30:04.836932+00
14	auth	0005_alter_user_last_login_null	2022-06-13 17:30:04.853828+00
15	auth	0006_require_contenttypes_0002	2022-06-13 17:30:04.856427+00
16	auth	0007_alter_validators_add_error_messages	2022-06-13 17:30:04.870561+00
17	auth	0008_alter_user_username_max_length	2022-06-13 17:30:04.91209+00
18	auth	0009_alter_user_last_name_max_length	2022-06-13 17:30:04.937492+00
19	auth	0010_alter_group_name_max_length	2022-06-13 17:30:04.955096+00
20	auth	0011_update_proxy_permissions	2022-06-13 17:30:04.982661+00
21	auth	0012_alter_user_first_name_max_length	2022-06-13 17:30:04.998942+00
22	sessions	0001_initial	2022-06-13 17:30:05.035756+00
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: birracraft
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
\.


--
-- Name: api_container_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_container_id_seq', 3, true);


--
-- Name: api_customer_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_customer_id_seq', 6, true);


--
-- Name: api_flavour_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_flavour_id_seq', 7, true);


--
-- Name: api_order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_order_id_seq', 1, true);


--
-- Name: api_order_products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_order_products_id_seq', 1, true);


--
-- Name: api_payment_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_payment_id_seq', 1, false);


--
-- Name: api_product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_product_id_seq', 3, true);


--
-- Name: api_quota_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.api_quota_id_seq', 1, false);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 52, true);


--
-- Name: auth_user_groups_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.auth_user_groups_id_seq', 1, false);


--
-- Name: auth_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.auth_user_id_seq', 1, true);


--
-- Name: auth_user_user_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.auth_user_user_permissions_id_seq', 1, false);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 1, false);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 13, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: birracraft
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 22, true);


--
-- Name: api_container api_container_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_container
    ADD CONSTRAINT api_container_pkey PRIMARY KEY (id);


--
-- Name: api_customer api_customer_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_customer
    ADD CONSTRAINT api_customer_pkey PRIMARY KEY (id);


--
-- Name: api_flavour api_flavour_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_flavour
    ADD CONSTRAINT api_flavour_pkey PRIMARY KEY (id);


--
-- Name: api_order api_order_payment_id_key; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order
    ADD CONSTRAINT api_order_payment_id_key UNIQUE (payment_id);


--
-- Name: api_order api_order_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order
    ADD CONSTRAINT api_order_pkey PRIMARY KEY (id);


--
-- Name: api_order_products api_order_products_order_id_product_id_916e551e_uniq; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order_products
    ADD CONSTRAINT api_order_products_order_id_product_id_916e551e_uniq UNIQUE (order_id, product_id);


--
-- Name: api_order_products api_order_products_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order_products
    ADD CONSTRAINT api_order_products_pkey PRIMARY KEY (id);


--
-- Name: api_payment api_payment_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_payment
    ADD CONSTRAINT api_payment_pkey PRIMARY KEY (id);


--
-- Name: api_product api_product_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_product
    ADD CONSTRAINT api_product_pkey PRIMARY KEY (id);


--
-- Name: api_quota api_quota_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_quota
    ADD CONSTRAINT api_quota_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_pkey PRIMARY KEY (id);


--
-- Name: auth_user_groups auth_user_groups_user_id_group_id_94350c0c_uniq; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_group_id_94350c0c_uniq UNIQUE (user_id, group_id);


--
-- Name: auth_user auth_user_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_permission_id_14a6b632_uniq; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_permission_id_14a6b632_uniq UNIQUE (user_id, permission_id);


--
-- Name: auth_user auth_user_username_key; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user
    ADD CONSTRAINT auth_user_username_key UNIQUE (username);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: api_order_customer_id_8cb4e7b7; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX api_order_customer_id_8cb4e7b7 ON public.api_order USING btree (customer_id);


--
-- Name: api_order_products_order_id_7a747d0c; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX api_order_products_order_id_7a747d0c ON public.api_order_products USING btree (order_id);


--
-- Name: api_order_products_product_id_6b091569; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX api_order_products_product_id_6b091569 ON public.api_order_products USING btree (product_id);


--
-- Name: api_payment_quotas_id_3c5ada71; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX api_payment_quotas_id_3c5ada71 ON public.api_payment USING btree (quotas_id);


--
-- Name: api_product_container_id_09b5ee69; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX api_product_container_id_09b5ee69 ON public.api_product USING btree (container_id);


--
-- Name: api_product_flavour_id_240db4ed; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX api_product_flavour_id_240db4ed ON public.api_product USING btree (flavour_id);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: auth_user_groups_group_id_97559544; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_user_groups_group_id_97559544 ON public.auth_user_groups USING btree (group_id);


--
-- Name: auth_user_groups_user_id_6a12ed8b; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_user_groups_user_id_6a12ed8b ON public.auth_user_groups USING btree (user_id);


--
-- Name: auth_user_user_permissions_permission_id_1fbb5f2c; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_user_user_permissions_permission_id_1fbb5f2c ON public.auth_user_user_permissions USING btree (permission_id);


--
-- Name: auth_user_user_permissions_user_id_a95ead1b; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_user_user_permissions_user_id_a95ead1b ON public.auth_user_user_permissions USING btree (user_id);


--
-- Name: auth_user_username_6821ab7c_like; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX auth_user_username_6821ab7c_like ON public.auth_user USING btree (username varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: birracraft
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: api_order api_order_customer_id_8cb4e7b7_fk_api_customer_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order
    ADD CONSTRAINT api_order_customer_id_8cb4e7b7_fk_api_customer_id FOREIGN KEY (customer_id) REFERENCES public.api_customer(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: api_order api_order_payment_id_c8399f49_fk_api_payment_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order
    ADD CONSTRAINT api_order_payment_id_c8399f49_fk_api_payment_id FOREIGN KEY (payment_id) REFERENCES public.api_payment(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: api_order_products api_order_products_order_id_7a747d0c_fk_api_order_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order_products
    ADD CONSTRAINT api_order_products_order_id_7a747d0c_fk_api_order_id FOREIGN KEY (order_id) REFERENCES public.api_order(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: api_order_products api_order_products_product_id_6b091569_fk_api_product_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_order_products
    ADD CONSTRAINT api_order_products_product_id_6b091569_fk_api_product_id FOREIGN KEY (product_id) REFERENCES public.api_product(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: api_payment api_payment_quotas_id_3c5ada71_fk_api_quota_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_payment
    ADD CONSTRAINT api_payment_quotas_id_3c5ada71_fk_api_quota_id FOREIGN KEY (quotas_id) REFERENCES public.api_quota(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: api_product api_product_container_id_09b5ee69_fk_api_container_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_product
    ADD CONSTRAINT api_product_container_id_09b5ee69_fk_api_container_id FOREIGN KEY (container_id) REFERENCES public.api_container(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: api_product api_product_flavour_id_240db4ed_fk_api_flavour_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.api_product
    ADD CONSTRAINT api_product_flavour_id_240db4ed_fk_api_flavour_id FOREIGN KEY (flavour_id) REFERENCES public.api_flavour(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_group_id_97559544_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_group_id_97559544_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_groups auth_user_groups_user_id_6a12ed8b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_groups
    ADD CONSTRAINT auth_user_groups_user_id_6a12ed8b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permi_permission_id_1fbb5f2c_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_user_user_permissions auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.auth_user_user_permissions
    ADD CONSTRAINT auth_user_user_permissions_user_id_a95ead1b_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_auth_user_id; Type: FK CONSTRAINT; Schema: public; Owner: birracraft
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_auth_user_id FOREIGN KEY (user_id) REFERENCES public.auth_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- PostgreSQL database dump complete
--

