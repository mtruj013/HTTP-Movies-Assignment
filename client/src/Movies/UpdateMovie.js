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
    console.log(props)

    const [movie, setMovie] = useState(initialState);
    const { push } = useHistory();
    const { id } = useParams();

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                console.log(res)
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const handleChange = e => {
        e.preventDefault();

        setMovie({
            ...movie,
            [e.target.name]: e.target.value

        })

    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.put(`http://localhost:5000/api/movies/${id}`, movie)
        .then ( res => {
            setMovie(
                res.data
            )
        })
        .catch(err => {
            console.log(err)
        })
    }

    return (
        <div>
            <h3>Add A Movie</h3>
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