import {React, useState, useEffect} from 'react';
import {Container, Box, Typography, Grid2, Card, CardMedia, CardContent, IconButton, TextField, Button, Link } from "@mui/material";
import {Search, Clear} from "@mui/icons-material"; 
import http from '../http.js';
import dayjs from 'dayjs';

function Home() {
    const [itemList, setItemList] = useState([])
    
    // Retrieve Items from DynamoDB
    const getItems = () => {
        http.get('/lostItems').then((res) => {
            const json_res = JSON.parse(res.data['body'])
            setItemList(json_res)
        });
        // Temp List of Lost Items (DELETE AFT DB IS SETUP)
        // const temp = [
        //     {"id": 0, "itemName": "IPhone 14", "dateFound": "2025-01-20", "areaFound": "NYP BLK L Lvl 3", "image": "http://s3bucket.com/image"},
        //     {"id": 1, "itemName": "Wallet", "dateFound": "2025-01-13", "areaFound": "NYP BLK S Lvl 4", "image": "http://s3bucket.com/image"},
        //     {"id": 2, "itemName": "Thumb Drive", "dateFound": "2025-01-24", "areaFound": "NYP BLK L5.304", "image": "http://s3bucket.com/image"}
        // ]
        // setItemList(temp)
    }

    // Claim Items / Delete Items from DynamoDB
    const deleteItem = (id) => {
        http.delete(`/lostItems/${id}`).then(()=> {
            getItems();
            handleImgDelete();
        });
    } 

    const handleImgDelete = (itemID) => {
        const photoKey = itemID;

    };

     // Search Items 
     const [search, setSearch] = useState('');
     const onSearchChange = (e) => {
         setSearch(e.target.value);
     };
     const searchProducts = () => {
         http.get(`/lostItems?search=${search}`).then((res) => {
             setProductList(res.data);
         });
     };
 
     const onSearchKeyDown = (e) => {
         if (e.key === 'Enter') {
             searchProducts();
         }
     };
 
     const onClickSearch = () => {
         searchProducts();
     };
 
     const onClickClear = () => {
         setSearch('');
         getProducts();
     };

    useEffect(() => {
        getItems()
        console.log(itemList)
    }, [])
    
  return (
    <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Lost & Found Items
            </Typography>
            <Button variant='contained'>
                <Link href="/notifications" sx={{textDecoration:"none", color:"white"}}>Notifications</Link>
            </Button>
        </Box>
        {/* Search Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <TextField
                value={search}
                onChange={onSearchChange}
                onKeyDown={onSearchKeyDown}
                placeholder="Search items..."
                variant="outlined"
                size="small"
                sx={{ flexGrow: 1, mr: 2 }}
            />
            <IconButton color="primary" onClick={onClickSearch}>
                <Search />
            </IconButton>
            <IconButton color="secondary" onClick={onClickClear}>
                <Clear />
            </IconButton>
        </Box>
        {/* Item Grid */}
        <Grid2 container spacing={3}>
                {itemList.map((item) => (
                    <Grid2 item xs={12} sm={6} md={4} lg={3} key={item.id}>
                        <Card
                            sx={{
                                boxShadow: 3,
                                borderRadius: 2,
                                overflow: 'hidden',
                                display: 'flex',
                                flexDirection: 'column',
                                height: '100%',
                            }}
                        >
                            <CardMedia
                                component="img"
                                image={`https://tyler-cad-project-images.s3.us-east-1.amazonaws.com/${item.itemID}` || 'https://via.placeholder.com/150'}
                                alt={item.itemName}
                                sx={{ height: 150, objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    {item.itemName}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Date Found: {item.dateFound}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap', mb: 2 }}
                                >
                                    Area Found: {item.areaFound}
                                </Typography>
                                <Button 
                                    sx={{mt:2}}
                                    variant="contained"
                                    color="error" 
                                    fullWidth
                                    onClick = {() => deleteItem(item.itemID)}
                                >
                                        Claim
                                </Button>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}

                {/* Placeholder Item */}
                {/* <Grid2 item xs={12} sm={6} md={4} lg={3}>
                    <Card
                        sx={{
                            boxShadow: 3,
                            borderRadius: 2,
                            overflow: 'hidden',
                            display: 'flex',
                            flexDirection: 'column',
                            height: '100%',                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 
                        }}                                                                          
                    >                                                                                                                                                                                                                                                       
                        <CardMedia
                            component="img"
                            alt="Item name"
                            sx={{ height: 150, objectFit: 'cover' }}
                        />
                        <CardContent sx={{ flexGrow: 1 }}>
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Item Name
                            </Typography>
                            <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                                Date Found
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap', mb: 2 }}
                            >
                                Area Found
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2> */}
            </Grid2>
    </Container>
  )
}

export default Home