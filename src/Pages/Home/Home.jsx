import React, { useState, useEffect } from 'react';
import styles from './Home.module.css';
import { getNews } from '../../api/external';
import Loader from '../../components/Loader/Loader';

const Home = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        (async function newsApiCall() {
            const response = await getNews();
            setArticles(response);
        })();

        // cleanup function
        setArticles([]);
    }, []);

    const handleCardClick = (url) => {
        window.open(url, '_blank')
    }
    if (articles.length == 0) {
        return <Loader text='Homepage' />
    }

    return (
        <>
            <div className={styles.header}>Latest Articles</div>
            <div className={styles.grid}>
                {articles.map((article) => (
                    <div
                        className={styles.card}
                        key={article.url}
                        onClick={() => handleCardClick(article.url)}
                    >
                        <img src={article.urlToImage} alt="blog image" />
                        <h3>{article.title}</h3>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Home
