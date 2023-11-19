import Modal from "../../../Modal/Modal";
import plus from '../../../../icons/addProduct.svg';
import { useContext, useEffect, useState } from "react";
import close from '../../../../icons/closeBlack.svg';
import closeWhite from '../../../../icons/close.svg';
import plusWhite from '../../../../icons/plusWhite.svg';
import './NewProduct.scss';

import { PropTypes } from 'prop-types';
import request from "../../../../helpers/request";
import { StoreContext } from "../../../../store/StoreProvider";
import { updateUser } from "../../../../helpers/localStorage";

import { storage } from "../../../../firebase";
import { ref, uploadBytes, getDownloadURL  } from "firebase/storage";

import { v4 } from 'uuid';

const NewProduct = ({ handleOnClose, isOpen}) => {
    
    const { user, setUser } = useContext(StoreContext);

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

    const [nameValue, setNameValue] = useState('');
    const [priceValue, setPriceValue] = useState(0);
    const [quantityValue, setQuantityValue] = useState(0);
    const [descriptionValue, setDescriptionValue] = useState(''); 

    const [selectedDelivery, setSelectedDelivery] = useState([]);
    const [selectedCategories, setSelectedCategories] = useState([]);

    const [images, setImages] = useState([]);

    const [validationMessage, setValidationMessage] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(true);

    const categoryItems = categories.map(category => <p
        key={category}
        className={`${selectedCategories.includes(category) ? 'selected' : 'none'} category`}
        onClick={() => {
            if (selectedCategories.includes(category)) setSelectedCategories(selectedCategories.filter(item => item !== category));
            else setSelectedCategories([...selectedCategories, category]);
        }}>
        {category}
    </p>)

    const handleChangeName = (e) => setNameValue(e.target.value); 
    const handleChangePrice = (e) => {
        if (e.target.value[0] === "0") (setPriceValue(e.target.value.slice(1)))
        else if (e.target.value >= 0) setPriceValue(e.target.value);
    }
    const handleChangeQuantity = (e) => {
        if (e.target.value[0] === "0") (setQuantityValue(e.target.value.slice(1)))
        else if (e.target.value >= 0) setQuantityValue(e.target.value);
    }
    const handleChangeDescription = (e) => setDescriptionValue(e.target.value);

    const addImage = (imgSrc, column) => {
        if (imgSrc === undefined) return;
        if (images.find(img => img.name === imgSrc.name) !== undefined) return;
        if (images[column] !== undefined) {
            let newImages = [...images];
            newImages[column] = imgSrc;
            setImages(newImages)
            return;
        }
        if (images.length === 4) return;
        setImages([...images, imgSrc])
    }

    const validateForm = () => {
        if (nameValue === '' || priceValue <= 0 || quantityValue <= 0 || selectedDelivery.length === 0 || selectedCategories.length === 0) {
            setIsFormValidated(false);
            setValidationMessage('*Please fill in all the forms');
            return false;
        } else if (nameValue.length > 30) {
            setIsFormValidated(false);
            setValidationMessage('*Name should have maximally 30 characters');
            return false;
        }
        setIsFormValidated(true);
        return true;
    }

    const uploadImagesAndGetURLs = (imageList) => {
        const promises = imageList.map((imageUpload) => {
            return new Promise((resolve, reject) => {
                const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
                uploadBytes(imageRef, imageUpload)
                    .then((snapshot) => {
                        getDownloadURL(snapshot.ref)
                            .then((url) => {
                                resolve(url);
                            })
                            .catch((error) => {
                                reject(error);
                            });
                    })
                    .catch((error) => {
                        reject(error);
                    });
            });
        });

        return Promise.all(promises);
    };
    
    const handleAddNewProductBtn = async () => {
        const isValidated = validateForm();
        if (isValidated) {
            
            const price = parseInt(priceValue);
            const quantity = parseInt(quantityValue);
            const imagesLinks = await uploadImagesAndGetURLs(images);

            if (imagesLinks !== undefined && imagesLinks.length > 0) {
                const { data, status } = await request.patch('/users/product', {
                    name: nameValue,
                    price: price,
                    delivery: selectedDelivery,
                    quantity: quantity,
                    images: imagesLinks,
                    description: descriptionValue,
                    categories: selectedCategories,
                    sellerId: user.userId,
                });

                if (status === 200) {
                    setUser(data.user);
                    updateUser(data.user);
                    setNameValue('');
                    setPriceValue(0);
                    setQuantityValue(0);
                    setDescriptionValue('');
                    setImages([]);
                    setSelectedCategories([]);
                    setSelectedDelivery([]);
                    handleOnClose('addBtn');
                } else {
                    throw new Error(data.message)
                }
            } else {
                setIsFormValidated(false);
                setValidationMessage('*Problem with uploading images');
            }
        }
    }

    useEffect(() => {
        if (images.includes(undefined)) {
            setImages(images.filter(image => image !== undefined))
        }
    },[images])

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isOpen} shouldBeClosedOnOutsideClick={true}>
            <new-product>
                <np-top>
                    <np-title>
                        <img src={plus} alt="add product" />
                        <p>Add product</p>
                    </np-title>
                    <img src={close} alt="close" className='close' onClick={()=>{handleOnClose('closeBtn')}}/>
                </np-top>
                <form-single>
                    <p>Product name:</p>
                    <input
                        type="text"
                        placeholder="Name"
                        value={nameValue}
                        onChange={handleChangeName}
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
                            value={priceValue}
                            onChange={handleChangePrice}
                            placeholder="Price"
                        />
                    </form-single>
                    <form-single>
                        <p>Quantity:</p>
                        <input
                            type="number"
                            placeholder="Quantity"
                            value={quantityValue}
                            onChange={handleChangeQuantity}
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
                            <p className={`${selectedDelivery.includes('Standard') ? 'selected' : 'none'} delivery`} onClick={() => {
                                if (selectedDelivery.includes('Standard')) setSelectedDelivery(selectedDelivery.filter(item => item !== 'Standard'));
                                else setSelectedDelivery([...selectedDelivery, 'Standard']);
                            }}>
                                Standard
                            </p>
                            <p className={`${selectedDelivery.includes('Express') ? 'selected' : 'none'} delivery`} onClick={() => {
                                if (selectedDelivery.includes('Express')) setSelectedDelivery(selectedDelivery.filter(item => item !== 'Express'));
                                else setSelectedDelivery([...selectedDelivery, 'Express']);
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
                    <p>
                        Images:
                    </p>
                    <added-images>
                        <label>
                            <input onClick={(e)=>{e.target.value = null}} type="file" onChange={event => addImage(event.target.files[0], 0)} accept="image/jpeg, image/png, image/jpeg" />
                            {images.length > 0 && images[0] !== undefined ? <image-preview>
                                    <img
                                        src={URL.createObjectURL(images[0])}
                                        alt="no found"
                                        className="added"
                                        onChange={event => addImage(event.target.files[0], 0)}/>
                                    <img
                                        src={closeWhite}
                                        alt="delete image"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            let newImages = [...images];
                                            newImages[0] = undefined;
                                            setImages(newImages);
                                        }}
                                        className="delete-image" />
                                </image-preview>
                                : <img src={plusWhite} alt="add image" className="plus" />}
                        </label>
                        <label>
                            <input onClick={(e)=>{e.target.value = null}} type="file" onChange={event => addImage(event.target.files[0], 1)} accept="image/jpeg, image/png, image/jpeg"/>
                            {images.length > 1 && images[1] !== undefined ? <image-preview>
                                    <img
                                        src={URL.createObjectURL(images[1])}
                                        alt="no found"
                                        className="added"
                                        onChange={event => addImage(event.target.files[0], 1)}/>
                                    <img
                                        src={closeWhite}
                                        alt="delete image"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            let newImages = [...images];
                                            newImages[1] = undefined;
                                            setImages(newImages);
                                        }}
                                        className="delete-image" />
                                </image-preview>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
                        </label>
                        <label>
                            <input onClick={(e)=>{e.target.value = null}}type="file" onChange={event => addImage(event.target.files[0], 2)} accept="image/jpeg, image/png, image/jpeg"/>
                            {images.length > 2 && images[2] !== undefined ? <image-preview>
                                    <img
                                        src={URL.createObjectURL(images[2])}
                                        alt="no found"
                                        className="added"
                                        onChange={event => addImage(event.target.files[0], 2)}/>
                                    <img
                                        src={closeWhite}
                                        alt="delete image"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            let newImages = [...images];
                                            newImages[2] = undefined;
                                            setImages(newImages);
                                        }}
                                        className="delete-image" />
                                </image-preview>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
                        </label>
                        <label>
                            <input onClick={(e)=>{e.target.value = null}} type="file" onChange={event => addImage(event.target.files[0], 3)} accept="image/jpeg, image/png, image/jpeg"/>
                            {images.length > 3 && images[3] !== undefined ? <image-preview>
                                    <img
                                        src={URL.createObjectURL(images[3])}
                                        alt="no found"
                                        className="added"
                                        onChange={event => addImage(event.target.files[0], 3)}/>
                                    <img
                                        src={closeWhite}
                                        alt="delete image"
                                        onClick={(e) => {
                                            e.preventDefault()
                                            let newImages = [...images];
                                            newImages[3] = undefined;
                                            setImages(newImages);
                                        }}
                                        className="delete-image" />
                                </image-preview>
                                : <img src={plusWhite} alt="add image" className="plus"/>}
                        </label>
                    </added-images>
                </form-single>
                <form-single>
                    <p>
                        Description:
                    </p>
                    <textarea placeholder="Add your description here..." value={descriptionValue} onChange={handleChangeDescription}/>
                </form-single>
                <validation-message>
                    {isFormValidated ? null : validationMessage}
                </validation-message>
                <add-new-product-btn>
                    <p onClick={() => {
                        handleAddNewProductBtn()
                    }}>
                        Add new product
                    </p>
                </add-new-product-btn>
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