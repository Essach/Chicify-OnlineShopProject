import Modal from "../../../Modal/Modal";
import plus from '../../../../icons/addProduct.svg';
import { useState } from "react";
import close from '../../../../icons/closeBlack.svg';
import plusWhite from '../../../../icons/plusWhite.svg';
import './NewProduct.scss';

import { PropTypes } from 'prop-types';

const NewProduct = ({ handleOnClose, isOpen }) => {
    
    const categories = [
        'Clothing and Apparel',
        'Electronics',
        'Home and Furniture',
        'Health and Beauty',
        'Sports and Outdoors',
        'Books and Stationery',
        'Toys and Games',
        'Jewelry and Accessories',
        'Automotive',
        'Gourmet Food and Beverages',
        'Pet Supplies',
        'Art and Collectibles',
        'Electrical Appliances',
        'Garden and Outdoor',
        'Travel and Luggage',
        'Specialty Stores',
        'Fitness and Exercise',
        'Baby and Toddler',
        'Party and Celebration',
        'Tools and Hardware',
        'Craft and Hobbies',
        'Office and School Supplies',
        'Musical Instruments',
        'Technology and Gadgets',
        'Home Improvement',
        'Video Games',
        'Movies and Music',
        'Vintage and Antiques',
        'Subscription Boxes',
        'Ethnic and Cultural'
    ];  
    const categoryItems = categories.map(category => <p key={category}>{category}</p>)

    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);
    const [imageThree, setImageThree] = useState(null);
    const [imageFour, setImageFour] = useState(null);

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isOpen} shouldBeClosedOnOutsideClick={true}>
            <new-product>
                <np-top>
                    <np-title>
                        <img src={plus} alt="add product" />
                        <p>Add product</p>
                    </np-title>
                    <img src={close} alt="close" className='close' onClick={handleOnClose}/>
                </np-top>
                <form-single>
                    <p>Product name:</p>
                    <input
                        type="text"
                        placeholder="Name"
                    />
                </form-single>
                <form-double>
                    <form-single>
                        <form-title>
                            <p className="big">Price:</p>
                            <p className="small">{`(US$)`}</p>
                        </form-title>
                        <input
                            type="number"
                            placeholder="Price"
                        />
                    </form-single>
                    <form-single>
                        <p>Quantity:</p>
                        <input
                            type="number"
                            placeholder="Quantity"
                        />
                    </form-single>
                </form-double>
                <form-double>
                    <form-single>
                        <form-title>
                            <p className="big">Delivery options:</p>
                            <p className="small">{`(Select at least 1 option)`}</p>
                        </form-title>
                        <select-options>
                            <p>Normal</p>
                            <p>Express</p>
                        </select-options>
                    </form-single>
                    <form-single>
                        <form-title>
                            <p className="big">Categories:</p>
                            <p className="small">{`(Select at least 1 option)`}</p>
                        </form-title>
                        <select-options>
                            {categoryItems}
                        </select-options>
                    </form-single>
                </form-double>
                <form-single>
                    <form-title>
                        Images:
                    </form-title>
                    <added-images>
                        <label>
                            <input type="file" onChange={(event => setImageOne(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageOne ? <img src={URL.createObjectURL(imageOne)} alt="no found" />
                                : <img src={plusWhite} alt="add image"/>}
                        </label>
                        <label>
                            <input type="file" onChange={(event => setImageTwo(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageTwo ? <img src={URL.createObjectURL(imageTwo)} alt="no found" />
                                : <img src={plusWhite} alt="add image"/>}
                        </label>
                        <label>
                            <input type="file" onChange={(event => setImageThree(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageThree ? <img src={URL.createObjectURL(imageThree)} alt="no found" />
                                : <img src={plusWhite} alt="add image"/>}
                        </label>
                        <label>
                            <input type="file" onChange={(event => setImageFour(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageFour ? <img src={URL.createObjectURL(imageFour)} alt="no found" />
                                : <img src={plusWhite} alt="add image"/>}
                        </label>
                    </added-images>
                </form-single>
                <form-single>
                    <form-title>
                        Description:
                    </form-title>
                    <textarea/>
                </form-single>
            </new-product>
        </Modal>
    );
}

NewProduct.propTypes = {
    handleOnClose: PropTypes.func,
    isOpen: PropTypes.bool,
}

export default NewProduct;