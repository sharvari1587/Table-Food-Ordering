const { signup, login, logout, resetPassword, verifyOtp, getUser } = require("./controllers/AuthController");
const { addToCart, getCart, removeFromCart, incrementQuantity, decrementQuantity, checkout, clearCart, createOrder,
    getAllOrders,
    togglePaymentStatus } = require("./controllers/FeatureController");
const { verifyToken } = require("./middlewares/verifyToken");
const { adlogin } = require('./controllers/admin.controller');

const router = require("express").Router();
const fs = require('fs');
const path = require('path');
const FoodData = require('./FoodData'); // Import FoodData file

// AUTH ROUTES
router.post("/signup", signup)
router.post("/login", login)
router.get("/logout", logout)
router.put("/reset-password", resetPassword)
router.put("/verify-otp", verifyOtp)
router.get("/get-user", verifyToken, getUser)

// FEATURE ROUTES
router.post("/add-to-cart/:id", addToCart)
router.get("/get-cart/:id", getCart)
router.delete("/remove-from-cart/:id", removeFromCart)
router.put("/increment-quantity/:id", incrementQuantity)
router.put("/decrement-quantity/:id", decrementQuantity)
router.get("/checkout", verifyToken, checkout)
router.get("/clear-cart", verifyToken, clearCart)

router.get('/getorders', getAllOrders);
router.put('/orders/:orderId', togglePaymentStatus);

router.post('/adlogin', adlogin);

// Route to fetch menu items
router.get('/menu', (req, res) => {
    res.json(FoodData);
});

router.post('/add-menu', (req, res) => {
    const { name, img, price, desc, category, rating } = req.body;

    // Path to your JavaScript data file
    const filePath = path.join(__dirname, 'FoodData.js');

    // Read the current file
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Failed to read file:', err);
            return res.status(500).json({ message: 'Failed to read data file.' });
        }

        // Attempt to manipulate the data as a string
        try {
            // This assumes the array is exported as "module.exports = [...]"
            const dataArray = eval(data.replace('module.exports =', ''));
            const newItem = { id: dataArray.length + 1, name, img, price, desc, category, rating };
            dataArray.push(newItem);

            // Convert array back to string and prepare to write it back
            const newFileContent = `module.exports = ${JSON.stringify(dataArray, null, 2)};`;

            // Write the modified content back to the file
            fs.writeFile(filePath, newFileContent, err => {
                if (err) {
                    console.error('Failed to write to file:', err);
                    return res.status(500).json({ message: 'Failed to update data file.' });
                }
                res.status(201).json({ message: 'Menu item added successfully' });
            });
        } catch (parseError) {
            console.error('Error parsing or updating data:', parseError);
            res.status(500).json({ message: 'Error processing data' });
        }
    });
});

module.exports = router;