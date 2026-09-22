import { useEffect, useState } from "react"
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import type { CategoryContract } from "../../contracts/categoryContract";




export function AddVideo() {

    const [categories, setCategories] = useState<CategoryContract[]>();

    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            video_id: 0,
            title: '',
            description: '',
            url: '',
            likes: 0,
            dislikes: 0,
            views: 0,
            category_id: 0
        },
        onSubmit: (video) => {
            axios.post('http://localhost:6060/add-video', video)
                .then(() => {
                    console.log('Added');
                })
            alert('Video Added');
            navigate('/admin-dashboard');
        }
    })

    function LoadCategories() {
        axios.get('http://localhost:6060/categories')
            .then(response => {
                response.data.unshift({ category_id: -1, category_name: 'Select Category' });
                setCategories(response.data);
            })
    }

    useEffect(() => {
        LoadCategories();
    }, [])

    return (
        <div>
            <form onSubmit={formik.handleSubmit}>
                <dl>
                    <dt>Video Id</dt>
                    <dd><input type="text" onChange={formik.handleChange} name="video_id" /></dd>
                    <dt>Title</dt>
                    <dd><input type="text" name="title" onChange={formik.handleChange} /></dd>
                    <dt>Description</dt>
                    <dd><input type="text" name="description" onChange={formik.handleChange} /></dd>
                    <dt>URL</dt>
                    <dd><input type="text" name="url" onChange={formik.handleChange} /></dd>
                    <dt>Likes</dt>
                    <dd><input type="text" name="likes" onChange={formik.handleChange} /></dd>
                    <dt>Dislikes</dt>
                    <dd><input type="text" name="dislikes" onChange={formik.handleChange} /></dd>
                    <dt>Views</dt>
                    <dd><input type="text" name="views" onChange={formik.handleChange} /></dd>
                    <dt>Category</dt>
                    <dd>
                        <select name="category_id" onChange={formik.handleChange}>
                            {
                                categories?.map(category =>
                                    <option value={category.category_id} key={category.category_id}>{category.category_name}</option>
                                )
                            }
                        </select>
                    </dd>
                </dl>
                <button type="submit" className="btn btn-primary">Add Video</button>
            </form>
        </div>
    )
}