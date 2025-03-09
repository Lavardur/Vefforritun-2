import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createCategory, getCategories, getCategory, validateCategory, deleteCategory, updateCategory } from './categories.db.js'
import { getQuestions, getQuestion, validateQuestion, createQuestion, deleteQuestion, updateQuestion, getQuestionsByCategory } from './questions.db.js'
import { cors } from 'hono/cors'

const app = new Hono()

app.use('/*', cors())

app.get('/', (c) => {
  const data =  {
    hello: 'hono'
  }
  return c.json(data)
})

app.get('/categories', async (c) => {
  const categories = await getCategories();
  return c.json(categories)
})

app.get('/categories/:slug', async (c) => {
  const slug = c.req.param('slug')

  // Validate á hámarkslengd á slug

  const category = await getCategory(slug)

  if (!category) {
    return c.json({ message: 'not found' }, 404)
  }
  console.log(category);
  return c.json(category);
})

app.post('/categories', async (c) => {
  let categoryToCreate: unknown;
  try {
    categoryToCreate = await c.req.json();
    console.log(categoryToCreate);
  } catch (e) {
    return c.json({ error: 'invalid json' }, 400)
  }

  const validCategory = validateCategory(categoryToCreate)

  if (!validCategory.success) {
    return c.json({ error: 'invalid data', errors: validCategory.error.flatten() }, 400)
  }

  const createdCategory = await createCategory(validCategory.data)

  return c.json(createdCategory, 201)
})

app.patch('/categories/:slug', async (c) => {
  const slug = c.req.param('slug')
  let categoryToUpdate: unknown;
  try {
    categoryToUpdate = await c.req.json();
    console.log(categoryToUpdate);
  } catch (e) {
    return c.json({ error: 'invalid json' }, 400)
  }

  const validCategory = validateCategory(categoryToUpdate)

  if (!validCategory.success) {
    return c.json({ error: 'invalid data', errors: validCategory.error.flatten() }, 400)
  }

  const updatedCategory = await updateCategory(slug, validCategory.data);

  return c.json(updatedCategory, 200);
})

app.delete('/categories/:slug', async (c) => {
  const slug = c.req.param('slug')

  const deleted = await deleteCategory(slug);
  if (!deleted) {
    return c.json({ message: 'not found' }, 404);
  }
  return c.json({ message: 'category deleted' }, 200);

})

//questions 

app.get('/questions', async (c) => {
  const questions = await getQuestions();
  return c.json(questions)
})

app.get('/questions/:slug', async (c) => {
  const slug = c.req.param('slug')

  const question = await getQuestion(slug)

  if (!question) {
    return c.json({ message: 'not found' }, 404)
  }
  console.log(question);
  return c.json(question);
})

app.post('/questions', async (c) => {
  let questionToCreate: unknown;
  try {
    questionToCreate = await c.req.json();
    console.log(questionToCreate);
  } catch (e) {
    return c.json({ error: 'invalid json' }, 400)
  }

  const validQuestion = validateQuestion(questionToCreate)

  if (!validQuestion.success) {
    return c.json({ error: 'invalid data', errors: validQuestion.error.flatten() }, 400)
  }

  const createdQuestion = await createQuestion(validQuestion.data)

  return c.json(createdQuestion, 201)
})

app.patch('/questions/:slug', async (c) => {
  const slug = c.req.param('slug')
  let questionToUpdate: unknown;
  try {
    questionToUpdate = await c.req.json();
    console.log(questionToUpdate);
  } catch (e) {
    return c.json({ error: 'invalid json' }, 400)
  }

  const validQuestion = validateQuestion(questionToUpdate)

  if (!validQuestion.success) {
    return c.json({ error: 'invalid data', errors: validQuestion.error.flatten() }, 400)
  }

  const updatedQuestion = await updateQuestion(slug, validQuestion.data);

  return c.json(updatedQuestion, 200);
})

app.delete('/questions/:slug', async (c) => {
  const slug = c.req.param('slug')

  const deleted = await deleteQuestion(slug);
  if (!deleted) {
    return c.json({ message: 'not found' }, 404);
  }
  return c.json({ message: 'question deleted' }, 200);

})

app.get('/categories/:slug/questions', async (c) => {
  const slug = c.req.param('slug');

  const questions = await getQuestionsByCategory(slug);

  return c.json(questions);
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})