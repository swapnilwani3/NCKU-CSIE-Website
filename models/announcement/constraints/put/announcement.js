import LanguageUtils from 'models/common/utils/language.js';
import ValidateUtils from 'models/common/utils/validate.js';

const AnnouncementValidationConstraints = {
    announcementId: {
        presence: true,
        type:     {
            type: ValidateUtils.isValidId,
        },
    },
    image: {
        presence:     false,
        type:       'string',
        length:   {
            maximum: 2083,
        },
    },
    announcementI18n: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
        length: {
            is: LanguageUtils.supportedLanguage.length,
        },
    },
    addedFiles: {
        presence: false,
        type:     'array',
    },
    deletedFiles: {
        presence: false,
        type:     'array',
    },
    tags: {
        presence: {
            allowEmpty: false,
        },
        type:     'array',
    },
};

export default AnnouncementValidationConstraints;
