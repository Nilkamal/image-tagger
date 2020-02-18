import React, { useState, useEffect } from 'react';
import Tag from '../../../components/tag/tag-component';
import Button from '../../../components/button/button-component';
import { firestore } from '../../../firebase/firebase.utils';

import './search-image-styles.scss';

const SearchImage = () => {
    const [tags, setTags] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const tagsArray = [];
        const docRef = firestore.collection('images');

        docRef.get().then(querySnapshot => {
            console.log(querySnapshot);
            querySnapshot.forEach(doc => {
                const tag = doc.data().tags;
                tagsArray.push(tag);
            })
            convertTagsArrayToObject(tagsArray);
            // setTags(tagsArray);
        })

        function convertTagsArrayToObject(tagsArray) {
            const filteredArray = tagsArray.reduce((accumlator, tags) => {

                tags.forEach(tag => {
                    if (!accumlator.find(a => a.tag === tag)) {
                        accumlator.push({ tag, selected: false })
                    }
                })
                return accumlator;
                // accumlator = accumlator;
            }, []);

            setTags(filteredArray);
        }
    }, [])

    const handleTagClick = (event) => {
        const { textContent } = event.target;
        const filteredTags = tags.map(tag => {
            if (tag.tag === textContent) {
                tag.selected = !tag.selected;
            }
            return tag;
        })

        setTags(filteredTags);
    }

    const handleSearch = () => {
        const searchTags = tags.filter(tag => {
            if (tag.selected) {
                return tag;
            }
        })
        const search = searchTags.map(tag => tag.tag);
        const searchResult = [];
        // Prepare query to firestore
        const docRef = firestore.collection('images').where("tags", "array-contains-any", search);
        docRef.get().then(querySnapshot => {
            querySnapshot.forEach(doc=>{
                searchResult.push(doc.data().imageUrl);
            })
        }).then(()=>{
            console.log(searchResult.length);
            setImageUrls(searchResult);
        })
        
        
    }

    return (
        <main className='upload-image'>
            <section>
                <h1>Search Images By Tags</h1>
                <p>Select One or More Tags For Image Search</p>

                <form>
                    <div className='row'>
                        {
                            tags.map(tag => {
                                return <Tag selected={tag.selected} onClick={handleTagClick}>{tag.tag}</Tag>
                            })
                        }
                    </div>

                    <Button type="button" onClick={handleSearch}>Search</Button>

                     <section className="images">
                        {
                            imageUrls.map(image => {
                                return <a href={image} target="_blank"><img src={image} /></a>
                            })
                        }    
                     </section>   
                </form>
            </section>
        </main>
    )
}

export default SearchImage;