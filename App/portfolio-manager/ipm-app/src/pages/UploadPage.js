import React, { useState, useRef } from "react";
import { getDatabase, ref, push as firebasePush, get, child } from "firebase/database";
import { getStorage, ref as storageRef, uploadBytes, getDownloadURL } from "firebase/storage";

export function ProjectUploadForm() {
    const [projName, setProjName] = useState("");
    const [projDescription, setProjDescription] = useState("");
    const [imgFile, setImgFile] = useState("");
    const [imgURL, setImgURL] = useState("");
    const [courseName, setCourseName] = useState("");
    const [projGrade, setProjGrade] = useState("");
    const [timeSpent, setTimeSpent] = useState("");

    const [resetTagsInput, setResetTagsInput] = useState(false);
    const [tags, setTags] = useState([]);

    function handleSubmit(event) {
        event.preventDefault();
        setResetTagsInput(true);
        alert("Thank you for submitting!");
        addProject(projName, courseName, projDescription, timeSpent, projGrade, imgFile);
        // Reset the form after submission
        setProjName("");
        setCourseName("");
        setProjDescription("");
        setTimeSpent("");
        setProjGrade("");
        setImgFile("");
        document.getElementById('formFile').value = '';
        
    }

    function handleKeyDown(event) {
        if (event.key === "Enter") {
          event.preventDefault(); // prevent form submission
        }
    }

    // Code adapted from lecture
    const handleChange = (event) => {
        if (event.target.files.length > 0 && event.target.files[0]) {
            const imgFile = event.target.files[0];
            setImgFile(imgFile);
            setImgURL(URL.createObjectURL(imgFile));
        }
    }

    // Code adapted from lecture
    const handleImageUpload = async (event) => {
        const storage = getStorage();
        const imgRef = storageRef(storage, "project-images/"+projName.replace(" ", "-")+".png");

        await uploadBytes(imgRef, imgFile);
        const publicURL= await getDownloadURL(imgRef);

        setImgURL(publicURL);
    }

    const handleTagsChange = (newTags) => {
        setTags(newTags);
    };

    const addProject = async (projName, courseName, projDescription, timeSpent, projGrade) => {
        const newProject = {
            "course": courseName,
            "description": projDescription,
            "grade": projGrade,
            "hours": timeSpent,
            "img": imgURL,
            "tags": tags,
            "name": projName,
        }

        const db = getDatabase();
        const allProjectsRef = ref(db, "projects");
        firebasePush(allProjectsRef, newProject, projName);

    }

    return (
    <div className="container-fluid">
        <div className="row">
            <div className="col">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label className="form-label">Project name</label>
                        <input className="form-control" value={projName} onChange={(event) => (setProjName(event.target.value))} required />
                    </div>
                    <div className="mb-3">
                        <label>Course name</label>
                        <input className="form-control" value={courseName} onChange={(event) => (setCourseName(event.target.value))} required/>
                    </div>
                    <div className="mb-3">
                        <label>Brief project description</label>
                        <textarea className="form-control" rows="6" value={projDescription} onChange={(event) => (setProjDescription(event.target.value))} required></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="grade" className="form-label">Percentage grade</label>
                        <select id="grade" name="grade" className="form-select" value={projGrade} onChange={(event) => (setProjGrade(event.target.value))} >
                            {Array.from({length: 101}, (_, i) => i).reverse().map(i => (
                                <option value={i} key={i}>{i}%</option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Hours spent on project</label>
                        <input type="number" id="number" name="number" className="form-control" pattern="[0-9]+" value={timeSpent} onChange={(event) => (setTimeSpent(event.target.value))} required/>
                        <div className="invalid-feedback">
                            Please enter an integer.
                        </div>
                    </div>
                    <div>
                        <label htmlFor="tags" className="form-label">Add tags associated with the project</label>
                        <TagsInput key={resetTagsInput} tags={[]} selectedTags={[]} onTagsChange={handleTagsChange} handleKeyDown={handleKeyDown} required/>
                    </div>
                    <br></br>
                    <div className="mb-3">
                        <label htmlFor="formFile" className="form-label">Upload a screenshot of your project</label>
                        <input className="form-control" type="file" id="formFile" accept = ".jpg, .png" onChange={handleChange} required/>
                    </div>
                    <div>
                        <button type="submit" onClick={handleImageUpload} className="btn btn-primary mb-3">Submit</button>
                    </div>
                </form>
            </div>
        </div>
        <footer className='mt-3 mb-0 profileFooter'>
                <p>&copy; 2023 Informatics Portfolio Manager</p>
        </footer>
    </div>
    );
}

function TagsInput(props) {
	const [tags, setTags] = useState(props.tags);
	const removeTags = indexToRemove => {
		setTags([...tags.filter((_, index) => index !== indexToRemove)]);
		props.onTagsChange(tags.filter((_, index) => index !== indexToRemove));
	};
	const addTags = event => {
		if (event.target.value !== "") {
			setTags([...tags, event.target.value]);
			props.onTagsChange([...tags, event.target.value]);
			event.target.value = "";
		}

	};

	return (
		<div key={props.key} className="tags-input">
			<ul id="tags">
				{tags.map((tag, index) => (
					<li key={index} className="tag">
						<span className='tag-title'>{tag+" "}</span>
						<span className='tag-close-icon'
							onClick={() => removeTags(index)}
						>
							 X
						</span>
					</li>
				))}
			</ul>
			<input
				type="text"
				onKeyDown={props.handleKeyDown}
				onKeyUp={event => event.key === "Enter" ? addTags(event) : null}
				placeholder="Press enter to add tags"
			/>
		</div>
	);
};
