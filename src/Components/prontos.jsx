import { useState } from "react";

function Item({ item, updateDocument, deleteDocument, updateFila, updateVoltar, chamarFila, fetchData, updateDesce, updateSobe, obterHora, obterMinutos, restaurante }) {
  const [tempText, setTempText] = useState(item.text);
  const [tempCod, setTempCod] = useState(item.codigo);
  const [tempQntd, setTempQntd] = useState(item.qntd);

  return (
    <li className={`fila-adm ${item.status === 1 ? "status-1" : item.status === 2 ? "status-2" : "status-3"}`}>
      <div className="div-status">
      <input
        className={`${item.status === 3 ? 'senha-status-3' : 'senha-status-outro'}`}
        value={tempCod}
        type="text"
        placeholder="cod"
        onChange={(e) => setTempCod(e.target.value)}
        onBlur={async () => {
            updateDocument({ ...item, codigo: tempCod }, restaurante).then(fetchData);
          }
        }
      />

        { item.status === 3 ?
          <p className="minutos">{obterMinutos(item.hora_criacao)}</p>
          : null
        } 
      </div>

      <input
        className="nome-adm"
        value={tempText}
        type="text"
        placeholder="Nome"
        onChange={(e) => setTempText(e.target.value)}
        onBlur={() => {
          updateDocument({ ...item, text: tempText }, restaurante).then(fetchData);
        }}
      />

      <input
        className="qntd-adm"
        type="number"
        placeholder="1"
        value={tempQntd}
        min="1"
        max="99"
        step="1"
        onChange={(e) => setTempQntd(e.target.value)}
        onBlur={() => {
          updateDocument({ ...item, qntd: tempQntd }, restaurante).then(fetchData);
        }}
      />

      <div className="btn-adm">
        {(item.status === 1) ? (
          <div>
          <button
            className="btn-adm-voltar"
            onClick={() => {
              updateVoltar({ ...item, status: 3 }, restaurante).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
              reply
            </span>
          </button>

          <button 
            className="btn-adm-del"
            onClick={() => {
              deleteDocument(item, restaurante).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
                delete
            </span>
          </button>
        </div>
        ) : (item.status === 2) ? (
          <div>

          <button
            className="btn-adm-voltar"
            onClick={() => {
              updateVoltar({ ...item, status: 3 }, restaurante).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
              reply
            </span>
          </button>

          <button 
            className="btn-adm-del-old"
            onClick={() => {
              deleteDocument(item, restaurante).then(fetchData);
            }}
          >
            <span class="material-symbols-outlined">
                delete
            </span>
          </button>
          </div>
        ) : (
          <div>
            <button
              className="btn-adm-chamar-fila"
              onClick={() => {
                chamarFila(item, restaurante).then(fetchData);
              }}          
            >
              <span class="material-symbols-outlined">
                  check
              </span>
            </button>

            <button 
              className="btn-adm-del-fila"
              onClick={() => {
                deleteDocument(item, restaurante).then(fetchData);
              }}
            >
              <span class="material-symbols-outlined">
                  delete
              </span>
            </button>
          </div>
        )}
      </div>
    </li>
  );
}

export default Item;
