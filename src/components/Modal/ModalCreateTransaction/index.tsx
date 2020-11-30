import React, { useRef, useCallback, useState } from 'react';
import { FiFileText, FiAlignJustify } from 'react-icons/fi';
import { GiMoneyStack } from 'react-icons/gi';
import { AiOutlineClose } from 'react-icons/ai';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import Input from '../../Input';
import Button from '../../Button';
import Modal from '../index';
import { Container, ModalHeader } from './styles';
import getValidationErrors from '../../../utils/getValidationErrors';
import api from '../../../services/api';

interface IFormSubmitContent {
  title: string;
  category: string;
  value: number;
}

interface TransactionNotFormatted {
  id: string;
  title: string;
  value: number;
  type: 'income' | 'outcome';
  category: { title: string };
  created_at: Date;
}

interface IModalProps {
  isOpen: boolean;
  setIsOpen: () => void;
  afterConfirmModal: (transaction: TransactionNotFormatted) => void;
}

const ModalCreateTransaction: React.FC<IModalProps> = ({
  isOpen,
  setIsOpen,
  afterConfirmModal,
}) => {
  const formRef = useRef<FormHandles>(null);
  const [type, setType] = useState('income');

  const handleSubmit = useCallback(
    async (data: IFormSubmitContent) => {
      try {
        const schema = Yup.object().shape({
          title: Yup.string().required('Título é Obrigatório.'),
          category: Yup.string().required('Categoria é Obrigatório.'),
          value: Yup.number().required('Valor é obrigatório'),
        });

        await schema.validate(data, {
          abortEarly: false,
        });

        const response = await api.post('transactions', {
          title: data.title,
          value: data.value,
          category: data.category,
          type,
        });
        afterConfirmModal(response.data);
        setIsOpen();
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
        }
      }
    },
    [type, setIsOpen, afterConfirmModal],
  );

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen}>
      <Container>
        <ModalHeader>
          <h1>Cadastro de Transações</h1>
          <button type="button" onClick={setIsOpen}>
            <AiOutlineClose />
          </button>
        </ModalHeader>
        <div>
          <input
            name="type"
            type="radio"
            value="income"
            onClick={() => {
              setType('income');
            }}
            defaultChecked
          />
          <label>Entrada</label>
          <input
            name="type"
            type="radio"
            value="outcome"
            onClick={() => {
              setType('outcome');
            }}
          />
          <label>Saída</label>
        </div>
        <Form ref={formRef} onSubmit={handleSubmit}>
          <Input name="title" icon={FiFileText} placeholder="Título" />
          <Input
            name="category"
            icon={FiAlignJustify}
            placeholder="Categoria"
          />
          <Input
            name="value"
            type="number"
            icon={GiMoneyStack}
            placeholder="Valor"
          />

          <Button type="submit">Confirmar</Button>
        </Form>
      </Container>
    </Modal>
  );
};

export default ModalCreateTransaction;
