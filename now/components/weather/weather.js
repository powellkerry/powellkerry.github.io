var React = require('react');
var ReactDOM = require('react-dom');

import If from '../helpers/if.js';

var weather = React.createClass({
    componentDidMount: function() {
        var me = this,
            weather = function() {
                me.getGeolocation(function() {
                    me.getForecast();
                });
            };
        setInterval(weather, 1800000);
        weather();
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
            conditions: false,
            forecast: []
        };
    },

    getIcon: function(iconName) {
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
            default:
                icon = 'unknown';
                break;
        }
        return icon;
    },

    getForecast: function() {

        var httpRequest = new XMLHttpRequest(),
            me = this;

        httpRequest.onloadend = function() {
            if (httpRequest.status === 200 && httpRequest.responseText) {
                var response = JSON.parse(httpRequest.responseText),
                    forcastFinal = [];

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
                    }
                })
                console.log(response.productionCenter);
                me.setState({
                    forecast: forcastFinal,
                    location: response.productionCenter,
                    conditions: {
                        temp: response.currentobservation.Temp,
                        weather: me.getIcon(response.currentobservation.Weatherimage)
                    }
                });
            } else {
                me.getForecast();
            }
        };
        httpRequest.open('GET', 'http://forecast.weather.gov/MapClick.php?lat='+me.lat+'&lon='+me.lon+'&unit=0&lg=english&FcstType=json');
        if (httpRequest.status === 0) {
            httpRequest.send();
        }
    },

    getForecastDay: function(day) {
        return (
            <div key={day.datetime} className="weather--forecast__item">
                <div className="weather__day">{day.weekday}</div>
                <div><img title={day.title} className="weather__icon" src={'./weather-icons/'+day.weather+'.png'}/></div>
                <span className="weather__temp">{day.high}&deg;<If test={day.low}><span>/{day.low}&deg;</span></If></span>
            </div>
        )
    },

    render: function() {
        return (
            <div className="weather">
                <If test={this.state.conditions}>
                    <div className="weather--current">
                        <div className="weather__day">Current</div>
                        <div><img className="weather__icon" src={'./weather-icons/'+this.state.conditions.weather+'.png'}/></div>
                        <span className="weather__temp">{this.state.conditions.temp}&deg;</span>

                    </div>
                </If>

                <div className="weather--forecast">
                    {this.state.forecast.map(this.getForecastDay)}
                </div>

                <If test={this.state.location}>
                    <div className="weather__location">Weather for: {this.state.location}</div>
                </If>
            </div>

        );
    }
});
module.exports = weather;
