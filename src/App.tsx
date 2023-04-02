import { useState, useEffect } from 'react';
import styled from '@emotion/styled';
import ImagenCripto from '../public/img/imagen-criptos.png';
import Formulario from './components/Formulario';
import Resultado from './components/Resultado';
import Spinner from './components/Spinner';

const Heading = styled.h1`
  font-family: 'Lato', sans-serif;
  color: #FFF;
  text-align: center;
  font-weight: 700;
  margin-top: 80px;
  margin-bottom: 50px;
  font-size: 34px;

  &::after{
    content: '';
    width: 150px;
    height: 6px;
    background-color: #66A2FE;
    display: block;
    margin: 10px auto;
  }
`

const Contenedor = styled.div`
  max-width: 900px;
  margin: 0 auto;
  width: 90%;
  @media( min-width: 992px){
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 2rem;
  }
`

const Imagen = styled.img`
  max-width: 400px;
  width: 80%;
  margin: 100px auto 0 auto;
  display: block;
`

function App() {

  const [monedas, setMonedas] = useState<{} | MonedasType>({moneda: '', criptoMoneda: ''});
  const [ resultado, setResultado] = useState({});
  const [ cargando, setCargando] = useState(false);

  useEffect( () => {
    //if(Object.keys(monedas).length > 0 ){
    const {moneda, criptoMoneda} = monedas
    if( ![moneda, criptoMoneda].includes('') ){
      setCargando(true);
      const cotizarCripto = async () => {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptoMoneda}&tsyms=${moneda}`;
        const res = await fetch(url);
        const json = await res.json();
        setResultado(json.DISPLAY[criptoMoneda][moneda]);
        setCargando(false);
      }
      cotizarCripto();
      
    }
  },[monedas])

  return (
    <Contenedor>
      <Imagen 
        src={ImagenCripto}
        alt='Imagen cripto'
      />
      <div>
        <Heading>Cotiza Criptomonedas al Instante</Heading>
        <Formulario setMonedas={setMonedas} />
        {
          cargando && <Spinner />
        }
      {
        !cargando && resultado.PRICE && <Resultado resultado={resultado} />
      }
      </div>
    </Contenedor>
  )
}

export default App

export type MonedasType = {
  moneda: string;
  criptoMoneda: string;
}