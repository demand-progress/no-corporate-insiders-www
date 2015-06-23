var CallPages = React.createClass({displayName: "CallPages",
    render: function() {
        return (
            React.createElement("div", {class: "wrapper"}, 
                React.createElement("div", {className: "title"}, 
                    "Crack Down on Wall Street"
                ), 

                React.createElement("div", {className: "paragraph"}, 
                    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit."
                ), 

                React.createElement("form", {onSubmit:  this.onSubmit}, 
                    React.createElement("input", {placeholder: "Your Phone Number", id: "field-phone"}), 
                    React.createElement("button", null, 
                        "Connect", 
                        React.createElement("img", {src: "images/phone.svg"})
                    )
                ), 

                React.createElement("div", {className: "privacy"}, 
                    "This tool uses ", React.createElement("a", {href: "https://www.twilio.com/legal/privacy", target: "_blank"}, "Twilio"), "'s APIs.", 
                    React.createElement("br", null), 
                    "If you prefer not to use our call tool, ", React.createElement("a", {href: "#open-phone-number-modal"}, "click here"), "."
                ), 

                React.createElement("div", {className: "logos"}, 
                    React.createElement("img", {src: "images/logos/dp.png"})
                ), 

                React.createElement("div", {className: "contact"}, 
                    "For press inquiries, please contact us at:", 
                    React.createElement("br", null), 
                    "202-681-7582 or ", React.createElement("a", {href: "mailto:press@demandprogress.org"}, "press@demandprogress.org")
                )
            )
        );
    },

    onSubmit: function(e) {
        console.log(e);
        e.preventDefault();
    },
});

React.render(React.createElement(CallPages, null), document.getElementById('app'));
