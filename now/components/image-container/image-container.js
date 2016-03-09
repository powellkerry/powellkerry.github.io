var React = require('react');
var ReactDOM = require('react-dom');

import Image from '../image/image.js';
import Time from '../datetime/datetime.js';
import List from '../list/list.js';
import Weather from '../weather/weather.js';

module.exports = React.createClass({
  render: function() {
    return (
        <Image>
        	<div className="image-container">
        		<div className="content">
    	    		<Time />
                    <div className="image-container__wrapper">
                        <Weather />
        	    		<div className="list-container">
        		    		<List header="To Do" id="toDo" />
        		    		<List header="Stretch" id="stretch" />
        	    		</div>
                    </div>
        		</div>
    		</div>
        </Image>
	);
  }
});
