import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import {
  auth,
  handleEmailLinkRedirect,
  isRedirectedFromEmailLink,
} from "./firebase/firebase";
import "./login/login.element";
import "./site-map/site-map.element";

type LoggedInState =
  | { type: "Logged In" }
  | { type: "Not Logged In"; errorMessage?: string }
  | { type: "Pending" };

@customElement("silver-springs-app")
export class AppElement extends LitElement {
  @state()
  loggedInState: LoggedInState | null = null;

  connectedCallback() {
    super.connectedCallback();

    if (isRedirectedFromEmailLink()) {
      this.loggedInState = { type: "Pending" };
      handleEmailLinkRedirect().then(
        () => {
          this.loggedInState = { type: "Logged In" };
        },
        () => {
          this.loggedInState = {
            type: "Not Logged In",
            errorMessage: "Your link is invalid or expired. Please try again.",
          };
        }
      );
    }

    auth.onAuthStateChanged((user) => {
      if (user) {
        this.loggedInState = { type: "Logged In" };
      } else if (this.loggedInState?.type !== "Pending") {
        this.loggedInState = { type: "Not Logged In" };
      }
    });
  }

  render() {
    if (this.loggedInState === null) {
      return;
    }

    switch (this.loggedInState.type) {
      case "Logged In":
        return html`<site-map></site-map>`;
      case "Not Logged In":
        return html`<login-page
          .errorMessage="${this.loggedInState.errorMessage}"
        ></login-page>`;
      case "Pending":
        return "";
    }
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
