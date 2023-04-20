create table account(
    username VARCHAR(255) PRIMARY KEY,
    password VARCHAR(255) CONSTRAINT pwchk CHECK (char_length(password) >= 3),
    fullname VARCHAR(255) not null,
    phone VARCHAR(255),
    email VARCHAR(255),
    birthday DATE,
    gender VARCHAR(255),
    role VARCHAR(255) DEFAULT "user",
    gold int DEFAULT 0 ,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table document(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    title VARCHAR(255) not null,
    price int DEFAULT 0,
    description VARCHAR(255) not null,
    type VARCHAR(255) not null,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table exam(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    school VARCHAR(255),
    semester VARCHAR(255),
    ship VARCHAR(255),
    system VARCHAR(255),
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table document_img(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    id_document uuid DEFAULT uuid_generate_v4 () not null,
    image bytea
)

create table document_file(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    id_document uuid DEFAULT uuid_generate_v4 () not null,
    file bytea
)

create table book(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    edition VARCHAR(255) not null,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

create table book_author(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    id_book uuid not null,
    author VARCHAR(255) not null
)

create table slide(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    author VARCHAR(255) not null,
    school VARCHAR(255) not null,
    create_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
)

CREATE EXTENSION unaccent;