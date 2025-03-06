import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { createCategory, getCategories, getCategory, validateCategory, deleteCategory, updateCategory } from './categories.db.js'
import { cors } from 'hono/cors'
import xss from 'xss' 

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
  let categoryToCreate: any;
  try {
    categoryToCreate = await c.req.json();
    categoryToCreate.title = xss(categoryToCreate.title); 
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
  let categoryToUpdate: any;
  try {
    categoryToUpdate = await c.req.json();
    categoryToUpdate.title = xss(categoryToUpdate.title); 
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

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})