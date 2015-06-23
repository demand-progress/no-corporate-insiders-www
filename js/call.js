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

var Form = React.createClass({displayName: "Form",
    render: function() {
        return (
            React.createElement("div", {className: "form"}, 
                React.createElement("form", {onSubmit:  this.onSubmit}, 
                    React.createElement("input", {placeholder: "Your Phone Number", id: "field-phone"}), 
                    React.createElement("button", null, 
                        "Connect", 
                        React.createElement("img", {src: "images/phone.svg"})
                    )
                )
            )
        );
    },

    onSubmit: function(e) {
        e.preventDefault();
        console.log(e);
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

var Privacy = React.createClass({displayName: "Privacy",
    render: function() {
        return (
            React.createElement("div", {className: "privacy"}, 
                "This tool uses ", React.createElement("a", {href: "https://www.twilio.com/legal/privacy", target: "_blank"}, "Twilio"), "'s APIs.", 
                React.createElement("br", null), 
                "If you prefer not to use our call tool, ", React.createElement("a", {href: "#open-phone-number-modal"}, "click here"), "."
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

                React.createElement(Privacy, null), 

                React.createElement(LogoCloud, null), 

                React.createElement(Contact, null)
            )
        );
    },
});

React.render(React.createElement(CallPages, null), document.getElementById('app'));
