import React, { useState, Component } from 'react';
import { useHistory } from "react-router-dom";
import ReactDOM from "react-dom";
import { BrowserRouter, Redirect } from "react-router-dom";
import App from "./App";

// import MeetingsList from "./components/Meetings-list.component";
function Login(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const history = useHistory();

    const handleLogin = () => {
        if (username === "nithin" && password === "password") {
            let path = `/`; 
            history.push(path);
        }
        else {
            return;
        }
    }

    return (
        <div class="container">
            Login<br /><br />

            Username<br />
            <input type="text" onChange={(event) => setUsername(event.target.value)} />


             Password<br />
            <input type="password" onChange={(event) => setPassword(event.target.value)} />

            <div>
                <input type="button" value={loading ? 'Loading...' : 'Login'} onClick={handleLogin} /><br />
            </div>
        </div>

    );
}

//const useFormInput = initialValue => {
//  const [value, setValue] = useState(initialValue);
//
//  const handleChange = e => {
//    setValue(e.target.value);
//  }
//  return {
//    value,
//    onChange: handleChange
//  }
//}

export default Login;
// export default class AddMeeting extends Component {
// constructor(props) {
//    super(props);
//  this.handleLogin=this.handleLogin.bind(this);
//    this.onChangepass=this.onChangepass.bind(this);
//    this.onChangeuname=this.onChangeuname.bind(this);
//    this.state = {
//          username:"",
//          password:""
//        };
//      }
//  onChangepass(e){
//        this.setState({
//          password: e.target.value
//        });
//  };
//  onChangeuname(e){
//        this.setState({
//          username: e.target.value
//        });
//  }
// handleLogin(e){

//  <Route exact path="/meetings" component={MeetingsList} />
// }
//      render() {

//          return (
//           <div class="container">
//                  Cerner Login<br /><br />

//                   Username<br />
//                   <input type="text"  value={this.state.username} onChange={this.onChangeuname} />


//                   Password<br />
//                   <input type="password" value={this.state.password} onChange={this.onChangepass}/>

//                 <div>

//                 <input type="button"  onClick={this.handleLogin}  /><br />
//            </div>
//           </div>
//          )

// }
// }