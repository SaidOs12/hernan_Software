
const express = require('express');
const morgan = require('morgan');
const {engine} = require('express-handlebars');
const path = require('path');
const jwt = require('jsonwebtoken');
const flash = require('connect-flash');
const { database }= require('./keys');
const passport = require('passport');
const session = require('express-session');
const mysqlstore = require('express-mysql-session')(session);
const MySQLStore = require('express-mysql-session');
require('dotenv').config();
// Intializations
const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/helpers')

}));
app.set('view engine', 'hbs');



app.set('PORT', process.env.PORT || 4000 );
// Middleware para verificar el token de autenticación
    

  app.use(session({
    secret: 'mysecret',
    resave: false,
    saveUninitialized: true,
    store: new mysqlstore(database)
  }));

        

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended : false }));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
 
//Variables Globales

app.use((req,res,next) => {
    app.locals.success = req.flash('success');
    app.locals.error = req.flash('error');
    next();
});


//Rutas
app.use(require('./routes/routes'));
app.use(require('./routes/recuperarcontra'));
app.use(require('./routes/contranueva'));
app.use(require('./routes/dashboardBibliotecario'));
app.use(require('./routes/dashboardAlumno'));
app.use(require('./routes/dashboardProfesor'));
app.use(require('./routes/login'));
app.use(require('./routes/unidad12'));
app.use(require('./routes/unidad13'));
app.use(require('./routes/unidad14'));
app.use(require('./routes/unidad15'));
app.use(require('./routes/unidad16'));
app.use(require('./routes/unidad17eva'));
app.use(require('./routes/unidad21'));
app.use(require('./routes/unidad22'));
app.use(require('./routes/unidad23'));
app.use(require('./routes/unidad24eva'));
app.use(require('./routes/unidad31'));
app.use(require('./routes/unidad32'));
app.use(require('./routes/unidad33'));
app.use(require('./routes/unidad34'));
app.use(require('./routes/unidad35'));
app.use(require('./routes/unidad36'));
app.use(require('./routes/unidad37'));
app.use(require('./routes/unidad38'));
app.use(require('./routes/unidad39eva'));
app.use(require('./routes/unidad41'));
app.use(require('./routes/unidad42'));
app.use(require('./routes/unidad43'));
app.use(require('./routes/unidad44eva'));
app.use(require('./routes/index'));
app.use(require('./routes/usuario'));
app.use(require('./routes/ejemplar'));
app.use(require('./routes/prestamo'));
app.use(require('./routes/tablainformacion'));
app.use(require('./routes/ejemplaresLista'));
app.use(require('./routes/ejemplaresListaPrestamo'));
app.use(require('./routes/ejemplaresListaAlumno'));
app.use(require('./routes/ejemplaresListaProfesor'));
app.use(require('./routes/proceso'));
app.use(require('./routes/register.js'));
app.use(require('./routes/registerUser.js'));
app.use(require('./routes/registerBook.js'));
app.use(require('./routes/registerMulta'));
app.use(require('./routes/evaluacion'));
app.use(require('./routes/actualizacion'));
app.use(require('./routes/modificar'));
app.use(require('./routes/respuesta'));
app.use(require('./routes/autentificacion'));
app.use(require('./routes/unidad11'));
app.use(require('./routes/eliminarEjemplar'));
app.use(require('./routes/modificarEjemplar'));
app.use(require('./routes/modificarEjemplarPrestamo'))
app.use(require('./routes/registerPrestamo'));

//Public
app.use(express.static(path.join(__dirname, 'public')));
//Arrancando el servidor
app.listen(app.get('PORT'), () => {
    console.log('Servidor corriendo en el puerto', app.get('PORT'));
});
