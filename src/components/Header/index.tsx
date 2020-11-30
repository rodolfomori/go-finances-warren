import React from 'react';
import { Link } from 'react-router-dom';

import { Container, LogOutIcon } from './styles';
import Logo from '../../assets/logo.png';

interface HeaderProps {
  size?: 'small' | 'large';
  toggleModalCreateTransaction?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  size = 'large',
  toggleModalCreateTransaction,
}: HeaderProps) => {
  return (
    <Container size={size}>
      <header>
        <Link to="/">
          <img src={Logo} alt="GoFinances" />
        </Link>
        <nav>
          <>
            <Link to="/">Extrato</Link>
            {toggleModalCreateTransaction && (
              <button type="button" onClick={toggleModalCreateTransaction}>
                Nova transação
              </button>
            )}
            <Link to="/import">Importar</Link>
          </>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
