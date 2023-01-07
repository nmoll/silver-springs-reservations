import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";

@customElement("app-button")
export class ButtonElement extends LitElement {
  @property()
  color: "default" | "primary" = "default";

  @property()
  disabled?: string;

  render() {
    const classes = { [this.color]: true };

    return html`
      <button
        class=${classMap(classes)}
        ?disabled="${this.disabled}"
        @click="${this.onClick}"
      >
        <slot></slot>
      </button>
    `;
  }

  onClick(event: Event) {
    event.preventDefault();
    event.stopPropagation();

    if (this.disabled === undefined || this.disabled === null) {
      this.dispatchEvent(new CustomEvent("click"));
    }
  }

  static styles = css`
    button {
      border-radius: 0.25rem;
      padding: 0.5rem 1rem;
      border: 0;
      filter: drop-shadow(0 1px 2px rgb(0 0 0 / 0.1))
        drop-shadow(0 1px 1px rgb(0 0 0 / 0.06));
      background: white;
      cursor: pointer;
    }

    button.primary {
      background: var(--primary-600);
      border: 1px solid var(--primary-600);
      color: white;
    }

    :host([disabled]) button {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "app-button": ButtonElement;
  }
}
