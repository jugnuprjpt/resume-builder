import * as Yup from "yup";
export const ResumeValidation = () => {
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  return Yup.object().shape({
    firstName: Yup.string()
      ?.trim()
      .required("Enter your first name")
      .test(
        "len",
        "Min 2 characters required",
        (val) => val && val.toString().length >= 2
      ),
    lastName: Yup.string()
      ?.trim()
      .required("Enter your last name")
      .test(
        "len",
        "Min 2 characters required",
        (val) => val && val.toString().length >= 2
      ),

    mobileNumber: Yup.string()
      .required("Enter mobile number")
      .matches(phoneRegExp, "Mobile number can be 10 digits only")
      .min(10, "Min 10 characters required")
      .max(10, "Max 10 characters required"),

    email: Yup.string()
      ?.trim()
      .email("Please Enter Valid Email")
      .required("Enter Your Email"),

    role: Yup.string()
      ?.trim()
      .required("Enter your role")
      .test(
        "len",
        "Min 2 characters required",
        (val) => val && val.toString().length >= 2
      ),

    aboutMe: Yup.string()
      ?.trim()
      .required("Tell me about yourself")
      .test(
        "len",
        "Min 20 characters required",
        (val) => val && val.toString().length >= 20
      ),
    education: Yup.array().of(
      Yup.object({
        schoolName: Yup.string().required("School / College Name is required"),
        degree: Yup.string().required("Degree is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
      })
    ),
    skills: Yup.array().of(
      Yup.object({
        skillName: Yup.string().required("Skill Name is required"),
      })
    ),
    experience: Yup.array().of(
      Yup.object({
        jobTitle: Yup.string().required("Job title is required"),
        companyName: Yup.string().required("Company Name is required"),
        startDate: Yup.string().required("Start Date is required"),
        endDate: Yup.string().required("End Date is required"),
      })
    ),
    project: Yup.array().of(
      Yup.object({
        title: Yup.string().required("Project title is required"),
        description: Yup.string()
          .required("Project Description is required")
          .test(
            "len",
            "Min 20 characters required",
            (val) => val && val.toString().length >= 20
          ),
      })
    ),
  });
};
