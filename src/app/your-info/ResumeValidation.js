import * as Yup from 'yup';
export const ResumeValidation = () => {
    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    return Yup.object().shape({
        firstName: Yup.string()
            .trim()
            .required("Enter your first name")
            .test(
                'len',
                "Min 2 characters required",
                (val) => val && val.toString().length >= 2
            ),
        lastName: Yup.string()
            .trim()
            .required("Enter your last name")
            .test(
                'len',
                "Min 2 characters required",
                (val) => val && val.toString().length >= 2
            ),

        mobileNumber: Yup.string()
            .required("Enter mobile number")
            .matches(phoneRegExp, 'Mobile no must be in digit only')
            .min(10, "Min 10 characters required")
            .max(10, "Max 10 characters required"),

        email: Yup.string()
            .trim()
            .email("Invalid email format")
            .required("Enter Valid Email Id"),

        role: Yup.string()
            .trim()
            .required("Enter your role")
            .test(
                'len',
                "Min 2 characters required",
                (val) => val && val.toString().length >= 2
            ),

        aboutMe: Yup.string()
            .trim()
            .required("Enter about me")
            .test(
                'len',
                "Min 20 characters required",
                (val) => val && val.toString().length >= 20
            ),

        schoolName: Yup.array().of(
            Yup.string().required('School/College Name is required')
        ),
        degree: Yup.array().of(
            Yup.string().required('Degree is required')
        ),
        startDate: Yup.array().of(
            Yup.date()
                .nullable(true)
                .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
                .required('Start Date is required')
        ),
        endDate: Yup.array().of(
            Yup.date()
                .nullable(true)
                .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
                .required('End Date is required')
        ),
        skills: Yup.array().of(
            Yup.string().required('Skill Name is required')
        ),
        jobTitle: Yup.array().of(
            Yup.string().required('Job title is required')
        ),
        companyName: Yup.array().of(
            Yup.string().required('Company Name is required')
        ),
        startDateExperience: Yup.array().of(
            Yup.date()
                .nullable(true)
                .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
                .required('Start Date is required')
        ),
        endDateExperience: Yup.array().of(
            Yup.date()
                .nullable(true)
                .transform((value, originalValue) => originalValue.trim() === '' ? null : value)
                .required('End Date is required')
        ),
        projectTitle: Yup.array().of(
            Yup.string().required('Project title is required')
        ),
        projectDescription: Yup.array().of(
            Yup.string().required('Project Description is required')
                .test(
                    'len',
                    "Min 20 characters required",
                    (val) => val && val.toString().length >= 20
                ),
        ),
        achievementTitle: Yup.array().of(
            Yup.string().required('Achievement title is required')
        ),
        achievementDescription: Yup.array().of(
            Yup.string().required('Achievement Description is required')
                .test(
                    'len',
                    "Min 20 characters required",
                    (val) => val && val.toString().length >= 20
                ),
        ),
        aditionalTitle: Yup.array().of(
            Yup.string().required('Aditional title is required')
        ),
        aditionalDescription: Yup.array().of(
            Yup.string().required('AditionalDescription is required')
                .test(
                    'len',
                    "Min 20 characters required",
                    (val) => val && val.toString().length >= 20
                ),
        ),

    })
}
