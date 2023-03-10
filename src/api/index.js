import axios from "axios";

const API = axios.create({ baseURL: 'https://blog-server-pratice.vercel.app/' })

API.interceptors.request.use((req) => {
    if(localStorage.getItem('profile')) {
        req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`
    }
    return req;
})

//Blog - CRUD

export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost)
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`,updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

//User - AUTH

//export const signIn = (formData) => API.post('/user/signin', formData);
//export const signUp = (formData) => API.post('/user/signup', formData);