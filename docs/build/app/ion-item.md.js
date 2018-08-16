/*! Built with http://stenciljs.com */
const { h } = window.App;

import { b as createColorClasses, d as hostContext, c as openURL } from './chunk-f7b6af08.js';
import { b as assert, c as deferEvent, d as renderHiddenInput } from './chunk-a000c498.js';

class Item {
    constructor() {
        this.itemStyles = new Map();
        /**
         * If true, a button tag will be rendered and the item will be tappable. Defaults to `false`.
         */
        this.button = false;
        /**
         * The icon to use when `detail` is set to `true`. Defaults to `"ios-arrow-forward"`.
         */
        this.detailIcon = 'ios-arrow-forward';
        /**
         * If true, the user cannot interact with the item. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * The type of the button. Only used when an `onclick` or `button` property is present.
         * Possible values are: `"submit"`, `"reset"` and `"button"`.
         * Default value is: `"button"`
         */
        this.type = 'button';
    }
    itemStyle(ev) {
        ev.stopPropagation();
        const tagName = ev.target.tagName;
        const updatedStyles = ev.detail;
        const updatedKeys = Object.keys(ev.detail);
        const newStyles = {};
        const childStyles = this.itemStyles.get(tagName) || {};
        let hasStyleChange = false;
        for (const key of updatedKeys) {
            const itemKey = `item-${key}`;
            const newValue = updatedStyles[key];
            if (newValue !== childStyles[itemKey]) {
                hasStyleChange = true;
            }
            newStyles[itemKey] = newValue;
        }
        if (hasStyleChange) {
            this.itemStyles.set(tagName, newStyles);
            this.el.forceUpdate();
        }
    }
    componentDidLoad() {
        // Change the button size to small for each ion-button in the item
        // unless the size is explicitly set
        Array.from(this.el.querySelectorAll('ion-button')).forEach(button => {
            if (!button.size) {
                button.size = 'small';
            }
        });
    }
    isClickable() {
        return !!(this.href || this.el.onclick || this.button);
    }
    hostData() {
        const childStyles = {};
        this.itemStyles.forEach(value => {
            Object.assign(childStyles, value);
        });
        return {
            'tappable': this.isClickable(),
            class: Object.assign({}, childStyles, createColorClasses(this.color), { [`item-lines-${this.lines}`]: !!this.lines, 'item-disabled': this.disabled, 'in-list': hostContext('ion-list', this.el), 'item': true })
        };
    }
    render() {
        const { href, detail, mode, win, state, detailIcon, el, routerDirection, type } = this;
        const clickable = this.isClickable();
        const TagType = clickable ? (href ? 'a' : 'button') : 'div';
        const attrs = TagType === 'button' ? { type } : { href };
        const showDetail = detail != null ? detail : mode === 'ios' && clickable;
        return (h(TagType, Object.assign({}, attrs, { class: "item-native", onClick: ev => openURL(win, href, ev, routerDirection) }),
            h("slot", { name: "start" }),
            h("div", { class: "item-inner" },
                h("div", { class: "input-wrapper" },
                    h("slot", null)),
                h("slot", { name: "end" }),
                showDetail && h("ion-icon", { icon: detailIcon, lazy: false, class: "item-detail-icon" })),
            state && h("div", { class: "item-state" }),
            clickable && mode === 'md' && h("ion-ripple-effect", { tapClick: true, parent: el })));
    }
    static get is() { return "ion-item"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "button": {
            "type": Boolean,
            "attr": "button"
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "detail": {
            "type": Boolean,
            "attr": "detail"
        },
        "detailIcon": {
            "type": String,
            "attr": "detail-icon"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled"
        },
        "el": {
            "elementRef": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "lines": {
            "type": String,
            "attr": "lines"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "state": {
            "type": String,
            "attr": "state"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get listeners() { return [{
            "name": "ionStyle",
            "method": "itemStyle"
        }]; }
    static get style() { return ":host {\n  --min-height: 44px;\n  --background: var(--ion-color-base);\n  --background-active: var(--ion-color-tint);\n  --color: var(--ion-color-contrast);\n  --detail-push-color: var(--ion-color-shade);\n  --border-radius: 0;\n  --border-width: 0;\n  --border-style: solid;\n  --border-color: var(--ion-color-shade);\n  --inner-border-width: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-end: 0;\n  --padding-start: 0;\n  --inner-padding-top: 0;\n  --inner-padding-bottom: 0;\n  --inner-padding-start: 0;\n  --inner-padding-end: 0;\n  --box-shadow: none;\n  --inner-box-shadow: none;\n  --highlight-color-focus: var(--ion-color-primary, #3880ff);\n  --highlight-color-valid: var(--ion-color-success, #10dc60);\n  --highlight-color-invalid: var(--ion-color-danger, #f04141);\n  --highlight-height: 2px;\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  color: var(--ion-color-contrast);\n  text-align: initial;\n  text-decoration: none;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.activated) {\n  --background: var(--background-active); }\n\n:host(.item-disabled) {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n.item-native {\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  border-radius: var(--border-radius);\n  margin: 0;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  position: relative;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: justify;\n  -ms-flex-pack: justify;\n  justify-content: space-between;\n  width: 100%;\n  min-height: var(--min-height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background-color: var(--background);\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\nbutton, a {\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  -webkit-user-drag: none; }\n\n.item-state {\n  left: 0;\n  right: 0;\n  bottom: 0;\n  position: absolute;\n  height: var(--highlight-height); }\n\n.item-inner {\n  margin: 0;\n  padding: var(--inner-padding-top) var(--inner-padding-end) var(--inner-padding-bottom) var(--inner-padding-start);\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-orient: inherit;\n  -webkit-box-direction: inherit;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -webkit-box-align: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  min-height: inherit;\n  border-width: var(--inner-border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  -webkit-box-shadow: var(--inner-box-shadow);\n  box-shadow: var(--inner-box-shadow);\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.input-wrapper {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-orient: inherit;\n  -webkit-box-direction: inherit;\n  -ms-flex-direction: inherit;\n  flex-direction: inherit;\n  -webkit-box-align: inherit;\n  -ms-flex-align: inherit;\n  align-items: inherit;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  text-overflow: ellipsis;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host([vertical-align-top]),\n:host(.item-input) {\n  -webkit-box-align: start;\n  -ms-flex-align: start;\n  align-items: flex-start; }\n\n::slotted(ion-icon) {\n  font-size: 1.6em; }\n\n::slotted(ion-button) {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  z-index: 1; }\n\n:host(.item-label-stacked) .input-wrapper,\n:host(.item-label-floating) .input-wrapper {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n  -ms-flex-direction: column;\n  flex-direction: column; }\n\n:host(.item-label-stacked)::slotted(ion-select),\n:host(.item-label-floating)::slotted(ion-select) {\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  max-width: 100%; }\n\n:host(.item-textarea) {\n  -webkit-box-align: stretch;\n  -ms-flex-align: stretch;\n  align-items: stretch; }\n\n:host(.item-multiple-inputs) ::slotted(ion-select) {\n  position: relative; }\n\n:host(.item-label-stacked) ::slotted(ion-select),\n:host(.item-label-floating) ::slotted(ion-select) {\n  max-width: 100%; }\n\n::slotted(ion-reorder[slot]) {\n  margin-top: 0;\n  margin-bottom: 0; }\n\n:host {\n  --ion-color-base: var(--ion-item-background, transparent);\n  --ion-color-contrast: var(--ion-item-text-color, var(--ion-text-color, #000));\n  --ion-color-tint: var(--ion-item-background-color-active, #f1f1f1);\n  --ion-color-shade: rgba(var(--ion-item-border-color-rgb, 0, 0, 0), 0.13);\n  --transition: background-color 300ms cubic-bezier(.4, 0, .2, 1);\n  --padding-start: 16px;\n  --inner-padding-end: 8px;\n  --padding-start: 16px;\n  font-family: var(--ion-font-family, inherit);\n  font-size: 16px;\n  font-weight: normal;\n  text-transform: none; }\n\n:host(.item-interactive) {\n  --border-width: 0 0 1px 0; }\n\n:host(.item-lines-full) {\n  --border-width: 0 0 1px 0; }\n\n:host(.item-lines-inset) {\n  --inner-border-width: 0 0 1px 0; }\n\n:host(.item-lines-inset),\n:host(.item-lines-none) {\n  --border-width: 0; }\n\n:host(.item-lines-full),\n:host(.item-lines-none) {\n  --inner-border-width: 0; }\n\n.item-detail-icon {\n  color: var(--detail-push-color);\n  font-size: 20px; }\n\n::slotted(:not(.interactive)[slot=\"start\"]),\n::slotted(:not(.interactive)[slot=\"end\"]) {\n  margin: 2px 8px 2px 0; }\n\n::slotted(ion-icon[slot=\"start\"]),\n::slotted(ion-icon[slot=\"end\"]) {\n  margin-left: 0;\n  margin-top: 3px;\n  margin-bottom: 2px; }\n\n::slotted(ion-icon[slot=\"start\"]) + .item-inner,\n::slotted(ion-icon[slot=\"start\"]) + .item-interactive {\n  margin-left: 24px; }\n\n::slotted(ion-avatar[slot=\"start\"]),\n::slotted(ion-thumbnail[slot=\"start\"]) {\n  margin: 8px 16px 8px 0; }\n\n::slotted(ion-avatar[slot=\"end\"]),\n::slotted(ion-thumbnail[slot=\"end\"]) {\n  margin: 8px; }\n\n:host(.item-label-stacked) ::slotted([slot=\"end\"]),\n:host(.item-label-floating) ::slotted([slot=\"end\"]) {\n  margin-top: 7px;\n  margin-bottom: 7px; }\n\n::slotted(.button-small-md) {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: .6em;\n  --padding-end: .6em;\n  --height: 25px;\n  font-size: 12px; }\n\n::slotted(.button-small-md) ion-icon[slot=\"icon-only\"] {\n  padding: 0; }\n\n::slotted(ion-avatar) {\n  width: 40px;\n  height: 40px; }\n\n::slotted(ion-thumbnail) {\n  width: 80px;\n  height: 80px; }\n\n:host(.item-toggle) ::slotted(ion-label),\n:host(.item-radio) ::slotted(ion-label) {\n  margin-left: 0; }\n\n:host(.item-label-stacked) ::slotted(ion-input),\n:host(.item-label-floating) ::slotted(ion-input),\n:host(.item-label-stacked) ::slotted(ion-textarea),\n:host(.item-label-floating) ::slotted(ion-textarea) {\n  --padding-top: 8px;\n  --padding-bottom: 8px;\n  --padding-start: 0; }\n\n:host(:not(.item-label)) ::slotted(ion-input),\n:host(:not(.item-label)) ::slotted(ion-textarea) {\n  --padding-start: 0; }"; }
    static get styleMode() { return "md"; }
}

const iosTransitionAnimation = () => import("./ios.transition.js");
const mdTransitionAnimation = () => import("./md.transition.js");
function transition(opts) {
    return new Promise(resolve => {
        opts.queue.write(async () => {
            beforeTransition(opts);
            const animationBuilder = await getAnimationBuilder(opts);
            const ani = (animationBuilder)
                ? animation(animationBuilder, opts)
                : noAnimation(opts); // fast path for no animation
            resolve(ani);
        });
    });
}
async function getAnimationBuilder(opts) {
    if (!opts.leavingEl || opts.animated === false || opts.duration === 0) {
        return undefined;
    }
    if (opts.animationBuilder) {
        return opts.animationBuilder;
    }
    const builder = (opts.mode === 'ios')
        ? (await iosTransitionAnimation()).iosTransitionAnimation
        : (await mdTransitionAnimation()).mdTransitionAnimation;
    return builder;
}
function beforeTransition(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    setZIndex(enteringEl, leavingEl, opts.direction);
    if (opts.showGoBack) {
        enteringEl.classList.add('can-go-back');
    }
    else {
        enteringEl.classList.remove('can-go-back');
    }
    setPageHidden(enteringEl, false);
    if (leavingEl) {
        setPageHidden(leavingEl, false);
    }
}
function setPageHidden(el, hidden) {
    if (hidden) {
        el.setAttribute('aria-hidden', 'true');
        el.classList.add('ion-page-hidden');
    }
    else {
        el.hidden = false;
        el.removeAttribute('aria-hidden');
        el.classList.remove('ion-page-hidden');
    }
}
async function animation(animationBuilder, opts) {
    await waitForReady(opts, true);
    const trns = await opts.animationCtrl.create(animationBuilder, opts.baseEl, opts);
    fireWillEvents(opts.window, opts.enteringEl, opts.leavingEl);
    await playTransition(trns, opts);
    if (trns.hasCompleted) {
        fireDidEvents(opts.window, opts.enteringEl, opts.leavingEl);
    }
    return trns;
}
async function noAnimation(opts) {
    const enteringEl = opts.enteringEl;
    const leavingEl = opts.leavingEl;
    if (enteringEl) {
        enteringEl.classList.remove('ion-page-invisible');
    }
    if (leavingEl) {
        leavingEl.classList.remove('ion-page-invisible');
    }
    await waitForReady(opts, false);
    fireWillEvents(opts.window, enteringEl, leavingEl);
    fireDidEvents(opts.window, enteringEl, leavingEl);
    return null;
}
async function waitForReady(opts, defaultDeep) {
    const deep = opts.deepWait != null ? opts.deepWait : defaultDeep;
    const promises = deep ? [
        deepReady(opts.enteringEl),
        deepReady(opts.leavingEl),
    ] : [
        shallowReady(opts.enteringEl),
        shallowReady(opts.leavingEl),
    ];
    await Promise.all(promises);
    await notifyViewReady(opts.viewIsReady, opts.enteringEl);
}
async function notifyViewReady(viewIsReady, enteringEl) {
    if (viewIsReady) {
        await viewIsReady(enteringEl);
    }
}
function playTransition(trans, opts) {
    const progressCallback = opts.progressCallback;
    const promise = new Promise(resolve => trans.onFinish(resolve));
    // cool, let's do this, start the transition
    if (progressCallback) {
        // this is a swipe to go back, just get the transition progress ready
        // kick off the swipe animation start
        trans.progressStart();
        progressCallback(trans);
    }
    else {
        // only the top level transition should actually start "play"
        // kick it off and let it play through
        // ******** DOM WRITE ****************
        trans.play();
    }
    // create a callback for when the animation is done
    return promise;
}
function fireWillEvents(win, enteringEl, leavingEl) {
    lifecycle(win, leavingEl, "ionViewWillLeave" /* WillLeave */);
    lifecycle(win, enteringEl, "ionViewWillEnter" /* WillEnter */);
}
function fireDidEvents(win, enteringEl, leavingEl) {
    lifecycle(win, enteringEl, "ionViewDidEnter" /* DidEnter */);
    lifecycle(win, leavingEl, "ionViewDidLeave" /* DidLeave */);
}
function lifecycle(win, el, eventName) {
    if (el) {
        const CEvent = win.CustomEvent;
        const event = new CEvent(eventName, {
            bubbles: false,
            cancelable: false,
        });
        el.dispatchEvent(event);
    }
}
function shallowReady(el) {
    if (el && el.componentOnReady) {
        return el.componentOnReady();
    }
    return Promise.resolve();
}
async function deepReady(el) {
    const element = el;
    if (element) {
        if (element.componentOnReady) {
            const stencilEl = await element.componentOnReady();
            if (stencilEl) {
                return;
            }
        }
        await Promise.all(Array.from(element.children).map(deepReady));
    }
}
function setZIndex(enteringEl, leavingEl, direction) {
    if (enteringEl) {
        enteringEl.style.zIndex = (direction === 'back')
            ? '99'
            : '101';
    }
    if (leavingEl) {
        leavingEl.style.zIndex = '100';
    }
}

async function attachComponent(delegate, container, component, cssClasses, componentProps) {
    if (delegate) {
        return delegate.attachViewToDom(container, component, componentProps, cssClasses);
    }
    if (typeof component !== 'string' && !(component instanceof HTMLElement)) {
        throw new Error('framework delegate is missing');
    }
    const el = (typeof component === 'string')
        ? container.ownerDocument.createElement(component)
        : component;
    if (cssClasses) {
        cssClasses.forEach(c => el.classList.add(c));
    }
    if (componentProps) {
        Object.assign(el, componentProps);
    }
    container.appendChild(el);
    if (el.componentOnReady) {
        await el.componentOnReady();
    }
    return el;
}

class ViewController {
    constructor(component, params) {
        this.component = component;
        this.params = params;
        this.state = 1 /* New */;
    }
    /**
     * @hidden
     */
    async init(container) {
        this.state = 2 /* Attached */;
        if (!this.element) {
            const component = this.component;
            this.element = await attachComponent(this.delegate, container, component, ['ion-page', 'ion-page-invisible'], this.params);
        }
    }
    /**
     * @hidden
     * DOM WRITE
     */
    _destroy() {
        assert(this.state !== 3 /* Destroyed */, 'view state must be ATTACHED');
        const element = this.element;
        if (element) {
            if (this.delegate) {
                this.delegate.removeViewFromDom(element.parentElement, element);
            }
            else {
                element.remove();
            }
        }
        this.nav = undefined;
        this.state = 3 /* Destroyed */;
    }
}
function matches(view, id, params) {
    if (!view) {
        return false;
    }
    if (view.component !== id) {
        return false;
    }
    const currentParams = view.params;
    const null1 = (currentParams == null);
    const null2 = (params == null);
    if (null1 !== null2) {
        return false;
    }
    if (null1 && null2) {
        return true;
    }
    const keysA = Object.keys(currentParams);
    const keysB = Object.keys(params);
    if (keysA.length !== keysB.length) {
        return false;
    }
    // Test for A's keys different from B.
    for (const key of keysA) {
        if (currentParams[key] !== params[key]) {
            return false;
        }
    }
    return true;
}
function convertToView(page, params) {
    if (!page) {
        return null;
    }
    if (page instanceof ViewController) {
        return page;
    }
    return new ViewController(page, params);
}
function convertToViews(pages) {
    return pages.map(page => {
        if (page instanceof ViewController) {
            return page;
        }
        if ('page' in page) {
            return convertToView(page.page, page.params);
        }
        return convertToView(page, undefined);
    }).filter(v => v !== null);
}

class Nav {
    constructor() {
        this.transInstr = [];
        this.useRouter = false;
        this.isTransitioning = false;
        this.destroyed = false;
        this.views = [];
    }
    swipeBackEnabledChanged() {
        if (this.gesture) {
            this.gesture.setDisabled(!this.swipeBackEnabled);
        }
    }
    rootChanged() {
        if (this.root) {
            if (!this.useRouter) {
                this.setRoot(this.root, this.rootParams);
            }
            else {
                console.warn('<ion-nav> does not support a root attribute when using ion-router.');
            }
        }
    }
    componentWillLoad() {
        this.useRouter =
            !!this.win.document.querySelector('ion-router') &&
                !this.el.closest('[no-router]');
        if (this.swipeBackEnabled === undefined) {
            this.swipeBackEnabled = this.config.getBoolean('swipeBackEnabled', this.mode === 'ios');
        }
        if (this.animated === undefined) {
            this.animated = this.config.getBoolean('animate', true);
        }
        this.ionNavWillLoad.emit();
    }
    async componentDidLoad() {
        this.rootChanged();
        this.gesture = (await import("./gesture.js")).createGesture({
            el: this.win.document.body,
            queue: this.queue,
            gestureName: 'goback-swipe',
            gesturePriority: 30,
            threshold: 10,
            canStart: this.canSwipeBack.bind(this),
            onStart: this.swipeBackStart.bind(this),
            onMove: this.swipeBackProgress.bind(this),
            onEnd: this.swipeBackEnd.bind(this),
        });
        this.swipeBackEnabledChanged();
    }
    componentDidUnload() {
        for (const view of this.views) {
            lifecycle(this.win, view.element, "ionViewWillUnload" /* WillUnload */);
            view._destroy();
        }
        if (this.gesture) {
            this.gesture.destroy();
        }
        // release swipe back gesture and transition
        if (this.sbTrns) {
            this.sbTrns.destroy();
        }
        this.transInstr.length = this.views.length = 0;
        this.sbTrns = undefined;
        this.destroyed = true;
    }
    /**
     * Push a new component onto the current navigation stack. Pass any aditional information along as an object. This additional information is accessible through NavParams
     */
    push(component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: -1,
            insertViews: [{ page: component, params: componentProps }],
            opts
        }, done);
    }
    /**
     * Inserts a component into the nav stack at the specified index. This is useful if you need to add a component at any point in your navigation stack.
     */
    insert(insertIndex, component, componentProps, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: [{ page: component, params: componentProps }],
            opts
        }, done);
    }
    /**
     * Inserts an array of components into the nav stack at the specified index. The last component in the array will become instantiated as a view, and animate in to become the active view.
     */
    insertPages(insertIndex, insertComponents, opts, done) {
        return this.queueTrns({
            insertStart: insertIndex,
            insertViews: insertComponents,
            opts
        }, done);
    }
    /**
     * Call to navigate back from a current component. Similar to push(), you can also pass navigation options.
     */
    pop(opts, done) {
        return this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts
        }, done);
    }
    /**
     * Pop to a specific index in the navigation stack
     */
    popTo(indexOrViewCtrl, opts, done) {
        const config = {
            removeStart: -1,
            removeCount: -1,
            opts
        };
        if (typeof indexOrViewCtrl === 'object' && indexOrViewCtrl.component) {
            config.removeView = indexOrViewCtrl;
            config.removeStart = 1;
        }
        else if (typeof indexOrViewCtrl === 'number') {
            config.removeStart = indexOrViewCtrl + 1;
        }
        return this.queueTrns(config, done);
    }
    /**
     * Navigate back to the root of the stack, no matter how far back that is.
     */
    popToRoot(opts, done) {
        return this.queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts
        }, done);
    }
    /**
     * Removes a page from the nav stack at the specified index.
     */
    removeIndex(startIndex, removeCount = 1, opts, done) {
        return this.queueTrns({
            removeStart: startIndex,
            removeCount,
            opts
        }, done);
    }
    /**
     * Set the root for the current navigation stack.
     */
    setRoot(component, componentProps, opts, done) {
        return this.setPages([{ page: component, params: componentProps }], opts, done);
    }
    /**
     * Set the views of the current navigation stack and navigate to the last view. By default animations are disabled, but they can be enabled by passing options to the navigation controller.You can also pass any navigation params to the individual pages in the array.
     */
    setPages(views, opts, done) {
        if (!opts) {
            opts = {};
        }
        // if animation wasn't set to true then default it to NOT animate
        if (opts.animated !== true) {
            opts.animated = false;
        }
        return this.queueTrns({
            insertStart: 0,
            insertViews: views,
            removeStart: 0,
            removeCount: -1,
            opts
        }, done);
    }
    /** @hidden */
    setRouteId(id, params, direction) {
        const active = this.getActive();
        if (matches(active, id, params)) {
            return Promise.resolve({
                changed: false,
                element: active.element
            });
        }
        let resolve;
        const promise = new Promise(r => (resolve = r));
        let finish;
        const commonOpts = {
            updateURL: false,
            viewIsReady: enteringEl => {
                let mark;
                const p = new Promise(r => (mark = r));
                resolve({
                    changed: true,
                    element: enteringEl,
                    markVisible: async () => {
                        mark();
                        await finish;
                    }
                });
                return p;
            }
        };
        if (direction === 0) {
            finish = this.setRoot(id, params, commonOpts);
        }
        else {
            const viewController = this.views.find(v => matches(v, id, params));
            if (viewController) {
                finish = this.popTo(viewController, Object.assign({}, commonOpts, { direction: 'back' }));
            }
            else if (direction === 1) {
                finish = this.push(id, params, commonOpts);
            }
            else if (direction === -1) {
                finish = this.setRoot(id, params, Object.assign({}, commonOpts, { direction: 'back', animated: true }));
            }
        }
        return promise;
    }
    /** @hidden */
    getRouteId() {
        const active = this.getActive();
        return active
            ? {
                id: active.element.tagName,
                params: active.params,
                element: active.element
            }
            : undefined;
    }
    /**
     * Returns true or false if the current view can go back
     */
    canGoBack(view = this.getActive()) {
        return !!(view && this.getPrevious(view));
    }
    /**
     * Gets the active view
     */
    getActive() {
        return this.views[this.views.length - 1];
    }
    /**
     * Returns the view at the index
     */
    getByIndex(index) {
        return this.views[index];
    }
    /**
     * Gets the previous view
     */
    getPrevious(view = this.getActive()) {
        if (!view) {
            return undefined;
        }
        const views = this.views;
        const index = views.indexOf(view);
        return index > 0 ? views[index - 1] : undefined;
    }
    /**
     * Returns the length of navigation stack
     */
    isAnimating() {
        return this.isTransitioning;
    }
    getLength() {
        return this.views.length;
    }
    // _queueTrns() adds a navigation stack change to the queue and schedules it to run:
    // 1. _nextTrns(): consumes the next transition in the queue
    // 2. _viewInit(): initializes enteringView if required
    // 3. _viewTest(): ensures canLeave/canEnter returns true, so the operation can continue
    // 4. _postViewInit(): add/remove the views from the navigation stack
    // 5. _transitionInit(): initializes the visual transition if required and schedules it to run
    // 6. _viewAttachToDOM(): attaches the enteringView to the DOM
    // 7. _transitionStart(): called once the transition actually starts, it initializes the Animation underneath.
    // 8. _transitionFinish(): called once the transition finishes
    // 9. _cleanup(): syncs the navigation internal state with the DOM. For example it removes the pages from the DOM or hides/show them.
    queueTrns(ti, done) {
        const promise = new Promise((resolve, reject) => {
            ti.resolve = resolve;
            ti.reject = reject;
        });
        ti.done = done;
        // Normalize empty
        if (ti.insertViews && ti.insertViews.length === 0) {
            ti.insertViews = undefined;
        }
        // Enqueue transition instruction
        this.transInstr.push(ti);
        // if there isn't a transition already happening
        // then this will kick off this transition
        this.nextTrns();
        return promise;
    }
    success(result, ti) {
        if (this.transInstr === null) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        if (ti.done) {
            ti.done(result.hasCompleted, result.requiresTransition, result.enteringView, result.leavingView, result.direction);
        }
        ti.resolve(result.hasCompleted);
        if (ti.opts.updateURL !== false && this.useRouter) {
            const router = this.win.document.querySelector('ion-router');
            if (router) {
                const direction = result.direction === 'back' ? -1 : 1;
                router.navChanged(direction);
            }
        }
    }
    failed(rejectReason, ti) {
        if (this.transInstr === null) {
            this.fireError('nav controller was destroyed', ti);
            return;
        }
        this.transInstr.length = 0;
        this.fireError(rejectReason, ti);
    }
    fireError(rejectReason, ti) {
        if (ti.done) {
            ti.done(false, false, rejectReason);
        }
        if (ti.reject && !this.destroyed) {
            ti.reject(rejectReason);
        }
        else {
            ti.resolve(false);
        }
    }
    nextTrns() {
        // this is the framework's bread 'n butta function
        // only one transition is allowed at any given time
        if (this.isTransitioning) {
            return false;
        }
        // there is no transition happening right now
        // get the next instruction
        const ti = this.transInstr.shift();
        if (!ti) {
            return false;
        }
        this.runTransition(ti);
        return true;
    }
    async runTransition(ti) {
        try {
            // set that this nav is actively transitioning
            this.ionNavWillChange.emit();
            this.isTransitioning = true;
            this.prepareTI(ti);
            const leavingView = this.getActive();
            const enteringView = this.getEnteringView(ti, leavingView);
            if (!leavingView && !enteringView) {
                throw new Error('no views in the stack to be removed');
            }
            if (enteringView && enteringView.state === 1 /* New */) {
                await enteringView.init(this.el);
            }
            this.postViewInit(enteringView, leavingView, ti);
            // Needs transition?
            const requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) &&
                enteringView !== leavingView;
            const result = requiresTransition
                ? await this.transition(enteringView, leavingView, ti)
                : {
                    // transition is not required, so we are already done!
                    // they're inserting/removing the views somewhere in the middle or
                    // beginning, so visually nothing needs to animate/transition
                    // resolve immediately because there's no animation that's happening
                    hasCompleted: true,
                    requiresTransition: false
                };
            this.success(result, ti);
            this.ionNavDidChange.emit();
        }
        catch (rejectReason) {
            this.failed(rejectReason, ti);
        }
        this.isTransitioning = false;
        this.nextTrns();
    }
    prepareTI(ti) {
        const viewsLength = this.views.length;
        ti.opts = ti.opts || {};
        if (ti.opts.delegate === undefined) {
            ti.opts.delegate = this.delegate;
        }
        if (ti.removeView != null) {
            assert(ti.removeStart != null, 'removeView needs removeStart');
            assert(ti.removeCount != null, 'removeView needs removeCount');
            const index = this.views.indexOf(ti.removeView);
            if (index < 0) {
                throw new Error('removeView was not found');
            }
            ti.removeStart += index;
        }
        if (ti.removeStart != null) {
            if (ti.removeStart < 0) {
                ti.removeStart = viewsLength - 1;
            }
            if (ti.removeCount < 0) {
                ti.removeCount = viewsLength - ti.removeStart;
            }
            ti.leavingRequiresTransition =
                ti.removeCount > 0 && ti.removeStart + ti.removeCount === viewsLength;
        }
        if (ti.insertViews) {
            // allow -1 to be passed in to auto push it on the end
            // and clean up the index if it's larger then the size of the stack
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = ti.insertStart === viewsLength;
        }
        const insertViews = ti.insertViews;
        if (!insertViews) {
            return;
        }
        assert(insertViews.length > 0, 'length can not be zero');
        const viewControllers = convertToViews(insertViews);
        if (viewControllers.length === 0) {
            throw new Error('invalid views to insert');
        }
        // Check all the inserted view are correct
        for (const view of viewControllers) {
            view.delegate = ti.opts.delegate;
            const nav = view.nav;
            if (nav && nav !== this) {
                throw new Error('inserted view was already inserted');
            }
            if (view.state === 3 /* Destroyed */) {
                throw new Error('inserted view was already destroyed');
            }
        }
        ti.insertViews = viewControllers;
    }
    getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews) {
            // grab the very last view of the views to be inserted
            // and initialize it as the new entering view
            return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (removeStart != null) {
            const views = this.views;
            const removeEnd = removeStart + ti.removeCount;
            for (let i = views.length - 1; i >= 0; i--) {
                const view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return undefined;
    }
    postViewInit(enteringView, leavingView, ti) {
        assert(leavingView || enteringView, 'Both leavingView and enteringView are null');
        assert(ti.resolve, 'resolve must be valid');
        assert(ti.reject, 'reject must be valid');
        const opts = ti.opts;
        const insertViews = ti.insertViews;
        const removeStart = ti.removeStart;
        const removeCount = ti.removeCount;
        let destroyQueue;
        // there are views to remove
        if (removeStart != null && removeCount != null) {
            assert(removeStart >= 0, 'removeStart can not be negative');
            assert(removeCount >= 0, 'removeCount can not be negative');
            destroyQueue = [];
            for (let i = 0; i < removeCount; i++) {
                const view = this.views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            // default the direction to "back"
            opts.direction = opts.direction || 'back';
        }
        const finalBalance = this.views.length +
            (insertViews ? insertViews.length : 0) -
            (removeCount ? removeCount : 0);
        assert(finalBalance >= 0, 'final balance can not be negative');
        if (finalBalance === 0) {
            console.warn(`You can't remove all the pages in the navigation stack. nav.pop() is probably called too many times.`, this, this.el);
            throw new Error('navigation stack needs at least one root page');
        }
        // At this point the transition can not be rejected, any throw should be an error
        // there are views to insert
        if (insertViews) {
            // add the views to the
            let insertIndex = ti.insertStart;
            for (const view of insertViews) {
                this.insertViewAt(view, insertIndex);
                insertIndex++;
            }
            if (ti.enteringRequiresTransition) {
                // default to forward if not already set
                opts.direction = opts.direction || 'forward';
            }
        }
        // if the views to be removed are in the beginning or middle
        // and there is not a view that needs to visually transition out
        // then just destroy them and don't transition anything
        // batch all of lifecycles together
        // let's make sure, callbacks are zoned
        if (destroyQueue && destroyQueue.length > 0) {
            for (const view of destroyQueue) {
                lifecycle(this.win, view.element, "ionViewWillLeave" /* WillLeave */);
                lifecycle(this.win, view.element, "ionViewDidLeave" /* DidLeave */);
                lifecycle(this.win, view.element, "ionViewWillUnload" /* WillUnload */);
            }
            // once all lifecycle events has been delivered, we can safely detroy the views
            for (const view of destroyQueue) {
                this.destroyView(view);
            }
        }
    }
    async transition(enteringView, leavingView, ti) {
        if (this.sbTrns) {
            this.sbTrns.destroy();
            this.sbTrns = undefined;
        }
        // we should animate (duration > 0) if the pushed page is not the first one (startup)
        // or if it is a portal (modal, actionsheet, etc.)
        const opts = ti.opts;
        const progressCallback = opts.progressAnimation
            ? (animation) => {
                this.sbTrns = animation;
            }
            : undefined;
        const enteringEl = enteringView.element;
        const leavingEl = leavingView && leavingView.element;
        const animationOpts = Object.assign({ mode: this.mode, animated: this.animated, showGoBack: this.canGoBack(enteringView), animationCtrl: this.animationCtrl, progressCallback, queue: this.queue, window: this.win, baseEl: this.el, enteringEl,
            leavingEl }, opts);
        const trns = await transition(animationOpts);
        return this.transitionFinish(trns, enteringView, leavingView, opts);
    }
    transitionFinish(trans, enteringView, leavingView, opts) {
        const hasCompleted = trans ? trans.hasCompleted : true;
        const cleanupView = hasCompleted ? enteringView : leavingView;
        if (cleanupView) {
            this.cleanup(cleanupView);
        }
        // this is the root transition
        // it's safe to destroy this transition
        if (trans) {
            trans.destroy();
        }
        return {
            hasCompleted,
            requiresTransition: true,
            enteringView,
            leavingView,
            direction: opts.direction
        };
    }
    insertViewAt(view, index) {
        const views = this.views;
        const existingIndex = views.indexOf(view);
        if (existingIndex > -1) {
            // this view is already in the stack!!
            // move it to its new location
            assert(view.nav === this, 'view is not part of the nav');
            views.splice(index, 0, views.splice(existingIndex, 1)[0]);
        }
        else {
            assert(!view.nav, 'nav is used');
            // this is a new view to add to the stack
            // create the new entering view
            view.nav = this;
            // insert the entering view into the correct index in the stack
            views.splice(index, 0, view);
        }
    }
    removeView(view) {
        assert(view.state === 2 /* Attached */ || view.state === 3 /* Destroyed */, 'view state should be loaded or destroyed');
        const views = this.views;
        const index = views.indexOf(view);
        assert(index > -1, 'view must be part of the stack');
        if (index >= 0) {
            views.splice(index, 1);
        }
    }
    destroyView(view) {
        view._destroy();
        this.removeView(view);
    }
    /**
     * DOM WRITE
     */
    cleanup(activeView) {
        // ok, cleanup time!! Destroy all of the views that are
        // INACTIVE and come after the active view
        // only do this if the views exist, though
        if (this.destroyed) {
            return;
        }
        const views = this.views;
        const activeViewIndex = views.indexOf(activeView);
        for (let i = views.length - 1; i >= 0; i--) {
            const view = views[i];
            const element = view.element;
            if (i > activeViewIndex) {
                // this view comes after the active view
                // let's unload it
                lifecycle(this.win, element, "ionViewWillUnload" /* WillUnload */);
                this.destroyView(view);
            }
            else if (i < activeViewIndex) {
                // this view comes before the active view
                // and it is not a portal then ensure it is hidden
                setPageHidden(element, true);
            }
        }
    }
    swipeBackStart() {
        if (this.isTransitioning || this.transInstr.length > 0) {
            return;
        }
        // default the direction to "back";
        const opts = {
            direction: 'back',
            progressAnimation: true
        };
        this.queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts
        }, undefined);
    }
    swipeBackProgress(detail) {
        if (this.sbTrns) {
            // continue to disable the app while actively dragging
            this.isTransitioning = true;
            // set the transition animation's progress
            const delta = detail.deltaX;
            const stepValue = delta / this.win.innerWidth;
            // set the transition animation's progress
            this.sbTrns.progressStep(stepValue);
        }
    }
    swipeBackEnd(detail) {
        if (this.sbTrns) {
            // the swipe back gesture has ended
            const delta = detail.deltaX;
            const width = this.win.innerWidth;
            const stepValue = delta / width;
            const velocity = detail.velocityX;
            const z = width / 2.0;
            const shouldComplete = velocity >= 0 && (velocity > 0.2 || detail.deltaX > z);
            const missing = shouldComplete ? 1 - stepValue : stepValue;
            const missingDistance = missing * width;
            let realDur = 0;
            if (missingDistance > 5) {
                const dur = missingDistance / Math.abs(velocity);
                realDur = Math.min(dur, 300);
            }
            this.sbTrns.progressEnd(shouldComplete, stepValue, realDur);
        }
    }
    canSwipeBack() {
        return !!this.swipeBackEnabled && !this.isTransitioning && this.canGoBack();
    }
    render() {
        return [
            this.mode === 'ios' && h("div", { class: "nav-decor" }),
            h("slot", null)
        ];
    }
    static get is() { return "ion-nav"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "animated": {
            "type": Boolean,
            "attr": "animated",
            "mutable": true
        },
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "canGoBack": {
            "method": true
        },
        "config": {
            "context": "config"
        },
        "delegate": {
            "type": "Any",
            "attr": "delegate"
        },
        "el": {
            "elementRef": true
        },
        "getActive": {
            "method": true
        },
        "getByIndex": {
            "method": true
        },
        "getLength": {
            "method": true
        },
        "getPrevious": {
            "method": true
        },
        "getRouteId": {
            "method": true
        },
        "insert": {
            "method": true
        },
        "insertPages": {
            "method": true
        },
        "isAnimating": {
            "method": true
        },
        "pop": {
            "method": true
        },
        "popTo": {
            "method": true
        },
        "popToRoot": {
            "method": true
        },
        "push": {
            "method": true
        },
        "queue": {
            "context": "queue"
        },
        "removeIndex": {
            "method": true
        },
        "root": {
            "type": String,
            "attr": "root",
            "watchCallbacks": ["rootChanged"]
        },
        "rootParams": {
            "type": "Any",
            "attr": "root-params"
        },
        "setPages": {
            "method": true
        },
        "setRoot": {
            "method": true
        },
        "setRouteId": {
            "method": true
        },
        "swipeBackEnabled": {
            "type": Boolean,
            "attr": "swipe-back-enabled",
            "mutable": true,
            "watchCallbacks": ["swipeBackEnabledChanged"]
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionNavWillLoad",
            "method": "ionNavWillLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionNavWillChange",
            "method": "ionNavWillChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionNavDidChange",
            "method": "ionNavDidChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  position: absolute;\n  contain: layout size style;\n  overflow: hidden;\n  z-index: 0; }\n\n.nav-decor {\n  display: none; }\n\n:host(.show-decor) .nav-decor {\n  left: 0;\n  right: 0;\n  top: 0;\n  bottom: 0;\n  display: block;\n  position: absolute;\n  background: #000;\n  z-index: 0;\n  pointer-events: none; }"; }
}

/**
 * Check to see if the Haptic Plugin is available
 * @return Returns true or false if the plugin is available
 */
/**
 * Trigger a selection changed haptic event. Good for one-time events
 * (not for gestures)
 */
function hapticSelection() {
    const engine = window.TapticEngine;
    if (engine) {
        engine.selection();
    }
}

class Toggle {
    constructor() {
        this.inputId = `ion-tg-${toggleIds++}`;
        this.pivotX = 0;
        this.activated = false;
        this.keyFocus = false;
        /**
         * The name of the control, which is submitted with the form data.
         */
        this.name = this.inputId;
        /**
         * If true, the toggle is selected. Defaults to `false`.
         */
        this.checked = false;
        /*
         * If true, the user cannot interact with the toggle. Default false.
         */
        this.disabled = false;
        /**
         * the value of the toggle.
         */
        this.value = 'on';
    }
    checkedChanged(isChecked) {
        this.ionChange.emit({
            checked: isChecked,
            value: this.value
        });
    }
    disabledChanged() {
        this.ionStyle.emit({
            'interactive-disabled': this.disabled,
        });
        if (this.gesture) {
            this.gesture.setDisabled(this.disabled);
        }
    }
    componentWillLoad() {
        this.ionStyle = deferEvent(this.ionStyle);
    }
    async componentDidLoad() {
        const parentItem = this.nativeInput.closest('ion-item');
        if (parentItem) {
            const itemLabel = parentItem.querySelector('ion-label');
            if (itemLabel) {
                itemLabel.id = this.inputId + '-lbl';
                this.nativeInput.setAttribute('aria-labelledby', itemLabel.id);
            }
        }
        this.gesture = (await import("./gesture.js")).createGesture({
            el: this.el,
            queue: this.queue,
            gestureName: 'toggle',
            gesturePriority: 100,
            threshold: 0,
            onStart: this.onDragStart.bind(this),
            onMove: this.onDragMove.bind(this),
            onEnd: this.onDragEnd.bind(this),
        });
        this.disabledChanged();
    }
    onDragStart(detail) {
        this.pivotX = detail.currentX;
        this.activated = true;
        // touch-action does not work in iOS
        detail.event.preventDefault();
        return true;
    }
    onDragMove(detail) {
        const currentX = detail.currentX;
        if (shouldToggle(this.checked, currentX - this.pivotX, -15)) {
            this.checked = !this.checked;
            this.pivotX = currentX;
            hapticSelection();
        }
    }
    onDragEnd(detail) {
        const delta = detail.currentX - this.pivotX;
        if (shouldToggle(this.checked, delta, 4)) {
            this.checked = !this.checked;
            hapticSelection();
        }
        this.activated = false;
        this.nativeInput.focus();
    }
    onChange() {
        this.checked = !this.checked;
    }
    onKeyUp() {
        this.keyFocus = true;
    }
    onFocus() {
        this.ionFocus.emit();
    }
    onBlur() {
        this.keyFocus = false;
        this.ionBlur.emit();
    }
    hostData() {
        return {
            class: Object.assign({}, createColorClasses(this.color), { 'in-item': hostContext('.item', this.el), 'toggle-activated': this.activated, 'toggle-checked': this.checked, 'toggle-disabled': this.disabled, 'toggle-key': this.keyFocus, 'interactive': true })
        };
    }
    render() {
        renderHiddenInput(this.el, this.name, this.value, this.disabled);
        return [
            h("div", { class: "toggle-icon" },
                h("div", { class: "toggle-inner" })),
            h("input", { type: "checkbox", onChange: this.onChange.bind(this), onFocus: this.onFocus.bind(this), onBlur: this.onBlur.bind(this), onKeyUp: this.onKeyUp.bind(this), checked: this.checked, id: this.inputId, name: this.name, value: this.value, disabled: this.disabled, ref: r => this.nativeInput = r }),
            h("slot", null)
        ];
    }
    static get is() { return "ion-toggle"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "activated": {
            "state": true
        },
        "checked": {
            "type": Boolean,
            "attr": "checked",
            "mutable": true,
            "watchCallbacks": ["checkedChanged"]
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "watchCallbacks": ["disabledChanged"]
        },
        "el": {
            "elementRef": true
        },
        "keyFocus": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "name": {
            "type": String,
            "attr": "name"
        },
        "queue": {
            "context": "queue"
        },
        "value": {
            "type": String,
            "attr": "value"
        }
    }; }
    static get events() { return [{
            "name": "ionChange",
            "method": "ionChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionFocus",
            "method": "ionFocus",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionBlur",
            "method": "ionBlur",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  --ion-color-base: var(--ion-color-primary, #3880ff);\n  --ion-color-base-rgb: var(--ion-color-primary-rgb, 56, 128, 255);\n  /* stylelint-disable-next-line declaration-no-important */\n  -webkit-box-sizing: content-box !important;\n  box-sizing: content-box !important;\n  display: inline-block;\n  contain: content;\n  -ms-touch-action: none;\n  touch-action: none;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n\n:host(.toggle-key) input {\n  border: 2px solid #5e9ed6; }\n\n:host(:focus) {\n  outline: none; }\n\ninput {\n  left: 0;\n  top: 0;\n  margin: 0;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  border: 0;\n  background: transparent;\n  cursor: pointer;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none;\n  outline: none;\n  pointer-events: none; }\n\n:host {\n  --checked-background: rgba(var(--ion-color-base-rgb), 0.5);\n  --checked-knob: var(--ion-color-base);\n  padding: 12px;\n  -webkit-box-sizing: content-box;\n  box-sizing: content-box;\n  position: relative;\n  width: 36px;\n  height: 14px;\n  contain: strict; }\n\n.toggle-icon {\n  border-radius: 14px;\n  display: block;\n  position: relative;\n  width: 100%;\n  height: 100%;\n  -webkit-transition: background-color 300ms;\n  transition: background-color 300ms;\n  background-color: rgba(var(--ion-item-border-color-rgb, 0, 0, 0), 0.13);\n  pointer-events: none; }\n\n.toggle-inner {\n  left: 0;\n  top: -3px;\n  border-radius: 50%;\n  position: absolute;\n  width: 20px;\n  height: 20px;\n  -webkit-transition-duration: 300ms;\n  transition-duration: 300ms;\n  transition-property: background-color, -webkit-transform;\n  -webkit-transition-property: background-color, -webkit-transform;\n  transition-property: transform, background-color;\n  transition-property: transform, background-color, -webkit-transform;\n  background-color: var(--ion-background-color, #fff);\n  -webkit-box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14), 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 1px 5px 0 rgba(0, 0, 0, 0.12);\n  will-change: transform, background-color;\n  contain: strict; }\n\n:host(.toggle-checked) .toggle-icon {\n  background-color: var(--checked-background); }\n\n:host(.toggle-checked) .toggle-inner {\n  -webkit-transform: translate3d(16px,  0,  0);\n          transform: translate3d(16px,  0,  0);\n  background-color: var(--checked-knob); }\n\n:host(.toggle-disabled) {\n  opacity: 0.3;\n  pointer-events: none; }\n\n:host(.in-item[slot]) {\n  margin: 0;\n  padding: 12px 8px 12px 16px;\n  cursor: pointer; }\n\n:host(.in-item[slot=\"start\"]) {\n  padding: 12px 18px 12px 2px; }"; }
    static get styleMode() { return "md"; }
}
function shouldToggle(checked, deltaX, margin) {
    const isRTL = document.dir === 'rtl';
    if (checked) {
        return (!isRTL && (margin > deltaX)) ||
            (isRTL && (-margin < deltaX));
    }
    else {
        return (!isRTL && (-margin < deltaX)) ||
            (isRTL && (margin > deltaX));
    }
}
let toggleIds = 0;

export { Item as IonItem, Nav as IonNav, Toggle as IonToggle };
