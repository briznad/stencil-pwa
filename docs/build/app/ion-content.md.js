/*! Built with http://stenciljs.com */
const { h } = window.App;

import { b as createColorClasses, d as hostContext, a as createThemedClasses } from './chunk-f7b6af08.js';

class Content {
    constructor() {
        this.cTop = -1;
        this.cBottom = -1;
        /**
         * If true, the content will scroll behind the headers
         * and footers. This effect can easily be seen by setting the toolbar
         * to transparent.
         */
        this.fullscreen = false;
        /**
         * By default `ion-content` uses an `ion-scroll` under the hood to implement scrolling,
         * if you want to disable the content scrolling for a given page, set this property to `false`.
         */
        this.scrollEnabled = true;
        /**
         * Because of performance reasons, ionScroll events are disabled by default, in order to enable them
         * and start listening from (ionScroll), set this property to `true`.
         */
        this.scrollEvents = false;
    }
    onNavChanged() {
        this.resize();
    }
    componentDidLoad() {
        this.resize();
    }
    getScrollElement() {
        return this.scrollEl;
    }
    resize() {
        if (!this.scrollEl) {
            return;
        }
        if (this.fullscreen) {
            this.queue.read(this.readDimensions.bind(this));
        }
        else if (this.cTop !== 0 || this.cBottom !== 0) {
            this.cTop = this.cBottom = 0;
            this.el.forceUpdate();
        }
    }
    readDimensions() {
        const page = getPageElement(this.el);
        const top = Math.max(this.el.offsetTop, 0);
        const bottom = Math.max(page.offsetHeight - top - this.el.offsetHeight, 0);
        const dirty = top !== this.cTop || bottom !== this.cBottom;
        if (dirty) {
            this.cTop = top;
            this.cBottom = bottom;
            this.el.forceUpdate();
        }
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { 'content-size': hostContext('ion-popover', this.el), 'scroll-disabled': !this.scrollEnabled })
        };
    }
    render() {
        this.resize();
        return [
            this.scrollEnabled ? (h("ion-scroll", { ref: el => this.scrollEl = el, mode: this.mode, scrollEvents: this.scrollEvents, forceOverscroll: this.forceOverscroll, style: {
                    'top': `${-this.cTop}px`,
                    'bottom': `${-this.cBottom}px`,
                    '--offset-top': `${this.cTop}px`,
                    '--offset-bottom': `${this.cBottom}px`,
                } },
                h("slot", null))) : h("slot", null),
            h("slot", { name: "fixed" })
        ];
    }
    static get is() { return "ion-content"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "forceOverscroll": {
            "type": Boolean,
            "attr": "force-overscroll"
        },
        "fullscreen": {
            "type": Boolean,
            "attr": "fullscreen"
        },
        "getScrollElement": {
            "method": true
        },
        "queue": {
            "context": "queue"
        },
        "scrollEnabled": {
            "type": Boolean,
            "attr": "scroll-enabled"
        },
        "scrollEvents": {
            "type": Boolean,
            "attr": "scroll-events"
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionNavDidChange",
            "method": "onNavChanged"
        }]; }
    static get style() { return ":host {\n  --ion-color-base: var(--ion-background-color, #fff);\n  --ion-color-contrast: var(--ion-text-color, #000);\n  --padding-top: 0px;\n  --padding-bottom: 0px;\n  --padding-start: 0px;\n  --padding-end: 0px;\n  --keyboard-offset: 0px;\n  --offset-top: 0px;\n  --offset-bottom: 0px;\n  display: block;\n  position: relative;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  width: 100%;\n  height: 100%;\n  /* stylelint-disable */\n  /* TODO: find a better solution in padding.css, that does not require !important, */\n  margin: 0 !important;\n  padding: 0 !important;\n  /* stylelint-enable */\n  background-color: var(--ion-color-base);\n  color: var(--ion-color-contrast);\n  contain: layout size style; }\n\n:host(.scroll-disabled),\nion-scroll {\n  padding: calc(var(--padding-top) + var(--offset-top)) var(--padding-end) calc(var(--padding-bottom) + var(--keyboard-offset) + var(--offset-bottom)) var(--padding-start); }\n\n:host(.ion-color-outer),\n:host(.outer-content) {\n  --ion-color-base: var(--ion-background-color-step-50, #f2f2f2); }\n\n:host(.content-size) ion-scroll {\n  position: relative;\n  contain: none; }\n\n:host {\n  font-family: var(--ion-font-family, inherit); }\n\n::slotted(hr) {\n  background-color: var(--ion-background-color-step-50, #f2f2f2); }"; }
    static get styleMode() { return "md"; }
}
function getParentElement(el) {
    if (el.parentElement) {
        // normal element with a parent element
        return el.parentElement;
    }
    if (el.parentNode && el.parentNode.host) {
        // shadow dom's document fragment
        return el.parentNode.host;
    }
    return null;
}
function getPageElement(el) {
    const tabs = el.closest('ion-tabs');
    if (tabs) {
        return tabs;
    }
    const page = el.closest('ion-app,ion-page,.ion-page,page-inner');
    if (page) {
        return page;
    }
    return getParentElement(el);
}

