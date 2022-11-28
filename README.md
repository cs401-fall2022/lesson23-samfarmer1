# My Blog

## How to launch (for Windows)

```bash
npm install
DEBUG=lesson23-samfarmer1:*; npm start
```

This website uses express, pug, and sqlite3.

## Folders and Files

## Database Schema
### Blog Posts

| Column Name       | Class    | Constraints                   |
|-------------------|----------|-------------------------------|
| **blog_id**       | Integer  | Primary Key<br>Autoincrement  |
| **blog_author**   | Text     | Not Null                      |
| **title**         | Text     | Not Null                      |
| **content**       | Text     | Not NUll                      |
| **post_datetime** | Datetime | Not Null                      |