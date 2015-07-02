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

var Header = React.createClass({
    render: function() {
        return (
            <header>
                <div className="title">
                    Crack Down on Wall Street
                </div>

                <div className="paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
                </div>
            </header>
        );
    },
});

var EmailForm = React.createClass({
    render: function() {
        return (
            <div className="email-form">
                <form onSubmit={ this.onSubmit } ref="form">
                    <input className="name" placeholder="Your name" />
                    <input className="email" placeholder="Email" />
                    <input className="address" placeholder="Street address" />
                    <input className="zip" placeholder="Zip code" />
                    <button>
                        Send Now
                    </button>

                    <div className="hidden">
                        <input type="hidden" name="source" value={ this.getSource() } />
                    </div>
                </form>
            </div>
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

var PhoneForm = React.createClass({
    render: function() {
        return (
            <div className="phone-form">
                <form onSubmit={ this.onSubmit }>
                    <input placeholder="Your Phone Number" id="field-phone" ref="field-phone" class="phone" name="phone" autocomplete="on" pattern="[0-9]*" />
                    <button>
                        Connect
                        <img src="images/phone.svg" />
                    </button>
                </form>

                <div className="privacy">
                    This tool uses <a href="https://www.twilio.com/legal/privacy" target="_blank">Twilio</a>&apos;s APIs.
                    <br />
                    If you prefer not to use our call tool, <a href="#opt-out" onClick={ this.props.onClickOptOut }>click here</a>.
                </div>
            </div>
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

var OptOutForm = React.createClass({
    render: function() {
        return (
            <div className="opt-out-form">
                <div className="script">
                    Tell them: "Lorem ipsum"
                </div>

                <div className="numbers">
                    <div className="number">
                        <div className="name">
                            John Smith
                        </div>

                        <div className="phone">
                            (555) 555-5555
                        </div>
                    </div>

                    <div className="number">
                        <div className="name">
                            John Smith
                        </div>

                        <div className="phone">
                            (555) 555-5555
                        </div>
                    </div>
                </div>
            </div>
        );
    },
});

var Form = React.createClass({
    render: function() {
        var form;
        switch (this.state.form) {
            case 'email':
            form = <EmailForm moveToPhoneForm={ this.moveToPhoneForm } />;
            break;

            case 'phone':
            form = <PhoneForm onClickOptOut={ this.onClickOptOut } />;
            break;

            case 'opt-out':
            form = <OptOutForm />;
            break;
        }

        return (
            <div className="form">
                { form }
            </div>
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

var LogoCloud = React.createClass({
    render: function() {
        return (
            <div className="logos">
                <img src="images/logos/dp.png" />
            </div>
        );
    },
});

var Contact = React.createClass({
    render: function() {
        return (
            <div className="contact">
                For press inquiries, please contact us at:
                <br />
                202-681-7582 or <a href="mailto:press@demandprogress.org">press@demandprogress.org</a>
            </div>
        );
    },
});

var CallPages = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <Header />

                <Form />

                <LogoCloud />

                <Contact />
            </div>
        );
    },
});

React.render(<CallPages />, document.getElementById('app'));
