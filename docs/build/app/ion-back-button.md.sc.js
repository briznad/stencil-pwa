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
    static get style() { return "\n.sc-ion-back-button-md-h {\n  display: none;\n  color: var(--ion-color-base);\n  pointer-events: all; }\n\n.can-go-back.sc-ion-back-button-md-h    > ion-header.sc-ion-back-button-md, .can-go-back    > ion-header   .sc-ion-back-button-md-h, .show-back-button.sc-ion-back-button-md-h {\n  display: block; }\n\n.back-button-native.sc-ion-back-button-md {\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  display: block;\n  position: relative;\n  -webkit-transition: background-color, opacity 100ms linear;\n  transition: background-color, opacity 100ms linear;\n  border: 0;\n  outline: none;\n  color: inherit;\n  line-height: 1;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  text-transform: none;\n  white-space: nowrap;\n  cursor: pointer;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  z-index: 0;\n  -webkit-font-kerning: none;\n          font-kerning: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\n\n.back-button-inner.sc-ion-back-button-md {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\n.back-button-text.sc-ion-back-button-md {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center; }\n\n.sc-ion-back-button-md-h {\n  --ion-color-base: currentColor; }\n\n.back-button-native.sc-ion-back-button-md {\n  margin: 1px 6px 0 0;\n  padding: 0 5px;\n  min-width: 44px;\n  height: 32px;\n  border: 0;\n  background-color: transparent;\n  font-size: 14px;\n  font-weight: 500;\n  text-transform: uppercase;\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n  .back-button-native.activated.sc-ion-back-button-md {\n    opacity: .4; }\n\nion-icon.sc-ion-back-button-md {\n  padding-right: 0.3em;\n  margin: 0;\n  margin: 0 6px;\n  font-size: 24px;\n  font-weight: normal;\n  line-height: .67;\n  text-align: start;\n  pointer-events: none; }\n"; }
    static get styleMode() { return "md"; }
}

