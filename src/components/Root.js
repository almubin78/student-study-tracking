import { Outlet} from "react-router-dom";


const Root = () => {
    return (
        <div className="max-w-2xl mx-auto mt-10 p-8 bg-white rounded-lg shadow-lg border border-gray-200">
            <h1 className="text-2xl font-bold mb-4 text-blue-700">যাচাই করা যাক তোমার পড়াশুনার অবস্থা</h1>
          <Outlet/>  
        </div>
    );
};

export default Root;