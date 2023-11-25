import { useEffect, useState } from "react";
import { storage } from '../../firebase.js';
import { ref, getDownloadURL } from "firebase/storage";

import './ErrorPage.scss';

const ErrorPage = () => {
    const [imageLink, setImageLink] = useState('');

    useEffect(() => {
        const imageRef = ref(storage, `chicifyImages/errorPage/errorImage.png`);
        getDownloadURL(imageRef).then((url) => {
            setImageLink(url)
        })
    },[])

    return (
        <error-page>
            {imageLink !== '' && <img src={imageLink} alt="404 error"/>}
        </error-page>
    );
}

export default ErrorPage;