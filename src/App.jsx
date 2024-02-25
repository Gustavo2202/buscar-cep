import { useState } from 'react';
import './App.css';
import { FaSearchLocation } from "react-icons/fa";
import api from './services/api';

export function App() {

  const [inputCep, setInputCep] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    // 08566600/json/
    if (inputCep === '') {
      alert('ops acho que você esqueceu de escrever o cep');
      return;
    }

    try {

      const response = await api.get(`${inputCep}/json`);
      setCep(response.data)
      setInputCep('')

    } catch (error) {
      alert("Ops acho que teve um erro ao buscar")
      setInputCep('')
    }
  }

  return (

    <>
      <div className="caixa">
        <h1 className="titulo">Buscador de cep</h1>
        <div className="caixa-input">
          <input type="text" placeholder='digite o cep...'
            value={inputCep}
            onChange={(evento) => setInputCep(evento.target.value)}
          />
          <button className="procurar" onClick={handleSearch}>
             <FaSearchLocation size={45} color='#fff' />
          </button>

        </div>
        {
          Object.keys(cep).length > 0 && (
            <main className="main">
              <h2> Cep: {cep.cep}</h2>
              <span>{cep.logradouro}</span>
              <span>{cep.complemento}</span>
              <span>{cep.bairro}</span>
              <span>{cep.localidade} - {cep.uf}</span>
            </main>
          )
        }

      </div>



    </>
  )
}

