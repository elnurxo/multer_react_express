import { TextField, Button } from "@mui/material";
import React, { useRef, useState } from "react";
import { postEmp } from "../api/requests";
import { useFormik } from "formik";
import { EmployeeSchema } from "../validation/employee";

const AddImage = () => {
  const[selectedImage,setSelectedImage] = useState(null);
  const buttonRef = useRef();
  function handleSubmit(values,actions){
    console.log(selectedImage);
    const formData = new FormData();
    formData.append("profileImg", selectedImage);
    formData.append("name", values.name);

    postEmp(formData);
    buttonRef.current.style.background = '#1976D2';
    buttonRef.current.textContent = 'Upload File';
    setSelectedImage(null);
    actions.resetForm();
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      profileImg: ''
    },
    validationSchema: EmployeeSchema,
    onSubmit: handleSubmit
  })


  return (
    <div
      style={{
        display: "flex",
        height: "60vh",
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <form onSubmit={formik.handleSubmit} encType="multipart/form-data" method="POST">
        <div style={{display:'flex'}}>
        <TextField
          type="text"
          id="outlined-basic"
          label="Person Name"
          variant="outlined"
          value={formik.values.name}
          onChange={formik.handleChange}
          name="name"
          onBlur={formik.handleBlur}
        />
        {formik.errors.name && formik.touched.name && <div style={{color:'red'}}>{formik.errors.name}</div>}

        <Button ref={buttonRef} style={{marginLeft:'20px'}} variant="contained" component="label">
          Upload File
          <input value={formik.values.profileImg}
          onChange={(e)=>{
            buttonRef.current.style.background = 'red';
            buttonRef.current.textContent = e.target.files[0].name;
            formik.handleChange(e);
            setSelectedImage(e.target.files[0])
          }}
          onBlur={formik.handleBlur} name="profileImg" type="file" accept="image/*" hidden />
        </Button>
        {formik.errors.profileImg && formik.touched.profileImg && <div style={{color:'red'}}>{formik.errors.profileImg}</div>}

        </div>
        <Button style={{display:'block',margin:'25px auto'}} type="submit" variant="outlined" color="success">Add Person</Button>
      </form>
     
    </div>
  );
};

export default AddImage;
