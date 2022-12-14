import React from "react";
import {BrowserRouter as Router, Link, Route, Routes} from "react-router-dom";
import PatientCardView from "@src/views/emc/PatientMedicalCardView";
import AllMedicalCardsView from "@src/views/doctor/AllMedicalCardsView";
import "../styles/App.module.scss";
import {
    ALL_PATIENTS_CARDS_URL,
    ALL_TREATMENT_PLANS_URL,
    CREATE_PATIENT_TREATMENT_PLAN_URL,
    getPatientCardURLById,
    getPatientTreatmentPlan,
    PATIENT_CARD_URL,
    PATIENT_TREATMENT_PLAN_URL
} from "@src/utils/urlUtils";
import CreateTreatmentPlanView from "@src/views/doctor/CreateTreatmentPlanView";
import ManageTreatmentPlansView from "@src/views/doctor/ManageTreatmentPlansView";
import PatientTreatmentPlanView from "@src/views/plan/PatientTreatmentPlanView";

const App = () => {

  return (
      <Router>
          <div className="Navigation">
              <div className="NavLink">
                  <Link to={ALL_PATIENTS_CARDS_URL}>All patients cards (doctor)</Link>
              </div>
              <div className="NavLink">
                  <Link to={getPatientCardURLById("1")}>Patient card (patient)</Link>
              </div>
              <div className="NavLink">
                  <Link to={ALL_TREATMENT_PLANS_URL}>All treatment plans management (doctor)</Link>
              </div>
              <div className="NavLink">
                  <Link to={getPatientTreatmentPlan("10")}>Patient plan management (patient)</Link>
              </div>
              <div className="NavLink">
                  <Link to={CREATE_PATIENT_TREATMENT_PLAN_URL}>Create new treatment plan (doctor)</Link>
              </div>
          </div>

          <Routes>
              <Route path={ALL_PATIENTS_CARDS_URL} element={ <AllMedicalCardsView /> }/>
              <Route path={ALL_TREATMENT_PLANS_URL} element={ <ManageTreatmentPlansView /> } />
              <Route path={CREATE_PATIENT_TREATMENT_PLAN_URL} element={ <CreateTreatmentPlanView /> }/>

              <Route path={PATIENT_CARD_URL} element={ <PatientCardView /> }/>
              <Route path={PATIENT_TREATMENT_PLAN_URL} element={ <PatientTreatmentPlanView /> }/>
          </Routes>
      </Router>
  );
}

export default App;
