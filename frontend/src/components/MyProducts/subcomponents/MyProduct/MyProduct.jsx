import './MyProduct.scss';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";
import request from '../../../../helpers/request';
// import EditProduct from '../EditProduct/EditProduct';

const MyProduct = (props) => {
    const { id, handleEditProduct } = props;

    const [productInfo, setProductInfo] = useState({
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

    const fetchData = async (id) => {
        const { data, status } = await request.get(`/products/${id}`);
        
        if (status === 200) {
            const productInfo = data.product;
            productInfo.images = productInfo.images.map(image => image.url);
            setProductInfo(productInfo);
        }
    }

    useEffect(() => {
        fetchData(id);
    }, [id])

    return (
        <my-product-item>
            <my-product-content>
                <inner-box>
                    <my-product-image>
                        <img src={productInfo.images[0]} alt={productInfo.name}/>
                    </my-product-image>
                    <my-product-info>
                        <product-name>
                            {productInfo.name}
                        </product-name>
                        <product-reviews>
                            
                        </product-reviews>
                    </my-product-info>
                </inner-box>
                <product-price>
                    {`US$ ${productInfo.price}`}
                </product-price>
            </my-product-content>
            <my-product-footer onClick={() => { handleEditProduct(id) }}>
                Edit
            </my-product-footer>
            {/* <EditProduct handleOnClose={handleOnCloseEditProduct} isOpen={isEditOpen} openModal={openEdit} /> */}
        </my-product-item>
    );
}

MyProduct.propTypes = {
    id: PropTypes.string,
    handleEditProduct: PropTypes.func,
}

export default MyProduct;