//Create a bookmarking app where you can save URLs.
//It should have a form where you enter the URL, a title, and a "tag".

//There should be a list of all the URLs,
//as well as a list of all the tags (this should be generated dynamically from the link collection).

//When you click on a tag, the link list should show only those tags. Hint: which tag is selected is "application state".



  ///////////////////////////////
 //          MODELS           //
///////////////////////////////


var Bookmark = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/peoplemel'
});

var LinkToSave = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/peoplemel'
});

var LinkList = Backbone.Collection.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/peoplemel'
});

var Tag = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/peoplemel'
});

var TagList = Backbone.Collection.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/peoplemel'
});

  ///////////////////////////////
 //          VIEWS            //
///////////////////////////////

var TagView = Backbone.View.extend({
  tagName: 'p',
  className: 'tag',
  template: _.template($('#tagViewTemplate').html()),

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));

    return this;
  }
});

var LinkView = Backbone.View.extend({ //each individual url
  tagName: 'p',
  className: 'link',
  template: _.template($('#linkViewTemplate').html()),

  render: function(){
    var data = this.model.toJSON();
    this.$el.html(this.template(data));

    return this;
  }
});

var TagListView = Backbone.View.extend({
  tagName: 'section',
  className: 'tagList',

  initialize: function(){ //when anything new is fetched on synced, automatically run the render function
    this.listenTo(this.collection, 'fetch sync', this.render);
  },

  render:function(){
    var view = this;

    this.collection.each(function(model){
        var tag = new TagView({
          model: model
        });
        tag.render();
        view.$el.append(tag.el);
    });
  }
});

var LinkListView = Backbone.View.extend({
  tagName: 'section',
  className: 'urlList',

  initialize: function(){ //when anything new is fetched on synced, automatically run the render function
    this.listenTo(this.collection, 'fetch sync', this.render);
  },

  render:function(){
    var view = this;

    this.collection.each(function(model){
        var link = new LinkView({
          model: model
        });
        link.render();
        view.$el.append(link.el);
    });
  }
});

var Form = Backbone.View.extend({
  tagName: 'section',
  className: 'form',
  template: _.template($('#formTemplate').html()),
  events: {
    'click .send': 'handleSendClick'
  },
  send: function(){
    //store proper values in variables
    var link = this.$('.link').val();
    var title = this.$('.title').val();
    var tag = this.$('.tag').val();

    //check if boxes are filled in
    if(link.trim() === ''){
      alert('URL is required');
      return;
    }
    if(title.trim() === ''){
      alert('Title is required');
      return;
    }
    if(tag.trim() === ''){
      alert('Tag is required');
      return;
    }

    var bookmark = new Bookmark({  //instance: create an object to be saved in server
      link: link,
      title: title,
      tag: tag,
    });

    bookmark.save(); //send data to the server

    this.$('input').val(''); //reset the form after sending
},
  handleSendClick: function(event){
    event.preventDefault();
    this.send();
  },

  render: function(){
    var formTemplate = $('#formTemplate').html();
    this.$el.html(formTemplate);
    return this;
  }
});

var linksCollection = new LinkList();

var linkListView = new LinkListView({
  collection: linksCollection
});

linksCollection.fetch({
  success: function(){
    $('main').append(linkListView.el);
  }
});

var tagList = new TagList();

var tagListView = new TagListView({
  collection: tagList
});

tagList.fetch({
  success: function(){
    $('main').append(tagListView.el);
  }
});

var formBox = new Form();

formBox.render();

$('main').append(formBox.el);