class Scroll {
    constructor() {
        this.isScrolling = false;
        this.lastScroll = 0;
        this.queued = false;
        // Detail is used in a hot loop in the scroll event, by allocating it here
        // V8 will be able to inline any read/write to it since it's a monomorphic class.
        // https://mrale.ph/blog/2015/01/11/whats-up-with-monomorphism.html
        this.detail = {
            scrollTop: 0,
            scrollLeft: 0,
            type: 'scroll',
            event: undefined,
            startX: 0,
            startY: 0,
            startTimeStamp: 0,
            currentX: 0,
            currentY: 0,
            velocityX: 0,
            velocityY: 0,
            deltaX: 0,
            deltaY: 0,
            timeStamp: 0,
            data: undefined,
            isScrolling: true,
        };
        /** If true, the component will emit scroll events. */
        this.scrollEvents = false;
    }
    componentWillLoad() {
        if (this.forceOverscroll === undefined) {
            this.forceOverscroll = this.mode === 'ios' && ('ontouchstart' in this.win);
        }
    }
    componentDidUnload() {
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
    }
    onScroll(ev) {
        const timeStamp = Date.now();
        const didStart = !this.isScrolling;
        this.lastScroll = timeStamp;
        if (didStart) {
            this.onScrollStart();
        }
        if (!this.queued && this.scrollEvents) {
            this.queued = true;
            this.queue.read(ts => {
                this.queued = false;
                this.detail.event = ev;
                updateScrollDetail(this.detail, this.el, ts, didStart);
                this.ionScroll.emit(this.detail);
            });
        }
    }
    /** Scroll to the top of the component */
    scrollToTop(duration) {
        return this.scrollToPoint(0, 0, duration);
    }
    /** Scroll to the bottom of the component */
    scrollToBottom(duration) {
        const y = this.el.scrollHeight - this.el.clientHeight;
        return this.scrollToPoint(0, y, duration);
    }
    /** Scroll by a specified X/Y distance in the component */
    scrollByPoint(x, y, duration) {
        return this.scrollToPoint(x + this.el.scrollLeft, y + this.el.scrollTop, duration);
    }
    /** Scroll to a specified X/Y location in the component */
    scrollToPoint(x, y, duration) {
        // scroll animation loop w/ easing
        // credit https://gist.github.com/dezinezync/5487119
        let resolve;
        const promise = new Promise(r => {
            resolve = r;
        });
        const self = this;
        const el = self.el;
        if (!el) {
            // invalid element
            resolve();
            return promise;
        }
        if (duration < 32) {
            el.scrollTop = y;
            el.scrollLeft = x;
            resolve();
            return promise;
        }
        const fromY = el.scrollTop;
        const fromX = el.scrollLeft;
        const maxAttempts = (duration / 16) + 100;
        let startTime;
        let attempts = 0;
        let stopScroll = false;
        // scroll loop
        function step(timeStamp) {
            attempts++;
            if (!self.el || stopScroll || attempts > maxAttempts) {
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                resolve();
                return;
            }
            let time = Math.min(1, ((timeStamp - startTime) / duration));
            // where .5 would be 50% of time on a linear scale easedT gives a
            // fraction based on the easing method
            const easedT = (--time) * time * time + 1;
            if (fromY !== y) {
                el.scrollTop = (easedT * (y - fromY)) + fromY;
            }
            if (fromX !== x) {
                el.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
            }
            if (easedT < 1) {
                // do not use DomController here
                // must use nativeRaf in order to fire in the next frame
                // TODO: remove as any
                self.queue.read(step);
            }
            else {
                stopScroll = true;
                self.isScrolling = false;
                el.style.transform = el.style.webkitTransform = '';
                resolve();
            }
        }
        // start scroll loop
        self.isScrolling = true;
        // chill out for a frame first
        this.queue.write(() => {
            this.queue.write(timeStamp => {
                startTime = timeStamp;
                step(timeStamp);
            });
        });
        return promise;
    }
    onScrollStart() {
        this.isScrolling = true;
        this.ionScrollStart.emit({
            isScrolling: true
        });
        if (this.watchDog) {
            clearInterval(this.watchDog);
        }
        // watchdog
        this.watchDog = setInterval(() => {
            if (this.lastScroll < Date.now() - 120) {
                this.onScrollEnd();
            }
        }, 100);
    }
    onScrollEnd() {
        clearInterval(this.watchDog);
        this.watchDog = null;
        this.isScrolling = false;
        this.ionScrollEnd.emit({
            isScrolling: false
        });
    }
    hostData() {
        return {
            class: Object.assign({}, createThemedClasses(this.mode, 'scroll'), { overscroll: this.forceOverscroll })
        };
    }
    render() {
        return h("slot", null);
    }
    static get is() { return "ion-scroll"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "forceOverscroll": {
            "type": Boolean,
            "attr": "force-overscroll",
            "mutable": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "queue": {
            "context": "queue"
        },
        "scrollByPoint": {
            "method": true
        },
        "scrollEvents": {
            "type": Boolean,
            "attr": "scroll-events"
        },
        "scrollToBottom": {
            "method": true
        },
        "scrollToPoint": {
            "method": true
        },
        "scrollToTop": {
            "method": true
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionScrollStart",
            "method": "ionScrollStart",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionScroll",
            "method": "ionScroll",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionScrollEnd",
            "method": "ionScrollEnd",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "scroll",
            "method": "onScroll",
            "passive": true
        }]; }
    static get style() { return ":host {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: block;\n  position: absolute;\n  contain: size style layout;\n  z-index: 1;\n  overflow-x: hidden;\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n  will-change: scroll-position;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.overscroll)::before,\n:host(.overscroll)::after {\n  position: absolute;\n  width: 1px;\n  height: 1px;\n  content: \"\"; }\n\n:host(.overscroll)::before {\n  bottom: -1px; }\n\n:host(.overscroll)::after {\n  top: -1px; }"; }
}
// ******** DOM READ ****************
function updateScrollDetail(detail, el, timestamp, didStart) {
    const prevX = detail.currentX;
    const prevY = detail.currentY;
    const prevT = detail.timeStamp;
    const currentX = el.scrollLeft;
    const currentY = el.scrollTop;
    if (didStart) {
        // remember the start positions
        detail.startTimeStamp = timestamp;
        detail.startX = currentX;
        detail.startY = currentY;
        detail.velocityX = detail.velocityY = 0;
    }
    detail.timeStamp = timestamp;
    detail.currentX = detail.scrollLeft = currentX;
    detail.currentY = detail.scrollTop = currentY;
    detail.deltaX = currentX - detail.startX;
    detail.deltaY = currentY - detail.startY;
    const timeDelta = timestamp - prevT;
    if (timeDelta > 0 && timeDelta < 100) {
        const velocityX = (currentX - prevX) / timeDelta;
        const velocityY = (currentY - prevY) / timeDelta;
        detail.velocityX = velocityX * 0.7 + detail.velocityX * 0.3;
        detail.velocityY = velocityY * 0.7 + detail.velocityY * 0.3;
    }
}

