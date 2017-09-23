'use strict';
const makeCard = require('./lib/makeCard.js'),
    ronSwansonApi = require('./lib/ronSwansonApi.js'),
    audiofiles = require('./lib/audiofile.js'),
    _ = require('lodash');

/**
  * Watercooler contains all of the custom and built in intents we are using for the skill.
**/


let connectTech = function (app) {
    app.makeCard = makeCard;
    app.ronSwansonApi = ronSwansonApi;
    app.audiofiles = audiofiles;
    app._ = _;

    /**
     * app.pre is run before every request.
     */
    // app.pre = function (request) {
    //
    // };


    /**
     *  Custom Intents:
     *      launch
     *      getRonSwansonQuote
     *      audioPlayer
     **/
     app.launch(function (request, response) {
         response.say('Thanks, Jonathan! I love meeting new people. ');
         response.shouldEndSession(false, 'Who did you say you were with?').send();
     });

     app.intent('introduction', (request, response) => {
        return response.say(`Jonathan is a full-stack developer with several years of experience in front end. He is currently seeking full-time employment as a Junior dev.`)
                .send();
     });
     app.intent('interview', {
         slots: {NAME: 'NAME'}
     }, (request, response) => {
         let name= request.slot('NAME');
        return response.say(`Hmm. Yes! I think ${name} would be a good place for you.`)
                .send();
     });

     app.intent('audioPlayer', {
         slots: {NAME: 'NAME'}
     }, (request, response) => {
         let name = request.slot('NAME');
         return app.audiofiles.getTracklist(name)
         .then( (playlist) => {
             console.log(playlist.tracks.items.album)
             let track = playlist.tracks.items.album.preview_url,
                 trackName = playlist.tracks.items.album.name,
                 audioPlayerPayload = {
                    url: track,
                    token: trackName,
                    expectedPreviousToken: 'some_previous_token',
                    offsetInMilliseconds: 0
                 };
             app.makeCard(trackName, response);
             return response.audioPlayerPlayStream('ENQUEUE', audioPlayerPayload)
                     .send();
         }).catch((error) => {
             console.log('error', error);
         });
     });

    /**
     *  Amazon built-in intents:
     *      AMAZON.NextIntent,
     *      AMAZON.PauseIntent,
     *      AMAZON.ResumeIntent,
     *      AMAZON.StopIntent,
     *      AMAZON.CancelIntent
     *      AMAZON.HelpIntent
     **/
     app.intent('AMAZON.CancelIntent', (request, response) => {
         return response.say('Goodbye Connect Tech!')
                             .shouldEndSession(true)
                             .send();
     });

};

module.exports = connectTech;