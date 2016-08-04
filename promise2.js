module.exports = function() {
    return new Promise(function(resolve) {
        setTimeout(function() {console.log('Promise2 returning after a further 3 seconds...'); resolve();}, 3000);
    });
};