class ToolbarTitle {
    hostData() {
        return {
            class: createColorClasses(this.color)
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-title" },
                h("slot", null))
        ];
    }
    static get is() { return "ion-title"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        }
    }; }
    static get style() { return ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0); }\n\n:host(.ion-color) {\n  color: var(--ion-color-base); }\n\n.toolbar-title {\n  display: block;\n  width: 100%;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  pointer-events: auto; }\n\n:host {\n  padding: 0 12px;\n  font-size: 20px;\n  font-weight: 500; }"; }
    static get styleMode() { return "md"; }
}

class Toolbar {
    hostData() {
        return {
            class: createColorClasses(this.color)
        };
    }
    render() {
        return [
            h("div", { class: "toolbar-background" }),
            h("div", { class: "toolbar-container" },
                h("slot", { name: "start" }),
                h("slot", { name: "secondary" }),
                h("div", { class: "toolbar-content" },
                    h("slot", null)),
                h("slot", { name: "primary" }),
                h("slot", { name: "end" }))
        ];
    }
    static get is() { return "ion-toolbar"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        }
    }; }
    static get style() { return ":host {\n  --border-width: 0;\n  --border-style: solid;\n  --background: var(--ion-color-base);\n  --opacity: 1;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  width: 100%;\n  color: var(--ion-color-contrast);\n  contain: content;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.toolbar-container {\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: row;\n  flex-direction: row;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  contain: content;\n  overflow: hidden;\n  z-index: 10;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.toolbar-background {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  background: var(--background);\n  contain: strict;\n  opacity: var(--opacity);\n  z-index: -1;\n  pointer-events: none; }\n\n:host {\n  --ion-color-base: var(--ion-toolbar-background-color, #f8f8f8);\n  --ion-color-contrast: var(--ion-toolbar-text-color, #424242);\n  --border-color: var(--ion-toolbar-border-color, var(--ion-border-color, #c1c4cd));\n  --padding-top: 4px;\n  --padding-bottom: 4px;\n  --padding-start: 4px;\n  --padding-end: 4px;\n  --min-height: 56px;\n  font-family: var(--ion-font-family, inherit); }\n\n.toolbar-content {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-ordinal-group: 4;\n  -ms-flex-order: 3;\n  order: 3;\n  min-width: 0;\n  max-width: 100%; }"; }
    static get styleMode() { return "md"; }
}

export { Content as IonContent, Scroll as IonScroll, ToolbarTitle as IonTitle, Toolbar as IonToolbar };
