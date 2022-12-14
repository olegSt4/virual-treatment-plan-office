create table if not exists treatment_plan_steps
(
    id              serial not null
        constraint treatment_plan_steps_pkey primary key,

    plan_id         bigint not null
        constraint fk1_treatment_plan_steps references treatment_plans,

    description     varchar(255) not null,
    step_order      integer,
    start_date      timestamptz  not null,
    end_date        timestamptz,

    type_id         bigint not null
        constraint fk2_treatment_plan_steps references treatment_plan_step_types,
    subtype_id      bigint
        constraint fk3_treatment_plan_steps references treatment_plan_step_subtypes,

    comment         varchar(255),
    finished        boolean      not null default false,
    failed          boolean      not null default false
);

create table if not exists treatment_plan_step_inputs
(
    id          serial not null
        constraint treatment_plan_step_inputs_pkey primary key,

    step_id     bigint not null
        constraint fk1_treatment_plan_step_inputs references treatment_plan_steps,

    name        varchar(127) not null,
    type        varchar(20) not null,
    value       varchar(127),
    unit_name   varchar(40)
);
