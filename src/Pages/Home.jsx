import { useEffect, useState } from "react";
import Cliente from "../components/Cliente";

const Home = () => {
  const [clientes, setclientes] = useState([]);
  useEffect(() => {
    const obtenercleintesAPI = async () => {
      try {
        const url = import.meta.env.VITE_API_KEY;
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setclientes(resultado);
      } catch (error) {
        console.log(error);
      }
    };
    obtenercleintesAPI();
  }, []);

  const handelEliminar = async (clienteId) => {
    const confirmar = confirm("¿Seguro que quiere eliminar a este cliente ?");

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

  return (
    <>
      <h1 className="font-black text-4xl text-blue-900">Clientes</h1>
      <p className="mt-3">Administra tus clientes</p>
      {clientes.length > 0 ? (
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
      ) : (
        <p>
          No hay ningún cliente registrado. añada un registro clicando en Nuevo
          Cliente
        </p>
      )}
    </>
  );
};

export default Home;
