import { useEffect, useState } from 'react';
import Modal from '../../../Modal/Modal';

import PropTypes from 'prop-types';

import './ImagesModal.scss';

import closeIcon from '../../../../icons/closeBlack.svg';

const ImagesModal = ({ handleOnClose, isModalOpen, images}) => {
    const [currentImage, setCurrentImage] = useState(images[0]);
    const handleOnClickImage = (image) => setCurrentImage(image)

    useEffect(() => {
        setCurrentImage(images[0])
    },[images])

    return (
        <Modal handleOnClose={handleOnClose} isOpen={isModalOpen} shouldBeClosedOnOutsideClick={true}>
            <images-modal>
                <close-btn onClick={handleOnClose}>
                    <img src={closeIcon} alt='close images' />
                </close-btn>
                <main-image>
                    {currentImage !== undefined ? <img src={currentImage} alt="" /> : null}
                </main-image>
                <all-images>
                    {images.map((image, index) => <small-img key={index} onClick={()=>{handleOnClickImage(image)}}><img src={image} alt='' /></small-img>)}
                </all-images>
            </images-modal>
        </Modal>
    );
}

ImagesModal.propTypes = {
    handleOnClose: PropTypes.func,
    isModalOpen: PropTypes.bool,
    images: PropTypes.array,
}

export default ImagesModal;