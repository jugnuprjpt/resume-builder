'use client'
import React, { useEffect, useState } from 'react'
import { collection, doc, getDocs, query, addDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResumeValidation } from './ResumeValidation';
import { useRouter } from 'next/navigation'
const page = () => {
    const { control, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(ResumeValidation()),
    });

    const [educationFields, setEducationFields] = useState([{ id: 1 }]);
    const [skillsFields, setSkillsFields] = useState([{ id: 1 }]);
    const [experienceFields, setExperienceFields] = useState([{ id: 1 }]);
    const [projectFields, setProjectFields] = useState([{ id: 1 }]);
    // const [achivementFields, setAchivementtFields] = useState([{ id: 1 }]);
    // const [additionalFields, setAdditionalFields] = useState([{ id: 1 }]);
    const router = useRouter()

    const [userDetails, setUserDetails] = useState({})
    console.log(userDetails, 'details')
    useEffect(() => {
        getDetails();
    }, [])

    const formatDate = (date) => {
        return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }
    const getDetails = async () => {
        const testRef = await collection(db, "resume");
        const queryString = query(testRef);
        const querySnapshot = await getDocs(queryString);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            // console.log(doc.id, " => ", doc.data(), doc);
            const details = doc.data()
            // setValue('firstName', details?.firstName)
            console.log(formatDate(new Date(details?.endDate[0].seconds * 1000)))
            reset({ ...details, endDate: formatDate(new Date(details?.endDate[0].seconds * 1000)) })


            setUserDetails({ id: doc.id, details })
        });
    };


    const submitHandler = async (data) => {
        console.log(data);
        try {


            if (Object.keys(userDetails).length === 0) {
                const docRef = await addDoc(collection(db, "resume"), data);
                console.log("Document written with ID: ", docRef);
            } else {
                const docRef = doc(db, 'resume', userDetails?.id);
                const updateData = await updateDoc(docRef, {
                    data
                })
                console.log('Data updated', updateData)
            }
            router.push('/your-resume')
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };
    // education field
    const addEducationField = () => {
        const newField = {
            id: educationFields.length + 1
        };
        setEducationFields([...educationFields, newField]);
    };

    const removeEducationField = (id) => {
        const updatedFields = educationFields.filter(field => field.id !== id);
        setEducationFields(updatedFields);
    };

    // skills
    const addskillsField = () => {
        const newField = {
            id: skillsFields.length + 1
        };
        setSkillsFields([...skillsFields, newField]);
    };

    const removeskillsField = (id) => {
        const updatedFields = skillsFields.filter(field => field.id !== id);
        setSkillsFields(updatedFields);
    };

    // expericence
    const addsExperienceField = () => {
        const newField = {
            id: experienceFields.length + 1
        };
        setExperienceFields([...experienceFields, newField]);
    };

    const removeExperienceField = (id) => {
        const updatedFields = experienceFields.filter(field => field.id !== id);
        setExperienceFields(updatedFields);
    };

    // project
    const addProjectField = () => {
        const newField = {
            id: projectFields.length + 1
        };
        setProjectFields([...projectFields, newField]);
    };

    const removeProjectField = (id) => {
        const updatedFields = projectFields.filter(field => field.id !== id);
        setProjectFields(updatedFields);
    };

    // achivement
    // const addAchievementField = () => {
    //     const newField = {
    //         id: achivementFields.length + 1
    //     };
    //     setAchivementtFields([...achivementFields, newField]);
    // };

    // const removeAchivementField = (id) => {
    //     const updatedFields = achivementFields.filter(field => field.id !== id);
    //     setAchivementtFields(updatedFields);
    // };

    // additional
    // const addAdditionalField = () => {
    //     const newField = {
    //         id: additionalFields.length + 1
    //     };
    //     setAdditionalFields([...additionalFields, newField]);
    // };

    // const removeAdditionalField = (id) => {
    //     const updatedFields = additionalFields.filter(field => field?.id !== id);
    //     setAdditionalFields(updatedFields);
    // };
    console.log(errors)
    return (
        <section className="text-gray-600 body-font relative" >
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Create Your Resume</h1>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    {/* Personal Detail */}
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Personal Details</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue={""}
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label htmlFor="firstName" className="leading-7 text-sm text-gray-600">First Name</label>
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
                                {errors?.firstName && <span className="text-red-600"> {errors?.firstName?.message}</span>}
                            </div>

                            <div className="p-2 w-1/2">
                                <Controller
                                    name="lastName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label htmlFor="lastname" className="leading-7 text-sm text-gray-600">Last Name</label>
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
                                {errors?.lastName && <span className="text-red-600"> {errors?.lastName?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                                            <input
                                                type="email"
                                                id="email"
                                                name="email"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field} />
                                        </div>
                                    )}
                                />
                                {errors?.email && <span className="text-red-600"> {errors?.email?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="mobileNumber"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label htmlFor="mobileNumber" className="leading-7 text-sm text-gray-600">Mobile Number</label>
                                            <input
                                                type="text"
                                                id="mobileNumber"
                                                name="mobileNumber"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field} />
                                        </div>
                                    )}
                                />
                                {errors?.mobileNumber && <span className="text-red-600"> {errors?.mobileNumber?.message}</span>}
                            </div>

                            <div className="p-2 w-full">
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label htmlFor="role" className="leading-7 text-sm text-gray-600">Role</label>
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
                                {errors?.role && <span className="text-red-600"> {errors?.role?.message}</span>}
                            </div>

                            <div className="p-2 w-full">
                                <Controller
                                    name={"aboutMe"}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label htmlFor={"aboutMe"} className="leading-7 text-sm text-gray-600">About Me</label>
                                            <textarea
                                                id={"aboutMe"}
                                                name="aboutMe"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            >
                                            </textarea>
                                        </div>
                                    )}
                                />
                                {errors?.aboutMe && <span className="text-red-600"> {errors?.aboutMe?.message}</span>}
                            </div>
                        </div>
                    </div>
                    <br />
                    {/* Education Detail */}
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Education</h1>

                        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addEducationField}>
                            <svg className="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            <span className='text-sm px-3'>Add Education</span>
                            
                        </button>

                        {educationFields?.map((data, index) => (
                            <div className="flex flex-wrap -m-2" key={data?.id}>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`schoolName[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`schoolName[${index}]`} className="leading-7 text-sm text-gray-600">School/College Name</label>
                                                <input
                                                    type="text"
                                                    id={`schoolName[${index}]`}
                                                    name="schoolName"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.schoolName?.[index] && <span className="text-red-600"> {errors?.schoolName?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`degree[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`degree[${index}]`} className="leading-7 text-sm text-gray-600">Degree</label>
                                                <input
                                                    type="text"
                                                    id={`degree[${index}]`}
                                                    name="degree"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.degree?.[index] && <span className="text-red-600"> {errors?.degree?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`startDate[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`startDate[${index}]`} className="leading-7 text-sm text-gray-600">Start Date</label>
                                                <input
                                                    type="date"
                                                    id={`startDate[${index}]`}
                                                    name="startDate"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.startDate?.[index] && <span className="text-red-600"> {errors?.startDate?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`endDate[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`endDate[${index}]`} className="leading-7 text-sm text-gray-600">End Date</label>
                                                <input
                                                    type="date"
                                                    id={`endDate[${index}]`}
                                                    name="endDate"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.endDate?.[index] && <span className="text-red-600"> {errors?.endDate?.[index]?.message}</span>}
                                </div>
                                {
                                    educationFields?.length > 1 &&
                                    <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeEducationField(data.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                                        </svg>
                                        Remove Education
                                    </button>
                                }
                            </div>

                        ))
                        }
                    </div>
                    <br />
                    {/* Skills Detail */}
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Skills</h1>
                        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addskillsField}>
                            <svg className="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            <span className='text-sm px-3'>Add Skills</span>
                            
                        </button>
                        {skillsFields?.map((data, index) => (
                            <div className="flex flex-wrap -m-2" key={data?.id}>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`skills[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`skills[${index}]`} className="leading-7 text-sm text-gray-600">Skills Name</label>
                                                <input
                                                    type="text"
                                                    id={`skills[${index}]`}
                                                    name="skills"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.skills?.[index] && <span className="text-red-600"> {errors?.skills?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2 mt-10">
                                    <div className="flex items-center">
                                        <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 text-yellow-300 ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                        <svg className="w-4 h-4 ms-1 text-gray-300 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
                                            <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                                        </svg>
                                    </div>
                                </div>
                                {
                                    skillsFields?.length > 1 &&
                                    <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeskillsField(data.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                                        </svg>
                                        Remove Skills
                                    </button>
                                }
                            </div>
                        ))
                        }

                    </div>
                    <br />
                    {/* Experience Detail */}
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Experience</h1>
                        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addsExperienceField}>
                            <svg className="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            <span className='text-sm px-3'>Add Experience</span>
                          
                        </button>
                        {experienceFields?.map((data, index) => (
                            <div className="flex flex-wrap -m-2" key={data?.id}>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`jobTitle[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`jobTitle[${index}]`} className="leading-7 text-sm text-gray-600">Job Title</label>
                                                <input
                                                    type="text"
                                                    id={`jobTitle[${index}]`}
                                                    name="jobTitle"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.jobTitle?.[index] && <span className="text-red-600"> {errors?.jobTitle?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`companyName[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`companyName[${index}]`} className="leading-7 text-sm text-gray-600">Company Name</label>
                                                <input
                                                    type="text"
                                                    id={`companyName[${index}]`}
                                                    name="companyName"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.companyName?.[index] && <span className="text-red-600"> {errors?.companyName?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`startDateExperience[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`startDateExperience[${index}]`} className="leading-7 text-sm text-gray-600">Start Date</label>
                                                <input
                                                    type="date"
                                                    id={`tartDateExperience[${index}]`}
                                                    name="startDateExperience"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.startDateExperience?.[index] && <span className="text-red-600"> {errors?.startDateExperience?.[index]?.message}</span>}
                                </div>
                                <div className="p-2 w-1/2">
                                    <Controller
                                        name={`endDateExperience[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`endDateExperience[${index}]`} className="leading-7 text-sm text-gray-600">End Date</label>
                                                <input
                                                    type="date"
                                                    id={`endDateExperience[${index}]`}
                                                    name="endDateExperience"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                />
                                            </div>
                                        )}
                                    />
                                    {errors?.endDateExperience?.[index] && <span className="text-red-600"> {errors?.endDateExperience?.[index]?.message}</span>}
                                </div>
                                {
                                    experienceFields?.length > 1 &&
                                    <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeExperienceField(data.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                                        </svg>
                                        Remove Experience
                                    </button>
                                }
                            </div>
                        ))
                        }
                    </div>
                    <br />
                    {/* Project Detail */}
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Projects</h1>
                        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addProjectField}>
                            <svg className="w-6 h-6 text-white-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                           
                            <span className='text-sm px-3'> Add Project</span>
                        </button>
                        {projectFields?.map((data, index) => (
                            <React.Fragment key={data?.id}>
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-full">
                                        <Controller
                                            name={`projectTitle[${index}]`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <div className="relative">
                                                    <label htmlFor={`projectTitle[${index}]`} className="leading-7 text-sm text-gray-600">Title</label>
                                                    <input
                                                        type="text"
                                                        id={`projectTitle[${index}]`}
                                                        name="ptojectTitle"
                                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        {...field}
                                                    />
                                                </div>
                                            )}
                                        />
                                        {errors?.projectTitle?.[index] && <span className="text-red-600"> {errors?.projectTitle?.[index]?.message}</span>}
                                    </div>
                                </div>

                                <div className="p-2 w-full">
                                    <Controller
                                        name={`projectDescription[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`projectDescription[${index}]`} className="leading-7 text-sm text-gray-600">Description</label>
                                                <textarea
                                                    id={`projectDescription`}
                                                    name={`projectDescription[${index}]`}
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                >
                                                </textarea>
                                            </div>
                                        )}
                                    />
                                    {errors?.projectDescription?.[index] && <span className="text-red-600"> {errors?.projectDescription?.[index]?.message}</span>}
                                </div>
                                {
                                    projectFields?.length > 1 &&
                                    <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeProjectField(data.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                                        </svg>
                                        Remove Project
                                    </button>
                                }
                            </React.Fragment>
                        ))
                        }
                    </div>
                    <br />
                    {/* Achievement Detail */}
                    {/* <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Achievement</h1>
                        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addAchievementField}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            Add Achievement
                        </button>
                        {achivementFields?.map((data, index) => (
                            <React.Fragment key={data?.id}>
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-full">
                                        <Controller
                                            name={`achievementTitle[${index}]`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <div className="relative">
                                                    <label htmlFor={`achievementTitle[${index}]`} className="leading-7 text-sm text-gray-600">Title</label>
                                                    <input
                                                        type="text"
                                                        id={`achievementTitle[${index}]`}
                                                        name="achievementTitle"
                                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        {...field}
                                                    />
                                                </div>
                                            )}
                                        />
                                        {errors?.achievementTitle?.[index] && <span className="text-red-600"> {errors?.achievementTitle?.[index]?.message}</span>}
                                    </div>
                                </div>

                                <div className="p-2 w-full">
                                    <Controller
                                        name={`achievementDescription[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`achievementDescription[${index}]`} className="leading-7 text-sm text-gray-600">Description</label>
                                                <textarea
                                                    id={`achievementDescription[${index}]`}
                                                    name="achievementDescription"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                >
                                                </textarea>
                                            </div>
                                        )}
                                    />
                                    {errors?.achievementDescription?.[index] && <span className="text-red-600"> {errors?.achievementDescription?.[index]?.message}</span>}
                                </div>

                                {
                                    achivementFields?.length > 1 &&
                                    <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeAchivementField(data.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                                        </svg>
                                        Remove Achivement
                                    </button>
                                }
                            </React.Fragment>
                        ))
                        }
                    </div>
                    <br /> */}
                    {/* Aditional Detail */}
                    {/* <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Aditional</h1>
                        <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={addAdditionalField}>
                            <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14m-7 7V5" />
                            </svg>
                            Add Additional
                        </button>
                        {additionalFields?.map((data, index) => (
                            <React.Fragment key={data?.id}>
                                <div className="flex flex-wrap -m-2">
                                    <div className="p-2 w-full">
                                        <Controller
                                            name={`aditionalTitle[${index}]`}
                                            control={control}
                                            defaultValue=""
                                            render={({ field }) => (
                                                <div className="relative">
                                                    <label htmlFor={`aditionalTitle[${index}]`} className="leading-7 text-sm text-gray-600">Title</label>
                                                    <input
                                                        type="text"
                                                        id={`aditionalTitle[${index}]`}
                                                        name="achievementDescription"
                                                        className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                        {...field}
                                                    />
                                                </div>
                                            )}
                                        />
                                        {errors?.aditionalTitle?.[index] && <span className="text-red-600"> {errors?.aditionalTitle?.[index]?.message}</span>}
                                    </div>
                                </div>
                                <div className="p-2 w-full">
                                    <Controller
                                        name={`aditionalDescription[${index}]`}
                                        control={control}
                                        defaultValue=""
                                        render={({ field }) => (
                                            <div className="relative">
                                                <label htmlFor={`aditionalDescription[${index}]`} className="leading-7 text-sm text-gray-600">Description</label>
                                                <textarea
                                                    id={`aditionalDescription[${index}]`}
                                                    name="aditionalDescription"
                                                    className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
                                                    {...field}
                                                >
                                                </textarea>
                                            </div>
                                        )}
                                    />
                                    {errors?.aditionalDescription?.[index] && <span className="text-red-600"> {errors?.aditionalDescription?.[index]?.message}</span>}
                                </div>
                                {
                                    additionalFields?.length > 1 &&
                                    <button type="button" className="px-3 py-2 text-xs font-medium text-center inline-flex items-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" onClick={() => removeAdditionalField(data.id)}>
                                        <svg className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
                                            <path fill-rule="evenodd" d="M2 12a10 10 0 1 1 20 0 10 10 0 0 1-20 0Zm7.7-3.7a1 1 0 0 0-1.4 1.4l2.3 2.3-2.3 2.3a1 1 0 1 0 1.4 1.4l2.3-2.3 2.3 2.3a1 1 0 0 0 1.4-1.4L13.4 12l2.3-2.3a1 1 0 0 0-1.4-1.4L12 10.6 9.7 8.3Z" clip-rule="evenodd" />
                                        </svg>
                                        Remove Additional
                                    </button>
                                }
                            </React.Fragment>
                        ))
                        }
                    </div>
                    <br /> */}
                    <div className="p-2 w-full">
                        <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit" disabled={errors?.length > 0 && true}>Submit</button>
                    </div>
                </form>
            </div>

        </section >

    )
}

export default page