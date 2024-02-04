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
    return (
        <div className="w-5/12 p-20 mx-auto">
            <form onSubmit={handleSubmit(submitHandler)}>
                <div className="flex flex-col gap-10">
                    <Controller
                        name="firstName"
                        control={control}
                        defaultValue=""
                        render={({ field }) => (
                            <>
                                <input
                                    type='text'
                                    {...field}
                                    className="cursor-auto"
                                />
                                <label
                                    htmlFor={`floating_outlined_Company_Name`}
                                    className={`absolute text-md ${errors.firstName ? 'text-red-600' : 'text-gray-500'} duration-300 transform -translate-y-4 scale-75 top-2 origin-[0] bg-white px-2`}
                                >
                                    First Name
                                </label>
                            </>
                        )}
                    />
                    {errors.firstName && <span className="text-red-600"> {errors.firstName.message}</span>}
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}

export default page