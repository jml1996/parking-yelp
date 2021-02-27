import React, { useState, useEffect } from "react";
import Result from "./Result";
import yelpApiKey from "../config";

const initialFormValues = {
    searchVal: ""
}

function Results() {
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [formValues, setFormValues] = useState(initialFormValues);

    const search = evt => {
        evt.preventDefault()
        setResults([]);
        setLoading(true)
        const yelpApi = `https://api.yelp.com/v3/businesses/search?term=${"parking lot"}&location=${formValues.searchVal}`
        const proxyUrl = "https://cors-anywhere.herokuapp.com/"

        const options = {
            method: 'GET',
            headers: {
                "Authorization": `Bearer ${yelpApiKey}`,
                "Cookie": "__cfduid=db290300ecfe95ec1fe3bc92c388c3c991586618117",
                "Access-Control-Allow-Origin": "*"
            },
            redirect: 'follow'
        };
        fetch(proxyUrl + yelpApi, options)
        .then(response => {
            return response.text()
        })
        .then(result => {
            setLoading(false)
            const res = JSON.parse(result)
            setResults(res.businesses);
        })
        .catch(err => {
            setLoading(false)
            console.log(err)
        });
    }

    const handleChange = evt => {
        setFormValues({
            searchVal: evt.target.value
        })
    }

    return (
        <div style={{ textAlign: "center", marginBottom:0 }}>
            <h2 onClick={() => search()}>Lowest Rated Parking Lots</h2>
            <form onSubmit={search}>
                <label>
                    Search by location:
                    <br />
                    <input
                        name="search"
                        type="text"
                        value={formValues.searchVal}
                        onChange={handleChange}
                    />
                </label>
                <button>Search</button>
            </form>
            {
                loading ? (
                    <div>Loading...</div>
                ) : (
                    results.map((resultData, id) =>
                        <Result key={id} resultData={resultData} />
                    )
                )
            }
        </div>
    );
}

export default Results;