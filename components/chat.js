var React = require('react')
var ReactDOM = require('react-dom')
var Messages = require('./messages')
var Channels = require('./channels')

var Chat = React.createClass({
    getInitialState: function() {
        return {
            name: "anonymous",
            channels: ['general'],
            messages: [{
                name: 'brianmcmichael',
                time: new Date(),
                text: 'hello brian'
            },
                {
                    name: 'lexiapress',
                    time: new Date(),
                    text: 'hello b'
                }
            ]
        };
    },

    componentDidUpdate: function() {
        $("#message-list").scrollTop($("#message-list")[0].scrollHeight);
    },

    setName: function () {
        var myName = window.prompt("Please enter a name", "anonymous");
        this.setState({name:myName});
    },

    sendMessage: function(event) {
        var text = event.target.value;
        if (event.keyCode == 13 && text !== "") {
            var message = {
                name: this.state.name,
                text: text,
                time: new Date()
            }

            this.setState({messages: this.state.messages.concat(message)})
            $('#msg-input').val('');
        }
    },

    render: function() {

        return(
            <div>
                <div className="header">
                    <div className="team-menu" onClick={this.setName}><img className="connection_icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAABmFBMVEUAAAD////////////////////////////////////2+/LR5bKw1Hmfy1KUxz2VyD2izVKz1nnS5rP////A3JuOw0qKwkCNxD+QxT6Sxj6Txz6SxUnC3Jv1+fGXx2GDvkCGwECIwUCLwj+PxD6PxT+JwUCFwECZyGD2+vGSxWF9vEGAvkGDv0CMwz+Wx2GPw2F4ukJ7u0J+vUGBvkGHwUB8u0KSxGG31pp0uEN3uUJ5u0KFv0CCv0B6u0K415p5uU1yt0N/vUF1uEN8u0zG3bFttURwtkR5ukLH3rGWxnlqtERutUR2uUOZx3l6uVZos0VvtkRxt0Nzt0N8ulVisUVlskVns0VzuENmskVfsEVps0VztlZer0VhsEVjsUVstER1t1aOwXhcrkZdr0VgsEaQwnm/2a9YrUZbrka/2rDz+PFhr09XrEZksE6pzplUq0ZVrEZarUaqzpl0tWJRq0dWrEZ1tmJztWJOqUdSq0dxtGJMqEdNqUdQqkdytWKmzJhXrFBKqEdZrU+716+GvXhjr1dIp0hkr1dYtVOVAAAAFHRSTlMAV8/v/wCH+x/n////////////9kvBHZAAAAG7SURBVHgBvdOxjtNAEIDhGe/MZO3sxVaiIJkiSNdQUPJOeQlqXoCCIg/EU9BQHRKg5CT7ErzrHTa+aBOqaxC/tdLK+2kbj+H/hoWhlCmQr0HeyYxyM8mvkWHKoAfBS6cBWEeYugAzf4QGp1SV8DvU/ZjBdN7iud6hdnOTdl+TuALyrUPEwfdu3nc1ipr9AwdIFZPysJylRDfa6cZL2rfgMd9QjO8R0Y+/u7sa4LHZz4wN/MXEyw1hbK1VZdV7PZ1OyufzktsxXADCW5EkXq06Paan02Uoo3kHmAEzJ8HBN6v5qlkqaxTmCdAzQK8Noi6rXwCrJyutepUMAARnXS++3cvm2xvftR0PzAyQAXtwdNChifvFHppBdR003IDCIg6JDOse4DX8WIdo1TwfpaUgqWC9c4eqqg5HF20QZdAMmDlasdHWkrKR03J0A4iIXRTrpba29laiY8YMyOyMKYkXroyROZZuwVTyztAFJPmZKBGq+FxFVBr5BHr7ubd3GICfAM+88qDHHYe/BmbbIAaGKU/Fz10emDxyHxBhgJTg+DGP3O3QbltMBkd92F2H9sWxB772wo9z2z8FfwDHWbdKLDfq1AAAAABJRU5ErkJggg=="/>  {this.state.name}</div>
                        <div className="channel-menu">
                            <span className="channel-menu_name">
                                <span className="channel-menu_prefix">#</span>
                                general
                            </span>
                        </div>
                    </div>
                    <div className="main">
                        <div className="listings">
                            <Channels channels={this.state.channels} />
                        </div>
                        <div className="message-history">
                            <Messages messages={this.state.messages} />
                        </div>
                    </div>
                    <div className="footer">
                        <div className="user-menu">
                            <p className="disclaimer">This demo is not created by, affiliated with, or supported by Slack Technologies, Inc.</p>
                        </div>
                    <div className="input-box">
                        <input id="msg-input" type="text" className="input-box_text" onKeyDown={this.sendMessage}/>
                    </div>
                </div>
            </div>
        )
    }
});
ReactDOM.render(<Chat />, document.getElementById('app'));

module.exports = Chat;