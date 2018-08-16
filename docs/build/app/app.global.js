/*! Built with http://stenciljs.com */
(function(namespace,resourcesUrl){"use strict";
(function(resourcesUrl){
    /** App global **/

    /*
      This is temporarily commented out as the `setupConfig` method has been temporarily removed
    */
    // import { setupConfig } from '@ionic/core';
    //setupConfig({
    // uncomment the following line to force mode to be Material Design
    // mode: 'md'
    //});
})(resourcesUrl);


(function(resourcesUrl){
    /** @ionic/core global **/

    const IONIC_PREFIX = 'ionic:';
    function configFromURL() {
        const config = {};
        const win = window;
        win.location.search.slice(1)
            .split('&')
            .map(entry => entry.split('='))
            .map(([key, value]) => [decodeURIComponent(key), decodeURIComponent(value)])
            .filter(([key]) => startsWith(key, IONIC_PREFIX))
            .map(([key, value]) => [key.slice(IONIC_PREFIX.length), value])
            .forEach(([key, value]) => {
            config[key] = value;
        });
        return config;
    }
    function startsWith(input, search) {
        return input.substr(0, search.length) === search;
    }

    function isIOS(win) {
        return testUserAgent(win, /iPad|iPhone|iPod/i);
    }
    function testUserAgent(win, expr) {
        return expr.test(win.navigator.userAgent);
    }

    class Config {
        constructor(configObj) {
            this.m = new Map(Object.entries(configObj));
        }
        get(key, fallback) {
            const value = this.m.get(key);
            return (value !== undefined) ? value : fallback;
        }
        getBoolean(key, fallback = false) {
            const val = this.m.get(key);
            if (val === undefined) {
                return fallback;
            }
            if (typeof val === 'string') {
                return val === 'true';
            }
            return !!val;
        }
        getNumber(key, fallback) {
            const val = parseFloat(this.m.get(key));
            return isNaN(val) ? (fallback !== undefined ? fallback : NaN) : val;
        }
        set(key, value) {
            this.m.set(key, value);
        }
    }

    const Ionic = window['Ionic'] = window['Ionic'] || {};
    // queue used to coordinate DOM reads and
    // write in order to avoid layout thrashing
    Object.defineProperty(Ionic, 'queue', {
        get: () => Context['queue']
    });
    // create the Ionic.config from raw config object (if it exists)
    // and convert Ionic.config into a ConfigApi that has a get() fn
    const config = Ionic['config'] = Context['config'] = new Config(Object.assign({}, Ionic['config'], configFromURL()));
    // first see if the mode was set as an attribute on <html>
    // which could have been set by the user, or by prerendering
    // otherwise get the mode via config settings, and fallback to md
    const documentElement = document.documentElement;
    const mode = config.get('mode', documentElement.getAttribute('mode') || (isIOS(window) ? 'ios' : 'md'));
    Ionic.mode = Context.mode = mode;
    config.set('mode', mode);
    documentElement.setAttribute('mode', mode);
    documentElement.classList.add(mode);
})(resourcesUrl);
})("App");