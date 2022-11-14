let uri
if(process.env.NODE_ENV == "production"){
    uri = {mongoURI: "mongodb://admin:admin>@blogapp-prod.gtcktq8.mongodb.net/?retryWrites=true&w=majority"};
}else{
    uri = {mongoURI: "mongodb://localhost/blogapp"};
}

export default uri