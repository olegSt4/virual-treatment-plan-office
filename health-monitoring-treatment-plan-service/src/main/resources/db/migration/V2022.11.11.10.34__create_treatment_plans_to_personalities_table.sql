/* This table should be created into separate DB space (where the sensitive data is being kept) */
create table if not exists treatment_plans_to_personalities (

    id                  serial not null
        constraint treatment_plans_to_personalities_pkey primary key,

    plan_id             bigint not null unique,
    patient_card_id     bigint not null,
    patient_id          bigint not null,
    doctor_id           bigint not null
);