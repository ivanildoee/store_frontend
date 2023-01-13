import { React, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';

function ProductDetails({putInCart}) {
    const { id, integrate_id } = useParams();
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [Produto, setProduto] = useState({});
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL+"/product/" + integrate_id + "/" + id)
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProduto(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
        
    }, [id,integrate_id])


    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div className="single-product-area clearfix pt-4">
                <div className="container-fluid">

                    <div className="row">
                        <div className="col-12 col-lg-7">
                            <div className="single_product_thumb">
                                <div id="product_details_slider" className="carousel slide" data-ride="carousel">
                                    <ol className="carousel-indicators">
                                        {
                                            Produto.images && Array.isArray(Produto.images) && Produto.images.map((img, index) => (
                                                <li 
                                                    key={index} 
                                                    className={index===0 ?'active':''} 
                                                    data-target="#product_details_slider" 
                                                    data-slide-to={index} 
                                                    style={{ backgroundImage: "url("+img+")" }}>
                                                </li>
                                            ))
                                        }
                                    </ol>
                                    <div className="carousel-inner">
                                        {
                                            Produto.images && Array.isArray(Produto.images) && Produto.images.map((img,index) => (
                                                <div className={index===0 ?'carousel-item active':'carousel-item'} key={index}>
                                                    <a className="gallery_img" href={img} >
                                                        <img className="d-block w-100" src={img} alt="" />
                                                    </a>
                                                </div>
                                            ))
                                        }

                                        {
                                            Produto.images && !Array.isArray(Produto.images) &&  (
                                                <div className="carousel-item active">
                                                    <a className="gallery_img" href={Produto.images} >
                                                        <img className="d-block w-100" src={Produto.images} alt="" />
                                                    </a>
                                                </div>
                                            )
                                        }
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-12 col-lg-5">
                            <div className="single_product_desc">
                                <div className="product-meta-data">
                                    <div className="line"></div>
                                    <p className="product-price">${Produto.price}</p>
                                    <a href="product-details.html">
                                        <h6>{Produto.name}</h6>
                                    </a>
                                </div>

                                <div className="short_overview my-5">
                                    <p>{Produto.description}</p>
                                </div>
                                <div className="cart clearfix">
                                    <div className="cart-btn d-flex mb-50">
                                        <p>Qty</p>
                                        <div className="quantity">
                                            <span className="qty-minus" onClick={()=>setQuantity((quantity-1)>=1?quantity-1: 1)}><i className="fa fa-caret-down" aria-hidden="true"></i></span>
                                            <input type="number" value={quantity} onChange={(e)=>setQuantity(e.target.value)} className="qty-text" id="qty" step="1" min="1" max="300" name="quantity" />
                                            <span className="qty-plus" onClick={()=>setQuantity(quantity+1)}><i className="fa fa-caret-up" aria-hidden="true"></i></span>
                                        </div>
                                    </div>
                                    <button name="addtocart" className="btn amado-btn" onClick={()=>putInCart(Produto,quantity)}>Add to cart</button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default ProductDetails