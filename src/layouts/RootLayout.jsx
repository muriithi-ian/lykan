import {NavLink, Outlet, useLocation} from 'react-router-dom'
import {BsFillCartPlusFill} from 'react-icons/bs'
import {useSelector} from 'react-redux'
import '../App.css'
import axios from 'axios'
import {useState, useEffect} from 'react'


export default function RootLayout() {
    const location = useLocation()
    const path = location.pathname
    // console.log(path.includes('admin'))
    const cart = useSelector(state => state.products.cart) ?? []
    // console.log(cart)
    const [user, setUser] = useState(null)
     useEffect(() => {
        setUser(window.localStorage.getItem("user"))
        console.log("test1",user)
     }, [user]);

     console.log(user)

    const Logout = ()=>{
         window.localStorage.clear()
         setUser(null)
         axios({
            method: "DELETE",
            url: "http://localhost:3000/signout"
         })
    }

    return (
        <div className='root-layout'>
            {
            ! path.includes('admin') && <header>
                <nav>
                    <NavLink to='/' className="logo"><img src='./images/Llogo.png' alt="Logo"/></NavLink>
                    <div className="filterfield">
                        <input type="text" id="searchInput" placeholder="Search..."/>
                    </div>
                    <div className='thepages'>
                        <NavLink to='/'>Home</NavLink>
                        <NavLink to="products">Shop</NavLink>
                        <NavLink to='cart' id="cart"><span><BsFillCartPlusFill/></span><span>{
                                cart.length
                            }</span>
                        </NavLink>
                       { !user? (<NavLink to='signin'>Login</NavLink>) : (<button type="button" onClick={Logout}>Logout</button>)}
                        <NavLink to="checkoutpage">Checkout</NavLink>
                    </div>

                </nav>
            </header>
        }

            <main>
                <Outlet/>
            </main>
        </div>
    )
}