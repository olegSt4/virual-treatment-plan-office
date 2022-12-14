import React, {useEffect, useState} from "react";
import {MedicalCardData} from "@src/models/emcModels";
import {getAllPatientsCards} from "@src/utils/externalCallUtils";
import PageHeader from "@src/components/common/headers/PageHeader";
import {getTranslation} from "@src/utils/translation/translationUtils";
import {TranslationID} from "@src/utils/translation/translations";
import MedicalCard from "@src/components/medicalCard/MedicalCard";
import styles from "../../styles/App.module.scss";
import {Input} from "semantic-ui-react";
import {BsSearch} from "react-icons/bs";

const AllMedicalCardsView = () => {
    const lang = "ua";

    const [allClientsCards, setAllClientsCards] = useState<MedicalCardData[]>([]);
    const [patientSearchText, setPatientSearchText] = useState<string>("");
    const [chosenCardId, setChosenCardId] = useState<string>("");
    const [chosenCardData, setChosenCardData] = useState<MedicalCardData>();

    useEffect(() => {
        getAllPatientsCards().then(data => setAllClientsCards(data));
    }, []);

    const onSearchChange = (e: any) => {
        setPatientSearchText(e.target.value.trim());
    };

    const onBaseCardClicked = (cardId: string) => {
        setChosenCardId(cardId);
        setChosenCardData(allClientsCards.filter(card => cardId === card.id).pop());
    };

    const renderBaseMedicalCards = () => {
        return allClientsCards.filter(card =>
            card.surname.toLowerCase().includes(patientSearchText.toLowerCase())
            || card.name.toLowerCase().includes(patientSearchText.toLowerCase())
            || (card.middleName && card.middleName.toLowerCase().includes(patientSearchText.toLowerCase()))
        ).map(filteredCard => renderBaseMedicalCard(filteredCard));
    };

    const renderBaseMedicalCard = (card: MedicalCardData) => {
        const patientInitials = `${card.surname} ${card.name} ${card.middleName} (№${card.id})`;

        return (
            <div onClick={() => onBaseCardClicked(card.id)} className={styles.PatientBaseCard}>
                <span>{patientInitials}</span>
            </div>
        );
    };

    const renderChosenCard = () => {
        if (chosenCardId) {
            return <MedicalCard cardId={chosenCardId} data={chosenCardData} lang={lang} />;
        }
    };

    return (
        <>
            <div className={styles.AllPatientsCardsPageContainer}>
                <div className={styles.PatientsList}>
                    <div className={styles.PatientSearch}>
                        <BsSearch size={20}/>
                        <Input
                            type="text"
                            className={styles.PatientsSearchInput}
                            placeholder={getTranslation(TranslationID.SEARCH_BY_NAME_HINT, lang)}
                            value={patientSearchText}
                            onChange={onSearchChange}
                        />
                    </div>
                    <div>
                        {renderBaseMedicalCards()}
                    </div>
                </div>
                <div className={styles.PatientCard}>
                    {renderChosenCard()}
                </div>
            </div>
        </>
    );
};

export default AllMedicalCardsView;
