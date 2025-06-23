import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../components/ErrorElement";
import Root from "../components/Root";
import StudentTimer2 from "../components/StudyTestRelated/StudentTimer/StudentTimer2";
import StudyTestHome from "../components/StudyTestRelated/StudentTimer/StudyTestHome";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, //এই পেজে Outlate সেট করা আছে বিধায় children use করা হয়েছে।
    children: [
      {
        path: "/study-test",
        element: <StudentTimer2/>,
      },
      {
        path: "/study-test2",
        element: <StudyTestHome/>,
      },
    ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

export default router;
