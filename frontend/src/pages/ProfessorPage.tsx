import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';
import notification from '../components/Notification';
import { useNavigate } from 'react-router-dom';
import TeacherService from '../api/teacherService';
import { useEffect, useState } from 'react';


const validationSchema = Yup.object({
  username: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  area: Yup.string().required('Campo obrigatório'),
})

const initialValues = {
  username: '',
  email: '',
  area: '',
}


function ProfessorPage() {

  const [isCreated, setIsCreated] = useState(false);
  const navigate = useNavigate();
  useEffect(() => { if (isCreated) navigate("/home"); }, [isCreated, navigate]);


  const handleSubmit = async (values: any) => {
    try {
      await TeacherService.createTeacher(values);
      notification("Professor registrado com sucesso.", "success");
      setIsCreated(true);
    } catch {
      notification("Tente novamente", "error");
    }
  };


  return (
    <Grid component="main" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ my: 20, mx: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '400px' }}>

        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}> Registro de Professores </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}>
          {({ errors, touched, handleBlur, handleChange, handleSubmit, setFieldError }) => (

            <Form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>

              <Field
                as={TextField}
                id="username"
                name="username"
                label="Username"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('username', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.username && errors.username)}
                helperText={touched.username && <ErrorMessage name="username" />}
                style={{ marginBottom: 20 }}
              />

              <Field
                as={TextField}
                id="email"
                name="email"
                label="Email"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('email', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.email && errors.email)}
                helperText={touched.email && <ErrorMessage name="email" />}
                style={{ marginBottom: 20 }}
              />

              <Field
                as={TextField}
                id="area"
                name="area"
                label="Area"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('area', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.area && errors.area)}
                helperText={touched.area && <ErrorMessage name="area" />}
                style={{ marginBottom: 20 }}
              />


              <Button type="submit" variant="contained" color="primary" style={{ width: 150, marginBottom: 25 }}>
                Submit
              </Button>

            </Form>
          )}
        </Formik>
      </Box>
    </Grid>
  )
}

export default ProfessorPage;
