
import './App.css';
// import LoginForm from './components/Login/LoginForm';
// import logo from './logo.svg';
import StudentTimer2 from './components/StudentTimer/StudentTimer2';
import AnimatedText from './ExploringThings/AnimatedText';
// import StudentTimer3 from './components/StudentTimer/StudentTimer3';
// import Explore1 from './ExploringThings/Explore1';
function App() {
  return (
    <div className="App">
      <nav className='mb-9'>
        <ul className='navbar'>
          <li><a href="/">Home</a></li>
          <li><a href="/registration">Registration</a></li>
          {/* 
          <li>Absent</li>
          <li>Study</li>
          <li>Make Question</li> */}
        </ul>
      </nav>

      {/*          
          
          */}


      <div className="bannerPart">
        <div className='leftSide'>
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
        </div>
        {/* <StudentTimer/> */}
        <StudentTimer2 />
        {/* <StudentTimer3 /> */}
        {/* <Explore1 /> */}
        {/* <LoginForm/> */}
      </div>
      <div className="flex items-center justify-center h-screen bg-gray-100 overflow-hidden">
        <AnimatedText text="Follow Me!" />
      </div>
    </div>
  );
}

export default App;
