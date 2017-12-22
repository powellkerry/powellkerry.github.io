class ImageContainer extends HTMLElement {
	constructor() {
		super();
		let tpl = document.createElement('template');
		tpl.innerHTML = `
			<style>
				.image-container {
					height: 100%;
					width: 100%;
				}
				.content {
					position: absolute;
					top: 0;
					left: 0;
					padding: 0 20px;
					height: 100%;
					width: 100%;
				}
			</style>
			<div class="image-container">
				<image-component></image-component>
				<div class="content">
					<date-time></date-time>
					<!--<list-component></list-component>-->
				</div>
			</div>
		`;
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(tpl.content.cloneNode(true));
	}
}

customElements.define('image-container', ImageContainer);
