/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as dismiss, b as eventMethod, c as present } from './chunk-84910af1.js';
import { a as createThemedClasses, e as getClassMap } from './chunk-f7b6af08.js';

/**
 * iOS Toast Enter Animation
 */
function iosEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    let variable;
    if (CSS.supports('bottom', 'env(safe-area-inset-bottom)')) {
        variable = 'env';
    }
    else if (CSS.supports('bottom', 'constant(safe-area-inset-bottom)')) {
        variable = 'constant';
    }
    const bottom = variable ? 'calc(-10px - ' + variable + '(safe-area-inset-bottom))' : '-10px';
    const top = variable ? 'calc(' + variable + '(safe-area-inset-top) + 10px)' : '10px';
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', top);
            break;
        case 'middle':
            const topPosition = Math.floor(baseEl.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', bottom);
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.155,1.105,.295,1.12)')
        .duration(400)
        .add(wrapperAnimation));
}

/**
 * iOS Toast Leave Animation
 */
function iosLeaveAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    let variable;
    if (CSS.supports('bottom', 'env(safe-area-inset-bottom)')) {
        variable = 'env';
    }
    else if (CSS.supports('bottom', 'constant(safe-area-inset-bottom)')) {
        variable = 'constant';
    }
    const bottom = variable ? 'calc(-10px - ' + variable + '(safe-area-inset-bottom))' : '-10px';
    const top = variable ? 'calc(' + variable + '(safe-area-inset-top) + 10px)' : '10px';
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', top, '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', bottom, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

/**
 * MD Toast Enter Animation
 */
function mdEnterAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '-100%', '0%');
            break;
        case 'middle':
            const topPosition = Math.floor(baseEl.clientHeight / 2 - wrapperEle.clientHeight / 2);
            wrapperEle.style.top = `${topPosition}px`;
            wrapperAnimation.fromTo('opacity', 0.01, 1);
            break;
        default:
            wrapperAnimation.fromTo('translateY', '100%', '0%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(400)
        .add(wrapperAnimation));
}

/**
 * md Toast Leave Animation
 */
function mdLeaveAnimation(AnimationC, baseEl, position) {
    const baseAnimation = new AnimationC();
    const wrapperAnimation = new AnimationC();
    const wrapperEle = baseEl.querySelector('.toast-wrapper');
    wrapperAnimation.addElement(wrapperEle);
    switch (position) {
        case 'top':
            wrapperAnimation.fromTo('translateY', '0px', '-100%');
            break;
        case 'middle':
            wrapperAnimation.fromTo('opacity', 0.99, 0);
            break;
        default:
            wrapperAnimation.fromTo('translateY', `0px`, '100%');
            break;
    }
    return Promise.resolve(baseAnimation
        .addElement(baseEl)
        .easing('cubic-bezier(.36,.66,.04,1)')
        .duration(300)
        .add(wrapperAnimation));
}

