export const sortUtil = (a, b) => {
  const sortCriteria = sessionStorage.getItem("sortIssue")
    ? sessionStorage.getItem("sortIssue")
    : "updated-asc";
  if (sortCriteria === "updated-asc") {
    return new Date(b.updated_at) - new Date(a.updated_at);
  } else if (sortCriteria === "updated-desc") {
    return new Date(a.updated_at) - new Date(b.updated_at);
  } else if (sortCriteria === "title-asc") {
    if (a.title < b.title) {
      return -1;
    }
    if (a.title > b.title) {
      return 1;
    }
    return 0;
  } else if (sortCriteria === "title-desc") {
    if (b.title < a.title) {
      return -1;
    }
    if (b.title > a.title) {
      return 1;
    }
    return 0;
  }
};
