import React, { useState } from 'react'; // General React import

import { Link } from 'react-router-dom';

import Dropdown from 'react-bootstrap/Dropdown'; // Import for dropdown
import DropdownButton from 'react-bootstrap/DropdownButton'; // Import for dropdown button

function SortButton(props) {

    function handleClickGradeA(event) {
        console.log("Sorting by: " + event.target);
        props.sortCallback('gradeA');
    }

    function handleClickGradeB(event) {
        console.log("Sorting by: " + event.target);
        props.sortCallback('gradeB');
    }

    function handleClickTimeA(event) {
        console.log("Sorting by: " + event.target);
        props.sortCallback('timeA');
    }

    function handleClickTimeB(event) {
        console.log("Sorting by: " + event.target);
        props.sortCallback('timeB');
    }

    function handleClickNone(event) {
        console.log("Sorting by: " + event.target);
        props.sortCallback('');
    }

    return (
        <DropdownButton id="sort-button" title="Sort By">
            <Dropdown.Item href="#/action-1" onClick={handleClickGradeA}>Grade (Ascending)</Dropdown.Item>
            <Dropdown.Item href="#/action-2" onClick={handleClickGradeB}>Grade (Descending)</Dropdown.Item>
            <Dropdown.Item href="#/action-3" onClick={handleClickTimeA}>Time Spent (Ascending)</Dropdown.Item>
            <Dropdown.Item href="#/action-4" onClick={handleClickTimeB}>Time Spent (Descending)</Dropdown.Item>
        </DropdownButton>
    );
}
 
// ProjectCard builds a single card for a project.
// Each card needs the following props: img, name, description, tags, page.
function ProjectCard(props) {

    const img = props.img;
    const projectName = props.name;                             // The name/title of the project (string)
    const projectCourse = props.course;                         // The course that the project is for (string)
    const projectHours = props.hours;                           // The amount of time in hours spent working on the project (number)
    const projectGrade = props.grade;                           // The grade the project received *scaling format tbd* (number)
    const projectPageName = projectName.replaceAll(' ', '-');   // The name of the project's details page (string)
    
    // This element renders the Learn More button
    // The button is actually a link that renders the /profile page
    // On the render call, it passes in all of the projects props
    const projectPage = (
        <Link className="btn btn-dark align-self-end" to={"/search/"+projectPageName}>
            Learn More
        </Link>
    );    

    return (
        <div className="card" key={projectName}>
            <img className="card-img-top" src={img} alt={projectName} />
            <div className="card-body">
                <h3 className="card-title">{projectName}</h3>
                <p className="card-text">{projectCourse}</p>
                <p className="card-text">Grade received: {projectGrade}%</p>
                <p className="card-text">Hours spent: {projectHours}</p>
                <div className="projectPageButton">
                    {projectPage}
                </div>
            </div>
        </div>
    );
}

function SearchBar(props) {

    const [searchInput, setSearchInput] = useState("");         // State variable for searchBar

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(searchInput);
        props.searchCallback(searchInput);
    };

    const handleChange = (event) => {
        event.preventDefault();
        setSearchInput(event.target.value);
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="search-bar">
                <input
                    type="text"
                    id="header-search"
                    placeholder="Search by project name or tag"
                    onChange={handleChange}
                    name="s" 
                />
                <button className="btn btn-dark align-self-end" id="search-button" type="submit">Search</button>
            </div>
        </form>
    )
}

// CardList renders out an array of card objects to the screem
// This function needs the prop: deck
// deck should be an array of card objects
export default function CardList(props) {

    const cardDeck = props.projectList;    // The array of cards to be rendered (Array of: card objects)

    // Map the cards in cardDeck into JSX elements
    const renderableCardDeck = cardDeck.map((card) => {
        return ProjectCard(card);
    });

    return (
        <div>
            <main>
                <div className="banner">
                    <h1>Search for Projects</h1>
                </div>
                <SearchBar searchCallback={props.searchCallback} />
                <h2>Results:</h2>
                <div className="sort">
                    <SortButton sortCallback={props.sortCallback} />
                </div>
                <div className="results">
                    <section>
                        <div className="container">
                            {renderableCardDeck}
                        </div>
                    </section>
                </div>
            </main>
        </div>
    );
}