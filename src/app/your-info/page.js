"use client";
import React, { useEffect, useState } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { ResumeValidation } from "./ResumeValidation";
import { useRouter } from "next/navigation";
import useGetUserInfo from "../hooks/getUserInfo";

const page = () => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(ResumeValidation()),
    mode: "onChange",
    defaultValues: {
      education: [{ schoolName: "", degree: "", startDate: "", endDate: "" }],
      skills: [{ skillName: "" }],
      experience: [
        { jobTitle: "", companyName: "", startDate: "", endDate: "" },
      ],
      project: [{ title: "", description: "" }],
    },
  });
  const {
    fields: educationField,
    append: appendEducation,
    remove: removeEducation,
  } = useFieldArray({
    control,
    name: "education",
  });
  const {
    fields: skillsField,
    append: appendSkills,
    remove: removeSkills,
  } = useFieldArray({
    control,
    name: "skills",
  });
  const {
    fields: experienceField,
    append: appendExperience,
    remove: removeExperience,
  } = useFieldArray({
    control,
    name: "experience",
  });

  const {
    fields: projectField,
    append: appendProject,
    remove: removeProject,
  } = useFieldArray({
    control,
    name: "project",
  });

  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { userDetails } = useGetUserInfo();

  useEffect(() => {
    reset(userDetails?.details);
  }, [userDetails]);

  // ------------------ submit handler ---------------

  const submitHandler = async (data) => {
    setLoading(true);
    try {
      const docRef = doc(db, "resume", "one");
      const updateData = await setDoc(docRef, {
        data,
      });
      console.log("Data updated", updateData);
      router.push("/your-resume");
    } catch (e) {
      console.error("Error adding document: ", e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="text-gray-600 body-font relative">
      <div className="container px-5 py-24 mx-auto">
        <div className="flex flex-col text-center w-full mb-12">
          <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">
            Create Your Resume
          </h1>
        </div>
        <form onSubmit={handleSubmit(submitHandler)}>
          {/* Personal Detail */}

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Personal Details
            </h1>
            <div className="flex flex-wrap -m-2">
              {/* ----------- first name ---------- */}

              <div className="p-2 w-1/2">
                <Controller
                  name="firstName"
                  control={control}
                  defaultValue={""}
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor="firstName"
                        className="leading-7 text-sm text-gray-600"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.firstName && (
                  <span className="text-red-600">
                    {" "}
                    {errors?.firstName?.message}
                  </span>
                )}
              </div>

              {/* ----------- last name ---------- */}

              <div className="p-2 w-1/2">
                <Controller
                  name="lastName"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor="lastname"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        id="lastname"
                        name="lastname"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.lastName && (
                  <span className="text-red-600">
                    {" "}
                    {errors?.lastName?.message}
                  </span>
                )}
              </div>

              {/* ----------- Email ---------- */}

              <div className="p-2 w-1/2">
                <Controller
                  name="email"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor="email"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.email && (
                  <span className="text-red-600">
                    {" "}
                    {errors?.email?.message}
                  </span>
                )}
              </div>

              {/* ----------- Mobile number ---------- */}

              <div className="p-2 w-1/2">
                <Controller
                  name="mobileNumber"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor="mobileNumber"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Mobile Number
                      </label>
                      <input
                        type="text"
                        id="mobileNumber"
                        name="mobileNumber"
                        maxLength={10}
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.mobileNumber && (
                  <span className="text-red-600">
                    {" "}
                    {errors?.mobileNumber?.message}
                  </span>
                )}
              </div>

              {/* ----------- role ---------- */}

              <div className="p-2 w-full">
                <Controller
                  name="role"
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor="role"
                        className="leading-7 text-sm text-gray-600"
                      >
                        Role
                      </label>
                      <input
                        type="text"
                        id="role"
                        name="role"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                        {...field}
                      />
                    </div>
                  )}
                />
                {errors?.role && (
                  <span className="text-red-600"> {errors?.role?.message}</span>
                )}
              </div>

              {/* ----------- About Me ---------- */}

              <div className="p-2 w-full">
                <Controller
                  name={"aboutMe"}
                  control={control}
                  defaultValue=""
                  render={({ field }) => (
                    <div className="relative">
                      <label
                        htmlFor={"aboutMe"}
                        className="leading-7 text-sm text-gray-600"
                      >
                        About Me
                      </label>
                      <textarea
                        id={"aboutMe"}
                        name="aboutMe"
                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                        {...field}
                      ></textarea>
                    </div>
                  )}
                />
                {errors?.aboutMe && (
                  <span className="text-red-600">
                    {" "}
                    {errors?.aboutMe?.message}
                  </span>
                )}
              </div>
            </div>
          </div>
          <br />

          {/* Education Detail */}

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Education
            </h1>

            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() =>
                appendEducation({
                  schoolName: "",
                  degree: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              <svg
                className="w-6 h-6 text-white-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              <span className="text-sm px-3">Add Education</span>
            </button>

            {educationField?.map((data, index) => (
              <div className="flex flex-wrap -m-2 p-2" key={data?.id}>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`education[${index}].schoolName`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`education[${index}].schoolName`}
                          className="leading-7 text-sm text-gray-600 p-2"
                        >
                          School/College Name
                        </label>
                        <input
                          type="text"
                          id={`education[${index}].schoolName`}
                          name="schoolName"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.education?.[index]?.schoolName && (
                    <span className="text-red-600">
                      {errors?.education?.[index]?.schoolName?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`education[${index}].degree`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`education[${index}].degree`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Degree
                        </label>
                        <input
                          type="text"
                          id={`education[${index}].degree`}
                          name="degree"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.education?.[index]?.degree && (
                    <span className="text-red-600">
                      {errors?.education?.[index]?.degree?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`education[${index}].startDate`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`education[${index}].startDate`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id={`education[${index}].startDate`}
                          name="startDate"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.education?.[index]?.startDate && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.education?.[index]?.startDate?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`education[${index}].endDate`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`education[${index}].endDate`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id={`education[${index}].endDate`}
                          name="endDate"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.education?.[index]?.endDate && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.education?.[index]?.endDate?.message}
                    </span>
                  )}
                </div>
                {educationField?.length > 1 && (
                  <div className="p-3">
                    <button
                      type="button"
                      className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => removeEducation(index)}
                    >
                      <svg
                        className="w-6 h-6 text-white-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm px-3">Remove Education</span>
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
          <br />

          {/* Skills Detail */}

          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Skills
            </h1>
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => appendSkills("")}
            >
              <svg
                className="w-6 h-6 text-white-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              <span className="text-sm px-3">Add Skills</span>
            </button>
            {skillsField?.map((data, index) => (
              <div className="flex flex-wrap -m-2 p-2" key={data?.id}>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`skills[${index}].skillName`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`skills[${index}].skillName`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Skills Name
                        </label>
                        <input
                          type="text"
                          id={`skills[${index}].skillName`}
                          name="skills"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.skills?.[index]?.skillName && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.skills?.[index]?.skillName?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2 mt-8">
                  {skillsField?.length > 1 && (
                    <button
                      type="button"
                      className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      onClick={() => removeSkills(index)}
                    >
                      <svg
                        className="w-6 h-6 text-white-800 dark:text-white"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-sm px-3"> Remove Skills</span>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
          <br />
          {/* Experience Detail */}
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Experience
            </h1>
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() =>
                appendExperience({
                  jobTitle: "",
                  companyName: "",
                  startDate: "",
                  endDate: "",
                })
              }
            >
              <svg
                className="w-6 h-6 text-white-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>
              <span className="text-sm px-3">Add Experience</span>
            </button>
            {experienceField?.map((data, index) => (
              <div className="flex flex-wrap -m-2 p-2" key={data?.id}>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`experience[${index}].jobTitle`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`experience[${index}].jobTitle`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Job Title
                        </label>
                        <input
                          type="text"
                          id={`experience[${index}].jobTitle`}
                          name="jobTitle"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.experience?.[index]?.jobTitle && (
                    <span className="text-red-600">
                      {errors?.experience?.[index]?.jobTitle?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`experience[${index}].companyName`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`experience[${index}].companyName`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Company Name
                        </label>
                        <input
                          type="text"
                          id={`experience[${index}].companyName`}
                          name="companyName"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.experience?.[index]?.companyName && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.experience?.[index]?.companyName?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`experience[${index}].startDate`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`experience[${index}].startDate`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Start Date
                        </label>
                        <input
                          type="date"
                          id={`experience[${index}].startDate`}
                          name="startDateExperience"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.experience?.[index]?.startDate && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.experience?.[index]?.startDate?.message}
                    </span>
                  )}
                </div>
                <div className="p-2 w-1/2">
                  <Controller
                    name={`experience[${index}].endDate`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`experience[${index}].endDate`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          End Date
                        </label>
                        <input
                          type="date"
                          id={`experience[${index}].endDate`}
                          name="endDateExperience"
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                          {...field}
                        />
                      </div>
                    )}
                  />
                  {errors?.experience?.[index]?.endDate && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.experience?.[index]?.endDate?.message}
                    </span>
                  )}
                </div>
                {experienceField?.length > 1 && (
                  <button
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={() => removeExperience(index)}
                  >
                    <svg
                      className="w-6 h-6 text-white-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm px-3"> Remove Experience</span>
                  </button>
                )}
              </div>
            ))}
          </div>
          <br />
          {/* Project Detail */}
          <div className="lg:w-1/2 md:w-2/3 mx-auto">
            <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">
              Projects
            </h1>
            <button
              type="button"
              className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              onClick={() => appendProject({ title: "", description: "" })}
            >
              <svg
                className="w-6 h-6 text-white-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 12h14m-7 7V5"
                />
              </svg>

              <span className="text-sm px-3"> Add Project</span>
            </button>
            {projectField?.map((data, index) => (
              <React.Fragment key={data?.id}>
                <div className="flex flex-wrap -m-2 p-2">
                  <div className="p-2 w-full">
                    <Controller
                      name={`project[${index}].title`}
                      control={control}
                      defaultValue=""
                      render={({ field }) => (
                        <div className="relative">
                          <label
                            htmlFor={`project[${index}].title`}
                            className="leading-7 text-sm text-gray-600"
                          >
                            Title
                          </label>
                          <input
                            type="text"
                            id={`project[${index}].title`}
                            name="ptojectTitle"
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            {...field}
                          />
                        </div>
                      )}
                    />
                    {errors?.project?.[index]?.title && (
                      <span className="text-red-600">
                        {" "}
                        {errors?.project?.[index]?.title?.message}
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-2 w-full">
                  <Controller
                    name={`project[${index}].description`}
                    control={control}
                    defaultValue=""
                    render={({ field }) => (
                      <div className="relative">
                        <label
                          htmlFor={`project[${index}].description`}
                          className="leading-7 text-sm text-gray-600"
                        >
                          Description
                        </label>
                        <textarea
                          id={`project[${index}].description`}
                          className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                          {...field}
                        ></textarea>
                      </div>
                    )}
                  />
                  {errors?.project?.[index]?.description && (
                    <span className="text-red-600">
                      {" "}
                      {errors?.project?.[index]?.description?.message}
                    </span>
                  )}
                </div>
                {projectField?.length > 1 && (
                  <button
                    type="button"
                    className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-4"
                    onClick={() => removeProject(index)}
                  >
                    <svg
                      className="w-6 h-6 text-white-800 dark:text-white"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="text-sm px-3"> Remove Project</span>
                  </button>
                )}
              </React.Fragment>
            ))}
          </div>
          <br />

          <div className="p-2 w-full">
            <button
              className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"
              type="submit"
              disabled={(errors?.length > 0 && true) || loading}
            >
              {loading ? "Loading...." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default page;
