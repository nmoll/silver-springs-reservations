import { css, html, LitElement, state } from "lit-element";
import { customElement } from "lit/decorators.js";
import { repeat } from "lit/directives/repeat.js";

@customElement("site-map")
class SiteMapElement extends LitElement {
  @state()
  selectedSiteId: string | null = null;

  render() {
    return html`
      <div class="flex flex-col h-full">
        <h1 class="text-center">Silver Springs</h1>
        <scroll-shadow class="flex flex-col overflow-hidden flex-1 mx-4">
          <div class="scroll-container flex-1">
            <div class="flex gap-4 pb-4">
              <div class="site-map flex-1">
                ${this.renderSites("K")}
                <div class="alley"></div>
                ${this.renderSites("J")} ${this.renderSites("H")}
                <div class="alley"></div>
                ${this.renderSites("G")} ${this.renderSites("F")}
                <div class="alley"></div>
                ${this.renderSites("E")} ${this.renderSites("D")}
                <div class="alley"></div>
                ${this.renderSites("C")} ${this.renderSites("B")}
                <div class="alley"></div>
                ${this.renderSites("A")}
              </div>
              <div class="road"><span>Main Road</span></div>
            </div>
          </div>
        </scroll-shadow>
        <div class="footer">
          ${this.selectedSiteId
            ? html`<span>
                Site <strong>${this.selectedSiteId}</strong> (30 amp)
              </span>`
            : "Select a site"}
          <button ?disabled="${!this.selectedSiteId}">Reserve</button>
        </div>
      </div>
    `;
  }

  renderSites(row: string) {
    return html`
      ${repeat(
        new Array(22).fill(0).map((_, i) => 22 - i),
        (col) => col,
        (col) =>
          html`<button
            class="site"
            aria-pressed="${this.selectedSiteId === `${row}${col}`}"
            @click="${() => this.onToggleSelectSite(row, col)}"
          >
            ${row}${col}
          </button>`
      )}
    `;
  }

  onToggleSelectSite(row: string, col: number) {
    const siteId = `${row}${col}`;
    if (this.selectedSiteId === siteId) {
      this.selectedSiteId = null;
    } else {
      this.selectedSiteId = siteId;
    }
  }

  static styles = css`
    :host {
      height: 100%;
      overflow: hidden;
      display: block;
    }

    .scroll-container {
      overflow: auto;
    }

    .site-map {
      display: grid;
      gap: 0.5rem;
      grid-template-columns: repeat(22, minmax(40px, 1fr));
    }

    .site {
      border: 1px solid #cbd5e1;
      color: #1e293b;
      background: #f8fafc;
      display: flex;
      justify-content: center;
      align-items: center;
      aspect-ratio: 1;
    }

    .road {
      padding: 0.25rem;
      background: #fed7aa;
      display: flex;
      justify-content: center;
      align-items: center;
      color: #9a3412;
      text-transform: uppercase;
      font-weight: 500;
    }

    .road > * {
      writing-mode: vertical-rl;
      transform: rotate(180deg);
    }

    .alley {
      grid-column: span 22 / span 22;
      height: 1rem;
    }

    .footer {
      padding: 1rem;
      display: flex;
      align-items: center;
      justify-content: space-between;
      border-top: 1px solid #f1f5f9;
    }

    button {
      border-radius: 0.25rem;
      background: #0284c7;
      border: 1px solid #0284c7;
      color: white;
      padding: 0.5rem 1rem;
    }

    button[aria-pressed="true"] {
      background: #22c55e;
      border-color: #16a34a;
      color: white;
    }

    .flex {
      display: flex;
    }

    .flex-col {
      flex-direction: column;
    }

    .flex-1 {
      flex: 1 1 0%;
    }

    .gap-4 {
      gap: 1rem;
    }

    .pb-4 {
      padding-bottom: 1rem;
    }

    .mx-4 {
      margin-left: 1rem;
      margin-right: 1rem;
    }

    .h-full {
      height: 100%;
    }

    .text-center {
      text-align: center;
    }

    .overflow-hidden {
      overflow: hidden;
    }
  `;
}

declare global {
  interface HTMLElementTagNameMap {
    "site-map": SiteMapElement;
  }
}
