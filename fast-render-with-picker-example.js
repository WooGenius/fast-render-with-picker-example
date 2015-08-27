FlowRouter.route("/with-fast-render", {
  subscriptions: function (params) {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action: function () {
    BlazeLayout.render("posts");
  }
});

FlowRouter.route("/with-fast-render-and-server-side-route", {
  subscriptions: function (params) {
    this.register('posts', Meteor.subscribe('posts'));
  },
  action: function () {
    BlazeLayout.render("posts");
  }
});

FlowRouter.route("/without-fast-render", {
  subscriptions: function (params) {
    if (Meteor.isClient)  // Without fast render
      this.register('posts', Meteor.subscribe('posts'));
  },
  action: function () {
    BlazeLayout.render("posts");
  }
});

if (Meteor.isClient) {
  Posts = new Meteor.Collection("posts");
  Template.posts.helpers({
    ready: function() {
      return FlowRouter.subsReady("posts");
    },
    posts: function () {
      return Posts.find();
    }
  })
}

if (Meteor.isServer) {
  Meteor.publish("posts", function () {
    this.added("posts", "id1", {text: "Post 1"});
    this.added("posts", "id2", {text: "Post 2"});
    this.added("posts", "id3", {text: "Post 3"});
    this.added("posts", "id4", {text: "Post 4"});
    this.added("posts", "id5", {text: "Post 5"});
    Meteor._sleepForMs(1000);
    this.ready();
  });

  Picker.route("/with-fast-render-and-server-side-route", function (params, request, response, next) {
    console.log("Pass through server side route");
    next();
  });
}
