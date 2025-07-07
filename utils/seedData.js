const User = require('../models/User');
const Book = require('../models/Book');
const Transaction = require('../models/Transaction');
const Appointment = require('../models/Appointment');
const Comment = require('../models/Comment');

const seedData = async () => {
  try {
    // Clear existing data
    await User.deleteMany({});
    await Book.deleteMany({});
    await Transaction.deleteMany({});
    await Appointment.deleteMany({});
    await Comment.deleteMany({});

    // Sample user data
    const userData = {
      _id: "user_1751091168293",
      firstName: "otulaja",
      lastName: "favour",
      email: "otulajafavour14@gmail.com",
      phoneNumber: 9151596279,
      password: "123456",
      role: "user",
      broughtBooks: [
        {
          id: "1_0",
          title: "Prepare discussion large.",
          author: "Marissa Williams",
          image: "https://placekitten.com/310/391",
          price: 4029,
          pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
          purchaseDate: "2025-07-01T12:35:39.214Z",
          transactionRef: "ORDER_1751373332565_user_1751091168293",
          type: "bought",
          status: "purchased"
        }
      ],
      borrowedBooks: [],
      transactionHistory: [
        {
          id: "tx_1751373046219",
          userId: "user_1751091168293",
          totalAmount: 952,
          items: [
            {
              bookId: "1_0",
              title: "Prepare discussion large.",
              author: "Marissa Williams",
              type: "borrow",
              price: 952,
              image: "https://placekitten.com/310/391"
            }
          ],
          date: "2025-07-01T12:30:46.219Z",
          reference: "ORDER_1751373032558_user_1751091168293",
          status: "completed",
          metadata: {}
        }
      ],
      comments: [],
      appointments: [
        {
          subject: "tyuio",
          details: "fyui",
          date: "2025-06-29T13:59:00.000Z",
          status: "succesful",
          userId: "user_1751091168293",
          id: "apt_user_1751091168293_1751205584647",
          createdAt: "2025-06-29T13:59:44.647Z"
        }
      ],
      updatedAt: "2025-07-01T12:35:40.546Z",
      cart: []
    };

    // Sample book data
    const bookData = {
      _id: "1_0",
      title: "Prepare discussion large.",
      author: "Marissa Williams",
      description: "Big compare you major save. System nothing long eat bring language direction.\nReport off account per this peace indeed. Full than stock door behavior simple.",
      price: 4029,
      image: "https://placekitten.com/310/391",
      rent: 952,
      pdfUrl: "https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf",
      dateAdded: "2025-06-29",
      comments: []
    };

    // Sample transaction data
    const transactionData = [
      {
        _id: "tx_1751373046219",
        userId: "user_1751091168293",
        totalAmount: 952,
        items: [
          {
            bookId: "1_0",
            title: "Prepare discussion large.",
            author: "Marissa Williams",
            type: "borrow",
            price: 952,
            image: "https://placekitten.com/310/391"
          }
        ],
        date: "2025-07-01T12:30:46.219Z",
        reference: "ORDER_1751373032558_user_1751091168293",
        status: "completed",
        metadata: {}
      },
      {
        _id: "tx_1751373339214",
        userId: "user_1751091168293",
        totalAmount: 4029,
        items: [
          {
            bookId: "1_0",
            title: "Prepare discussion large.",
            author: "Marissa Williams",
            type: "buy",
            price: 4029,
            image: "https://placekitten.com/310/391"
          }
        ],
        date: "2025-07-01T12:35:39.214Z",
        reference: "ORDER_1751373332565_user_1751091168293",
        status: "completed",
        metadata: {}
      }
    ];

    // Sample appointment data
    const appointmentData = {
      _id: "apt_user_1751091168293_1751205584647",
      subject: "tyuio",
      details: "fyui",
      date: "2025-06-29T13:59:00.000Z",
      status: "succesful",
      userId: "user_1751091168293",
      createdAt: "2025-06-29T13:59:44.647Z"
    };

    // Insert sample data
    await User.create(userData);
    await Book.create(bookData);
    await Transaction.insertMany(transactionData);
    await Appointment.create(appointmentData);

    console.log('Sample data seeded successfully!');
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

module.exports = seedData;
