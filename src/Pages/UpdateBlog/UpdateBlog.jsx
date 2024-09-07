import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import styles from './UpdateBlog.module.css'
import { getBlogById, updateBlog } from '../../api/internal'
import TextInput from '../../components/TextInput/TextInput'

const UpdateBlog = () => {
    const params = useParams();
    const blogId = params.id
    const navigate = useNavigate()

    const [title, setTitle] = useState('')
    const [photo, setPhoto] = useState('')
    const [content, setContent] = useState('')

    useEffect(() => {
        async function getBlogDetails() {


            const response = await getBlogById(blogId);
            if (response.status === 200) {
                setTitle(response.data.blog.title)
                setContent(response.data.blog.content)
                setPhoto(response.data.blog.photo)

                // set ownership
                // setOwnsBlog(username === response.data.blog.authorUsername);
                // setBlog(response.data.blog);
                // console.log(response.data.blog._id)
            }
        }
        getBlogDetails();
    }, [])

    const getPhoto = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPhoto(reader.result);
        };
    };
    const author = useSelector((state) => state.user._id);
    const updateHandler = async () => {
        let data;
        if (photo.includes("http")) {
            data = {
                author,
                title,
                content,
                blogId,
            };
        } else {
            data = {
                author,
                title,
                content,
                photo,
                blogId,
            };
        }
        const response = await updateBlog(data)
        if (response.status == 200) {
            navigate('/blog')
        }
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <div className={styles.header}>Edit A Blog!</div>
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
                    maxLength={400}
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
                    <img src={photo} width={150} height={150} />
                </div>
                <button
                    className={styles.submit}
                    onClick={updateHandler}

                >
                    Update
                </button>

            </div>
        </div>
    )
}

export default UpdateBlog
