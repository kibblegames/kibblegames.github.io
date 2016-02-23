# Kibble Games Utility Lib CDN Library
A simple library to encapsulate a couple extensions to javascript Function objects and jQuery

## Installation
Add the following to your head section AFTER jQuery CDN is defined.

<script src="http://kibblegames.github.io/js/klib.js"></script>

## Usage
    There are three separate components at present

### JavaScript Extensions

### .extends( parentObject )
    This extension uses Douglas Crockfords prototypal inheritance example and encapsulates
    it within a single extension to the Function object.
    Define an object, then identify which parent object it extends
    
    function ChildObject( opt1, opt2 ) {
            
        // Do something with options
    
        Parent.call( this, opt1, opt2 );
    }
    ChildObject.extends( parent );



### jQuery Extensions


# Contributing
    1. Fork it!
    2. Create your feature branch: `git checkout -b my-new-feature`
    3. Commit your changes: `git commit -am 'Add some feature'`
    4. Push to the branch: `git push origin my-new-feature`
    5. Submit a pull request :D


## Credits
Concepts and snippits based largely on Douglas Crockfords prototypal JavaScript

## License
GNU general Public Licence