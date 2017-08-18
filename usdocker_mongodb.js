'use strict';

const usdocker = require('usdocker');

const SCRIPTNAME = 'mongodb';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(SCRIPTNAME + configGlobal.get('container-suffix'))
        .port(config.get('port'), 27017)
        .volume(config.get('folder'), '/data/db')
        .env('TZ', configGlobal.get('timezone'))
        .isDetached(true)
        .isRemove(true)
        .imageName(config.get('image'))
    ;
}

module.exports = {
    setup: function(callback)
    {
        config.setEmpty('image', 'mongo:3');
        config.setEmpty('folder', config.getDataDir());
        config.setEmpty('port', 27017);
        callback(null, 'setup loaded for ' + SCRIPTNAME);
    },

    client: function(callback, extraArgs)
    {
        usdocker.exec(SCRIPTNAME, ['mongo'].concat(extraArgs), callback);
    },

    debugcli(callback) {
        let result = usdocker.outputRaw('cli', getContainerDef());
        callback(result);
    },

    debugapi(callback) {
        let result = usdocker.outputRaw('api', getContainerDef());
        callback(result);
    },

    up: function(callback)
    {
        usdocker.up(SCRIPTNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(SCRIPTNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(SCRIPTNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(SCRIPTNAME, getContainerDef(), callback);
    }
};