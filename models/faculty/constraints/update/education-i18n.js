import LanguageUtils from 'models/common/utils/language.js';

const EducationI18nValidationConstraints = {
    language: {
        presence: {
            allowEmpty: false,
        },
        type: {
            type: LanguageUtils.isSupportedLanguageId,
        },
    },
    school: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
    major: {
        presence: false,
        type:       'string',
        length:   {
            maximum: 100,
        },
    },
};

export default EducationI18nValidationConstraints;
