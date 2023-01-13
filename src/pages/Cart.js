import { React } from 'react'
import { Link } from 'react-router-dom'

export default function Cart({ cart, updateCardItem, price, removeCardItem }) {


    return (
        <div className="cart-table-area pt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="cart-title">
                            <h2>Carinho de compra</h2>
                        </div>

                        <div className="cart-table clearfix">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th></th>
                                        <th>Nome</th>
                                        <th>Quantidade</th>
                                        <th>Preço Unit.</th>
                                        <th>Desconto Unit.</th>
                                        <th>Preço Total</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        cart.map((item, index) => (
                                            <tr key={index}>
                                                <td style={{ maxWidth: '70px' }}>
                                                    <img src={item.product.images && Array.isArray(item.product.images) ? item.product.images[0] : item.product.images} alt="Product" />
                                                </td>
                                                <td className="cart_product_desc">
                                                    <h5>{item.product.name}</h5>
                                                </td>
                                                <td className="qty">
                                                    <div className="qty-btn d-flex">
                                                        <div className="input-group mb-3" style={{ maxWidth: 120 }}>
                                                            <button className="btn btn-sm btn-light" onClick={() => updateCardItem(item, -1)}><i className="fa fa-minus" aria-hidden="true"></i></button>
                                                            <input type="number" value={item.quantity} onChange={(e) => updateCardItem(item, 0)} className="form-control form-control-sm" id="qty" step="1" min="1" max="300" name="quantity" />
                                                            <button className="btn btn-sm btn-light" onClick={() => updateCardItem(item, 1)}><i className="fa fa-plus" aria-hidden="true"></i></button>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="price">
                                                    <span>${item.price_unit}</span>
                                                </td>

                                                <td className="price">
                                                    <span>${item.price_discount}</span>
                                                </td>

                                                <td className="price_total">
                                                    <span>${item.price_total}</span>
                                                </td>
                                                <td className="action">
                                                    <button className='btn btn-sm btn-danger' onClick={() => removeCardItem(item)}> <i className='fa fa-trash'></i> Remover</button>
                                                </td>
                                            </tr>
                                        ))
                                    }

                                    {
                                        !cart.length && (
                                            <tr>
                                                <td colSpan={7}>
                                                    Nenhum produto adicionado no carinho
                                                </td>
                                            </tr>
                                        )
                                    }

                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4">
                        <div className="cart-summary">
                            <h5>Preço Total do Carinho</h5>
                            <ul className="summary-table">
                                <li><span>Subtotal:</span> <span>${price.subtotal}</span></li>
                                <li><span>Desconto:</span> <span>${price.discount}</span></li>
                                <li><span>Total:</span> <span>${price.total}</span></li>
                            </ul>
                            <div className="cart-btn">
                                <Link to={'/checkout'}>
                                    <span className="btn amado-btn w-100">Checkout</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
