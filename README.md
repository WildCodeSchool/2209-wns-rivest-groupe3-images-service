# **Images-services API**

## **Routes for an User**
This routes allows you to perform CRUD operations on an user.

### **Upload an Avatar Image**

**Method:** POST<br>
**Route:** **`/upload/avatar`**<br>
**Description:** Uploads a new avatar image for the user.<br>
**Headers:** An authorization token is required to use this route.<br>
**Request Body:** A file (**`newFile`**) containing the avatar image.

### **Read an Avatar Image**

**Method:** GET<br>
**Route:** **`/users/:userId/avatars/:filename`**<br>
**Description:** Retrieves the specified avatar image for the user.<br>
**Path Parameters:**

- **`userId`**: The id of the user.
- **`filename`**: The name of the file.

### **Update an Avatar Image**

**Method:** PUT<br>
**Route:** **`/update-avatar/:oldFilename`**<br>
**Description:** Updates the specified avatar image for the user.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`oldFilename`**: The name of the file to be updated.

**Request Body:** A file (**`newFile`**) containing the new avatar image.

### **Delete an Avatar Image**

**Method:** DELETE<br>
**Route:** **`/delete/avatars/:filename`**<br>
**Description:** Deletes the specified avatar image for the user.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`filename`**: The name of the file to be deleted.

### **Delete all files for a User**

**Method:** DELETE<br>
**Route:** **`/delete-user`**<br>
**Description:** Deletes all images for the user.
**Headers:** An authorization token is required to use this route.<br>

## **Routes for a blog**
This routes allows you to perform CRUD operations on a blog.

### **Upload a Blog Cover Image**

**Method:** POST<br>
**Route:** **`/upload/blog/:blogId/cover`**<br>
**Description:** Uploads a new cover image for the blog.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`blogId`**: The id of the blog.

**Request Body:** A file (**`newCoverImg`**) containing the cover image.

### **Read a Blog Cover Image**

**Method:** GET<br>
**Route:** **`/users/:userId/blogs/:blogId/covers/:filename`**<br>
**Description:** Retrieves the specified cover image for the blog.<br>
**Path Parameters:**

- **`userId`**: The id of the user.
- **`blogId`**: The id of the blog.
- **`filename`**: The name of the file.

### **Update a Blog Cover Image**

**Method:** PUT<br>
**Route:** **`/update/blogs/:blogId/covers/:oldFilename`**<br>
**Description:** Updates the specified cover image for the blog.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`blogId`**: The id of the blog.
- **`oldFilename`**: The name of the file to be updated.

**Request Body:** A file (**`newCoverImg`**) containing the new cover image.

### **Delete a Blog Cover Image**

**Method:** DELETE<br>
**Route:** **`/delete/blogs/:blogId/covers/:filename`**<br>
**Description:** Deletes the specified cover image for the blog.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`blogId`**: The id of the blog.
- **`filename`**: The name of the file to be deleted.

DELETE "/delete-blog/:blogId"

## **Routes for an article**
This routes allows you to perform CRUD operations on article images.

### **Upload an Article Image**

**Method:** POST<br>
**Route:** **`/upload/blog/:blogId/article/:articleId`**<br>
**Description:** Uploads a new image for the article.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`blogId`**: The id of the blog.
- **`articleId`**: The id of the article.

**Request Body:** A file (**`newArticleImg`**) containing the article image.

### **Read an Article Image**

**Method:** GET<br>
**Route:** **`/users/:userId/blogs/:blogId/articles/:articleId/files/:filename`**<br>
**Description:** Retrieves the specified image for the article.<br>
**Path Parameters:**

- **`userId`**: The id of the user.
- **`blogId`**: The id of the blog.
- **`articleId`**: The id of the article.
- **`filename`**: The name of the file.

### **Update an Article Image**

**Method:** PUT<br>
**Route:** **`/update/blogs/:blogId/articles/:articleId/files/:oldFilename`**<br>
**Description:** Updates the specified image for the article.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`blogId`**: The id of the blog.
- **`articleId`**: The id of the article.
- **`oldFilename`**: The name of the file to be updated.

**Request Body:** A file (**`newArticleImg`**) containing the new article image.

### **Delete an Article Image**

**Method:** DELETE<br>
**Route:** **`/delete/blogs/:blogId/articles/:articleId/files/:filename`**<br>
**Description:** Deletes the specified image for the article.<br>
**Headers:** An authorization token is required to use this route.<br>
**Path Parameters:**

- **`blogId`**: The id of the blog.
- **`articleId`**: The id of the article.
- **`filename`**: The name of the file to be deleted.