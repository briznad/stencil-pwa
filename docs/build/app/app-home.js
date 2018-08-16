/*! Built with http://stenciljs.com */
const { h } = window.App;

class AppHome {
    render() {
        return [
            h("ion-header", null,
                h("ion-toolbar", { color: "primary" },
                    h("ion-title", null, "Home"))),
            h("ion-content", { padding: true },
                h("p", null,
                    "Welcome to the PWA Toolkit. You can use this starter to build entire apps with web components using Stencil and ionic/core! Check out the README for everything that comes in this starter out of the box and check out our docs on",
                    ' ',
                    h("a", { href: "https://stenciljs.com" }, "stenciljs.com"),
                    " to get started."),
                h("ion-button", { href: "/profile/ionic" }, "Profile page"))
        ];
    }
    static get is() { return "app-home"; }
    static get style() { return ""; }
}

export { AppHome };
