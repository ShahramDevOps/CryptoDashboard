// Replace 'YOUR_JWT_TOKEN' with the actual JWT token
const jwtToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6Im92ZXlzaS5zaCIsIm5iZiI6MTcwMTI0ODEyMCwiZXhwIjoxNzAxNTA3MzIwLCJpYXQiOjE3MDEyNDgxMjB9.MWeTojya0RqiVzxeWm6jKtR5wY0HVbAhu0WlYQs_g-g';

// Example GET request with JWT token in headers
axios.get('https://localhost:44338/api/ClientAppProcessFlowActions/GetAll', {
    headers: {
        'Authorization': `Bearer ${jwtToken}`,
        'Content-Type': 'application/json',  // You might need to adjust the content type based on your API requirements
    },
})
    .then(response => {
        console.log('Data:', response.data);
    })
    .catch(error => {
        console.error('Error:', error);
    });