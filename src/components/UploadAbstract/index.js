import React, { useEffect, useState } from "react";
import "./index.css"; // Import CSS file for custom styling
import Header from "../Header";
import Cookies from "js-cookie";
import TagCard from "../TagCard";
import { v4 as uuidv4 } from "uuid";

import statusOptions from "../../constants/statusOptions";

import getAllTags from "../../services/apiRequests/getAllTags";

const UploadAbstract = () => {
  // useState hooks
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    selectedTag: "",
    selectedTagId : "",
    newTag: "",
    file: null,
  });

  const [tagsList, setTagsList] = useState([]);
  const [titleError, setTitleError] = useState("");
  const [descriptionError, setDescriptionError] = useState("");
  const [formError, setFormError] = useState("");
  const [isCreateTag, setIsCreateTag] = useState(false);

  // useEffect hook to fetch tags list from backend
  useEffect(() => {
    const setData = async () => {
      const data = await getAllTags();
      if (data === undefined || data === null)
        return console.log("Error in fetching tags");
      setTagsList(data);
      if (data.length > 0) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          selectedTag: data[0].title,
          selectedTagId: data[0]._id,
        }));
      }
    };
    setData();
  }, []);

  // handleDescChange function to handle description change
  const handleDescChange = (event) => {
    const { value } = event.target;
    if (value.length > 300)
      setDescriptionError("Description cannot exceed 300 characters.");
    else {
      setDescriptionError("");
      setFormData((prevFormData) => ({ ...prevFormData, description: value }));
    }
  };
  // handleTitleChange function to handle title change
  const handleTitleChange = (event) => {
    const { value } = event.target;
    if (value.length > 50) setTitleError("Title cannot exceed 50 characters.");
    else {
      setTitleError("");
      setFormData((prevFormData) => ({ ...prevFormData, title: value }));
    }
  };

  // handleFileChange function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    console.log(file);
    if (file.type !== "application/pdf") {
      alert("Please upload a PDF file");
      return;
    }
    setFormData((prevFormData) => ({ ...prevFormData, file: file }));
  };

  // handleTagChange function to handle tag change
  const handleTagChange = (e) => {
    setFormData((prevFormData) => ({ ...prevFormData, selectedTag:e.target.value , selectedTagId: e.target.key}));
  };

  // onClickAddTag function to handle adding tags to the user's selected tags list
  const onClickAddTag = () => {
    const { selectedTag, tags , selectedTagId} = formData;
    const newTag = {
      id: selectedTagId,
      title: selectedTag,
    };
    let isTagInTagsList = tags.some((tag) => tag.title === selectedTag);
    if (selectedTag !== "" && !isTagInTagsList) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        tags: [...prevFormData.tags, newTag],
      }));
    }
  };

  // handleSubmit function to handle form submission and send the data to the backend
  const handleSubmit = async (event) => {
    event.preventDefault();
    const { title, description, tags } = formData;
    if (title === "" || tags.length === 0 || description === "") {
      setFormError("Please enter all the feilds");
      return;
    }
    const updatedTags = tags.map((tag) => tag.id);
    const paperDetails = {
      title: title,
      description: description,
      status: statusOptions.pending,
      tags: updatedTags,
    };
    console.log(paperDetails);
    setFormData({
      title: "",
      description: "",
      tags: [],
      selectedTag: "",
    });
    const jwtToken = Cookies.get("jwt_token");
    const url = "http://localhost:8082/api/papers/new-paper/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify(paperDetails),
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      console.log(data);
      const paperId = data._id;
      if (response.ok) {
        alert("Paper submitted successfully");
        await sendPdf(paperId);
        return;
      } else {
        alert("Error in submitting the paper");
        return;
      }
    } catch (error) {
      console.log("err msg : ", error.message);
    }
  };

  const sendPdf = async (paperId) => {
    const { file } = formData;
    const pdfData = new FormData();
    pdfData.append("pdf-file", file);
    const jwtToken = Cookies.get("jwt_token");
    const url = `http://localhost:8082/api/docs/upload/${paperId}`;
    const options = {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      body: pdfData,
    };
    try {
      const response = await fetch(url, options);
      console.log("upload pdf response object : ", response);
      // const data = await response.json();
      // console.log(data);
      if (response.ok) {
        alert("PDF uploaded successfully");
        return;
      } else {
        alert("Error in uploading the PDF");
        return;
      }
    } catch (error) {
      console.log("err msg : ", error.message);
    }
  };
  // onDeleteTag function to handle deleting tags from the user's selected tags list
  const onDeleteTag = (id) => {
    const { tags } = formData;
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setFormData((prevFormData) => ({ ...prevFormData, tags: updatedTags }));
  };

  const onClickCreateTag = () => setIsCreateTag((prev) => !prev);

  const onClickNewTagApi = async () => {
    const { newTag } = formData;
    setTagsList((prevTagsList) => [
      ...prevTagsList,
      { id: uuidv4(), title: newTag },
    ]);
    const jwtToken = Cookies.get("jwt_token");
    const url = "http://localhost:8082/api/tags/add/";
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${jwtToken}`,
      },
      body: JSON.stringify({ title: newTag }),
    };
    try {
      const response = await fetch(url, options);
      console.log(response);
      const data = await response.json();
      console.log(data);
      if (response.ok) {
        alert("Tag created successfully");
        setFormData((prevFormData) => ({
          ...prevFormData,
          newTag: "",
        }));
        return;
      } else {
        alert("Error in creating the tag");
        return;
      }
    } catch (error) {
      console.log("err msg : ", error.message);
    }
  };

  const renderTitleField = () => {
    const { title } = formData;
    return (
      <>
        <label className="input-label" htmlFor="email">
          Title
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={title}
          onChange={handleTitleChange}
          placeholder="Title"
        />
      </>
    );
  };

  const renderDescField = () => {
    const { description } = formData;
    return (
      <>
        <label className="input-label" htmlFor="email">
          Description
        </label>
        <input
          type="text"
          id="email"
          className="username-input-field"
          value={description}
          onChange={handleDescChange}
          placeholder="Description"
        />
      </>
    );
  };

  const renderPdfField = () => {
    return (
      <>
        <label className="input-label" htmlFor="pdf-file">
          Upload PDF*:
        </label>
        <input
          type="file"
          id="pdf-file"
          name="pdf-file"
          accept=".pdf"
          className="username-input-field"
          onChange={handleFileChange}
          placeholder="Upload PDF"
        />
      </>
    );
  };

  const renderCreateTagField = () => {
    const { newTag } = formData;
    return (
      <div className="create-tag-container">
        <div className="mt-3">
          {/* <label className="input-label" htmlFor="create-tag">
              New Tag
            </label> */}
          <input
            type="text"
            id="create-tag"
            className="username-input-field"
            value={newTag}
            onChange={(e) =>
              setFormData((prevFormData) => ({
                ...prevFormData,
                newTag: e.target.value,
              }))
            }
            placeholder="New Tag"
          />
        </div>
        <button
          type="button"
          className="btn btn-primary mt-3 ml-3 font-bold bg-sky-600"
          onClick={onClickNewTagApi}
        >
          Create Tag
        </button>
      </div>
    );
  };

  return (
    <>
      <Header />
      <form className="my-form" onSubmit={handleSubmit}>
        <h1 className="fw-900 text-3xl font-bold cursor-not-allowed">
          Submit Paper
        </h1>
        <div className="input-container">
          {renderTitleField()}
          {titleError && <p className="text-danger">{titleError}</p>}
        </div>

        <div className="input-container">
          {renderDescField()}
          {descriptionError && (
            <p className="text-danger">{descriptionError}</p>
          )}
        </div>

        <div className="input-container">{renderPdfField()}</div>

        <div className="mb-3 d-flex flex-column justify-content-space-center align-class">
          <label className="form-label">Add Tags :</label>
          {tagsList.length > 0 ? (
            <select
              className="form-control"
              name="selectedTag"
              value={formData.selectedTag}
              onChange={handleTagChange}
            >
              {tagsList.map((tag) => (
                <option key={tag._id} value={tag.title}>
                  {tag.title}
                </option>
              ))}
            </select>
          ) : (
            // Can add some loader here
            <p>Loading the Tags</p>
          )}

          <div className="flex flex-row justify-center">
            <button
              type="button"
              className="btn btn-outline-primary mt-3"
              onClick={onClickAddTag}
            >
              Add
            </button>
            <button
              type="button"
              className="btn btn-outline-primary mt-3 ml-3"
              onClick={onClickCreateTag}
            >
              {isCreateTag ? "Close" : "Create Tag"}
            </button>
          </div>
          {isCreateTag && renderCreateTagField()}
        </div>
        {/* displaying the selected tags */}
        <ul className="tags-list-group">
          {formData.tags.map((tag) => (
            <TagCard deleteTag={onDeleteTag} key={tag.id} tag={tag} />
          ))}
        </ul>

        <button type="submit" className="btn btn-primary bg-sky-600 font-bold ">
          {" "}
          Submit{" "}
        </button>
        <p className="text-rose-700">* feilds are compulsory </p>
        {formError && <p className="error-msg">{formError}</p>}
      </form>
    </>
  );
};

export default UploadAbstract;
