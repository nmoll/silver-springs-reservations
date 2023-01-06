import { LitElement } from "lit-element";
declare class SiteMapElement extends LitElement {
    selectedSiteId: string | null;
    render(): import("lit-html").TemplateResult<1>;
    renderSites(row: string): import("lit-html").TemplateResult<1>;
    onToggleSelectSite(row: string, col: number): void;
    static styles: import("lit-element").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "site-map": SiteMapElement;
    }
}
export {};
