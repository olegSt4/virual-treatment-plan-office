insert into treatment_plan_step_types(name, comment_required, subtypes_title)
    values ('MEDICINE', false, null),
           ('CONSULTATION', true, null),
           ('PROCEDURE', false, null),
           ('OBSERVATION', false, 'Список досліджень'),
           ('SURVEY', false, 'Список опитувань');

/* SUBTYPES */
insert into treatment_plan_step_subtypes(parent_type_id, name)
    select t.id, 'Загальний аналіз крові'
        from treatment_plan_step_types t
            where t.name = 'OBSERVATION';
insert into treatment_plan_step_subtypes(parent_type_id, name)
    select t.id, 'Тест на COViD-19'
        from treatment_plan_step_types t
            where t.name = 'OBSERVATION';
insert into treatment_plan_step_subtypes(parent_type_id, name)
    select t.id, 'Кардіограма'
        from treatment_plan_step_types t
            where t.name = 'OBSERVATION';

insert into treatment_plan_step_subtypes(parent_type_id, name)
    select t.id, 'Серцебиття у стані спокою'
        from treatment_plan_step_types t
            where t.name = 'SURVEY';
insert into treatment_plan_step_subtypes(parent_type_id, name)
    select t.id, 'Рівень цукру в крові'
        from treatment_plan_step_types t
            where t.name = 'SURVEY';

/* SUBTYPES INPUTS */
insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Параметр 1', 'NUMBER', 'unit1'
        from treatment_plan_step_subtypes st
            where st.name = 'Загальний аналіз крові';
insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Параметр 2', 'NUMBER', 'unit2/unit2'
        from treatment_plan_step_subtypes st
            where st.name = 'Загальний аналіз крові';
insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Параметр 3', 'NUMBER', null
        from treatment_plan_step_subtypes st
            where st.name = 'Загальний аналіз крові';
insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Параметр 4', 'OPTION', null
        from treatment_plan_step_subtypes st
            where st.name = 'Загальний аналіз крові';

insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Результат', 'OPTION', null
        from treatment_plan_step_subtypes st
            where st.name = 'Тест на COViD-19';

insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Параметр 1', 'NUMBER', 'unit1'
        from treatment_plan_step_subtypes st
            where st.name = 'Кардіограма';
insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Параметр 2', 'NUMBER', 'unit2/unit2'
        from treatment_plan_step_subtypes st
            where st.name = 'Кардіограма';

insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Темп сердцебиття', 'NUMBER', 'уд/хв'
        from treatment_plan_step_subtypes st
            where st.name = 'Сердцебиття у стані спокою';

insert into treatment_plan_step_subtype_inputs(step_subtype_id, name, type, unit_name)
    select st.id, 'Рівень цукру', 'NUMBER', 'ммоль/л'
        from treatment_plan_step_subtypes st
            where st.name = 'Рівень цукру в крові';


/* INPUT OPTIONS */
insert into treatment_plan_step_subtype_input_options(input_id, name)
    select i.id, 'Вибір 1'
        from treatment_plan_step_subtype_inputs i
            where i.name = 'Параметр 4';
insert into treatment_plan_step_subtype_input_options(input_id, name)
    select i.id, 'Вибір 2'
        from treatment_plan_step_subtype_inputs i
            where i.name = 'Параметр 4';
insert into treatment_plan_step_subtype_input_options(input_id, name)
    select i.id, 'Вибір 3'
        from treatment_plan_step_subtype_inputs i
            where i.name = 'Параметр 4';

insert into treatment_plan_step_subtype_input_options(input_id, name)
    select i.id, 'ПОЗИТИВНИЙ'
        from treatment_plan_step_subtype_inputs i
            where i.name = 'Результат';
insert into treatment_plan_step_subtype_input_options(input_id, name)
    select i.id, 'НЕГАТИВНИЙ'
        from treatment_plan_step_subtype_inputs i
            where i.name = 'Результат';