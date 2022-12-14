import React, {useState} from "react";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import styles from "../../../styles/App.module.scss";
import {TreatmentPlan} from "@src/models/planManagementModels";
import {Input} from "semantic-ui-react";
import {BsSearch} from "react-icons/bs";

interface AllPlansBaseDataProps {
    plans: TreatmentPlan[];
    onPlanSelect: Function;
}

const AllPlansBaseData = (props: AllPlansBaseDataProps) => {
    const [planSearchText, setPlanSearchText] = useState<string>("");

    const onSearchChange = (e: any) => {
        setPlanSearchText(e.target.value.trim());
    };

    const renderPlansItems = () => {
        return props.plans
            .filter(plan => plan.patientFullName.includes(planSearchText) || plan.name.includes(planSearchText))
            .map(plan => {
                return (
                    <div onClick={() => props.onPlanSelect(plan.planId)} className={styles.PlanBaseDataBlock}>
                        <span className={styles.PatientInitials}>{plan.patientFullName}</span>
                        <span>{plan.name}</span>
                    </div>
                );
            });
    };

    return (
        <div className={styles.AllPlansBaseData}>
            <ColumnHeader title={"Доступні плани"} />
            <div className={styles.PlansSearch}>
                <BsSearch size={20}/>
                <Input
                    className={styles.PlansSearchInput}
                    type="text"
                    placeholder="Введіть назву плану або ім'я пацієнта"
                    value={planSearchText}
                    onChange={onSearchChange}
                />
            </div>
            <div>
                {renderPlansItems()}
            </div>
        </div>
    );
};

export default AllPlansBaseData;
