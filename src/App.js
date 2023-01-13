import { React, useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Fotter from './components/Fotter';
import Shop from './pages/Shop';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Swal from 'sweetalert2';

export default function App() {
  const [cart, setCart] = useState([]);

  const [price, setPrice] = useState({
    subtotal: 0,
    discount: 0,
    total: 0
  });


  function putInCart(item, quantity = 1) {
    quantity = item && item.quantity ? item.quantity : quantity
    let find_item = cart.find((_item) => { return _item.product.id === item.id && _item.product.integrate_id === item.integrate_id })

    if (find_item) {
      updateCardItem(find_item, quantity)
    } else {
      let price_subtotal = Number(item.price) * quantity;
      let price_discount = item && item.hasDiscount && item.discountValue ? Number(item.discountValue) : 0
      let price_discount_total = price_discount * quantity
      let cart_item = {
        integration_id: item.integrate_id,
        product_id: item.id,
        quantity: quantity,
        price_unit: Number(item.price),
        price_discount: price_discount.toFixed(2),
        price_subtotal: price_subtotal.toFixed(2),
        price_discount_total: price_discount_total.toFixed(2),
        price_total: (price_subtotal - price_discount).toFixed(2),
        product: item
      }
      setCart([...cart, cart_item])
    }

    Swal.fire({ icon: 'success', html: '<strong>' + quantity + ' ' + item.name + '</strong> adicionado no carinho' })
  }

  function updateCardItem(_item, value) {
    let index = cart.indexOf(_item);
    let item = cart[index];
    item.quantity = (item.quantity + value) === 0 ? 1 : item.quantity + value
    item.price_discount_total = item.price_discount * item.quantity
    item.price_subtotal = item.price_unit * item.quantity
    item.price_total = item.price_subtotal - item.price_discount_total
    setCart([...cart])
  }

  function removeCardItem(cartTodelete) {

    Swal.fire({
      title: 'Tens certeza?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sim',
      cancelButtonText: 'Não',
    }).then((result) => {
      if (result.isConfirmed) {

        setCart((cart) =>
          cart.filter((cart_item) => !(cart_item.integration_id === cartTodelete.integration_id && cart_item.product_id === cartTodelete.product_id))
        )
        Swal.fire(
          'Removido!',
          'Produto removido do carinho',
          'success'
        )
      }
    })

  }

  function calculatePriceCart() {
    let subtotal = 0;
    let discount = 0
    cart.forEach(item => {
      subtotal += Number(item.product.price) * Number(item.quantity)
      if (item && item.product && item.product.hasDiscount && item.product.discountValue) discount += Number(item.product.discountValue) * Number(item.quantity)
    });
    setPrice({
      subtotal: subtotal.toFixed(2),
      discount: discount.toFixed(2),
      total: subtotal - discount
    })
  }

  useEffect(() => {
    calculatePriceCart()
  }, [cart])
  return (
    <Router>
      <div className="main-content-wrapper d-flex clearfix">
        <Header sizeCart={cart.length} />
        <Routes>
          <Route path="/" element={<Shop putInCart={putInCart} />} />
          <Route exact path="cart" element={<Cart cart={cart} updateCardItem={updateCardItem} removeCardItem={removeCardItem} price={price} calculatePriceCart={calculatePriceCart} />} />
          <Route exact path="checkout" element={<Checkout price={price} cart={cart} setCart={setCart} />} />
          <Route exact path="product/:integrate_id/:id" element={<ProductDetails putInCart={putInCart} />} />
        </Routes>
      </div>
      <Fotter />
    </Router>
  )
}



