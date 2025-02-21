import { useEffect, useState } from "react";
import axios from "axios";
import { connectWebSocket } from "./websocket"; // Importando o WebSocket

const API_URL = 'https://backend-filas-production.up.railway.app/fila';
// http://localhost:3000/fila
// ou
// https://backend-filas-production.up.railway.app/fila
let { restaurante } = useParams();

const FilaPage = () => {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    carregarFila();
    connectWebSocket();
  }, []);

  const carregarFila = async () => {
    try {
      const resposta = await axios.get(`${API_URL}/list/${restaurante}`);
      setFila(resposta.data);
    } catch (erro) {
      console.error("Erro ao carregar a fila:", erro);
    }
  };

  const atualizarFila = (novoItem) => {
    setFila((filaAnterior) => [...filaAnterior, novoItem]);
  };

  return (
    <div>
      <h1>Gerenciamento da Fila</h1>
      <ul>
        {fila.map((item) => (
          <li key={item._id}>{item.text || item.codigo}</li>
        ))}
      </ul>
    </div>
  );
};

export default FilaPage;
