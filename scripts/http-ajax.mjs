/**
 * AJAX Via XMLHttpRequest without jQuery
 *
 * @copyright: (C) 2016 Vancouver Film School - All Rights Reserved.
 * @author: Scott Henshaw
 * @version: 0.1
 *
 * @summary: Framework Singleton Class to contain a web app
 * @description: A-> $http function is implemented in order to follow the standard Adapter pattern
 * based on the work pulished by Mozilla at
 * https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Promise
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 * @usage:
 *
    // Executes the method call

    http.post( "server/", {'action': 'some_command', 'data':'somePromiseData'} )
        .then( ( data ) => {
            console.log(1, 'success', JSON.parse( data ));
        });

    // Executes the method call but an alternative way (2) to handle Promise Reject case

    http.post( "server/", {'action': 'some_command', 'data':'somePromiseData'}  )
        .then( ( data ) => {
            console.log(1, 'success', JSON.parse( data ));
        })
        .then( undefined, ( data ) => {
            console.log(2, 'error', JSON.parse(data));
        });

*
*/

'use strict';

// Lets make this ES6 class functional, and make it's API
// very similar to the jQuery and Angular versions.
export default class khttp {

    // Method that performs the ajax request
    static _ajax( method, url, args ) {

        // Creating a promise (Promise objects are inherant in ES6)
        let promise = new Promise( ( resolve, reject ) => {

            // Instantiates the XMLHttpRequest
            let client = new XMLHttpRequest();
            let uri = url;

            if (args && (method === 'POST' || method === 'PUT')) {
                uri += '?';
                let argcount = 0;
                for (let key in args) {
                    if (args.hasOwnProperty( key )) {
                        if (argcount++) {
                            uri += '&';
                        }
                        uri += encodeURIComponent( key ) + '=' + encodeURIComponent( args[key] );
                    }
                }
            }

            client.open( method, uri );
            client.send();

            // Sucess callback
            client.onload = function() {

                if (this.status >= 200 && this.status < 300) {
                    // Performs the function "resolve" when this.status is equal to 2xx
                    resolve(this.response);

                } else {
                    // Performs the function "reject" when this.status is different than 2xx
                    reject(this.statusText);
                }
            };

            // Rejection callback
            client.onerror = function() {
                reject( this.statusText );
            };
        });

        // Return the promise
        return promise;
    }

    // Adapter pattern, these all return a promise object.

    static get( url, args )  { return http._ajax('GET', url, args ); }

    static post( url, args ) { return http._ajax('POST', url, args ); }

    static put( url, args )  { return http._ajax('PUT', url, args ); }

    static del( url, args ) { return http._ajax('DELETE', url, args ); }

} // End A
