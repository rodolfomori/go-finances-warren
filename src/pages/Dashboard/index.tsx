import React, { useState, useEffect, useCallback } from 'react';

import income from '../../assets/income.svg';
import outcome from '../../assets/outcome.svg';
import total from '../../assets/total.svg';
import api from '../../services/api';
import Header from '../../components/Header';
import formatValue from '../../utils/formatValue';

import { Container, CardContainer, Card, TableContainer } from './styles';
import ModalCreateTransaction from '../../components/Modal/ModalCreateTransaction';

interface Transaction {
  id: string;
  title: string;
  value: number;
  formattedValue: string;
  formattedDate: string;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface TransactionNotFormatted {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface Balance {
  income: string;
  outcome: string;
  total: string;
}

const Dashboard: React.FC = () => {
  const [modalCreateTransaction, setModalCreateTransaction] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [balance, setBalance] = useState<Balance>({} as Balance);

  async function loadTransactions(): Promise<void> {
    const [response] = await Promise.all([api.get('transactions')]);

    const transactionsFormatted = response.data.transactions.map(
      (transaction: Transaction) => ({
        ...transaction,
        formattedValue: formatValue(transaction.value),
        formattedDate: new Date(transaction.created_at).toLocaleDateString(
          'pt-br',
        ),
      }),
    );

    const balanceFormatted = {
      income: formatValue(response.data.balance.income),
      outcome: formatValue(response.data.balance.outcome),
      total: formatValue(response.data.balance.total),
    };

    setTransactions(transactionsFormatted);
    setBalance(balanceFormatted);
  }

  useEffect(() => {
    loadTransactions();
  }, []);

  const toggleModalCreateTransaction = useCallback(() => {
    setModalCreateTransaction(prevState => !prevState);
  }, []);

  const afterConfirmModal = useCallback(() => {
    loadTransactions();
  }, []);

  return (
    <>
      <Header toggleModalCreateTransaction={toggleModalCreateTransaction} />
      <Container>
        <CardContainer>
          <Card>
            <header>
              <p>Entradas</p>
              <img src={income} alt="Income" />
            </header>
            <h1 data-testid="balance-income">
              {balance ? balance.income : 'Carregando...'}
            </h1>
          </Card>
          <Card>
            <header>
              <p>Saídas</p>
              <img src={outcome} alt="Outcome" />
            </header>
            <h1 data-testid="balance-outcome">
              {balance ? balance.outcome : 'Carregando...'}
            </h1>
          </Card>
          <Card total>
            <header>
              <p>Total</p>
              <img src={total} alt="Total" />
            </header>
            <h1 data-testid="balance-total">
              {balance ? balance.total : 'Carregando...'}
            </h1>
          </Card>
        </CardContainer>

        <TableContainer>
          <table>
            <thead>
              <tr>
                <th>Título</th>
                <th>Preço</th>
                <th>Categoria</th>
                <th>Data</th>
              </tr>
            </thead>
            {transactions ? (
              <tbody>
                {transactions.map(transaction => {
                  return (
                    <tr key={transaction.id}>
                      <td className="title">{transaction.title}</td>
                      <td className={transaction.type}>
                        {transaction.type === 'outcome' && ' - '}
                        {transaction.formattedValue}
                      </td>
                      <td>{transaction.category.title}</td>
                      <td>{transaction.formattedDate}</td>
                    </tr>
                  );
                })}
              </tbody>
            ) : (
              <p> Carregando...</p>
            )}
          </table>
        </TableContainer>
      </Container>
      <ModalCreateTransaction
        isOpen={modalCreateTransaction}
        setIsOpen={toggleModalCreateTransaction}
        afterConfirmModal={afterConfirmModal}
      />
    </>
  );
};

export default Dashboard;
