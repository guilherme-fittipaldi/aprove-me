import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function FormPage() {
  const [payable, setPayable] = useState({
    id: '',
    name: '',
    amount: '',
  });
  const [errors, setErrors] = useState({});
  const history = useHistory();

  // Função para validação
  const validate = () => {
    const newErrors = {};
    if (!payable.id || !/^([0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12})$/.test(payable.id)) {
      newErrors.id = 'ID deve ser um UUID válido.';
    }
    if (!payable.name || payable.name.length > 50) {
      newErrors.name = 'Nome não pode estar vazio e deve ter no máximo 50 caracteres.';
    }
    if (!payable.amount || isNaN(payable.amount) || payable.amount <= 0) {
      newErrors.amount = 'O valor deve ser um número positivo.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Função de envio do formulário
  const handleSubmit = (event) => {
    event.preventDefault();

    if (validate()) {
      // Se passar na validação, navega para a tela de resumo
      history.push({
        pathname: '/summary',
        state: { payable },
      });
    }
  };

  return (
    <div>
      <h1>Cadastro de Pagável</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>ID (UUID):</label>
          <input
            type="text"
            value={payable.id}
            onChange={(e) => setPayable({ ...payable, id: e.target.value })}
          />
          {errors.id && <p>{errors.id}</p>}
        </div>
        <div>
          <label>Nome:</label>
          <input
            type="text"
            value={payable.name}
            onChange={(e) => setPayable({ ...payable, name: e.target.value })}
          />
          {errors.name && <p>{errors.name}</p>}
        </div>
        <div>
          <label>Valor:</label>
          <input
            type="number"
            value={payable.amount}
            onChange={(e) => setPayable({ ...payable, amount: e.target.value })}
          />
          {errors.amount && <p>{errors.amount}</p>}
        </div>
        <button type="submit">Cadastrar</button>
      </form>
    </div>
  );
}

export default FormPage;
