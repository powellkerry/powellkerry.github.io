var React = require('react');
var ReactDOM = require('react-dom');

var quote = React.createClass({

    componentDidMount: function() {
        var quote = JSON.parse(window.localStorage.getItem('quote')) || {};
        if (!quote.text || new Date(quote.date).setHours(new Date(quote.date).getHours() + 24) < new Date()) {
            this.loadQuote();
        } else {
            this.setState({
                quote: quote
            });
        }
        setInterval(this.loadQuote,86400000);
    },

    getInitialState: function() {
        return {
            quote: ''
        };
    },

    loadQuote: function() {
        var httpRequest = new XMLHttpRequest(),
            me = this;

        httpRequest.onloadend = function() {
            if (httpRequest.status === 200 && httpRequest.responseText) {
                var response = JSON.parse(httpRequest.responseText),
                    today = new Date().toLocaleDateString();
                var quote = response.filter(function(q) {
                    return new Date(q.date).toLocaleDateString() === today;
                })[0]
                
                me.setState({
                    quote: quote
                });
                window.localStorage.setItem('quote', JSON.stringify(quote));
            } else {
                //me.loadQuote();
            }
        };
        httpRequest.open('GET', './components/quote/quotes.json');
        if (httpRequest.status === 0) {
            httpRequest.send();
        }
    },

    render: function() {
      return (
          <div className="quote">
              <div className="quote__text">"{this.state.quote.text}"</div>
              <div className="quote__author">-- {this.state.quote.author}</div>
          </div>
      );
    }

});
module.exports = quote;
