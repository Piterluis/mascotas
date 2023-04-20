const express = require('express')
const cors = require('cors')// dar acceso y permiso de concexion 
var mysql = require('mysql')  // conexio a la base de
const bodyParser = require('body-parser')
const app = express() // creando una variable app que contiene una instancia del express


app.use(cors())
app.use(bodyParser.json())// parser
const PORT = process.env.PORT || 3050;
var sql;

lettransaccionArr = []
connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: '',
      database: 'mascotas'
})

app.get('/', (req, res) => {
    res.send("Prueba Ruta 1")
})

app.get('/animales', (req, res) => {
    res.send("Aqui va a ir un listadito....")
})

app.get('/lista_animales', (req, res) => {
    const sql = 'select * from animales';
    console.log("Geteandooo "+sql)
    connection.query(sql, (error, results) => {
          if (error) throwerror;
          if (results.length > 0) {
                res.json(results)
                console.log(results)
          }
          else {
                res.send('no hay datos')
          }
    })

})



  app.get('/duenos', (req, res) => {
    // Código para obtener los datos de los dueños de la base de datos
    const owners = [
      { id: 1, nombre: 'Juan' },
      { id: 2, nombre: 'Maria' },
      { id: 3, nombre: 'Pedro' }
    ];
    res.json(owners);
  });

app.get('/duenos1', (req, res) => {
    const sql = 'select * from dueños';
    console.log("Dueños "+sql)
    connection.query(sql, (error, results) => {
          if (error) throwerror;
          if (results.length > 0) {
                res.json(results)
                console.log(results)
          }
          else {
                res.send('no hay datos')
          }
    })

})

//get es para consultar informacion-traer al cliente datos
app.get('/lista_animal/:id', (req, res) => {

    console.log("entra a la consulat")
    const { id } = req.params
    const idN=parseInt(id,10)
    connection.query(
        "SELECT * FROM animales WHERE id_mascota = ?", [idN],
        (err, results, field) => {
          if (err) {
            console.log(err);
          }
          else {
            res.status(200).send(results);
            console.log(results);
          }
        }
      );
    

})

//insertar datos - enviarle datos a la base de datos
app.post('/add_mascota',(req,res)=>{ 
    console.log("Posteandoooo")
    console.log(req.body)
    let transaccion=req.body;
    let nombre= transaccion["nombre"]; 
    let edad= transaccion["edad"];
    let id_dueno=transaccion["dueno"];
    console.log(nombre + ' y '+ id_dueno)
    var sql = `INSERT INTO animales (nombre,edad,id_dueño) VALUES ('${nombre}',${edad},${id_dueno})`;
    console.log(sql)
    connection.query(sql,(error,results)=>{
        if(error) throw error;
        
        if(results.length>0)
        { 
           console.log(results)
            res.json(results)
        }
        else{
            //('Registro guardado')
        }
     }) 
    
})



app.listen(PORT)
console.log(`Server on port ${PORT}​​​​​​​​`) 
