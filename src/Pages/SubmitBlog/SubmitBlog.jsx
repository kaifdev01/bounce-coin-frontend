import React, { useState, useEffect } from 'react'
import styles from './SubmitBlog.module.css'
import { SubmitBlogs } from '../../api/internal'
import { useSelector } from 'react-redux'
import TextInput from '../../components/TextInput/TextInput'
import { useNavigate } from 'react-router-dom'

function SubmitBlog() {

    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')

    const author = useSelector(state => state.user._id)

    // const getPhoto = (e) => {
    //     const file = e.target.files[0]
    //     const reader = new FileReader()
    //     reader.readAsDataUrl(file)
    //     reader.onloadend = () => {
    //         setPhoto(reader.result)
    //     }

    // }
    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };

    const submitHandler = async () => {
        const data = {
            photo, title, content, author
        };
        const response = await SubmitBlogs(data)
        if (response.status == 201) {
            navigate('/blog')
        }
    }


    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.header}>Create A Blog</div>
                <TextInput
                    type='text'
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    width={{ width: '60%' }}
                />
                <textarea
                    className={styles.content}
                    placeholder='Your content goes here...'
                    maxLength={1200}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className={styles.photoPrompt}>
                    <p>Choose a photo</p>
                    <input
                        type='file'
                        name='photo'
                        id='photo'
                        accept='image/jpg, image/jpeg, image/png'
                        onChange={getPhoto}
                    />
                    {photo !== "" ? <img src={photo} width={150} height={150} /> : ""}
                </div>
                <button
                    className={styles.submit}
                    onClick={submitHandler}
                    disabled={title === "" || content === "" || photo === ""}
                >
                    Submit
                </button>

            </div>
        </div>
    )
}
export default SubmitBlog