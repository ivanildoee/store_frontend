import { React } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from "../img/logo3.png";

export default function Header({ sizeCart }) {
    const location = useLocation();
    const homeLink = location.pathname === "/" || location.pathname === "" ? "active" : "";
    const cartLink = location.pathname === '/cart' ? "active" : "";
    const checkoutLink = location.pathname === '/checkout' ? "active" : "";
    return (
        <header className="header-area clearfix">
            <div className="nav-close">
                <i className="fa fa-close" aria-hidden="true"></i>
            </div>
            <div className="logo">
                <img src={logo} alt="" />
            </div>
            <nav className="amado-nav">
                <ul>
                    <li className={homeLink}><Link to='/'><i className='fa fa-home'></i> Loja</Link></li>
                    <li className={cartLink}><Link to='/cart'><i className='fa fa-cart-plus'></i> Carinho <span className='badge badge-danger'>{sizeCart}</span></Link></li>
                    <li className={checkoutLink}><Link to='/checkout'><i className='fa fa-cc-visa'></i> Pagamento</Link></li>
                </ul>
            </nav>
        </header>
    )
}
