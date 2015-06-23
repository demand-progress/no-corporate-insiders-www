var CallPages = React.createClass({
    render: function() {
        return (
            <div class="wrapper">
                <div className="title">
                    Crack Down on Wall Street
                </div>

                <div className="paragraph">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit.
                </div>

                <form onSubmit={ this.onSubmit }>
                    <input placeholder="Your Phone Number" id="field-phone" />
                    <button>
                        Connect
                        <img src="images/phone.svg" />
                    </button>
                </form>

                <div className="privacy">
                    This tool uses <a href="https://www.twilio.com/legal/privacy" target="_blank">Twilio</a>&apos;s APIs.
                    <br />
                    If you prefer not to use our call tool, <a href="#open-phone-number-modal">click here</a>.
                </div>

                <div className="logos">
                    <img src="images/logos/dp.png" />
                </div>

                <div className="contact">
                    For press inquiries, please contact us at:
                    <br />
                    202-681-7582 or <a href="mailto:press@demandprogress.org">press@demandprogress.org</a>
                </div>
            </div>
        );
    },

    onSubmit: function(e) {
        console.log(e);
        e.preventDefault();
    },
});

React.render(<CallPages />, document.getElementById('app'));
