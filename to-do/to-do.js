// Importamos el File System
const fs = require('fs');

let taskToDo = [];

const guardarDB = () => {
    // JSON es una funcion que convierte un objeto a un json valido
    let data = JSON.stringify(taskToDo);

    // Ahora guardamos la data en el File System
    fs.writeFile('db/data.json', data, (err) => {
        if (err) throw new Error ('No se pudo grabar', err);
    });
}

const cargarDB = () => {

    try {
        taskToDo = require('../db/data.json');
    } catch (error) {
        taskToDo = [];
    }
}

const crear = (descripcion) => {

    cargarDB();

    let toDo = {
        descripcion, 
        completado: false
    };

    taskToDo.push(toDo);

    guardarDB();

    return toDo;
}

const getListado = () => {
    cargarDB();
    return taskToDo;
}

const actualizar = (descripcion, completado = true) => {
    cargarDB();

    // Esto retorna un numero
    let index = taskToDo.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0){
        taskToDo[index].completado = completado;
        guardarDB();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    cargarDB();

    let nuevoListado = taskToDo.filter(tarea => tarea.descripcion !== descripcion);

    if(taskToDo.length === nuevoListado.length){
        return false;
    } else {
        taskToDo = nuevoListado;
        guardarDB();
        return true;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}