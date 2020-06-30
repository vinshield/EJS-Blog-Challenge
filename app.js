//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const _ = require("lodash");
const ejs = require("ejs");
// const truncate = require(__dirname + "/truncate.js");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

let posts = [];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get('/', (req, res) => {

  //Uncomment this section to truncate by number of words instead of number of characters. Remember to require the truncate module first.
  // let dispPosts = [];
  //
  // //Creating a new array with a truncated version of post.content to be passed to home.ejs
  // posts.forEach((post) => {
  //   const dispPost = {
  //     dispTitle: post.title,
  //     dispContent: truncate(post.content, 20)
  //   };
  //   dispPosts.push(dispPost);
  // });

  res.render('home', {
    posts: posts,
    // homeStartingContent: truncate(homeStartingContent, 20)
    homeStartingContent: homeStartingContent
  });
});

app.get('/about', (req, res) => {
  res.render('about', {aboutContent: aboutContent});
});

app.get('/contact', (req, res) => {
  res.render('contact', {contactContent: contactContent});
});

app.get('/compose', (req, res) => {
  res.render('compose');
});

app.get('/posts/:postName', (req, res) => {

  //obtains parameter from url entered
  const requiredPost = _.kebabCase(req.params.postName.toLowerCase());

  //checks for a post with the same title as parameter postName
  posts.forEach(function(post) {
    const storedPost = _.kebabCase(post.title.toLowerCase());
    if(requiredPost === storedPost) {
      res.render('post',
      {
        title: post.title,
        content:post.content
      });
    } else {
      console.log("Not a match");
    }
  });

});

app.post('/compose', (req, res) => {
  const post = {
    title: req.body.postTitle,
    content: req.body.postBody
  };
  posts.push(post);
  res.redirect('/');
});





app.listen(3000, function() {
  console.log("Server started on port 3000");
});
