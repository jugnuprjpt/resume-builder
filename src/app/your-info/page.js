'use client'
import React from 'react'
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ResumeValidation } from './ResumeValidation';
const page = () => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(ResumeValidation()),
    });

    const submitHandler = (data) => {
        console.log(data);
    };
    console.log(errors)
    return (
        <section section className="text-gray-600 body-font relative" >
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Create Your Resume</h1>
                </div>
                <form onSubmit={handleSubmit(submitHandler)}>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Personal Details</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="firstName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="firstName" className="leading-7 text-sm text-gray-600">First Name</label>
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
                                            <label for="lastname" className="leading-7 text-sm text-gray-600">Last Name</label>
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
                                            <label for="email" className="leading-7 text-sm text-gray-600">Email</label>
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
                                            <label for="mobileNumber" className="leading-7 text-sm text-gray-600">Mobile Number</label>
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

                            <div className="p-2 w-1/2">
                                <Controller
                                    name="role"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="role" className="leading-7 text-sm text-gray-600">Role</label>
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
                        </div>
                    </div>
                    <br />
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Education</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="schoolName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="schoolName" className="leading-7 text-sm text-gray-600">School/College Name</label>
                                            <input
                                                type="text"
                                                id="schoolName"
                                                name="schoolName"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.schoolName && <span className="text-red-600"> {errors?.schoolName?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="degree"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="degree" className="leading-7 text-sm text-gray-600">Degree</label>
                                            <input
                                                type="text"
                                                id="degree"
                                                name="degree"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.degree && <span className="text-red-600"> {errors?.degree?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="startDate"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="startDate" className="leading-7 text-sm text-gray-600">Start Date</label>
                                            <input
                                                type="date"
                                                id="startDate"
                                                name="startDate"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.startDate && <span className="text-red-600"> {errors?.startDate?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="endtDate"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="endtDate" className="leading-7 text-sm text-gray-600">End Date</label>
                                            <input
                                                type="date"
                                                id="endtDate"
                                                name="endtDate"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.endtDate && <span className="text-red-600"> {errors?.endtDate?.message}</span>}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Skills</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="skills"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="skills" className="leading-7 text-sm text-gray-600">Skills Name</label>
                                            <input
                                                type="text"
                                                id="skills"
                                                name="skills"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.skills && <span className="text-red-600"> {errors?.skills?.message}</span>}
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
                        </div>

                    </div>
                    <br />
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Experience</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="jobTitle"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="jobTitle" className="leading-7 text-sm text-gray-600">Job Title</label>
                                            <input
                                                type="text"
                                                id="jobTitle"
                                                name="jobTitle"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.jobTitle && <span className="text-red-600"> {errors?.jobTitle?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="companyName"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="companyName" className="leading-7 text-sm text-gray-600">Company Name</label>
                                            <input
                                                type="text"
                                                id="companyName"
                                                name="companyName"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.companyName && <span className="text-red-600"> {errors?.companyName?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="startDateExperience"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="startDateExperience" className="leading-7 text-sm text-gray-600">Start Date</label>
                                            <input
                                                type="date"
                                                id="startDateExperience"
                                                name="startDateExperience"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.startDateExperience && <span className="text-red-600"> {errors?.startDateExperience?.message}</span>}
                            </div>
                            <div className="p-2 w-1/2">
                                <Controller
                                    name="endtDate"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="endtDate" className="leading-7 text-sm text-gray-600">End Date</label>
                                            <input
                                                type="date"
                                                id="endtDate"
                                                name="endtDate"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.endtDate && <span className="text-red-600"> {errors?.endtDate?.message}</span>}
                            </div>
                        </div>
                    </div>
                    <br />
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Projects</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <Controller
                                    name="ptojectTitle"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="ptojectTitle" className="leading-7 text-sm text-gray-600">Title</label>
                                            <input
                                                type="text"
                                                id="ptojectTitle"
                                                name="ptojectTitle"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.ptojectTitle && <span className="text-red-600"> {errors?.ptojectTitle?.message}</span>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <Controller
                                name="ptojectDescription"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div className="relative">
                                        <label for="ptojectDescription" className="leading-7 text-sm text-gray-600">Description</label>
                                        <textarea
                                            id="ptojectDescription"
                                            name="ptojectDescription"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                                        </textarea>
                                    </div>
                                )}
                            />
                            {errors?.ptojectTitle && <span className="text-red-600"> {errors?.ptojectTitle?.message}</span>}
                        </div>
                    </div>
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Achivements</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <Controller
                                    name="achivementsTitle"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="achivementsTitle" className="leading-7 text-sm text-gray-600">Title</label>
                                            <input
                                                type="text"
                                                id="achivementsTitle"
                                                name="achivementsTitle"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.achivementsTitle && <span className="text-red-600"> {errors?.achivementsTitle?.message}</span>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <Controller
                                name="achivementsDescription"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div className="relative">
                                        <label for="achivementsDescription" className="leading-7 text-sm text-gray-600">Description</label>
                                        <textarea
                                            id="achivementsDescription"
                                            name="achivementsDescription"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                                        </textarea>
                                    </div>
                                )}
                            />
                            {errors?.achivementsTitle && <span className="text-red-600"> {errors?.achivementsTitle?.message}</span>}
                        </div>
                    </div>
                    <br />
                    <div className="lg:w-1/2 md:w-2/3 mx-auto">
                        <h1 className="sm:text-2xl text-xl font-medium title-font mb-4 text-gray-900">Aditional</h1>
                        <div className="flex flex-wrap -m-2">
                            <div className="p-2 w-full">
                                <Controller
                                    name="aditionalTitle"
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <div className="relative">
                                            <label for="aditionalTitle" className="leading-7 text-sm text-gray-600">Title</label>
                                            <input
                                                type="text"
                                                id="aditionalTitle"
                                                name="aditionalTitle"
                                                className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                                                {...field}
                                            />
                                        </div>
                                    )}
                                />
                                {errors?.aditionalTitle && <span className="text-red-600"> {errors?.aditionalTitle?.message}</span>}
                            </div>
                        </div>
                        <div className="p-2 w-full">
                            <Controller
                                name="aditionalDescription"
                                control={control}
                                defaultValue=""
                                render={({ field }) => (
                                    <div className="relative">
                                        <label for="aditionalDescription" className="leading-7 text-sm text-gray-600">Description</label>
                                        <textarea
                                            id="aditionalDescription"
                                            name="aditionalDescription"
                                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 h-32 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out">
                                        </textarea>
                                    </div>
                                )}
                            />
                            {errors?.aditionalDescription && <span className="text-red-600"> {errors?.aditionalDescription?.message}</span>}
                        </div>
                    </div>
                    <br />
                    <br />
                    <div className="p-2 w-full">
                        <button className="flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg" type="submit">Submit</button>
                    </div>
                </form>
            </div>

        </section >

    )
}

export default page