import React, { useState, useEffect } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import axios from 'axios'

const initialState = {
    title: '',
    director: '',
    metascore: '',
    stars: []
}

const UpdateMovie = props => {
    // console.log(props)

    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                // console.log(res)
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleChange = e => {
        e.preventDefault();

        let value = e.target.value
        if (e.target.name === 'stars'){
            let starsArr = value.split(',')
            setMovie({ ...movie, [e.target.name]: starsArr})
        } else {
            setMovie({ ...movie, [e.target.name]: value})
        }
        console.log(movie)

    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then ( res => {
            props.getMovie()
            setMovie(
                res.data
            )
            push('/')
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h3>Edit Movie</h3>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">
                    Title:
                    <input
                        type="text "
                        name="title"
                        value={movie.title}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="director">
                    Director
                    <input
                        type="text"
                        name="director"
                        value={movie.director}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="metascore">
                    Metascore:
                    <input
                        type="number"
                        name="metascore"
                        value={movie.metascore}
                        onChange={handleChange}
                    />
                </label>

                <label htmlFor="stars">
                    Stars:
                    <input
                        type="text"
                        name="stars"
                        value={movie.stars}
                        onChange={handleChange}
                    />
                </label>
                <button>Submit</button>
            </form>
        </div>
    )
}

export default UpdateMovie;