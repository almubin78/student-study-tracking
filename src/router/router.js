import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../components/ErrorElement";
import Root from "../components/Root";
import StudentTimer2 from "../components/StudyTestRelated/StudentTimer2";
import StudyTestHome from "../components/StudyTestRelated/StudyTestHome";
// import StudyTestHome55 from "../components/StudyTestRelated/StudyTestHome55";
import StudyTestHome1 from "../components/StudyTestRelated/StudyTestHome1";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />, //এই পেজে Outlate সেট করা আছে বিধায় children use করা হয়েছে।
    // children: [
    //   {
    //     path: "/study-test",
    //     element: <StudentTimer2/>,
    //   },
    //   {
    //     path: "/study-test2",
    //     element: <StudyTestHome/>,
    //   },
    //   {
    //     path: "/study-test1",
    //     element: <StudyTestHome1/>,
    //   },
    // ],
  },
  {
    path: "*",
    element: <ErrorElement />,
  },
]);

export default router;
