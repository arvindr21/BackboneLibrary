/*!
 * main.js for Library app built using Backbone
 * http://arvindr21.github.io/BackbonejsLibraryapp/
 *
 * Date: 2014, Jan.
 */
 
 /*
 *	Self Executing anonymous passing in jQuery
 */
(function ($) {

/*
*	Storing an Array of books for the library app. In this example we will not interact with the server
*	to fetch data.	
*/

    var books = [{title:"JS the good parts", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"},
        {title:"CS the better parts", author:"John Doe", releaseDate:"2012", keywords:"CoffeeScript Programming"},
        {title:"Scala for the impatient", author:"John Doe", releaseDate:"2012", keywords:"Scala Programming"},
        {title:"American Psyco", author:"John Doe", releaseDate:"2012", keywords:"Novel Slasher"},
        {title:"Eloquent JavaScript", author:"John Doe", releaseDate:"2012", keywords:"JavaScript Programming"}];

/*
*	Init the model. A Book. Lets set a default for the cover image. You know, just in case.
*/


    var Book = Backbone.Model.extend({
        defaults:{
            coverImage:"http://placehold.it/99x99"
        }
    });

/*
*	Define the collection. The primary argument will be the type of Collection. i.e. A book, Which makes this collection a library entity.
*/
    var Library = Backbone.Collection.extend({
        model:Book
    });

/*
*	Reusable Book view. We Define a book view consisting of the following items
*	1. A tagName - The holder, can be anything/Div is default
*	2. A className - Optional
*	3. Template - To render the UI from
*	4. render() - The magic logic.
*/

    var BookView = Backbone.View.extend({
        tagName:"div", 
        className:"bookContainer",
/*
*		If you did see the markup, we have a script tag which consists of the skeleton/template for the Book View. This is extracted and cached here.
*/
        template:$("#bookTemplate").html(),
        render:function () {
/*
*		Using underscore and converting the html to a template.
*/
            var tmpl = _.template(this.template); //tmpl is a function that takes a JSON and returns html
/*
*		Pass the model to the Template, and the template will populate the markup based on the model. (neat ha..)
*/
            this.$el.html(tmpl(this.model.toJSON())); //this.el is what we defined in tagName. use $el to get access to jQuery html() function
            return this; // Chaining things
        }
    });

/*
*	Library view uses pieces of Book view to build itself.
*/

    var LibraryView = Backbone.View.extend({
        el:$("#books"),
/*
*	Init method, get the books collections & trigger the render method.
*/  
        initialize:function(){
            this.collection = new Library(books);
            this.render();
        },
/*
*	Using underscore's each method, we iterate through all the books. Then call a method to render each item to the UI.
*/
        render: function(){
            var that = this;
            _.each(this.collection.models, function(item){
                that.renderBook(item);
            });
        },

/*
*	renderBook, internally calls the Book View and passes a model to it. This will spit out the view for each book, which gets appended to the Library View.
*/
        renderBook:function(item){
            var bookView = new BookView({
                model: item
            });
            this.$el.append(bookView.render().el);
        }
    });
    
/*
*	The Controller/Router - Lets define some routes, one to view all the books in library and one to view a selected book.
*/    
    var LibraryRouter = Backbone.Router.extend({
/*
*   ex url: <scheme>://<host>:<port>/<path>&<parameters>?<query>#<fragment>
*	'' -> If nothing is present as part of the fragment/Query, we show the complete library
*	'View/:id' : Match any route that has a 'View' as part of the fragment and anything after that as ID
*/
        routes: {
            '': 'showLibrary',
            'View/:id': 'view' // #View/1
        },

        showLibrary: function (id) {
/*
*		Call the library view
*/        
            var libraryView = new LibraryView();
        },

        view: function (id) {
/*
*	Call the individual book view	
*/
           var book = new Book({
        	title:"Some title",
			author:"John Doe",
        	releaseDate:"2012",
        	keywords:"JavaScript Programming"
   		 });

    	bookView = new BookView({
        	model: book
    	});

    	$("#books").html(bookView.render().el);
        }
    });
    
    var appRouter = new LibraryRouter();
    Backbone.history.start();


    
    
})(jQuery);