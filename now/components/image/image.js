class ImageComponent extends HTMLElement {
	constructor() {
		super();
		let tpl = document.createElement('template');
		tpl.innerHTML = `
			<style>
				.image {
					width: 100%;
					height: 100%;
					object-fit: cover;
				}
			</style>
			<img class="image" src="https://source.unsplash.com/collection/1519530/4000x2000"/>
		`;
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(tpl.content.cloneNode(true));
	}
}
customElements.define('image-component', ImageComponent);
