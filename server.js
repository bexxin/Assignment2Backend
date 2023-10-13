//Entrypoint and primary config for server
import config from './config/config.js' 
import app from './server/express.js'
import mongoose from 'mongoose' 
import router from './server/routes/product.routes.js'

mongoose.Promise = global.Promise

//Connect to database
mongoose.connect(config.mongoUri, { useNewUrlParser: true,
//useCreateIndex: true, 
useUnifiedTopology: true } )

 .then(() => {
console.log("Connected to the Marketplace database!");
})

mongoose.connection.on('error', () => {
throw new Error(`unable to connect to database: ${config.mongoUri}`) 
})
//Product routes
app.use('/api', router);

app.get("/", (req, res) => {
res.json({ message: "Welcome to the Dress Store Application." });

});
app.listen(config.port, (err) => { 
if (err) {
console.log(err) 
}
console.info('Server started on port %s.', config.port) 
console.info('URI %s.', config.mongoUri) 
})
