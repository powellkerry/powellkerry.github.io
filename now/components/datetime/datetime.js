var React = require('react');
var ReactDOM = require('react-dom');

import Weather from '../weather/weather.js';

module.exports = React.createClass({
	getInitialState: function() {
		return this.getDateTime();
	},
	getDateTime: function() {
		var time = new Date();
		return {
			hours: time.getHours() % 12 || 12,
			minutes: ("0"+time.getMinutes()).slice(-2),
			seconds: ("0"+time.getSeconds()).slice(-2),
			ampm: time.getHours() > 12 ? 'pm': 'am',
			date: time.getDate(),
			month: time.toLocaleString(navigator.language, {month: 'long'}),
			year: time.getFullYear()

		};
	},
	tick: function() {
		this.setState(this.getDateTime());
	},
	componentDidMount: function() {
		this.interval = setInterval(this.tick, 1000);
	},
	componentWillUnmount: function() {
		clearInterval(this.interval);
	},

	render: function() {
		return (
			<h1 className="datetime">
				<div className="datetime__date">
		    		<span className="datetime__month">{this.state.month}</span>
		    		<span className="datetime__day">{this.state.date}</span>,
		    		<span className="datetime__year">{this.state.year}</span>
				</div>
				<div className="datetime__time">
		    		<span className="datetime__hours">{this.state.hours}</span>:
		    		<span className="datetime__minutes">{this.state.minutes}</span>:
		    		<span className="datetime__seconds-ampm">
			    		<span className="datetime__seconds">{this.state.seconds}</span>
			    		<span className="datetime__ampm">{this.state.ampm}</span>
		    		</span>
				</div>
				<Weather />
			</h1>
		);
	}
});
