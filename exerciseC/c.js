//Create a "blog reading app", where you have
//a list of blog posts on the side
//and when you click on a post title,
  //it opens that post in another view. You can use the data at http://tiny-starburst.herokuapp.com/collections/posts.

  ///////////////////////////////
 //          MODELS           //
///////////////////////////////

var BlogPost = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/postsmel'
});

var BlogPosts = Backbone.Collection.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/postsmel'
});

  ///////////////////////////////
 //          VIEWS            //
///////////////////////////////

var PostView = Backbone.View.extend({
  tagName: 'article',
  className: 'post',
  template: _.template($('#postViewTemplate').html()),

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));

    return this;
  }
});

var FeedView = Backbone.View.extend({
  tagName: 'section',
  className: 'feed',

  initialize: function(){ //when anything new is fetched on synced, automatically run the render function
    this.listenTo(this.collection, 'fetch sync', this.render);
  },

  render:function(){
    var view = this;

    this.collection.each(function(model){
        var post = new PostView({
          model: model
        });
        post.render();
        view.$el.append(post.el);
    });
  }
});

var OpenPostView = Backbone.View.extend({
  tagName: 'section',
  className: 'expand',
  template: _.template($('#openPostTemplate').html()),

  events: {
    'click .title': 'handleClickExpand'
  },

  expand: function(){ //when the title is clicked,
    //render the new view
    var title = this.$('.title').html();
    var post = this.$('.post').html();

    var openPost = new BlogPost();

    openPostView.append.html(openPost);
  },

  handleClickExpand:function(event){
    this.expand();
  },

  render: function(){
    var openPostTemplate = $('#openPostTemplate').html();
    this.$el.html(openPostTemplate);

    return this;
  }

});

  ///////////////////////////////
 //          RENDERING        //
///////////////////////////////

var postsCollection = new BlogPosts();

var feedView = new FeedView({
  collection: postsCollection
});

postsCollection.fetch({
  success: function(){
    $('main').append(feedView.el);
  }
});

var openPostView = new OpenPostView();
openPostView.render();

$('main').append(openPostView.el);
