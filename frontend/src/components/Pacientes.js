import React, { useState, useEffect, useRef } from 'react';
import 'datatables.net-dt/css/jquery.dataTables.css';
import $ from 'jquery';
import 'datatables.net';

const Pacientes = () => {
    const [formData, setFormData] = useState({
        idpersona: '',
        apaterno: '',
        amaterno: '',
        nombre: '',
        fecha_nacimiento: '',
        sexo: 'M',
        estado_civil: 'S',
        alergia: '',
        intervenciones_quirurgicas: '',
        vacunas_completas: 'SI',
        tipo_documento: 'DNI',
        num_documento: '',
        direccion: '',
        telefono: '',
        email: '',
        ocupacion: '',
        persona_responsable: ''
    });
    const [isFormVisible, setIsFormVisible] = useState(false);
    const tableRef = useRef(null);

    const limpiarForm = () => {
        setFormData({
            idpersona: '',
            apaterno: '',
            amaterno: '',
            nombre: '',
            fecha_nacimiento: '',
            sexo: 'M',
            estado_civil: 'S',
            alergia: '',
            intervenciones_quirurgicas: '',
            vacunas_completas: 'SI',
            tipo_documento: 'DNI',
            num_documento: '',
            direccion: '',
            telefono: '',
            email: '',
            ocupacion: '',
            persona_responsable: ''
        });
    };

    const mostrarForm = (flag) => {
        limpiarForm();
        setIsFormVisible(flag);
    };

    const listar = () => {
        if (tableRef.current) {
            $(tableRef.current).DataTable().destroy();
        }
        $(tableRef.current).DataTable({
            processing: true,
            serverSide: true,
            ajax: {
                url: 'http://localhost:3002/api/persona/listar',
                type: 'GET',
                dataSrc: 'data'
            },
            columns: [
                {
                    data: 'idpersona',
                    render: (data, type, row) => `
                        <button title="Editar" class="btn btn-warning" onclick="mostrar(${data})">
                            <i class="fa fa-pencil"></i>
                        </button>
                        <button title="Historia Clínicas" class="btn btn-info" onclick="historia(${data})">
                            <i class="fa fa-file"></i>
                        </button>
                    `
                },
                { data: 'apaterno' },
                { data: 'amaterno' },
                { data: 'nombre' },
                { data: 'fecha_nacimiento' },
                { data: 'sexo' },
                { data: 'estado_civil' },
                { data: 'num_documento' },
                { data: 'direccion' },
                { data: 'telefono' }
            ],
            destroy: true,
            displayLength: 5,
            order: [[0, 'desc']]
        });
    };

    const guardarYEditar = (e) => {
        e.preventDefault();
        const url = formData.idpersona
            ? 'http://localhost:3002/api/persona/editar'
            : 'http://localhost:3002/api/persona/guardar';
        $.ajax({
            url,
            type: 'POST',
            data: formData,
            success: (response) => {
                alert(response.message);
                mostrarForm(false);
                listar();
            },
            error: (error) => {
                console.error('Error:', error);
            }
        });
    };

    useEffect(() => {
        listar();
    }, []);

    return (
        <div>
            {isFormVisible ? (
                <div id="formularioregistros">
                    <form onSubmit={guardarYEditar}>
                        <input type="hidden" name="idpersona" value={formData.idpersona} />
                        {/* ...rest of the input fields similar to the original form, using formData and onChange handlers */}
                        <button type="submit">Guardar</button>
                        <button type="button" onClick={() => mostrarForm(false)}>Cancelar</button>
                    </form>
                </div>
            ) : (
                <div id="listadoregistros">
                    <button onClick={() => mostrarForm(true)}>Agregar</button>
                    <input type="text" id="texto" placeholder="Apellido Paterno o Materno o DNI" />
                    <button onClick={listar}>Buscar</button>
                    <table ref={tableRef} className="display">
                        <thead>
                        <tr>
                            <th>Opciones</th>
                            <th>Apellido Paterno</th>
                            <th>Apellido Materno</th>
                            <th>Nombre</th>
                            <th>Fecha de Nacimiento</th>
                            <th>Sexo</th>
                            <th>Estado Civil</th>
                            <th>Número de Documento</th>
                            <th>Dirección</th>
                            <th>Teléfono</th>
                        </tr>
                        </thead>
                        <tbody></tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Pacientes;
