// LOGIN FORM
import React, { Component } from 'react';


class Signin extends Component {

    constructor(props, context) {
        super(props, context);

        this.state = { description: '' };
    }

    onChange(e) {
        console.log("ONCHANGE | this | e.target | name and value");
        console.log(this);
        console.log(e.target);
        console.log(e.target.name);
        console.log(e.target.value);
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        console.log(e.target)

        // fetch(this.props.formAction, {
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({description: this.state.description})
        // });

        this.setState({description: ''});
    }

    render() {
        return (
            <div className="App">
                <form
                    id="main-login"
                    action={this.props.formAction}
                    method={this.props.method}
                    onSubmit={this.onSubmit}>
                    <h2>Admin UI Login</h2>
                    <label>
                        <span class="text">user:</span>
                        <input type="email" name="email" /><br />
                    </label>
                    <br />
                    <label>
                        <span class="text">password:</span>
                        <input type="password" name="password" /><br />
                    </label>
                    <br />
                    <div class="align-right">
                        <button>Submit</button>
                    </div>
                </form>
            </div>
        );
    }

}

// Signin.propTypes = { action: React.PropTypes.string.isRequired, method: React.PropTypes.string}
Signin.defaultProps = {
    action: '/barfoo',
    method: 'post'
};

export default Signin;
