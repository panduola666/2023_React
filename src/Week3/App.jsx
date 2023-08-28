import { HashRouter, Route, Routes } from 'react-router-dom';
import 'https://cdn.jsdelivr.net/npm/bootstrap@5.1.1/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/scss/bootstrap.scss';
import Login from "./Login";
import SignUp from './SignUp';
import Todo from './Todo';

function App() {
  return (
    <>
    <HashRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </HashRouter>
    
      {/* <HashRouter>
        <NavLink to='/login'>
          <p>登入</p>
        </NavLink>
        <NavLink to='/todo'>
          <p>登入</p>
        </NavLink>
      </HashRouter> */}
      
    </>
  );
}

export default App;
