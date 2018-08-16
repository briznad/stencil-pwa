/*! Built with http://stenciljs.com */
const { h } = window.App;

import { e as now } from './chunk-a000c498.js';

class Icon {
    constructor() {
        this.isVisible = false;
        /**
         * If enabled, ion-icon will be loaded lazily when it's visible in the viewport.
         * Default, `true`.
         */
        this.lazy = true;
    }
    componentWillLoad() {
        // purposely do not return the promise here because loading
        // the svg file should not hold up loading the app
        // only load the svg if it's visible
        this.waitUntilVisible(this.el, '50px', () => {
            this.isVisible = true;
            this.loadIcon();
        });
    }
    componentDidUnload() {
        if (this.io) {
            this.io.disconnect();
            this.io = undefined;
        }
    }
    waitUntilVisible(el, rootMargin, cb) {
        if (this.lazy && this.win && this.win.IntersectionObserver) {
            const io = this.io = new this.win.IntersectionObserver((data) => {
                if (data[0].isIntersecting) {
                    io.disconnect();
                    this.io = undefined;
                    cb();
                }
            }, { rootMargin });
            io.observe(el);
        }
        else {
            // browser doesn't support IntersectionObserver
            // so just fallback to always show it
            cb();
        }
    }
    loadIcon() {
        if (!this.isServer && this.isVisible) {
            const url = this.getUrl();
            if (url) {
                getSvgContent(url).then(svgContent => {
                    this.svgContent = validateContent(this.doc, svgContent, this.el['s-sc']);
                });
            }
        }
        if (!this.ariaLabel) {
            const name = getName(this.name, this.mode, this.ios, this.md);
            // user did not provide a label
            // come up with the label based on the icon name
            if (name) {
                this.ariaLabel = name
                    .replace('ios-', '')
                    .replace('md-', '')
                    .replace(/\-/g, ' ');
            }
        }
    }
    getUrl() {
        let url = getSrc(this.src);
        if (url) {
            return url;
        }
        url = getName(this.name, this.mode, this.ios, this.md);
        if (url) {
            return this.getNamedUrl(url);
        }
        url = getSrc(this.icon);
        if (url) {
            return url;
        }
        url = getName(this.icon, this.mode, this.ios, this.md);
        if (url) {
            return this.getNamedUrl(url);
        }
        return null;
    }
    getNamedUrl(name) {
        return `${this.resourcesUrl}svg/${name}.svg`;
    }
    hostData() {
        return {
            'role': 'img',
            class: Object.assign({}, createColorClasses(this.color), { [`icon-${this.size}`]: !!this.size })
        };
    }
    render() {
        if (!this.isServer && this.svgContent) {
            // we've already loaded up this svg at one point
            // and the svg content we've loaded and assigned checks out
            // render this svg!!
            return h("div", { class: "icon-inner", innerHTML: this.svgContent });
        }
        // actively requesting the svg
        // or it's an SSR render
        // so let's just render an empty div for now
        return h("div", { class: "icon-inner" });
    }
    static get is() { return "ion-icon"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "ariaLabel": {
            "type": String,
            "attr": "aria-label",
            "reflectToAttr": true,
            "mutable": true
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "doc": {
            "context": "document"
        },
        "el": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon",
            "watchCallbacks": ["loadIcon"]
        },
        "ios": {
            "type": String,
            "attr": "ios"
        },
        "isServer": {
            "context": "isServer"
        },
        "isVisible": {
            "state": true
        },
        "lazy": {
            "type": Boolean,
            "attr": "lazy"
        },
        "md": {
            "type": String,
            "attr": "md"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "name": {
            "type": String,
            "attr": "name",
            "watchCallbacks": ["loadIcon"]
        },
        "resourcesUrl": {
            "context": "resourcesUrl"
        },
        "size": {
            "type": String,
            "attr": "size"
        },
        "src": {
            "type": String,
            "attr": "src",
            "watchCallbacks": ["loadIcon"]
        },
        "svgContent": {
            "state": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get style() { return "\n.sc-ion-icon-h {\n  display: inline-block;\n\n  width: 1em;\n  height: 1em;\n\n  contain: strict;\n\n  -webkit-box-sizing: content-box !important;\n\n  box-sizing: content-box !important;\n}\n\n.ion-color.sc-ion-icon-h {\n  color: var(--ion-color-base) !important;\n}\n\n.icon-small.sc-ion-icon-h {\n  font-size: var(--ion-icon-size-small, 18px) !important;\n}\n\n.icon-large.sc-ion-icon-h{\n  font-size: var(--ion-icon-size-large, 32px) !important;\n}\n\n.icon-inner.sc-ion-icon, svg.sc-ion-icon {\n  display: block;\n\n  height: 100%;\n  width: 100%;\n}\n\nsvg.sc-ion-icon {\n  fill: currentColor;\n  stroke: currentColor;\n}\n\n\n\n\n.ion-color-primary.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-primary, #3880ff);\n}\n\n.ion-color-secondary.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-secondary, #0cd1e8);\n}\n\n.ion-color-tertiary.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-tertiary, #f4a942);\n}\n\n.ion-color-success.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-success, #10dc60);\n}\n\n.ion-color-warning.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-warning, #ffce00);\n}\n\n.ion-color-danger.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-danger, #f14141);\n}\n\n.ion-color-light.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-light, #f4f5f8);\n}\n\n.ion-color-medium.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-medium, #989aa2);\n}\n\n.ion-color-dark.sc-ion-icon-h {\n  --ion-color-base: var(--ion-color-dark, #222428);\n}\n"; }
}
const requests = new Map();
function getSvgContent(url) {
    // see if we already have a request for this url
    let req = requests.get(url);
    if (!req) {
        // we don't already have a request
        req = fetch(url, { cache: 'force-cache' }).then(rsp => {
            if (rsp.ok) {
                return rsp.text();
            }
            return Promise.resolve(null);
        });
        // cache for the same requests
        requests.set(url, req);
    }
    return req;
}
function getName(name, mode, ios, md) {
    // default to "md" if somehow the mode wasn't set
    mode = (mode || 'md').toLowerCase();
    // if an icon was passed in using the ios or md attributes
    // set the iconName to whatever was passed in
    if (ios && mode === 'ios') {
        name = ios.toLowerCase();
    }
    else if (md && mode === 'md') {
        name = md.toLowerCase();
    }
    else if (name) {
        name = name.toLowerCase();
        if (!/^md-|^ios-|^logo-/.test(name)) {
            // this does not have one of the defaults
            // so lets auto add in the mode prefix for them
            name = `${mode}-${name}`;
        }
    }
    if (typeof name !== 'string' || name.trim() === '') {
        return null;
    }
    // only allow alpha characters and dash
    const invalidChars = name.replace(/[a-z]|-|\d/gi, '');
    if (invalidChars !== '') {
        return null;
    }
    return name;
}
function getSrc(src) {
    if (typeof src === 'string') {
        src = src.trim();
        if (src.length > 0 && /(\/|\.)/.test(src)) {
            return src;
        }
    }
    return null;
}
function validateContent(document, svgContent, scopeId) {
    if (svgContent) {
        const frag = document.createDocumentFragment();
        const div = document.createElement('div');
        div.innerHTML = svgContent;
        frag.appendChild(div);
        // setup this way to ensure it works on our buddy IE
        for (let i = div.childNodes.length - 1; i >= 0; i--) {
            if (div.childNodes[i].nodeName.toLowerCase() !== 'svg') {
                div.removeChild(div.childNodes[i]);
            }
        }
        // must only have 1 root element
        const svgElm = div.firstElementChild;
        if (svgElm && svgElm.nodeName.toLowerCase() === 'svg') {
            if (scopeId) {
                svgElm.setAttribute('class', scopeId);
            }
            // root element must be an svg
            // lets double check we've got valid elements
            // do not allow scripts
            if (isValid(svgElm)) {
                return div.innerHTML;
            }
        }
    }
    return '';
}
function isValid(elm) {
    if (elm.nodeType === 1) {
        if (elm.nodeName.toLowerCase() === 'script') {
            return false;
        }
        for (let i = 0; i < elm.attributes.length; i++) {
            const val = elm.attributes[i].value;
            if (typeof val === 'string' && val.toLowerCase().indexOf('on') === 0) {
                return false;
            }
        }
        for (let i = 0; i < elm.childNodes.length; i++) {
            if (!isValid(elm.childNodes[i])) {
                return false;
            }
        }
    }
    return true;
}
function createColorClasses(color) {
    return (color) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : null;
}

class RippleEffect {
    constructor() {
        this.lastClick = -10000;
        this.parent = 'parent';
        /** If true, the ripple effect will listen to any click events and animate */
        this.tapClick = false;
    }
    tapClickChanged(tapClick) {
        this.enableListener(this, 'ionActivated', tapClick, this.parent);
        this.enableListener(this, 'touchstart', !tapClick);
        this.enableListener(this, 'mousedown', !tapClick);
    }
    ionActivated(ev) {
        this.addRipple(ev.detail.x, ev.detail.y);
    }
    touchStart(ev) {
        this.lastClick = now(ev);
        const touches = ev.touches[0];
        this.addRipple(touches.clientX, touches.clientY);
    }
    mouseDown(ev) {
        const timeStamp = now(ev);
        if (this.lastClick < (timeStamp - 1000)) {
            this.addRipple(ev.pageX, ev.pageY);
        }
    }
    componentDidLoad() {
        this.tapClickChanged(this.tapClick);
    }
    /**
     * Adds the ripple effect to the parent elment
     */
    addRipple(pageX, pageY) {
        let x;
        let y;
        let size;
        this.queue.read(() => {
            const rect = this.el.getBoundingClientRect();
            const width = rect.width;
            const height = rect.height;
            size = Math.min(Math.sqrt(width * width + height * height) * 2, MAX_RIPPLE_DIAMETER);
            x = pageX - rect.left - (size / 2);
            y = pageY - rect.top - (size / 2);
        });
        this.queue.write(() => {
            const div = this.doc.createElement('div');
            div.classList.add('ripple-effect');
            const style = div.style;
            const duration = Math.max(RIPPLE_FACTOR * Math.sqrt(size), MIN_RIPPLE_DURATION);
            style.top = y + 'px';
            style.left = x + 'px';
            style.width = size + 'px';
            style.height = size + 'px';
            style.animationDuration = duration + 'ms';
            const container = this.el.shadowRoot || this.el;
            container.appendChild(div);
            setTimeout(() => div.remove(), duration + 50);
        });
    }
    render() {
        return null;
    }
    static get is() { return "ion-ripple-effect"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "addRipple": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "el": {
            "elementRef": true
        },
        "enableListener": {
            "context": "enableListener"
        },
        "parent": {
            "type": String,
            "attr": "parent"
        },
        "queue": {
            "context": "queue"
        },
        "tapClick": {
            "type": Boolean,
            "attr": "tap-click",
            "watchCallbacks": ["tapClickChanged"]
        }
    }; }
    static get listeners() { return [{
            "name": "ionActivated",
            "method": "ionActivated",
            "disabled": true
        }, {
            "name": "touchstart",
            "method": "touchStart",
            "disabled": true,
            "passive": true
        }, {
            "name": "mousedown",
            "method": "mouseDown",
            "disabled": true,
            "passive": true
        }]; }
    static get style() { return "\n.sc-ion-ripple-effect-h {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  contain: strict; }\n\n.ripple-effect.sc-ion-ripple-effect {\n  border-radius: 50%;\n  position: absolute;\n  background-color: currentColor;\n  color: inherit;\n  contain: strict;\n  opacity: 0;\n  -webkit-animation-name: rippleAnimation;\n          animation-name: rippleAnimation;\n  -webkit-animation-duration: 200ms;\n          animation-duration: 200ms;\n  -webkit-animation-timing-function: ease-out;\n          animation-timing-function: ease-out;\n  will-change: transform, opacity;\n  pointer-events: none; }\n\n\@-webkit-keyframes rippleAnimation {\n  0% {\n    -webkit-transform: scale(0.1);\n            transform: scale(0.1);\n    opacity: .2; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0; } }\n\n\@keyframes rippleAnimation {\n  0% {\n    -webkit-transform: scale(0.1);\n            transform: scale(0.1);\n    opacity: .2; }\n  100% {\n    -webkit-transform: scale(1);\n            transform: scale(1);\n    opacity: 0; } }\n"; }
}
const RIPPLE_FACTOR = 35;
const MIN_RIPPLE_DURATION = 260;
const MAX_RIPPLE_DIAMETER = 550;

export { Icon as IonIcon, RippleEffect as IonRippleEffect };
