import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { TextField, Button, Box, Grid, Typography, Autocomplete } from '@mui/material';
import notification from '../components/Notification';
import { useEffect, useState } from 'react';
import { Teacher } from '../types/types';
import { useNavigate } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TeacherService from '../api/teacherService';
import WorkshopService from '../api/workshopService';

const validationSchema = Yup.object({
  title: Yup.string().required('Campo obrigatório'),
  responsibleTeacherId: Yup.string().required('Campo obrigatório'),
  dateTime: Yup.string().required('Campo obrigatório'),
  maxStudents: Yup.number().required('Campo obrigatório'),
})

const initialValues = {
  title: '',
  responsibleTeacherId: '',
  dateTime: '',
  maxStudents: '',
}


function WorkshopPage() {

  const navigate = useNavigate();
  const [teachers, setTeachers] = useState<Teacher[]>([]);


  useEffect(() => {
    const loadTeachers = async () => {
      const allTeachers = await TeacherService.getAllTeachers();
      setTeachers(allTeachers);
    };
    loadTeachers();
  }, []);


  const handleSubmit = async (values: any) => {
    try {
      WorkshopService.createWorkshop(values)
      notification("Workshop registrado com sucesso.", "success")
      navigate("/home")
    }
    catch {
      notification("Tente novamente", "error")
    }
  };

  return (
    <Grid component="main" sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <Box sx={{ my: 20, mx: 25, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '400px' }}>

        <Typography component="h1" variant="h5" sx={{ marginBottom: 4 }}> Registro do Workshops </Typography>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
          validateOnBlur={false}
          validateOnChange={false}>
          {({ errors, touched, handleBlur, handleChange, handleSubmit, setFieldError, setFieldValue }) => (

            <Form onSubmit={handleSubmit} style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%'
            }}>

              <Field
                as={TextField}
                id="title"
                name="title"
                label="Title"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('title', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.title && errors.title)}
                helperText={touched.title && <ErrorMessage name="title" />}
                style={{ marginBottom: 20 }}
              />

              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={teachers}
                getOptionLabel={(option) => option.username}
                sx={{ width: "100%", marginBottom: 2 }}
                onChange={(e, newValue) => {
                  handleChange({
                    target: {
                      name: 'responsibleTeacherId',
                      value: newValue ? newValue.id : '',
                    },
                  });
                  setFieldError('responsibleTeacherId', '');
                }}
                onBlur={handleBlur}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Teacher"
                    variant="outlined"
                    error={Boolean(touched.responsibleTeacherId && errors.responsibleTeacherId)}
                    helperText={touched.responsibleTeacherId && <ErrorMessage name="responsibleTeacherId" />}
                    fullWidth
                  />
                )}
              />





              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  ampm={false}
                  format="DD/MM/YYYY HH:mm"
                  label="Data e Hora"

                  onChange={(value) => {
                    setFieldValue('dateTime', value ? value.format('YYYY-MM-DDTHH:mm') : '')
                    setFieldError('dateTime', '');
                  }}
                  slots={{
                    textField: (props) => (
                      <TextField
                        {...props}
                        onBlur={handleBlur}
                        error={Boolean(touched.dateTime && errors.dateTime)}
                        helperText={touched.dateTime && errors.dateTime}
                        fullWidth
                        style={{ marginBottom: 16 }}
                      />
                    ),
                  }}
                />
              </LocalizationProvider>



              <Field
                as={TextField}
                id="maxStudents"
                name="maxStudents"
                label="Max Students"
                variant="outlined"
                fullWidth
                onChange={(e: any) => {
                  handleChange(e);
                  setFieldError('maxStudents', '');
                }}
                onBlur={handleBlur}
                error={Boolean(touched.maxStudents && errors.maxStudents)}
                helperText={touched.maxStudents && <ErrorMessage name="maxStudents" />}
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

export default WorkshopPage;
