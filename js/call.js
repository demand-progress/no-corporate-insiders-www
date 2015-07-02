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

function findPos(obj) {
    var curTop = 0;
    if (obj.offsetParent) {
        do {
            curTop += obj.offsetTop;
        } while (obj = obj.offsetParent);

        return [curTop];
    }
}

function k() {}

var Header = React.createClass({displayName: "Header",
    render: function() {
        return (
            React.createElement("header", null, 
                React.createElement("div", {className: "title"}, 
                    "Tell President Obama: No More Wall Street Insiders at the SEC"
                ), 

                React.createElement("div", {className: "paragraph"}, 
                    "The first time President Obama had an opening at the SEC – which oversees Wall Street – he appointed Mary Jo White, who had spent most of her career defending Wall Street.", 
                    React.createElement("div", {className: "spacer"}), 

                    "The results have been predictably dire: “get out of jail free” waivers to banks that break the law, repeatedly delaying key rules required by the Dodd-Frank Wall Street reform bill, and deadlocking the SEC with innumerable conflicts of interest.", 
                    React.createElement("div", {className: "spacer"}), 

                    "President Obama can’t make this mistake again – and there are two more openings at the SEC. Sign the petition: tell President Obama to nominate commissioners to the SEC who aren’t afraid to be tough on Wall Street criminals."
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
                    React.createElement("input", {className: "name", name: "name", placeholder: "Your name"}), 
                    React.createElement("input", {className: "email", name: "email", placeholder: "Email", type: "email"}), 
                    React.createElement("input", {className: "zip", name: "zip", placeholder: "Zip code", type: "number"}), 
                    React.createElement("button", null, 
                        "Send Now"
                    ), 

                    React.createElement("div", {className: "hidden"}, 
                        React.createElement("input", {type: "hidden", name: "source", value:  this.getSource() })
                    )
                ), 

                React.createElement("div", {className: "disclaimer"}, 
                    "We do not share your email address without your permission." + ' ' +
                    "Demand Progress," + ' ' +
                    "Democracy For America," + ' ' +
                    "National People’s Action," + ' ' +
                    "Other 98," + ' ' +
                    "RootsAction, and" + ' ' +
                    "Rootstrikers" + ' ' +
                    "may send you updates on this and other important campaigns by email. If at any time you would like to unsubscribe from any of these email lists, you may do so."
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

        this.props.changeForm('phone');
    },
});

var PhoneForm = React.createClass({displayName: "PhoneForm",
    render: function() {
        return (
            React.createElement("div", {className: "phone-form"}, 
                React.createElement("form", {onSubmit:  this.onSubmit}, 
                    React.createElement("h2", null, "Thanks – we’ll deliver your letter to the White House"), 

                    React.createElement("div", {className: "request"}, 
                        "Will you make a call to tell the White House to give us a tough “cop on the beat” on Wall Street? Making a phone call is even more effective than sending a letter. We’ll connect you and give you a script. It’ll just take a moment – and it could mean a crackdown on Wall Street’s reckless behavior."
                    ), 

                    React.createElement("input", {placeholder: "Your Phone Number", id: "field-phone", ref: "field-phone", class: "phone", name: "phone", autocomplete: "on", pattern: "[\\d\\(\\)\\-\\+ ]*"}), 
                    React.createElement("button", null, 
                        "Connect", 
                        React.createElement("img", {src: "images/phone.svg"})
                    )
                ), 

                React.createElement("div", {className: "privacy"}, 
                    "This tool uses ", React.createElement("a", {href: "https://www.twilio.com/legal/privacy", target: "_blank"}, "Twilio"), "’s APIs.", 
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

        var phoneField = this.refs['field-phone'].getDOMNode();
        var number = phoneField.value.replace(/[^\d]/g, '');

        if (number.length < 10) {
            phoneField.focus();
            return alert('Please enter your 10 digit phone number.');
        }

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://dp-call-congress.herokuapp.com/create?callback=k&campaignId=nomorewallstreetinsiders&userPhone=' + number;
        document.body.appendChild(script);

        this.props.changeForm('script');
    },
});

var OptOutForm = React.createClass({displayName: "OptOutForm",
    numbers: {
        'The Office of the Treasury Secretary': '202-622-1100',
        'The Office of the White House Chief of Staff': '202-456-3737',
        'SEC Chair Mary Jo White': '202-551-2100',
        'SEC Commissioner Luis Aguilar': '202-551-2500',
        'SEC Commissioner Daniel Gallagher': '202-551-2600',
        'SEC Commissioner Kara Stein': '202-551-2800',
        'SEC Commissioner Michael Piwowar': '202-551-2700',
        'The Office of the SEC General Counsel': '202-551-5100',
        'The Domestic Policy Council': '202-456-5594',
        'The Office of Public Engagement': '202-456-1097',
        'The Office of the Press Secretary': '202-456-3282',
        'The White House General Counsel': '202-456-2632',
        'The Office of Management and Budget': '202-395-4840',
        'White House Operations': '202-456-2500',
        'The Domestic Policy Council': '202-456-6515',
        'The Office of Administration': '202-456-2861',
        'The Council of Economic Advisers': '202-395-5084',
        // 'The White House Comment Line': '202-456-1111',
    },

    renderNumbers: function() {
        var numbers = [];

        for (var name in this.numbers) {
            var number = this.numbers[name];

            numbers.push(
                React.createElement("div", {className: "number"}, 
                    React.createElement("div", {className: "name"}, 
                         name 
                    ), 

                    React.createElement("div", {className: "phone"}, 
                        React.createElement("a", {href:  'tel:' + number},  number )
                    )
                )
            );
        }

        return numbers;
    },

    render: function() {
        return (
            React.createElement("div", {className: "opt-out-form"}, 
                React.createElement("div", {className: "script"}, 
                    "Tell them: ", React.createElement("span", {className: "suggestion"}, "“It’s outrageous that the White House is considering naming more Wall Street insiders to the SEC. We need tough ‘cops on the beat’ who will enforce the laws on the big banks, not revolving door picks who will let Wall Street off the hook. President Obama must not name a Wall Street insider like Keir Gumbs or Anne Small to the SEC.”")
                ), 

                React.createElement("div", {className: "numbers"}, 
                     this.renderNumbers() 
                )
            )
        );
    },
});

var PhoneScript = React.createClass({displayName: "PhoneScript",
    render: function() {
        return (
            React.createElement("div", {className: "phone-script"}, 
                React.createElement("h2", null, "We’re calling you now"), 

                "We’ll connect you to a key decision-maker at the White House. Don’t hang up after the call. Just press ", React.createElement("strong", null, "* (star)"), " and we’ll connect you with another decision-maker. Each additional call will magnify your impact. Here’s what you can say:", 
                React.createElement("div", {className: "spacer"}), 

                React.createElement("div", {className: "suggestion"}, 
                    "“It’s outrageous that the White House is considering naming more Wall Street insiders to the SEC. We need tough ‘cops on the beat’ who will enforce the laws on the big banks, not revolving door picks who will let Wall Street off the hook. President Obama must not name a Wall Street insider like Keir Gumbs or Anne Small to the SEC.”"
                ), 
                React.createElement("div", {className: "spacer"}), 

                "If you’re able to make more calls after you’re done, you’ll have an even bigger impact. Just press ", React.createElement("strong", null, "* (star)"), " and we’ll connect you with another decision-maker!"
            )
        );
    },
});

var Thanks = React.createClass({displayName: "Thanks",
    render: function() {
        return (
            React.createElement("div", {className: "thanks"}, 
                "Thanks for making your voice heard!", 

                React.createElement("div", {className: "social"}, 
                    React.createElement("div", {className: "facebook"}
                    ), 

                    React.createElement("div", {className: "twitter"}
                    ), 

                    React.createElement("div", {className: "email"}
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
            form = React.createElement(EmailForm, {changeForm:  this.changeForm});
            break;

            case 'phone':
            form = React.createElement(PhoneForm, {changeForm:  this.changeForm, onClickOptOut:  this.onClickOptOut});
            break;

            case 'script':
            form = React.createElement(PhoneScript, null);
            break;

            case 'thanks':
            form = React.createElement(Thanks, null);
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

    changeForm: function(form) {
        if (state.isMobile) {
            var pos = findPos(this.getDOMNode());
            scrollTo(0, pos - 16);
        }

        this.setState({
            form: form,
        });
    },
});

var Organizations = React.createClass({displayName: "Organizations",
    render: function() {
        var organizations = [];
        for (var name in this.organizations) {
            organizations.push(
                React.createElement("a", {href:  this.organizations[name], target: "_blank"}, 
                     name 
                )
            );
        }

        return (
            React.createElement("div", {className: "organizations"}, 
                 organizations 
            )
        );
    },

    organizations: {
        'Demand Progress': 'https://demandprogress.org/',
        'Democracy For America': 'http://democracyforamerica.com/',
        'National People\'s Action': 'http://npa-us.org/',
        'Other 98': 'http://other98.com/',
        'RootsAction': 'http://www.rootsaction.org/',
        'Rootstrikers': 'http://www.rootstrikers.org/',
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

                React.createElement(Organizations, null), 

                React.createElement(Contact, null)
            )
        );
    },

    imagesToPreload: [
        'images/phone.svg',
    ],

    componentDidMount: function() {
        for (var i = 0; i < this.imagesToPreload.length; i++) {
            var image = new Image();
            image.src = this.imagesToPreload[i];
        }
    },
});

React.render(React.createElement(CallPages, null), document.getElementById('app'));
