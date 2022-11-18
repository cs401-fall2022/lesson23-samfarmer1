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
            db.all(`SELECT blog_id, title FROM blog_post`, (err, rows) => {
              console.log("returning " + rows.length + " records");
              res.render('index', { title: 'My Blog', data: rows });
            });
          } else {
            console.log("Creating table and inserting some sample data");
            db.exec(`CREATE TABLE blog_post (
                     blog_id INTEGER PRIMARY KEY AUTOINCREMENT,
                     title text NOT NULL);`,
              () => {
                db.all(`SELECT blog_id, title FROM blog_post`, 
                (err, rows) => {
                  res.render('index', { title: 'My Blog', data: rows });
                });
              });
          }
        });
    });
});

router.post('/new', (req, res, next) => {
  console.log("deleting stuff without checking if it is valid! SEND IT!");
  var db = new sqlite3.Database('blog.sqlite3',
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {

    }
  );
});

module.exports = router;
