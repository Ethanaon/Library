var BookInstance = require('../models/bookinstance');
var async = require('async');
var Book = require('../models/book');

// Display list of all BookInstances.
exports.bookinstance_list = function(req, res, next) {

    BookInstance.find()
      .populate('book')
      .exec(function (err, list_bookinstances) {
        if (err) { return next(err); }
        // Successful, so render
        res.render('bookinstance_list', { title: 'Book Instance List', bookinstance_list: list_bookinstances });
      });
      
};

// Display detail page for a specific BookInstance.
exports.bookinstance_detail = function(req, res) {
    async.waterfall([
        function(callback) {
            BookInstance.findById(req.params.id, function(err, bookInstance) { 
                BookInstance.populate(bookInstance, 'book', function(err, bookInstance) {
                    if (err) return(err);
                    callback(null, bookInstance);
                });
            });
        },
        function(bookInstance, callback) {
            Book.findById(bookInstance.book._id, function(err, book) {
                var opts = [
                    { path: 'author' },
                    { path: 'genre'}
                ];
                Book.populate(book, opts, function(err, book) {
                    if (err) return(err);
                    callback(null, bookInstance, book);
               });
            });
        }
    ], function(err, bookInstance, book) {
        if (err) { return (err); }
        if (bookInstance==null) { // No results.
            var err = new Error('Book instance not found');
            err.status = 404;
            return (err);
        }
        // Successful, so render.
        res.render('bookinstance_detail', { title: 'Book: ', book_instance:  bookInstance, book: book } );
    });
};
/*User.findById(id, function (err, user) {
    var opts = [
        { path: 'company', match: { x: 1 }, select: 'name' }
      , { path: 'notes', options: { limit: 10 }, model: 'override' }
    ]
  
    User.populate(user, opts, function (err, user) {
      console.log(user);
    });
  });*/
/* Person.findOne({ 'name.last': 'Ghost' }, 'name occupation', function (err, person) {
    if (err) return handleError(err);
    // Prints "Space Ghost is a talk show host".
    console.log('%s %s is a %s.', person.name.first, person.name.last,
      person.occupation);
*/
async.waterfall([
    function(callback) {
        callback(null, 'one', 'two');
    },
    function(arg1, arg2, callback) {
        // arg1 now equals 'one' and arg2 now equals 'two'
        callback(null, 'three');
    },
    function(arg1, callback) {
        // arg1 now equals 'three'
        callback(null, 'done');
    }
], function (err, result) {
    // result now equals 'done'
});

// Display BookInstance create form on GET.
exports.bookinstance_create_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create GET');
};

// Handle BookInstance create on POST.
exports.bookinstance_create_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance create POST');
};

// Display BookInstance delete form on GET.
exports.bookinstance_delete_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete GET');
};

// Handle BookInstance delete on POST.
exports.bookinstance_delete_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance delete POST');
};

// Display BookInstance update form on GET.
exports.bookinstance_update_get = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update GET');
};

// Handle bookinstance update on POST.
exports.bookinstance_update_post = function(req, res) {
    res.send('NOT IMPLEMENTED: BookInstance update POST');
};