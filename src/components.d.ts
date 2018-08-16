/**
 * This is an autogenerated file created by the Stencil compiler.
 * It contains typing information for all components that exist in this project.
 */
/* tslint:disable */

import '@stencil/core';

import '@ionic/core';
import 'ionicons';




declare global {
  interface HTMLElement {
    componentOnReady?: () => Promise<this | null>;
  }

  interface HTMLStencilElement extends HTMLElement {
    componentOnReady(): Promise<this>;

    forceUpdate(): void;
  }

  interface HTMLAttributes {}

  namespace StencilComponents {

    interface AppHome {

    }

    interface AppProfile {
      'name': string;
    }

    interface MyApp {

    }
  }


    interface HTMLAppHomeElement extends StencilComponents.AppHome, HTMLStencilElement {}

    var HTMLAppHomeElement: {
      prototype: HTMLAppHomeElement;
      new (): HTMLAppHomeElement;
    };
    

    interface HTMLAppProfileElement extends StencilComponents.AppProfile, HTMLStencilElement {}

    var HTMLAppProfileElement: {
      prototype: HTMLAppProfileElement;
      new (): HTMLAppProfileElement;
    };
    

    interface HTMLMyAppElement extends StencilComponents.MyApp, HTMLStencilElement {}

    var HTMLMyAppElement: {
      prototype: HTMLMyAppElement;
      new (): HTMLMyAppElement;
    };
    

  namespace JSX {
    interface Element {}
    export interface IntrinsicElements {
    'app-home': JSXElements.AppHomeAttributes;
    'app-profile': JSXElements.AppProfileAttributes;
    'my-app': JSXElements.MyAppAttributes;
    }
  }

  namespace JSXElements {

    export interface AppHomeAttributes extends HTMLAttributes {

    }

    export interface AppProfileAttributes extends HTMLAttributes {
      'name'?: string;
    }

    export interface MyAppAttributes extends HTMLAttributes {

    }
  }

  interface HTMLElementTagNameMap {
    'app-home': HTMLAppHomeElement
    'app-profile': HTMLAppProfileElement
    'my-app': HTMLMyAppElement
  }

  interface ElementTagNameMap {
    'app-home': HTMLAppHomeElement;
    'app-profile': HTMLAppProfileElement;
    'my-app': HTMLMyAppElement;
  }
}
declare global { namespace JSX { interface StencilJSX {} } }
