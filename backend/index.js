import express from 'express'
import {PORT, mongodb_url} from './config.js'
import mongoose from 'mongoose'
import { Book } from './models/bookModel.js'
import booksRoute from './routes/booksRoute.js'
import cors from 'cors'

const app = express()

// Middleware for parsing request body
app.use(express.json())

// Middleware for handling CORS policy
// Option 1. Allows ALL Origins with default of cors(*)
app.use(cors())
// Option 2. Allows Custom Origins
// app.use(
//     cors({
//         origin: 'http://localhost:3000',
//         methods: ['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHandlers: ['Content-Type']
//     }
// ))

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to MERN stack tutorial')
})

app.use('/books', booksRoute)


// Connect to DB
mongoose
    .connect(mongodb_url)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is running on port: ${PORT}`)
        })
    })
    .catch((error) => {
        console.log(error);
    })