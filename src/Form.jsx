// Form.jsx
import React, { useState } from 'react';
import './Form.css';

function Form() {
  const [datosPersonales, setDatosPersonales] = useState({
    nombre: '',
    fechaNacimiento: '',
    dpi: '',
    carrera: '',
    correo: '',
  });

  const [imagen, setImagen] = useState(null);
  const [mostrarTarjeta, setMostrarTarjeta] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDatosPersonales({ ...datosPersonales, [name]: value });
  };

  const handleImagenChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();

      // Verificar el tamaño de la imagen
      if (file.size > 500000) {
        alert('La imagen es demasiado grande. Debe ser menor de 500 KB.');
      } else {
        reader.onload = (e) => {
          setImagen({ dataURL: e.target.result, file });
        };
        reader.readAsDataURL(file);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Verificar si los campos requeridos no están vacíos
    if (
      datosPersonales.nombre &&
      datosPersonales.fechaNacimiento &&
      datosPersonales.dpi &&
      datosPersonales.carrera &&
      datosPersonales.correo
    ) {
      setMostrarTarjeta(true);
    } else {
      alert('Por favor, complete todos los campos obligatorios.');
    }
  };

  const resetForm = () => {
    setDatosPersonales({
      nombre: '',
      fechaNacimiento: '',
      dpi: '',
      carrera: '',
      correo: '',
    });
    setImagen(null);
    setMostrarTarjeta(false);
  };

  return (
    <div className="Form">
      <div className="form-container">
        <h1>Formulario de Datos Personales</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="label">Nombre:</label>
            <input
              type="text"
              name="nombre"
              value={datosPersonales.nombre}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Fecha de Nacimiento:</label>
            <input
              type="date"
              name="fechaNacimiento"
              value={datosPersonales.fechaNacimiento}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">DPI:</label>
            <input
              type="text"
              name="dpi"
              value={datosPersonales.dpi}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Carrera:</label>
            <input
              type="text"
              name="carrera"
              value={datosPersonales.carrera}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Correo:</label>
            <input
              type="email"
              name="correo"
              value={datosPersonales.correo}
              onChange={handleChange}
              className="input"
              required
            />
          </div>
          <div className="form-group">
            <label className="label">Mi foto (menor a 500 KB):</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImagenChange}
              className="input"
            />
          </div>
          <button type="submit" className="button">
            Generar Tarjeta de Presentación
          </button>
        </form>
      </div>

      {mostrarTarjeta && (
        <div className="modal">
          <div className="card" style={{ width: '500px' }}>
            <button className="close-button" onClick={resetForm}>
              Cerrar
            </button>
            <div className="card-content">
              <div className="card-image" style={{ width: '100%' }}>
                {imagen && (
                  <img
                    src={imagen.dataURL}
                    alt="Imagen de perfil"
                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                  />
                )}
              </div>
              <h2>Tarjeta de Presentación</h2>
              <p className="label">Nombre:</p>
              <p>{datosPersonales.nombre}</p>
              <p className="label">Fecha de Nacimiento:</p>
              <p>{datosPersonales.fechaNacimiento}</p>
              <p className="label">DPI:</p>
              <p>{datosPersonales.dpi}</p>
              <p className="label">Carrera:</p>
              <p>{datosPersonales.carrera}</p>
              <p className="label">Correo:</p>
              <p>{datosPersonales.correo}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Form;
