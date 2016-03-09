var React = require('react');
var ReactDOM = require('react-dom');

var weather = React.createClass({
    componentDidMount: function() {
        var me = this;
        this.getGeolocation(function() {
            me.getCurrentConditions();
            me.getForecast();
        })
    },

    getGeolocation: function(cb) {

        var me = this;
        navigator.geolocation.getCurrentPosition(function(pos) {
            me.lat = pos.coords.latitude,
            me.lon = pos.coords.longitude;
            cb();
        });
    },

    getInitialState: function() {
        return {
            conditions: {
                tempString: 'Loading',
                weather: 'unknown',
            },
            forecast: []
        };
    },

    getForecast: function(cb) {

        var httpRequest = new XMLHttpRequest(),
            me = this;

        httpRequest.onloadend = function() {
            if (httpRequest.status === 200 && httpRequest.responseText) {
                var response = JSON.parse(httpRequest.responseText),
                    forcast = response.list.map(function(i) {
                        var dt = new Date(i.dt_txt);
                        return {
                            high: Math.round(i.main.temp_max),
                            low: Math.round(i.main.temp_min),
                            weather: i.weather[0].icon,
                            datetime: i.dt,
                            weekday: dt.toLocaleDateString(navigator.language, {weekday: 'long'})

                        }
                    }),
                    forcastFinal = [];

                forcast.map(function(i) {
                    var existing = forcastFinal.filter(function(e) {
                        return e.weekday === i.weekday;
                    });
                    if (existing.length > 0) {
                        if (existing[0].high < i.high) {
                            existing[0].high = i.high;
                        }
                        if (existing[0].low > i.low) {
                            existing[0].low = i.low;
                        }
                        if (existing[0].weather.indexOf('d') === -1 && i.weather.indexOf('d') > -1) {
                            existing[0].weather = i.weather;
                        }
                    } else {
                        forcastFinal.push(i);
                    }
                })

                me.setState({
                    forecast: forcastFinal
                });
            }
        };
        httpRequest.open('GET', 'http://api.openweathermap.org/data/2.5/forecast?lat='+me.lat+'&lon='+me.lon+'&appid=f747420b55e6e83756c0744cdd19882f&units=imperial&type=accurate');
        if (httpRequest.status === 0) {
            httpRequest.send();
        }
    },

    getCurrentConditions: function() {
        var httpRequest = new XMLHttpRequest(),
            me = this;

        httpRequest.onloadend = function() {
            if (httpRequest.status === 200 && httpRequest.responseText) {
                var response = JSON.parse(httpRequest.responseText);
                me.setState({
                    conditions: {
                        tempString: Math.round(response.main.temp),
                        weather: response.weather[0].icon
                    }
                });
            }
        };
        httpRequest.open('GET', 'http://api.openweathermap.org/data/2.5/weather?lat='+me.lat+'&lon='+me.lon+'&appid=f747420b55e6e83756c0744cdd19882f&units=imperial&type=accurate');
        httpRequest.send();
    },

    getForecastDay: function(day) {
        return (
            <div key={day.datetime} className="weather--forecast__item">
                <div className="weather__day">{day.weekday}</div>
                <div><img className="weather__icon" src={'./weather-icons/'+day.weather+'.png'}/></div>
                <span className="weather__temp">{day.high}&deg;/{day.low}&deg;</span>
            </div>
        )
    },

    render: function() {
        return (
            <div className="weather">
                <div className="weather--current">
                    <div className="weather__day">Current</div>
                    <div><img className="weather__icon" src={'./weather-icons/'+this.state.conditions.weather+'.png'}/></div>
                    <span className="weather__temp">{this.state.conditions.tempString}&deg;</span>

                </div>

                <div className="weather--forecast">
                    {this.state.forecast.map(this.getForecastDay)}
                </div>
            </div>

        );
    }
});
module.exports = weather;
