import Modal from "../../../Modal/Modal";
import plus from '../../../../icons/addProduct.svg';
import { useState } from "react";
import close from '../../../../icons/closeBlack.svg';
import plusWhite from '../../../../icons/plusWhite.svg';
import './NewProduct.scss';

import { PropTypes } from 'prop-types';

const NewProduct = ({ handleOnClose, isOpen, openModal }) => {
    
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
    ].sort();  

    const [selectedDelivery, setSelectedDelivery] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [imageOne, setImageOne] = useState(null);
    const [imageTwo, setImageTwo] = useState(null);
    const [imageThree, setImageThree] = useState(null);
    const [imageFour, setImageFour] = useState(null);

    const categoryItems = categories.map(category => <p
        key={category}
        className={`${selectedCategories.includes(category) ? 'selected' : 'none'} category`}
        onClick={() => {
            if (selectedCategories.includes(category)) setSelectedCategories(selectedCategories.filter(item => item !== category));
            else setSelectedCategories([...selectedCategories, category]);
        }}>
        {category}
    </p>)

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isOpen} shouldBeClosedOnOutsideClick={false}>
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
                        <div className="select-options">
                            <p className={`${selectedDelivery.includes('normal') ? 'selected' : 'none'} delivery`} onClick={() => {
                                if (selectedDelivery.includes('normal')) setSelectedDelivery(selectedDelivery.filter(item => item !== 'normal'));
                                else setSelectedDelivery([...selectedDelivery, 'normal']);
                            }}>
                                Normal
                            </p>
                            <p className={`${selectedDelivery.includes('express') ? 'selected' : 'none'} delivery`} onClick={() => {
                                if (selectedDelivery.includes('express')) setSelectedDelivery(selectedDelivery.filter(item => item !== 'express'));
                                else setSelectedDelivery([...selectedDelivery, 'express']);
                            }}>
                                Express
                            </p>
                        </div>
                    </form-single>
                    <form-single>
                        <form-title>
                            <p className="big">Categories:</p>
                            <p className="small">{`(Select at least 1 option)`}</p>
                        </form-title>
                        <div className="select-options scrollable">
                            {categoryItems}
                        </div>
                    </form-single>
                </form-double>
                <form-single>
                    <form-title>
                        Images:
                    </form-title>
                    <added-images>
                        <label>
                            <input type="file" onChange={(event => {
                                setImageOne(event.target.files[0])
                                openModal()
                            })} 
                                on={()=>{console.log('hi')}}
                                accept="image/jpeg, image/png, image/jpeg" />
                            {imageOne ? <img src={URL.createObjectURL(imageOne)} alt="no found" className="added"/>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
                        </label>
                        <label>
                            <input type="file" onChange={(event => setImageTwo(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageTwo ? <img src={URL.createObjectURL(imageTwo)} alt="no found" className="added"/>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
                        </label>
                        <label>
                            <input type="file" onChange={(event => setImageThree(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageThree ? <img src={URL.createObjectURL(imageThree)} alt="no found" className="added"/>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
                        </label>
                        <label>
                            <input type="file" onChange={(event => setImageFour(event.target.files[0]))} accept="image/jpeg, image/png, image/jpeg"/>
                            {imageFour ? <img src={URL.createObjectURL(imageFour)} alt="no found" className="added"/>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
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
    openModal: PropTypes.func,
}

export default NewProduct;