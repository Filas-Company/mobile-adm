
const API_URL = 'https://backend-filas.fly.dev/fila';

// http://localhost:3000/fila -- LOCAL
// https://backend-filas.fly.dev/fila -- FLY.IO
// https://backend-filas-production.up.railway.app/fila -- RAILWAY

// Função para obter os dados
export async function getData(restaurante) {
  const response = await fetch(`${API_URL}/list/${restaurante}`, { method: 'GET' });
  return response.json();
}

// Função para inserir um novo documento
export async function insertDocument(restaurante) {
  const ultimoResponse = await fetch(`${API_URL}/buscarUltimo/${restaurante}`);
  const ultimo = await ultimoResponse.json();

  const response = await fetch(`${API_URL}/add/${restaurante}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ codigo: ultimo * 10 })
  });
  return response.json();
}

// Função para atualizar um documento
export async function updateDocument(item, restaurante) {
  const response = await fetch(`${API_URL}/update/${restaurante}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}


// Função para atualizar o "voltar"
export async function updateVoltar(item, restaurante) {
  const response = await fetch(`${API_URL}/voltar/${restaurante}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function updateDesce(item, restaurante) {
  const response = await fetch(`${API_URL}/updateDesce/${restaurante}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function updateSobe(item, restaurante) {
  const response = await fetch(`${API_URL}/updateSobe/${restaurante}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function deleteDocument(item, restaurante) {
  const response = await fetch(`${API_URL}/delete/${restaurante}`, {
    method: 'DELETE',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}

export async function chamarFila(item, restaurante) {
  const response = await fetch(`${API_URL}/chamar/${restaurante}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item)
  });
  return response.json();
}


// Electron

export async function insertPrint(item, restaurante) {
  const response = await fetch(`${API_URL}/add/${restaurante}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ 
      codigo: item.codigo
    })
  });

  return response.json();
}