/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as createThemedClasses } from './chunk-f7b6af08.js';

function urlB64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/\-/g, '+')
        .replace(/_/g, '/');
    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);
    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

class AppProfile {
    constructor() {
        // demo key from https://web-push-codelab.glitch.me/
        // replace with your key in production
        this.publicServerKey = urlB64ToUint8Array('BBsb4au59pTKF4IKi-aJkEAGPXxtzs-lbtL58QxolsT2T-3dVQIXTUCCE1TSY8hyUvXLhJFEUmH7b5SJfSTcT-E');
    }
    componentWillLoad() {
        this.swSupport =
            'serviceWorker' in navigator && 'PushManager' in window ? true : false;
    }
    subscribeToNotify($event) {
        if ($event.detail.checked === true) {
            this.handleSub();
        }
    }
    handleSub() {
        // get our service worker registration
        navigator.serviceWorker.getRegistration().then(reg => {
            // check if service worker is registered
            if (reg) {
                // get push subscription
                reg.pushManager.getSubscription().then(sub => {
                    // if there is no subscription that means
                    // the user has not subscribed before
                    if (sub === null) {
                        // user is not subscribed
                        reg.pushManager
                            .subscribe({
                            userVisibleOnly: true,
                            applicationServerKey: this.publicServerKey
                        })
                            .then((sub) => {
                            // our user is now subscribed
                            // lets reflect this in our UI
                            console.log('web push subscription: ', sub);
                            this.notify = true;
                        });
                    }
                });
            }
        });
    }
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-buttons", { slot: "start" },
                        h("ion-back-button", { defaultHref: "/" })),
                    h("ion-title", null,
                        "Profile: ",
                        this.name))),
            h("ion-content", { padding: true },
                h("p", null,
                    "Hello! My name is ",
                    this.name,
                    ". My name was passed in through a route param!"),
                this.swSupport ? (h("ion-item", null,
                    h("ion-label", null, "Notifications"),
                    h("ion-toggle", { checked: this.notify, disabled: this.notify }))) : null)
        ];
    }
    static get is() { return "app-profile"; }
    static get properties() { return {
        "name": {
            "type": String,
            "attr": "name"
        },
        "notify": {
            "state": true
        },
        "swSupport": {
            "state": true
        }
    }; }
    static get listeners() { return [{
            "name": "ionChange",
            "method": "subscribeToNotify"
        }]; }
    static get style() { return ""; }
}

class Header {
    constructor() {
        /**
         * If true, the header will be translucent.
         * Note: In order to scroll content behind the header, the `fullscreen`
         * attribute needs to be set on the content.
         * Defaults to `false`.
         */
        this.translucent = false;
    }
    hostData() {
        const themedClasses = createThemedClasses(this.mode, 'header');
        const translucentClasses = this.translucent ? createThemedClasses(this.mode, 'header-translucent') : null;
        return {
            class: Object.assign({}, themedClasses, translucentClasses)
        };
    }
    static get is() { return "ion-header"; }
    static get properties() { return {
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        }
    }; }
    static get style() { return "ion-header {\n  display: block;\n  position: relative;\n  -webkit-box-ordinal-group: 0;\n  -ms-flex-order: -1;\n  order: -1;\n  width: 100%;\n  z-index: 10; }\n\nion-header ion-toolbar:first-child {\n  padding-top: var(--ion-statusbar-padding, 0); }\n\n.header-md::after {\n  left: 0;\n  bottom: -5px;\n  background-position: left 0 top -2px;\n  position: absolute;\n  width: 100%;\n  height: 5px;\n  background-image: url(\"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAHBAMAAADzDtBxAAAAD1BMVEUAAAAAAAAAAAAAAAAAAABPDueNAAAABXRSTlMUCS0gBIh/TXEAAAAaSURBVAjXYxCEAgY4UIICBmMogMsgFLtAAQCNSwXZKOdPxgAAAABJRU5ErkJggg==\");\n  background-repeat: repeat-x;\n  content: \"\"; }\n\n.header-md[no-border]::after {\n  display: none; }"; }
    static get styleMode() { return "md"; }
}

export { AppProfile, Header as IonHeader };
