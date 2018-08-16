/*!
 * Built with http://stenciljs.com
 * 2018-07-16T02:55:11
 */
(function(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components) {

  function init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCorePolyfilled, hydratedCssClass, components, HTMLElementPrototype, App, x, y, scriptElm) {
    // create global namespace if it doesn't already exist
    App = win[namespace] = win[namespace] || {};
    App.components = components;
    y = components.filter(function (c) { return c[2]; }).map(function (c) { return c[0]; });
    if (y.length) {
        // auto hide components until they been fully hydrated
        // reusing the "x" and "i" variables from the args for funzies
        x = doc.createElement('style');
        x.innerHTML = y.join() + '{visibility:hidden}.' + hydratedCssClass + '{visibility:inherit}';
        x.setAttribute('data-styles', '');
        doc.head.insertBefore(x, doc.head.firstChild);
    }
    createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype);
    resourcesUrl = resourcesUrl || App.resourcesUrl;
    // figure out the script element for this current script
    y = doc.querySelectorAll('script');
    for (x = y.length - 1; x >= 0; x--) {
        scriptElm = y[x];
        if (scriptElm.src || scriptElm.hasAttribute('data-resources-url')) {
            break;
        }
    }
    // get the resource path attribute on this script element
    y = scriptElm.getAttribute('data-resources-url');
    if (!resourcesUrl && y) {
        // the script element has a data-resources-url attribute, always use that
        resourcesUrl = y;
    }
    if (!resourcesUrl && scriptElm.src) {
        // we don't have an exact resourcesUrl, so let's
        // figure it out relative to this script's src and app's filesystem namespace
        y = scriptElm.src.split('/').slice(0, -1);
        resourcesUrl = (y.join('/')) + (y.length ? '/' : '') + fsNamespace + '/';
    }
    // request the core this browser needs
    // test for native support of custom elements and fetch
    // if either of those are not supported, then use the core w/ polyfills
    // also check if the page was build with ssr or not
    x = doc.createElement('script');
    if (usePolyfills(win, win.location, x, 'import("")')) {
        // requires the es5/polyfilled core
        x.src = resourcesUrl + appCorePolyfilled;
    }
    else {
        // let's do this!
        x.src = resourcesUrl + appCore;
        x.setAttribute('type', 'module');
        x.setAttribute('crossorigin', true);
    }
    x.setAttribute('data-resources-url', resourcesUrl);
    x.setAttribute('data-namespace', fsNamespace);
    doc.head.appendChild(x);
}
function usePolyfills(win, location, scriptElm, dynamicImportTest) {
    // fyi, dev mode has verbose if/return statements
    // but it minifies to a nice 'lil one-liner ;)
    if (location.search.indexOf('core=esm') > 0) {
        // force esm build
        return false;
    }
    if ((location.search.indexOf('core=es5') > 0) ||
        (location.protocol === 'file:') ||
        (!(win.customElements && win.customElements.define)) ||
        (!win.fetch) ||
        (!(win.CSS && win.CSS.supports && win.CSS.supports('color', 'var(--c)'))) ||
        (!('noModule' in scriptElm))) {
        // es5 build w/ polyfills
        return true;
    }
    // final test to see if this browser support dynamic imports
    return doesNotSupportsDynamicImports(dynamicImportTest);
}
function doesNotSupportsDynamicImports(dynamicImportTest) {
    try {
        new Function(dynamicImportTest);
        return false;
    }
    catch (e) { }
    return true;
}
function createComponentOnReadyPrototype(win, namespace, HTMLElementPrototype) {
    (win['s-apps'] = win['s-apps'] || []).push(namespace);
    if (!HTMLElementPrototype.componentOnReady) {
        HTMLElementPrototype.componentOnReady = function componentOnReady() {
            /*tslint:disable*/
            var elm = this;
            function executor(resolve) {
                if (elm.nodeName.indexOf('-') > 0) {
                    // window hasn't loaded yet and there's a
                    // good chance this is a custom element
                    var apps = win['s-apps'];
                    var appsReady = 0;
                    // loop through all the app namespaces
                    for (var i = 0; i < apps.length; i++) {
                        // see if this app has "componentOnReady" setup
                        if (win[apps[i]].componentOnReady) {
                            // this app's core has loaded call its "componentOnReady"
                            if (win[apps[i]].componentOnReady(elm, resolve)) {
                                // this component does belong to this app and would
                                // have fired off the resolve fn
                                // let's stop here, we're good
                                return;
                            }
                            appsReady++;
                        }
                    }
                    if (appsReady < apps.length) {
                        // not all apps are ready yet
                        // add it to the queue to be figured out when they are
                        (win['s-cr'] = win['s-cr'] || []).push([elm, resolve]);
                        return;
                    }
                }
                // not a recognized app component
                resolve(null);
            }
            // callback wasn't provided, let's return a promise
            if (win.Promise) {
                // use native/polyfilled promise
                return new win.Promise(executor);
            }
            // promise may not have been polyfilled yet
            return { then: executor };
        };
    }
}


  init(win, doc, namespace, fsNamespace, resourcesUrl, appCore, appCoreSsr, appCorePolyfilled, hydratedCssClass, components);

  })(window, document, "App","app",0,"app.core.js","es5-build-disabled.js","hydrated",[["app-home","app-home",1],["app-profile",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["name",1,0,1,2],["notify",5],["swSupport",5]],0,[["ionChange","subscribeToNotify"]]],["ion-animation-controller","ion-animation-controller",0,[["create",6]]],["ion-app","my-app",1,[["config",3,0,0,0,"config"],["el",7],["queue",3,0,0,0,"queue"],["win",3,0,0,0,"window"]]],["ion-back-button",{"ios":"ion-back-button.ios","md":"ion-back-button.md"},1,[["color",1,0,1,2],["config",3,0,0,0,"config"],["defaultHref",1,0,"default-href",2],["el",7],["icon",1,0,1,2],["mode",1,0,1,2],["text",1,0,1,2],["win",3,0,0,0,"window"]],2],["ion-button",{"ios":"ion-button.ios","md":"ion-button.md"},1,[["buttonType",2,0,"button-type",2],["color",1,0,1,2],["disabled",1,0,1,3],["el",7],["expand",1,0,1,2],["fill",2,0,1,2],["href",1,0,1,2],["keyFocus",5],["mode",1,0,1,2],["routerDirection",1,0,"router-direction",2],["shape",1,0,1,2],["size",1,0,1,2],["strong",1,0,1,3],["type",1,0,1,2],["win",3,0,0,0,"window"]],1],["ion-buttons",{"ios":"ion-back-button.ios","md":"ion-back-button.md"},1,0,2],["ion-content",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["color",1,0,1,2],["config",3,0,0,0,"config"],["el",7],["forceOverscroll",1,0,"force-overscroll",3],["fullscreen",1,0,1,3],["getScrollElement",6],["queue",3,0,0,0,"queue"],["scrollEnabled",1,0,"scroll-enabled",3],["scrollEvents",1,0,"scroll-events",3]],1,[["body:ionNavDidChange","onNavChanged"]]],["ion-header",{"ios":"app-profile.ios","md":"app-profile.md"},1,[["mode",1,0,1,2],["translucent",1,0,1,3]]],["ion-icon","ion-icon",1,[["ariaLabel",2,0,"aria-label",2],["color",1,0,1,2],["doc",3,0,0,0,"document"],["el",7],["icon",1,0,1,2],["ios",1,0,1,2],["isServer",3,0,0,0,"isServer"],["isVisible",5],["lazy",1,0,1,3],["md",1,0,1,2],["mode",1,0,1,2],["name",1,0,1,2],["resourcesUrl",3,0,0,0,"resourcesUrl"],["size",1,0,1,2],["src",1,0,1,2],["svgContent",5],["win",3,0,0,0,"window"]],1],["ion-item",{"ios":"ion-item.ios","md":"ion-item.md"},1,[["button",1,0,1,3],["color",1,0,1,2],["detail",1,0,1,3],["detailIcon",1,0,"detail-icon",2],["disabled",1,0,1,3],["el",7],["href",1,0,1,2],["lines",1,0,1,2],["mode",1,0,1,2],["routerDirection",1,0,"router-direction",2],["state",1,0,1,2],["type",1,0,1,2],["win",3,0,0,0,"window"]],1,[["ionStyle","itemStyle"]]],["ion-label",{"ios":"ion-back-button.ios","md":"ion-back-button.md"},1,[["color",1,0,1,2],["el",7],["getText",6],["mode",1,0,1,2],["position",1,0,1,2]],2],["ion-nav",{"ios":"ion-item.ios","md":"ion-item.md"},1,[["animated",2,0,1,3],["animationCtrl",4,0,0,0,"ion-animation-controller"],["canGoBack",6],["config",3,0,0,0,"config"],["delegate",1],["el",7],["getActive",6],["getByIndex",6],["getLength",6],["getPrevious",6],["getRouteId",6],["insert",6],["insertPages",6],["isAnimating",6],["pop",6],["popTo",6],["popToRoot",6],["push",6],["queue",3,0,0,0,"queue"],["removeIndex",6],["root",1,0,1,2],["rootParams",1],["setPages",6],["setRoot",6],["setRouteId",6],["swipeBackEnabled",2,0,"swipe-back-enabled",3],["win",3,0,0,0,"window"]],1],["ion-ripple-effect","ion-icon",1,[["addRipple",6],["doc",3,0,0,0,"document"],["el",7],["enableListener",3,0,0,0,"enableListener"],["parent",1,0,1,2],["queue",3,0,0,0,"queue"],["tapClick",1,0,"tap-click",3]],1,[["ionActivated","ionActivated",1],["mousedown","mouseDown",1,1],["touchstart","touchStart",1,1]]],["ion-route","my-app",0,[["component",1,0,1,2],["componentProps",1],["url",1,0,1,2]]],["ion-router","my-app",0,[["config",3,0,0,0,"config"],["el",7],["navChanged",6],["printDebug",6],["push",6],["queue",3,0,0,0,"queue"],["root",1,0,1,2],["useHash",1,0,"use-hash",3],["win",3,0,0,0,"window"]],0,[["window:popstate","onPopState"]]],["ion-scroll",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["config",3,0,0,0,"config"],["el",7],["forceOverscroll",2,0,"force-overscroll",3],["mode",1,0,1,2],["queue",3,0,0,0,"queue"],["scrollByPoint",6],["scrollEvents",1,0,"scroll-events",3],["scrollToBottom",6],["scrollToPoint",6],["scrollToTop",6],["win",3,0,0,0,"window"]],1,[["scroll","onScroll",0,1]]],["ion-title",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["color",1,0,1,2],["mode",1,0,1,2]],1],["ion-toast",{"ios":"ion-toast.ios","md":"ion-toast.md"},1,[["animationCtrl",4,0,0,0,"ion-animation-controller"],["closeButtonText",1,0,"close-button-text",2],["config",3,0,0,0,"config"],["cssClass",1,0,"css-class",2],["dismiss",6],["duration",1,0,1,4],["el",7],["enterAnimation",1],["keyboardClose",1,0,"keyboard-close",3],["leaveAnimation",1],["message",1,0,1,2],["onDidDismiss",6],["onWillDismiss",6],["overlayId",1,0,"overlay-id",4],["position",1,0,1,2],["present",6],["showCloseButton",1,0,"show-close-button",3],["translucent",1,0,1,3],["willAnimate",1,0,"will-animate",3]],0,[["ionDismiss","onDismiss"]]],["ion-toast-controller","my-app",0,[["create",6],["dismiss",6],["doc",3,0,0,0,"document"],["getTop",6]],0,[["body:ionToastDidUnload","toastWillDismiss"],["body:ionToastWillDismiss","toastWillDismiss"],["body:ionToastWillPresent","toastWillPresent"],["body:keyup.escape","escapeKeyUp"]]],["ion-toggle",{"ios":"ion-item.ios","md":"ion-item.md"},1,[["activated",5],["checked",2,0,1,3],["color",1,0,1,2],["disabled",1,0,1,3],["el",7],["keyFocus",5],["mode",1,0,1,2],["name",1,0,1,2],["queue",3,0,0,0,"queue"],["value",1,0,1,2]],1],["ion-toolbar",{"ios":"ion-content.ios","md":"ion-content.md"},1,[["color",1,0,1,2],["config",3,0,0,0,"config"],["mode",1,0,1,2]],1],["my-app","my-app",1,[["toastCtrl",4,0,0,0,"ion-toast-controller"]],0,[["window:swUpdate","onSWUpdate"]]]],HTMLElement.prototype);