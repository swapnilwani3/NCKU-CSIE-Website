const path = require( 'path' );
const projectRoot = path.dirname( path.dirname( path.dirname( __dirname ) ) );
const connect = require( `${ projectRoot }/settings/database/connect` );

module.exports = async () => {
    const announcementDatabase = await connect( 'announcement' );
    const table = {
        announcementFileI18n: announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_file_i18n` ),
        announcementFile:     announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_file` ),
        announcementI18n:     announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_i18n` ),
        announcement:         announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement` ),
        announcementTag:      announcementDatabase.import( `${ projectRoot }/models/announcement/tables/announcement_tag` ),
        tagI18n:              announcementDatabase.import( `${ projectRoot }/models/announcement/tables/tag_i18n` ),
        tag:                  announcementDatabase.import( `${ projectRoot }/models/announcement/tables/tag` ),
    };

    // Translation relationship.
    // `announcement` has many translations.
    table.announcement.hasMany( table.announcementI18n, {
        as:         'announcementI18n',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
    } );

    // `announcementFile` has many translations.
    table.announcementFile.hasMany( table.announcementFileI18n, {
        as:         'announcementFileI18n',
        foreignKey: 'fileId',
        sourceKey:  'fileId',
    } );

    // `tag` has many translations.
    table.tag.hasMany( table.tagI18n, {
        as:         'tagI18n',
        foreignKey: 'tagId',
        sourceKey:  'tagId',
    } );

    // Announcement relationship.
    // `announcement` has many `file`.
    table.announcement.hasMany( table.announcementFile, {
        as:         'announcementFile',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
    } );

    // `announcement` has many `announcementTag`.
    table.announcement.hasMany( table.announcementTag, {
        as:         'announcementTag',
        foreignKey: 'announcementId',
        sourceKey:  'announcementId',
    } );

    // `announcementTag` has many `tagI18n`.
    table.announcementTag.hasMany( table.tagI18n, {
        as:         'tagI18n',
        foreignKey: 'tagId',
        sourceKey:  'tagId',
    } );

    // Any one who use this module should remember to close connection,
    // like `table.database.close()`.
    table.database = announcementDatabase;

    return table;
};
