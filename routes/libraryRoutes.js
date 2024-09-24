const express = require('express');
const router = express.Router();

// Simulated database for demonstration purposes
let books = [];

// Admin Dashboard
router.get('/admin', (req, res) => {
    res.render('admin_dashboard');
});

// User Dashboard
router.get('/user', (req, res) => {
    res.render('user_dashboard');
});

// Book Issue Page
router.get('/book/issue', (req, res) => {
    res.render('book_issue', { books });
});

// Handle Book Issue
router.post('/book/issue', (req, res) => {
    const { bookName, authorName } = req.body;

    if (!bookName || !authorName) {
        return res.status(400).render('book_issue', { error: 'Please provide both book name and author name.' });
    }

    const issueDate = new Date();
    const returnDate = new Date(issueDate);
    returnDate.setDate(returnDate.getDate() + 15);

    // Store book issue details
    const issueDetails = { bookName, authorName, issueDate, returnDate };
    books.push(issueDetails);
    res.redirect('/library/user'); // Redirect to user dashboard
});

// Book Return Page
router.get('/book/return', (req, res) => {
    res.render('book_return', { books });
});

// Handle Book Return
router.post('/book/return', (req, res) => {
    const { bookName, serialNo } = req.body;
    // Logic for handling book return
    res.redirect('/library/user');
});

// Pay Fine Page
router.get('/fine/pay', (req, res) => {
    res.render('fine_pay');
});

// Add Membership Page
router.get('/membership/add', (req, res) => {
    res.render('add_membership');
});

// Update Membership Page
router.get('/membership/update', (req, res) => {
    res.render('update_membership');
});

module.exports = router;
