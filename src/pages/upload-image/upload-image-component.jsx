import React, { useState } from 'react';
import Tag from '../../components/tag/tag-component';
import Button from '../../components/button/button-component';
import { storageRef, firestore } from '../../firebase/firebase.utils';
import './upload-image-styles.scss';

const UploadImage = () => {
    //Hooks
    const [tags, setTags] = useState([]);
    const [imageTag, setImageTag] = useState('');
    const [image, setImage] = useState('');
    const [fileName, setFileName] = useState('');

    const handleTagClick = (event) => {
        if (window.confirm("Are you sure you want to delete this tag?")) {
            const { textContent } = event.target;
            const tag = textContent.split(' ')?.[0];

            // Remove tag from array 
            const filteredTags = tags.filter(t => {
                return t != tag
            });

            setTags(filteredTags);
        }
    }
    const formSubmit = async (event) => {
        event.preventDefault();
        if (!tags.length) {
            alert('Select atleast one tag');
            return;
        }

        if (!image) {
            alert('Please upload image to process');
            return;
        }
        const { type } = image;

        if (type !== "image/jpeg" && type !== "image/jpg" && type !== "image/png" && type !== 'image/webp' && type !== "image/bmp" && type !== "image/gif") {
            alert("Please upload only image file !")
            return;
        }
        putImage();
    }

    const putImage = () => {
        const imageRef = storageRef.child(`images/${image.name}-${new Date()}`);
        const uploadTask = imageRef.put(image);
        uploadTask.on('state_changed', function (snapshot) {
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        }, function (error) {
            // Handle unsuccessful uploads
            console.log(error);
        }, function () {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
                saveImageDoc(downloadURL);
            });
        });

    }

    const saveImageDoc = (url) => {
        firestore.collection('images').doc().set({
            imageUrl: url,
            tags: tags
        }).then(() => {
            console.info('Document successfullly written')
            alert('Image Uploaded Successfullly!');
            setFileName('')
            setTags('');
        }).catch(error => {
            console.error('Error while writing doc', error)
        })
    }

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && imageTag) {
            const alreadyExist = tags.find(tag => tag === imageTag);
            if (alreadyExist) {
                alert('Entered Tag Already Exists');
                setImageTag('');
                return;
            }

            setTags([...tags, imageTag]);

            //Reset Image Tag Field
            setImageTag('')

        }
    }

    const handleChange = (event) => {
        const { value } = event.target;
        setImageTag(value);
    }

    const handleFileUpload = (event) => {
        setImage(event.target.files[0]);
        setFileName(image.name)
    }

    return (
        <main className='upload-image'>
            <h1>Upload New Image</h1>
            <section className='main-section'>
                <div className='row'>
                    <label htmlFor="image">Upload Image</label>
                    <input type="file" name="image" value={fileName} id="image" onChange={handleFileUpload} accept="image/*" />
                </div>

                <div className='row'>
                    <label htmlFor="tags">Enter Tags</label>
                    <input type="text" value={imageTag} onKeyDown={handleKeyDown} onChange={handleChange} name="tags" id="tags" />
                </div>

                {
                    (tags.length > 0 &&
                        <div className='row'>
                            <p>Selected Tags</p>
                            <div className='tags'>
                                {
                                    tags.map((tag, index) => {
                                        return <Tag key={index} onClick={handleTagClick}>{tag} &#10006;</Tag>
                                    })
                                }
                            </div>
                        </div>)
                }
                <Button type="button" onClick={formSubmit}>Upload Image</Button>
            </section>
        </main>
    )
}

export default UploadImage;


