PGDMP         ;                y         !   institucion-financiera-activofijo    10.16    13.2 �    �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            �           1262    16902 !   institucion-financiera-activofijo    DATABASE     w   CREATE DATABASE "institucion-financiera-activofijo" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'en_US.UTF8';
 3   DROP DATABASE "institucion-financiera-activofijo";
                cloudsqlsuperuser    false            �           0    0    SCHEMA public    ACL     �   REVOKE ALL ON SCHEMA public FROM cloudsqladmin;
REVOKE ALL ON SCHEMA public FROM PUBLIC;
GRANT ALL ON SCHEMA public TO cloudsqlsuperuser;
GRANT ALL ON SCHEMA public TO PUBLIC;
GRANT ALL ON SCHEMA public TO postgres;
                   cloudsqlsuperuser    false    3                       1247    16904    activo_baja_motivo    TYPE     `   CREATE TYPE public.activo_baja_motivo AS ENUM (
    'DONADO',
    'DESECHADO',
    'VENDIDO'
);
 %   DROP TYPE public.activo_baja_motivo;
       public          postgres    false                       1247    16912    credito_estado    TYPE     �   CREATE TYPE public.credito_estado AS ENUM (
    'POR_APROBAR',
    'EN_CURSO',
    'EN_MORA',
    'INCOBRABLE',
    'FINALIZADO',
    'REFINANCIADO'
);
 !   DROP TYPE public.credito_estado;
       public          postgres    false            �           1247    17325    credito_tipo    TYPE     _   CREATE TYPE public.credito_tipo AS ENUM (
    'HIPOTECARIO',
    'COMERCIAL',
    'CONSUMO'
);
    DROP TYPE public.credito_tipo;
       public          postgres    false            k           1247    16936    estado_civil    TYPE     h   CREATE TYPE public.estado_civil AS ENUM (
    'SOLTERO',
    'CASADO',
    'VIUDO',
    'DIVORCIADO'
);
    DROP TYPE public.estado_civil;
       public          postgres    false            n           1247    16946    genero    TYPE     G   CREATE TYPE public.genero AS ENUM (
    'MASCULINO',
    'FEMENINO'
);
    DROP TYPE public.genero;
       public          postgres    false            q           1247    16952    tipo_activo_fijo    TYPE     s   CREATE TYPE public.tipo_activo_fijo AS ENUM (
    'TERRENO',
    'SOFTWARE',
    'MAQUINARIA',
    'MOBILIARIO'
);
 #   DROP TYPE public.tipo_activo_fijo;
       public          postgres    false            t           1247    16962    tipo_adquisicion    TYPE     �   CREATE TYPE public.tipo_adquisicion AS ENUM (
    'COMPRADO_NUEVO',
    'COMPRADO_USADO',
    'DONADO_NUEVO',
    'DONADO_USADO'
);
 #   DROP TYPE public.tipo_adquisicion;
       public          postgres    false            w           1247    16972    tipo_bien_garantia    TYPE     v   CREATE TYPE public.tipo_bien_garantia AS ENUM (
    'TERRENO',
    'MOTOCICLETA',
    'VEHICULO',
    'MAQUINARIA'
);
 %   DROP TYPE public.tipo_bien_garantia;
       public          postgres    false            �           1247    17252    tipo_calculo    TYPE     V   CREATE TYPE public.tipo_calculo AS ENUM (
    'DEPRECIA',
    'AMORTIZA',
    'NA'
);
    DROP TYPE public.tipo_calculo;
       public          postgres    false            z           1247    16982    tipo_contacto    TYPE     d   CREATE TYPE public.tipo_contacto AS ENUM (
    'CASA',
    'PERSONAL',
    'TRABAJO',
    'OTRO'
);
     DROP TYPE public.tipo_contacto;
       public          postgres    false            }           1247    16992    tipo_persona    TYPE     J   CREATE TYPE public.tipo_persona AS ENUM (
    'PERSONA',
    'EMPRESA'
);
    DROP TYPE public.tipo_persona;
       public          postgres    false            �           1247    16998    tipo_usuario    TYPE     y   CREATE TYPE public.tipo_usuario AS ENUM (
    'ADMINISTRADOR',
    'ASESOR',
    'COBRO',
    'ENCARGADO_ACTIVO_FIJO'
);
    DROP TYPE public.tipo_usuario;
       public          postgres    false            �            1259    17261    activo_fijo    TABLE     �   CREATE TABLE public.activo_fijo (
    id integer NOT NULL,
    nombre character varying(50) NOT NULL,
    codigo_tipo_activo integer NOT NULL
);
    DROP TABLE public.activo_fijo;
       public            postgres    false            �            1259    17259    activo_fijo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.activo_fijo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 )   DROP SEQUENCE public.activo_fijo_id_seq;
       public          postgres    false    220            �           0    0    activo_fijo_id_seq    SEQUENCE OWNED BY     I   ALTER SEQUENCE public.activo_fijo_id_seq OWNED BY public.activo_fijo.id;
          public          postgres    false    219            �            1259    17274    adquisicion_activo_fijo    TABLE     �  CREATE TABLE public.adquisicion_activo_fijo (
    id integer NOT NULL,
    id_activo integer NOT NULL,
    fecha date NOT NULL,
    descripcion character varying(800) NOT NULL,
    tipo_adquisicion public.tipo_adquisicion NOT NULL,
    precio_unidad double precision NOT NULL,
    codigo_unidad integer NOT NULL,
    codigo_departamento integer NOT NULL,
    nit_usuario character varying(17) NOT NULL,
    vida_util integer
);
 +   DROP TABLE public.adquisicion_activo_fijo;
       public            postgres    false    628            �            1259    17272    adquisicion_activo_fijo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.adquisicion_activo_fijo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 5   DROP SEQUENCE public.adquisicion_activo_fijo_id_seq;
       public          postgres    false    222            �           0    0    adquisicion_activo_fijo_id_seq    SEQUENCE OWNED BY     a   ALTER SEQUENCE public.adquisicion_activo_fijo_id_seq OWNED BY public.adquisicion_activo_fijo.id;
          public          postgres    false    221            �            1259    17302    baja_activo_fijo    TABLE     �   CREATE TABLE public.baja_activo_fijo (
    id integer NOT NULL,
    fecha date NOT NULL,
    motivo public.activo_baja_motivo NOT NULL
);
 $   DROP TABLE public.baja_activo_fijo;
       public            postgres    false    534            �            1259    17300    baja_activo_fijo_id_seq    SEQUENCE     �   CREATE SEQUENCE public.baja_activo_fijo_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 .   DROP SEQUENCE public.baja_activo_fijo_id_seq;
       public          postgres    false    225            �           0    0    baja_activo_fijo_id_seq    SEQUENCE OWNED BY     S   ALTER SEQUENCE public.baja_activo_fijo_id_seq OWNED BY public.baja_activo_fijo.id;
          public          postgres    false    224            �            1259    17015    bien_garantia    TABLE     �   CREATE TABLE public.bien_garantia (
    codigo character varying(30) NOT NULL,
    descripcion character varying(300) NOT NULL,
    valorado_en double precision,
    tipo_bien public.tipo_bien_garantia NOT NULL
);
 !   DROP TABLE public.bien_garantia;
       public            postgres    false    631            �            1259    17021    credito    TABLE     �  CREATE TABLE public.credito (
    id integer NOT NULL,
    monto double precision NOT NULL,
    fecha_solicitud date NOT NULL,
    fecha_aprobacion date,
    fecha_cancelado date,
    estado public.credito_estado NOT NULL,
    nit_usuario character varying(17) NOT NULL,
    id_politica integer NOT NULL,
    para public.tipo_persona NOT NULL,
    puntos integer NOT NULL,
    tiempo integer NOT NULL
);
    DROP TABLE public.credito;
       public            postgres    false    637    537            �            1259    17024    credito_bien_garantia    TABLE        CREATE TABLE public.credito_bien_garantia (
    id_credito integer NOT NULL,
    codigo_bien character varying(30) NOT NULL
);
 )   DROP TABLE public.credito_bien_garantia;
       public            postgres    false            �            1259    17027    credito_empresa    TABLE     y   CREATE TABLE public.credito_empresa (
    id_credito integer NOT NULL,
    nit_empresa character varying(17) NOT NULL
);
 #   DROP TABLE public.credito_empresa;
       public            postgres    false            �            1259    17030    credito_id_seq    SEQUENCE     �   CREATE SEQUENCE public.credito_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 %   DROP SEQUENCE public.credito_id_seq;
       public          postgres    false    198            �           0    0    credito_id_seq    SEQUENCE OWNED BY     A   ALTER SEQUENCE public.credito_id_seq OWNED BY public.credito.id;
          public          postgres    false    201            �            1259    17032    credito_persona    TABLE     }   CREATE TABLE public.credito_persona (
    nit_solicitante character varying(17) NOT NULL,
    id_credito integer NOT NULL
);
 #   DROP TABLE public.credito_persona;
       public            postgres    false            �            1259    17018    cuota    TABLE     "  CREATE TABLE public.cuota (
    numero integer NOT NULL,
    id_credito integer NOT NULL,
    capital_amortizado double precision NOT NULL,
    interes double precision NOT NULL,
    mora double precision NOT NULL,
    fecha_correspondiente date NOT NULL,
    dias_antes_despues integer
);
    DROP TABLE public.cuota;
       public            postgres    false            �            1259    17035    departamento    TABLE     �   CREATE TABLE public.departamento (
    codigo integer NOT NULL,
    nombre character varying(30) NOT NULL,
    codigo_unidad integer NOT NULL
);
     DROP TABLE public.departamento;
       public            postgres    false            �            1259    17295    detalle_activo    TABLE     �   CREATE TABLE public.detalle_activo (
    id_adquisicion integer NOT NULL,
    correlativo integer NOT NULL,
    id_baja integer,
    precio double precision
);
 "   DROP TABLE public.detalle_activo;
       public            postgres    false            �            1259    17038 	   direccion    TABLE     �   CREATE TABLE public.direccion (
    id integer NOT NULL,
    direccion character varying(300) NOT NULL,
    codigo_ubicacion character varying(8) NOT NULL
);
    DROP TABLE public.direccion;
       public            postgres    false            �            1259    17041    direccion_id_seq    SEQUENCE     �   CREATE SEQUENCE public.direccion_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 '   DROP SEQUENCE public.direccion_id_seq;
       public          postgres    false    204            �           0    0    direccion_id_seq    SEQUENCE OWNED BY     E   ALTER SEQUENCE public.direccion_id_seq OWNED BY public.direccion.id;
          public          postgres    false    205            �            1259    17043    empresa    TABLE     �   CREATE TABLE public.empresa (
    nit character varying(17) NOT NULL,
    nit_representante character varying(17) NOT NULL,
    nombre character varying(150) NOT NULL
);
    DROP TABLE public.empresa;
       public            postgres    false            �            1259    17046    garantia_fiador    TABLE     �   CREATE TABLE public.garantia_fiador (
    id_credito_persona integer NOT NULL,
    nit_fiador character varying(17) NOT NULL,
    id_ingreso_egreso integer
);
 #   DROP TABLE public.garantia_fiador;
       public            postgres    false            �            1259    17049    ingreso_egreso    TABLE       CREATE TABLE public.ingreso_egreso (
    ingresos_totales double precision NOT NULL,
    otros_ingresos double precision NOT NULL,
    ocupacion character varying(30) NOT NULL,
    nota character varying(250) NOT NULL,
    id integer NOT NULL,
    egresos double precision NOT NULL
);
 "   DROP TABLE public.ingreso_egreso;
       public            postgres    false            �            1259    17052    ingreso_egreso_id_seq    SEQUENCE     �   CREATE SEQUENCE public.ingreso_egreso_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 ,   DROP SEQUENCE public.ingreso_egreso_id_seq;
       public          postgres    false    208            �           0    0    ingreso_egreso_id_seq    SEQUENCE OWNED BY     O   ALTER SEQUENCE public.ingreso_egreso_id_seq OWNED BY public.ingreso_egreso.id;
          public          postgres    false    209            �            1259    17054    persona    TABLE     �   CREATE TABLE public.persona (
    nit character varying(17) NOT NULL,
    id_direccion integer NOT NULL,
    tipo_persona public.tipo_persona NOT NULL
);
    DROP TABLE public.persona;
       public            postgres    false    637            �            1259    17057    persona_natural    TABLE     H  CREATE TABLE public.persona_natural (
    dui character varying(10) NOT NULL,
    nit character varying(17) NOT NULL,
    nombres character varying(30) NOT NULL,
    apellidos character varying(30) NOT NULL,
    estado_civil public.estado_civil NOT NULL,
    genero public.genero NOT NULL,
    fecha_nacimiento date NOT NULL
);
 #   DROP TABLE public.persona_natural;
       public            postgres    false    622    619            �            1259    17060    politica    TABLE     T  CREATE TABLE public.politica (
    fecha_establecimiento date NOT NULL,
    tasa_interes double precision NOT NULL,
    tasa_mora double precision NOT NULL,
    dias_cobro integer NOT NULL,
    fecha_finalizacion date NOT NULL,
    id integer NOT NULL,
    monto_inferior double precision NOT NULL,
    monto_superior double precision NOT NULL,
    tiempo_inferior integer,
    gastos_tramitacion double precision NOT NULL,
    gastos_notario double precision NOT NULL,
    otras_comisiones double precision,
    tiempo_superior integer NOT NULL,
    tipo_credito public.credito_tipo NOT NULL
);
    DROP TABLE public.politica;
       public            postgres    false    719            �           0    0    COLUMN politica.tiempo_inferior    COMMENT     y   COMMENT ON COLUMN public.politica.tiempo_inferior IS 'el credito se otorga para determinado tiempo estipulado en meses';
          public          postgres    false    212            �            1259    17063    politica_id_seq    SEQUENCE     �   CREATE SEQUENCE public.politica_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.politica_id_seq;
       public          postgres    false    212            �           0    0    politica_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.politica_id_seq OWNED BY public.politica.id;
          public          postgres    false    213            �            1259    17065    telefono    TABLE     �   CREATE TABLE public.telefono (
    nit character varying(17) NOT NULL,
    tipo_contacto public.tipo_contacto NOT NULL,
    telefono character varying(9) NOT NULL
);
    DROP TABLE public.telefono;
       public            postgres    false    634            �            1259    17068    tipo_activo    TABLE     �   CREATE TABLE public.tipo_activo (
    codigo integer NOT NULL,
    tipo_calculo public.tipo_calculo,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.tipo_activo;
       public            postgres    false    701            �            1259    17071 	   ubicacion    TABLE     w   CREATE TABLE public.ubicacion (
    codigo character varying(8) NOT NULL,
    nombre character varying(50) NOT NULL
);
    DROP TABLE public.ubicacion;
       public            postgres    false            �            1259    17074    unidad    TABLE     g   CREATE TABLE public.unidad (
    codigo integer NOT NULL,
    nombre character varying(30) NOT NULL
);
    DROP TABLE public.unidad;
       public            postgres    false            �            1259    17077    usuario    TABLE     �   CREATE TABLE public.usuario (
    tipo public.tipo_usuario NOT NULL,
    nombre character varying(30) NOT NULL,
    clave character varying(300) NOT NULL,
    nit character varying(17) NOT NULL,
    salt character varying(1024) NOT NULL
);
    DROP TABLE public.usuario;
       public            postgres    false    640            �           2604    17264    activo_fijo id    DEFAULT     p   ALTER TABLE ONLY public.activo_fijo ALTER COLUMN id SET DEFAULT nextval('public.activo_fijo_id_seq'::regclass);
 =   ALTER TABLE public.activo_fijo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    219    220    220            �           2604    17277    adquisicion_activo_fijo id    DEFAULT     �   ALTER TABLE ONLY public.adquisicion_activo_fijo ALTER COLUMN id SET DEFAULT nextval('public.adquisicion_activo_fijo_id_seq'::regclass);
 I   ALTER TABLE public.adquisicion_activo_fijo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    222    221    222            �           2604    17305    baja_activo_fijo id    DEFAULT     z   ALTER TABLE ONLY public.baja_activo_fijo ALTER COLUMN id SET DEFAULT nextval('public.baja_activo_fijo_id_seq'::regclass);
 B   ALTER TABLE public.baja_activo_fijo ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    224    225    225            �           2604    17082 
   credito id    DEFAULT     h   ALTER TABLE ONLY public.credito ALTER COLUMN id SET DEFAULT nextval('public.credito_id_seq'::regclass);
 9   ALTER TABLE public.credito ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    201    198            �           2604    17083    direccion id    DEFAULT     l   ALTER TABLE ONLY public.direccion ALTER COLUMN id SET DEFAULT nextval('public.direccion_id_seq'::regclass);
 ;   ALTER TABLE public.direccion ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    205    204            �           2604    17084    ingreso_egreso id    DEFAULT     v   ALTER TABLE ONLY public.ingreso_egreso ALTER COLUMN id SET DEFAULT nextval('public.ingreso_egreso_id_seq'::regclass);
 @   ALTER TABLE public.ingreso_egreso ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    209    208            �           2604    17085    politica id    DEFAULT     j   ALTER TABLE ONLY public.politica ALTER COLUMN id SET DEFAULT nextval('public.politica_id_seq'::regclass);
 :   ALTER TABLE public.politica ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    213    212            �          0    17261    activo_fijo 
   TABLE DATA           E   COPY public.activo_fijo (id, nombre, codigo_tipo_activo) FROM stdin;
    public          postgres    false    220   ��       �          0    17274    adquisicion_activo_fijo 
   TABLE DATA           �   COPY public.adquisicion_activo_fijo (id, id_activo, fecha, descripcion, tipo_adquisicion, precio_unidad, codigo_unidad, codigo_departamento, nit_usuario, vida_util) FROM stdin;
    public          postgres    false    222   ��       �          0    17302    baja_activo_fijo 
   TABLE DATA           =   COPY public.baja_activo_fijo (id, fecha, motivo) FROM stdin;
    public          postgres    false    225   ��       �          0    17015    bien_garantia 
   TABLE DATA           T   COPY public.bien_garantia (codigo, descripcion, valorado_en, tipo_bien) FROM stdin;
    public          postgres    false    196   $�       �          0    17021    credito 
   TABLE DATA           �   COPY public.credito (id, monto, fecha_solicitud, fecha_aprobacion, fecha_cancelado, estado, nit_usuario, id_politica, para, puntos, tiempo) FROM stdin;
    public          postgres    false    198   y�       �          0    17024    credito_bien_garantia 
   TABLE DATA           H   COPY public.credito_bien_garantia (id_credito, codigo_bien) FROM stdin;
    public          postgres    false    199   ��       �          0    17027    credito_empresa 
   TABLE DATA           B   COPY public.credito_empresa (id_credito, nit_empresa) FROM stdin;
    public          postgres    false    200   i�       �          0    17032    credito_persona 
   TABLE DATA           F   COPY public.credito_persona (nit_solicitante, id_credito) FROM stdin;
    public          postgres    false    202   ��       �          0    17018    cuota 
   TABLE DATA           �   COPY public.cuota (numero, id_credito, capital_amortizado, interes, mora, fecha_correspondiente, dias_antes_despues) FROM stdin;
    public          postgres    false    197   t�       �          0    17035    departamento 
   TABLE DATA           E   COPY public.departamento (codigo, nombre, codigo_unidad) FROM stdin;
    public          postgres    false    203   ��       �          0    17295    detalle_activo 
   TABLE DATA           V   COPY public.detalle_activo (id_adquisicion, correlativo, id_baja, precio) FROM stdin;
    public          postgres    false    223   T�       �          0    17038 	   direccion 
   TABLE DATA           D   COPY public.direccion (id, direccion, codigo_ubicacion) FROM stdin;
    public          postgres    false    204   ��       �          0    17043    empresa 
   TABLE DATA           A   COPY public.empresa (nit, nit_representante, nombre) FROM stdin;
    public          postgres    false    206   ��       �          0    17046    garantia_fiador 
   TABLE DATA           \   COPY public.garantia_fiador (id_credito_persona, nit_fiador, id_ingreso_egreso) FROM stdin;
    public          postgres    false    207   ��       �          0    17049    ingreso_egreso 
   TABLE DATA           h   COPY public.ingreso_egreso (ingresos_totales, otros_ingresos, ocupacion, nota, id, egresos) FROM stdin;
    public          postgres    false    208   ��       �          0    17054    persona 
   TABLE DATA           B   COPY public.persona (nit, id_direccion, tipo_persona) FROM stdin;
    public          postgres    false    210   ��       �          0    17057    persona_natural 
   TABLE DATA           o   COPY public.persona_natural (dui, nit, nombres, apellidos, estado_civil, genero, fecha_nacimiento) FROM stdin;
    public          postgres    false    211   �       �          0    17060    politica 
   TABLE DATA           �   COPY public.politica (fecha_establecimiento, tasa_interes, tasa_mora, dias_cobro, fecha_finalizacion, id, monto_inferior, monto_superior, tiempo_inferior, gastos_tramitacion, gastos_notario, otras_comisiones, tiempo_superior, tipo_credito) FROM stdin;
    public          postgres    false    212   ��       �          0    17065    telefono 
   TABLE DATA           @   COPY public.telefono (nit, tipo_contacto, telefono) FROM stdin;
    public          postgres    false    214   �       �          0    17068    tipo_activo 
   TABLE DATA           C   COPY public.tipo_activo (codigo, tipo_calculo, nombre) FROM stdin;
    public          postgres    false    215   ��       �          0    17071 	   ubicacion 
   TABLE DATA           3   COPY public.ubicacion (codigo, nombre) FROM stdin;
    public          postgres    false    216   ��       �          0    17074    unidad 
   TABLE DATA           0   COPY public.unidad (codigo, nombre) FROM stdin;
    public          postgres    false    217   �"      �          0    17077    usuario 
   TABLE DATA           A   COPY public.usuario (tipo, nombre, clave, nit, salt) FROM stdin;
    public          postgres    false    218   %#      �           0    0    activo_fijo_id_seq    SEQUENCE SET     A   SELECT pg_catalog.setval('public.activo_fijo_id_seq', 10, true);
          public          postgres    false    219            �           0    0    adquisicion_activo_fijo_id_seq    SEQUENCE SET     M   SELECT pg_catalog.setval('public.adquisicion_activo_fijo_id_seq', 15, true);
          public          postgres    false    221            �           0    0    baja_activo_fijo_id_seq    SEQUENCE SET     F   SELECT pg_catalog.setval('public.baja_activo_fijo_id_seq', 28, true);
          public          postgres    false    224            �           0    0    credito_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.credito_id_seq', 115, true);
          public          postgres    false    201            �           0    0    direccion_id_seq    SEQUENCE SET     @   SELECT pg_catalog.setval('public.direccion_id_seq', 100, true);
          public          postgres    false    205            �           0    0    ingreso_egreso_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.ingreso_egreso_id_seq', 1, false);
          public          postgres    false    209            �           0    0    politica_id_seq    SEQUENCE SET     >   SELECT pg_catalog.setval('public.politica_id_seq', 19, true);
          public          postgres    false    213            
           2606    17266    activo_fijo activo_fijo_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.activo_fijo
    ADD CONSTRAINT activo_fijo_pkey PRIMARY KEY (id);
 F   ALTER TABLE ONLY public.activo_fijo DROP CONSTRAINT activo_fijo_pkey;
       public            postgres    false    220                       2606    17279 4   adquisicion_activo_fijo adquisicion_activo_fijo_pkey 
   CONSTRAINT     r   ALTER TABLE ONLY public.adquisicion_activo_fijo
    ADD CONSTRAINT adquisicion_activo_fijo_pkey PRIMARY KEY (id);
 ^   ALTER TABLE ONLY public.adquisicion_activo_fijo DROP CONSTRAINT adquisicion_activo_fijo_pkey;
       public            postgres    false    222                       2606    17307 &   baja_activo_fijo baja_activo_fijo_pkey 
   CONSTRAINT     d   ALTER TABLE ONLY public.baja_activo_fijo
    ADD CONSTRAINT baja_activo_fijo_pkey PRIMARY KEY (id);
 P   ALTER TABLE ONLY public.baja_activo_fijo DROP CONSTRAINT baja_activo_fijo_pkey;
       public            postgres    false    225            �           2606    17091     bien_garantia bien_garantia_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.bien_garantia
    ADD CONSTRAINT bien_garantia_pkey PRIMARY KEY (codigo);
 J   ALTER TABLE ONLY public.bien_garantia DROP CONSTRAINT bien_garantia_pkey;
       public            postgres    false    196            �           2606    17093    cuota cobro_pkey 
   CONSTRAINT     ^   ALTER TABLE ONLY public.cuota
    ADD CONSTRAINT cobro_pkey PRIMARY KEY (numero, id_credito);
 :   ALTER TABLE ONLY public.cuota DROP CONSTRAINT cobro_pkey;
       public            postgres    false    197    197            �           2606    17095 0   credito_bien_garantia credito_bien_garantia_pkey 
   CONSTRAINT     �   ALTER TABLE ONLY public.credito_bien_garantia
    ADD CONSTRAINT credito_bien_garantia_pkey PRIMARY KEY (id_credito, codigo_bien);
 Z   ALTER TABLE ONLY public.credito_bien_garantia DROP CONSTRAINT credito_bien_garantia_pkey;
       public            postgres    false    199    199            �           2606    17097 $   credito_empresa credito_empresa_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.credito_empresa
    ADD CONSTRAINT credito_empresa_pkey PRIMARY KEY (id_credito);
 N   ALTER TABLE ONLY public.credito_empresa DROP CONSTRAINT credito_empresa_pkey;
       public            postgres    false    200            �           2606    17099 $   credito_persona credito_persona_pkey 
   CONSTRAINT     j   ALTER TABLE ONLY public.credito_persona
    ADD CONSTRAINT credito_persona_pkey PRIMARY KEY (id_credito);
 N   ALTER TABLE ONLY public.credito_persona DROP CONSTRAINT credito_persona_pkey;
       public            postgres    false    202            �           2606    17101    credito credito_pkey 
   CONSTRAINT     R   ALTER TABLE ONLY public.credito
    ADD CONSTRAINT credito_pkey PRIMARY KEY (id);
 >   ALTER TABLE ONLY public.credito DROP CONSTRAINT credito_pkey;
       public            postgres    false    198            �           2606    17250    departamento departamento_pkey 
   CONSTRAINT     o   ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_pkey PRIMARY KEY (codigo, codigo_unidad);
 H   ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_pkey;
       public            postgres    false    203    203                       2606    17299 "   detalle_activo detalle_activo_pkey 
   CONSTRAINT     y   ALTER TABLE ONLY public.detalle_activo
    ADD CONSTRAINT detalle_activo_pkey PRIMARY KEY (id_adquisicion, correlativo);
 L   ALTER TABLE ONLY public.detalle_activo DROP CONSTRAINT detalle_activo_pkey;
       public            postgres    false    223    223            �           2606    17105    direccion direccion_pkey 
   CONSTRAINT     V   ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT direccion_pkey PRIMARY KEY (id);
 B   ALTER TABLE ONLY public.direccion DROP CONSTRAINT direccion_pkey;
       public            postgres    false    204            �           2606    17107    empresa empresa_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_pkey PRIMARY KEY (nit);
 >   ALTER TABLE ONLY public.empresa DROP CONSTRAINT empresa_pkey;
       public            postgres    false    206            �           2606    17109 $   garantia_fiador garantia_fiador_pkey 
   CONSTRAINT     ~   ALTER TABLE ONLY public.garantia_fiador
    ADD CONSTRAINT garantia_fiador_pkey PRIMARY KEY (id_credito_persona, nit_fiador);
 N   ALTER TABLE ONLY public.garantia_fiador DROP CONSTRAINT garantia_fiador_pkey;
       public            postgres    false    207    207            �           2606    17111 "   ingreso_egreso ingreso_egreso_pkey 
   CONSTRAINT     `   ALTER TABLE ONLY public.ingreso_egreso
    ADD CONSTRAINT ingreso_egreso_pkey PRIMARY KEY (id);
 L   ALTER TABLE ONLY public.ingreso_egreso DROP CONSTRAINT ingreso_egreso_pkey;
       public            postgres    false    208            �           2606    17323 '   persona_natural persona_natural_dui_key 
   CONSTRAINT     a   ALTER TABLE ONLY public.persona_natural
    ADD CONSTRAINT persona_natural_dui_key UNIQUE (dui);
 Q   ALTER TABLE ONLY public.persona_natural DROP CONSTRAINT persona_natural_dui_key;
       public            postgres    false    211            �           2606    17113 $   persona_natural persona_natural_pkey 
   CONSTRAINT     c   ALTER TABLE ONLY public.persona_natural
    ADD CONSTRAINT persona_natural_pkey PRIMARY KEY (nit);
 N   ALTER TABLE ONLY public.persona_natural DROP CONSTRAINT persona_natural_pkey;
       public            postgres    false    211            �           2606    17115    persona persona_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_pkey PRIMARY KEY (nit);
 >   ALTER TABLE ONLY public.persona DROP CONSTRAINT persona_pkey;
       public            postgres    false    210            �           2606    17117    politica politica_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.politica
    ADD CONSTRAINT politica_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.politica DROP CONSTRAINT politica_pkey;
       public            postgres    false    212            �           2606    17119    telefono telefono_pkey 
   CONSTRAINT     _   ALTER TABLE ONLY public.telefono
    ADD CONSTRAINT telefono_pkey PRIMARY KEY (nit, telefono);
 @   ALTER TABLE ONLY public.telefono DROP CONSTRAINT telefono_pkey;
       public            postgres    false    214    214                        2606    17121     tipo_activo tipo_activofijo_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.tipo_activo
    ADD CONSTRAINT tipo_activofijo_pkey PRIMARY KEY (codigo);
 J   ALTER TABLE ONLY public.tipo_activo DROP CONSTRAINT tipo_activofijo_pkey;
       public            postgres    false    215                       2606    17123    ubicacion ubicacion_pkey 
   CONSTRAINT     Z   ALTER TABLE ONLY public.ubicacion
    ADD CONSTRAINT ubicacion_pkey PRIMARY KEY (codigo);
 B   ALTER TABLE ONLY public.ubicacion DROP CONSTRAINT ubicacion_pkey;
       public            postgres    false    216                       2606    17125    unidad unidad_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.unidad
    ADD CONSTRAINT unidad_pkey PRIMARY KEY (codigo);
 <   ALTER TABLE ONLY public.unidad DROP CONSTRAINT unidad_pkey;
       public            postgres    false    217                       2606    17127    usuario usuario_nombre_key 
   CONSTRAINT     W   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_nombre_key UNIQUE (nombre);
 D   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_nombre_key;
       public            postgres    false    218                       2606    17129    usuario usuario_pkey 
   CONSTRAINT     S   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_pkey PRIMARY KEY (nit);
 >   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_pkey;
       public            postgres    false    218            �           1259    17130    fki_     INDEX     ?   CREATE INDEX "fki_ " ON public.cuota USING btree (id_credito);
    DROP INDEX public."fki_ ";
       public            postgres    false    197            �           1259    17131 
   fki_  asdf    INDEX     N   CREATE INDEX "fki_  asdf" ON public.credito_persona USING btree (id_credito);
     DROP INDEX public."fki_  asdf";
       public            postgres    false    202            %           2606    17267 /   activo_fijo activo_fijo_codigo_tipo_activo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.activo_fijo
    ADD CONSTRAINT activo_fijo_codigo_tipo_activo_fkey FOREIGN KEY (codigo_tipo_activo) REFERENCES public.tipo_activo(codigo) NOT VALID;
 Y   ALTER TABLE ONLY public.activo_fijo DROP CONSTRAINT activo_fijo_codigo_tipo_activo_fkey;
       public          postgres    false    220    215    3584            '           2606    17285 H   adquisicion_activo_fijo adquisicion_activo_fijo_codigo_departamento_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.adquisicion_activo_fijo
    ADD CONSTRAINT adquisicion_activo_fijo_codigo_departamento_fkey FOREIGN KEY (codigo_departamento, codigo_unidad) REFERENCES public.departamento(codigo, codigo_unidad) NOT VALID;
 r   ALTER TABLE ONLY public.adquisicion_activo_fijo DROP CONSTRAINT adquisicion_activo_fijo_codigo_departamento_fkey;
       public          postgres    false    3564    203    203    222    222            &           2606    17280 >   adquisicion_activo_fijo adquisicion_activo_fijo_id_activo_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.adquisicion_activo_fijo
    ADD CONSTRAINT adquisicion_activo_fijo_id_activo_fkey FOREIGN KEY (id_activo) REFERENCES public.activo_fijo(id) NOT VALID;
 h   ALTER TABLE ONLY public.adquisicion_activo_fijo DROP CONSTRAINT adquisicion_activo_fijo_id_activo_fkey;
       public          postgres    false    222    3594    220            (           2606    17290 @   adquisicion_activo_fijo adquisicion_activo_fijo_nit_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.adquisicion_activo_fijo
    ADD CONSTRAINT adquisicion_activo_fijo_nit_usuario_fkey FOREIGN KEY (nit_usuario) REFERENCES public.usuario(nit) NOT VALID;
 j   ALTER TABLE ONLY public.adquisicion_activo_fijo DROP CONSTRAINT adquisicion_activo_fijo_nit_usuario_fkey;
       public          postgres    false    222    218    3592                       2606    17147    cuota cobro_id_credito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.cuota
    ADD CONSTRAINT cobro_id_credito_fkey FOREIGN KEY (id_credito) REFERENCES public.credito(id) NOT VALID;
 E   ALTER TABLE ONLY public.cuota DROP CONSTRAINT cobro_id_credito_fkey;
       public          postgres    false    3555    197    198                       2606    17152 <   credito_bien_garantia credito_bien_garantia_codigo_bien_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito_bien_garantia
    ADD CONSTRAINT credito_bien_garantia_codigo_bien_fkey FOREIGN KEY (codigo_bien) REFERENCES public.bien_garantia(codigo) NOT VALID;
 f   ALTER TABLE ONLY public.credito_bien_garantia DROP CONSTRAINT credito_bien_garantia_codigo_bien_fkey;
       public          postgres    false    199    3550    196                       2606    17157 ;   credito_bien_garantia credito_bien_garantia_id_credito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito_bien_garantia
    ADD CONSTRAINT credito_bien_garantia_id_credito_fkey FOREIGN KEY (id_credito) REFERENCES public.credito(id) NOT VALID;
 e   ALTER TABLE ONLY public.credito_bien_garantia DROP CONSTRAINT credito_bien_garantia_id_credito_fkey;
       public          postgres    false    199    198    3555                       2606    17162 /   credito_empresa credito_empresa_id_credito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito_empresa
    ADD CONSTRAINT credito_empresa_id_credito_fkey FOREIGN KEY (id_credito) REFERENCES public.credito(id) NOT VALID;
 Y   ALTER TABLE ONLY public.credito_empresa DROP CONSTRAINT credito_empresa_id_credito_fkey;
       public          postgres    false    200    198    3555                       2606    17167 0   credito_empresa credito_empresa_nit_empresa_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito_empresa
    ADD CONSTRAINT credito_empresa_nit_empresa_fkey FOREIGN KEY (nit_empresa) REFERENCES public.empresa(nit) NOT VALID;
 Z   ALTER TABLE ONLY public.credito_empresa DROP CONSTRAINT credito_empresa_nit_empresa_fkey;
       public          postgres    false    200    206    3568                       2606    17172     credito credito_id_politica_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito
    ADD CONSTRAINT credito_id_politica_fkey FOREIGN KEY (id_politica) REFERENCES public.politica(id) NOT VALID;
 J   ALTER TABLE ONLY public.credito DROP CONSTRAINT credito_id_politica_fkey;
       public          postgres    false    198    212    3580                       2606    17177     credito credito_nit_usuario_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito
    ADD CONSTRAINT credito_nit_usuario_fkey FOREIGN KEY (nit_usuario) REFERENCES public.usuario(nit) NOT VALID;
 J   ALTER TABLE ONLY public.credito DROP CONSTRAINT credito_nit_usuario_fkey;
       public          postgres    false    198    218    3592                       2606    17182 /   credito_persona credito_persona_id_credito_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito_persona
    ADD CONSTRAINT credito_persona_id_credito_fkey FOREIGN KEY (id_credito) REFERENCES public.credito(id) NOT VALID;
 Y   ALTER TABLE ONLY public.credito_persona DROP CONSTRAINT credito_persona_id_credito_fkey;
       public          postgres    false    202    198    3555                       2606    17335 4   credito_persona credito_persona_nit_solicitante_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.credito_persona
    ADD CONSTRAINT credito_persona_nit_solicitante_fkey FOREIGN KEY (nit_solicitante) REFERENCES public.persona_natural(nit) NOT VALID;
 ^   ALTER TABLE ONLY public.credito_persona DROP CONSTRAINT credito_persona_nit_solicitante_fkey;
       public          postgres    false    202    211    3578                       2606    17192 ,   departamento departamento_codigo_unidad_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.departamento
    ADD CONSTRAINT departamento_codigo_unidad_fkey FOREIGN KEY (codigo_unidad) REFERENCES public.unidad(codigo);
 V   ALTER TABLE ONLY public.departamento DROP CONSTRAINT departamento_codigo_unidad_fkey;
       public          postgres    false    203    217    3588            )           2606    17308 1   detalle_activo detalle_activo_id_adquisicion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_activo
    ADD CONSTRAINT detalle_activo_id_adquisicion_fkey FOREIGN KEY (id_adquisicion) REFERENCES public.adquisicion_activo_fijo(id) NOT VALID;
 [   ALTER TABLE ONLY public.detalle_activo DROP CONSTRAINT detalle_activo_id_adquisicion_fkey;
       public          postgres    false    3596    223    222            *           2606    17313 *   detalle_activo detalle_activo_id_baja_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.detalle_activo
    ADD CONSTRAINT detalle_activo_id_baja_fkey FOREIGN KEY (id_baja) REFERENCES public.baja_activo_fijo(id) NOT VALID;
 T   ALTER TABLE ONLY public.detalle_activo DROP CONSTRAINT detalle_activo_id_baja_fkey;
       public          postgres    false    3600    225    223                       2606    17197 %   direccion direccion_id_ubicacion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.direccion
    ADD CONSTRAINT direccion_id_ubicacion_fkey FOREIGN KEY (codigo_ubicacion) REFERENCES public.ubicacion(codigo) NOT VALID;
 O   ALTER TABLE ONLY public.direccion DROP CONSTRAINT direccion_id_ubicacion_fkey;
       public          postgres    false    204    216    3586                       2606    17202    empresa empresa_nit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_nit_fkey FOREIGN KEY (nit) REFERENCES public.persona(nit) NOT VALID;
 B   ALTER TABLE ONLY public.empresa DROP CONSTRAINT empresa_nit_fkey;
       public          postgres    false    210    3574    206                       2606    17207 &   empresa empresa_nit_representante_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.empresa
    ADD CONSTRAINT empresa_nit_representante_fkey FOREIGN KEY (nit_representante) REFERENCES public.persona_natural(nit) NOT VALID;
 P   ALTER TABLE ONLY public.empresa DROP CONSTRAINT empresa_nit_representante_fkey;
       public          postgres    false    3578    206    211                       2606    17212 7   garantia_fiador garantia_fiador_id_credito_persona_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.garantia_fiador
    ADD CONSTRAINT garantia_fiador_id_credito_persona_fkey FOREIGN KEY (id_credito_persona) REFERENCES public.credito_persona(id_credito);
 a   ALTER TABLE ONLY public.garantia_fiador DROP CONSTRAINT garantia_fiador_id_credito_persona_fkey;
       public          postgres    false    207    3561    202                       2606    17217 6   garantia_fiador garantia_fiador_id_ingreso_egreso_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.garantia_fiador
    ADD CONSTRAINT garantia_fiador_id_ingreso_egreso_fkey FOREIGN KEY (id_ingreso_egreso) REFERENCES public.ingreso_egreso(id);
 `   ALTER TABLE ONLY public.garantia_fiador DROP CONSTRAINT garantia_fiador_id_ingreso_egreso_fkey;
       public          postgres    false    3572    207    208                        2606    17222 /   garantia_fiador garantia_fiador_nit_fiador_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.garantia_fiador
    ADD CONSTRAINT garantia_fiador_nit_fiador_fkey FOREIGN KEY (nit_fiador) REFERENCES public.persona_natural(nit);
 Y   ALTER TABLE ONLY public.garantia_fiador DROP CONSTRAINT garantia_fiador_nit_fiador_fkey;
       public          postgres    false    211    207    3578            !           2606    17227 !   persona persona_id_direccion_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona
    ADD CONSTRAINT persona_id_direccion_fkey FOREIGN KEY (id_direccion) REFERENCES public.direccion(id) NOT VALID;
 K   ALTER TABLE ONLY public.persona DROP CONSTRAINT persona_id_direccion_fkey;
       public          postgres    false    3566    210    204            "           2606    17232 (   persona_natural persona_natural_nit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.persona_natural
    ADD CONSTRAINT persona_natural_nit_fkey FOREIGN KEY (nit) REFERENCES public.persona(nit) NOT VALID;
 R   ALTER TABLE ONLY public.persona_natural DROP CONSTRAINT persona_natural_nit_fkey;
       public          postgres    false    210    3574    211            #           2606    17237    telefono telefono_nit_fkey    FK CONSTRAINT     x   ALTER TABLE ONLY public.telefono
    ADD CONSTRAINT telefono_nit_fkey FOREIGN KEY (nit) REFERENCES public.persona(nit);
 D   ALTER TABLE ONLY public.telefono DROP CONSTRAINT telefono_nit_fkey;
       public          postgres    false    214    210    3574            $           2606    17242    usuario usuario_nit_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.usuario
    ADD CONSTRAINT usuario_nit_fkey FOREIGN KEY (nit) REFERENCES public.persona_natural(nit) NOT VALID;
 B   ALTER TABLE ONLY public.usuario DROP CONSTRAINT usuario_nit_fkey;
       public          postgres    false    218    211    3578            �   u   x�U��
�0�o�"_ ��V��C���˲Ia!qK���Ş<�0/M��3qm*��:LU�6+j;���Zb��h�tQ�UG#�׭q8�k��n�?#�ď(��-����z����'.      �   �  x��UMs�6<S��MOMFrAR�,�$S����Xv�g:0	�HA@H'��?%���Ln=F������H��x��}�`�AĢ���/8לJ�
+��4�.��Av<=9���<:�{�I���E��S\a�ND~.��^̂)�ߡi#.�p�5"יQ��БXX��)�2;�7c,�q�ka%WH�WR�\r���0bTT������HW�"��o��9̈14P|��?�0R��#�z,� ��ƹq�@w��#�4��&ǽ�]�I������Ěy�KY��5��H\��I�3��0�_�#N;�`�нh]MNr=��'�����Ѕԥ��~~�y�94�+��\#P�Kci4Ӹ᪗+h��O�vӄ&7]*xq��J�dB!Mw߀�+�t�nSG����I��yQc:��$g�4zϵ�ST�uI�z�E���l|:��x|���v��qL��M��M�~h<WTJW*kh6:Q�����7����@v��kO8�~,k	�,����u.R���4k@ִQ��+,x�}ߵ�e\����cLY��%�ki��+��P�����?[)��s�;��E��^KZ�o�ء!����@Í�5W]�F�ZXQ��8M�3��7ϕZe��[�� ��v���/��ܩ���.t�Fh�ƭN���q[7�*�I ���_M��SOV_���w��BH�8��%��AJ��أ��a��e��z_x����d`H��k��Z����n94����c��,aV�#S�A��:��Z����p���<�q�K��xwy~r��IH�]�T|l��Oܝ߰:JQ��:O�Dx"�����N*(Y�e�A�~pK�7D)ͣ�6������m��%��jZy�)~)��R���gk��R��s��Q�ZZ4��@��_烐s�\;��7�mA��z������tK��ݖ�i_�端��mSl�|R�)'�R~���4����8P��� ��#���p 'h��ڻ���<^�B6sY����O�F�|�����zA�      �   �   x�uѱ� ��E���袃����꠩ɱ�\ʕ4�9ʚ��Yј�^�y�ٳl�00�Á!UPUt&o�S�����a係T�=7���HR��B�E#j��zI�x�x��MW���������w	      �   E  x��R�n�0�/Oq@Ql� #��@*TE����X�Ub�&���7.$$�:X�u������I�*3!���)�P��C��0�\��/�A)���!o7L%F�����3��0�Q*-㎺_�v���;����RJ�̙ts��Rc�E>�ow�XE�n2��Ji���M�p�L兒B�c�x;����z�'1�$QQּ����Hm;������X�*�cY;�t �:lF��w���07�o�i+�[�uu?�_���X��9����q8ޮxzH��*MN��	eƢ5���]0�d6{�Z�>4�=f�&Ҋ뗷�?��}�7"� e      �   V  x����j�0���w��H�eˠ���e7�����fk�f��;���#a�<"�EK�qy<O𺛶o����1��"��(�a<���6}����!�0)�
�����
g��$�@
��F:�XI�"�P���q<]��E�HH���U��#�I���X7��e�p�Qc���X��i�_.��-G�1����07����J��Fi=Ѱ�<t�J���,��eX�e+�&r\ԟ6
�.�UF"U�|#,�-�F�A��L�LZ��P�\�і����^�h�����z���MS&�Z�kJ�)k�Ɍ�Έ�8��~�i�������無��2�ڂ�1��]�4      �   z   x�M�A
1�us�If��.n�,h��x~3�H]>��'��[o��ݟAr��1j? e�&��ã����he���۫�\�d��G�H{s�,��Ĺ�&�o���+����� �� ?X*@�      �   ^   x�e���@C�0Ld�	�.��pJ�a
˲߲YYT�>������Y�@�wB��1o�~���.N��D�9|&��1�x���^���E��r)      �   �   x�e�A!���M7��_���Xpf��x0�J�L("&A6�N�d�9Is+2Ű�r��cH�;3E\c�g\�W0	!i}���=�K�b*
�%�"F��D�v�B\��|��������֋fg�$:%�?��04<B      �   N  x���Qz�(E��؟��M�
�����r��r9Ig���@$JTݢ�����_��y����������n�8��N� �I�&�����i��I$;�Y@�}:��N��\�9ɣOq�R����ɰ[�����d�-�N��r6r�-�N�e��i�L,/��V�#��\��ݠi�ӷ)������%�e������`��8��A���irr�-9�H3�,��N�<J��1���ḍ�9Q�#Q�#Q�#Q�#Q���������	1�#Q�#Q�#Q�#Q�#Q�#Q�#Q�#Q���������	��?��p��^�y��_4>Lx_�m�E�ê�Zn�/��G[o�/Z�g�u��_����u��*����پ��6�Y����k��V���f�n���ϯ~���3?6O���0�K	�,	$XH�@�$�`I��R�K�$,Iy��[	߭��V�w+ổ��?f�*�W~�[����>ݰM}\����<��p��~��>#.�ۯj�l����R-M��N}v\zO�%���=JZ�~�w�gx~\������Cp��Ǜ?�SN��;�S�����i�-������e�a���~~��n��������{k��������}�͹{�ߟ>�h�_���Gl\��톯���6�����+Ֆ0��Y����'"�{v�|ݗ�yYjioG��M�a�F��/uK�$?{��Im�w;&v��O-�/��i�{��p�ׯ��t�M�G%M"I4�$�$�D�HM"A�D�hI�I�K"I4�$�$�D�HM"I4�$�$�D�HM"A�D�hI�I�I"sq2얫�a�ܜ�-��a�%9v[f'�nKv2�,N�ݖ��i��mp�mq�v[h�U�k�$1�I�$y#��@�7I� ���h�D�	�K�H4A"��DW�$�H4H�h�"� E�A
A�D��)!�H4H�h�"� E�A�D��)R$�@�H4H�h����O�&L���Gv{�^��y�;������8�}�������n���[c]�s��q��
���o̒J�mo��>*�-OM>u������[M��ޚ���7���wG���H��T�c�W�ގƋ��k����o,����]ς�z�����_���Zغ|�k	���)s/17�s�.�දۧ=Wߦ�J�$n҃_g���x��͏���:_��x����Z-E�NѨS4��v��3r�hC��<���@�oy���5�������;o�'����@�>��������c^�1/ј��c.^���WjH����]#g��A��949�V�>)�}L+B�n�_�������f����"Sn�)�Ȕ[d�-4��r{k�>���Pv�r�ӥDc,�K4����cK�Ft�a�Ո�$��J�$��J�$��J�$��J�DWFd%aDVJ��0"+	#��0"+	#��0"+	#��0"+	#�� ѕ�YI���-w|���.zD �F �F �F �F � g#Qg#Qgb�F��F��F��F��F��F��F��F��g#Qg#Qgb�F��F��F��F��F��F��F��F��g#Qg#Qg�ڢ�-�ڢ�-�ڢ�-�ڢ�-��"���Hmш��HmqiN����ɰۚ�����3�e'�n��d�m]�����a��9���N��n��nm���%'�n��d�m�N�ݶ�ɰ۶:95as2�'�n[u2�5#�݊��[qh�^�r��#�g,�p�k�b�~lT���c�s�����x��ݦ��W_/�_������n���Gq�e�})���\{����z�T[m˔�e���w+�b_8��X^��d'c���ɘ�eu2foٜ��[��1{Kur�4�ə�LN����9{������mp��JT]&��A��䕻9y%oN^ٛ�W�fD�7G��9��)�#��I�H�8G��9�<Α$r�$�s$��!��I2�H�9 �s�$�s$	�#��IJ�Hr:G��9��Α�u�4�s$��#�쀰�JST<t�����;��;��;�����DpGA�DpG"�#ܑ�Hw$�;����@tG"�#�Q��#ܑ�Hw$�;����DpG"�#ݑ�Hwĕ�#Yj9���#Yl9�Ֆ#Yn9���#Yp9��!]r9�5�#Yt��#䢃.\$�H4p�h�a�"B�"B���."."."��#��Ɛ#��ΐ!��֐�ת�����������y{�}峽9��t�{?��}��|��X$u�M�V=$Z�����s����g������Eӻ��R�6��ڠ�my��[9B�o\9B��\9B�o]9B��]9B�o^��G�}&�|�y�I���^�l��+'آXF��+X���KX���kX��X��«X����X����X������C�+Y���,G���Z�#xhx1�=4�����rV.���22"ddD�Ȉ��!##BFČ�22A��;�B�#��;�R�#��;�b�#��;�r�#��҂�#��;��8��ğR���M?ڵ�9�L�k?��)I��mK�����T&������4V���r���U���{
��;ng���/D�ѭ<'��ѽ<'����<#T��n�#�hx;�T4���*J%��AE���DPQ �(T�**�U�*J%��AE���DPQ"�(T�*J%��
r%��AE���DPQ�açl,~�m�}?���-�����^[z*6_�M�&�bQ����DPlA��DPl"(6��M�&�bA����@Tl"(6[�)6��l��l��l��lEG%��lE�%��l��%A���@.[D�-"�d��E�"�lA�� [@�-"�dK��d��E�"�lA�� [D�-"�e��E��E�"�lA�� [DX�AJ� %D� J	��R"ȥ�RB)!��AJ� %D�"H	��RB)!���(Gr"ʑ�r$g�ɡ(Gr*ʑ�r$���(Cz2ʑ�r4lX�<��H��8��9��d�#9��H��8��9��t�#9�cH��8�:���ѩ��킆k��a�Z/hذ�6l��tAÆm��3�ɎN��5N��5N6�F{ٰ�6l���[����̙.�Ln�tagv3�v�7S��z�����Vg�%^��J��U^y�D��9v~��?5)ut1ǉ�����W�e~M�I4ݏ���}���8�t��_ �o�·n�[G�/��[G�/��E���y7#�nF�݌Ȼ����&�I�xR8��|�Ox>ˈ�������s��s��s����#����#���$X��e�!]�&b���<mx���W��j��<��CM��ȋ�r|���W!ѯ]�u�_%�Y6�_%�Y6�_%�Y6���,+��!-.��!-.��!-.��!-.������`H����`H����`H����`H����`H����@��!-.��").�N�mq'�Z�}q'*;���������O�}fDCE�}f�"�>S�"�>3�Po�B����!T��>Kǌ���I����~U���W��d��~���7n�c�������nM?�6]Ƅ��B����y����!���~���}?C�q�!ĸx��b\���
����jH����jH����jH����jH�D(���!-�*��?�����俥      �   r   x�u�K
�@@��)z��s��B
�e7!F	v������|���a��=w���<C�<(�R�>��pu+�k7���Jx�'���#QQ��g�6	zy��q��������_�qV�,W      �   �   x�M��� ���c��bKt��?G���+!�)�_$`X�p��N��G�6Ѕ��:lJ�aޛ���Z���_�;�y�K��GK:S����~2�ˢY<�Q|��*�
���*�0�����P�/D����Cn�>Zk_�>Y      �   �  x�uRˎ�@<�|EK{���ʉeQdɱ�e�S.m�EHx�`���|C~,=~-�]�������+�L�{��j�T�҃53(�Gx���a2En'���Q�Jl[�B�vQ�1�!ќe���G��J�9��U�uUW̟�sG�-5���9�i����z�[�)��c|g������K�����?�R����V��Hp�B�~$V��=*�'4U�/�������2�y|�\|Z�kݩ�n�F\�ӛuh�d��/:���2aNp��U�:��'g�PP������>%*��A���--�VQ ���%��_J���Ϧw�@֌V�ڒ܋�.�J�~٬aY�G�ʋY���r��"����/P8<m�-�_7��\f��%?y�����d���պ�B��i�$t���I��nl��q43��Q;�=��N/�vP�7��w�a@>&�0�k�i�q1'^��g �r���9��!      �   �   x�]�1�0E��9Ae;i���b�	ԉ�j2D�)J*ΏS!��V��� @ ,b� ���C�cH��5<c)�����$U�TI�}?Ϝc��C�Ӗ��f��qHu:��ľ9��
��4�[;j�4�C��4��;�p��w)Xye�kH�N'+��5��z��˖��i��[����*�>�~@y      �      x������ � �      �      x������ � �      �     x�]�Kn�0D��a��G���"˶A����Q�6��@��#����"b2�ɂ�����s�o�1NehS8J����E��]�=>�G�S���Gւ���`��<�<��6��g��u5��U	 ��� ��<iIO���G{6a�'X�H�g����A����fK 9�z1XN�����<�Zm�P:8ˑ ^H�p�+�Dc�D1��M�7����Y#ŅA�����S�dg�f#/
�����$��2P���C1ߞ4��d�3��S��sS)R�c��dgA��e1-#����Ƕm�m�      �   n  x��U[n�6��V���|I��x��I�L�c���l�Ɏ�k���^2q�FAk�6l����0%;�6 (�� �%��1�u��������"_E��kd7�����K��oV?o�/.��_֠j�Q�T���A�~���z��ɍ�cg��&B�ѝP?�����Z�
%-+2�����4<�_�}��{f�t�}���oQ%��AԢ#�ʘ�i�~a@uP��_�]�c'0�z&��V�M��d�MR)DU:3U B�s�zvqt���.�[�&R��D���R#b�(5�/���G����x?����K��6�H�����M�Γ�<���o�ުn3M�Uk����i�4ls3�ɧ{7����j�Q)��R�e��OJ���v!�|맯��ҢV���e[!7EO������}���7~�~w~dW��/�����NS��X�Ħ��hC�f���7~��]Dm[J��$���h)d�eCJ/�-�-yI�)��i�Z�Z�
,�Am)��g���CGt��҈��;<%��r:����|P�����Pn�t�#�7��Dˑ�������55�\��4�+�����s�a`�qH����C�*w[U�m�A�i�4C�!G4��-��eh+�@cGL����l���p{7>��١+8l��G��q��SK�~4]��#6�`��w��@=+V\ŝ��t���9��sX[ݴ�L�Z�P��y���sp�&��8XVd31x8�8Q��,��5f�l�붖1Xϻx�ޓIk���Z�����[H���~�ã����mp�հ]f�ѸL��%����H�O~v�Jsli�5m��ť��g�#�#q9���W����< ];U��CUU�L��e      �   �   x�u��
�@Eי��&4�.�vQG|����0A�(�.9�a���TII����	�Ffތ Qmi��}kE>��v�
O���מ������q=��a�_���1�gI������/�}�"��ؕR�}�:�      �   �  x�e��N�@���� ���qAp����q�E��6�J���o&&%b��|�x��z�_/�,��E��"����&���"`�� -������na�	!�Z!#��"�n�k�Jz��D�+8���M!,�w&����������0Ƀ�ƙ�s$L�hN�O��~u�+$,_o*��Mpډ��1[c<���� $��-�������pO�3,���Ň��FR*��(OÑ�~xR���M ��խ���}�DK�0^.l��2�� �LD�H��x��nM�ҔbÂF?Y��,bj"���)�!�,�Ae����-PoP��9�9��4C� �Y��<C@DB�� ���>��,`���<l��(�=      �   �   x�M�=n1��S�(�W"�H+��UD38e�]�3�9Nʜ��eV���>=?�7���H�%�wf��]�2*��a�l���]w�f-1C`15�,���+��9`�eU��=rDe��*g�٨�C�����$TtI%P��O���[8<��=��b�I�<UeWT2<7���p�ާ5:��w��X����
7����8Q���e65�T����ŉڇ&ҁm>�f ��u      �      x�}}�r�ƒ��|������eY
��H<���n�&L��np�ň��(gy^L�nbvz���ef�
%O(�`%�@�~2���}��~\��c��ퟧ��>%������1�u�NHtיnY�����cw:,_��S{x��YP�^/_���y�R�ތWק��)�b«n��5��/�_�qTZôO���K�����0K;��~�^O_�K?˛��I?v�����WԽSw��B�w���i�����q����Շn��b�F��{Xt�r��t����q�?�����祻tc���A�@?���v�7�������a���t�tu3��"_�ݧa��idT��}�Nԉ�N���|ꎓ̡+�p������J�4����Cw�F�MW�>/�KX��E(��;,w�'��~�N�A��p�>h^>wÅ�N��ѯ����}/�|�oK���*q�b��a�LB,����9������D}[����B�DW�J;�\.����Uz�S���q�̽�`NO�5͗�f̈����rJ�{�r�x�zO�{?}�U1^݌�N�,����3�P!7<�o�ϴ`O/��֯�뱛2�9����?�@�o3^'�|��~|�DY�N��D��崤�Xt0i_�X�χ�����K'ˠH��������kڲ4࣐0n�G�#�a�������O:Å���y�O������p�o�0� ^��%x��S`�h'uw�tR��a:���v���r�a8	��n��X�É�}��~��\dF�tJ��4A��r��l?��w}�L'#ѴT��K��؝p�J_R�K��&���{һ��h����\'��˓e�ߜiCOJ)7�d���f��������=�6B�.�=��MR1��A�E.�^1�e��3�)V��}���+��l����e���^t����\F��N��Ab��U��|�d@k��b�'�j5��O�j$� ��uxk'O�\�X���ПE\�{����{�4;��i�J\���2X5�L]�W~s�%Z���2�<�v�#ޱ���W?�͇�|����o�����4�X5XP4T��à���<��od1���ńn#��sw�;Zb%�����5���[/�>ƣJ�f��YU?3��_��?)Chh����%n�~���$�lӯk��9tg�T+��~8�g�B��_��k��X~/�E�Ub�o����v��+Z���o�7�|�����o����J�i�C"i���Fi ^����e ��	�����aԓ���2��v��l8?/"�iUAf�j
�2��`��LW�#a��e�x 噲~�/(E��}��*f6�"�σ��,�e�@G_����-�L�����L$�/���f,�ï~���t��+gQf�e��?���o�e���� &S �~�������U4��KU��k���F�E*>�i�^�ry�F&)#��4f��u������?�f$�B��5K�������q�"�R���ۄt��X�G:#sw/�j�p��f��O}�~Y�c�����|���N�i���5 ��f��@(Ko0��u�O����Ы��z���F��<G�'��8٥����0�5w_�ĿS�qJ�"!a�_�PN@)��o�3�z�T�s�m5�A���_��vRU,���U�XG���5σt���W����kix�����4�7��_�W�0���}�U�hX?�g����"T�qx�Ǌ�y�������շ]q�~"�Gǎ���COk�^E=|62�8�G��v;^��b�I� ��=KP�j���̰�Y1K�A_����j����t�&����O�V�k3�ˬ�͓ˌ���TB��M��Ҿ�N��0���cP9k����{!�ɞch�� �(҈�A?3H��{��%�ک��l�P����OPf����
&�0��'��9M	�/$����ξd_��h��aw�[���t�`�:��U&T�8h�
�M0��Aжh�7�m��P˺���¦�-^V#��xKEү)�k��s�
�E�*�v�M'��d�/W�Al���Eal*��^�^��@B�6���s�$�3����knP�i&AX��y:��{T2�Ɣ*��O˽6Y��P���w�MGåx��_��<�t�����-!��I���<X9IGB<2U�ؙ��vf�ռ<MҮ��	%�֬eïcQˎ7��~-���\��'N2m������q�㠬���hX�v-���y�f4�5�9����w9�R�]Jh� 2XHmd��m���h���ڤ��?0kP�[;�R'� 5m폴4�[����'٦"�$-\���R�_�:؇���2�*\�Cߝ��:��]74��ߜ��&Ͼ�
s�7����n'R�Ԃ4)_~�� �A��>���>]���|%kX��o��:�?��:أԂ�B5/6uxJ�8�)]X�����(#fJ���+-.aQM��`�v3vj#��haZX�;�`�����X�����+m3N���Oz������I!�Nu.��a�6\�!�om0������}>�:�odU�������J���=������3P���e�qJ����@��A���rY��W�b�b��45�.ۿЌ�O�K4���.��.�K�W��\�9>�� b��"6�Z@�6Ƨl�-�z��8Q��j�aϡ� _u�!J.��髎�x�LP0+"^�/�=P��GB���>	b1���� h�$���Mg����+_~�gҖ�Gm��!�۟7.�D�|b�2o]L߹���J������o�t:~y��ͺ|i^'��ΛH# B��DC�H�y����݃���\(�R�v�u��'W��lPrj�p�R0F�����(��,�s�CI�D 	���dK�Ub�5A4
0S�5X��M$�<z��8����5��<�ʀm�&�Btb�'S�@j�p�Al,0Dx��,0��҄]�T��k�7��tȜ�3W�0cX�h�ɷ@Dd&V�<[��*�ĕ`�
ve��e�υL2�`Ԍu��)摑#c].܆��较@�\�6D Y����]��\� ���t:��wB=tj��S+N�����u�m���_����V��4��11�G9l7��<���f�����,1��z}��)�GvݯK��#�ǰv���E�$����t�\`����[$�vwJ)"���u���.��c�U��_<��*��ݒ����0��g�S�@.��VL�k�5���,����%9�(SR��sXB�0����LSq:�}��=T�#x#���)��J�p>���S�7���~�OJ)�V=L��B�����1���%��#��IW�:Ӯ��N���P�*�3�p����3��+qv��c��N�3��;ww���!p�<Յs������͇����z��N�pi�K5��P}#��$�%�پ��/b�F��i��ڿ��j��E|�y�5��;=���t.�7^��j���~�3�M��7�m4�9�h���fE�5�퓴j�I���1��}B����[�0ʕ�g�QZ��<I���σ~�F>���N��Fz&i�d�о�e��K�=�V켿c��^B�U��G�һ�p/<�b��D��㤝k٧O�����B�����.Z!e�m-G�����ǃ,���wToIڎ�A�*;��~��r�F�?��AX���Z�6�8�)8��!r?�020	�{��u�)���o9l�9J1�\
�]L�Ά��l�>rЃ��D�̡��4�+��O����@�2�0���'�~TB��s�*2���T�'���Pn�?�N��n̖9�Л��h�f���M8�����i�\\?�]�y8�PB�����i����a�dѦϮ���b��<��D+Ρ_��Q�܆v[��:7�d kY1V�,����3�⢩&=G)U}ss7���]?�̡��y6̄O���ެ.�ς&s q6�~�^CO�q7�a ��3K��� �k���2��)�R�d銓/��7B1S�����R��>t3�r��0j)��Å���P��0��K��=2HV����lq���9�@k���\@��47jP�A�=<%�}�@���
}����y��]^�:�)��Ԁp��-�`�LM�h�A]�3����R4��    �(�0(+�-�n�6����ۿN��+�+0�z�ә�̽>W ���0�X�{���Zk��;\ c\����adO~h��l����,�oH\z�46!~��p��м��oHJVi8�H����~p���"�E��� ���P�Ph�J�S.��|"}',����ZOb�*����;�B�0���|g��'�/��l_�t���?�\PLx��4��dC.�Q8Hb::y���~Q�e����~�"V �?,'5�V�`��<W�r;@���舆R��W���;V��?2S��Cd
���� ����]B.g!��.���6�x)�/$��7E���� ��-;@��/( �!�hH.��U�(��ކP���WI�Oa������P�k�ѹ�?����^o��;�␽S'�)�@$�'��4��4�zY��*
�GD;����eh/����]&�f�կ��@��}� �B¼���Bh"�X�LՇ���>	L��Ada@/�F!���^.p�� 1�yR�x��.��ۿ�Ý
������H�S!������t ���Y�TDا�)���B]�)�0�E��
CP��R Bm�"/D�2n�b�Xjӥl�Խw�](��V)���@Q���P���SSvj�M̏5��'1uAB�i��Jݐ�Qwoc�a��*�J�b��ZP�~֮�
�g�ό�������b�"�0n��LBpA2@ᡐ8��"=��`�Y���Dk�:�
Շ#y&�)�B�Pȅ2���X E�PY���L��#��p`�N[�V�?�o�.e� Mؖ,�p&�?�`1 T��tG��R�;�:}|��_�N��ϋ�t��u�(�fI9�!��ݗA��Lr��	yK��"�eL)#C8S��I(������˨��o��|��aIV��?�̀e�D�j�=���4\O�y?Ĕ"B2K��I�'mf�v�{�F!ګ��Te�$� 	`(�����W&�Q��p�/������+��z��2��-<��6Y�ճ]#}h����z���B��'r:k��[G�t��Y*o{		*�~��^�b�
�����ѯg�rMҎW�۫�ڢ��b�5��X�����K%�S���`�S?��'���;�[���D�3��${�1�H�
��),	g7fc
�ٺ��Vf��^�������R�r����4|�7�ʄ� �}���m;��/�)�u�kՄ9J�y6����w󗕖p\�WW���h��ǐ�2��@sp�8/���b��y�)��:�HC�t��X�1�'Ze�E�ϗN)�y�@BeB:�����u�0��'�M���0�#C�PI���3&n46�/-(�xE��]�}[zP��Z��G! L)\ K3�NsZL<�$Ԭ���9�z���Z�q��r���-�]{%��^'V˯u�W��gD����j�m@7���g�ZRܵ��vxW!�P��kt�~����R��Р3�� ���H��Ӝ��6U�Ձ�L��S	�8����~>���<e��������[k�ru�rf�P
��n����#Bo��B���U�)�͙�n�h�)���q6��y�t��|9\�����5�v��������3-�v�_���J�`�w���>yu\S#퀹Q�zƌ$i[x�i�j��mh<����[�uo�*�H�w/
"r��f��i����䈴�>y0��tv�<�9I�*gH����	�6g��1g8O�FR)����C��u����E><��ys��y����\8�T�m��J�xs~F�S��O�(�|��_�oN��AH���G	�}�%�|��W����?����8ʼ/�Em]c���w�_8dC�p���ۿ��F{��Nk�e}b$�#���J� ��ӣ�Z�Z�����WC��\��n�)}d�t'���p��ȿ>�7$T	��9I����pY�N�bA~5g�4;s���e�����T��(��m8\$��D MIvU�����u������UZ`=��h���ܷ�\]v%� �ܮ��t??����y�	|�ci���~�*$����W4E��˳�t~J�C
���l��c��+�C�Z��|"e�^���&d9�R��Ćm�)`˸<kKl�y�7� �Ը]��_�̦�Dk�����vp�����۝eq� >>�gAkܭUO,Si	)M?�0	�8����������^�$�ᨗˍ�,��+�/��^&��_c����a{�}���ԘZ��MC�9�4K;����jo-�o�z|�;���l������q���G��ޕ�W�b��⺯%����V��I(�G��/M�,��h�>�`��U��M����h�H�҇u[*�$���wxn��b	D,a~�`JK�L'�y�C��nT�FX�\��(����j����yC�>v֋6xD�$^D�x��D��$rj�-a��:�^��m˙q	���?-P7K/��M��Դ[´���A�y�6ǝ[PO	�n���9��r��I�ՆA[b��<�����o�M���L��y�e�ǋ�v�ӟ�S�3�̻%lÔ�ٵ�G~-̽4����Pn�E�25L�0Lc;bc�Jjг�����<m��y�?��w�a���K�ǽn>�)�^����4T(�Q�y/E� ʤ,��f��z嘸�!_��p�D��X����A~ɿ�&����]��}}�7�	�'�_"��҂gWt]�5<��Yb��l0j��ሞ��J��*@�0�J��������~Qa���!�������e�!bI��rJ�I@L鷋l� ��㳎o�'`2�����:�>tW���d��|?�J�/��ԟz!U���D��FĨ�G�9wwl�J�fm[�� �M`�0	g�����!�}��&�R�T�JM>�l�Rk�<��8S�nhz��p�W��>	i#*RP/��Q|�L�l�R���,]����(��׊(��)e(�V�b,՘%%D���B\�8�jJMQ�
w2�j��7l}�t�M��`N�d��f�Sڧ�(]��(�F˞Ѕ��\j��.b6(S�Li���������g`U�Kʜ3(�.��jܻڇ68i"�/pј�Ԉ�F3W�LA$�/�4X�=a�t���/!'��/�U֚/%<0��I{-y�~Ys'�^��im�β:���fI¨lLa&�9q�ji.�y�`�Q٣�U�3�4�Q�������>��X-!5��)�_f��^�ɚHɓ`��)���W��C>1����v=�j-^wx�q4Z���܏F�5fV���ạ��pPs?��'�8�N�,�t��tj��7�h����~��z�T�D��>�f���Xip{]�7��B-�>��Y�%�\\��TAp?��S�Wi��U1r�1�vA����U��"r�2E��I�ԇ���RGJ���L̶�Cgw�a�%jW��p_��~���Ģ;	%Q��"�O�̻�n��˙E.��锆P�YxE��,�}�H�o��C��a�R�d�ר: �ʬ���<� oH���X�-�c���e��SI����⩄�y��'�W�i��D�f06l�@;o9�AT(Ig�m�+���6|&��F�ǁ8�U��I�Y3����Q�����Uj����bn�jon��{��h��i�n$8��y�{x8$q��֜v�!K n�W!�9aV>v�3���e\��֍F�&T
�[�/�3�Q�[��,F��|�
��8!U���8��2S� L�6cN�CIި��*)����5=�&�X��������(�B̑p��U{�R�<*L�&ݰ�Ҭ�j�"�p=1��U�F�'��Si�!�Ё�T���8��]]?/Bd��M�I�$A����k7j�Eّ�X�I�9C����U_�RCR�9�]U�Jr!h���ӊ�ɌוY�^M��e�<�`Hz��2F��^_�I����
�[ڼ�Q�~n8X��4�Uj/������*{H�
�aĕUqS�j��o��ᬥ�*�x${T�$gMV�%���;����obkK��B���j
 �M�j1r    �?�'-IP����˳�>k��!t�3�p��,��"V�"F[���;)�M��W�[T%�|f7*�eXX�H��1
��X��c|R�EAWR{n3�R�����m�]�}��^UI��#�(�+UI�	i?�:>�ģ
6������&i�2��	Bڝ|S���|m���K;7�.�"��2K��>I�A���+`�k:5P0�麦�8��X�T�4�� *�Y�� ���J�*�q\k�RIh�*E5��,X�Y��,�'m��x��Md����4|��D���$����0/P쓚�*15�����8z��m)�1��_*\�����/�l�J�w�ᵩ�˪m�
�=��WI[8)F��V�V�}ˡ�.���R�k}�*�ԦJ�g{��CDZe�~�ʳhYM\}U7o*�2�������+5�2����/PCz�iI�� �驷8�HE$�xw5���lmU&!<W?������c	���S��J��q�����nOx];�pB-�ЇN�[*~%� �S/�V�-WP�ٳ�]�V�G��xie���Buv�$�#���2���m�U��5�(���
~�k� ��㕷z��_����>�N�����%�#�Ai���T�}�]A����^�f���貧��P��;��7-O���}/k�wH�BZnm��KT�Z�j(:�綎KEש�RK�S4K�6@�^�)����H�J��z�{�k��z�"�S}��5ǉ�
"�׺��b�n�c���u�Ԩ����6������7�U@��m`e����i�����W(��z_n+5� Ҩ��Q�i��:,�'?Μ2$Xl��D��zn���\X�i���Z��<�c�Nh.6�3���<t)��?co�%ͪ-Mw��F[C	r�j���d�H`���Dc����k����R��}X�T��,ᢵ(1��j�{=����K�d��g¼ޛ�����Zw�7�㧉��_�Q�h�X_�lp���>qѦ㷿f����5�W��YĞL���M$ak(8�����c;��k�M�Q�[C�y�\�Pn����5.n1�a���P�~���2�Ph�ض��ʐ�Ƭ<\(*,��n)Gۮ'TE�d!��P� �%=�wa��(|xC*�L�)PS�$T�-<d�4s?��R
b�w�>���t�nS�J-�ͷ:�N�!_��,�Wj���ڕ��T�Q���T�������Ϊ�0n����G�)�����>��,I���JR[Z�E�����;*��c��ׁ8�gl}��{R���R���p�%�G�����i4�`->�険d�W-{S��`͞��l�g���pjx��b/p2[��Nk��5�|Ю�ܼ����/�"�D����(�Z��7Rk��j�Z��s:QSj�{c^�n���p�r��ѧ��ށZ�j�joכ�q��bJ���b;����|��rKD�{�I}f�ZXC�I+>�b[�C��F]O��YUu�j�r�����Y�'7�ɑDl��C�L���M�<���ͦ�Wc忘1�<��E��~O�6�/4)�l�����5i� R�cBL����P}'X�A	51*@�I�d�����:pR}��,p�#�N�A������3����&*�Q�<��\`C��C��k����k��1zVh�	#0����W�Ii<��z�_��~�O�*��[L�\���m��D7��>��,��5V�
�C?�']��vn֔�����WZN^�2��頃�Zg�I�l#��z[Җ�9&��&ģ����{������^�tR�O�3�����p/ߟ@�F�CP&�G�7$����R����e"���z1}M�+�c}�u���j0kĂ�P�>NBA��A�l��5���c��:�1L7)jm,U��4����O`Z�����_�'�<�:��$��[���-0�^5b���t6� ��Bp�^��z�ٟ�QJ\�IqQ�R��� �&��Ɨ���݊áI�f#p�W�h 4oY�� �p��а+��K�c\H���t��TI!����Z���=OŅ�62=t��I(�/�OQn���-����Y2�츚$�%X�5�`hP�u�R`�&n`���;�M�;��5��%�AKOf���h�k�>E5��X@��U)2m�L���d�2m� �Z����،�XpbXiD�z�����Q���РVA$��(+@(վF<s�{��� wš���֔?,���ْ4�--�Im�T�X��/�͠w� c7@����F��x 煉.=#�5�5w�I��ln����yͭɬ=2(�ԤF�&�}�L�����i�B�6��K�O��bq�y�w�"��C��5�$�ϗE^�
�l#Ȅd�O#��O�ԃ �&S#O �&��%�?b��F��M�XR�����-�|O\m:=�E�h2�@��O��=�g�>�L��qg�Y�y�$�N�G(�6��X3���&b�J6��L|C�<�7D-�KF'�U��C��rC׶����K�7ؚ��q�<�������
²�Y��|���Қ�!ѥL���1��U*���d� �(��M�Ym|	����z�!F'�����ڴ:[��9�F� fNV�����	ۓ�ȅ�s��^��g�f���Y _�.q��I�e.��.���:�Ll�Ag�2$�]�$E�?�f��:�l&Lh��_��>�rBo���w�<nJY��1r�m��w�J5L!~5|���ȸ]&�f2�t ��d7a���:o	�+��v{i��e��������pW�Ȝ.����I�L�S<��y�PD��|�
d�Pl����i�Đ>��B�ߞ���l�E�nU��uR^y6M��8�E=�K��$԰�_c��뚉�5�=�I�H�i�TF9V��a���v�ˍ&��)a���s'�xt)��D�E�ݩw���>�e��Z��Rs��<Cgj�>`���؟��c8B�xb[ �v��bm��_F�u��l�iY�v�L�,t���r���2��~��0�֌]�x��_�0x���灋�خja��]ek!���n�i���M�_�>Oޚ��b-L_[�@s�JJ�
R_[�h�3���ɡ)����A�-r�?�y�g�*Z䘛�P�8_�[!kk�j7��Z+k.�v�o)aU�V�F�ߑ��+��^�D�3�$�E����88���K�v/qC��8oa�#��&t�,
�?���m��2-r�WOK�l����jlF!�-r�!���<���h��[��U1�¦�'��bNꁮH���\�f>��,�t��W�R���^�]d��7'�� ���鼜�5��O�-)�3���"�+T���'q�ܢkBc���� ��ƃ��1_k�g�շC�.yE^����<�1���U\;DH��(�������6��d�%Y[_�B
[���YY-By��Z�,��Z)��v�Q�-�A�I��5[	�	��֌�&��Ķ�Zo�Ԇ�c��K���7����*ﭥ��8��^s�����J���I�rH{�0�B��k���Y��R��/�j���"�Ijy������T�mVH���-m�(��v`e�7�VMj�hS3k+2��ϟ4�˨4�?s��Vl���Z*o��z�m�`0��v�7��[f��.i����`~^<6�	���mgǒMҎ�Ճ�_ A���a���_�'A
usI��M����Rl�^aZ4;0��On�����\2�Zy)���D��p9*J��-���	W����������h�,e�-�IL$I��ۂ��&P\\@;[��FM&�O���g�+I�N�e�2|�������b�7SYć���9,HR�A;x��sy�&��r��6�T>�qdd{��d�����a��&?���պ*�U��ɢy���EϢ�i)$�^!)`��')� F�N�e�u���$a���1[� Rt\�Tt��u�Ac�����W;fԍPb	@�Ԩ�D^\Jf���[� ��v@Ӆv3P�1a �:W�2��� �1-}���ӈ%P������CBpmSf4ᇟ�� B�E@�&�X�xmS����`�����,�ŧ�e���'�3�P�l:��4�����w�h�&ۂX�B�R��f������yS�_b>��g    ��޵a�$S��rʠ%��	�� W�D�#\s�QF�.�ˤ��� ��[������c%�	7ħ̽�8k�b�����c)pCz��q�z�(�R�ܘ��kC�mw��n-2�
Q���J�U>�A��HB@�k�� W�>�{KZ����)2ג��T�%��E��!a�ǃ&��f}�"[_�zn{;��6�Y�,�𰜤�^+�J#��k9	EL��5\���l����Z+ �<� �Y@�{�������e�.&_�f���z-�b�����x�u�g�"�E?���q�!�uby�̌k��^P#��5��Jo������!N�N׋ۄ: ��,\tA�0yp�,v;���;0�#Y��ڤA���9NGp'\�ᆖ0L\���@�d|j�+.����4?�3�ݒ�F%ށ� Z��8/�"G��?@�ʲ�gr�K�3��1+�^
H�.deH�E����#5X���5�B���w�������'-M0E�"�L"&�B�F�m��IP��堄�6 l"A�01�$f�f���)2�U��vfe,�����W5��U��K��1bRl*��e?�r���?����h�Q	Ӌ�DtT�yhm%�O'C\D�Q�JLO��φb�'�B)#�!�R���%T��Pe���s����VožYR��I���c>J��Kc�v���J�B9�♅�t�����A���$�������D��D�8�5��&��q8E���v�=�T+���ĝu.̄��j6��z��xkW����Ӏ܉9T9V���"�+a���jE���Q)�X�7�ǵŖ-#�h�X�<LϠ6�")��G�w���=�@���*�$�џo;9;�PH��,� �Fn�#�@jc����$�ن��b�#C��k�Z��y�����U�ޝ%H�f��,���I[����{�@9띧@j���j���s߽�V����q��r����6�45M�)@��i\�'j�uJ�m
�j��4Ý�t�t�����P�N'��}�F�w= �H.|%�Nt�#y��Mxd�ي�!��E���|5��li�/�r�&��c�x�}��M�u�r+�ת�9����ir�,uGzХ�z�wk�~U#c�I���o=��Z/n�|�*'�{�{�H�Zn���]����c���Y����H杉b�q����@=%��S<����3�KQ���7Tꐎ㣡���[S:� T���TN[��YƔ��	R����^[�2F��u���Q��8��R��*K�X�����.p�7eC����eZmI�����6�E;��%΂�2S��¾H�>)���RĘ��\����\|E:�'�Zv)HQa<0b�KJ��*��qP� I��/�� �=4�5E��* �����(_Ō��?�h5���W�ǌjsf�|�s+- ��#�Հx5+�� |��46�"��,����;��'���P|��$V$:L�M����o�ZP�P���ct[�2�}���D6J�9i}����ho��j��9��}-�e�@�,a�vB)�%����Zg�ˁ$��eҧ�\�f8=��
 �aK�$���܆h��ǳ6a� ����d�`$�2R�U���n�~M�"hw�L��Z��� ��f���1a�E���b�顧� T�����'��J�5R~cP
q%�2�Nve�<r��tE9��)���0ʬZ5����I#r����`�� ����bv�,��z�$�$|���I���HC��h?��?�{�����Y�(��Ȥ.d@WgF�X��P�5z�68��Z�k#��O�2eV�բ�E�z��Bd
V?S���ϓP
�8��,�2���UW~ת�
X�ciևHd� a&5�J�e�J�gmo�D�ioNa�Zmf:�R^ � I�)�V�έ�bh�Ϭ�� ��{<(wv47��WE�RX���M��o��dH����9_z)c�m�II�V�A��R���A��w���S��D������J5C�Zr�H�){��/x��3E���k��SV�����
2��X�:�l��u�S���u�^]�٢���T�Rm��5¼�5�q^��`�:���n�q��۫�����>�&�<��eQQ91�Zl��C� %�@Dg)?J�k$�_����7�ԓ灿։�R�mn�Y�<��#��3hi?ܚ�\���v�E�N������ @�L�����?Hwu5K[����|���� A�$d�=�d{\|�?C��?ب�H;�N�R��K��??��A�b��t4���P��|K.ŷt'��I���~T�RS��p��E���;��R�̣�0��ʿ�l+3�X�:���g4?��i��P��x׍��e|=4�sO�jh kACف$s{K��$i3M�2P���$SKh��,�wk�ZO�wY��2��4-��Ʌ-�߈O8��~��!�Wӕ�!�|�-+�F��ހ9=PB��׷k�]h^4=��:�K��%2:;�H!�G?����AfS�N��($M�&yzx\�Y�;�BňW' ����5Ɓ�q;U�]�*ŉy��v{)�Fo��KAr>XTM�B��Tg�~��A�}��j/�Rl��ĺz�8?46�gAz^N;����R�\�����Y(�$���H09X����k9��
�s+�5L��ޙY��i��՟}�4χ�T���+�|c�� A��4�}���i��#���>�#�@�s3��=����p�T��7�U��S����jU���F�8���s�RW�fa[RKv� �66)��T�`��忐f�8	���w�l�L����`�Bl�A����O�������ג2�8���{��Զ�2�	��˜�"ǻI$\f�+S����b�1�_pG*va�	�0L9�������o�f�Tpb�Kh2WL�`0�P���9������
¬�B�>�z��ee��8�iI�HВT���m^�>N -�Z7eBN��+i��0��'���i��ԃ>2�5����:��b��Љ�2�̂�<h���^Mb�t���ޙ��D���ɸf�9����� �7Q�a�k���" 2I$��E,�&9}m�avY�m��L*��M�[�Ӣ ~P���Q�t�	�R�nC�2ԟ�B:"m=JL�U�DSe��^�e�r
o}`��{IE>�6^�����5\�x}�/��&
�aJG�)7f���JH��2LO�W�|��~ak�9s_�QH�Hu)����ulv��
�N��
��y���}ë3�7ɸ�B=���A�
���,���W[	�����i���;���g�֮5:F���?F-����ca����wzfZ�u'D�h`�AP�o�vN$`)9�\JV̦��C�ř9��ZZ���@�*�攻g �<�O�5���d.q3ݨ�.�����rh�� s��Y�K.�D�[(��N�)?��	,�����-�����q;��%��C�G��+�ȡ>�&�]�Q��
��J�lq(\n�e,-����:%�.�b�d4} ��e�J_�n[x�/�}���sh�a}�L�K�y��99��f�A�������r�hE`�ߟ���Y�a�����Ala��ˡ�H���=�D�( O��zK4�,2#-��\P�gur;}L���A�d��G\h
;���� ������nh���'s(7�\��%�Yy�*�� �L�ʽ�P���+�E�X�l�#5�9Bo;�U�r�v��Aմ<�չy�U=����y�Óf�;}���H9�O�e��K�Y:���yf����?��6|�BUZM��r��D9�������� �$+e��N��n6	�Z���֩N�u��$}���u�D�3�H���ma�l>�xƹ�h�o��J�0(��	C�ρ���k�B�����$LAdc�M?k�Y���\�ş��a
��G6�ёY�N�[��(�9�r���� �,�9�Yn��>@:OqS��y� 8I�c���o�z;]t�Sn���(�D�QP��+WG�v��[=���}u}���?W��n[Di�b��   [��U��y8�tJ�Gy|"X�y��@�;���T�$�d���2� �:o��s,�O��ޘr+ʠ1Թy{�}9�������tt����ʝ��Uu��!���Ⱥ0�ͫ�I��n�7�iz�T ��]��^�5w7��rK,v���>�m�
��HgF{��1�Kr>��nBRk~'6t'�N��+eZ<�wF��oB��iǗb7rNz��ď����K��K\�Lrу�0h[� #���hn�Y�-�-$Q��<uX��"�(��Z
���q�Y���k��3�zi�	B���V��
䢮��"O�����;v:�H;\�W�%^��Jx����`����4�����PX��)��)�h�yG��V"o�����"U
M�)ą����1a�7��y�Ί�Q�I�j�~�l��1�Z�5�P�TՋ뛠-�D�C�n�$�hu�v� ��z�	�Xz�
��J��Ez�q«�5\�QMB�D�s�D�]&x����q3��RSWo���n��AJo�Z$;�U7|�9�ni{�Ү"�Z�A��T�4�aq�USj �}�$���R����	���f��l>s�pH�W+�5�*��B����wQ���,,��?d:�R��[�8
:uìw�D�$|P���А(A	��r�R��ӊ���t�)k���$f�~��+�;�sy�#-�v�?�L?D���g}D�?I[��~�_q�z!ǕI'���a�A�R�ls�6�9����<���D���휑�h����x���BУ2�n���E��F.iin�ڕ��@0>��ܫP-d�e]3��I/k�ɢ�gA�%0��Q[�.^�����]p�J�F���X�Yԗ���p��6�hs�Qt�"Uw�����fe�^���:y�Y�,R���˧*��8c؟����Z�\��z+�[�򰕴��E�<�*E��i$<W���Ak�Qٹ�`���@b#��(DX˚��}��~��f;�LJ_�Yj�lk�5��Y9^f�y���JS&�~�p�g��ꇇ�G4���C�Pd�	l78�����h#[�nz�_����E�6&�:�8U@����g%kE��E�T�W�M�/�j�q���V���
^H��~�N��E4L9� ����Pȹ�]�eu~�X�'5WE�{0�}�x�Bc��l�s=���A.n���"��U�H�EVlw�B�;ϋxq��8�SmN\� C�0��"iL�t�bd�y2-j�k���N4����U�P}���Sit�������,%ru>62>��)e*��_��Wo�[�GSt�֧2԰���Rd��L���Ձg������ѩ�_D�+���	X��
�ťȴ�V���y+L`'��Js�n̬	Ӆ�e^�b�7{��TB�J��*��5�
��{�	���W]_�6�6 >��ȷC��;�ӚN�����ynv�sV��s�C��p��b,b+),H��h;�oE�zj��\�c��E�X �e�gf~�h�����ek)U�������?D 5$      �   C   x�3���LILQHIUp.JM�,�WN�S�LN�+I�2�!^���e�C:81�,1%��+F��� �, �      �   �	  x�m�7�nF�{�"�ʩ��G�sN#��k��<�_�%I|琂�1���ֿ�ֿDE����X�A4�=/�+�C��ˊ~Y2b���t2���f�_��g<���ǅ,G;�n:񰬤��i߈>U�L	
r������M�*������_��v�Z����)�	Z�u�0Ԏl5�P]a�)���G$m#����'�]sZl���I��������۳��@g�j2���w�/(=$�����ʼ��<G8�e�{��?X�x�68��Y	�3��R��@K4:)���K8�wi�18�q���הŪ�>`" ��,w��H��	�-;��fa�p�2�~/���T&����&я�b�}��@�>�ZR4��~�$�)�.Ta1�c�JӇ��<�A	,(���n"��Y�"�7)+nNߑ�Ǒ��ne���J�#zBlj���+2�+H�( ��b�^�r��d<� ΰ���0�D\�	���c����ތ+s�|τ��}�+ i���3�D���)lu�z��<�u>��<~�|��4����h��-�˔G���z#j���B\�
p	����N���[���Ѫ."�*��v6Z>��5�j1�O\&��� ��d|}��>1�['���6%�S~�mR�+�r�;fS�����e<���?W�����n��B���B�_8	}��d/K84U�$��w&.Gs�?�,��Fk<�"{��ϳa+��4����P��7"c䓪9������D�~�9�բV|V��"��k��ϝp~66��Wlrk 8�(c���X��+�_s7�S)O��$�iC+E��9GL�c�G� 8�g�2�E_���nQ���D	d�Y���~�n�%NL���5�"[*�hP���ic���-�W����lQϬT�5muH7�Z�o�GCe�^r�D~��I��X���E�����"6K���1��5���r_h�.��`�����JdG�s�iBcX1G�Wx��)/���Y'�i��&��f�?��^4���q
U漃Z2H�~�0p~��\���)X��#��
���������t�C6��X�/B�U��sV��(?��J�`f,"'C�n�j�Q�� [�O �4`A����geiu�{M}#����j!�	O_Ռɵ]�q.��,\h�1�E�z��E+�y�d��"��;�@�$��������i5�3���wY�Iˍ;���ys�~��d&O�O@_�vѨ���Rh���f�?9�u�?E[��<����ܵ�a	t;����'�s���c�i�ZT?!�aQ�Y���*����w����%28<{�嗆�U��1�!D�bAȟu{�=ɝX��kOE�2hKܬ�,UpO�m̖۴��!U��P��~|�;�=�?��^��7<�#� L���W�$L�u���v�RW��ٝ�+X�Q�0�}p5+�<k��,��ry��zM��,{B{7Oh��{Sנ�z���]4_��
6�^5�s���Ύg�o��f�B	=��E(��Z�`���R>����u^i��bh���h�Np�4l�h�8�����n?�C⮁d,��é�;KIN��c���q�G�m���U�B� phץ���[��ч��S�~|�Ob�i���Be`E�#Xc��/�.2����
O�'�j�*�.�P����o�Jߞ�R��~��7�f��u\s��YxLvB1���S:�m���A4���>�XW�(�������눧kK줩��}z�U�e;� Խ�;��UBn�%c��%�����O �:�]�{���+��:}��,��o��U]l�Z����ձ�w�A 4Nh�h���|#-�RW{�Iv��
��۵���_)��
HM@�4���J��o�3Y	�0���R"g�"&�P�n�͸�5��-�]����3F���n��g'�����@a��������ZG3"�ǝ��ٚB�~)���2s�$"	���ٛ@����]�Q�V�3v:��8Ȳ?��\Wi����A#��*�	u�
o`:��q)�ƨ��{���o ;�Yo!W��I�\+|�w��m<A.U�!4#��-�Ӻޕߞ	�[_�4��N�=v�u�����/۱u7�E1�|p]s�6l�q9�H__ϔ[u>@��Ro+��Ϲ#��׊&�]G��U+G�L�s=N��s(	�����\�8Kz-����2P�د8[/�� �������P�x�yR̠pk'�gm�@j���	x���$�ԙ	}�sُ�qc���c�K���{UKb����q�̸(�!/�T�BZԸs�fږ���
O�Yun�a݌�f�V�ҟ�i��zur&	$��ZS��̥<N�wᔸ���;L�m�1�G^)	-��� �|��'�
21T��N4��·%Qwr���G�0�s8�*��ђي?}��+k*�%����v磛��z�Q�%����^��������������.D     