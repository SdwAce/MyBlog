import './App.css';
import React, { Component } from "react";
import {Switch, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import AuthService from "./service/auth-service";
import Login from "./component/Login/login.js";
import Register from "./component/Register/register.js";
import Footer from "./component/Footer/footer";
import NavBar from "./component/Header/navbar";
import Personal from "./component/Page/personal"
import Home from "./component/Page/home";
import SinglePostView from "./component/Post/SinglePostView/singlepostview";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);
    this.state = {
      currentUser: undefined
    };
  }

  logOut(){
    AuthService.logout();
  }

  //initialize user
  componentDidMount() {
    const user = AuthService.getUser();
    if (user) {
      this.setState({
        currentUser: user,
      });
    }
  }

  render(){
    return (
         <div className="App">
           <div className="bg" style={{minHeight: '90vh'}}>
             <NavBar />
             <div className="container-ld container-home pt-0">
               <Switch>
                 <Route exact path={["/", "/home"]} component ={Home} />
                 <Route exact path="/login" component={Login} />
                 <Route exact path="/register" component={Register} />
                 <Route exact path="/personal" component={Personal} />
                 <Route exact path="/posts/:id" component={SinglePostView} />
               </Switch>
             </div>
           </div>
           <Footer />
         </div>
    );
  }
}

export default App;