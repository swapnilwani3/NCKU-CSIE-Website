import ValidateUtils from 'models/common/utils/validate.js';
import publicationCategoryUtils from 'models/faculty/utils/publication-category.js';

const PublicationValidationConstraints = {
    issueYear: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThanOrEqualTo: 1970,
        },
    },
    issueMonth: {
        presence:     false,
        type:         'integer',
        numericality: {
            greaterThan:       0,
            lessThanOrEqualTo: 12,
        },
    },
    category: {
        presence: false,
        type:     {
            type: value => publicationCategoryUtils.isSupportedId( value ),
        },
    },
    international: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
    refereed: {
        presence: false,
        type:     {
            type: value => ValidateUtils.isValidBoolean( value ),
        },
    },
};

export default PublicationValidationConstraints;
