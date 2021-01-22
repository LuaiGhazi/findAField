// The catchAsync wrapper function
// We return a function that accepts a function and then executes the function and catches any errors 
// and passes them to next
module.exports = func => {
    return (req, res, next) => {
        func(req, res, next).catch(next);
    }
}