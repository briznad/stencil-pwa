/*! Built with http://stenciljs.com */
const { h } = window.App;

import { b as createColorClasses, c as openURL } from './chunk-f7b6af08.js';

class BackButton {
    async onClick(ev) {
        const nav = this.el.closest('ion-nav');
        if (nav && nav.canGoBack()) {
            ev.preventDefault();
            if (!nav.isAnimating()) {
                nav.pop();
            }
        }
        else if (this.defaultHref) {
            openURL(this.win, this.defaultHref, ev, 'back');
        }
    }
    hostData() {
        const showBackButton = !!this.defaultHref;
        return {
            class: Object.assign({}, createColorClasses(this.color), { 'button': true, 'show-back-button': showBackButton }),
            'tappable': true,
        };
    }
    render() {
        const backButtonIcon = this.icon || this.config.get('backButtonIcon', 'arrow-back');
        const backButtonText = this.text != null ? this.text : this.config.get('backButtonText', 'Back');
        return (h("button", { type: "button", class: "back-button-native", onClick: ev => this.onClick(ev) },
            h("span", { class: "back-button-inner" },
                backButtonIcon && h("ion-icon", { icon: backButtonIcon, lazy: false }),
                this.mode === 'ios' && backButtonText && h("span", { class: "button-text" }, backButtonText),
                this.mode === 'md' && h("ion-ripple-effect", { tapClick: true, parent: this.el }))));
    }
    static get is() { return "ion-back-button"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "config": {
            "context": "config"
        },
        "defaultHref": {
            "type": String,
            "attr": "default-href"
        },
        "el": {
            "elementRef": true
        },
        "icon": {
            "type": String,
            "attr": "icon"
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "text": {
            "type": String,
            "attr": "text"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get style() { return ":host {\n  display: none;\n  color: var(--ion-color-base);\n  pointer-events: all; }\n\n:host-context(.can-go-back > ion-header),\n:host(.show-back-button) {\n  display: block; }\n\n.back-button-native {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  position: relative;\n  -webkit-transition: background-color, opacity 100ms linear;\n  transition: background-color, opacity 100ms linear;\n  border: 0;\n  outline: none;\n  color: inherit;\n  line-height: 1;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 0;\n  -webkit-font-kerning: none;\n          font-kerning: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\n\n.back-button-inner {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\n.back-button-text {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n:host {\n  --ion-color-base: var(--ion-color-primary, #3880ff); }\n\n.back-button-native {\n  padding: 0;\n  margin: 0;\n  min-height: 32px;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  border: 0;\n  background-color: transparent;\n  font-size: 17px;\n  line-height: 1;\n  overflow: visible;\n  z-index: 99; }\n  .back-button-native.activated {\n    opacity: .4; }\n\nion-icon {\n  padding: 0;\n  margin: 0 -5px 0 -4px;\n  display: inherit;\n  font-size: 1.85em;\n  pointer-events: none; }"; }
    static get styleMode() { return "ios"; }
}

class Buttons {
    static get is() { return "ion-buttons"; }
    static get encapsulation() { return "scoped"; }
    static get style() { return ":host {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  z-index: 99;\n  pointer-events: none; }\n\n::slotted(*) .button {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --box-shadow: none;\n  pointer-events: auto; }\n\n::slotted(*) .button {\n  --padding-top: 0;\n  --pading-bottom: 0;\n  --padding-start: 5px;\n  --padding-end: 5px;\n  --height: 32px;\n  font-size: 17px;\n  font-weight: 400; }\n\n::slotted(*) .button:not(.button-round) {\n  --border-radius: 4px; }\n\n:host-context(.ion-color)::slotted(*) .button {\n  --ion-color-base: currentColor; }\n\n::slotted(*) ion-icon[slot=\"start\"] {\n  margin: 0;\n  margin-right: 0.3em;\n  font-size: 24px;\n  line-height: .67;\n  pointer-events: none; }\n\n::slotted(*) ion-icon[slot=\"end\"] {\n  margin: 0;\n  margin-left: 0.4em;\n  font-size: 24px;\n  line-height: .67;\n  pointer-events: none; }\n\n::slotted(*) ion-icon[slot=\"icon-only\"] {\n  padding: 0;\n  margin: 0;\n  font-size: 31px;\n  line-height: .67;\n  pointer-events: none; }\n\n::slotted(*) .button.button-clear {\n  --height: 35px; }\n\n::slotted(*) .button.button-solid-ios:hover {\n  opacity: .4; }\n\n:host([slot=\"start\"]) {\n  -webkit-box-ordinal-group: 3;\n  -ms-flex-order: 2;\n  order: 2; }\n\n:host([slot=\"secondary\"]) {\n  -webkit-box-ordinal-group: 4;\n  -ms-flex-order: 3;\n  order: 3; }\n\n:host([slot=\"primary\"]) {\n  -webkit-box-ordinal-group: 6;\n  -ms-flex-order: 5;\n  order: 5;\n  text-align: end; }\n\n:host([slot=\"end\"]) {\n  -webkit-box-ordinal-group: 7;\n  -ms-flex-order: 6;\n  order: 6;\n  text-align: end; }"; }
    static get styleMode() { return "ios"; }
}

class Label {
    getText() {
        return this.el.textContent || '';
    }
    componentDidLoad() {
        this.positionChanged();
    }
    positionChanged() {
        const position = this.position;
        this.ionStyle.emit({
            'label': true,
            [`label-${position}`]: !!position
        });
    }
    hostData() {
        const position = this.position;
        return {
            class: Object.assign({}, createColorClasses(this.color), { [`label-${position}`]: !!position })
        };
    }
    static get is() { return "ion-label"; }
    static get encapsulation() { return "scoped"; }
    static get properties() { return {
        "color": {
            "type": String,
            "attr": "color"
        },
        "el": {
            "elementRef": true
        },
        "getText": {
            "method": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "position": {
            "type": String,
            "attr": "position",
            "watchCallbacks": ["positionChanged"]
        }
    }; }
    static get events() { return [{
            "name": "ionStyle",
            "method": "ionStyle",
            "bubbles": true,
            "cancelable": true,
            "composed": true
        }]; }
    static get style() { return ":host {\n  margin: 0;\n  display: block;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  font-size: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n:host(.ion-color) {\n  color: var(--ion-color-base); }\n\n:host([text-wrap]) {\n  white-space: normal; }\n\n:host-context(.item-interactive-disabled) {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n:host-context(.item-input) {\n  -webkit-box-flex: initial;\n  -ms-flex: initial;\n  flex: initial;\n  max-width: 200px;\n  pointer-events: none; }\n\n:host(.label-fixed) {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100px;\n  flex: 0 0 100px;\n  width: 100px;\n  min-width: 100px;\n  max-width: 200px; }\n\n:host(.label-stacked),\n:host(.label-floating) {\n  margin-bottom: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: auto;\n  max-width: 100%; }\n\n:host-context(.item-has-focus).label-floating,\n:host-context(.item-has-value).label-floating {\n  -webkit-transform: translate3d(0,  0,  0) scale(0.8);\n          transform: translate3d(0,  0,  0) scale(0.8); }\n\n:host {\n  margin: 10px 8px 10px 0;\n  font-family: var(--ion-font-family, inherit); }\n\n:host([text-wrap]) {\n  font-size: 14px;\n  line-height: 1.5; }\n\n:host(.label-stacked) {\n  margin-bottom: 4px;\n  font-size: 12px; }\n\n:host(.label-floating) {\n  margin-bottom: 0;\n  -webkit-transform: translate3d(0,  27px,  0);\n          transform: translate3d(0,  27px,  0);\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n  transition: -webkit-transform 150ms ease-in-out;\n  -webkit-transition: -webkit-transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out; }\n\n::slotted(*) h1 {\n  margin: 0 0 2px;\n  font-size: 24px;\n  font-weight: normal; }\n\n::slotted(*) h2 {\n  margin: 0 0 2px;\n  font-size: 17px;\n  font-weight: normal; }\n\n::slotted(*) h3,\n::slotted(*) h4,\n::slotted(*) h5,\n::slotted(*) h6 {\n  margin: 0 0 3px;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: normal; }\n\n::slotted(*) p {\n  margin: 0 0 2px;\n  font-size: 14px;\n  line-height: normal;\n  text-overflow: inherit;\n  overflow: inherit; }\n\n::slotted(p) {\n  color: var(--ion-text-color-step-600, #999999); }\n\n:host-context(.ion-color)::slotted(p) {\n  color: inherit; }\n\n::slotted(*) h2:last-child,\n::slotted(*) h3:last-child,\n::slotted(*) h4:last-child,\n::slotted(*) h5:last-child,\n::slotted(*) h6:last-child,\n::slotted(*) p:last-child {\n  margin-bottom: 0; }"; }
    static get styleMode() { return "ios"; }
}

export { BackButton as IonBackButton, Buttons as IonButtons, Label as IonLabel };
