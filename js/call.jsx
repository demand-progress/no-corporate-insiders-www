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

                <form>
                    <input placeholder="Your Phone Number" />
                    <button>Connect</button>
                </form>

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
});

React.render(<CallPages />, document.getElementById('app'));
