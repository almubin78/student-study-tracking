
import './App.css';
import logo from './logo.svg';
import StudentTimer2 from './components/StudentTimer/StudentTimer2';
function App() {
  return (
    <div className="App">
      <nav>
        <ul className='navbar'>
          <li>Home</li>
          <li>Present</li>
          <li>Absent</li>
          <li>Study</li>
          <li>Make Question</li>
        </ul>
      </nav>

      <div className="bannerPart">
        <div className='leftSide'>
          <img src={logo} className="App-logo" alt="logo" />
        </div>
        {/* <StudentTimer/> */}
        <StudentTimer2/>
      </div>
    </div>
  );
}

export default App;
