create table if not exists user_notifications_settings (

   id                  serial not null
        constraint user_notifications_settings_pkey primary key,

   user_id                        bigint not null unique, /* reference key on system users table */
   email_notifications_enabled    boolean not null default true ,
);

/* default data for testing*/
insert into user_notifications_settings(user_id, email_notifications_enabled)
    values (1, true);