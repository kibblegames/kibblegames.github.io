/** ==================================================================================
 * 
 *  Include this (concatenate to it) for global definitions
 *
 *  Kibble Games Gobal Helper Library.
 *
 *  This library contains extensions to JavaScript, jQuery and other components
 *  to add some helper functionality to any JS app.
 *
 *  @author: Scott Henshaw
 *  @copyright: 2014-2016 Kibble Games Inc in cooperation with Vancouver Film School.
 *
 *  Permission is hereby granted, free of charge, to any person obtaining a
 *  copy of this software and associated documentation files (the "Software"),
 *  to deal in the Software without restriction, including without limitation
 *  the rights to use, copy, modify, merge, publish, distribute, sublicense,
 *  and/or sell copies of the Software, and to permit persons to whom the
 *  Software is furnished to do so, subject to the following conditions:
 *
 *  The above copyright notice and this permission notice shall be included
 *  in all copies or substantial portions of the Software.
 *
 *  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
 *  OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 *  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL
 *  THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 *  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 *  FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER
 *  DEALINGS IN THE SOFTWARE.
 *  
 */



/** ==================================================================================
 *
 * Inheritance made easy with .extends( ParentClass );
 *
 * Easier prototypal inheritance by extending the Function prototype with some easy
 * to read inheritance properties
 *
 * Function augmentation to deliver more easily readable classes with inheritance
 *
 * @author: Scott Henshaw, based largely on Douglas Crockford's work
 *
 */
Function.prototype.extends = function( parentClassOrObject ){

	if ( parentClassOrObject.constructor == Function )	{

		//Normal Inheritance
		this.prototype = Object.create( parentClassOrObject.prototype );
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject.prototype;

	} else {

		//Pure Virtual Inheritance
		this.prototype = Object.create( parentClassOrObject );
		this.prototype.constructor = this;
		this.prototype.parent = parentClassOrObject;
	}

	return this;
};


Function.prototype.def = function( baseClassorObject ) {
    
    if (baseClassorObject == Function) {
        
        this.prototype = baseClassorObject.prototype;
        this.prototype.constructor = this;
    }
    return this;
};


/** ==================================================================================
*
* @name $.include() - async load/include a JavaScript source file at this point
*
* Javascript does not natively have includes relying on the HTML/PHP do do it
* but dependencies are not honoured easily; so we can create our own.
* This makes a global include function that can be called to use AJAX to load a script
*
* @usage: $.include( "js/subscript.js" );
*
* @author: Scott Henshaw
*
*/
(function($){

	$.include = function( script ) {

		// Make a jQuery AJAX call to the server, ask for the script
	    $.ajax({
	        url: script,
	        dataType: "script",
	        async: false,           // <-- This is the key - make it synchronous
	        success: function () {
	        	// all good, do nothing script loaded...
	        	// need to flag scripts already loaded so we can't re-load them
	        	console.log("Script [" + script + "] was successfully loaded.");
	        },
	        error: function () {
	        	throw new Error("Could not load script [" + script + "].");
	        }
	    });
	};
	
	$.postJSON = function( url, data, callback ) {
		/**
		 * Force a return type of JSON for async AJAX calls.  This shortcut is used
		 * where you would see $.post( params... )
		 *
		 * 	@usage: $.postJSON( server_url, data_object, callback_fn )
		 *   OR
		 *  @usage: $.postJSON( server_url, data_object ).then( function( data ) {} );
		 *
		 */

		if (callback == undefined) {
		    callback = null;
		}

		// Shift args if one was omitted
	    if (jQuery.isFunction( data )) {

	        callback = data;
	        data = undefined;
	    }

    	var promise = $.ajax({
            type: "POST",
            url: url,
            data: data,
            success: callback,
            dataType: "json",
            //contentType: "application/json; charset=utf-8"
	    });
	    return promise;
	};

})(jQuery);



/** ==================================================================================
*
* @name KLib
*
* Cute little library of helper routines to manage apps in a more robust manner use with care.
*
* @author: Scott Henshaw
*
*/
var Kibble = (function(){
    
    function Library() {
        var self = this;
        self.init();
    };
        
    Library.prototype.init = function() {
        // If we ever need tin initialize stuff, here it goes.
    };
    
    Library.prototype.objFromResponse = function( data ) {
        /** ==============================================================================
         * 
         *  @name objFromResponse
         *  
         *  Generate a JS object from some AJAX response data. Library method determines the 
         *  type of returned data and if its already been converted to an object leave it alone, 
         *  otherwise if its a string, decode it into an object
         *  
         *  @author Scott Henshaw
         */
        var result = null; 
        switch (typeof data) {
            case 'string':
                var result = JSON.parse( data );
                break;
                
            case 'object':
                var result = data;
                break;
            
            default:
                var result = null; 
                break;
        }
        return result;
    };
    
                
    Library.prototype.disableSource = function() {
        /** ==================================================================================
        *
        * @name Kibble.disableSource();
        *
        * Cute little singleton to contain the code redirecting and disabling some of the right click
        * menu functionality (copy save images, view source in most browsers.   use with care.
        *
        * @author: Scott Henshaw
        *
        */
    
        // local private members
    	var m = { 
	        message: "Function Disabled!"
    	};
    
    	this.clickIE4 = function( event ) {
    
    		if (event.button == 2) {
    			alert( m.message );
    			return false;
    		}
    	};
    
    	this.clickNS4 = function( event ) {
    
    		if (document.layers || document.getElementById && !document.all) {
    			if (e.which == 2 || e.which == 3) {
    				alert(message);
    				return false;
    			}
    		}
    	};
    
    	this.source = function() {
    
    		if (document.layers) {
    
    			document.captureEvents( Event.MOUSEDOWN );
    			document.onmousedown = this.clickNS4;
    
    		} else if ( document.all && !document.getElementById ) {
    
    			document.onmousedown = this.clickIE4;
    		}
    
    		document.oncontextmenu = new Function( "alert( my.message ); return false" );
    	};
    };
    
    return new Library();
    
})();

var $K = Kibble;