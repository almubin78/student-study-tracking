import { Link, Outlet} from "react-router-dom";


const Root = () => {
    return (
        <div className=" mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">যাচাই করা যাক তোমার পড়াশুনার অবস্থা</h1>
            <Link to="/study-test" className="text-blue-500 hover:underline mb-4 inline-block">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Study Test -1
                </button>           
            </Link> 
            <Link to="/study-test2" className="text-blue-500 hover:underline mb-4 inline-block">
                <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                    Study Test -2
                </button>           
            </Link> 
          <Outlet/>  
        </div>
    );
};

export default Root;