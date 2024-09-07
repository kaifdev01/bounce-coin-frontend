import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from "./components/navbar/Navbar";
import Home from './Pages/Home/Home';
import Footer from './components/Footer/Footer';
import styles from "./App.module.css"
import Protected from './components/protected/Protected';
import Error from './Pages/Error/Error';
import LoginPage from './Pages/Login/LoginPage';
import { useSelector } from 'react-redux';
import Signup from './Pages/signup/Signup';
import Crypto from './Pages/crypto/Crypto';
import Blogs from './Pages/Blog/Blogs';
import SubmitBlog from './Pages/SubmitBlog/SubmitBlog';
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import UpdateBlog from "./Pages/UpdateBlog/UpdateBlog";
import useAutoLogin from './hooks/useAutoLogin';
import Loader from './components/Loader/Loader';

function App() {
  const isAuth = useSelector(state => state.user.auth);
  const loading = useAutoLogin()

  return loading ? <Loader text='...' /> : (
    <div className={styles.container}>
      <BrowserRouter>
        <div className={styles.layout}>
          <Navbar />
          <Routes>
            <Route
              path='/'
              exact
              element={<div className={styles.main}><Home /></div>} />
            <Route
              path='/crypto'
              exact
              element={<div className={styles.main}><Crypto /></div>} />
            <Route
              path='/blog'
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}><Blogs /></div>
                </Protected>} />

            <Route
              path='/submit-blog'
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}><SubmitBlog /></div>
                </Protected>} />
            <Route
              path="blog/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <BlogDetails />
                  </div>
                </Protected>
              }
            />
            <Route
              path="blog-update/:id"
              exact
              element={
                <Protected isAuth={isAuth}>
                  <div className={styles.main}>
                    <UpdateBlog />
                  </div>
                </Protected>
              }
            />
            <Route
              path='/log-in'
              exact
              element={<div className={styles.main}><LoginPage /></div>} />
            <Route
              path='/sign-up'
              exact
              element={<div className={styles.main}><Signup /></div>} />
            <Route
              path='*'
              exact
              element={<div className={styles.main}><Error /></div>} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
