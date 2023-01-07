import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { sendSignInLink } from "../firebase/firebase";

@customElement("login-page")
export class AppElement extends LitElement {
  @property()
  errorMessage?: string;

  @state()
  isEmailSent = false;

  render() {
    return html`
      <div class="container">
        <h1>Silver Springs Reservations</h1>
        ${!this.isEmailSent
          ? this.displayLoginForm()
          : this.displayEmailSentMessage()}
      </div>
    `;
  }

  displayLoginForm() {
    return html`
      <p>Enter your email to receive a login link.</p>
      <form @submit="${this.login}">
        <div class="input-group">
          <input id="email" type="email" placeholder="Email" />
          <button type="submit">Send</button>
        </div>
      </form>
      ${this.errorMessage
        ? html`<p class="error">${this.errorMessage}</p>`
        : ""}
    `;
  }

  displayEmailSentMessage() {
    return html` <p>Please check your email for a login link.</p> `;
  }

  login(event: SubmitEvent) {
    event.preventDefault();

    const email =
      this.shadowRoot?.querySelector<HTMLInputElement>("#email")?.value;

    if (!email) {
      return;
    }

    sendSignInLink(email);
    this.isEmailSent = true;
  }

  static styles = css`
    :host {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background: #1e3a8a;
      color: white;
    }

    h1 {
      font-size: 1.5rem;
    }

    p {
      margin: 0;
    }

    .input-group {
      display: flex;
      gap: 1rem;
    }

    button {
      cursor: pointer;
      color: white;
      background-color: var(--primary-600);
    }

    input {
      width: 100%;
    }

    button,
    input {
      font-size: 1rem;
      border-radius: 0.25rem;
      border: 1px solid #2563eb;
      padding: 0.75rem;
    }

    .container {
      transform: translateY(-25%);
      text-align: center;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      gap: 1rem;
      width: 100%;
      max-width: 500px;
      padding: 1rem;
    }

    .error {
      color: #fca5a5;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "login-page": AppElement;
  }
}
