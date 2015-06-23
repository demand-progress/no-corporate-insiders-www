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

                React.createElement("form", null, 
                    React.createElement("input", {placeholder: "Your Phone Number"}), 
                    React.createElement("button", null, "Connect")
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
});

React.render(React.createElement(CallPages, null), document.getElementById('app'));
