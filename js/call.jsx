// Check for outdated browsers.
const React = require('react');
const ReactDOM = require('react-dom');

(function() {
    var isIE = /MSIE (\d+)\./.test(navigator.userAgent);
    if (isIE) {
        var version = +isIE[1];
        if (version < 10) {
            alert('Unfortunately your browser, Internet Explorer ' + version + ', is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
        }
    }

    if (/Android 2\.3/.test(navigator.userAgent)) {
        alert('Unfortunately your browser, Android 2.3, is not supported.\nPlease visit the site with a modern browser like Firefox or Chrome.\nThanks!');
    }
})();



var state = {};
state.isMobile = /mobile/i.test(navigator.userAgent);
state.isIE = /trident/i.test(navigator.userAgent);
state.campaign = 'no_more_wall_street_insiders';
state.query = getQueryVariables();



// Setup shortcuts for AJAX.
var ajax = {
    get: function(url, callback) {
        callback = callback || function() {};

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback(xhr.response);
            }
        };
        xhr.open('get', url, true);
        xhr.send();
    },

    post: function(url, formData, callback) {
        callback = callback || function() {};

        var xhr = new XMLHttpRequest();
        xhr.onreadystatechange = function() {
            if (xhr.readyState === 4) {
                callback(xhr.response);
            }
        };
        xhr.open('post', url, true);
        xhr.send(formData);
    },
};



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

