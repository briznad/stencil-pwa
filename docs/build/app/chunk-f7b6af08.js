/*! Built with http://stenciljs.com */
const { h } = window.App;

function hostContext(selector, el) {
    return !!el.closest(selector);
}
/**
 * Create the mode and color classes for the component based on the classes passed in
 */
function createColorClasses(color) {
    return (color) ? {
        'ion-color': true,
        [`ion-color-${color}`]: true
    } : null;
}
function createThemedClasses(mode, name) {
    return {
        [name]: true,
        [`${name}-${mode}`]: !!mode
    };
}
function getClassList(classes) {
    if (classes) {
        const array = Array.isArray(classes) ? classes : classes.split(' ');
        return array
            .filter(c => c != null)
            .map(c => c.trim())
            .filter(c => c !== '');
    }
    return [];
}
function getClassMap(classes) {
    const map = {};
    getClassList(classes).forEach(c => map[c] = true);
    return map;
}
async function openURL(win, url, ev, direction) {
    if (url && url[0] !== '#' && url.indexOf('://') === -1) {
        const router = win.document.querySelector('ion-router');
        if (router) {
            if (ev) {
                ev.preventDefault();
            }
            await router.componentOnReady();
            return router.push(url, direction);
        }
    }
    return Promise.resolve();
}

export { createThemedClasses as a, createColorClasses as b, openURL as c, hostContext as d, getClassMap as e };
