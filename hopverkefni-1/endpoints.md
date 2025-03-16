API Endpoints

- [x] **User Registration and Login**
    - [x] POST /register: Register a new user.
    - [x] POST /login: Authenticate a user and return a JWT token.

- [x] **Posts**
    - [x] POST /posts: Create a new post.
    - [x] GET /posts: Get a list of all posts.
    - [x] GET /posts/:id: Get a single post by ID.
    - [x] PUT /posts/:id: Update a post by ID.
    - [x] DELETE /posts/:id: Delete a post by ID.

- [x] **Comments**
    - [x] POST /posts/:postId/comments: Add a comment to a post.
    - [x] GET /posts/:postId/comments: Get all comments for a post.
    - [x] PUT /comments/:commentId: Update a comment by ID.
    - [x] DELETE /comments/:commentId: Delete a comment by ID.

- [x] **Categories**
    - [x] POST /categories: Create a new category.
    - [x] GET /categories: Get a list of all categories.
    - [x] GET /categories/:id: Get a single category by ID.
    - [x] PUT /categories/:id: Update a category by ID.
    - [x] DELETE /categories/:id: Delete a category by ID.

- [x] **Tags**
    - [x] POST /tags: Create a new tag.
    - [x] GET /tags: Get a list of all tags.
    - [x] GET /tags/:id: Get a single tag by ID.
    - [x] PUT /tags/:id: Update a tag by ID.
    - [x] DELETE /tags/:id: Delete a tag by ID.

- [x] **Likes**
    - [x] POST /posts/:postId/like: Like a post.
    - [x] DELETE /posts/:postId/like: Unlike a post.

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
