import React,{ Fragment, useState }  from 'react';
import { v4 as uuidv4 } from 'uuid';
import PropTypes from 'prop-types';

const Formulario = ({crearCita}) => {

    //Crear state de Citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario: '',
        fecha: '',
        hora: '',
        sintomas: ''
    }); 
    // State de Error campos vacios Formulario
    const [error, actualizarError] = useState(false);



    // Funcion que se ejecta cada vez que se escribe algo en los campos
    const actualizarState = (e) => {
        // actualizar state mediante el objeto actualizarCita
        actualizarCita({
            // - array distructioning -
            // asignar el nombre & tomar el valor que se escribe x cada input
            ...cita, // tomar una copia  del objeto para no borrar ninguna propiedad
            [e.target.name] : e.target.value
        });
    }


    //extraer los valores de la cita
    const { mascota,propietario,fecha,hora,sintomas } = cita;


    //funcion al precionar enviar formulario
    const agregarCita = (e) => {
        e.preventDefault();

        // validar
        if( mascota.trim() === '' || 
            propietario.trim() === '' || 
            fecha.trim() === '' || 
            hora.trim() === '' || 
            sintomas.trim() === ''){

                actualizarError(true);
                
            return;  // para que ya no se se siga ejecutando las lineas de abajo
        }
        //eliminar el mensaje de error
        actualizarError(false);

        // asignar id
        cita.id = uuidv4();

        // crear cita   
        crearCita(cita);

        // reiniciar el form
        actualizarCita({
            mascota: '',
            propietario: '',
            fecha: '',
            hora: '',
            sintomas: ''
        });

    };

    return(
        <Fragment>
            <h2>Crear citas</h2>

            { error ?  <p className="alerta-error">Todos los campos son obligatorios</p> : null }

            <form onSubmit={agregarCita}>
                <label>Nombre Mascota</label>
                <input 
                    type="text"
                    name="mascota"
                    className="u-full-width"
                    placeholder="Nombre mascota"
                    onChange={actualizarState}
                    value={mascota}
                />
                <label>Nombre Dueño</label>
                <input 
                    type="text"
                    name="propietario"
                    className="u-full-width"
                    placeholder="Nombre dueño de la mascota"
                    onChange={actualizarState}
                    value={propietario}
                />
                <label>Fecha</label>
                <input 
                    type="date"
                    name="fecha"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={fecha}
                />
                <label>Hora</label>
                <input 
                    type="time"
                    name="hora"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={hora}
                />
                <label>Síntomas</label>
                <textarea                    
                    name="sintomas"
                    className="u-full-width"
                    onChange={actualizarState}
                    value={sintomas}
                ></textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
            
        </Fragment>
    )
}

//prop types
Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;