const service = require('../services/recipes')

const getAll = async (req, res, next) => {
  try {
    const data = await service.getAll()
    res.json(data)
  } catch (error) {
    next(error)
  }
}

const save = async (req, res, next) => {
  try {
    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients
    } = req.body

    const newRecipe = {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients]
    }

    res.status(201).json({ data: await service.save(newRecipe) })
  } catch (error) {
    next(error)
  }
}

const get = async (req, res, next) => {
  try {
    res.json({ data: res.locals.recipe })
  } catch (error) {
    next(error)
  }
}

const update = async (req, res, next) => {
  try {
    const { id } = req.params

    const {
      name,
      healthLabels,
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients
    } = req.body

    const updatedRecipe = {
      name,
      healthLabels: [...healthLabels],
      cookTimeMinutes,
      prepTimeMinutes,
      ingredients: [...ingredients]
    }

    const updated = await service.update(id, updatedRecipe)

    res.json({ data: updated })
  } catch (error) {
    next(error)
  }
}

const remove = async (req, res, next) => {
  try {
    const { id } = req.params
    await service.remove(id)
    res.sendStatus(204)
  } catch (error) {
    next(error)
  }
}

const recipeExists = async (req, res, next) => {
  const recipe = await service.get(req.params.id)

  if (!recipe) {
    const err = new Error('Recipe not found')
    err.statusCode = 404
    next(err)
  } else {
    res.locals.recipe = recipe
    next()
  }
}

module.exports = {
  getAll,
  get: [recipeExists, get],
  save,
  update: [recipeExists, update],
  remove: [recipeExists, remove]
}
