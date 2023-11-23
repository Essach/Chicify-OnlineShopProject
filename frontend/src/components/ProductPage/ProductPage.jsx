import { useParams } from "react-router";
import { useEffect, useRef, useState } from "react";

import request from "../../helpers/request";

import './ProductPage.scss';

import ProductMain from "./subcomponents/ProductMain/ProductMain";
import ProductDescription from "./subcomponents/ProductDescription/ProductDescription";
import ProductBuyForm from "./subcomponents/ProductBuyForm/ProductBuyForm";
import ProductDelivery from "./subcomponents/ProductDelivery/ProductDelivery";
import SimilarProducts from "./subcomponents/SimilarProducts/SimilarProducts";

import star from '../../icons/star.svg';
import halfStar from '../../icons/halfStar.svg';

const ProductPage = () => {
    const { id } = useParams();

    const [productData, setProductData] = useState({
        id: '',
        name: '',
        price: 0,
        delivery: [],
        quantity: 0,
        images: [],
        description: '',
        categories: [],
        reviews: [],
    });

    const [cheapestDeliveryPrice, setCheapestDeliveryPrice] = useState(0);

    const fetchData = async (id) => {
        const { data, status } = await request.get(`/products/${id}`);
        if (status === 200) {
            const productInfo = data.product;
            productInfo.images = productInfo.images.map(image => image.url);
            setProductData(productInfo);
        }
    };

    useEffect(() => {
        fetchData(id);
    }, [id]);

    useEffect(() => {
        if (productData.id) {
            const deliveryPrices = productData.delivery.map(option => option.price);
            setCheapestDeliveryPrice(Math.min(...deliveryPrices));

            if (productData.reviews.length > 0) {
                let rating = 0;
                productData.reviews.forEach(review => {
                    rating += review.rating;
                })
                rating = (rating / productData.reviews.length).toFixed(1);

                let stars = []
                for (let i = 0; i < Math.floor(rating); i++) {
                    stars.concat(star)
                }
                if (Math.round(rating) === rating + 1) {
                    star.concat(halfStar)
                }
            }

        }
    }, [productData])


    const [pageRightStyle, setPageRightStyle] = useState({
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
    });
    const leftRef = useRef();
    const rightRef = useRef();
    const pageRef = useRef();

    const scrollFunc = () => {
        if (leftRef.current && rightRef.current && pageRef.current) {
            if (leftRef.current.getBoundingClientRect().top <= 76) {
                    setPageRightStyle({
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '20px',
                        width: `${pageRef.current.getBoundingClientRect().right - pageRef.current.getBoundingClientRect().left - leftRef.current.offsetWidth - 20}px`,
                        position: 'fixed',
                        top: '76px',
                        left: `${leftRef.current.getBoundingClientRect().right + 20}px`,
                        bottom: '6.5rem',
                    })
            } else {
                setPageRightStyle({
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '20px',
                })
            }
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', scrollFunc);

        return () => {
            window.removeEventListener('scroll', scrollFunc)
        }
    }, [])

    const [windowMode, setWindowMode] = useState('pc');

    const resizeFunc = () => {
        if (window.innerWidth > 1100) {
            setWindowMode('pc')
        } else {
            setWindowMode('mobile')
        }
    }

    const resizeFuncs = () => {
        resizeFunc();
        scrollFunc();
    }

    useEffect(() => {
        resizeFunc()

        window.addEventListener('resize', resizeFuncs);

        return () => {
            window.removeEventListener('resize', resizeFuncs);
        }
    }, [])
    

    return (
        <>
            {windowMode === 'pc' ?
                <product-page ref={pageRef}>
                    <product-page-left ref={leftRef}>
                        <ProductMain name={productData.name} images={productData.images} />
                        <ProductDescription description={productData.description} />
                        <SimilarProducts />
                    </product-page-left>

                    <product-page-right ref={rightRef} style={pageRightStyle}>
                        <ProductBuyForm
                            name={productData.name}
                            price={productData.price}
                            quantity={productData.quantity}
                            reviews={productData.reviews}
                            cheapestDeliveryPrice={cheapestDeliveryPrice}
                            id={id}
                        />
                        <ProductDelivery delivery={productData.delivery} />
                    </product-page-right>
                </product-page>
                :
                <product-page>
                    <ProductMain name={productData.name} images={productData.images} />
                    <ProductBuyForm
                            name={productData.name}
                            price={productData.price}
                            quantity={productData.quantity}
                            reviews={productData.reviews}
                            cheapestDeliveryPrice={cheapestDeliveryPrice}
                            id={id}
                    />
                    <ProductDelivery delivery={productData.delivery} />
                    <ProductDescription description={productData.description} />
                    <SimilarProducts />
                </product-page>
            }
        </>
    );
}

export default ProductPage;