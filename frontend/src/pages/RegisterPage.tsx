import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, Typography } from '@mui/material';


const validationSchema = Yup.object({
  name: Yup.string().required('Campo obrigatório'),
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
  confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'As senhas não coincidem').required('Campo obrigatório'),
})

const initialValues = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
}


function RegisterPage() {

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid component="main" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ my: 20, mx: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '400px' }}>

        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}> Register </Typography>

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
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('name', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.name && errors.name)}
                helperText={touched.name && <ErrorMessage name="name" />}
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
                id="password"
                name="password"
                label="Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('password', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.password && errors.password)}
                helperText={touched.password && <ErrorMessage name="password" />}
                style={{ marginBottom: 20 }}
              />

              <Field
                as={TextField}
                id="confirmPassword"
                name="confirmPassword"
                label="Confirm Password"
                type="password"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('confirmPassword', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.confirmPassword && errors.confirmPassword)}
                helperText={touched.confirmPassword && <ErrorMessage name="confirmPassword" />}
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

export default RegisterPage;
