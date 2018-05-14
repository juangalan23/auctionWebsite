import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Button from 'material-ui/Button';
import AppBar from './components/AppBar.jsx';
import LogIn from './components/LogIn.jsx';
import ItemCard from './components/Item.jsx';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            authenticated: false,
            userInfo: {}
        }
        this.retrieveAllItems = this.retrieveAllItems.bind(this);
        this.submitNewBid = this.submitNewBid.bind(this);
        this.verifyUser = this.verifyUser.bind(this);
        this.logout = this.logout.bind(this);
    }
    componentDidMount() {
        this.retrieveAllItems()
        if( typeof(localStorage.getItem('auth')) ==='string' ) {
            this.setState({
                authenticated: true,
                userInfo: JSON.parse(localStorage.getItem('auth'))
            })
        }
    }
    retrieveAllItems() {
        axios.get('/allItems')
        .then((data)=> {
            this.setState({
                items: data.data
            }, ()=>{
                console.log('new state ', this.state)
            })
        })
    }
    submitNewBid(newBid) {
        axios.post('/newBid', newBid)
        .then((res) => {
            this.retrieveAllItems()
        })
    }
    verifyUser (username, password, e) {
        e.preventDefault()
        let userInfo = {username: username, password: password}
        if(username && password) {
        axios.post( '/verifyUser', userInfo)
        .then((res)=>{
            if(!res.data) {
                alert('incorrect credentials!')
            }
            else {
                localStorage.setItem('auth', JSON.stringify(res.data))
                this.setState({
                    authenticated: true,
                    userInfo: res.data
                })
            }
        })
        } else {
            alert('please enter valid username and password')
        }
    }
    logout() {
        localStorage.removeItem('auth')
        this.setState({
            authenticated: false,
            userInfo: {}
        })
    }

    render() {
        return (
            <div>
                <AppBar 
                    authenticated={this.state.authenticated}
                    logout={this.logout}
                />
                <div style={{width:'600px',margin:'auto'}}>
                {!this.state.authenticated ?
                    <div style={{margin: '100px'}}>
                        <LogIn 
                            verifyUser={this.verifyUser}
                        /> 
                    </div>
                    : 
                    this.state.items ? 
                        this.state.items.map((item,i) => {
                            return <ItemCard 
                                    key={item._id} 
                                    item={item} 
                                    userInfo={this.state.userInfo}
                                    submitNewBid={this.submitNewBid}   
                                    />
                        }) : <div></div>}
                    </div>
            </div>

        )
    }
}

export default App;