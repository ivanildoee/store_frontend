import { React, useState } from 'react'
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom'

export default function Checkout({ price, cart, setCart }) {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [address, setAddress] = useState('');
    const [postcode, setPostCode] = useState('');
    const [phone_number, setPhoneNumber] = useState('');

    function register(e) {
        e.preventDefault();
        let data = {
            name: name,
            email: email,
            country: country,
            state: state,
            address: address,
            postcode: postcode,
            phone_number: phone_number,
            city: city,
            sale: {
                price_total: price.total,
                price_subtotal: price.subtotal,
                price_discount: price.discount
            },
            sale_lines: cart
        }        

        fetch(process.env.REACT_APP_API_URL + "/client", {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
            .then(res => res.json())
            .then(
                (result) => {
                    Swal.fire({
                        icon: result.type,
                        text: result.message
                    })
                    setCart([])
                    navigate('/');
                },
                (error) => {
                    Swal.fire({
                        icon: "error",
                        html: error
                    })
                }
            )
    }
    return (
        <div className="cart-table-area pt-5">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-12 col-lg-8">
                        <div className="checkout_details_area clearfix">

                            <div className="cart-title">
                                <h2>Pagamento</h2>
                            </div>

                            <form onSubmit={register}>
                                <div className="row">

                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" value={name} placeholder="Nome Completo" onChange={(e) => setName(e.target.value)} required />
                                    </div>

                                    <div className="col-6 mb-3">
                                        <input type="email" className="form-control" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <input type="text" className="form-control" placeholder="País" value={country} onChange={(e) => setCountry(e.target.value)} required />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <input type="text" className="form-control" placeholder="Estado" value={state} onChange={(e) => setState(e.target.value)} required />
                                    </div>
                                    <div className="col-4 mb-3">
                                        <input type="text" className="form-control" placeholder="Cidade" value={city} onChange={(e) => setCity(e.target.value)} required />
                                    </div>
                                    <div className="col-12 mb-3">
                                        <input type="text" className="form-control mb-3" placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <input type="text" className="form-control" placeholder="Codigo Postal" value={postcode} onChange={(e) => setPostCode(e.target.value)} required />
                                    </div>
                                    <div className="col-md-6 mb-4">
                                        <input type="number" className="form-control" min="0" placeholder="Numero de telefone" value={phone_number} onChange={(e) => setPhoneNumber(e.target.value)} required />
                                    </div>
                                    {
                                        price && price.total > 0 && (
                                            <div className="col-md-4 mb-3">
                                                <div className="cart-btn">
                                                    <button type='submit' block="block" className="btn btn-warning w-100" disabled={price && price.total > 0 ? false : true}>Comprar</button>
                                                </div>
                                            </div>
                                        )
                                    }

                                    {
                                        price && price.total <= 0 && (
                                            <div className="col-md-12 mb-3 text-danger">
                                                **** Deves efetuar uma compra primeiro, ou seja, adicionar um produto no carinho.
                                            </div>
                                        )
                                    }

                                </div>



                            </form>
                        </div>
                    </div>
                    <div className="col-12 col-lg-4" >
                        <div className="cart-summary">
                            <h5>Total no carinho</h5>
                            <ul className="summary-table">
                                <li><span>Subtotal:</span> <span>${price.subtotal}</span></li>
                                <li><span>Desconto:</span> <span>${price.discount}</span></li>
                                <li><span>Total:</span> <span>${price.total}</span></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
