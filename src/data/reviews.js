import { v4 as uuidv4 } from "uuid";  

const reviewsList = [
  {
    id: uuidv4(),
    reviewer: "Reviewer 1",
    reviewContent: "This is good work will recommend for acceptance",
  },
  {
    id: uuidv4(),
    reviewer: "Reviewer 2",
    reviewContent: "There are some issues in the paper. Please correct them.",
  },
  {
    id: uuidv4(),
    reviewer: "Reviewer 3",
    reviewContent: "This is a good paper. Will recommend for acceptance.",
  },
];

export default reviewsList;
