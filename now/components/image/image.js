var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  render: function() {
    return (
    	<div className="image" style={{backgroundImage: "url(./backgrounds/"+Math.floor(Math.random() * (50 - 1) + 1)+".png)"}}>
            {this.props.children}
        </div>
	);
  }
});
