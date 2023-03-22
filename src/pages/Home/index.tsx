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
      <li>
        <Link to="/konva">KonvaEditor</Link>
      </li>
      <li>
        <Link to="/workspace">Workspace</Link>
      </li>
    </ul>
  );
}

export default Home;
