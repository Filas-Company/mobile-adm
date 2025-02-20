import { useEffect, useState } from "react";
import axios from "axios";
import { connectWebSocket } from "./websocket"; // Importando o WebSocket

const FilaPage = () => {
  const [fila, setFila] = useState([]);

  useEffect(() => {
    carregarFila();
    connectWebSocket(); // Conectar ao WebSocket
  }, []);

  const carregarFila = async () => {
    try {
      const resposta = await axios.get("http://localhost:3000/list");
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
