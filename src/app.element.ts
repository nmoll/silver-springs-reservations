import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import "./site-map/site-map.element";

@customElement("silver-springs-app")
export class AppElement extends LitElement {
  render() {
    return html`<site-map></site-map>`;
  }

  static styles = css`
    :host {
      height: 100%;
      display: block;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "silver-springs-app": AppElement;
  }
}
