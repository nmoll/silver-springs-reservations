import { LitElement } from "lit";
import "./site-map/site-map.element";
export declare class AppElement extends LitElement {
    render(): import("lit-html").TemplateResult<1>;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        "silver-springs-app": AppElement;
    }
}
