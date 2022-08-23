import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import Alert from "./Alert";
import Spinner from "./Spinner";

const Formulario = ({ cliente, cargando, setCargando }) => {
  const navigate = useNavigate();

  const nuevoClienteSchema = yup.object().shape({
    nombre: yup
      .string()
      .min(3, "El Nombre es muy corto")
      .max(20, "El Nombre es muy largo")
      .required("El Nombre del Cliente es Obligatorio"),
    empresa: yup.string().required("El Nombre de la empresa es obligatorio"),
    email: yup
      .string()
      .email("Email no válido")
      .required("El email es obligatorio"),
    telefono: yup
      .number()
      .positive("Número no válido")
      .integer("Número no válido")
      .typeError("El Número no es válido"),
  });

  const handelSubmit = async (valores) => {
    try {
      let respuesta;
      if (cliente.id) {
        //Actualizar cliente
        const url = `http://localhost:4000/clientes/${cliente.id}`;

        respuesta = await fetch(url, {
          method: "PUT",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //nuevo registro
        const url = "http://localhost:4000/clientes";

        respuesta = await fetch(url, {
          method: "POST",
          body: JSON.stringify(valores),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
      await respuesta.json();
      navigate("/clientes");
    } catch (error) {
      console.log(error);
    }
  };

  return cargando ? (
    <Spinner />
  ) : (
    <div className="bg-white mt-10 px-5 py-10 rounded-md shadow-md mx-auto md:w-3/4">
      <h1 className="text-gray-600 font-bold text-xl uppercase text-center">
        {cliente.nombre ? "Editar cliente" : "Agregar cliente"}
      </h1>
      <Formik
        initialValues={{
          nombre: cliente?.nombre ?? "",
          empresa: cliente?.empresa ?? "",
          email: cliente?.email ?? "",
          telefono: cliente?.telefono ?? "",
          notas: cliente?.notas ?? "",
        }}
        enableReinitialize={true}
        onSubmit={async (values, { resetForm }) => {
          await handelSubmit(values);
          resetForm();
        }}
        validationSchema={nuevoClienteSchema}
      >
        {({ errors, touched }) => {
          //console.log(data);
          return (
            <Form className="mt-10">
              <div className="mb-4">
                <label className="text-gray-800" htmlFor="">
                  Nombre:
                </label>
                <Field
                  id="nombre"
                  type="pasword"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Nombre del cliente"
                  name="nombre"
                />
                {errors.nombre && touched.nombre ? (
                  <Alert>{errors.nombre}</Alert>
                ) : null}
              </div>
              <div>
                <label className="text-gray-800" htmlFor="">
                  Empresa:
                </label>
                <Field
                  id="empresa"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Empresa del cliente"
                  name="empresa"
                />
                {errors.empresa && touched.empresa ? (
                  <Alert>{errors.empresa}</Alert>
                ) : null}
              </div>
              <div>
                <label className="text-gray-800" htmlFor="">
                  Email:
                </label>
                <Field
                  id="email"
                  type="email"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Email del cliente"
                  name="email"
                />
                {errors.email && touched.email ? (
                  <Alert>{errors.email}</Alert>
                ) : null}
              </div>
              <div>
                <label className="text-gray-800" htmlFor="">
                  Teléfono:
                </label>
                <Field
                  id="telefono"
                  type="tel"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Teléfon del cliente"
                  name="telefono"
                />
                {errors.telefono && touched.telefono ? (
                  <Alert>{errors.telefono}</Alert>
                ) : null}
              </div>
              <div>
                <label className="text-gray-800" htmlFor="">
                  Notas:
                </label>
                <Field
                  as="textarea"
                  id="notas"
                  type="text"
                  className="mt-2 block w-full p-3 bg-gray-50"
                  placeholder="Notas del cliente"
                  name="notas"
                />
              </div>
              <input
                type="submit"
                value={cliente.nombre ? "Editar" : "Agregar"}
                className="mt-5 w-full bg-blue-800 p-3 text-white uppercase font-blod text-lg"
              />
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

Formulario.defaultProps = { cliente: {}, cargando: false };

export default Formulario;
