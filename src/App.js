import './App.css';
import {useState} from "react";

function App() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();

    fetch('/api/authenticate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            setError(data.error);
          } else {
            console.log('Authenticated!');
          }
        })
        .catch((error) => {
          setError('Error authenticating. Please try again.');
        });
  };

  return (
      <form onSubmit={handleSubmit} className="app">
        <h2>Authentication Form</h2>
        <label>
          Email:
          <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <br />
        {error && <div>{error}</div>}
        <button type="submit">Login</button>
      </form>
  );
}

export default App;
