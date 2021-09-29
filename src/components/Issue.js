import React from "react";
import moment from "moment";

export function Issue(props) {
  const { issue } = props;
  const updatedTimeAgo = moment(issue.updated_at).fromNow();
  const createdDateTime = new Date(issue.created_at);
  const createdTime = createdDateTime.toLocaleDateString();

  return (
    <div className={`app-issue`} key={issue.id}>
      {issue.assignee?.avatar_url ? (
        <img src={issue.assignee.avatar_url} alt="" />
      ) : null}
      <div className="app-issue-container">
        <div className="app-issue--header">
          <div className="app-issue--name">{issue.title}</div>
          <div className="app-issue--status">{issue.state}</div>
        </div>
        <div className="app-issue--detail">
          {issue.body ? (
            <div className="app-issue--description">{issue.body}</div>
          ) : null}
          <div className="app-issue--time">{`Created on ${createdTime}`}</div>
          <div className="app-issue--time">{`Updated ${updatedTimeAgo}`}</div>
        </div>
      </div>
    </div>
  );
}
