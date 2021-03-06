import LanguageUtils from '../../common/utils/language.js';
import I18nUtils from '../../common/utils/i18n.js';
import { defaultOption, i18n, map, } from '../maps/tag.js';

export const tagUtils = new I18nUtils( {
    defaultOption,
    i18n,
    map,
} );

Object.assign( tagUtils, {
    getTagAllValue ( languageId = LanguageUtils.defaultLanguageId ) {
        if ( LanguageUtils.isSupportedLanguageId( languageId ) )
            return i18n[ languageId ].all;
    },
    get tagAllId () {
        return -1;
    },
    getTagColorById ( tagId ) {
        if ( !tagUtils.isSupportedId( tagId ) )
            return;

        const tagOption = tagUtils.getOptionById( tagId );
        if ( tagOption === 'course' || tagOption === 'faculty' )
            return 'yellow';
        else if ( tagOption === 'college' || tagOption === 'master' || tagOption === 'phd' )
            return 'blue';
        else if ( tagOption === 'internship' || tagOption === 'scholarship' || tagOption === 'international' || tagOption === 'award' )
            return 'red';
        else if ( tagOption === 'speech' || tagOption === 'conference' || tagOption === 'exhibition' || tagOption === 'competition' )
            return 'purple';
        else if ( tagOption === 'recruitment' || tagOption === 'rule' )
            return 'green';
    },
} );

export default tagUtils;
