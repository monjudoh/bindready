function bindReady(callback){
    var isReady = false;
    function ready(){
        if(isReady)return;
        isReady = true;
        callback();
    }
    bindReady = function(){};
    var userAgent = navigator.userAgent.toLowerCase();
    var browser = {
        safari: /webkit/.test( userAgent ),
        opera: /opera/.test( userAgent ),
        msie: /msie/.test( userAgent ) && !/opera/.test( userAgent )
    };
    // Mozilla, Opera (see further below for it) and webkit nightlies currently support this event
    if ( document.addEventListener && !browser.opera)
        // Use the handy event callback
        document.addEventListener( "DOMContentLoaded", ready, false );

    // If IE is used and is not in a frame
    // Continually check to see if the document is ready
    if ( browser.msie && window == top ) (function(){
        if (isReady) return;
        try {
            // If IE is used, use the trick by Diego Perini
            // http://javascript.nwbox.com/IEContentLoaded/
            document.documentElement.doScroll("left");
        } catch( error ) {
            setTimeout( arguments.callee, 0 );
            return;
        }
        // and execute a waiting function
        ready();
    })();

    if ( browser.opera )
        document.addEventListener( "DOMContentLoaded", function () {
            if (isReady) return;
            for (var i = 0; i < document.styleSheets.length; i++)
                if (document.styleSheets[i].disabled) {
                    setTimeout( arguments.callee, 0 );
                    return;
                }
            // and execute a waiting function
            ready();
        }, false);

    if ( browser.safari ) {
        var numStyles;
        function countNumStyles(){
            var d = document;
            var stylesLength = d.getElementsByTagName('style').length;
            var links = d.getElementsByTagName('link');
            for(var i = 0; i++; i < links.length){
                if(links[i].rel == 'stylesheet'){
                    stylesLength++;
                }
            }
            return stylesLength;
        }
        (function(){
            if (isReady) return;
            if ( document.readyState != "loaded" && document.readyState != "complete" ) {
                setTimeout( arguments.callee, 0 );
                return;
            }
            if ( numStyles === undefined )
                numStyles = countNumStyles();
            if ( document.styleSheets.length != numStyles ) {
                setTimeout( arguments.callee, 0 );
                return;
            }
            // and execute a waiting function
            ready();
        })();
    }
    var oldOnload = window.onload;
    window.onload=function(){
        if(oldOnload)oldOnload();
        ready();
    };
}

