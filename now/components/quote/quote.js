var React = require('react');
var ReactDOM = require('react-dom');

var quote = React.createClass({

    componentDidMount: function() {
        this.loadQuote();
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
                var response = JSON.parse(httpRequest.responseText);
                var quote = response.filter(function(q) {
                    return new Date(q.date).toLocaleDateString() === new Date().toLocaleDateString();
                })[0]

                me.setState({
                    quote: quote
                });
            } else {
                me.loadQuote();
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
