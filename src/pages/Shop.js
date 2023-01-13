import { React, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
export default function Shop({ putInCart }) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [items, setProdutos] = useState([]);
    const [search, setSearch] = useState('');
    const [isSearch, setIsSearch] = useState(false);



    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + "/product/")
            .then(res => res.json())
            .then(
                (result) => {
                    setIsLoaded(true);
                    setProdutos(result);
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                }
            )
    }, [])

    function onSearch() {
        setIsSearch(true);
        fetch(process.env.REACT_APP_API_URL + '/product?search=' + encodeURIComponent(search))
            .then(res => res.json())
            .then(
                (result) => {
                    setIsSearch(false);
                    setProdutos(result);
                },
                (error) => {
                    setIsSearch(false);
                    setError(error);
                }
            )
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return (
            <div className="amado_product_area pt-4">
                <div className="container-fluid">
                    <div className="row pb-2">
                        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                            <div className="input-group mb-3">
                                <input type="text" value={search} className="form-control" placeholder='Procurar ou filtrar por produtos' onChange={(e) => setSearch(e.target.value)} />
                                <div className="input-group-prepend">
                                    <button className='btn btn-secondary' onClick={onSearch}><i className='fa fa-search'></i></button>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-xl-12">
                            Carregando Dados...
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (isSearch) {
        return (
            <div className="amado_product_area pt-4">
                <div className="container-fluid">
                    <div className="row pb-2">
                        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                            <div className="input-group mb-3">
                                <input type="text" value={search} className="form-control" placeholder='Procurar ou filtrar por produtos' onChange={(e) => setSearch(e.target.value)} />
                                <div className="input-group-prepend">
                                    <button className='btn btn-secondary' onClick={onSearch}><i className='fa fa-search'></i></button>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-xl-12">
                            Procurando por {search}...
                        </div>
                    </div>
                </div>
            </div>
        )
    } else if (!items.length) {
        return (
            <div className="amado_product_area pt-4">
                <div className="container-fluid">
                    <div className="row pb-2">
                        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                            <div className="input-group mb-3">
                                <input type="text" value={search} className="form-control" placeholder='Procurar ou filtrar por produtos' onChange={(e) => setSearch(e.target.value)} />
                                <div className="input-group-prepend">
                                    <button className='btn btn-secondary' onClick={onSearch}><i className='fa fa-search'></i></button>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-sm-12 col-md-12 col-xl-12">
                            Produtos não encontrados
                        </div>
                    </div>
                </div>
            </div>
        )
    } else {
        return (
            <div className="amado_product_area pt-4">
                <div className="container-fluid">
                    <div className="row pb-2">
                        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                            <div className="input-group mb-3">
                                <input type="text" value={search} className="form-control" placeholder='Procurar ou filtrar por produtos' onChange={(e) => setSearch(e.target.value)} />
                                <div className="input-group-prepend">
                                    <button className='btn btn-secondary' onClick={onSearch}><i className='fa fa-search'></i></button>
                                </div>

                            </div>
                        </div>
                        <div className="col-12 col-sm-6 col-md-12 col-xl-6">
                            <nav aria-label="navigation">
                                <ul className="pagination justify-content-end">
                                    <li className="page-item active"><span className="page-link">01.</span></li>
                                    <li className="page-item"><span className="page-link">02.</span></li>
                                    <li className="page-item"><span className="page-link">03.</span></li>
                                    <li className="page-item"><span className="page-link">04.</span></li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                    <div className="row">

                        {
                            items.map(item => (
                                <div className="col-12 col-sm-3 col-md-12 col-xl-3" key={item.provider_id + '' + item.id}>
                                    <div className="single-product-wrapper">
                                        <div className="product-img">

                                            <img src={item.images && Array.isArray(item.images) ? item.images[0] : item.images} alt="" />
                                        </div>
                                        <div className="product-description d-flex align-items-center justify-content-between">
                                            <Link to={'/product/' + item.integrate_id + '/' + item.id}>
                                                <div className="product-meta-data">
                                                    <div className="line"></div>
                                                    <p className="product-price">
                                                        {
                                                            item && item.hasDiscount && (
                                                                <span className="product-price-discount">
                                                                    ${item.price}
                                                                </span>
                                                            )
                                                        }

                                                        ${item && item.price && item.hasDiscount && item.discountValue ? Number(item.price)-Number(item.discountValue) : item.price}
                                                    </p>
                                                    <h6>{item.name}</h6>
                                                </div>
                                            </Link>
                                            <div className="ratings-cart text-right">
                                                <div className="cart" onClick={() => putInCart(item)}>
                                                    <span data-toggle="tooltip" data-placement="left" title="Add to Cart"><img src="img/core-img/cart.png" alt="" /></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        }


                    </div>
                </div>
            </div>
        )
    }
}
