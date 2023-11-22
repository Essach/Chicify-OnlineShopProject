import Modal from "../../../Modal/Modal";
import edit from '../../../../icons/edit.svg';
import { useContext, useEffect, useState } from "react";
import close from '../../../../icons/closeBlack.svg';
import closeWhite from '../../../../icons/close.svg';
import plusWhite from '../../../../icons/plusWhite.svg';
import './EditProduct.scss';

import { PropTypes } from 'prop-types';
import request from "../../../../helpers/request";
import { StoreContext } from "../../../../store/StoreProvider";
import { updateUser } from "../../../../helpers/localStorage";

import { ColorRing } from 'react-loader-spinner';
import { useNavigate } from "react-router";

const EditProduct = (props) => {
    const { handleOnClose, isOpen, id, resetEditId } = props;
    
    const { user, setUser } = useContext(StoreContext);

    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

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

    const [oldFilePaths, setOldFilePaths] = useState([]);

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
        if (imgSrc.size > 500000) {
            setIsFormValidated(false);
            setValidationMessage("*Files should not exceed 500KB size")
            return;
        } else {
            setIsFormValidated(true)
        }
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


    const handleEditProductBtn = async () => {
        const isValidated = validateForm();
        
        if (isValidated) {
            
            setLoading(true);
            const price = parseInt(priceValue);
            const quantity = parseInt(quantityValue);

            const formData = new FormData();
            for (let i = 0; i < images.length; i++){
                formData.append(`image${i}`, images[i]);
            }
            for (let i = 0; i < oldFilePaths.length; i++){
                formData.append(`imageFilePath${i}`, oldFilePaths[i]);
            }


            selectedDelivery.forEach((element, index) => {
                formData.append(`delivery[${index}]`, element)
            });
            selectedCategories.forEach((element, index) => {
                formData.append(`category[${index}]`, element)
            });
            formData.append('name', nameValue);
            formData.append('price', price);
            formData.append('quantity', quantity);
            formData.append('description', descriptionValue);
            formData.append('sellerId', user.userId);
            formData.append('productId', id);

            const { data, status } = await request.post('/users/productEdit', formData);

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
                resetEditId();
                handleOnClose('addBtn');
                navigate(0);
            } else {
                throw new Error(data.message)
            }
            setLoading(false)
        }
    }

    const handleDeleteProductBtn = async () => {
            setLoading(true);

            const formData = new FormData();
            for (let i = 0; i < oldFilePaths.length; i++){
                formData.append(`imageFilePath${i}`, oldFilePaths[i]);
            }
            formData.append('sellerId', user.userId);
            formData.append('productId', id);

            const { data, status } = await request.post('/users/productDelete', formData);

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
                resetEditId();
                handleOnClose('addBtn');
                navigate(0);
            } else {
                throw new Error(data.message)
            }
            setLoading(false)
    }

    const uploadURLsAndGetImages = (imageList) => {
        const promises = imageList.map((imageInfo, index) => {
            return new Promise((resolve, reject) => {
                toDataURL(imageInfo.url)
                .then(dataUrl => {
                    const fileData = dataURLtoFile(dataUrl, `image${index}.png`);
                    resolve({ fileData: fileData, filePath: imageInfo.filePath});
                })
                .catch ((error) => {
                    reject(error)
                })
            });
        });

        return Promise.all(promises);
    }

    const toDataURL = url => fetch(url)
        .then(response => response.blob())
        .then(blob => new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result)
        reader.onerror = reject
        reader.readAsDataURL(blob)
        })).catch(rejected => {
            console.log(rejected)
    })
    
    const dataURLtoFile = (dataurl, filename) => {
        let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while(n--){
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new File([u8arr], filename, {type:mime});
    }

    const fetchData = async (id) => {
        const { data, status } = await request.get(`/products/${id}`);

        if (status === 200) {
            setNameValue(data.product.name);
            setPriceValue(data.product.price);
            setSelectedDelivery(data.product.delivery.map(item => item.type));
            setQuantityValue(data.product.quantity);
            setDescriptionValue(data.product.description);
            setSelectedCategories(data.product.categories);

            const productImages = await uploadURLsAndGetImages(data.product.images);
            setImages(productImages.map(imageInfo => imageInfo.fileData));
            setOldFilePaths(productImages.map(imageInfo => imageInfo.filePath));
        }
        
    }

    useEffect(() => {
        if (images.includes(undefined)) {
            setImages(images.filter(image => image !== undefined))
        }
    },[images])

    useEffect(() => {
        if(id !== '') {
            fetchData(id);
        }
    },[id])

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isOpen} shouldBeClosedOnOutsideClick={true}>
            {loading ? <loading-screen>
                <ColorRing
                    visible={true}
                    height="200"
                    width="200"
                    ariaLabel="blocks-loading"
                    wrapperStyle={{}}
                    wrapperClass="blocks-wrapper"
                    colors={['#153E47', '#4E8490', '#378EA1', '#388D9F', '#64C0D4']}
                />
            </loading-screen> : null}
            <edit-product>
                <ep-top>
                    <ep-title>
                        <img src={edit} alt="add product" />
                        <p>Edit product</p>
                    </ep-title>
                    <img src={close} alt="close" className='close' onClick={()=>{handleOnClose('closeBtn')}}/>
                </ep-top>
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
                <editing-btns>
                    <edit-product-btn>
                        <p onClick={() => {
                            handleEditProductBtn()
                        }}>
                            Edit product
                        </p>
                    </edit-product-btn>
                    <delete-product-btn>
                        <p onClick={handleDeleteProductBtn}>
                            Delete product
                        </p>
                    </delete-product-btn>
                </editing-btns>
            </edit-product>
        </Modal>
    );
}

EditProduct.propTypes = {
    handleOnClose: PropTypes.func,
    isOpen: PropTypes.bool,
    id: PropTypes.string,
    resetEditId: PropTypes.func,
}

export default EditProduct;