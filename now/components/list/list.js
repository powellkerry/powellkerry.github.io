class ListComponent extends HTMLElement {
	constructor() {
		super();
		let tpl = document.createElement('template');
		tpl.innerHTML = `
			<style>
				.list {
					position: absolute;
					top: 0;
					right: 40px;
					width: 300px;
					color: #fff;
					background: #333;
					margin: 20px;
					padding: 20px;
				}
				.list__title {
					margin: 0;
				}
			</style>
			<div class="list">
				<h2 class="list__title">Today</h2>
			</div>
		`;
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(tpl.content.cloneNode(true));
	}

	connectedCallback() {
		this.request = window.indexedDB.open('Now', 1);
		this.db = null;
		var me = this;
		this.request.onsuccess = function(event) {
			me.db = event.target.result;
		}
		this.request.onupgradeneeded = function(event) {
			console.log('here')
			me.db = event.target.result;
			me.objectStore = me.db.createObjectStore('to-dos', {autoIncrement: true});
			me.objectStore.add({text: 'I need to do this.'});
		}
	}
}
customElements.define('list-component', ListComponent);
