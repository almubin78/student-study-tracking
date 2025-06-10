import { createBrowserRouter } from "react-router-dom";
import ErrorElement from "../components/ErrorElement";
import Root from "../components/Root";



const router = createBrowserRouter([
    {
        path:'/',
        element:<Root/>,//এই পেজে Outlate সেট করা আছে বিধায় children use করা হয়েছে। 
        children:[
            {

            },
            
        ]
    }
    ,{
        path:'*',
        element:<ErrorElement/>
    }
])

export default router;