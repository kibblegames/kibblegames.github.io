
class FX {
    static fadeIn( element, ms = 400 ) {
        return FX.fade( element, ms, false );
    }

    static fadeOut( element, ms = 400 ) {
        return FX.fade( element, ms, true );
    }

    static fade( element, ms = 400, fadeOut = false ) {

        return new Promise( ( resolve, reject ) => {

            let fadeVal = +50/ms;
            let opacity = 0;
            let finalOpacity = 1;

            if (fadeOut) {

                fadeVal = -50/ms;
                opacity = 1;
                finalOpacity = 0;
            }

            let timer = window.setInterval( () => {

                opacity += fadeVal;
                if ((opacity <= 0) || (opacity >= 1)) {

                    window.clearInterval(timer);
                    opacity = finalOpacity;
                    if (fadeOut) {

                        element.style.display = "none";
                        element.style.visibility = "hidden";
                    }
                    resolve();
                }
                element.style.opacity = opacity;
                element.style.filter = `alpha(opacity=${opacity * 100})`;

            }, 50 );
        });
    }
}
