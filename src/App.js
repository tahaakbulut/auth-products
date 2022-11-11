import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/login';
import Home from './pages/home';
import Details from './pages/details';
import LoginGuard from './components/login-guard';

const App = () => (
  <Router>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<LoginGuard />}>
        <Route path="/" element={<Home />} />
        <Route path="/details/:id" element={<Details />} />
      </Route>
    </Routes>
  </Router>
);

export default App;
