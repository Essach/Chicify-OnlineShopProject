import { useEffect, useState } from 'react';

import './ProductMain.scss';

import PropTypes from 'prop-types';

import ImagesModal from '../ImagesModal/ImagesModal';

const ProductMain = (props) => {
    const { name, images } = props;

    const [hasProductMoreImages, setHasProductMoreImages] = useState(false);

    useEffect(() => {
        if (images.length > 1) {
            setHasProductMoreImages(true);
        }
    },[images])


    const [isModalOpen, setIsModalOpen] = useState(false);
    const handleOnClose = () => setIsModalOpen(false)
    const handleOnClickImage = () => setIsModalOpen(true);

    return (
        <product-main>
            <product-name>
                <p>{name}</p>
            </product-name>
            <product-images>
                <product-main-image onClick={handleOnClickImage}>
                    {images.length > 0 ?
                        < img src={images[0]} alt={`${name} main image`} />
                        : null
                    }   
                </product-main-image>
                {hasProductMoreImages ?
                    <product-images-more>
                        <product-additional-images>
                            {images.slice(1).map((image, index) => <small-img key={index} onClick={handleOnClickImage}><img src={image} alt={`${name} additional image`} /></small-img>)}
                        </product-additional-images>
                        <see-more-button onClick={handleOnClickImage}>
                            <p>See more images</p>
                        </see-more-button>
                    </product-images-more> 
                    : null
                }
            </product-images>
            <ImagesModal handleOnClose={handleOnClose} isModalOpen={isModalOpen} images={images}/>
        </product-main>
    );
}

ProductMain.propTypes = {
    name: PropTypes.string,
    images: PropTypes.array,
}

export default ProductMain;