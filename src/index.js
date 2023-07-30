const express = require('express')
const path = require('path')
const cors = require('cors')

const recipesRouter = require('./routers/recipes')
const usersRouter = require('./routers/users');
const { handleError } = require('./utils/error')
const auth = require('./middleware/auth.js');

const app = express()

app.use(cors())

app.use((req, res, next) => {
  const { method, path } = req
  console.log(`New request to ${method} ${path} at ${new Date().toISOString()}`)
  next()
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(auth.initialize());

app.use('/api/v1/recipes', recipesRouter)
app.use("/api/v1/users", usersRouter);

app.use(handleError)
const PORT = process.env.PORT || 8080

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})
