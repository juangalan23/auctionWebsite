import React from 'react';


class LogIn extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userNameText: '',
            passwordText: ''
        }
        this.handleUserTextChange = this.handleUserTextChange.bind(this);
        this.handlePasswordTextChange = this.handlePasswordTextChange.bind(this)
    }
    handleUserTextChange(e) {
        this.setState({
            userNameText: e.target.value
        })
    }
    handlePasswordTextChange(e) {
        this.setState({
            passwordText: e.target.value
        })
    }
    render() {
        return (
            <div> 
                <form onSubmit={(e)=> this.props.verifyUser(this.state.userNameText, this.state.passwordText, e)} >  
                    <div>
                        <label>Username </label>
                        <input type="text" value={this.state.userNameText} onChange={(e) => this.handleUserTextChange(e)} />
                    </div>
                    <div>
                        <label>Password </label>
                        <input type="password" value={this.state.passwordText} onChange={(e)=>this.handlePasswordTextChange(e)}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>

            </div>
        )
    }
}

export default LogIn