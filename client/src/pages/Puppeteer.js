import { useQuery, useMutation } from '@apollo/client';
import { useParams, Link } from 'react-router-dom';
import { CREATE_VOTE } from '../utils/mutations';
import { QUERY_MATCHUPS } from '../utils/queries';

import {puppeteer} from 'puppeteer';
const fs = require("fs");


const Puppeteer = () => {


    const puppet = async () => {
        try {
            // Initialize Puppeteer
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            // Specify comic issue page url
            await page.goto(
                "https://mycima.actor:2083/watch/%D9%85%D8%B4%D8%A7%D9%87%D8%AF%D8%A9-%D9%81%D9%8A%D9%84%D9%85-dont-breathe-2-2021-%D9%85%D8%AA%D8%B1%D8%AC%D9%85/"
            );
            console.log("page has been loaded!");
            const issueSrcs = await page.evaluate(() => {
                const srcs = Array.from(
                    document.querySelectorAll("btn")
                ).map((btn) => btn.getAttribute("data-url"));
                return srcs;
            });
            console.log("Page has been evaluated!");
            console.log(issueSrcs);

            // End Puppeteer
            await browser.close();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="card bg-white card-rounded w-50">
            <div className="card-header bg-dark text-center">
                <h1>Here is the PUPPET!</h1>
            </div>

                <div className="card-body text-center mt-3">
                    {/* <button className="btn btn-info" onClick={() => puppet}>
                        Vote for {matchup[0].tech1}
                    </button>{' '} */}
                    <div className="card-footer text-center m-3">
                        <br></br>
                        <Link to="/">
                            <button className="btn btn-lg btn-danger">
                                View all matchups
                            </button>
                        </Link>
                    </div>
                </div>
        </div>
    );
};

export default Puppeteer;