import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Welcome from './pages/Welcome'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import Admin from './pages/Admin'
import Customer from './pages/Customer'
import AddProduct from './pages/crudPages/AddProduct'
import UpdateProduct from './pages/crudPages/UpdateProduct'
import ViewCart from './pages/customerCart/ViewCart'
import UserProfile from './pages/UserProfile'
import ProductReviews from "./pages/viewReviews/productReviews";
import FeedbackForm from './pages/viewReviews/FeedbackForm';
import AllReviews from './pages/viewReviews/AllReviews';
import Checkout from './pages/order/Checkout'
import OrderTracking from './pages/order/OrderTracking';
import OrderHistory from './pages/order/OrderHistory';
import OrderLists from './pages/order/OrderLists'
import ManageOrders from './pages/order/ManageOrders'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element = {<Welcome/>}/>
        <Route path='/sign_in_page' element = {<Signin />} />
        <Route path='/sign_up_page' element = {<Signup />} />
        <Route path='/admin_page' element={<Admin/>}/>
        <Route path='/customer_page' element={<Customer/>}/>
        <Route path='/add_product_page' element={<AddProduct/>}/>
        <Route path='/update_product_page' element={<UpdateProduct/>}/>
        <Route path='/delete_product_page' element={<AddProduct/>}/>
        <Route path='/search_product_page' element={<AddProduct/>}/>
        <Route path='/view_cart_page' element={<ViewCart/>}/>
        <Route path='/user_profile_page' element={<UserProfile/>}/>
        <Route path="/product/:id/reviews" element={<ProductReviews />} />
        <Route path="/review/:id" element={<FeedbackForm />} />
        <Route path='/all_reviews_page' element={<AllReviews/>}/>
        <Route path='/order_page' element={<Checkout/>}/>
        <Route path='/order_tracking_page' element={<OrderTracking/>}/>
        <Route path='/order_history_page' element={<OrderHistory/>}/>
        <Route path='/order_lists_page' element={<OrderLists/>}/>
        <Route path='/order_manager_page' element={<ManageOrders/>}/>
      </Routes>
    </BrowserRouter>
  )
}
export default App
