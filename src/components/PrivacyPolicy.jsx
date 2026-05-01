import { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(40px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(8px);
  z-index: 10001; /* acima do modal de reunião (9999) para se sobrepor quando aberto a partir dele */
  display: ${props => props.$isOpen ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  padding: 20px;
  overflow-y: auto;
  animation: ${fadeIn} 0.3s ease-out;

  @media (max-width: 768px) {
    padding: 0;
    align-items: flex-start;
  }
`;

const Container = styled.div`
  max-width: 900px;
  width: 100%;
  background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
  border: 1px solid rgba(234, 59, 24, 0.3);
  border-radius: 24px;
  position: relative;
  margin: 40px auto;
  overflow: hidden;
  box-shadow: 
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(234, 59, 24, 0.2);
  animation: ${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1);

  /* Accent bar no topo */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #EA3B18;
    border-radius: 24px 24px 0 0;
  }

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    min-height: 100vh;

    &::before {
      border-radius: 0;
    }
  }
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 32px 40px;
  border-bottom: 1px solid rgba(234, 59, 24, 0.1);

  h2 {
    font-family: var(--font-primary);
    font-size: 32px;
    font-weight: 800;
    color: #F2F1EB;
    margin: 0;
  }

  @media (max-width: 768px) {
    padding: 24px;

    h2 {
      font-size: 24px;
    }
  }

  @media (max-width: 480px) {
    padding: 18px 16px;

    h2 {
      font-size: 20px;
    }
  }
`;

const CloseButton = styled.button`
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(234, 59, 24, 0.1);
  border: 1px solid rgba(234, 59, 24, 0.3);
  border-radius: 12px;
  color: #F2F1EB;
  font-size: 32px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(234, 59, 24, 0.2);
    border-color: rgba(234, 59, 24, 0.5);
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
    font-size: 28px;
  }

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 24px;
  }
`;

const Content = styled.div`
  padding: 40px;
  max-height: 70vh;
  overflow-y: auto;
  
  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 8px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb {
    background: #EA3B18;
    border-radius: 4px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #EA3B18;
  }

  h3 {
    font-family: var(--font-primary);
    font-size: 24px;
    font-weight: 700;
    color: #F2F1EB;
    margin-top: 40px;
    margin-bottom: 20px;
    position: relative;
    padding-left: 16px;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 4px;
      background: #EA3B18;
      border-radius: 2px;
    }
  }

  p {
    font-family: var(--font-primary);
    font-size: 16px;
    line-height: 1.8;
    color: rgba(242, 241, 235, 0.8);
    margin-bottom: 20px;

    a {
      color: #EA3B18;
      text-decoration: none;
      font-weight: 600;
      transition: color 0.3s ease;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        bottom: -2px;
        left: 0;
        width: 0;
        height: 1px;
        background: #EA3B18;
        transition: width 0.3s ease;
      }

      &:hover {
        color: #C0F4AB;

        &::after {
          width: 100%;
          background: #C0F4AB;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 24px;
    max-height: calc(100vh - 100px);

    h3 {
      font-size: 20px;
      margin-top: 32px;
      margin-bottom: 16px;
    }

    p {
      font-size: 15px;
      margin-bottom: 16px;
    }
  }

  @media (max-width: 480px) {
    padding: 18px 16px;

    h3 {
      font-size: 18px;
      margin-top: 24px;
      margin-bottom: 12px;
    }

    p {
      font-size: 14px;
      margin-bottom: 14px;
      line-height: 1.7;
    }
  }
`;

const List = styled.ul`
  list-style: none;
  margin: 24px 0;
  padding: 0;

  li {
    font-family: var(--font-primary);
    font-size: 16px;
    line-height: 1.8;
    color: rgba(242, 241, 235, 0.7);
    margin-bottom: 16px;
    padding-left: 32px;
    position: relative;

    &::before {
      content: '→';
      position: absolute;
      left: 8px;
      color: #EA3B18;
      font-weight: 600;
    }
  }

  @media (max-width: 768px) {
    li {
      font-size: 15px;
      margin-bottom: 12px;
      padding-left: 28px;
    }
  }

  @media (max-width: 480px) {
    li {
      font-size: 13px;
      margin-bottom: 10px;
      padding-left: 24px;
      line-height: 1.7;
    }
  }
`;

function PrivacyPolicy({ policy }) {
  const [isOpen, setIsOpen] = useState(false);

  // Escuta o hash da URL para abrir o modal
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#politica-privacidade') {
        setIsOpen(true);
        document.body.style.overflow = 'hidden';
      }
    };

    // Checa na montagem
    handleHashChange();

    // Escuta mudanças no hash
    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    document.body.style.overflow = 'unset';
    // Remove o hash da URL
    window.history.pushState('', document.title, window.location.pathname + window.location.search);
  };

  // Fecha ao clicar fora do modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isOpen) {
        handleClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen]);

  return (
    <Overlay $isOpen={isOpen} onClick={handleOverlayClick}>
      <Container>
        <Header>
          <h2>{policy.title}</h2>
          <CloseButton type="button" onClick={handleClose} aria-label="Fechar política de privacidade">
            ×
          </CloseButton>
        </Header>

        <Content>
          <p>
            {policy.intro}{" "}
            <a href={policy.siteUrl} target="_blank" rel="noopener noreferrer">
              Piligrin
            </a>
            {policy.introSuffix}
          </p>
          <p>{policy.collection}</p>
          <p>{policy.retention}</p>
          <p>{policy.sharing}</p>
          <p>
            {policy.externalLinks}{" "}
            <a
              href={policy.privacyReferenceUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              políticas de privacidade
            </a>
            .
          </p>
          <p>{policy.refusal}</p>
          <p>{policy.continuation}</p>

          <List>
            {policy.advertisingNotes.map((note, index) => (
              <li key={index}>{note}</li>
            ))}
          </List>

          <h3>{policy.commitmentTitle}</h3>
          <List>
            {policy.commitments.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </List>

          <h3>{policy.moreInfoTitle}</h3>
          <p>{policy.moreInfoText}</p>
          <p>Esta política é efetiva a partir de {policy.effectiveDate}</p>
        </Content>
      </Container>
    </Overlay>
  );
}

export default PrivacyPolicy;
