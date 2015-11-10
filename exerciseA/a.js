//Create a form that saves a blog post to http://tiny-starburst.herokuapp.com/collections/posts

//The post should have a title and a body. It does not need to display blog posts, just save them.

  ///////////////////////////////
 //    MODELS & COLLECTIONS   //
///////////////////////////////

//Make a new MODEL, so we can save our blog post to the server:
var BlogPost = Backbone.Model.extend({
  //use the POST method to create a new blog post and record on this url:
  url: 'http://tiny-starburst.herokuapp.com/collections/posts'
});

  ///////////////////////////////
 //          VIEWS            //
///////////////////////////////

//Create a view (instance) for the form to display on the screen:
var Form = Backbone.View.extend({
  tagName: 'section',
  className: 'form',
  template: _.template($('#formTemplate').html()),
  //event listeners for events within the view instance
  events: {
    'click .send': 'handleSendClick' //when a user clicks send button
  },
  send: function(){ //after handleSendClick runs, we'll call this function
    var title = this.$('.title').val(); //find the input value for title input, and store it in the title variable
    var content = this.$('.content').val();

    if(title.trim() === '') {  //if the title box is empty,
      alert('Please enter a title for your blog post');
      return;
    }
    if(content.trim() === '') {
      alert('Please enter content for your blog post');
      return;
    }

//Create a NEW INSTANCE of our BlogPost model, and add
//all the details of how it should be stored in the server.
    var blogPost = new BlogPost({
      title: title,
      content: content,
      created: Date.now()
    });

    blogPost.save();  //send the data to the server

    this.$('.title').val('');
    this.$('.content').val(''); //reset the boxes after submitting.
  },
  handleSendClick: function(event){ //listen for clicks
    event.preventDefault();
    this.send();  //call the send function for this event
  },
  
  render: function(){
    var formTemplate = $('#formTemplate').html();
    this.$el.html(formTemplate);
    return this;
  }
});

  ///////////////////////////////
 //        RENDERING          //
///////////////////////////////

//Create a NEW INSTANCE of the Form view:
var formBox = new Form();

//Render the form and update the section.form's inner html:
formBox.render();

//Display the form view instance onto the page:
$('main').append(formBox.el);
