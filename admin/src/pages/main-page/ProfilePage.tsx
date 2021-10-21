import { Component, useState } from "react";
import { Redirect } from "react-router-dom";
import AuthService from "../../services/auth.service";
import { UserModel } from "./models/UserModel";
import mainPageService from "./services/main-page.service";
import { useHistory } from 'react-router-dom'

type Props = {};

type State = {
  redirect: string | null;
  userReady: boolean;
  currentUser: UserModel & { token: string };
}

// function ProfilePage(){
//   const [redirect, setRedirect] = useState('');
//   const [userReady, setUserReady] = useState(false);


//   return(
//     <></>
//   )
// }

// export default ProfilePage;


export default class ProfilePage extends Component<Props, State>{
  constructor(props: Props) {
    super(props);

    this.state = {
      redirect: null,
      userReady: false,
      currentUser: { token: "" },
    };
  }

  componentDidMount() {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser || currentUser.isAdmin === 'false') {
      this.setState({ redirect: "/login" });
    }

    mainPageService.getAllUsers(currentUser.token).then(
      (response)=>{
        console.log(response[0]);
      },
      err => {
        console.log(err);
      }
    );

    this.setState({
      currentUser: currentUser,
      userReady: true
    })
  }

  handleLogout() {
    AuthService.logout();
    window.location.reload();
    this.setState({ redirect: "/login" });
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to={this.state.redirect} />
    }

    const { currentUser } = this.state;

    return (
      <div>
        {(this.state.userReady) ?
          <div>
            <nav className="navbar navbar-light bg-light">
              <span className="navbar-text">
                {currentUser.email}
              </span>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => this.handleLogout()}>Wyloguj!</button>
            </nav>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">12</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
              </tbody>
            </table>
          </div>
          : null}
      </div>
    );
  }
}