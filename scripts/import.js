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
    
    module.import( "scripts/MyClass.js" )
        .then( ( result ) => { 
             // called once module is loaded.   Chaining these could laod all source nicely.
        });
    
    @requires: jQuery 1.5+
*
*/
'use strict';

class ModuleManager {
    
    constructor() {
        this.imports = {};
        this.__pending = new Map();
        this.__currentModuleName = "";
        this.__callBack = null;
        this.__loader = null;
    }
    
    // var Obj = module.load('fileName').as('ModuleName');
    loadGenerator( ){ 
        
        return this;
    }

    load( fname ) {
        
        return new Promise( ( resolve, reject ) => {
            
            $.getScript( fname )
                then( ( scriptContent, scriptStatus ) => { 
                
                    console.log("Script: "+fname+" was successfully loaded.");            
                    this.__loader.next();
                });
        });
        this.__loader = this.__loadGenerator( fname );
        this.__loader.next();
    }
    
    as( moduleName ) {
        
        return this.loader.next();
    }
    
    
    // module.import( 'module' ).from( 'FileName' ).as( newObj );
    import( moduleName ) {
        
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
                .then( ( scriptContent, scriptStatus )=>{ 
                    
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
