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

        if (!globals.isMobile) {
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
            form: 'phone',
        };
    },

    onClickOptOut: function() {
        this.setState({
            form: 'opt-out',
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
