import { useLocation } from 'react-router-dom';

function SummaryPage() {
  const location = useLocation();
  const payable = location.state?.payable;

  if (!payable) {
    return <div><h1>Erro: Nenhum pagável cadastrado</h1></div>;
  }

  return (
    <div>
      <h1>Pagável Cadastrado</h1>
      <ul>
        <li>ID: {payable.id}</li>
        <li>Nome: {payable.name}</li>
        <li>Valor: {payable.amount}</li>
      </ul>
    </div>
  );
}

export default SummaryPage;
