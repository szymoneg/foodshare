import { useEffect, useState } from "react";
import AuthService from "../../services/auth.service";
import { UserModel } from "./models/UserModel";
import mainPageService from "./services/main-page.service";
import { useHistory, withRouter } from 'react-router-dom'
import "./MainPageStyle.css"


const ProfilePage: React.FC<any> = () => {
  const [redirect, setRedirect] = useState('');
  const [userReady, setUserReady] = useState(false);
  const [currentUser, setCurrentUser] = useState<Partial<UserModel>>({});
  const [users, setUsers] = useState<UserModel[] | []>([]);

  let history = useHistory();

  useEffect(() => {
    const currentUser = AuthService.getCurrentUser();

    if (!currentUser) {
      history.push('/login')
      window.location.reload();
    } else {
      getAllUsers(currentUser.token);
      setUserReady(true);
    }
  }, [])

  const getAllUsers = (token: string) => {
    mainPageService.getAllUsers(token).then(
      (response) => {
        response.map((response: UserModel) => {
          setUsers(prevItems => [...prevItems, {
            id: response.id,
            email: response.email,
            isAdmin: response.isAdmin,
            name: response.name,
          }]);
        })
      },
      err => {
        console.log(err);
      }
    );
  }

  const handleLogout = () => {
    history.push('/login')
    AuthService.logout();
  }

  const handleEdit = (id: any) => {
    history.push({
      pathname: `/details/${id}`,
      state: { id: id }
    })
  }

  const handleAdd = () => {
    history.push({
      pathname: "/add"
    })
  }

  return (
    <div>
      {(userReady) ?
        <div>
          <nav className="navbar navbar-light bg-light">
            <span className="navbar-text">
              {currentUser.email}
            </span>
            <div className="btn-group">
              <button className="btn btn-outline-primary" type="submit" onClick={() => handleAdd()}>Dodaj nowego użytkownika!</button>
              <button className="btn btn-outline-success my-2 my-sm-0" type="submit" onClick={() => handleLogout()}>Wyloguj!</button>
            </div>
          </nav>
          <table className="table">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Email</th>
                <th scope="col">Name</th>
                <th scope="col" className="centerColumn">Admin</th>
                <th scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((object) => <tr key={object.id}>
                <th>{object.id}</th>
                <td>{object.email}</td>
                <td>{object.name}</td>
                <td className="centerColumn">{object.isAdmin === true ? <i className="bi bi-check"></i> : <i className="bi bi-x"></i>}</td>
                <td><button className="btn btn-warning" onClick={() => handleEdit(object?.id)}>edytuj</button></td>
              </tr>)}
            </tbody>
          </table>
          <nav aria-label="Page navigation example">
            <ul className="pagination">
              <li className="page-item"><a className="page-link" href="#">Previous</a></li>
              <li className="page-item"><a className="page-link" href="#">1</a></li>
              <li className="page-item"><a className="page-link" href="#">2</a></li>
              <li className="page-item"><a className="page-link" href="#">3</a></li>
              <li className="page-item"><a className="page-link" href="#">Next</a></li>
            </ul>
          </nav>
        </div>
        : null}
    </div>
  )
}

export default withRouter(ProfilePage);
