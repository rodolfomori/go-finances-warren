import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { Container } from './styles';
import Logo from '../../assets/logo.png';

interface HeaderProps {
  toggleModalCreateTransaction?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  toggleModalCreateTransaction,
}: HeaderProps) => {
  const [desktop, setDesktop] = useState<boolean>(false);

  useEffect(() => {
    function handleResize(): void {
      setDesktop(window.innerWidth > 500);
    }

    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <Container>
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
            {desktop && <Link to="/import">Importar</Link>}
          </>
        </nav>
      </header>
    </Container>
  );
};

export default Header;
