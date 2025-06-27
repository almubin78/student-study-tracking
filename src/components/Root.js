import { Link, Outlet } from "react-router-dom";
import StudyTestHome1 from "./StudyTestRelated/StudyTestHome1";

const Root = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-gray-100 p-6">
      {/* Main Content Container */}
      <div className="max-w-4xl mx-auto">
        {/* Header Section */}
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-blue-800 mb-4">
            শিক্ষার্থীদের পড়াশোনা মূল্যায়ন সিস্টেম
          </h1>
          <p className="text-xl text-gray-600">
            আপনার পড়াশোনার অগ্রগতি যাচাই করুন আমাদের ইন্টারেক্টিভ টেস্ট সিরিজের মাধ্যমে
          </p>
        </header>
      <StudyTestHome1/>
        {/* Test Selection Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {/* Test 1 Card */}
          {/* <Link 
            to="/study-test" 
            className="group transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
              <div className="bg-blue-600 p-4">
                <h2 className="text-2xl font-bold text-white">স্টাডি টেস্ট - ১</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  প্রাথমিক স্তরের শিক্ষার্থীদের জন্য বেসিক মূল্যায়ন টেস্ট
                </p>
                <div className="flex justify-center">
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 group-hover:bg-blue-700">
                    শুরু করুন
                  </button>
                </div>
              </div>
            </div>
          </Link> */}

          {/* Test 2 Card */}
          {/* <Link 
            to="/study-test2" 
            className="group transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
              <div className="bg-blue-800 p-4">
                <h2 className="text-2xl font-bold text-white">স্টাডি টেস্ট - ২</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  উন্নত স্তরের শিক্ষার্থীদের জন্য অ্যাডভান্সড মূল্যায়ন টেস্ট
                </p>
                <div className="flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 group-hover:bg-blue-800">
                    শুরু করুন
                  </button>
                </div>
              </div>
            </div>
          </Link> */}
          {/* <Link 
            to="/study-test1" 
            className="group transform transition-all hover:scale-105 hover:shadow-xl"
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-blue-100">
              <div className="bg-blue-800 p-4">
                <h2 className="text-2xl font-bold text-white">স্টাডি টেস্ট</h2>
              </div>
              <div className="p-6">
                <p className="text-gray-700 mb-4">
                  অ্যাডভান্সড মূল্যায়ন টেস্ট
                </p>
                <div className="flex justify-center">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-300 group-hover:bg-blue-800">
                    শুরু করুন
                  </button>
                </div>
              </div>
            </div>
          </Link> */}
        </div>

       

        {/* Outlet for nested routes */}
        {/* <div className="bg-white rounded-xl shadow-md p-6 border border-gray-200">
          <Outlet />
        </div> */}
         {/* Additional Information */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8 border border-gray-200">
          <h3 className="text-xl font-semibold text-blue-700 mb-3">টেস্ট সম্পর্কে নির্দেশনা</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              প্রতিটি টেস্টে নির্দিষ্ট সময় বরাদ্দ থাকবে
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              প্রশ্নের উত্তর দেওয়ার পর পরবর্তী প্রশ্নে যেতে পারবেন
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              টেস্ট শেষে সম্পূর্ণ রিপোর্ট দেখতে পারবেন
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Root;