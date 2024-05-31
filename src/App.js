import React, {useState, useEffect} from 'react'
import GlobalStyle from './styles/global'
import Header from './components/Header';
import Resume from './components/Resume';
import Form from './components/Form';


const App = () => {
  // Lógica para o somatório do resultado da operação
  const data = localStorage.getItem("transactions");
  const [transactionsList, setTransactionsList] = useState(
    data ? JSON.parse(data): []
  );
  const [income, setIncome] = useState(0);
  const [expense, setExpense] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const amountExpense = transactionsList
      .filter((item) => item.expense)
      .map((transaction) => Number(transaction.amount));
    
    const amountIncome = transactionsList
    .filter((item) => !item.expense)
    .map((transaction) => Number(transaction.amount));

    const expense = amountExpense.reduce((acc, cur) => acc + cur, 0).toFixed(2);
    const income = amountIncome.reduce((acc, cur) => acc + cur, 0).toFixed(2);

    const total = Math.abs(income - expense).toFixed(2);

    setIncome(`R$ ${income}`);
    setExpense(`R$ ${expense}`);
    setTotal(`${Number(income) < Number(expense) ? "-" : ""}R$ ${total}`);//Aqui mostra o cálculo se ficar negativo, posteriormente podemos colocar para ficar na cor vermelha o resultado

  }, [transactionsList]);
//Vêm até aqui o resultado da operação ##########

//Aqui abaixo permite adicionar novos items
  const handleAdd = (transaction) => {
    const newArrayTransactions = [...transactionsList, transaction];

    setTransactionsList(newArrayTransactions);

    localStorage.setItem("transactions", JSON.stringify(newArrayTransactions));
  };

  return (
    <>
        <Header />
        <Resume income={income} expense={expense} total={total}/>
        <Form handleAdd={handleAdd} />
        <GlobalStyle />
    </>
 );
};

export default App