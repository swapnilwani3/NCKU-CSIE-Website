/**
 * API router middleware module for `express`.
 *
 * Including following sub-routing modules:
 * - `/api/faculty`
 * - `/api/faculty/lab`
 * - `/api/faculty/[id]`
 */

import express from 'express';
import cors from 'cors';

import getFaculty from 'models/faculty/operations/get-faculty.js';
import getFacultyDetail from 'models/faculty/operations/get-faculty-detail.js';
import getFacultyDetailWithId from 'models/faculty/operations/get-faculty-detail-with-id.js';
import getLabs from 'models/faculty/operations/get-labs.js';
import getPublications from 'models/faculty/operations/get-publication.js';
import getFacultyMiniProfile from 'models/faculty/operations/get-faculty-mini-profile.js';

const apis = express.Router();

/**
 * Resolve URL `/api/faculty`.
 */

apis.get( '/', cors(), async ( req, res, next ) => {
    try {
        const data = await getFaculty( Number( req.query.languageId ) );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/lab`.
 */

apis.get( '/lab', cors(), async ( req, res, next ) => {
    try {
        const data = await getLabs( Number( req.query.languageId ) );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/publication`.
 */

apis.get( '/publication', cors(), async ( req, res, next ) => {
    try {
        const data = await getPublications( {
            language: Number( req.query.languageId ),
            from:       Number( req.query.from ),
            to:         Number( req.query.to ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/[id]`.
 */

apis.get( '/:profileId', cors(), async ( req, res, next ) => {
    try {
        const data = await getFacultyDetail( {
            profileId:  Number( req.params.profileId ),
            language:  Number( req.query.languageId ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/facultyWithId/[id]`.
 */

apis.get( '/facultyWithId/:profileId', cors(), async ( req, res, next ) => {
    try {
        const data = await getFacultyDetailWithId( {
            profileId:  Number( req.params.profileId ),
            language:  Number( req.query.languageId ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );

/**
 * Resolve URL `/api/faculty/miniProfile/[id]`.
 */

apis.get( '/miniProfile/:profileId', cors(), async ( req, res, next ) => {
    try {
        const data = await getFacultyMiniProfile( {
            language:  Number( req.query.languageId ),
            profileId:  Number( req.params.profileId ),
        } );
        res.json( data );
    }
    catch ( error ) {
        next( error );
    }
} );


export default apis;
