import React, {useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {getMedicalCardDataById} from "@src/utils/externalCallUtils";
import MedicalCard from "@src/components/medicalCard/MedicalCard";
import {MedicalCardData} from "@src/models/emcModels";

const MedicalCardView = () => {
    const lang = "ua";

    const { id } = useParams();
    const [medicalData, setMedicalData] = useState<MedicalCardData>();

    useEffect(() => {
        if (id) {
            getMedicalCardDataById(id).then(data => setMedicalData(data))
        }
    }, []);

    return <MedicalCard cardId={id} data={medicalData} lang={lang} />
};

export default MedicalCardView;
