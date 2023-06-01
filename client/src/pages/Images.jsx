import React, { useEffect, useState } from "react";
import { Button, Grid, Typography } from "@mui/material";
import { Card } from 'antd';
import { getAll, deleteEmp } from "../api/requests";

const Images = () => {
  const[employees,setEmployees]=useState([]);
  useEffect(()=>{
    getAll().then((res)=>{
      setEmployees(res);
    })
  },[])
  return (
    <div style={{width:'80%',margin:'50px auto'}}>
      <Grid  container spacing={2}>
      {employees && employees.map((employee)=>{
        return <Grid key={employee._id} item lg={3} md={6} sm={12}>
        <Card
          hoverable
          cover={
            <img
            style={{height:'330px',objectFit:'cover',objectPosition:'top center'}}
              alt={employee.name}
              src={employee.profileImg}
            />
          }
        >
          <Typography><b>name:</b> {employee.name}</Typography>
          <Button onClick={()=>{
            deleteEmp(employee._id);
            setEmployees(employees.filter((x)=>x._id!==employee._id))
          }} style={{marginTop:'10px'}} variant="contained" color="error">Delete</Button>
        </Card>
      </Grid>
      })}
      
    </Grid>
    </div>
  );
};

export default Images;
