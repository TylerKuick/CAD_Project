import { Box, Typography, TextField, Button, Card, CardContent} from '@mui/material';
import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import React from 'react';
import http from "../http";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';


function AddItem() {
    const navigate = useNavigate();
    const now = dayjs();
    const formik = useFormik({
        initialValues: {
            name: "",
            dateFound: now,
            areaFound: ""
        },
        validationSchema: yup.object({
            name: yup.string().trim().min(3).max(100).required("Item Name is required"),
            dateFound: yup.date().required("Date Found is required"),
            areaFound: yup.string().trim().min(3).max(500).required("Area Found is required")
        }),
        onSubmit: (data) => {
            data.name = data.name.trim();
            data.dateFound = data.dateFound.$d
            data.areaFound = data.areaFound.trim();
            console.log(data);
            // http.post("/lostItems", data).then((res) => {
            //     console.log(res.data);
            //     navigate("/");
            // });
        }
    });

  return (
    <Box sx={{ mt: 5, display: 'flex', justifyContent: 'center' }}>
        <Card sx={{ width: '100%', maxWidth: 600, boxShadow: 3, p: 2 }}>
            <CardContent>
                <Typography variant="h4" sx={{ fontWeight: "bold", mb: 3, textAlign: "center" }}>
                    Add New Item
                </Typography>
                <Box component="form" onSubmit={formik.handleSubmit}>
                    <TextField
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        label="Item Name"
                        name="name"
                        value={formik.values.name}
                        onChange={formik.handleChange}
                        error={formik.touched.ame && Boolean(formik.errors.ame)}
                        helperText={formik.touched.name && formik.errors.name}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateField
                            fullWidth
                            margin="normal"
                            autoComplete="off"
                            label="Date Found"
                            name="dateFound"
                            value={formik.values.dateFound}
                            onChange={formik.handleChange}
                            error={formik.touched.dateFound && Boolean(formik.errors.dateFound)}
                            helperText={formik.touched.dateFound && formik.errors.dateFound}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: 2,
                                },
                            }}
                        />
                    </LocalizationProvider>
                    
                    <TextField
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        multiline
                        minRows={3}
                        label="Area Found"
                        name="areaFound"
                        value={formik.values.areaFound}
                        onChange={formik.handleChange}
                        error={formik.touched.areaFound && Boolean(formik.errors.areaFound)}
                        helperText={formik.touched.areaFound && formik.errors.areaFound}
                        sx={{
                            "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                            },
                        }}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                            variant="contained"
                            type="submit"
                            sx={{
                                px: 4,
                                py: 1,
                                fontSize: "1rem",
                                borderRadius: 3,
                                backgroundColor: "#4caf50",
                                "&:hover": {
                                    backgroundColor: "#43a047"
                                },
                            }}
                        >
                            Add Product
                        </Button>
                    </Box>
                </Box>
            </CardContent>
        </Card>
    </Box>
    );
}


export default AddItem