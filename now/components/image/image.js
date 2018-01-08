class ImageComponent extends HTMLElement {
	constructor() {
		super();
		let tpl = document.createElement('template');
		tpl.innerHTML = `
			<style>
				.image {
					width: 100%;
					height: 100%;
					max-width: 100%;
					max-height: 100%;
					object-fit: cover;
					overflow: hidden;
				}
			</style>
			<img class="image" src="https://source.unsplash.com/collection/1519530/1800x1000"/>
		`;
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(tpl.content.cloneNode(true));
	}
}
customElements.define('image-component', ImageComponent);
