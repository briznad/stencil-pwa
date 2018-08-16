/*! Built with http://stenciljs.com */
const { h } = window.App;

import { f as debounce } from './chunk-a000c498.js';
import { d as createOverlay, e as dismissOverlay, f as getTopOverlay, g as removeLastOverlay } from './chunk-84910af1.js';

class MyApp {
    /**
     * Handle service worker updates correctly.
     * This code will show a toast letting the
     * user of the PWA know that there is a
     * new version available. When they click the
     * reload button it then reloads the page
     * so that the new service worker can take over
     * and serve the fresh content
     */
    async onSWUpdate() {
        const toast = await this.toastCtrl.create({
            message: 'New version available',
            showCloseButton: true,
            closeButtonText: 'Reload'
        });
        await toast.present();
        await toast.onWillDismiss();
        window.location.reload();
    }
    render() {
        return (h("ion-app", null,
            h("ion-router", { useHash: false },
                h("ion-route", { url: "/", component: "app-home" }),
                h("ion-route", { url: "/profile/:name", component: "app-profile" })),
            h("ion-nav", null)));
    }
    static get is() { return "my-app"; }
    static get properties() { return {
        "toastCtrl": {
            "connect": "ion-toast-controller"
        }
    }; }
    static get listeners() { return [{
            "name": "window:swUpdate",
            "method": "onSWUpdate"
        }]; }
    static get style() { return ""; }
}

function isIOS(win) {
    return testUserAgent(win, /iPad|iPhone|iPod/i);
}
function isDevice(win) {
    return matchMedia(win, '(any-pointer:coarse)');
}
function isHybrid(win) {
    return isCordova(win) || isCapacitorNative(win);
}
function isCordova(window) {
    const win = window;
    return !!(win['cordova'] || win['phonegap'] || win['PhoneGap']);
}
function isCapacitorNative(window) {
    const win = window;
    const capacitor = win['Capacitor'];
    return !!(capacitor && capacitor.isNative);
}
function isStandaloneMode(win) {
    return win.matchMedia('(display-mode: standalone)').matches;
}
function needInputShims(win) {
    return isIOS(win) && isDevice(win);
}
function testUserAgent(win, expr) {
    return expr.test(win.navigator.userAgent);
}
function matchMedia(win, query, fallback = false) {
    return win.matchMedia
        ? win.matchMedia(query).matches
        : fallback;
}

