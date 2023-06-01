import * as Yup from "yup";

export const EmployeeSchema = Yup.object().shape({
    name: Yup.string().min(3).required(),
    profileImg: Yup.mixed().required()
})