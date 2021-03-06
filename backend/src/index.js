if(process.env.NODE_ENV !== 'production'){
  require('dotenv').config();
}

const app = require('./app');
require('./database');

//PORT
app.set("port", process.env.PORT || 3000);

//server
async function main(){
  try{
    app.listen(app.get('port'));
    console.log('server on port', app.get('port'));
  }catch(e){
    console.log('Error al iniciar el servidor');
  }
}

main();
