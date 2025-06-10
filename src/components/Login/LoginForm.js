import React, { useState } from 'react';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isCheating, setIsCheating] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ top: '0', left: '0' });

  // Function to check email and password validity
  const checkCredentials = () => {
    const validEmail = 'test@example.com';
    // const validPassword = '123456';
    const validPassword = 123456;

    if (email !== validEmail || password !== validPassword) {
      setIsCheating(true);
    } else {
      // Reset the button when the correct credentials are entered
      setIsCheating(false);
      setButtonPosition({ top: '0', left: '0' });  // Reset button to initial position
    }
  };

  // Function to move button to random position
  const moveButton = () => {
    if (isCheating) {
      setButtonPosition({
        top: `${Math.random() * 80}%`,
        left: `${Math.random() * 80}%`,
      });
    }
  };

  // Handle form submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isCheating) {
      alert('Login successful!');
    } else {
      alert('Wrong email or password!');
    }
  };

  return (
    <div className="relative flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-6 text-center">Login</h2>
        <form className='' onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 p-2 block w-full border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              onInput={checkCredentials}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 p-2 block w-full border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onInput={checkCredentials}
              required
            />
          </div>

          <button
            type="submit"
            id="loginBtn"
            className={`mt-4 bg-blue-500 text-white px-4 py-2 rounded shadow-md absolute transition-all duration-2000 ease-in-out`}
            style={{ top: buttonPosition.top, left: buttonPosition.left }}
            onMouseOver={moveButton}
          >
            {isCheating ? 'No Cheating 🤔😅' : 'Login'}
          </button>
        </form>
        {isCheating && <p className="text-red-500 mt-4">No cheating!</p>}
      </div>
    </div>
  );
}

export default LoginForm;