function getSource() {
    var source = state.query.source || '';
    return source.toLowerCase();
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

var Header = React.createClass({
    render: function() {
        return (
            <header>
                <div className="title">
                    Tell President Obama: No More Wall Street Insiders at the SEC
                </div>

                <div className="paragraph">
                    The first time President Obama had an opening at the SEC – which oversees Wall Street – he appointed Mary Jo White, who had spent most of her career defending Wall Street.
                    <div className="spacer" />

                    The results have been predictably dire: “get out of jail free” waivers to banks that break the law, repeatedly delaying key rules required by the Dodd-Frank Wall Street reform bill, and deadlocking the SEC with innumerable conflicts of interest.
                    <div className="spacer" />

                    President Obama can’t make this mistake again – and there are two more openings at the SEC. <strong>Sign the petition: Tell President Obama to nominate SEC commissioners who aren’t afraid to be tough on Wall Street criminals.</strong>
                    <div className="spacer" />

                    Then, you can magnify your impact by using our call tool to connect to a key decision-maker in the Obama administration.
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
                    <input className="name" name="name" placeholder="Your name" autoFocus />
                    <input className="email" name="email" placeholder="Email" type="email" />
                    <input className="zip" name="zip" placeholder="Zip code" type="tel" />
                    <button>
                        Send Now
                    </button>
                </form>

                <div className="disclaimer">
                    We do not share your email address without your permission.
                    Demand Progress,
                    Democracy For America,
                    National People’s Action,
                    Other 98,
                    RootsAction, and
                    Rootstrikers
                    may send you updates on this and other important campaigns by email. If at any time you would like to unsubscribe from any of these email lists, you may do so.
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        // var nameField = this.refs.form.querySelector('.name');

        // if (!state.isMobile && !state.isIE) {
        //     nameField.focus();
        // }
    },

    onSubmit: function(e) {
        e.preventDefault();

        var form = this.refs.form;

        var name = form.querySelector('[name="name"]');
        if (!name.value.trim()) {
            name.focus();
            alert('Please enter your name.');
            return;
        }

        var emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        var email = form.querySelector('[name="email"]');
        if (!email.value.trim()) {
            email.focus();
            alert('Please enter your email.');
            return;
        } else if (!emailRegex.test(email.value.trim())) {
            email.focus();
            alert('Please enter a valid email.');
            return;
        }

        var zip = form.querySelector('[name="zip"]');
        if (!zip.value.trim()) {
            zip.focus();
            alert('Please enter your zip.');
            return;
        }

        var data = new FormData();
        data.append('campaign', state.campaign);
        data.append('email', email.value.trim());
        data.append('name', name.value.trim());
        data.append('optedIn', true);
        data.append('source', getSource());
        data.append('userAgent', navigator.userAgent);
        data.append('zip', zip.value.trim());
        ajax.post('https://dp-flexible-signature-db.herokuapp.com/sign', data);

        this.props.changeForm('phone');
    },
});

var PhoneForm = React.createClass({
    render: function() {
        return (
            <div className="phone-form">
                <form onSubmit={ this.onSubmit }>
                    <h2>Thanks – could you also make a call?</h2>

                    <div className="request">
                        We&apos;ll deliver your signature. Now, could you also make a quick phone call? It&apos;s the single most effective action you can take.
                        <br />
                        <br />
                        <strong>Just enter your number – we’ll connect you and give you a script.</strong> It takes just a moment, and will help make sure Wall Street is finally held accountable.
                    </div>

                    <input placeholder="Your Phone Number" id="field-phone" ref="field-phone" className="phone" name="phone" autoComplete="on" pattern="[\d\(\)\-\+ ]*" autoFocus />
                    <button>
                        Get script and call
                        <img src="images/phone.svg" />
                    </button>
                </form>

                <div className="privacy">
                    This tool uses <a href="https://www.twilio.com/legal/privacy" target="_blank">Twilio</a>’s APIs.
                    <br />
                    If you prefer not to use our call tool, <a href="#opt-out" onClick={ this.onClickOptOut }>click here</a>.
                </div>
            </div>
        );
    },

    componentDidMount: function() {
        // var phoneField = this.refs['field-phone'];

        // if (!state.isMobile && !state.isIE) {
        //     phoneField.focus();
        // }
    },

    onSubmit: function(e) {
        e.preventDefault();

        var phoneField = this.refs['field-phone'];
        var number = phoneField.value.replace(/[^\d]/g, '');

        if (number.length !== 10) {
            phoneField.focus();
            return alert('Please enter your 10 digit phone number.');
        }

        var script = document.createElement('script');
        script.async = true;
        script.src = 'https://dp-call-congress.herokuapp.com/create?callback=k&campaignId=nomorewallstreetinsiders&userPhone=' + number + '&source_id=' + getSource();
        document.body.appendChild(script);

        this.props.changeForm('script');
    },

    onClickOptOut: function(e) {
        e.preventDefault();

        this.props.changeForm('opt-out');
    },
});

var OptOutForm = React.createClass({
    numbers: {
        // 'The Office of the Treasury Secretary': '202-622-1100',
        // 'The Office of the White House Chief of Staff': '202-456-3737',
        // 'SEC Chair Mary Jo White': '202-551-2100',
        // 'SEC Commissioner Luis Aguilar': '202-551-2500',
        // 'SEC Commissioner Daniel Gallagher': '202-551-2600',
        // 'SEC Commissioner Kara Stein': '202-551-2800',
        // 'SEC Commissioner Michael Piwowar': '202-551-2700',
        // 'The Office of the SEC General Counsel': '202-551-5100',
        // 'The Domestic Policy Council': '202-456-5594',
        // 'The Office of Public Engagement': '202-456-1097',
        // 'The Office of the Press Secretary': '202-456-3282',
        // 'The White House General Counsel': '202-456-2632',
        // 'The Office of Management and Budget': '202-395-4840',
        // 'White House Operations': '202-456-2500',
        // 'The Domestic Policy Council': '202-456-6515',
        // 'The Office of Administration': '202-456-2861',
        // 'The Council of Economic Advisers': '202-395-5084',
        'The White House Comment Line': '202-456-1111',
    },

    renderNumbers: function() {
        var numbers = [];

        for (var name in this.numbers) {
            var number = this.numbers[name];

            numbers.push(
                <div className="number">
                    <div className="name">
                        { name }
                    </div>

                    <div className="phone">
                        <a href={ 'tel:' + number }>{ number }</a>
                    </div>
                </div>
            );
        }

        return numbers;
    },

    render: function() {
        return (
            <div className="opt-out-form">
                <div className="script">
                    Tell them: <span className="suggestion">“It’s outrageous that the White House is considering naming more Wall Street insiders to the SEC. We need tough ‘cops on the beat’ who will enforce the laws on the big banks, not revolving door picks who will let Wall Street off the hook. President Obama must not name a Wall Street insider like Keir Gumbs or Anne Small to the SEC.”</span>
                </div>

                <div className="numbers">
                    { this.renderNumbers() }
                </div>
            </div>
        );
    },
});

var PhoneScript = React.createClass({
    render: function() {
        return (
            <div className="phone-script">
                <h2>We’re calling you now</h2>

                We’ll connect you to a key decision-maker at the White House. Don’t hang up after the call. Just press <strong>* (star)</strong> and we’ll connect you with another decision-maker. Each additional call will magnify your impact. Here’s what you can say:
                <div className="spacer" />

                <div className="suggestion">
                    “It’s outrageous that the White House is considering naming more Wall Street insiders to the SEC. We need tough ‘cops on the beat’ who will enforce the laws on the big banks, not revolving door picks who will let Wall Street off the hook. President Obama must not name a Wall Street insider like Keir Gumbs or Anne Small to the SEC.”
                </div>
                <div className="spacer" />

                If you’re able to make more calls after you’re done, you’ll have an even bigger impact. Just press <strong>* (star)</strong> and we’ll connect you with another decision-maker!
            </div>
        );
    },
});

var Thanks = React.createClass({
    render: function() {
        return (
            <div className="thanks">
                Thanks for making your voice heard!

                <div className="social">
                    <div className="facebook">
                    </div>

                    <div className="twitter">
                    </div>

                    <div className="email">
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
            form = <EmailForm changeForm={ this.changeForm } />;
            break;

            case 'phone':
            form = <PhoneForm changeForm={ this.changeForm } />;
            break;

            case 'script':
            form = <PhoneScript />;
            break;

            case 'thanks':
            form = <Thanks />;
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
        var form = 'phone';

        if (state.query.call_tool) {
            form = 'phone';
        }

        return {
            form: form,
        };
    },

    changeForm: function(form) {
        this.setState({
            form: form,
        });

        var pos = findPos(this);
        scrollTo(0, pos - 16);
    },
});

var Organizations = React.createClass({
    render: function() {
        var organizations = [];
        for (var name in this.organizations) {
            organizations.push(
                <a
                    href={ this.organizations[name] }
                    target="_blank"
                    key={name}
                >
                    { name }
                </a>
            );
        }

        return (
            <div className="organizations">
                { organizations }
            </div>
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

var Contact = React.createClass({
    render: function() {
        return (
            <div className="contact">
                For press inquiries, please contact us at:
                <br />
                <a href="tel:202-630-0299">202-630-0299</a> or <a href="mailto:press@rootstrikers.org">press@rootstrikers.org</a>
            </div>
        );
    },
});

var CreativeCommons = React.createClass({
    render: function() {
        return (
            <div className="creative-commons">
                Social media photo via <a href="https://www.flickr.com/photos/132084522@N05/17086570218/in/photolist-s2T93f-aCsYXi-oPq1C2-aCtoP8-aCtq3g-aCtqM8-aCw4ZE-aCw5Ay-aCw5iu-aCtqjT-9xMgR-2ixJCg-4Hgjqa-iBNpq-5AJv1X-bxnPa3-4hMTnc-5ppxQp-5ppzf2-5ptSUW-7Msw4U-E5Z87-7onZXi-wsAoC-7881oQ-6yR8Ad-MKW8o-9McFm3-9McFaC-4hRZqU-5tw48Y-5tJZ6J-5tECet-7LmT9N-tV1WT-d5LKYs-eCnroP-rdRMnA-aCtqBx-aCvB1G-aCvAFq-aCsUAr-aCvBTd-aCsTw8-aCvAqd-aCvztu-aCvCBL-aCsV14-aCvEhU-aCvEMh" target="_blank">Sam Valadi</a> under a <a href="https://creativecommons.org/licenses/by/2.0/" target="_blank">CC BY 2.0</a> license.
            </div>
        );
    },
});

var Social = React.createClass({
    render: function() {
        return (
            <div className="social">
                <h2>Share this page!</h2>
                <div className="copy">
                    After making a call, share this page with your friends. The more people that speak out, the better our chance of getting a tough ‘cop on the beat’ on Wall Street.
                </div>
                <div className="buttons">
                    <a onClick={this.onClickFacebook} target="_blank" href="#Share on Facebook" className="facebook">Facebook</a>
                    <a onClick={this.onClickTwitter} target="_blank" href="#Share on Twitter" className="twitter">Twitter</a>
                </div>
            </div>
        );
    },

    onClickTwitter: function(e) {
        e.preventDefault();

        var shareText = document.querySelector('[name="twitter:description"]').content;

        var source = getSource();

        if (source) {
            shareText += '/?source=' + source;
        }

        var url =
            'https://twitter.com/intent/tweet?text=' +
            encodeURIComponent(shareText) +
            '&ref=rootstrikers';

        window.open(url);
    },

    onClickFacebook: function(e) {
        e.preventDefault();

        var url =
            'https://www.facebook.com/sharer.php?u=http://www.nomorewallstreetinsiders.com/';

        var source = getSource();

        if (source) {
            url += '%3Fsource%3D' + source;
        }

        window.open(url);
    },
});

var CallPages = React.createClass({
    render: function() {
        return (
            <div className="wrapper">
                <Header />

                <Form />

                <Social />

                <Organizations />

                <Contact />

                <CreativeCommons />
            </div>
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

ReactDOM.render(
    <CallPages />,
    document.querySelector('#app')
);
