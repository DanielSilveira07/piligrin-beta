import { useEffect, useState, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useModal } from "../context/ModalContext";
import emailjs from "@emailjs/browser";
import { EMAILJS_CONFIG } from "../config/emailjs";
import { usePhoneMask } from "../hooks/usePhoneMask";

const N8N_WEBHOOK_URL = "https://ia-n8n.5hue9s.easypanel.host/webhook/piligrin-site";

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
    transform: translateY(40px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(13, 13, 13, 0.95);
  backdrop-filter: blur(8px);
  z-index: 9999;
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
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  background: linear-gradient(180deg, #1A1A1A 0%, #0D0D0D 100%);
  border: 1px solid rgba(234, 59, 24, 0.3);
  border-radius: 24px;
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;
  box-shadow: 
    0 24px 64px rgba(0, 0, 0, 0.5),
    0 0 80px rgba(234, 59, 24, 0.3);
  animation: ${slideUp} 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;

  /* Accent bar no topo */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: #EA3B18;
    z-index: 1;
  }

  @media (max-width: 768px) {
    margin: 0;
    border-radius: 0;
    max-height: 100vh;
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 24px;
  right: 24px;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(234, 59, 24, 0.1);
  border: 1px solid rgba(234, 59, 24, 0.3);
  border-radius: 12px;
  color: #F2F1EB;
  font-size: 28px;
  font-weight: 300;
  cursor: pointer;
  transition: all 0.3s ease;
  z-index: 10;

  &:hover {
    background: rgba(234, 59, 24, 0.2);
    border-color: rgba(234, 59, 24, 0.5);
    transform: rotate(90deg);
  }

  @media (max-width: 768px) {
    width: 36px;
    height: 36px;
    font-size: 24px;
    top: 20px;
    right: 20px;
  }

  @media (max-width: 480px) {
    width: 32px;
    height: 32px;
    font-size: 20px;
    top: 14px;
    right: 14px;
    border-radius: 8px;
  }
`;

const LogoArea = styled.div`
  text-align: center;
  padding: 32px 40px 20px;
  border-bottom: 1px solid rgba(234, 59, 24, 0.1);
  flex-shrink: 0;

  img {
    width: 200px;
    height: auto;
  }

  @media (max-width: 768px) {
    padding: 24px 24px 16px;

    img {
      width: 150px;
    }
  }

  @media (max-width: 480px) {
    padding: 18px 18px 12px;

    img {
      width: 120px;
    }
  }
`;

const Content = styled.div`
  padding: 32px 40px;
  overflow-y: auto;
  flex: 1;

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

  h2 {
    font-family: var(--font-primary);
    font-size: 28px;
    font-weight: 800;
    color: #F2F1EB;
    margin-bottom: 10px;
    line-height: 1.2;

    span {
      color: #EA3B18;
    }
  }

  > p {
    font-family: var(--font-primary);
    font-size: 15px;
    line-height: 1.6;
    color: rgba(242, 241, 235, 0.7);
    margin-bottom: 24px;
  }

  @media (max-width: 768px) {
    padding: 24px;

    h2 {
      font-size: 22px;
      margin-bottom: 8px;
    }

    > p {
      font-size: 14px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 18px 16px;

    h2 {
      font-size: 19px;
    }

    > p {
      font-size: 13px;
      margin-bottom: 16px;
    }
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 768px) {
    gap: 14px;
  }
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-family: var(--font-primary);
    font-size: 13px;
    font-weight: 600;
    color: #F2F1EB;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }

  input,
  select {
    padding: 12px 14px;
    background: rgba(31, 31, 31, 0.6);
    border: 1px solid rgba(234, 59, 24, 0.2);
    border-radius: 8px;
    color: #F2F1EB;
    font-family: var(--font-primary);
    font-size: 14px;
    transition: all 0.3s ease;
    outline: none;

    &::placeholder {
      color: rgba(242, 241, 235, 0.4);
    }

    &:focus {
      border-color: rgba(234, 59, 24, 0.5);
      background: rgba(31, 31, 31, 0.8);
      box-shadow: 0 0 0 3px rgba(234, 59, 24, 0.1);
    }

    &:hover {
      border-color: rgba(234, 59, 24, 0.3);
    }
  }

  select {
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 12 12'%3E%3Cpath fill='%23F2F1EB' d='M6 9L1 4h10z'/%3E%3C/svg%3E");
    background-repeat: no-repeat;
    background-position: right 14px center;
    padding-right: 38px;

    option {
      background: #1A1A1A;
      color: #F2F1EB;
    }
  }

  @media (max-width: 768px) {
    gap: 5px;

    label {
      font-size: 12px;
    }

    input,
    select {
      padding: 10px 12px;
      font-size: 13px;
    }

    select {
      background-position: right 12px center;
      padding-right: 36px;
    }
  }

  @media (max-width: 480px) {
    gap: 4px;

    label {
      font-size: 11px;
    }

    input,
    select {
      padding: 9px 10px;
      font-size: 12px;
    }
  }
`;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 16px 32px;
  margin-top: 8px;
  background: ${props => props.$isLoading ? 'rgba(234, 59, 24, 0.7)' : '#EA3B18'};
  border: none;
  border-radius: 8px;
  color: #F2F1EB;
  font-family: var(--font-primary);
  font-size: 15px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: ${props => props.$isLoading ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(234, 59, 24, 0.4);
  opacity: ${props => props.$isLoading ? 0.7 : 1};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: #EA3B18;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 
      0 12px 32px rgba(234, 59, 24, 0.5),
      0 0 40px rgba(192, 244, 171, 0.3);

    &::before {
      opacity: 1;
    }

    span:last-child {
      transform: translateX(4px);
    }
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    cursor: not-allowed;
  }

  span {
    position: relative;
    z-index: 1;
    transition: transform 0.3s ease;
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 14px;
    margin-top: 4px;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 13px;
  }
`;

const Disclaimer = styled.p`
  text-align: center;
  font-family: var(--font-primary);
  font-size: 12px;
  line-height: 1.6;
  color: rgba(242, 241, 235, 0.5);
  margin-top: 16px;
  padding-bottom: 8px;

  a {
    color: #EA3B18;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;

    &:hover {
      color: #C0F4AB;
      text-decoration: underline;
    }
  }

  @media (max-width: 768px) {
    font-size: 11px;
    margin-top: 12px;
    padding-bottom: 4px;
  }
`;

const MessageAlert = styled.div`
  padding: 12px 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  font-family: var(--font-primary);
  font-size: 14px;
  line-height: 1.5;
  display: flex;
  align-items: center;
  gap: 8px;
  animation: ${slideUp} 0.3s ease-out;

  ${props => {
    if (props.$type === 'success') {
      return `
        background: rgba(192, 244, 171, 0.15);
        border: 1px solid rgba(192, 244, 171, 0.3);
        color: #C0F4AB;
      `;
    }
    if (props.$type === 'error') {
      return `
        background: rgba(234, 59, 24, 0.15);
        border: 1px solid rgba(234, 59, 24, 0.3);
        color: #EA3B18;
      `;
    }
  }}

  @media (max-width: 768px) {
    font-size: 13px;
    padding: 10px 14px;
  }
`;

function LeadModal({ leadModal, logoSrc, logoAlt }) {
  const { isLeadModalOpen, closeLeadModal } = useModal();
  const { applyMask } = usePhoneMask();
  const formRef = useRef(null);
  const telefoneInputRef = useRef(null);

  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null);

  // Inicializa o EmailJS quando o componente monta
  useEffect(() => {
    if (typeof emailjs !== 'undefined') {
      emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
    }
  }, []);

  // Limpa mensagens quando o modal fecha
  useEffect(() => {
    if (!isLeadModalOpen) {
      setMessage(null);
      setMessageType(null);
      setIsLoading(false);
      if (formRef.current) {
        formRef.current.reset();
      }
    }
  }, [isLeadModalOpen]);

  // Fecha ao clicar fora do modal
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget && !isLoading) {
      closeLeadModal();
    }
  };

  // Fecha ao pressionar ESC
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isLeadModalOpen && !isLoading) {
        closeLeadModal();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isLeadModalOpen, closeLeadModal, isLoading]);

  // Aplica máscara de telefone
  const handlePhoneInput = (e) => {
    const maskedValue = applyMask(e.target.value);
    e.target.value = maskedValue;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);
    setMessageType(null);

    try {
      const formData = new FormData(e.target);

      // Captura UTM params presentes na URL
      const urlParams = new URLSearchParams(window.location.search);
      const utms = {
        utm_source:   urlParams.get('utm_source')   || '',
        utm_medium:   urlParams.get('utm_medium')   || '',
        utm_campaign: urlParams.get('utm_campaign') || '',
        utm_term:     urlParams.get('utm_term')     || '',
        utm_content:  urlParams.get('utm_content')  || '',
      };

      const data = {
        nome:        formData.get('nome'),
        email:       formData.get('email'),
        telefone:    formData.get('telefone'),
        empresa:     formData.get('empresa'),
        segmento:    formData.get('segmento'),
        faturamento: formData.get('faturamento'),
        data_envio:  new Date().toLocaleString('pt-BR'),
        origem:      'Site Piligrin',
        pagina:      window.location.href,
        ...utms,
      };

      // Envia para o webhook n8n
      const n8nRes = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!n8nRes.ok) {
        throw new Error(`Erro n8n: ${n8nRes.status}`);
      }

      // EmailJS como envio secundário (silencioso se não configurado)
      if (EMAILJS_CONFIG.PUBLIC_KEY !== 'SUA_PUBLIC_KEY_AQUI') {
        emailjs
          .send(EMAILJS_CONFIG.SERVICE_ID, EMAILJS_CONFIG.TEMPLATE_ID, data)
          .catch(() => {});
      }

      // Dispara evento Lead no Meta Pixel
      if (typeof window.fbq === 'function') {
        window.fbq('track', 'Lead');
      }

      setMessage('✅ Obrigado! Recebemos suas informações e entraremos em contato em breve! 🚀');
      setMessageType('success');
      formRef.current.reset();
      setTimeout(() => closeLeadModal(), 2000);

    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setMessage('❌ Ops! Houve um erro ao enviar. Por favor, tente novamente ou entre em contato pelo WhatsApp.');
      setMessageType('error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Overlay $isOpen={isLeadModalOpen} onClick={handleOverlayClick}>
      <Container>
        <CloseButton type="button" onClick={closeLeadModal} aria-label="Fechar formulário">
          ×
        </CloseButton>

        <LogoArea>
          <img src={logoSrc} alt={logoAlt} />
        </LogoArea>

        <Content>
          <h2>
            {leadModal.title} <span>{leadModal.highlight}</span>
          </h2>
          <p>{leadModal.subtitle}</p>

          <Form ref={formRef} onSubmit={handleSubmit}>
            {message && (
              <MessageAlert $type={messageType}>
                {message}
              </MessageAlert>
            )}

            {leadModal.fields.map((field) => (
              <FieldGroup key={field.name}>
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  ref={field.name === 'telefone' ? telefoneInputRef : null}
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  required={field.required}
                  placeholder={field.placeholder || undefined}
                  onInput={field.name === 'telefone' ? handlePhoneInput : undefined}
                  disabled={isLoading}
                />
              </FieldGroup>
            ))}

            <Row>
              <FieldGroup>
                <label htmlFor="faturamento">Faturamento mensal</label>
                <select id="faturamento" name="faturamento" required disabled={isLoading}>
                  <option value="">Selecione uma opção</option>
                  {leadModal.faturamentoOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </FieldGroup>
            </Row>

            <SubmitButton type="submit" $isLoading={isLoading} disabled={isLoading}>
              <span>{isLoading ? 'Enviando...' : leadModal.buttonText}</span>
              {!isLoading && <span aria-hidden="true">→</span>}
            </SubmitButton>

            <Disclaimer>
              {leadModal.disclaimer}
              <br />
              <a href="#politica-privacidade">{leadModal.privacyLinkLabel}</a>
            </Disclaimer>
          </Form>
        </Content>
      </Container>
    </Overlay>
  );
}

export default LeadModal;
