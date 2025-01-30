import React from 'react';
import {Container, Box, Typography, Grid2, Card, CardMedia, CardContent } from "@mui/material";


function Home() {
  return (
    <Container>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 4, mb: 3 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                Lost & Found Items
            </Typography>
        </Box>
        {/* Item Grid */}
        <Grid2 container spacing={3}>
                {/* {itemList.map((item) => (
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
                                image={item.image || 'https://via.placeholder.com/150'}
                                alt={item.prod_name}
                                sx={{ height: 150, objectFit: 'cover' }}
                            />
                            <CardContent sx={{ flexGrow: 1 }}>
                                <Typography variant="h6" sx={{ mb: 1 }}>
                                    {item.prod_name}
                                </Typography>
                                <Typography variant="body1" sx={{ color: 'text.secondary', mb: 1 }}>
                                    Price: ${item.prod_price}
                                </Typography>
                                <Typography
                                    variant="body2"
                                    sx={{ color: 'text.secondary', whiteSpace: 'pre-wrap', mb: 2 }}
                                >
                                    {item.description}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid2>
                ))}*/}
                <Grid2 item xs={12} sm={6} md={4} lg={3}>
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
                        {/* Add an image placeholder if no item image */}
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
                </Grid2>
            </Grid2>
    </Container>
  )
}

export default Home