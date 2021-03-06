import LanguageUtils from 'models/common/utils/language.js';

const ConferenceI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    conference: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
    title: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 300,
        },
    },
};

export default ConferenceI18nValidationConstraints;
