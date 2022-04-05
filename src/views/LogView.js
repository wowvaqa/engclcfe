import { useRef, useState, useEffect } from "react";
// import AuthContext from "../context/AuthProvider";
import { useGlobalContext } from "../Context";
import { useCookies } from "react-cookie";

import axios from "axios";
import { Button, Container, Form } from "react-bootstrap";
const LOGIN_URL = "/auth";

const LogView = () => {
  // const { auth, setAuth } = useContext(AuthContext);
  const { setAuth, setIsLogged } = useGlobalContext();
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("test11@test.pl");
  const [pwd, setPwd] = useState("test11");
  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);
  const [cookies, setCookie] = useCookies(["member"]);

  function createCookie(userName, token) {
    setCookie("member", userName, {
      path: "/",
    });
    setCookie("token", token, {
      path: "/",
    });
    console.log("Utworzono cookie: " + cookies);
  }

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login: " + LOGIN_URL);

    try {
      // const response = await axios.post(
      //   "https://django-civil-85.herokuapp.com/api/users/login",
      //   JSON.stringify({ user, pwd }),
      //   {
      //     headers: { "Content-Type": "application/json" },
      //     withCredentials: true,
      //   }
      // );
      const response = await axios.post(
        "https://django-civil-85.herokuapp.com/api/users/login",
        {
          username: user,
          password: pwd,
        }
      );

      console.log(JSON.stringify(response?.data));
      //console.log(JSON.stringify(response));
      const accessToken = response?.data?.token;
      //const roles = response?.data?.roles;
      setAuth({ user, pwd, accessToken });
      createCookie(user, accessToken);
      setIsLogged(true);
      setUser("");
      setPwd("");
      setSuccess(true);
    } catch (err) {
      if (!err?.response) {
        console.log("err: " + err);
        console.log("err.response: " + err.response);
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username or Password");
      } else if (err.response?.status === 401) {
        setErrMsg("Unauthorized");
      } else {
        setErrMsg("Login Failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <Container>
          <h1>You are logged in!</h1>
          <br />
          <p>
            <a href="/">Go to Home</a>
          </p>
        </Container>
      ) : (
        <Container>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>
          <h1>Sign In</h1>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                placeholder="Enter username"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setPwd(e.target.value)}
                value={pwd}
                required
                placeholder="Password"
              />
            </Form.Group>

            <Button
              variant="primary"
              type="submit"
              onClick={(e) => handleSubmit(e)}
            >
              Submit
            </Button>
          </Form>
          <br />
          <p>
            Need an Account?
            <br />
            {/*put router link here*/}
            <a href="/register">Sign Up</a>
          </p>
        </Container>
      )}
    </>
  );
};

export default LogView;
