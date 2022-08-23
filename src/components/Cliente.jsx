import { useNavigate } from "react-router-dom";

const Cliente = ({ cliente, handelEliminar }) => {
  const navigate = useNavigate();

  return (
    <tr key={cliente.id} className="text-center border-b hover:bg-gray-50">
      <td className="p-3 ">{cliente.nombre}</td>
      <td className="p-3">
        <p>
          <span className="text-gray-800 uppercase font-bold">Email: </span>
          {cliente.email}
        </p>
        <p>
          <span className="text-gray-800 uppercase font-bold">Tel: </span>
          {cliente.telefono}
        </p>
      </td>
      <td className="p-3">{cliente.empresa}</td>
      <td className="p-3">
        <button
          type="button"
          className="bg-blue-600 hover:bg-blue-700 w-full text-while p-2 uppercase text-xs"
          onClick={() => navigate(`/clientes/${cliente.id}`)}
        >
          Ver
        </button>
        <button
          type="button"
          className="bg-yellow-500 hover:bg-yellow-600 w-full text-while p-2 uppercase text-xs mt-3"
          onClick={() => navigate(`/clientes/editar/${cliente.id}`)}
        >
          Editar
        </button>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 w-full text-while p-2 uppercase text-xs mt-3"
          onClick={() => handelEliminar(cliente.id)}
        >
          Eliminar
        </button>
      </td>
    </tr>
  );
};

export default Cliente;
