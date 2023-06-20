import {BrowserRouter,Routes,Route} from 'react-router-dom'
import './App.css';
import SignUp from './Auth/SignUp';
import SignIn from './Auth/SignIn';
import Products from './Auth/Products';
import Menu from './Auth/Menu';
import EmailVerify from './Auth/EmailVerify';
import Cart from './Auth/Cart';
import Dashboard from './Auth/Dashboard';
import ViewProduct from './Auth/ViewProduct';
import ResetPassword from './Auth/ResetPassword';

function App() {
  return (
    <BrowserRouter>
    <Menu/>
      <Routes>
        <Route path='/' element={<SignIn/>}/>
        <Route path='/products' element={<Products/>}/>
        <Route path='/signup' element={<SignUp/>}/>
        <Route path='/emailverify' element={<EmailVerify/>}/> 
        <Route path='/resetPass' element={<ResetPassword/>}/> 
        <Route path='/cart' element={<Cart/>}/> 
        <Route path='/dashboard' element={<Dashboard/>}/> 
        <Route path='/viewproduct/:productId' element={<ViewProduct/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
