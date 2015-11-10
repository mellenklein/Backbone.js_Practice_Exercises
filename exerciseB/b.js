//Create a form for a person.
//It should have a first name, last name, address, and phone number. The form should validate the correct formats on submit.

//It should save the person to http://tiny-starburst.herokuapp.com/collections/people


  ///////////////////////////////
 //          MODELS           //
///////////////////////////////

var User = Backbone.Model.extend({
  url: 'http://tiny-starburst.herokuapp.com/collections/people'
});

  ///////////////////////////////
 //          VIEWS            //
///////////////////////////////

var Form = Backbone.View.extend({
  tagName: 'section',
  className: 'form',
  template: _.template($('#formTemplate').html()),
  events: {
    'click .send': 'handleSendClick'
  },
  send: function(){
    //store proper values in variables
    var first = this.$('.firstName').val();
    var last = this.$('.lastName').val();
    var address = this.$('.address').val();
    var phone = this.$('.phone').val();

    //check if boxes are filled in
    if(first.trim() === ''){
      alert('First Name is required');
      return;
    }
    if(last.trim() === ''){
      alert('Last Name is required');
      return;
    }
    if(address.trim() === ''){
      alert('Address is required');
      return;
    }
    if(phone.trim() === ''){
      alert('Phone number is required');
      return;
    }

    var user = new User({  //instance: create an object to be saved in server
      name: first,
      address: address,
      phone: phone,
    });

    user.save(); //send data to the server

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

var formBox = new Form();

formBox.render();

$('main').append(formBox.el);
