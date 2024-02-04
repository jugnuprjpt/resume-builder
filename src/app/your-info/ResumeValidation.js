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
            .required("Enter Valid Email Id")
    })
}
