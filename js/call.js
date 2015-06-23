var globals = {};
globals.isMobile = /mobile/i.test(navigator.userAgent);

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

var PhoneForm = React.createClass({displayName: "PhoneForm",
    render: function() {
        return (
            React.createElement("div", {className: "phone-form"}, 
                React.createElement("form", {onSubmit:  this.onSubmit}, 
                    React.createElement("input", {placeholder: "Your Phone Number", id: "field-phone", ref: "field-phone", class: "phone", name: "phone", autocomplete: "on", type: "number"}), 
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

        if (!globals.isMobile) {
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
            form: 'phone',
        };
    },

    onClickOptOut: function() {
        this.setState({
            form: 'opt-out',
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
