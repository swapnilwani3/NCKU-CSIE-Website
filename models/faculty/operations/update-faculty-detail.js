import ValidateUtils from 'models/common/utils/validate.js';
import {
    EducationI18n,
    Education,
    ExperienceI18n,
    Experience,
    ProfileI18n,
    Profile,
    SpecialtyI18n,
    Title,
    TitleI18n,
} from 'models/faculty/operations/associations.js';
import EducationValidationConstraints from 'models/faculty/constraints/update/education.js';
import EducationI18nValidationConstraints from 'models/faculty/constraints/update/education-i18n.js';
import ExperienceValidationConstraints from 'models/faculty/constraints/update/experience.js';
import ExperienceI18nValidationConstraints from 'models/faculty/constraints/update/experience-i18n.js';
import ProfileValidationConstraints from 'models/faculty/constraints/update/profile.js';
import ProfileI18nValidationConstraints from 'models/faculty/constraints/update/profile-i18n.js';
import SpecialtyI18nValidationConstraints from 'models/faculty/constraints/update/specialty-i18n.js';
import TitleValidationConstraints from 'models/faculty/constraints/update/title.js';
import TitleI18nValidationConstraints from 'models/faculty/constraints/update/title-i18n.js';
import validate from 'validate.js';
import { faculty, } from 'models/common/utils/connect.js';

export default async ( opt ) => {
    try {
        opt = opt || {};
        const {
            profileId = null,
            education = null,
            experience = null,
            profile = null,
            specialtyI18n = null,
            title = null,
        } = opt;

        if ( !ValidateUtils.isValidId( profileId ) ) {
            const error = new Error( 'Invalid profile id' );
            error.status = 400;
            throw error;
        }

        if ( education !== null ) {
            if ( ValidateUtils.isValidArray( education ) ) {
                for ( const data of education ) {
                    if ( typeof ( validate( data, EducationValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid education object' );
                        error.message = '';
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, EducationI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid education object' );
                                error.message = '';
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid education object' );
                error.status = 400;
                throw error;
            }
        }
        if ( experience !== null ) {
            if ( ValidateUtils.isValidArray( experience ) ) {
                for ( const data of experience ) {
                    if ( typeof ( validate( data, ExperienceValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid experience object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, ExperienceI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid experience object' );
                                error.message = '';
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid experience object' );
                error.status = 400;
                throw error;
            }
        }
        if ( profile !== null ) {
            if ( typeof ( validate( profile, ProfileValidationConstraints ) ) !== 'undefined' ) {
                const error = new Error( 'Invalid profile object' );
                error.status = 400;
                throw error;
            }
            if ( profile.i18n ) {
                for ( const i18nData of profile.i18n ) {
                    if ( typeof ( validate( i18nData, ProfileI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid profile object' );
                        error.message = '';
                        error.status = 400;
                        throw error;
                    }
                }
            }
        }
        if ( specialtyI18n !== null ) {
            if ( ValidateUtils.isValidArray( specialtyI18n ) ) {
                for ( const data of specialtyI18n ) {
                    if ( typeof ( validate( data, SpecialtyI18nValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid specialtyI18n object' );
                        error.status = 400;
                        throw error;
                    }
                }
            }
            else {
                const error = new Error( 'Invalid specialtyI18n object' );
                error.status = 400;
                throw error;
            }
        }
        if ( title !== null ) {
            if ( ValidateUtils.isValidArray( title ) ) {
                for ( const data of title ) {
                    if ( typeof ( validate( data, TitleValidationConstraints ) ) !== 'undefined' ) {
                        const error = new Error( 'Invalid title object' );
                        error.status = 400;
                        throw error;
                    }
                    if ( data.i18n ) {
                        for ( const i18nData of data.i18n ) {
                            if ( typeof ( validate( i18nData, TitleI18nValidationConstraints ) ) !== 'undefined' ) {
                                const error = new Error( 'Invalid title object' );
                                error.message = '';
                                error.status = 400;
                                throw error;
                            }
                        }
                    }
                }
            }
            else {
                const error = new Error( 'Invalid title object' );
                error.status = 400;
                throw error;
            }
        }


        if ( education ) {
            for ( const educationInfo of education ) {
                await faculty.transaction( t => Education.update( {
                    nation: educationInfo.nation,
                    degree: educationInfo.degree,
                    from:   educationInfo.from,
                    to:     educationInfo.to,
                }, {
                    where: {
                        educationId: educationInfo.educationId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( educationInfo.i18n ) {
                        return Promise.all( educationInfo.i18n.map( educationI18nInfo => EducationI18n.update( {
                            school: educationI18nInfo.school,
                            major:  educationI18nInfo.major,
                        }, {
                            where: {
                                educationId: educationInfo.educationId,
                                language:    educationI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( experience ) {
            for ( const experienceInfo of experience ) {
                await faculty.transaction( t => Experience.update( {
                    from: experienceInfo.from,
                    to:   experienceInfo.to,
                }, {
                    where: {
                        experienceId: experienceInfo.experienceId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( experienceInfo.i18n ) {
                        return Promise.all( experienceInfo.i18n.map( experienceI18nInfo => ExperienceI18n.update( {
                            organization: experienceI18nInfo.organization,
                            department:   experienceI18nInfo.department,
                            title:        experienceI18nInfo.title,
                        }, {
                            where: {
                                experienceId: experienceInfo.experienceId,
                                language:     experienceI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        if ( profile ) {
            await faculty.transaction( t => Profile.update( {
                fax:         profile.fax,
                email:       profile.email,
                personalWeb: profile.personalWeb,
                nation:      profile.nation,
                photo:       profile.photo, // ???
                officeTel:   profile.officeTel,
                labTel:      profile.labTel,
                labWeb:      profile.labWeb,
                order:       profile.order,
            }, {
                where: {
                    profileId,
                },
                transaction: t,
            } ).then( () => {
                if ( profile.i18n ) {
                    return Promise.all( profile.i18n.map( profileI18nInfo => ProfileI18n.update( {
                        name:          profileI18nInfo.name,
                        officeAddress: profileI18nInfo.officeAddress,
                        labName:       profileI18nInfo.labName,
                        labAddress:    profileI18nInfo.labAddress,
                    }, {
                        where: {
                            language: profileI18nInfo.language,
                            profileId,
                        },
                        transaction: t,
                    } ) ) );
                }
            } ) );
        }
        if ( specialtyI18n ) {
            for ( const specialtyInfo of specialtyI18n ) {
                await faculty.transaction( t => SpecialtyI18n.update( {
                    specialty: specialtyInfo.specialty,
                }, {
                    where: {
                        specialtyId:   specialtyInfo.specialtyId,
                        profileId,
                        language:    specialtyInfo.language,
                    },
                    transaction: t,
                } ) );
            }
        }
        if ( title ) {
            for ( const titleInfo of title ) {
                await faculty.transaction( t => Title.update( {
                    from: titleInfo.from,
                    to:   titleInfo.to,
                }, {
                    where: {
                        titleId:   titleInfo.titleId,
                        profileId,
                    },
                    transaction: t,
                } ).then( () => {
                    if ( titleInfo.i18n ) {
                        return Promise.all( titleInfo.i18n.map( titleI18nInfo => TitleI18n.update( {
                            title: titleI18nInfo.title,
                        }, {
                            where: {
                                titleId:  titleInfo.titleId,
                                language: titleI18nInfo.language,
                            },
                            transaction: t,
                        } ) ) );
                    }
                } ) );
            }
        }
        return;
    }
    catch ( err ) {
        throw err;
    }
};
