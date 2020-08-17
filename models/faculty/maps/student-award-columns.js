/**
 * Language map module.
 * @namespace
 * @readonly
 * @property {string[]} support - Supporting language list.
 */

import LanguageUtils from '../../common/utils/language.js';
import deepFreeze from 'deep-freeze';

const map = [
    'receivedYear',
    'award',
];

const defaultOption = 'technology';

const i18n = {
    [ LanguageUtils.getLanguageId( 'en-US' ) ]: {
        receivedYear:   'received year',
        award:          'award',
    },
    [ LanguageUtils.getLanguageId( 'zh-TW' ) ]: {
        receivedYear:   '獲獎年份',
        award:          '獎項名稱',
    },
};

deepFreeze( i18n );
deepFreeze( map );

export default {
    defaultOption,
    i18n,
    map,
};

export {
    defaultOption,
    i18n,
    map,
};

