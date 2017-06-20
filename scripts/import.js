/**
 * module import helper to async load and execute a sub-module
 *
 * @copyright: (C) 2017 Vancouver Film School - All Rights Reserved.
 * @author: Scott Henshaw
 * @version: 0.1
 *
 * @summary: Framework Singleton Class to contain a web app
 * @description: Uses an ES6 promise and async callback to signal the calling module that
 * the the desired file has been loaded.
 *
 * @usage:
 *
    // Executes the method call

    MODULE.import("scripts/MyClass.js")
        .then( ( result ) => {
             // called once module is loaded.   Chaining these could laod all source nicely.
        });

    @requires: jQuery 1.5+
*
*/
'use strict';

class ModuleManager {

    constructor() {
        this.modules = new WeakMap();
        this.tempModule = null;

        this.pending = new WeakMap();
        this.pendingModuleName = "";

        this.__currentModuleName = "";
        this.__callBack = null;
    }

    // MODULE.export( someClass ).as('className');
    export( module ) {

        this.tempModule = module;
        return this;
    }
    as( moduleName ) {

        if (this.tempModule != null) {
            this.modules.set( moduleName, this.tempModule );
            this.tempModule = null;
        }

        return this;
    }

    // MODULE.import( moduleName ).from( fileName );
    import( moduleName ) {

        if (this.pendingModuleName.length != 0) {

            let p = new Promise( ( resolve, reject )=> { resolve();  });
            this.pending.set( moduleName, p );
            this.pendingModuleName = moduleName;
        }
        return this;
    }
    from( fileName ) {

        $.getScript( fileName )
            .then( ( scriptContent, scriptStatus ) => {

                console.log("Script: "+fname+" was successfully loaded.");
                this.onSuccess();
            });
        });
    }

    onSuccess() {

        return this.pending.get( this.pendingModuleName );
    }

    // inject('module').from( 'FileName' ).as( newObj );
    inject( moduleName ) {

        this.__currentModuleName = moduleName;
        this.__pending.set( moduleName, true );
        return this;
    }

    fromPromise( fname ) {

        var modObj;

        //$.ajaxSetup({ cache: true });
        $.getScript( fname )
            .then( ( scriptContent, scriptStatus )=>{

                console.log("Script: "+fname+" was successfully loaded.");

                this.imports[this.__currentModuleName] = eval(this.__currentModuleName);
                this.__pending.set( this.__currentModuleName, false );
                this.__currentModuleName = "";
            })
            .catch( ( request, settings, result )=>{

                console.log("Could not load script: "+fname );
            });
    }

    fromSync( fname ) {

        // Old Sync way

        let scriptList = document.getElementsByTagName('script');
        let lastScriptEl = scriptList[scriptList.length-2];
        // Assume some main script we need to insert before.

        if (document.getElementById( this.__currentModuleName ))
            return this;

        let newScriptEl = document.createElement('script');
        newScriptEl.id = this.__currentModuleName;
        newScriptEl.src = fname;

        $(newScriptEl).insertAfter( lastScriptEl );

        return this;
    }

    __readyTest( readyToGo ) {
        return new Promise( ( resolve, reject ) => {

            for(let pendingFlag of this.__pending.values()){

                readyToGo = readyToGo || !pendingFlag;   // if all are false, go
            };
            if (!readyToGo) {

                window.setTimeout( ()=>{}, 250 );
                resolve();
            } else {

                reject();  // Sctually we can stop waiting here.
            }
        });
    }

    // include( Module, file )
    include( subModuleName, fname ) {

        return new Promise( ( resolve, reject )=> {

            //$.ajaxSetup({ cache: true });
            $.getScript( fname )
                .then( ( scriptContent, scriptStatus )=> {

                    console.log("Script: "+fname+" was successfully loaded.");
                    this.imports[subModuleName] = eval(subModuleName);
                    resolve( scriptStatus );
                })
                .catch( ( request, settings, result )=>{
                    console.log("Could not load script: "+fname );
                    reject( result );
                });
        });
    }
}
const MODULE = new ModuleManager();