class Buttons {
    static get is() { return "ion-buttons"; }
    static get encapsulation() { return "scoped"; }
    static get style() { return "\n.sc-ion-buttons-md-h {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-transform: translateZ(0);\n          transform: translateZ(0);\n  z-index: 99;\n  pointer-events: none; }\n\n.sc-ion-buttons-md-s  .button  {\n  --margin-top: 0;\n  --margin-bottom: 0;\n  --margin-start: 0;\n  --margin-end: 0;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 0;\n  --padding-end: 0;\n  --box-shadow: none;\n  pointer-events: auto; }\n\n.sc-ion-buttons-md-h {\n  margin: 0 2px; }\n\n.sc-ion-buttons-md-s  .button  {\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 8px;\n  --padding-end: 8px;\n  --height: 32px;\n  --box-shadow: none;\n  font-size: 14px;\n  font-weight: 500; }\n\n.sc-ion-buttons-md-s  .button:not(.button-round)  {\n  --border-radius: 2px; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"start\"]  {\n  margin: 0;\n  margin-right: 0.3em;\n  font-size: 1.4em;\n  pointer-events: none; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"end\"]  {\n  margin: 0;\n  margin-left: 0.4em;\n  font-size: 1.4em;\n  pointer-events: none; }\n\n.sc-ion-buttons-md-s  ion-icon[slot=\"icon-only\"]  {\n  padding: 0;\n  margin: 0;\n  font-size: 1.8em;\n  pointer-events: none; }\n\n.sc-ion-buttons-md-s  .button.button-solid , .sc-ion-buttons-md-s  .button.button-outline  {\n  --ion-color-base: var(--ion-toolbar-text-color, #424242);\n  --ion-color-contrast: var(--ion-toolbar-background-color, #f8f8f8);\n  --ion-color-shade: var(--ion-toolbar-text-color, #424242); }\n\n.sc-ion-buttons-md-s  .button.button-clear  {\n  --ion-color-base: currentColor;\n  --height: 45px; }\n\n[slot=\"start\"].sc-ion-buttons-md-h {\n  -webkit-box-ordinal-group: 3;\n  -ms-flex-order: 2;\n  order: 2; }\n\n[slot=\"secondary\"].sc-ion-buttons-md-h {\n  -webkit-box-ordinal-group: 5;\n  -ms-flex-order: 4;\n  order: 4; }\n\n[slot=\"primary\"].sc-ion-buttons-md-h {\n  -webkit-box-ordinal-group: 6;\n  -ms-flex-order: 5;\n  order: 5;\n  text-align: end; }\n\n[slot=\"end\"].sc-ion-buttons-md-h {\n  -webkit-box-ordinal-group: 7;\n  -ms-flex-order: 6;\n  order: 6;\n  text-align: end; }\n"; }
    static get styleMode() { return "md"; }
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
    static get style() { return "\n.sc-ion-label-md-h {\n  margin: 0;\n  display: block;\n  -webkit-box-flex: 1;\n  -ms-flex: 1;\n  flex: 1;\n  font-size: inherit;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  overflow: hidden;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box; }\n\n.ion-color.sc-ion-label-md-h {\n  color: var(--ion-color-base); }\n\n[text-wrap].sc-ion-label-md-h {\n  white-space: normal; }\n\n.item-interactive-disabled.sc-ion-label-md-h, .item-interactive-disabled   .sc-ion-label-md-h {\n  cursor: default;\n  opacity: .3;\n  pointer-events: none; }\n\n.item-input.sc-ion-label-md-h, .item-input   .sc-ion-label-md-h {\n  -webkit-box-flex: initial;\n  -ms-flex: initial;\n  flex: initial;\n  max-width: 200px;\n  pointer-events: none; }\n\n.label-fixed.sc-ion-label-md-h {\n  -webkit-box-flex: 0;\n  -ms-flex: 0 0 100px;\n  flex: 0 0 100px;\n  width: 100px;\n  min-width: 100px;\n  max-width: 200px; }\n\n.label-stacked.sc-ion-label-md-h, .label-floating.sc-ion-label-md-h {\n  margin-bottom: 0;\n  -ms-flex-item-align: stretch;\n  align-self: stretch;\n  width: auto;\n  max-width: 100%; }\n\n.item-has-focus.label-floating.sc-ion-label-md-h, .item-has-focus   .label-floating.sc-ion-label-md-h, .item-has-value.label-floating.sc-ion-label-md-h, .item-has-value   .label-floating.sc-ion-label-md-h {\n  -webkit-transform: translate3d(0,  0,  0) scale(0.8);\n          transform: translate3d(0,  0,  0) scale(0.8); }\n\n.sc-ion-label-md-h {\n  margin: 11px 8px 11px 0;\n  font-family: var(--ion-font-family, inherit); }\n\n[text-wrap].sc-ion-label-md-h {\n  font-size: 14px;\n  line-height: 1.5; }\n\n.item-interactive.sc-ion-label-md-h, .item-interactive   .sc-ion-label-md-h {\n  --ion-color-base: var(--ion-text-color-step-600, #999999); }\n\n.label-stacked.sc-ion-label-md-h {\n  font-size: 12px; }\n\n.label-floating.sc-ion-label-md-h {\n  -webkit-transform: translate3d(0,  27px,  0);\n          transform: translate3d(0,  27px,  0);\n  -webkit-transform-origin: left top;\n          transform-origin: left top;\n  transition: -webkit-transform 150ms ease-in-out;\n  -webkit-transition: -webkit-transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out;\n  transition: transform 150ms ease-in-out, -webkit-transform 150ms ease-in-out; }\n\n.label-stacked.sc-ion-label-md-h, .label-floating.sc-ion-label-md-h {\n  margin-left: 0;\n  margin-bottom: 0; }\n\n.item-has-focus.label-stacked.sc-ion-label-md-h, .item-has-focus   .label-stacked.sc-ion-label-md-h, .item-has-focus.label-floating.sc-ion-label-md-h, .item-has-focus   .label-floating.sc-ion-label-md-h {\n  color: var(--ion-color-primary, #3880ff); }\n\n.sc-ion-label-md-s  h1  {\n  margin: 0 0 2px;\n  font-size: 24px;\n  font-weight: normal; }\n\n.sc-ion-label-md-s  h2  {\n  margin: 2px 0;\n  font-size: 16px;\n  font-weight: normal; }\n\n.sc-ion-label-md-s  h3 , .sc-ion-label-md-s  h4 , .sc-ion-label-md-s  h5 , .sc-ion-label-md-s  h6  {\n  margin: 2px 0;\n  font-size: 14px;\n  font-weight: normal;\n  line-height: normal; }\n\n.sc-ion-label-md-s  p  {\n  margin: 0 0 2px;\n  font-size: 14px;\n  line-height: normal;\n  text-overflow: inherit;\n  overflow: inherit; }\n\n.sc-ion-label-md-s > p {\n  color: var(--ion-text-color-step-400, #666666); }\n\n.sc-ion-label-md-h.ion-color.sc-ion-label-md-s > p, .ion-color .sc-ion-label-md-h.sc-ion-label-md-s > p {\n  color: inherit; }\n"; }
    static get styleMode() { return "md"; }
}

export { BackButton as IonBackButton, Buttons as IonButtons, Label as IonLabel };
