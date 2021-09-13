import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQuery } from '@apollo/client';
import { QUERY_TECH } from '../utils/queries';
import { CREATE_MATCHUP } from '../utils/mutations';

const Mylist = () => {

  let history = useHistory();
  const [createMatchup, { error }] = useMutation(CREATE_MATCHUP);
  const { loading, data } = useQuery(QUERY_TECH);
  const techList = data?.tech || [];
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([])
  const [formData, setFormData] = useState({
    tech1: 'JavaScript',
    tech2: 'JavaScript',
  });

  // FORM SUBMISSION | inputchange,buttonclick
  const handleInputChange = (event) => {
    console.log("INPUT CHANGE | target :", event.target);
    console.log("INPUT CHANGE | target.value :", event.target.value);

    const { name, value } = event.target;
    // formData contains both tech1 and tech2 and their respective values
    setFormData({ ...formData, [name]: value });
    setSearchQuery(event.target.value);
  };

  const handleButtonClicked = async () => {
    console.log(searchQuery);
    const searchList = await getList(searchQuery, 2021)
    setSearchResults(searchList);
    console.log(searchResults)
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await createMatchup({
        variables: { ...formData },
      });

      history.push(`/matchup/${data.createMatchup._id}`);
    } catch (err) {
      console.error(err);
    }

    setFormData({
      tech1: 'JavaScript',
      tech2: 'JavaScript',
    });


  };

  const formatYear = (str, n) => {
    return str?.length > n ? str.slice(0, 4) + "" : str;
  };
  // TODO: fix regex pattern to search and remove apostrophes _'_ from string
  const formatHyphen = (punctuatedString) => {
    // var s = ", -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation";
    var s = punctuatedString
    var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}\'=\-_`~()]/g, "");
    var finalString = punctuationless.replace(/\s{2,}/g, " ");
    var hyphenedString = finalString.replaceAll(" ", "-").toLowerCase();
    return hyphenedString
  };

  // Retrieves the list of items from the Express app
  const getList = async (movieQuery, yearQuery) => {

    const parsedMovieString = await fetch(`/api/getList?moviename=${formatHyphen(movieQuery)}&movieyear=${formatYear(yearQuery)}`)
      .then(res => res.json())
      .then(list => setSearchResults(list))
  }

  return (

    <div className="App">

      <div className="card bg-white card-rounded w-50">

        <div className="card-header bg-dark text-center">
          <h1>SEARCH</h1>
        </div>

        <div className="card-body m-5">
          <input type="text" value={searchQuery} onChange={handleInputChange} />
          <hr></hr>
          <button className="btn btn-danger" onClick={handleButtonClicked}>
            Submit
          </button>
        </div>

        <h3>List of Links</h3>
        <div className="card-body m-5">
          {searchResults ? (
            <form onSubmit={handleFormSubmit}>
              <label>List: </label>
              <select name="links" onChange={handleInputChange}>
                {searchResults.map((item) => {
                  return (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  );
                })}
              </select>
            </form>
          ) : (
            <div>Loading...</div>
          )}
        </div>

      </div>


      <div className="card bg-white card-rounded w-50">

        <div className="card-header bg-dark text-center">
          <h1>Let's create a matchup!</h1>
        </div>

        <div className="card-body m-5">
          {loading ? (
            <div>Loading...</div>
          ) : (
            <form onSubmit={handleFormSubmit}>
              <label>Tech 1: </label>
              <select name="tech1" onChange={handleInputChange}>
                {techList.map((tech) => {
                  return (
                    <option key={tech._id} value={tech.name}>
                      {tech.name}
                    </option>
                  );
                })}
              </select>
              <label>Tech 2: </label>
              <select name="tech2" onChange={handleInputChange}>
                {techList.map((tech) => {
                  return (
                    <option key={tech._id} value={tech.name}>
                      {tech.name}
                    </option>
                  );
                })}
              </select>
              <button className="btn btn-danger" type="submit">
                Create MATCHUP!
              </button>
            </form>
          )}
        </div>

        {error && <div>Something went wrong...</div>}

      </div>

    </div>

  );
};
export default Mylist;

// "++++++++++++++++++++++++++++++++++++++++++++++++"
// FORM HANDLER

// ismport React from 'react';

// export default class FormSubmission extends React.Component {
//   constructor(props) {
//     super(props);

//     state = {
//       searchQuery: "",

//     }
//   }

//   handleInputChanged(event) {
//     setState({
//       searchQuery: event.target.value
//     });
//   }

//   handleButtonClicked() {
//     var searchQuery = state.searchQuery;
//     console.log(searchQuery);
//     // window.location.href = "https://youtube.com/results?search_query" + searchQuery;
//     getList(searchQuery);
//   }

//   stringHandler(str) {
//     return str.replaceAll(" ", "-").toLowerCase();
//   }

//   year(str, n) {
//     return str?.length > n ? str.slice(0, 4) + "" : str;
//   }


//   formatHyphen(punctuatedString) {
//     // var s = ", -/ is #! an $ % ^ & * example ;: {} of a = -_ string with `~)() punctuation";
//     var s = punctuatedString
//     var punctuationless = s.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
//     var finalString = punctuationless.replace(/\s{2,}/g, " ");
//     var hyphenedString = finalString.replaceAll(" ", "-").toLowerCase();
//     return hyphenedString
//   }

//   getList = (bodyody) => {
//     var options = { method: 'POST', body: JSON.stringify(bodyody) }
//     fetch(`/foobar`, options)
//       .then(res => res.json())
//       .then(list => setState({ list }))

//     var options = {
//       method: 'POST', // or 'PUT'
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(bodyody),
//     }

//     const data = { username: 'example' };

//     fetch('/foobar', options)
//       .then(response => response.json())
//       .then(data => {
//         console.log('Success:', data);
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });



//   }

//   render() {
//     return (
//       <div>
//         <input type="text" value={state.searchQuery} onChange={handleInputChanged.bind(this)} />
//         <button onClick={handleButtonClicked.bind(this)}>
//           Submit
//         </button>
//       </div>
//     );
//   }

// };
// "++++++++++++++++++++++++++++++++++++++++++++++++"