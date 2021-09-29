import React from "react";
import { sortUtil } from "../utils";

export function Repo(props) {
  const {
    repo,
    selectedRepo,
    setSelectedRepo,
    authKey,
    setIssues,
    setIssueMessage,
  } = props;
  const date = new Date(repo.updated_at);
  const updatedTimeStamp = `Updated on ${date.toLocaleDateString()}`;

  const getIssues = (repoFullName, id) => {
    setSelectedRepo(repoFullName);
    setIssueMessage("Loading issues...");
    setIssues([]);
    fetch(`https://api.github.com/repos/${repoFullName}/issues`, {
      headers: {
        Authorization: `token ${authKey}`,
        Accept: "application/vnd.github.v3+json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          setIssues([]);
          setIssueMessage("Error loading Issues!");
          throw new Error("API response was not ok!!!");
        }
        return res.json();
      })
      .then((data) => {
        console.log(data);
        setIssueMessage("");
        setIssues(data.sort(sortUtil));
        if (data.length === 0) {
          setIssueMessage("No issues found for this repo!");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setIssueMessage("Error loading Issues!");
        setIssues([]);
      });
  };

  return (
    <div
      className={`app-repo ${
        selectedRepo === repo.full_name ? "app-repo--active" : ""
      }`}
      key={repo.id}
      onClick={(e) => getIssues(repo.full_name, repo.id)}
    >
      <div className="app-repo--header">
        <div className="app-repo--name">{repo.full_name}</div>
        <div className="app-repo--privacy">
          {repo.private ? "Private" : "Public"}
        </div>
      </div>
      <div className="app-repo--detail">
        {repo.description ? (
          <div className="app-repo--description">{repo.description}</div>
        ) : null}
        <div className="app-repo--updated">{updatedTimeStamp}</div>
      </div>
    </div>
  );
}
