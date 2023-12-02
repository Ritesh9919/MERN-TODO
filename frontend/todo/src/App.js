import {BrowserRouter, Route, Routes} from 'react-router-dom';
import {Register, Login, Todo} from './pages';
import { Navbar } from './components';
import { Provider } from 'react-redux';
import { store } from './redux/store';



function App() {
  return (
    <>
    <Provider store={store}>
      <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path='/' element={<Todo/>}/>
        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
