export const getUserCreationDate = (currentUser) => {
  const currentUserCreationTime = currentUser.metadata.creationTime.split(" ");
  const selectedIndices = [1, 2, 3];
  const userCreationDateArray = selectedIndices.map((index) => {
    if (index === 2) {
      if (currentUserCreationTime[index] === "Jan") {
        return "01";
      }
      if (currentUserCreationTime[index] === "Feb") {
        return "02";
      }
      if (currentUserCreationTime[index] === "Mar") {
        return "03";
      }
      if (currentUserCreationTime[index] === "Apr") {
        return "04";
      }
      if (currentUserCreationTime[index] === "May") {
        return "05";
      }
      if (currentUserCreationTime[index] === "Jun") {
        return "06";
      }
      if (currentUserCreationTime[index] === "Jul") {
        return "07";
      }
      if (currentUserCreationTime[index] === "Aug") {
        return "08";
      }
      if (currentUserCreationTime[index] === "Sep") {
        return "09";
      }
      if (currentUserCreationTime[index] === "Oct") {
        return "10";
      }
      if (currentUserCreationTime[index] === "Nov") {
        return "11";
      }
      if (currentUserCreationTime[index] === "Dec") {
        return "12";
      } else {
        return "";
      }
    } else {
      return currentUserCreationTime[index];
    }
  });
  const userCreationDate = userCreationDateArray.join(".");
  return userCreationDate;
};
