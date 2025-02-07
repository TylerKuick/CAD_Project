import { Box, Typography, TextField, Button, Card, CardContent, Container} from '@mui/material';
import { CloudUpload } from "@mui/icons-material";
import { styled } from '@mui/material/styles';
import { React, useState, useEffect }from 'react';

import { DateField } from '@mui/x-date-pickers/DateField';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import http from "../http";
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';

function AddItem() {
    // // Image Upload to S3 from Form
    const [img, setImg] = useState();
    const [imgURL, setImgURL] = useState();
    const [err, setError] = useState("");
    const validTypes = ['image/jpg', 'image/png', 'image/jpeg']
    const handleImgChange = (e) => {
        if (validTypes.find(type => type === e.target.files[0].type)) {
            setError();
            setImg(e.target.files[0]);
            setImgURL(URL.createObjectURL(e.target.files[0]));
        }
        else {
            setImg();
            setImgURL();
            setError("Please only upload PNG/JPG/JPEG images.");
        }
    }

    const handleImgUpload = async (imgBlob, dbID) => {
        const photoKey = dbID
        // Trigger Lambda to get s3 presigned url      
        try {
            const data = {
                "ContentType": imgBlob.type
            };
            const response = await http.post(`/imageUpload/${photoKey}`, data).then((res) => {
                return res.data;
            })
            const url = response;
            console.log(url);
            const result = axios.put(url, imgBlob, {
                headers: {
                    "Content-Type": imgBlob.type
                },
            })
        }
        catch (error) {
            console.error("Error uploading image", error);
        }
    }

    const labelImage = () => {

    }

    // Upload Image Button Input Style
    const VisuallyHiddenInput = styled('input')({
        clip: 'rect(0 0 0 0)',
        clipPath: 'inset(50%)',
        height: 1,
        overflow: 'hidden',
        position: 'absolute',
        bottom: 0,
        left: 0,
        whiteSpace: 'nowrap',
        width: 1,
      });

    // Form Logic and Validation
    const navigate = useNavigate();
    const now = dayjs();
    const ts = now.unix();
    const formik = useFormik({
        initialValues: {
            itemID: "",
            itemName: "",
            dateFound: now,
            areaFound: "",
            category: ""
        },
        validationSchema: yup.object({
            itemName: yup.string().trim().min(3).max(100).required("Item Name is required"),
            dateFound: yup.date().required("Date Found is required"),
            areaFound: yup.string().trim().min(3).max(500).required("Area Found is required"    )
        }),
        onSubmit: (data) => {
            data.itemName = data.itemName.trim();
            data.dateFound = data.dateFound.$d
            data.areaFound = data.areaFound.trim();
            data.itemID = `${ts}${data.itemName.replaceAll(" ", "")}`;
            handleImgUpload(img, data.itemID).then((res)=> {
                // Get Labels from Rekognition
                http.post("/detectLabels", {"photoKey": data.itemID}).then((res) => {
                    data.category = res.data.body.replaceAll('"','');
                    http.post("/lostItems", data).then((res) => {
                        console.log(res);
                        navigate("/");
                    });
                });
            });
            
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
                    <Button
                        component="label"
                        variant="contained"
                        tabIndex={-1}
                        startIcon={<CloudUpload />}
                        sx ={{ display:"flex", justifySelf: "center"}}
                        >
                        Upload Image
                        <VisuallyHiddenInput
                            type="file"
                            onChange={handleImgChange}
                            multiple
                        />
                    </Button>
                    {
                        img ? (
                            <Container sx={{mt:3}}>
                                <img 
                                    style={{width:"100%"}}
                                    src={imgURL}
                                    loading="lazy"
                                />
                            </Container>
                        ) : <></>
                    }
                    { 
                        err ? (
                            <Typography sx={{display:"flex", justifySelf:"center", color:"red", mt: 3}}>
                                {err}
                            </Typography>
                        ) : <></>
                    }
                    <TextField
                        fullWidth
                        margin="normal"
                        autoComplete="off"
                        label="Item Name"
                        name="itemName"
                        value={formik.values.itemName}
                        onChange={formik.handleChange}
                        error={formik.touched.itemName && Boolean(formik.errors.itemName)}
                        helperText={formik.touched.itemName && formik.errors.itemName}
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