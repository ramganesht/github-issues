import React from "react";
import { Repo } from "./Repo";
import { Issues } from "./Issues";
import { sortUtil } from "../utils";

export function Repos(props) {
  const [selectedRepo, setSelectedRepo] = React.useState("");
  const [issueMessage, setIssueMessage] = React.useState("");
  const [sortSelection, setSortSelection] = React.useState(
    sessionStorage.getItem("sortIssue")
      ? sessionStorage.getItem("sortIssue")
      : "updated-asc"
  );
  const [issues, setIssues] = React.useState([]);
  const { repos, authKey } = props;

  const goToRepos = () => setSelectedRepo("");

  const sortHandler = (e) => {
    sessionStorage.setItem("sortIssue", e.target.value);
    setSortSelection(e.target.value);
    setIssues(issues.sort(sortUtil));
  };

  React.useState(() => {
    setIssues(issues.sort(sortUtil));
  }, [sortSelection, issues]);

  return (
    <>
      <div
        className={`app-repo-list ${
          selectedRepo ? "app-issue-list-show" : "app-issue-list-hide"
        }`}
      >
        {repos.map((repo) => {
          return (
            <Repo
              repo={repo}
              key={repo.id}
              selectedRepo={selectedRepo}
              setSelectedRepo={setSelectedRepo}
              setIssueMessage={setIssueMessage}
              authKey={authKey}
              setIssues={setIssues}
            />
          );
        })}
      </div>
      <div className="app-issue-list">
        {issueMessage ? <p>{issueMessage}</p> : null}
        {issues.length ? (
          <>
            <button className="app-issue-list-go-back" onClick={goToRepos}>
              Go to Repos
            </button>
            <h3>{`Issues for ${selectedRepo} (${issues.length})`}</h3>
            <select onChange={sortHandler} value={sortSelection}>
              <option value="updated-asc">Updated (Asc)</option>
              <option value="updated-desc">Updated (Desc)</option>
              <option value="title-asc">Title (Asc)</option>
              <option value="title-desc">Title (Desc)</option>
            </select>
            <Issues issues={issues} />
          </>
        ) : null}
      </div>
    </>
  );
}
