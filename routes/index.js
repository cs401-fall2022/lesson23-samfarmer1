var express = require('express');
var router = express.Router();

// Initialize sqlite3 database connection
const sqlite3 = require('sqlite3').verbose();


router.get('/', function (req, res, next) {
  var db = new sqlite3.Database('blog.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error - " + err);
        exit(1);
      }
      //Query if the table exists if not lets create it on the fly!
      db.all(`SELECT name FROM sqlite_master WHERE type='table' AND name='blog_post'`,
        (err, rows) => {
          if (rows.length === 1) {
            console.log("Table exists!");
            db.all(`SELECT * FROM blog_post`, (err, rows) => {
              console.log("returning " + rows.length + " records");
              res.render('index', { title: 'My Blog', data: rows });
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(`CREATE TABLE blog_post (
                     blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     title text NOT NULL,
                     blog_author text NOT NULL,
                     content text NULL);
                     
                     insert into blog_post (blog_author, title, content)
                     values ('Anonymous', 'Day 1', 'Hope you all are having a good day! Mine has been fine so far...')`,
              () => {
                db.all(`SELECT blog_id, blog_author, title, content FROM blog_post`, 
                (err, rows) => {
                  res.render('index', { title: 'My Blog', data: rows });
                });
              });
          }
        });
    });
});

router.post('/new', (req, res, next) => {
  var db = new sqlite3.Database('blog.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("inserting new post");
      db.run(`INSERT INTO blog_post ( blog_author, title, content)
      VALUES (?, ?, ?);`, [req.body.author, req.body.postTitle, req.body.content]); //sanitizing
      //redirect to homepage
      res.redirect('/');
    }
  );
});

router.post('/delete', (req, res, next) => {
  var db = new sqlite3.Database('blog.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("deleting post");
      db.run(`DELETE FROM blog_post WHERE blog_id=?;`, [req.body.id]); //sanitizing
      //redirect to homepage
      res.redirect('/');
    }
  );
});

router.post('/update', (req, res, next) => {
  var db = new sqlite3.Database('blog.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.log("Getting error " + err);
        exit(1);
      }
      console.log("updating post");
      db.run(`UPDATE blog_post SET content=? WHERE blog_id=?;`, [req.body.content, req.body.id]); //sanitizing
      //redirect to homepage
      res.redirect('/');
    }
  );
});

module.exports = router;
