import * as React from "react";
import { Repos } from "./components/Repos";
import "./styles.css";

function App() {
  const [key, setKey] = React.useState("");
  const [repos, setRepos] = React.useState([]);
  const [errorMsg, setErrorMsg] = React.useState("");

  const changeHandler = (e) => {
    setKey(e.target.value);
    setRepos([]);
    setErrorMsg("");
  };

  const getRepos = () => {
    console.log(key);
    if (key) {
      fetch("https://api.github.com/user/repos", {
        headers: {
          Authorization: `token ${key}`,
          Accept: "application/vnd.github.v3+json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            setRepos([]);
            setErrorMsg("Enter a valid API key.");
            throw new Error("API response was not ok!!!");
          }
          return res.json();
        })
        .then((data) => {
          setErrorMsg("");
          setRepos(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          setErrorMsg("Enter a valid API key.");
          setRepos([]);
        });
    }
  };

  return (
    <div>
      <div className="app-repo-form">
        <div>
          <label>Enter GH API key: </label>
          <input
            type="text"
            value={key}
            onChange={changeHandler}
            placeholder="Enter API key and press Get Repos"
          />
        </div>
        <button onClick={getRepos}>Get Repos</button>
      </div>
      {errorMsg && <div style={{ color: "red" }}>{errorMsg}</div>}
      {repos.length > 0 ? (
        <>
          <h3>{`Repos for ${key} (${repos.length})`}</h3>

          <div className="app-repo-repos">
            <Repos repos={repos} authKey={key} />
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
