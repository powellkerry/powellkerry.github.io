var React = require('react');
var ReactDOM = require('react-dom');

module.exports = React.createClass({
  clearChecked: function() {
    var items = this.state.items.filter(function(i) {
      return !i.checked;
    });
    window.localStorage.setItem(this.props.id, JSON.stringify(items));
    this.setState({items: items});
  },
  getInitialState: function() {
    return {items: [], text: ''};
  },
  onChange: function(e) {
    this.setState({text: e.target.value});
  },
  handleSubmit: function(e) {
    e.preventDefault();
    var nextItems = this.state.items.concat([{text: this.state.text, id: Date.now(), checked: false}]);
    var nextText = '';
    window.localStorage.setItem(this.props.id, JSON.stringify(nextItems));
    this.setState({items: nextItems, text: nextText});
  },
  checkChange: function(e) {
    this.setState({
      items: this.state.items.map(function(i) {
        if (i.id === parseInt(e.target.getAttribute('id'))) {
          i.checked = !i.checked;
        }
        return i;
      })
    });
    window.localStorage.setItem(this.props.id, JSON.stringify(this.state.items));
  },
  createItem: function(item) {
    return (
        <li key={item.id}>
            <label>
                <input type="checkbox" id={item.id} checked={item.checked} onChange={this.checkChange}/>
                {item.text}
            </label>
        </li>
    );
  },
  render: function() {
    this.state.items = JSON.parse(window.localStorage.getItem(this.props.id)) || [];
    return (
        <div className="list">
            <h2>{this.props.header} <button onClick={this.clearChecked}>Remove Checked</button></h2>
            <ul>{this.state.items.map(this.createItem)}</ul>
            <form onSubmit={this.handleSubmit}>
                <input onChange={this.onChange} value={this.state.text} />
                <button>Add</button>
            </form>
        </div>
    );
  }
});
