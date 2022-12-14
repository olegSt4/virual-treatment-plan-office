import React, {useState} from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import PatientCardView from "@src/views/emc/MedicalCardView";
import {getPatientCardURLById, getTreatmentPlanURL, MEDICAL_CARD_URL, TREATMENT_PLAN_URL} from "@src/utils/urlUtils";
import TreatmentPlanView from "@src/views/plan/TreatmentPlanView";
import styles from "@src/styles/App.module.scss";

const App = () => {
    const [activeLinkNum, setActiveLinkNum] = useState<number>(-1);

    const linksList = [
        <Link to={getPatientCardURLById("1")}>Електронна медична карта</Link>,
        <Link to={getTreatmentPlanURL("2")}>Керування планом лікування</Link>
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
                <Route path={MEDICAL_CARD_URL} element={<PatientCardView/>}/>
                <Route path={TREATMENT_PLAN_URL} element={<TreatmentPlanView/>}/>
            </Routes>
        </Router>
    );
}

export default App;
