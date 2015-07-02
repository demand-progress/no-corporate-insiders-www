var state = {};
state.isMobile = /mobile/i.test(navigator.userAgent);
state.campaign = 'no_more_wall_street_insiders';
state.query = getQueryVariables();

var events = {
    list: {},
    on: function(event, callback) {
        if (!this.list[event]) {
            this.list[event] = [];
        }

        this.list[event].push(callback);
    },
    trigger: function(event, data) {
        if (!this.list[event]) {
            return;
        }

        for (var i = 0; i < this.list[event].length; i++) {
            this.list[event][i](data);
        }
    },
};

function getQueryVariables() {
    var variables = {};

    var queryString = location.search.substr(1);
    var pairs = queryString.split('&');

    for (var i = 0; i < pairs.length; i++) {
        var keyValue = pairs[i].split('=');
        variables[keyValue[0]] = keyValue[1];
    }

    return variables;
}

var Header = React.createClass({displayName: "Header",
    render: function() {
        return (
            React.createElement("header", null, 
                React.createElement("div", {className: "title"}, 
                    "Crack Down on Wall Street"
                ), 

                React.createElement("div", {className: "paragraph"}, 
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit."
                )
            )
        );
    },
});

var EmailForm = React.createClass({displayName: "EmailForm",
    render: function() {
        return (
            React.createElement("div", {className: "email-form"}, 
                React.createElement("form", {onSubmit:  this.onSubmit, ref: "form"}, 
                    React.createElement("input", {className: "name", placeholder: "Your name"}), 
                    React.createElement("input", {className: "email", placeholder: "Email"}), 
                    React.createElement("input", {className: "address", placeholder: "Street address"}), 
                    React.createElement("input", {className: "zip", placeholder: "Zip code"}), 
                    React.createElement("button", null, 
                        "Send Now"
                    ), 

                    React.createElement("div", {className: "hidden"}, 
                        React.createElement("input", {type: "hidden", name: "source", value:  this.getSource() })
                    )
                )
            )
        );
    },

    componentDidMount: function() {
        var nameField = this.refs.form.getDOMNode().querySelector('.name');

        if (!state.isMobile) {
            nameField.focus();
        }
    },

    getSource: function() {
        var source = state.query.source || 'demandprogress';
        return source.toLowerCase();
    },

    onSubmit: function(e) {
        e.preventDefault();

        console.log(this.refs.form.getDOMNode());
        console.log('We should harvest values from fields.');

        this.props.moveToPhoneForm();
    },
});

var PhoneForm = React.createClass({displayName: "PhoneForm",
    render: function() {
        return (
            React.createElement("div", {className: "phone-form"}, 
                React.createElement("form", {onSubmit:  this.onSubmit}, 
                    React.createElement("input", {placeholder: "Your Phone Number", id: "field-phone", ref: "field-phone", class: "phone", name: "phone", autocomplete: "on", pattern: "[0-9]*"}), 
                    React.createElement("button", null, 
                        "Connect", 
                        React.createElement("img", {src: "images/phone.svg"})
                    )
                ), 

                React.createElement("div", {className: "privacy"}, 
                    "This tool uses ", React.createElement("a", {href: "https://www.twilio.com/legal/privacy", target: "_blank"}, "Twilio"), "'s APIs.", 
                    React.createElement("br", null), 
                    "If you prefer not to use our call tool, ", React.createElement("a", {href: "#opt-out", onClick:  this.props.onClickOptOut}, "click here"), "."
                )
            )
        );
    },

    componentDidMount: function() {
        var phoneField = this.refs['field-phone'].getDOMNode();

        if (!state.isMobile) {
            phoneField.focus();
        }
    },

    onSubmit: function(e) {
        e.preventDefault();
        console.log(e);
    },
});

var OptOutForm = React.createClass({displayName: "OptOutForm",
    render: function() {
        return (
            React.createElement("div", {className: "opt-out-form"}, 
                React.createElement("div", {className: "script"}, 
                    "Tell them: \"Lorem ipsum\""
                ), 

                React.createElement("div", {className: "numbers"}, 
                    React.createElement("div", {className: "number"}, 
                        React.createElement("div", {className: "name"}, 
                            "John Smith"
                        ), 

                        React.createElement("div", {className: "phone"}, 
                            "(555) 555-5555"
                        )
                    ), 

                    React.createElement("div", {className: "number"}, 
                        React.createElement("div", {className: "name"}, 
                            "John Smith"
                        ), 

                        React.createElement("div", {className: "phone"}, 
                            "(555) 555-5555"
                        )
                    )
                )
            )
        );
    },
});

var Form = React.createClass({displayName: "Form",
    render: function() {
        var form;
        switch (this.state.form) {
            case 'email':
            form = React.createElement(EmailForm, {moveToPhoneForm:  this.moveToPhoneForm});
            break;

            case 'phone':
            form = React.createElement(PhoneForm, {onClickOptOut:  this.onClickOptOut});
            break;

            case 'opt-out':
            form = React.createElement(OptOutForm, null);
            break;
        }

        return (
            React.createElement("div", {className: "form"}, 
                 form 
            )
        );
    },

    getInitialState: function () {
        return {
            form: 'email',
        };
    },

    onClickOptOut: function(e) {
        e.preventDefault();

        this.setState({
            form: 'opt-out',
        });
    },

    moveToPhoneForm: function(e) {
        this.setState({
            form: 'phone',
        });
    },
});

var LogoCloud = React.createClass({displayName: "LogoCloud",
    render: function() {
        return (
            React.createElement("div", {className: "logos"}, 
                React.createElement("img", {src: "images/logos/dp.png"})
            )
        );
    },
});

var Contact = React.createClass({displayName: "Contact",
    render: function() {
        return (
            React.createElement("div", {className: "contact"}, 
                "For press inquiries, please contact us at:", 
                React.createElement("br", null), 
                "202-681-7582 or ", React.createElement("a", {href: "mailto:press@demandprogress.org"}, "press@demandprogress.org")
            )
        );
    },
});

var CallPages = React.createClass({displayName: "CallPages",
    render: function() {
        return (
            React.createElement("div", {className: "wrapper"}, 
                React.createElement(Header, null), 

                React.createElement(Form, null), 

                React.createElement(LogoCloud, null), 

                React.createElement(Contact, null)
            )
        );
    },
});

React.render(React.createElement(CallPages, null), document.getElementById('app'));
