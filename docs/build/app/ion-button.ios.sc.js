/*! Built with http://stenciljs.com */
const { h } = window.App;

import { a as hasShadowDom } from './chunk-a000c498.js';
import { c as openURL } from './chunk-f7b6af08.js';

class Button {
    constructor() {
        this.keyFocus = false;
        /**
         * The type of button.
         * Possible values are: `"button"`, `"bar-button"`.
         */
        this.buttonType = 'button';
        /**
         * If true, the user cannot interact with the button. Defaults to `false`.
         */
        this.disabled = false;
        /**
         * If true, activates a button with a heavier font weight.
         */
        this.strong = false;
        /**
         * The type of the button.
         * Possible values are: `"submit"`, `"reset"` and `"button"`.
         * Default value is: `"button"`
         */
        this.type = 'button';
    }
    componentWillLoad() {
        if (this.fill === undefined) {
            this.fill = this.el.closest('ion-buttons') ? 'clear' : 'solid';
        }
    }
    onFocus() {
        this.ionFocus.emit();
    }
    onKeyUp() {
        this.keyFocus = true;
    }
    onBlur() {
        this.keyFocus = false;
        this.ionBlur.emit();
    }
    onClick(ev) {
        if (this.type === 'button') {
            openURL(this.win, this.href, ev, this.routerDirection);
        }
        else if (hasShadowDom(this.el)) {
            // this button wants to specifically submit a form
            // climb up the dom to see if we're in a <form>
            // and if so, then use JS to submit it
            const form = this.el.closest('form');
            if (form) {
                ev.preventDefault();
                ev.stopPropagation();
                const fakeButton = document.createElement('button');
                fakeButton.type = this.type;
                fakeButton.style.display = 'none';
                form.appendChild(fakeButton);
                fakeButton.click();
                fakeButton.remove();
            }
        }
    }
    hostData() {
        const { buttonType, color, expand, fill, mode, shape, size, strong } = this;
        return {
            class: Object.assign({}, getButtonClassMap(buttonType, mode), getButtonTypeClassMap(buttonType, expand, mode), getButtonTypeClassMap(buttonType, size, mode), getButtonTypeClassMap(buttonType, shape, mode), getButtonTypeClassMap(buttonType, strong ? 'strong' : undefined, mode), getColorClassMap(buttonType, color, fill, mode), { 'focused': this.keyFocus }),
            'tappable': true,
        };
    }
    render() {
        const TagType = this.href ? 'a' : 'button';
        const attrs = (TagType === 'button')
            ? { type: this.type }
            : { href: this.href };
        return (h(TagType, Object.assign({}, attrs, { class: "button-native", disabled: this.disabled, onFocus: this.onFocus.bind(this), onKeyUp: this.onKeyUp.bind(this), onBlur: this.onBlur.bind(this), onClick: this.onClick.bind(this) }),
            h("span", { class: "button-inner" },
                h("slot", { name: "icon-only" }),
                h("slot", { name: "start" }),
                h("slot", null),
                h("slot", { name: "end" })),
            this.mode === 'md' && h("ion-ripple-effect", { tapClick: true, parent: this.el })));
    }
    static get is() { return "ion-button"; }
    static get encapsulation() { return "shadow"; }
    static get properties() { return {
        "buttonType": {
            "type": String,
            "attr": "button-type",
            "mutable": true
        },
        "color": {
            "type": String,
            "attr": "color"
        },
        "disabled": {
            "type": Boolean,
            "attr": "disabled",
            "reflectToAttr": true
        },
        "el": {
            "elementRef": true
        },
        "expand": {
            "type": String,
            "attr": "expand",
            "reflectToAttr": true
        },
        "fill": {
            "type": String,
            "attr": "fill",
            "reflectToAttr": true,
            "mutable": true
        },
        "href": {
            "type": String,
            "attr": "href"
        },
        "keyFocus": {
            "state": true
        },
        "mode": {
            "type": String,
            "attr": "mode"
        },
        "routerDirection": {
            "type": String,
            "attr": "router-direction"
        },
        "shape": {
            "type": String,
            "attr": "shape",
            "reflectToAttr": true
        },
        "size": {
            "type": String,
            "attr": "size",
            "reflectToAttr": true
        },
        "strong": {
            "type": Boolean,
            "attr": "strong"
        },
        "type": {
            "type": String,
            "attr": "type"
        },
        "win": {
            "context": "window"
        }
    }; }
    static get events() { return [{
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
        }]; }
    static get style() { return "\n.sc-ion-button-ios-h {\n  --ion-color-base: var(--ion-color-primary, #3880ff);\n  --ion-color-contrast: var(--ion-color-primary-contrast, #fff);\n  --ion-color-shade: var(--ion-color-primary-shade, #3171e0);\n  --overflow: hidden;\n  --ripple-color: currentColor;\n  display: inline-block;\n  text-align: center;\n  text-decoration: none;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n  -webkit-user-select: none;\n     -moz-user-select: none;\n      -ms-user-select: none;\n          user-select: none;\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle; }\n\n[disabled].sc-ion-button-ios-h {\n  pointer-events: none; }\n\n.button-solid.sc-ion-button-ios-h {\n  --background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n.button-outline.sc-ion-button-ios-h {\n  --border-color: var(--ion-color-base);\n  --background: transparent;\n  color: var(--ion-color-base); }\n\n.button-clear.sc-ion-button-ios-h {\n  --border-width: 0;\n  --background: transparent;\n  color: var(--ion-color-base); }\n\n.button-block.sc-ion-button-ios-h {\n  display: block; }\n\n.button-block.sc-ion-button-ios-h   .button-native.sc-ion-button-ios {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  clear: both;\n  contain: strict; }\n\n.button-block.sc-ion-button-ios-h   .button-native.sc-ion-button-ios::after {\n  clear: both; }\n\n.button-full.sc-ion-button-ios-h {\n  display: block; }\n\n.button-full.sc-ion-button-ios-h   .button-native.sc-ion-button-ios {\n  margin-left: 0;\n  margin-right: 0;\n  display: block;\n  width: 100%;\n  contain: strict; }\n\n.button-full.sc-ion-button-ios-h:not(.button-round)   .button-native.sc-ion-button-ios {\n  border-radius: 0;\n  border-right-width: 0;\n  border-left-width: 0; }\n\n.button-native.sc-ion-button-ios {\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: inherit;\n  letter-spacing: inherit;\n  text-decoration: inherit;\n  text-overflow: inherit;\n  text-transform: inherit;\n  text-align: inherit;\n  white-space: inherit;\n  color: inherit;\n  border-radius: var(--border-radius);\n  -moz-osx-font-smoothing: grayscale;\n  -webkit-font-smoothing: antialiased;\n  margin: var(--margin-top) var(--margin-end) var(--margin-bottom) var(--margin-start);\n  padding: var(--padding-top) var(--padding-end) var(--padding-bottom) var(--padding-start);\n  display: inline-block;\n  position: relative;\n  height: var(--height);\n  -webkit-transition: var(--transition);\n  transition: var(--transition);\n  border-width: var(--border-width);\n  border-style: var(--border-style);\n  border-color: var(--border-color);\n  outline: none;\n  background: var(--background);\n  line-height: 1;\n  -webkit-box-shadow: var(--box-shadow);\n  box-shadow: var(--box-shadow);\n  contain: content;\n  cursor: pointer;\n  opacity: var(--opacity);\n  overflow: var(--overflow);\n  vertical-align: top;\n  vertical-align: -webkit-baseline-middle;\n  z-index: 0;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  -webkit-font-kerning: none;\n          font-kerning: none;\n  -webkit-appearance: none;\n     -moz-appearance: none;\n          appearance: none; }\n\n.button-native[disabled].sc-ion-button-ios {\n  cursor: default;\n  opacity: .5;\n  pointer-events: none; }\n\n.button-inner.sc-ion-button-ios {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n  -ms-flex-flow: row nowrap;\n  flex-flow: row nowrap;\n  -ms-flex-negative: 0;\n  flex-shrink: 0;\n  -webkit-box-align: center;\n  -ms-flex-align: center;\n  align-items: center;\n  -webkit-box-pack: center;\n  -ms-flex-pack: center;\n  justify-content: center;\n  width: 100%;\n  height: 100%; }\n\n.sc-ion-button-ios-s > ion-icon {\n  font-size: 1.4em;\n  pointer-events: none; }\n\n.sc-ion-button-ios-s > ion-icon[slot=\"start\"] {\n  margin: 0 0.3em 0 -0.3em; }\n\n.sc-ion-button-ios-s > ion-icon[slot=\"end\"] {\n  margin: 0 -0.2em 0 0.3em; }\n\n.sc-ion-button-ios-s > ion-icon[slot=\"icon-only\"] {\n  font-size: 1.8em; }\n\nion-ripple-effect.sc-ion-button-ios {\n  color: var(--ripple-color); }\n\n.sc-ion-button-ios-h {\n  --border-radius: 12px;\n  --margin-top: 4px;\n  --margin-bottom: 4px;\n  --margin-start: 2px;\n  --margin-end: 2px;\n  --padding-top: 0;\n  --padding-bottom: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --height: 2.8em;\n  --transition: background-color, opacity 100ms linear;\n  font-family: var(--ion-font-family, inherit);\n  font-size: 16px;\n  font-weight: 500;\n  letter-spacing: -0.03em; }\n\n.button-solid.sc-ion-button-ios-h:hover {\n  --opacity: 0.8; }\n\n.button-solid.focused.sc-ion-button-ios-h {\n  --background: var(--ion-color-shade); }\n\n.button-solid.activated.sc-ion-button-ios-h {\n  --background: var(--ion-color-shade);\n  --opacity: 1; }\n\n.button-outline.sc-ion-button-ios-h {\n  --border-radius: 12px;\n  --border-width: 1px;\n  --border-style: solid; }\n\n.button-outline.activated.sc-ion-button-ios-h {\n  --background: var(--ion-color-base);\n  color: var(--ion-color-contrast); }\n\n.button-outline.focused.sc-ion-button-ios-h {\n  --background: rgba(var(--ion-color-base-rgb), 0.1); }\n\n.button-outline.activated.focused.sc-ion-button-ios-h {\n  --border-color: var(--ion-color-shade);\n  --background: var(--ion-color-shade); }\n\n.button-clear.sc-ion-button-ios-h:hover {\n  --opacity: 0.6; }\n\n.button-clear.activated.sc-ion-button-ios-h {\n  --opacity: 0.4; }\n\n.button-clear.focused.sc-ion-button-ios-h {\n  --background: rgba(var(--ion-color-base-rgb), 0.1); }\n\n.button-round.sc-ion-button-ios-h {\n  --border-radius: 64px;\n  --padding-top: 0;\n  --padding-start: 26px;\n  --padding-end: 26px;\n  --padding-bottom: 0; }\n\n.button-large.sc-ion-button-ios-h {\n  --border-radius: 14px;\n  --padding-top: 0;\n  --padding-start: 1em;\n  --padding-end: 1em;\n  --padding-bottom: 0;\n  --height: 2.8em;\n  font-size: 20px; }\n\n.button-small.sc-ion-button-ios-h {\n  --border-radius: 8px;\n  --padding-top: 0;\n  --padding-start: 0.9em;\n  --padding-end: 0.9em;\n  --padding-bottom: 0;\n  --height: 2.1em;\n  font-size: 13px; }\n\n.button-strong.sc-ion-button-ios-h {\n  font-weight: 600; }\n"; }
    static get styleMode() { return "ios"; }
}
/**
 * Get the classes based on the button type
 * e.g. alert-button, action-sheet-button
 */
function getButtonClassMap(buttonType, mode) {
    if (!buttonType) {
        return {};
    }
    return {
        [buttonType]: true,
        [`${buttonType}-${mode}`]: true
    };
}
/**
 * Get the classes based on the type
 * e.g. block, full, round, large
 */
function getButtonTypeClassMap(buttonType, type, mode) {
    if (!type) {
        return {};
    }
    type = type.toLocaleLowerCase();
    return {
        [`${buttonType}-${type}`]: true,
        [`${buttonType}-${type}-${mode}`]: true
    };
}
function getColorClassMap(buttonType, color, fill, mode) {
    let className = buttonType;
    if (fill) {
        className += `-${fill.toLowerCase()}`;
    }
    const map = {
        [className]: true,
        [`${className}-${mode}`]: true,
    };
    if (color) {
        map[`ion-color-${color}`] = true;
    }
    return map;
}

export { Button as IonButton };
