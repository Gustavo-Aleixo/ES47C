import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, Link, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import indigo from '@mui/material/colors/indigo';


const validationSchema = Yup.object({
  email: Yup.string().email('Email inválido').required('Campo obrigatório'),
  password: Yup.string().required('Campo obrigatório'),
})

const initialValues = {
  email: '',
  password: ''
}


function LoginPage() {

  const handleSubmit = (values: any) => {
    console.log(values);
  };

  return (
    <Grid container component="main" sx={{ height: '100vh' }}>
      <Grid item xs={false} sm={4} md={7} sx={{ backgroundColor: indigo[700] }} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >
        <Box sx={{ mb: 20, width: '400px', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }} >

          <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}> Login </Typography>

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

                <Button type="submit" variant="contained" color="primary" style={{ width: 150, marginBottom: 25 }}>
                  Submit
                </Button>

              </Form>
            )}
          </Formik>

          <Grid item>
            <Typography variant="body2" color="textSecondary">
              Deseja se cadastrar?{' '}
              <Link href="/register" variant="body2">
                Clique aqui
              </Link>
            </Typography>
          </Grid>

        </Box>
      </Grid>
    </Grid >
  )
}

export default LoginPage;
