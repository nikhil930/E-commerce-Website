import { Navigate, NavLink } from "react-router-dom";
import { useAuth } from "../../context/auth";
import { useNavigate } from "react-router-dom";

function Menu() {
  // The menu bar that will be displayed over every page
  // hooks

  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();

  const logout = () => {
    setAuth({ ...setAuth, use: null, token: "" });
    localStorage.removeItem("auth");
    navigate("/login");
  };

  return (
    <>
      <div>
        <ul className="nav d-flex justify-content-between shadow-sm mb-2">
          <li className="nav-item">
            <NavLink className="nav-link" aria-current="page" to="/">
              HOME
            </NavLink>
          </li>
          {!auth?.user ? (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  LOGIN
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  REGISTER
                </NavLink>
              </li>
            </>
          ) : (
            <li className="nav-item pointer">
              <a onClick={logout} className="nav-link" to="/register">
                LOGOUT
              </a>
            </li>
          )}
        </ul>
      </div>
    </>
  );
}
export default Menu;
