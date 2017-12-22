class DateTime extends HTMLElement {
	constructor() {
		super();
		let tpl = document.createElement('template');
		tpl.innerHTML = `
			<style>
				.datetime {
					color: #fff;
					display: none;
				}

				.datetime__container {
					padding: 18px;
					background: #333;
					display: inline-block;
					height: 100%;
					vertical-align: top;
				}

				.datetime__time {
					font-size: 1.3em;
				}

				.datetime__date {
					font-size: .45em;
				}

				.datetime__ampm {
					text-transform: uppercase;
					font-size: .6em;
				}

				.datetime__weather {
					display: inline-block;
					background: #333;
					height: 100%;
				}
			</style>
			<h1 class="datetime">
				<div class="datetime__container">
					<div class="datetime__time">
						<span class="datetime__hour"></span>:<span class="datetime__minutes"></span>
						<span class="datetime__ampm"></span>
					</div>
					<div class="datetime__date">
						<span class="datetime__month"></span>
						<span class="datetime__day"></span>,
						<span class="datetime__year"></span>
					</div>
				</div>
				<div class="datetime__weather">
					<weather-forcast></weather-forcast>
				</div>
			</h1>
		`;
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(tpl.content.cloneNode(true));
	}

	setMonth(time) {
		this.shadowRoot.querySelector('.datetime__month').innerHTML = time.toLocaleString(navigator.language, {month : 'long'});
	}

	setDate(time) {
		this.shadowRoot.querySelector('.datetime__day').innerHTML = time.getDate();
	}

	setYear(time) {
		this.shadowRoot.querySelector('.datetime__year').innerHTML = time.getFullYear();
	}

	setHour(time) {
		this.shadowRoot.querySelector('.datetime__hour').innerHTML = time.getHours() % 12 || 12;
	}

	setMinutes(time) {
		this.shadowRoot.querySelector('.datetime__minutes').innerHTML = ("0"+time.getMinutes()).slice(-2);
	}

	setAMPM(time) {
		this.shadowRoot.querySelector('.datetime__ampm').innerHTML = time.getHours() > 12 ? 'pm' : 'am';
	}

	connectedCallback() {
		let me = this;
		setInterval(() => {
			var time = new Date();
			me.setMonth(time);
			me.setDate(time);
			me.setYear(time);
			me.setHour(time);
			me.setMinutes(time);
			me.setAMPM(time);
			me.shadowRoot.querySelector('.datetime').style = 'display: block;';
		}, 1000);

	}
}
customElements.define('date-time', DateTime);
