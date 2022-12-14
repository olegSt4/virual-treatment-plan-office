create table if not exists state_entries_to_patients (

    id                  serial not null
        constraint state_entries_to_patients_pkey primary key,

    state_entry_id      bigint not null unique,
    patient_id          bigint not null unique /* Reference key to Users table */
);