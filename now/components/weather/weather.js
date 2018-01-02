class Weather extends HTMLElement {
	constructor() {
		super();
		let tpl = document.createElement('template');
		tpl.innerHTML = `
			<style>
				@keyframes rotate {
					0% {
						transform: rotate(0deg);
					}

					100% {
						transform: rotate(360deg);
					}
				}
				.weather {
					vertical-align: top;
				}
				.weather__icon {
					height: 40px;
			    	width: 40px;
			    	vertical-align: middle;
					display: inline-block;
				}
				.weather__temp {
					font-size: .6em;
					text-align: center;
					display: inline-block;
				}

				.weather__dayname {
					font-size: .4em;
					text-align: center;
				}
				.weather__loading {
					text-align: center;
					padding: 10px;
				}
				.weather__loading svg {
					height: 40px;
					animation: 1s infinite rotate linear;
					vertical-align: middle;
				}
				.weather__current {
					padding: 10px;
					display: none;
				}
				.weather__current, .weather__day {
					text-align: center;
				}
				.weather__day {
					border-bottom: 1px solid #333;
					padding: 10px;
				}
				.weather__forcast {
					background: #232323;
					max-height: 0px;
					overflow: hidden;
					transition: all 250ms ease;
				}
				.weather__forcast[data-show=true] {
					max-height: 950px;
				}
				.weather__expander {
					background: transparent;
					border: none;
					outline: transparent;
					width: 100%;
					padding: 10px 0;
					background: #232323;
					cursor: pointer;
				}
				.weather__expander__icon {
					height: 10px;
				}
				.weather__expander__icon g {
					fill: #FFF;
				}
				.weather__expander[data-show=true] .weather__expander__icon {
					transform: rotate(180deg);
				}
			</style>
			<div class="weather">
				<div class="weather__loading">
					<svg width="79px" height="79px" viewBox="0 0 79 79" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <desc>Loading</desc>
					    <defs>
					        <linearGradient x1="50%" y1="0%" x2="99.874547%" y2="0%" id="linearGradient-1">
					            <stop stop-color="#1DD8FB" offset="0%"></stop>
					            <stop stop-color="#939393" offset="99.9162946%"></stop>
					        </linearGradient>
					    </defs>
					    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					        <g id="Group">
					            <path d="M39.5,79 C17.6847524,79 0,61.3152476 0,39.5 C0,17.6847524 17.6847524,0 39.5,0 C61.3152476,0 79,17.6847524 79,39.5 C79,61.3152476 61.3152476,79 39.5,79 Z M39.5,68 C55.2401154,68 68,55.2401154 68,39.5 C68,23.7598846 55.2401154,11 39.5,11 C23.7598846,11 11,23.7598846 11,39.5 C11,55.2401154 23.7598846,68 39.5,68 Z" id="Combined-Shape" fill="#939393"></path>
					            <path d="M-1.77635684e-15,41 L11.0108406,41 C11.79086,56.0428471 24.2350809,68 39.4720444,68 C54.709008,68 67.1532289,56.0428471 67.9332483,41 L78.9440889,41 C78.1555502,62.1201787 60.7850441,79 39.4720444,79 C18.1590448,79 0.788538628,62.1201787 3.8709321e-07,41.0000104 Z" id="Combined-Shape" fill="url(#linearGradient-1)"></path>
					        </g>
					    </g>
					</svg>
				</div>
				<div class="weather__current"></div>
				<div class="weather__forcast"></div>
				<button class="weather__expander">
					<svg class="weather__expander__icon" width="144px" height="56px" viewBox="0 0 144 56" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
					    <desc>Expand</desc>
					    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
					        <path d="M120.857143,56 L72,18 L23.1428571,56 L0,56 L72,0 L144,56 L120.857143,56 Z" id="Combined-Shape" transform="translate(72.000000, 28.000000) scale(1, -1) translate(-72.000000, -28.000000) "></path>
					    </g>
					</svg>
				</button>
			</div>
		`;
		let shadowRoot = this.attachShadow({mode: 'open'});
		shadowRoot.appendChild(tpl.content.cloneNode(true));
	}
	getGeolocation(cb) {
        var me = this;
        navigator.geolocation.getCurrentPosition(function(pos) {
            me.lat = pos.coords.latitude,
            me.lon = pos.coords.longitude;
            cb();
        });
    }

	getIcon(iconName) {

        var icon;
        iconName = iconName.split("/").pop();
        switch(true) {
            case iconName.indexOf('skc') !== -1 || iconName.indexOf('few') !== -1:
                icon="01d";
                break;
            case iconName.indexOf('sct') !== -1:
                icon='02d';
                break;
            case iconName.indexOf('bkn') !== -1:
                icon = '03d';
                break;
            case iconName.indexOf('ov') !== -1:
                icon = '04d';
                break;
            case iconName.indexOf('ra') !== -1 || iconName.indexOf('shwrs') !== -1:
                icon = '09d';
                break;
            case iconName.indexOf('ts') !== -1:
                icon = '11d';
                break;
            case iconName.indexOf('sn') !== -1:
                icon = '13d';
                break;
			case iconName.indexOf('hz') !== -1:
				icon="14d";
				break;
            default:
                icon = 'unknown';
                break;
        }
        return icon;
    }

	toggleForcast() {
		let forcastEl = this.parentElement.querySelector('.weather__forcast');

		if (forcastEl.getAttribute('data-show') === 'true') {
			this.setAttribute('data-show', false);
			forcastEl.setAttribute('data-show', false);
		} else {
			this.setAttribute('data-show', true);
			forcastEl.setAttribute('data-show', true);
		}
	}

	getForecast() {

        var httpRequest = new XMLHttpRequest(),
            me = this;

        httpRequest.onloadend = function() {
            if (httpRequest.status === 200 && httpRequest.responseText) {
                var response = JSON.parse(httpRequest.responseText),
					forcastFinal = [],
					forcast = ``;

                response.time.startValidTime.map(function(time, index) {
                    var dt = new Date(time);
                    var weather = {
                        high: response.data.temperature[index],
                        datetime: time,
                        weekday: dt.toLocaleDateString(navigator.language, {weekday: 'long'}),
                        weather: me.getIcon(response.data.iconLink[index]),
                        title: response.data.weather[index]
                    }

                    var existing = forcastFinal.filter(function(e) {
                        return e.weekday === weather.weekday;
                    });
                    if (existing.length > 0) {
                        if (existing[0].high < weather.high) {
                            existing[0].low = existing[0].high;
                            existing[0].high = weather.high;
                        } else {
                            existing[0].low = weather.high;
                        }
                    } else {
						forcastFinal.push(weather);
						forcast = `
							${forcast}
							<div class="weather__day">
								<div class="weather__dayname">${weather.weekday}</div>
								<img class="weather__icon" src="./icons/${weather.weather}.png"/>
								<div class="weather__temp">${weather.high}&deg;</div>
							</div>
						`

                    }
                })
				me.shadowRoot.querySelector('.weather__current').innerHTML = `
					<img class="weather__icon" src="./icons/${me.getIcon(response.currentobservation.Weatherimage)}.png"/>
					<div class="weather__temp">${response.currentobservation.Temp}&deg;</div>
				`
				me.shadowRoot.querySelector('.weather__forcast').innerHTML = forcast;

				me.shadowRoot.querySelector('.weather__loading').style = 'display: none;';
				me.shadowRoot.querySelector('.weather__current').style= 'display: block';

            } else {
                me.getForecast();
            }
        };
        httpRequest.open('GET', 'http://forecast.weather.gov/MapClick.php?lat='+me.lat+'&lon='+me.lon+'&unit=0&lg=english&FcstType=json');
        if (httpRequest.status === 0) {
            httpRequest.send();
        }
    }

	connectedCallback() {
		var me = this,
            weather = function() {
                me.getGeolocation(function() {
                    me.getForecast();
                });
            };
        setInterval(weather, 1800000);
		me.shadowRoot.querySelector('.weather__expander').addEventListener('click', me.toggleForcast);
        weather();
	}
}
customElements.define('weather-forcast', Weather);
