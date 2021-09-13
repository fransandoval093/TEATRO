import React, { Component } from 'react';

class List extends Component {
    // Initialize the state | ORIG
    constructor(props) {
        super(props);
        this.state = {
            list: ['foo', 'bar', 'hello'],
            searchQuery: ""
        }
    }

    // FORM SUBMISSION | inputchange,buttonclick
    handleInputChanged(event) {
        this.setState({
            searchQuery: event.target.value
        });
    }
    handleButtonClicked() {
        var searchQuery = this.state.searchQuery;
        console.log(searchQuery);
        this.getList(searchQuery,2021)
    }

    // Fetch the list on first mount
    componentDidMount() {
        this.getList();
    }
    // Retrieves the list of items from the Express app
    getList = (ayad_mv_api, ayad_yr_api) => {
        fetch(`/api/getList?moviename=${ayad_mv_api}&movieyear=${ayad_yr_api}`)
            .then(res => res.json())
            .then(list => this.setState({ list }))
    }

    render() {
        const { list } = this.state;

        return (
            <div className="App">
                <h1>List of Items</h1>

                <div>
                    <input type="text" value={this.state.searchQuery} onChange={this.handleInputChanged.bind(this)}/>
                    <button onClick={this.handleButtonClicked.bind(this)}>
                    Submit
                </button>
                </div>

                {/* Check to see if any items are found*/}
                {list.length ? (
                    <div>
                        {/* Render the list of items */}
                        {list.map((item) => {
                            return (
                                <div>
                                    {/* <video autoplay src={item}> </video> */}
                                    <iframe title="My Daily Marathon Tracker"
                                        name="watch" id="IframeEmbed" height="100%" width="100%"
                                        allowfullscreen="" frameborder="0" scrolling="no" __idm_frm__="49"
                                        __idm_id__="324447233"
                                        src={item}></iframe>
                                </div>
                            );
                        })}
                    </div>
                ) : (
                    <div>
                        <h2>No List Items Found</h2>
                    </div>
                )
                }

            </div>
        );
    }
}

export default List;