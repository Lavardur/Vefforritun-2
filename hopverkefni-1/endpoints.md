API Endpoints

- [x] **User Registration and Login**
    - [x] POST /register: Register a new user.
    - [x] POST /login: Authenticate a user and return a JWT token.

- [ ] **Posts**
    - [ ] POST /posts: Create a new post.
    - [ ] GET /posts: Get a list of all posts.
    - [ ] GET /posts/:id: Get a single post by ID.
    - [ ] PUT /posts/:id: Update a post by ID.
    - [ ] DELETE /posts/:id: Delete a post by ID.

- [ ] **Comments**
    - [ ] POST /posts/:postId/comments: Add a comment to a post.
    - [ ] GET /posts/:postId/comments: Get all comments for a post.

- [ ] **Categories**
    - [ ] POST /categories: Create a new category.
    - [ ] GET /categories: Get a list of all categories.
    - [ ] GET /categories/:id: Get a single category by ID.
    - [ ] PUT /categories/:id: Update a category by ID.
    - [ ] DELETE /categories/:id: Delete a category by ID.

- [ ] **Tags**
    - [ ] POST /tags: Create a new tag.
    - [ ] GET /tags: Get a list of all tags.
    - [ ] GET /tags/:id: Get a single tag by ID.
    - [ ] PUT /tags/:id: Update a tag by ID.
    - [ ] DELETE /tags/:id: Delete a tag by ID.

- [ ] **Likes**
    - [ ] POST /posts/:postId/like: Like a post.
    - [ ] DELETE /posts/:postId/like: Unlike a post.

- [ ] **Admin**
    - [ ] GET /admin/users: View all users.
    - [ ] PUT /admin/users/:id: Update user details.
    - [x] DELETE /admin/users/:id: Delete a user.
    - [ ] GET /admin/posts: View all posts.
    - [ ] PUT /admin/posts/:id: Update any post.
    - [ ] DELETE /admin/posts/:id: Delete any post.
    - [ ] GET /admin/comments: View all comments.
    - [ ] DELETE /admin/comments/:id: Delete any comment.
    - [ ] POST /admin/categories: Create a new category.
    - [ ] PUT /admin/categories/:id: Update a category.
    - [ ] DELETE /admin/categories/:id: Delete a category.
    - [ ] POST /admin/tags: Create a new tag.
    - [ ] PUT /admin/tags/:id: Update a tag.
    - [ ] DELETE /admin/tags/:id: Delete a tag.
