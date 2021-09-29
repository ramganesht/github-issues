import React from "react";
import { Issue } from "./Issue";

export function Issues(props) {
  const { issues } = props;

  return issues.map((issue) => {
    return <Issue issue={issue} key={issue.id} />;
  });
}