class App {
    constructor() {
        this.isDevice = false;
    }
    componentWillLoad() {
        this.isDevice = this.config.getBoolean('isDevice', isDevice(this.win));
    }
    componentDidLoad() {
        setTimeout(() => {
            importTapClick(this.win);
            importInputShims(this.win, this.config);
            importStatusTap(this.win, this.isDevice, this.queue);
        }, 32);
    }
    hostData() {
        const hybrid = isHybrid(this.win);
        const isStandalone = isStandaloneMode(this.win);
        const statusbarPadding = this.config.get('statusbarPadding', hybrid || isStandalone);
        return {
            class: {
                'ion-page': true,
                'is-device': this.isDevice,
                'is-hydrid': hybrid,
                'is-standalone': isStandalone,
                'statusbar-padding': statusbarPadding
            }
        };
    }
    static get is() { return "ion-app"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "queue": {
            "context": "queue"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get style() { return "ion-app.is-device {\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none; }\n\nion-app.statusbar-padding {\n  --ion-statusbar-padding: 20px; }\n\n\@supports (padding-top: constant(safe-area-inset-top)) {\n  ion-app.statusbar-padding {\n    --ion-statusbar-padding: constant(safe-area-inset-top); } }\n\n\@supports (padding-top: env(safe-area-inset-top)) {\n  ion-app.statusbar-padding {\n    --ion-statusbar-padding: env(safe-area-inset-top); } }"; }
}
async function importStatusTap(win, device, queue) {
    if (device) {
        (await import("./status-tap.js")).startStatusTap(win, queue);
    }
}
async function importTapClick(win) {
    (await import("./tap-click.js")).startTapClick(win.document);
}
async function importInputShims(win, config) {
    const inputShims = config.getBoolean('inputShims', needInputShims(win));
    if (inputShims) {
        (await import("./input-shims.js")).startInputShims(win.document, config);
    }
}

class Route {
    constructor() {
        /**
         * Relative path that needs to match in order for this route to apply.
         *
         * Accepts paths similar to expressjs so that you can define parameters
         * in the url /foo/:bar where bar would be available in incoming props.
         */
        this.url = '';
    }
    onUpdate(newValue) {
        this.ionRouteDataChanged.emit(newValue);
    }
    onComponentProps(newValue, oldValue) {
        if (newValue === oldValue) {
            return;
        }
        const keys1 = newValue ? Object.keys(newValue) : [];
        const keys2 = oldValue ? Object.keys(oldValue) : [];
        if (keys1.length !== keys2.length) {
            this.onUpdate(newValue);
            return;
        }
        for (const key of keys1) {
            if (newValue[key] !== oldValue[key]) {
                this.onUpdate(newValue);
                return;
            }
        }
    }
    componentDidLoad() {
        this.ionRouteDataChanged.emit();
    }
    componentDidUnload() {
        this.ionRouteDataChanged.emit();
    }
    static get is() { return "ion-route"; }
    static get properties() { return {
        "component": {
            "type": String,
            "attr": "component",
            "watchCallbacks": ["onUpdate"]
        },
        "componentProps": {
            "type": "Any",
            "attr": "component-props",
            "watchCallbacks": ["onComponentProps"]
        },
        "url": {
            "type": String,
            "attr": "url",
            "watchCallbacks": ["onUpdate"]
        }
    }; }
    static get events() { return [{
            "name": "ionRouteDataChanged",
            "method": "ionRouteDataChanged",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
}

function generatePath(segments) {
    const path = segments
        .filter(s => s.length > 0)
        .join('/');
    return '/' + path;
}
function chainToPath(chain) {
    const path = [];
    for (const route of chain) {
        for (const segment of route.path) {
            if (segment[0] === ':') {
                const param = route.params && route.params[segment.slice(1)];
                if (!param) {
                    return null;
                }
                path.push(param);
            }
            else if (segment !== '') {
                path.push(segment);
            }
        }
    }
    return path;
}
function writePath(history, root, useHash, path, intent, state) {
    let url = generatePath([
        ...parsePath(root),
        ...path
    ]);
    if (useHash) {
        url = '#' + url;
    }
    if (intent === 1 /* Forward */) {
        history.pushState(state, '', url);
    }
    else {
        history.replaceState(state, '', url);
    }
}
function removePrefix(prefix, path) {
    if (prefix.length > path.length) {
        return null;
    }
    if (prefix.length <= 1 && prefix[0] === '') {
        return path;
    }
    for (let i = 0; i < prefix.length; i++) {
        if (prefix[i].length > 0 && prefix[i] !== path[i]) {
            return null;
        }
    }
    if (path.length === prefix.length) {
        return [''];
    }
    return path.slice(prefix.length);
}
function readPath(loc, root, useHash) {
    let pathname = loc.pathname;
    if (useHash) {
        const hash = loc.hash;
        pathname = (hash[0] === '#')
            ? hash.slice(1)
            : '';
    }
    const prefix = parsePath(root);
    const path = parsePath(pathname);
    return removePrefix(prefix, path);
}
function parsePath(path) {
    if (path == null) {
        return [''];
    }
    const segments = path.split('/')
        .map(s => s.trim())
        .filter(s => s.length > 0);
    if (segments.length === 0) {
        return [''];
    }
    else {
        return segments;
    }
}

function printRoutes(routes) {
    console.group(`[ion-core] ROUTES[${routes.length}]`);
    for (const chain of routes) {
        const path = [];
        chain.forEach(r => path.push(...r.path));
        const ids = chain.map(r => r.id);
        console.debug(`%c ${generatePath(path)}`, 'font-weight: bold; padding-left: 20px', '=>\t', `(${ids.join(', ')})`);
    }
    console.groupEnd();
}
function printRedirects(redirects) {
    console.group(`[ion-core] REDIRECTS[${redirects.length}]`);
    for (const redirect of redirects) {
        if (redirect.to) {
            console.debug('FROM: ', `$c ${generatePath(redirect.from)}`, 'font-weight: bold', ' TO: ', `$c ${generatePath(redirect.to)}`, 'font-weight: bold');
        }
    }
    console.groupEnd();
}

async function writeNavState(root, chain, intent, index, changed = false) {
    try {
        // find next navigation outlet in the DOM
        const outlet = searchNavNode(root);
        // make sure we can continue interating the DOM, otherwise abort
        if (index >= chain.length || !outlet) {
            return changed;
        }
        await outlet.componentOnReady();
        const route = chain[index];
        const result = await outlet.setRouteId(route.id, route.params, intent);
        // if the outlet changed the page, reset navigation to neutral (no direction)
        // this means nested outlets will not animate
        if (result.changed) {
            intent = 0 /* None */;
            changed = true;
        }
        // recursivelly set nested outlets
        changed = await writeNavState(result.element, chain, intent, index + 1, changed);
        // once all nested outlets are visible let's make the parent visible too,
        // using markVisible prevents flickering
        if (result.markVisible) {
            await result.markVisible();
        }
        return changed;
    }
    catch (e) {
        console.error(e);
        return false;
    }
}
function readNavState(root) {
    const ids = [];
    let outlet;
    let node = root;
    // tslint:disable-next-line:no-constant-condition
    while (true) {
        outlet = searchNavNode(node);
        if (outlet) {
            const id = outlet.getRouteId();
            if (id) {
                node = id.element;
                id.element = undefined;
                ids.push(id);
            }
            else {
                break;
            }
        }
        else {
            break;
        }
    }
    return { ids, outlet };
}
function waitUntilNavNode(win) {
    if (searchNavNode(win.document.body)) {
        return Promise.resolve();
    }
    return new Promise(resolve => {
        win.addEventListener('ionNavWillLoad', resolve, { once: true });
    });
}
const QUERY = ':not([no-router]) ion-nav, :not([no-router]) ion-tabs, :not([no-router]) ion-router-outlet';
function searchNavNode(root) {
    if (!root) {
        return undefined;
    }
    if (root.matches(QUERY)) {
        return root;
    }
    const outlet = root.querySelector(QUERY);
    return outlet ? outlet : undefined;
}

function matchesRedirect(input, route) {
    const { from, to } = route;
    if (to === undefined) {
        return false;
    }
    if (from.length > input.length) {
        return false;
    }
    for (let i = 0; i < from.length; i++) {
        const expected = from[i];
        if (expected === '*') {
            return true;
        }
        if (expected !== input[i]) {
            return false;
        }
    }
    return from.length === input.length;
}
function routeRedirect(path, routes) {
    return routes.find(route => matchesRedirect(path, route));
}
function matchesIDs(ids, chain) {
    const len = Math.min(ids.length, chain.length);
    let i = 0;
    for (; i < len; i++) {
        if (ids[i].toLowerCase() !== chain[i].id) {
            break;
        }
    }
    return i;
}
function matchesPath(inputPath, chain) {
    const segments = new RouterSegments(inputPath);
    let matchesDefault = false;
    let allparams;
    for (let i = 0; i < chain.length; i++) {
        const path = chain[i].path;
        if (path[0] === '') {
            matchesDefault = true;
        }
        else {
            for (const segment of path) {
                const data = segments.next();
                // data param
                if (segment[0] === ':') {
                    if (data === '') {
                        return null;
                    }
                    allparams = allparams || [];
                    const params = allparams[i] || (allparams[i] = {});
                    params[segment.slice(1)] = data;
                }
                else if (data !== segment) {
                    return null;
                }
            }
            matchesDefault = false;
        }
    }
    const matches = (matchesDefault)
        ? matchesDefault === (segments.next() === '')
        : true;
    if (!matches) {
        return null;
    }
    if (allparams) {
        return chain.map((route, i) => ({
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, allparams[i])
        }));
    }
    return chain;
}
function mergeParams(a, b) {
    if (!a && b) {
        return b;
    }
    else if (a && !b) {
        return a;
    }
    else if (a && b) {
        return Object.assign({}, a, b);
    }
    return undefined;
}
function routerIDsToChain(ids, chains) {
    let match = null;
    let maxMatches = 0;
    const plainIDs = ids.map(i => i.id);
    for (const chain of chains) {
        const score = matchesIDs(plainIDs, chain);
        if (score > maxMatches) {
            match = chain;
            maxMatches = score;
        }
    }
    if (match) {
        return match.map((route, i) => ({
            id: route.id,
            path: route.path,
            params: mergeParams(route.params, ids[i] && ids[i].params)
        }));
    }
    return null;
}
function routerPathToChain(path, chains) {
    let match = null;
    let matches = 0;
    for (const chain of chains) {
        const matchedChain = matchesPath(path, chain);
        if (matchedChain !== null) {
            const score = computePriority(matchedChain);
            if (score > matches) {
                matches = score;
                match = matchedChain;
            }
        }
    }
    return match;
}
function computePriority(chain) {
    let score = 1;
    let level = 1;
    for (const route of chain) {
        for (const path of route.path) {
            if (path[0] === ':') {
                score += Math.pow(1, level);
            }
            else if (path !== '') {
                score += Math.pow(2, level);
            }
            level++;
        }
    }
    return score;
}
class RouterSegments {
    constructor(path) {
        this.path = path.slice();
    }
    next() {
        if (this.path.length > 0) {
            return this.path.shift();
        }
        return '';
    }
}

function readRedirects(root) {
    return Array.from(root.children)
        .filter(el => el.tagName === 'ION-ROUTE-REDIRECT')
        .map(el => {
        const to = readProp(el, 'to');
        return {
            from: parsePath(readProp(el, 'from')),
            to: to == null ? undefined : parsePath(to),
        };
    });
}
function readRoutes(root) {
    return flattenRouterTree(readRouteNodes(root));
}
function readRouteNodes(root, node = root) {
    return Array.from(node.children)
        .filter(el => el.tagName === 'ION-ROUTE' && el.component)
        .map(el => {
        const component = readProp(el, 'component');
        if (!component) {
            throw new Error('component missing in ion-route');
        }
        return {
            path: parsePath(readProp(el, 'url')),
            id: component.toLowerCase(),
            params: el.componentProps,
            children: readRouteNodes(root, el)
        };
    });
}
function readProp(el, prop) {
    if (prop in el) {
        return el[prop];
    }
    if (el.hasAttribute(prop)) {
        return el.getAttribute(prop);
    }
    return null;
}
function flattenRouterTree(nodes) {
    const routes = [];
    for (const node of nodes) {
        flattenNode([], routes, node);
    }
    return routes;
}
function flattenNode(chain, routes, node) {
    const s = chain.slice();
    s.push({
        id: node.id,
        path: node.path,
        params: node.params
    });
    if (node.children.length === 0) {
        routes.push(s);
        return;
    }
    for (const sub of node.children) {
        flattenNode(s, routes, sub);
    }
}

class Router {
    constructor() {
        this.previousPath = null;
        this.busy = false;
        this.state = 0;
        this.lastState = 0;
        /**
         * By default `ion-router` will match the routes at the root path ("/").
         * That can be changed when
         *
         */
        this.root = '/';
        /**
         * The router can work in two "modes":
         * - With hash: `/index.html#/path/to/page`
         * - Without hash: `/path/to/page`
         *
         * Using one or another might depend in the requirements of your app and/or where it's deployed.
         *
         * Usually "hash-less" navigation works better for SEO and it's more user friendly too, but it might
         * requires aditional server-side configuration in order to properly work.
         *
         * On the otherside hash-navigation is much easier to deploy, it even works over the file protocol.
         *
         * By default, this property is `true`, change to `false` to allow hash-less URLs.
         */
        this.useHash = true;
    }
    async componentWillLoad() {
        console.debug('[ion-router] router will load');
        await waitUntilNavNode(this.win);
        console.debug('[ion-router] found nav');
        await this.onRoutesChanged();
        this.win.addEventListener('ionRouteRedirectChanged', debounce(this.onRedirectChanged.bind(this), 10));
        this.win.addEventListener('ionRouteDataChanged', debounce(this.onRoutesChanged.bind(this), 100));
        this.onRedirectChanged();
    }
    onPopState() {
        const direction = this.historyDirection();
        const path = this.getPath();
        console.debug('[ion-router] URL changed -> update nav', path, direction);
        return this.writeNavStateRoot(path, direction);
    }
    /** Navigate to the specified URL */
    push(url, direction = 'forward') {
        const path = parsePath(url);
        const intent = DIRECTION_TO_INTENT[direction];
        console.debug('[ion-router] URL pushed -> updating nav', url, direction);
        this.setPath(path, intent);
        return this.writeNavStateRoot(path, intent);
    }
    /** @hidden */
    printDebug() {
        console.debug('CURRENT PATH', this.getPath());
        console.debug('PREVIOUS PATH', this.previousPath);
        printRoutes(readRoutes(this.el));
        printRedirects(readRedirects(this.el));
    }
    /** @hidden */
    async navChanged(intent) {
        if (this.busy) {
            return false;
        }
        const { ids, outlet } = readNavState(this.win.document.body);
        const routes = readRoutes(this.el);
        const chain = routerIDsToChain(ids, routes);
        if (!chain) {
            console.warn('[ion-router] no matching URL for ', ids.map(i => i.id));
            return false;
        }
        const path = chainToPath(chain);
        if (!path) {
            console.warn('[ion-router] router could not match path because some required param is missing');
            return false;
        }
        console.debug('[ion-router] nav changed -> update URL', ids, path);
        this.setPath(path, intent);
        await this.writeNavState(outlet, chain, 0 /* None */, path, null, ids.length);
        return true;
    }
    onRedirectChanged() {
        const path = this.getPath();
        if (path && routeRedirect(path, readRedirects(this.el))) {
            this.writeNavStateRoot(path, 0 /* None */);
        }
    }
    onRoutesChanged() {
        return this.writeNavStateRoot(this.getPath(), 0 /* None */);
    }
    historyDirection() {
        if (this.win.history.state === null) {
            this.state++;
            this.win.history.replaceState(this.state, this.win.document.title, this.win.document.location.href);
        }
        const state = this.win.history.state;
        const lastState = this.lastState;
        this.lastState = state;
        if (state > lastState) {
            return 1 /* Forward */;
        }
        else if (state < lastState) {
            return -1 /* Back */;
        }
        else {
            return 0 /* None */;
        }
    }
    async writeNavStateRoot(path, intent) {
        if (this.busy) {
            return false;
        }
        if (!path) {
            console.error('[ion-router] URL is not part of the routing set');
            return false;
        }
        // lookup redirect rule
        const redirects = readRedirects(this.el);
        const redirect = routeRedirect(path, redirects);
        let redirectFrom = null;
        if (redirect) {
            this.setPath(redirect.to, intent);
            redirectFrom = redirect.from;
            path = redirect.to;
        }
        // lookup route chain
        const routes = readRoutes(this.el);
        const chain = routerPathToChain(path, routes);
        if (!chain) {
            console.error('[ion-router] the path does not match any route');
            return false;
        }
        // write DOM give
        return this.writeNavState(this.win.document.body, chain, intent, path, redirectFrom);
    }
    async writeNavState(node, chain, intent, path, redirectFrom, index = 0) {
        if (this.busy) {
            return false;
        }
        this.busy = true;
        // generate route event and emit will change
        const routeEvent = this.routeChangeEvent(path, redirectFrom);
        if (routeEvent) {
            this.ionRouteWillChange.emit(routeEvent);
        }
        const changed = await writeNavState(node, chain, intent, index);
        this.busy = false;
        if (changed) {
            console.debug('[ion-router] route changed', path);
        }
        // emit did change
        if (routeEvent) {
            this.ionRouteDidChange.emit(routeEvent);
        }
        return changed;
    }
    setPath(path, intent) {
        this.state++;
        writePath(this.win.history, this.root, this.useHash, path, intent, this.state);
    }
    getPath() {
        return readPath(this.win.location, this.root, this.useHash);
    }
    routeChangeEvent(path, redirectFromPath) {
        const from = this.previousPath;
        const to = generatePath(path);
        this.previousPath = to;
        if (to === from) {
            return null;
        }
        const redirectedFrom = redirectFromPath ? generatePath(redirectFromPath) : null;
        return {
            from,
            redirectedFrom,
            to,
        };
    }
    static get is() { return "ion-router"; }
    static get properties() { return {
        "config": {
            "context": "config"
        },
        "el": {
            "elementRef": true
        },
        "navChanged": {
            "method": true
        },
        "printDebug": {
            "method": true
        },
        "push": {
            "method": true
        },
        "queue": {
            "context": "queue"
        },
        "root": {
            "type": String,
            "attr": "root"
        },
        "useHash": {
            "type": Boolean,
            "attr": "use-hash"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
            "name": "ionRouteWillChange",
            "method": "ionRouteWillChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionRouteDidChange",
            "method": "ionRouteDidChange",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "window:popstate",
            "method": "onPopState"
        }]; }
}
const DIRECTION_TO_INTENT = {
    'back': -1 /* Back */,
    'root': 0 /* None */,
    'forward': 1 /* Forward */
};

class ToastController {
    constructor() {
        this.toasts = new Map();
    }
    toastWillPresent(ev) {
        this.toasts.set(ev.target.overlayId, ev.target);
    }
    toastWillDismiss(ev) {
        this.toasts.delete(ev.target.overlayId);
    }
    escapeKeyUp() {
        removeLastOverlay(this.toasts);
    }
    /**
     * Create a toast overlay with toast options.
     */
    create(opts) {
        return createOverlay(this.doc.createElement('ion-toast'), opts);
    }
    /**
     * Dismiss the open toast overlay.
     */
    dismiss(data, role, toastId = -1) {
        return dismissOverlay(data, role, this.toasts, toastId);
    }
    /**
     * Get the most recently opened toast overlay.
     */
    getTop() {
        return getTopOverlay(this.toasts);
    }
    static get is() { return "ion-toast-controller"; }
    static get properties() { return {
        "create": {
            "method": true
        },
        "dismiss": {
            "method": true
        },
        "doc": {
            "context": "document"
        },
        "getTop": {
            "method": true
        }
    }; }
    static get listeners() { return [{
            "name": "body:ionToastWillPresent",
            "method": "toastWillPresent"
        }, {
            "name": "body:ionToastWillDismiss",
            "method": "toastWillDismiss"
        }, {
            "name": "body:ionToastDidUnload",
            "method": "toastWillDismiss"
        }, {
            "name": "body:keyup.escape",
            "method": "escapeKeyUp"
        }]; }
}

export { MyApp, App as IonApp, Route as IonRoute, Router as IonRouter, ToastController as IonToastController };
