import { useEffect, useState } from "react";
import icon from "./assets/icon.png";
import pfp from "./assets/pfp.webp";
import startup from "./assets/startup.mp3";

function Login({
  setLoginScreen,
}: {
  setLoginScreen: (bool: boolean) => void;
}) {
  const [loading, setLoading] = useState(false);
  const start = new Audio(startup);
  start.volume = 0.5;

  useEffect(() => {
    if (loading) {
      setTimeout(() => {
        setLoginScreen(false);
        start.play();
      }, 2000);
    }
  }, [loading]);

  return (
    <div className="login-root">
      <div className="login-top">
        <div className="login-container container">
          <div className="row">
            <div className="col-6 pe-3 d-flex justify-content-end login-left">
              <img src={icon} className="login-icon" />

              <p>To begin, click on your user name</p>
            </div>
            <a className="col-6 login-right" onClick={() => setLoading(true)}>
              <div className="d-flex header-row">
                <div className="d-icon">
                  <img className="header-icon" src={pfp} />
                </div>
                <div className="header-info px-4">
                  <h4>Sy</h4>
                  
                </div>
              </div>
              <div className="row-below"></div>
            </a>
          </div>
        </div>
      </div>
      <div className="login-bottom d-flex justify-content-between align-items-center">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="m-0 p-0"> </h1>
        </div>
      </div>
    </div>
  );
}

export default Login;
