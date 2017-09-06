'use strict';

const usdocker = require('@usdocker/usdocker');

const SCRIPTNAME = 'mongodb';

let config = usdocker.config(SCRIPTNAME);
let configGlobal = usdocker.configGlobal();
const CONTAINERNAME = SCRIPTNAME + configGlobal.get('container-suffix');

function getContainerDef() {

    let docker = usdocker.dockerRunWrapper(configGlobal);
    return docker
        .containerName(CONTAINERNAME)
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
        usdocker.exec(CONTAINERNAME, ['mongo'].concat(extraArgs), callback);
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
        usdocker.up(CONTAINERNAME, getContainerDef(), callback);
    },

    status: function(callback) {
        usdocker.status(CONTAINERNAME, callback);
    },

    down: function(callback)
    {
        usdocker.down(CONTAINERNAME, callback);
    },

    restart: function(callback)
    {
        usdocker.restart(CONTAINERNAME, getContainerDef(), callback);
    }
};