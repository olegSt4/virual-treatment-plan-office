import {TranslationID, TRANSLATIONS} from "@src/utils/translation/translations";

export const getTranslation = (translationId: TranslationID, lang?: string): string | undefined => {
    return lang === "ua" ? TRANSLATIONS.get(translationId)?.ua : TRANSLATIONS.get(translationId)?.en;
}
