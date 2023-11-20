import './MyProduct.scss';
import { PropTypes } from 'prop-types';
import { useEffect, useState } from "react";
import request from '../../../../helpers/request';
import EditProduct from '../EditProduct/EditProduct';

const MyProduct = ({id}) => {
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
        const { data } = await request.get(`/products/${id}`);
        setProductInfo(data.product);
    }

    const [isEditOpen, setIsEditOpen] = useState(false);
    const handleOnCloseEditProduct = (event, location) => {
        if (event !== undefined) setIsEditOpen(false);
        else if (location === 'addBtn') setIsEditOpen(false);
        else if (location === 'closeBtn') setIsEditOpen(false);
    }
    const openEdit = () => setIsEditOpen(true);

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
            <my-product-footer>
                Edit
            </my-product-footer>
            <EditProduct handleOnClose={handleOnCloseEditProduct} isOpen={isEditOpen} openModal={openEdit} />
        </my-product-item>
    );
}

MyProduct.propTypes = {
    id: PropTypes.string,
}

export default MyProduct;