/** ==================================================================================
 * 
 *  Kibble Games Gobal Automated Test Suite Library
 *
 *  This library contains extensions to jQuery's QUnit test suite 
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

'use strict';

var KTest = (function() {

    function Library() {
        
        var self = this;
        self.init();
    };
    
    Library.prototype.init = function() {
        
        var $head = $('head');
        $head.append('<link rel="stylesheet" type="text/css" href="//code.jquery.com/qunit/qunit-1.21.0.css" >');
        
        var testResultsMarkup = '<div id="ktest-results" >';
        testResultsMarkup +=        '<div id="qunit-tests"></div>';
        testResultsMarkup +=        '<div id="qunit-fixture"></div>';
        testResultsMarkup +=        '<script src="//code.jquery.com/qunit/qunit-1.21.0.js"></script>';
        testResultsMarkup +=        '<script src="js/ape_test.js"></script>';
        testResultsMarkup +=        '<script src="js/ape_test.js"></script>';
        testResultsMarkup +=    '</div>';
        
        var $body = $('body');
        $body.append( testResultsMarkup );
        
        // this should load and define QUnit for use.
    };
    
    
    Library.prototype.assert = function( booleanExpression, testName ) {
        
        if (QUnit == undefined)
            return;
            
        QUnit.test( testName, function( assert ) {
            
            assert.ok( !booleanExpression, testName + " Failed!" );
        });
    };

    return new Library();
    
})();

