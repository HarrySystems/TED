(require('connect')())
.use(require('serve-static')(__dirname))
.listen(8080, function(){
    console.log('Server running on 8080...');
})