create table if not exists treatment_plan_step_types
(
    id              serial not null
        constraint treatment_plan_step_types_pkey primary key,
    name               varchar(127) not null unique,
    comment_required   boolean not null default false,
    subtypes_title     varchar(60)
);

create table if not exists treatment_plan_step_subtypes
(
    id               serial not null
        constraint treatment_plan_step_subtypes_pkey primary key,

    parent_type_id   bigint not null
        constraint fk1_treatment_plan_step_subtypes references treatment_plan_step_types,

    name             varchar(127) not null
);

create table if not exists treatment_plan_step_subtype_inputs
(
    id                      serial not null
        constraint treatment_plan_step_subtype_inputs_pkey primary key,

    step_subtype_id         bigint not null
        constraint fk1_treatment_plan_step_subtypes references treatment_plan_step_subtypes,

    name                    varchar(127) not null,
    type                    varchar(20) not null,
    unit_name               varchar(60)
);

create table if not exists treatment_plan_step_subtype_input_options
(
    id                      serial not null
        constraint treatment_plan_step_subtype_input_options_pkey primary key,

    input_id         bigint not null
        constraint fk1_treatment_plan_step_subtype_inputs references treatment_plan_step_subtype_inputs,

    name                    varchar(127) not null
);