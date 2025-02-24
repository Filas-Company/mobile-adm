import '../Css/front.css';
import { useState, useEffect } from 'react';
import Pronto from '../Components/prontos.jsx';
import { useParams } from 'react-router-dom';
import {
  getData,
  insertDocument,
  updateDocument,
  updateVoltar,
  deleteDocument,
  chamarFila,
  updateDesce,
  updateSobe
} from '../Services/api.js';

function Admin() {
  let { restaurante } = useParams();

  const [itens, setItens] = useState([]);
  const [verChamados, setVerChamados] = useState(false);
  
  function obterMinutos(hora) {
    const horaCriacao = new Date(hora);
    const agora = new Date();
    
    const diferencaMs = agora - horaCriacao; // Diferença em milissegundos
    const diferencaMin = Math.floor(diferencaMs / 60000); // Converter para minutos
    
    if (diferencaMin < 60) {
        return `${diferencaMin}m`;
    }

    const diferencaHoras = Math.floor(diferencaMin / 60);
    const minutosRestantes = diferencaMin % 60;

    // Garantir que os minutos tenham dois dígitos
    const minutosFormatados = minutosRestantes.toString().padStart(2, '0');

    if (diferencaHoras < 6) {
        return `${diferencaHoras}h${minutosRestantes > 0 ? `${minutosFormatados}` : ''}`;
    }

    return `6h+`;
}

  

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getData(restaurante);
      setItens(data || []);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const toggleChamados = () => setVerChamados(prev => !prev);

  const itensStatus1 = itens?.filter(item => item.status === 1) || [];
  const itensStatus2 = itens?.filter(item => item.status === 2) || [];
  const itensStatus3 = itens?.filter(item => item.status === 3) || [];

  return (
    <div className="wrapper">
      <div className="container-proximos">
        <div className="container-header">
          <h1 className="titulo-adm">CASA</h1>
          <h1 className="res-adm">D'Italia</h1>
          <div className="filtros">
            <button className="btn btn-novo" onClick={async () => { await insertDocument(restaurante); await fetchData(); }}>
              <span className="material-symbols-outlined">add</span>
            </button>
            <button className="btn btn-novo" onClick={fetchData}>
              <span className="material-symbols-outlined">refresh</span>
            </button>
          </div>
        </div>
        <div className="lista-itens">
          {itensStatus1.length > 0 && (
            <ul>
              {itensStatus1.map(item => (
                <Pronto
                  key={item._id}
                  item={item}
                  updateDocument={updateDocument}
                  deleteDocument={deleteDocument}
                  updateVoltar={updateVoltar}
                  chamarFila={chamarFila}
                  fetchData={fetchData}
                  obterMinutos={obterMinutos}
                  restaurante={restaurante}
                />
              ))}
            </ul>
          )}

          {itensStatus2.length > 0 && (
            <div>
              <button onClick={toggleChamados} className='btn btn-chamados' style={{ color: verChamados ? '#6f6f6f' : '#9d9d9d' }}>
                {verChamados ? 'Esconder chamados' : 'Ver chamados'}
                <span className="material-symbols-outlined" style={{ fontSize: "13px", verticalAlign: "middle", marginLeft: "2px", fontWeight: "500" }}>
                  arrow_forward_ios
                </span>
              </button>
              {verChamados && (
                <ul>
                  {itensStatus2.sort((a, b) => b.ordem_criacao - a.ordem_criacao).map(item => (
                    <Pronto
                      key={item._id}
                      item={item}
                      updateDocument={updateDocument}
                      deleteDocument={deleteDocument}
                      updateVoltar={updateVoltar}
                      chamarFila={chamarFila}
                      fetchData={fetchData}
                      obterMinutos={obterMinutos}
                      restaurante={restaurante}
                    />
                  ))}
                </ul>
              )}
            </div>
          )}

          {itensStatus3.length > 0 && (
            <ul>
              {itensStatus3.sort((a, b) => a.posicao - b.posicao).map(item => (
                <Pronto
                  key={item._id}
                  item={item}
                  updateDocument={updateDocument}
                  deleteDocument={deleteDocument}
                  updateVoltar={updateVoltar}
                  chamarFila={chamarFila}
                  fetchData={fetchData}
                  updateDesce={updateDesce}
                  updateSobe={updateSobe}
                  obterMinutos={obterMinutos}
                  restaurante={restaurante}
                />
              ))}
            </ul>
          )}
        </div>
        {itens.length === 0 && <p className="p-fila">Nenhum item encontrado</p>}
      </div>
    </div>
  );
}

export default Admin;