class Toast {
    constructor() {
        this.presented = false;
        /** @hidden */
        this.keyboardClose = false;
        /**
         * If true, the close button will be displayed. Defaults to `false`.
         */
        this.showCloseButton = false;
        /**
         * If true, the toast will be translucent. Defaults to `false`.
         */
        this.translucent = false;
        /**
         * If true, the toast will animate. Defaults to `true`.
         */
        this.willAnimate = true;
    }
    componentDidLoad() {
        this.ionToastDidLoad.emit();
    }
    componentDidUnload() {
        this.ionToastDidUnload.emit();
    }
    onDismiss(ev) {
        ev.stopPropagation();
        ev.preventDefault();
        this.dismiss();
    }
    /**
     * Present the toast overlay after it has been created.
     */
    async present() {
        await present(this, 'toastEnter', iosEnterAnimation, mdEnterAnimation, this.position);
        if (this.duration) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration);
        }
    }
    /**
     * Dismiss the toast overlay after it has been presented.
     */
    dismiss(data, role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return dismiss(this, data, role, 'toastLeave', iosLeaveAnimation, mdLeaveAnimation, this.position);
    }
    /**
     * Returns a promise that resolves when the toast did dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onDidDismiss(callback) {
        return eventMethod(this.el, 'ionToastDidDismiss', callback);
    }
    /**
     * Returns a promise that resolves when the toast will dismiss. It also accepts a callback
     * that is called in the same circustances.
     *
     */
    onWillDismiss(callback) {
        return eventMethod(this.el, 'ionToastWillDismiss', callback);
    }
    hostData() {
        const themedClasses = this.translucent ? createThemedClasses(this.mode, 'toast-translucent') : {};
        return {
            class: Object.assign({}, themedClasses, createThemedClasses(this.mode, 'toast'), getClassMap(this.cssClass))
        };
    }
    render() {
        const position = this.position ? this.position : 'bottom';
        const wrapperClass = {
            'toast-wrapper': true,
            [`toast-${position}`]: true
        };
        return (h("div", { class: wrapperClass },
            h("div", { class: "toast-container" },
                this.message
                    ? h("div", { class: "toast-message" }, this.message)
                    : null,
                this.showCloseButton
                    ? h("ion-button", { fill: "clear", color: "light", class: "toast-button", onClick: () => this.dismiss() }, this.closeButtonText || 'Close')
                    : null)));
    }
    static get is() { return "ion-toast"; }
    static get properties() { return {
        "animationCtrl": {
            "connect": "ion-animation-controller"
        },
        "closeButtonText": {
            "type": String,
            "attr": "close-button-text"
        },
        "config": {
            "context": "config"
        },
        "cssClass": {
            "type": String,
            "attr": "css-class"
        },
        "dismiss": {
            "method": true
        },
        "duration": {
            "type": Number,
            "attr": "duration"
        },
        "el": {
            "elementRef": true
        },
        "enterAnimation": {
            "type": "Any",
            "attr": "enter-animation"
        },
        "keyboardClose": {
            "type": Boolean,
            "attr": "keyboard-close"
        },
        "leaveAnimation": {
            "type": "Any",
            "attr": "leave-animation"
        },
        "message": {
            "type": String,
            "attr": "message"
        },
        "onDidDismiss": {
            "method": true
        },
        "onWillDismiss": {
            "method": true
        },
        "overlayId": {
            "type": Number,
            "attr": "overlay-id"
        },
        "position": {
            "type": String,
            "attr": "position"
        },
        "present": {
            "method": true
        },
        "showCloseButton": {
            "type": Boolean,
            "attr": "show-close-button"
        },
        "translucent": {
            "type": Boolean,
            "attr": "translucent"
        },
        "willAnimate": {
            "type": Boolean,
            "attr": "will-animate"
        }
    }; }
    static get events() { return [{
            "name": "ionToastDidLoad",
            "method": "ionToastDidLoad",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidPresent",
            "method": "didPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillPresent",
            "method": "willPresent",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastWillDismiss",
            "method": "willDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidDismiss",
            "method": "didDismiss",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }, {
            "name": "ionToastDidUnload",
            "method": "ionToastDidUnload",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get listeners() { return [{
            "name": "ionDismiss",
            "method": "onDismiss"
        }]; }
    static get style() { return "ion-toast {\n  left: 0;\n  top: 0;\n  display: block;\n  position: absolute;\n  width: 100%;\n  height: 100%;\n  contain: strict;\n  z-index: 1000;\n  pointer-events: none; }\n\n.toast-container {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  pointer-events: auto;\n  contain: content; }\n\n.toast-button {\n  font-size: 15px; }\n\n.toast-message {\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1; }\n\n.toast-ios {\n  font-family: var(--ion-font-family, inherit); }\n\n.toast-ios .toast-wrapper {\n  left: 10px;\n  right: 10px;\n  margin: auto;\n  border-radius: 14px;\n  display: block;\n  position: absolute;\n  max-width: 700px;\n  background: var(--ion-background-color-step-50, #f2f2f2);\n  z-index: 10; }\n\n.toast-translucent-ios .toast-wrapper {\n  background: rgba(var(--ion-background-color-rgb, 255, 255, 255), 0.8);\n  -webkit-backdrop-filter: saturate(180%) blur(20px);\n          backdrop-filter: saturate(180%) blur(20px); }\n\n.toast-ios .toast-wrapper.toast-top {\n  -webkit-transform: translate3d(0,  -100%,  0);\n          transform: translate3d(0,  -100%,  0);\n  top: 0; }\n\n.toast-ios .toast-wrapper.toast-bottom {\n  -webkit-transform: translate3d(0,  100%,  0);\n          transform: translate3d(0,  100%,  0);\n  bottom: 0; }\n\n.toast-ios .toast-wrapper.toast-middle {\n  opacity: .01; }\n\n.toast-ios .toast-message {\n  padding: 15px;\n  color: var(--ion-text-color-step-150, #262626);\n  font-size: 14px; }\n\n.toast-ios .toast-button {\n  color: var(--ion-text-color-step-400, #666666); }"; }
    static get styleMode() { return "ios"; }
}

export { Toast as IonToast };
