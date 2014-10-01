$(function () {

  var log = function (e, cls) {
    cls = typeof cls === 'boolean' ? cls : false;
    cls ? console.clear() : '';
    console.log(e);
  };

  Parse.$ = jQuery;

  // Replace this line with the one on your Quickstart Guide Page
  Parse.initialize("Uc0fPrKn30pHtuiVk20k7nRpC9ASoL9GJkjEkYOc", "Q6BWNsggHT7o6qgd5Izk9qzo0WGfj8QCrVCiZNAq");

//  var TestObject = Parse.Object.extend("TestObject");
//  var testObject = new TestObject();
//  testObject.save({foo: "bar"}).then(function (object) {
//    alert("yay! it worked");
//  });

  var Blog = Parse.Object.extend("Blog");
  var Blogs = Parse.Collection.extend({
    model: Blog
  });
  var BlogsView = Parse.View.extend({
    template: Handlebars.compile($('#blogs-tpl').html()),
    render: function () {
      var collection = {blog: this.collection.toJSON()};
      this.$el.html(this.template(collection));
    }
  });

  var blogs = new Blogs();
  blogs.fetch({
    success: function (blogs) {
      var blogsView = new BlogsView({collection: blogs});
      blogsView.render();
      $('.main-container').html(blogsView.el);
    },
    error: function (blogs, error) {
      log(error);
    }
  });

});