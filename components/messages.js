var React = require('react')
var ReactDOM = require('react-dom')

var Messages = React.createClass({
    render: function () {
        if (!this.props.messages) {return null;}

        var messageList = this.props.messages.map(function(message, i) {
            var text = message.text;
            return (
                <div key={i} className="message">
                    <div className="message">
                        <a href={"https://twitter.com/" + message.name + "/"} target="_blank"><img src={"https://twitter.com/" + message.name + "/profile_image"} className="message_profile-pic" /></a>
                        <a href={"https://twitter.com/" + message.name + "/"} target="_blank" className="message_username">{message.name}</a>
                        <span className="message_timestamp">{message.time.toLocaleString()}</span>
                        <span className="message_content" dangerouslySetInnerHTML={{__html: text}}></span>
                    </div>
                </div>
            )
        })

        return (
            <div id="message-list">
                <div className="time-divide">
                    <span className="date">
                    </span>
                </div>
                {messageList}
            </div>
        )
    }
})

module.exports = Messages;