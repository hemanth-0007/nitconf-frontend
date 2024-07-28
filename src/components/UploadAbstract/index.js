import React, { useEffect, useState } from "react";
import "./index.css"; // Import CSS file for custom styling
import TagCard from "../TagCard";
import { v4 as uuidv4 } from "uuid";
import deletePaper from "../../services/apiRequests/deletePaper";
import uploadPaper from "../../services/apiRequests/uplaodPaper";
import sendPdf from "../../services/apiRequests/sendPdf";

import useNotification from "../../hooks/use-notification";

import { object, string, array, mixed } from "yup";

const UploadAbstract = () => {

  const {NotificationComponent, triggerNotification} =
  useNotification("top-right");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: [],
    newTag: "",
    file: null,
  });

  const [errors, setErrors] = useState({});

  const validateForm = object({
    title: string()
      .required("Title is required")
      .min(5, "Title must be at least 5 characters")
      .max(50, "Title cannot exceed 50 characters")
      .matches(/^[a-zA-Z\s]*$/, "Title must be contain only alphabets"),
    description: string()
      .required("Description is required")
      .min(10, "Description must be at least 10 characters")
      .max(300, "Description cannot exceed 300 characters")
      .matches(/^[a-zA-Z\s]*$/, "Description must be contain only alphabets"),
    tags: array()
      .min(1, "Minimum one tag is  required")
      .max(5, "Maximum 5 tags are allowed"),
    file: mixed().required("File is required"),
  });

  const validateNewTag = object({
    newTag: string()
      .required("Tag cannot be empty")
      .min(5, "Tag must be at least 5 characters")
      .max(30, "Tag cannot exceed 30 characters")
      .matches(/^[a-zA-Z\s]*$/, "Tag must be contain only alphabets"),
  });

  // handleFileChange function to handle file change
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // console.log(file);
    // get the size of the file
    const fileSize = file.size / 1024 / 1024; // in MB
    if (fileSize > 5) {
      setErrors((prev) => ({
        ...prev,
        file: "File size should be less than 5MB",
      }));
      return;
    }
    if (file.type !== "application/pdf") {
      setErrors((prev) => ({ ...prev, file: "Please upload a pdf file" }));
      return;
    }
    setErrors((prev) => ({ ...prev, file: "" }));
    setFormData((prev) => ({ ...prev, file: file }));
  };

  // handleSubmit function to handle form submission and send the data to the backend

  const handleSubmit = async (event) => {
    console.log("submitting the form");
    event.preventDefault();
    // set the isSubmit to true

    // get the form data
    const { title, description, tags, file } = formData;
    // validate the form with yup
    try {
      await validateForm.validate(formData, { abortEarly: false });
      console.log("Form is valid");
    } catch (error) {
      const newErrors = {};
      console.log(error.inner);
      error.inner.forEach((err) => {
        newErrors[err.path] = err.message;
      });
      setErrors(newErrors);
      return;
    }

    const updatedTags = tags.map((tag) => tag.title);
    const paperDetails = {
      title,
      description,
      tags: updatedTags,
    };
    console.log(paperDetails);
    const [status, data] = await uploadPaper(paperDetails);
    if (!status) {
      console.log(data);
      return;
    }
    const paperId = data._id;
    // console.log(paperId);
    const isPdfUploaded = await sendPdf(file, paperId, "Initial Upload");
    if (!isPdfUploaded) {
      console.log("Error in uploading the pdf");
      const [isDeleted, data] = await deletePaper(paperId);
      const {message} = data;
      if (!isDeleted) {
        console.log(message);
        console.log("Error in deleting the paper");
        return;
      }
      console.log(message);
      console.log("Paper deleted successfully");
      return;
    }
    // clear the form data
    setFormData({
      title: "",
      description: "",
      tags: [],
      newTag: "",
      file: null,
    });
    setErrors({});
    triggerNotification({
      type: "success",
      message: `Paper submitted successfully.`,
      duration: 3000,
      animation: "pop",
    })
    return;
  };

  // onDeleteTag function to handle deleting tags from the user's selected tags list
  const onDeleteTag = (id) => {
    const { tags } = formData;
    const updatedTags = tags.filter((tag) => tag.id !== id);
    setFormData((prev) => ({ ...prev, tags: updatedTags }));
  };

  const onClickAddTag = async () => {
    const { newTag, tags } = formData;
    try {
      await validateNewTag.validate({ newTag }, { abortEarly: false });
      setErrors((prev) => ({ ...prev, newTag: "" }));
    } catch (error) {
      setErrors((prev) => ({ ...prev, newTag: error.inner[0].message }));
      return;
    }
    const MAX_TAGS = 2;
    if(tags.length >= MAX_TAGS){
      triggerNotification({
        type: "error",
        message: `Tags cannot be more than ${MAX_TAGS}.`,
        duration: 3000,
        animation: "pop",
      })
      // setErrors( prev => ({ ...prev, newTag: `Tags cannot be more than ${MAX_TAGS}.`}));
      return;
    }
    // add the new tag to the tags list
    const updatedTags = [...tags, { id: uuidv4(), title: newTag }];

    setFormData((prev) => ({ ...prev, tags: updatedTags, newTag: "" }));
  };

  // This section is for the Render functions

  const renderTitleField = () => {
    return (
      <>
        <label className="input-label" htmlFor="title">
          Title*
        </label>
        <input
          type="text"
          id="title"
          className="text-lg font-semibold p-3
          border-2 border-gray-300 rounded-lg m-3 w-80
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={formData.title}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, title: e.target.value }))
          }
          placeholder="Title"
          autoComplete={false}
        />
      </>
    );
  };

  const renderDescField = () => {
    return (
      <>
        <label className="input-label" htmlFor="description">
          Description*
        </label>
        <input
          type="text"
          id="description"
          className="text-lg font-semibold p-3
          border-2 border-gray-300 rounded-lg m-3 w-80
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          value={formData.description}
          onChange={(e) =>
            setFormData((prev) => ({ ...prev, description: e.target.value }))
          }
          placeholder="Description"
        />
      </>
    );
  };

  const renderPdfField = () => {
    return (
      <>
        <label className="input-label" htmlFor="pdf-file">
          upload (PDF)*:
        </label>
        <input
          type="file"
          id="pdf-file"
          name="pdf-file"
          accept=".pdf"
          className="text-lg font-semibold p-3
          border-2 border-gray-300 rounded-lg m-3 w-80
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
          onChange={handleFileChange}
          placeholder="Upload PDF"
        />
      </>
    );
  };

  const renderCreateTagField = () => {
    return (
      <div className="mt-3 mb-3 flex flex-row justify-between">
        <div className="flex flex-col justify-start">
          <label className="input-label" htmlFor="create-tag">
            Add Tag
          </label>
          <input
            type="text"
            id="create-tag"
            className="text-lg font-semibold p-3
                  border-2 border-gray-300 rounded-lg m-3 w-80
                  focus:border-blue-500 focus:ring-1 focus:ring-blue-500 focus:outline-none"
            value={formData.newTag}
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, newTag: e.target.value }))
            }
            placeholder="Add Tag"
          />
        </div>
        <button
          type="button"
          className="bg-blue-600 font-semibold mr-2 rounded-full px-4 py-2 text-white 
                      hover:bg-blue-700 transition-all duration-300 ease-in-out"
          onClick={onClickAddTag}
        >
          Add Tag
        </button>
      </div>
    );
  };

  return (
    <>
      
      {NotificationComponent}
      <h1 className="fw-900 text-center text-3xl font-bold cursor-not-allowed">
        Submit Paper
      </h1>
      <form className="my-form" onSubmit={handleSubmit}>
        <div className="input-container">
          {renderTitleField()}
          {errors.title && <p className="text-red-600 font-sans text-lg">*{errors.title}</p>}

        </div>

        <div className="input-container">
          {renderDescField()}
          {errors.description && <p className="text-red-600 font-sans text-lg">*{errors.description}</p>}

        </div>

        <div className="input-container">
          {renderPdfField()}
          {errors.file && <p className="text-red-600 font-sans text-lg">*{errors.file}</p>}
        </div>

        {/* This is create tag section */}
        {/* <div className="mb-3 d-flex flex-column justify-content-space-center align-class">
          <div className="flex flex-row justify-center">
            {renderCreateTagField()}
          </div>
        </div> */}
        <div className="input-container">
          {renderCreateTagField()}
          {errors.newTag && <p className="text-red-600 font-sans text-lg">*{errors.newTag}</p>}

        </div>

        {/* displaying the selected tags */}
        <ul className="tags-list-group">
          {formData.tags.map((tag) => (
            <TagCard key={tag.id} tag={tag} deleteTag={onDeleteTag} />
          ))}
        </ul>

        <button
          type="submit"
          className="bg-blue-600 font-semibold mr-2 rounded-full px-4 py-2 text-white 
                      hover:-translate-y-1 transition-all duration-300 ease-in-out"
        >
          Submit
        </button>
        <p className="text-red-600 font-sans text-lg">*feilds are compulsory </p>
      </form>
    </>
  );
};

export default UploadAbstract;
