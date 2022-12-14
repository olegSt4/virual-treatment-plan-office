import React, {useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import {ALL_PATIENTS_CARDS_URL, ALL_TREATMENT_PLANS_URL, CREATE_PATIENT_TREATMENT_PLAN_URL} from "@src/utils/urlUtils";
import AllMedicalCardsView from "@src/views/emc/AllMedicalCardsView";
import ManageTreatmentPlansView from "@src/views/plan/ManageTreatmentPlansView";
import CreateTreatmentPlanView from "@src/views/plan/CreateTreatmentPlanView";
import styles from "@src/styles/App.module.scss";

const App = () => {
    const [activeLinkNum, setActiveLinkNum] = useState<number>(-1);

    const linksList = [
        <Link to={ALL_PATIENTS_CARDS_URL}>Доступні картки пацієнтів</Link>,
        <Link to={ALL_TREATMENT_PLANS_URL}>Керування планами лікування</Link>,
        <Link to={CREATE_PATIENT_TREATMENT_PLAN_URL}>Створення нового плану лікування</Link>
    ];


    const renderLinks = () => {
        return linksList.map((link, index) => {
            const className = index === activeLinkNum ? `${styles.NavLink} ${styles.Active}` : styles.NavLink;

            return (
                <div className={className} onClick={() => setActiveLinkNum(index)}>
                    {link}
                </div>
            );
        });
    };


    return (
        <Router>
            <div className={styles.Navigation}>
                {renderLinks()}
            </div>

            <Routes>
                <Route path={ALL_PATIENTS_CARDS_URL} element={<AllMedicalCardsView/>}/>
                <Route path={ALL_TREATMENT_PLANS_URL} element={<ManageTreatmentPlansView/>}/>
                <Route path={CREATE_PATIENT_TREATMENT_PLAN_URL} element={<CreateTreatmentPlanView/>}/>
            </Routes>
        </Router>
    );
}

export default App;
