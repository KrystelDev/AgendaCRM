import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";
import Spinner from "../components/Spinner";

const Home = () => {
  const [clientes, setclientes] = useState();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenercleintesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_KEY;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setclientes(resultado);
        setCargando(false);
      } catch (error) {
        console.log(error);
      }
    };
    obtenercleintesAPI();
  }, []);

  const handelEliminar = async (clienteId) => {
    const clienteEliminar = clientes.filter(
      (cliente) => cliente.id === clienteId
    );
    const confirmar = confirm(
      `¿Seguro que quiere eliminar a este cliente: ${clienteEliminar[0].nombre} ?`
    );

    if (confirmar) {
      try {
        const url = `${import.meta.env.VITE_API_KEY}/${clienteId}`;
        const respuesta = await fetch(url, {
          method: "DELETE",
        });
        await respuesta.json();

        const arrayClientes = clientes.filter(
          (cliente) => cliente.id !== clienteId
        );
        setclientes(arrayClientes);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return cargando ? (
    <Spinner />
  ) : Object.keys(clientes).length === 0 ? (
    <p>
      No hay ningún cliente registrado. añada un registro clicando en Nuevo
      Cliente
    </p>
  ) : (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      <table className="w-full mt-5 table-auto shadow bg-white">
        <thead>
          <tr className="bg-blue-800 text-white">
            <th className="p-2">Nombre</th>
            <th className="p-2">Contacto</th>
            <th className="p-2">Empresa</th>
            <th className="p-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {clientes.map((cliente) => (
            <Cliente
              key={cliente.id}
              cliente={cliente}
              handelEliminar={handelEliminar}
            />
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Home;
