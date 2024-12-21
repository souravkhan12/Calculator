// `https://api.frankfurter.app/latest?amount=100&from=EUR&to=USD`
import { useEffect, useState } from 'react';
import './App.css';

export default function App() {
  const [type, setType] = useState('');
  const [from, setFrom] = useState('USD');
  const [to, setTo] = useState('USD');
  const [res,setRes] = useState();

  function handleInput(e){
    setType(e.target.value);
  }

  function handleSelect(e) {
    setFrom(e.target.value);
  }

  function handleSelect2(e) {
    setTo(e.target.value);
  }

  useEffect(function(){
    console.log('EFfect');
    if (from == to)  {
      setRes(type);
      return;
    }
    if (from==''||to=='')return;

    async function getResult() {
      const res = await fetch(`https://api.frankfurter.dev/v1/latest?base=${from}&symbols=${to}`);
      const data = await res.json();
      const convertedAmount = (type * data.rates[to]).toFixed(2);
      console.log(convertedAmount);
      setRes(convertedAmount);
    }
    getResult();

    return function() {
      console.log('AFter Unmount')
      setRes();
      setFrom('USD');
      setTo('USD');
    }
  },[type,from,to]);

  return (
    <div>
      <input type="text" onChange={handleInput}/> 
      <select onChange={handleSelect}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select onChange={handleSelect2}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <p>{res}</p>
    </div>
  );
}
