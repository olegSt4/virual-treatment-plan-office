CREATE SEQUENCE if not exists hibernate_sequence START 1;

create table if not exists treatment_plan_categories
(
    id           serial      not null
        constraint treatment_plan_categories_pkey primary key,

    name         varchar(127) not null unique
);

create table if not exists treatment_plans
(
    id              serial not null
        constraint treatment_plans_pkey primary key,

    category_id     bigint not null
        constraint fk1_treatment_plans references treatment_plan_categories,

    name            varchar(255) not null,
    start_date      timestamptz  not null,
    end_date        timestamptz,
    finished        boolean not null default false,
    conclusion      varchar(255)
);

