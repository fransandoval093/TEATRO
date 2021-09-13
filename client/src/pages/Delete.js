import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_MATCHUPS } from '../utils/queries';
// import { QUERY_TECH } from '../utils/queries';
import { CREATE_MATCHUP, DELETE_MATCHUP } from '../utils/mutations';


const Delete = () => {
    // QUERY_MATCHUPS | 
    const { loading, data } = useQuery(QUERY_MATCHUPS);
    const techList = data?.matchups || [];
    console.log(techList);

    // // QUERY_TECH |
    // const { loading, data } = useQuery(QUERY_TECH);
    // const techList = data?.tech || [];
    // console.log(techList);

    // SET THE INITIAL FORM STATE
    const [formData, setFormData] = useState({
        _id: 'foo',
    });

    // USED TO CREATE A NEW DYNAMIC PAGE
    let history = useHistory();

    // DELETEMATCHUP | Takes a unique string identifier to delete whatever
    const [deleteMatchup, { error }] = useMutation(DELETE_MATCHUP);

    //   const [createMatchup, { error }] = useMutation(CREATE_MATCHUP);

    // LOG FORM CHANGES
    const handleInputChange = (event) => {
        console.log('HANDLEINPUTCHANGE | Event.Target | Name & Value');
        console.log(event.target); // RETURNS THE <select tag> FROM DOCUMENT
        console.log(event.target.name); // EX | tech1
        console.log(event.target.value); // EX | Ayad

        const { name, value } = event.target;
        // formData contains both tech1 and tech2 and their respective values
        setFormData({[name]: value })
        console.log("HANDLEINPUTCHANGE | FormData");
        console.log(formData);
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        console.log("HANDLEFORMSUBMIT | Data | FormData");
        console.log(data); // An array of objects of matchups
        console.log(formData); // An object which contains the key value of the forms

        try {
            const { data } = await deleteMatchup({
                variables: { formData },
            });

        } catch (err) {
            console.error(err);
        }

        setFormData({
            _id: 'bar',
        });

    };

    return (
        <div className="card bg-white card-rounded w-25">
            <div className="card-header bg-dark text-center">
                <h1>Let's destroy a matchup!</h1>
            </div>
            <div className="card-body m-5">
                {loading ? (
                    <div>Loading...</div>
                ) : (
                    <form onSubmit={handleFormSubmit}>
                        <label>Matchup ID: </label>
                        <select name="_id" onChange={handleInputChange}>
                            {techList.map((tech) => {
                                return (
                                    <option key={tech._id} value={tech._id}>
                                        {tech.tech1 + " vs. " + tech.tech2}
                                    </option>
                                );
                            })}
                        </select>
                        <button className="btn btn-danger" type="submit">
                            DELETE MATCHUP!
                        </button>
                    </form>
                )}
            </div>
            {error && <div>Something went wrong...</div>}
        </div>
    );
};

export default Delete;