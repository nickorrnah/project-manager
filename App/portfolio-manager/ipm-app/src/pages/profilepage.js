import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import _ from 'lodash';
import PROJECT_LIST from '../data/portfolio-projects.json'; // Projects to display



// the function loads the selected information of the selected project 
export function LoadProjectProfile(props){

    const projectNameString = useParams().projectName;
    let project =  _.find(props.projectList, {name: projectNameString.replaceAll('-', ' ')});

    const img = project.img; 
    const name = project.name; 
    const description = project.description
    const className = project.course; 
    const hours = project.hours; 
    const grade = project.grade;

    // need to select the image and load 
    const projectImg = (
        <div>
            <img src={img}  className="rounded float-start" alt="Responsive img"></img>
        </div>
    );

    // need to select the project information in tag into list form 
    
    const projectInformation = (
        <div>
            <ul>
                <h2>{name} </h2>
                <li>Description: {description}</li>
                <li>Class: {className} </li>
                <li>Hours spent: {hours}</li>
                <li>Grade Received: {grade}</li>
            </ul>
        </div>
    );

    return (
        <div>
            <div className="row justify-content-evenly">
                <div className="projectImage">
                    {projectImg}
                </div>
            </div>
            <p></p>
            <div className="row justify-content-evenly">
                {projectInformation}
            </div>
        </div>
    )
}