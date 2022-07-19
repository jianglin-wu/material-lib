import { Link } from 'react-router-dom';
function Home() {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/todo">Todo</Link>
      </li>
      <li>
        <Link to="/form">Form</Link>
      </li>
    </ul>
  );
}

export default Home;
