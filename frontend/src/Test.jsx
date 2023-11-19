import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from 'uuid';
import { storage } from './firebase';
import { useEffect, useState } from "react";

const Test = () => {
    const [imagesUpload, setImagesUpload] = useState([]);
    // const [imageUpload, setImageUpload] = useState([]);
    // const [imageList, setImageList] = useState([]);

    // const imageListRef = ref(storage, "images/")

    // const uploadImage = () => {
    //     const imageRef = ref(storage, `images/${imageUpload.name + v4()}`);
    //     uploadBytes(imageRef, imageUpload).then((snapshot) => {
    //         getDownloadURL(snapshot.ref).then((url) => {
    //             console.log(url)
    //         })
    //     })
    // }

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

    // const transformImagesToUrls = () => {
    //     uploadImagesAndGetURLs(imagesUpload).then((urls) => {
    //         console.log('Linki do przesłanych obrazków:', urls);
    //         // Tutaj możesz wykonywać dalsze operacje z linkami
    //     })
    //     .catch((error) => {
    //         console.error('Wystąpił błąd podczas przesyłania obrazków:', error);
    //     });
    // }

    const transformImagesToUrls = async () => {
        const urls = await uploadImagesAndGetURLs(imagesUpload);
        console.log(urls)
        // uploadImagesAndGetURLs(imagesUpload).then((urls) => {
        //     console.log('Linki do przesłanych obrazków:', urls);
        //     // Tutaj możesz wykonywać dalsze operacje z linkami
        // })
        // .catch((error) => {
        //     console.error('Wystąpił błąd podczas przesyłania obrazków:', error);
        // });
    }

    // const uploadImages = () => {
    //     const imagesToSend = [];
    //     imagesUpload.forEach(image => {
    //         const imageRef = ref(storage, `images/${image.name + v4()}`);
    //         uploadBytes(imageRef, image).then((snapshot) => {
    //             getDownloadURL(snapshot.ref).then((url) => {
    //                 imagesToSend.push(url);
    //             })
    //         })
    //     })
        
    // }

    // const uploadImages2 = async () => {
    //     const imagesToSend = [];
    //     imagesUpload.forEach(async (image) => {
    //         const imageRef = ref(storage, `images/${image.name + v4()}`);
    //         const snapshot = await uploadBytes(imageRef, image);
    //         const url = getDownloadURL(snapshot.ref);
    //         imagesToSend.push(url);
    //         console.log(url)
    //     })
    //     console.log(imagesToSend);
        
    // }

    // const getImages = async () => {
    //     const imgs = await uploadImages();
    //     console.log(imgs)
    // }


    useEffect(() => {
        // listAll(imageListRef).then((response) => {
        //     response.items.forEach((item) => {
        //         getDownloadURL(item).then((url) => {
        //             setImageList(prev => [...prev, url])
        //         })
        //     })
        // })
        // listAll(imageListRef).then((response) => {
        //     console.log(response)
        // })
        // list(imageListRef)
    },[])

    return (
        <div>
            <input multiple type="file" onChange={(e)=>setImagesUpload(prev => [...prev, e.target.files[0]])}/>
            <button onClick={() => {
                transformImagesToUrls();
            }}>Upload Image</button>
            {/* {imageList.map((url) => {
                return <img key={url} src={url} />
            })} */}
        </div>
    );
}

export default Test;