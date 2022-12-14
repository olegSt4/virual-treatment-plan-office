import React from "react";
import {MedicalCardData} from "@src/models/emcModels";
import ColumnHeader from "@src/components/common/headers/ColumnHeader";
import InfoRow from "@src/components/common/rows/InfoRow";

interface PersonalParametersBlockProps {
    data: MedicalCardData;
    lang?: string;
}

const PersonalParametersBlock = (props: PersonalParametersBlockProps) => {

    return (
        <div>
            <ColumnHeader title="Персональні показники"/>
            <InfoRow title={"Група крові"} value={props.data.bloodGroup}/>
        </div>
    );
}

export default PersonalParametersBlock;
