import React, { useState, useEffect } from 'react';
import Loader from '../../components/Loader/Loader';
import { getAllBlogs } from '../../api/internal';
import styles from './Blogs.module.css';
import { useNavigate } from "react-router-dom";

const Blogs = () => {
    const navigate = useNavigate();
    const [blogs, setBlogs] = useState([]);

    useEffect(() => {
        const getAllBlogsApiCall = async () => {
            try {
                const response = await getAllBlogs();
                if (response.status === 200) {
                    setBlogs(response.data.blogs);
                }
            } catch (error) {
                console.error('Error fetching blogs:', error);
            }
        };

        getAllBlogsApiCall();
    }, []);

    if (blogs.length === 0) {
        return <Loader text='Blogs' />;
    }

    return (
        <div className={styles.blogWrapper}>
            {blogs.map((blog) => (
                <div 
key={blog._id} 
className={styles.blog}
 onClick={() => navigate(`/blog/${blog._id}`)}
>
                    <h1>{blog.title}</h1>
                    <img src={blog.photo} alt={blog.title} />
                    <p>{blog.content}</p>
                </div>
            ))}
        </div>
    );
};

export default Blogs;
