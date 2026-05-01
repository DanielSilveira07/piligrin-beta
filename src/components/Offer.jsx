import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useModal } from "../context/ModalContext";

const reveal = keyframes`
  from { opacity: 0; transform: translateY(28px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const Section = styled.section`
  background: #F2F1EB;
  padding: 120px 64px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(31, 31, 31, 0.025) 1px, transparent 1px),
      linear-gradient(90deg, rgba(31, 31, 31, 0.025) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 1024px) { padding: 100px 48px; }
  @media (max-width: 768px)  { padding: 80px 32px; }
  @media (max-width: 480px)  { padding: 60px 20px; }
`;

const Container = styled.div`
  max-width: 1100px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  opacity: ${({ $v }) => ($v ? 1 : 0)};
  transform: translateY(${({ $v }) => ($v ? "0" : "28px")});
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
`;

const SectionLabel = styled.p`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #3a7a4a;
  margin: 0 0 32px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 2px;
    background: #3a7a4a;
    flex-shrink: 0;
  }
`;

const Headline = styled.h2`
  font-family: var(--font-primary);
  font-size: clamp(44px, 7vw, 104px);
  font-weight: 800;
  line-height: 0.95;
  color: #1F1F1F;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin: 0 0 24px;
  animation: ${reveal} 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.15s backwards;

  @media (max-width: 1024px) { font-size: clamp(38px, 6vw, 80px); }
  @media (max-width: 768px)  { font-size: clamp(32px, 8vw, 60px); margin-bottom: 16px; }
  @media (max-width: 480px)  { font-size: clamp(26px, 9vw, 44px); }
`;

const Subtitle = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(15px, 1.6vw, 20px);
  font-weight: 400;
  color: rgba(31, 31, 31, 0.58);
  line-height: 1.65;
  margin: 0 0 56px;
  max-width: 560px;

  @media (max-width: 768px) { font-size: clamp(14px, 3vw, 17px); margin-bottom: 40px; }
  @media (max-width: 480px) { font-size: 14px; margin-bottom: 32px; }
`;

const Divider = styled.div`
  height: 1px;
  background: rgba(31, 31, 31, 0.12);
  margin-bottom: 48px;

  @media (max-width: 768px) { margin-bottom: 36px; }
`;

const CtaRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: 32px;

  @media (max-width: 900px) {
    flex-direction: column;
    gap: 24px;
  }
`;

const CtaInfo = styled.div`
  flex: 1;
  padding: 32px 36px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid rgba(192, 244, 171, 0.3);
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 6px;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    border-color: rgba(192, 244, 171, 0.7);
    box-shadow: 0 8px 32px rgba(192, 244, 171, 0.15);
  }

  @media (max-width: 768px) { padding: 24px; }
  @media (max-width: 480px) { padding: 20px; }
`;

const InfoTitle = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(18px, 2vw, 26px);
  font-weight: 700;
  color: #1F1F1F;
  margin: 0;
  line-height: 1.2;
`;

const InfoSub = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(14px, 1.4vw, 18px);
  font-weight: 400;
  color: rgba(31, 31, 31, 0.65);
  margin: 0;
  line-height: 1.4;
`;

const CtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  padding: 0 56px;
  background: #C0F4AB;
  border: none;
  border-radius: 12px;
  color: #0D0D0D;
  font-family: var(--font-primary);
  font-size: 15px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 32px rgba(192, 244, 171, 0.35);
  transition: background 0.25s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s ease;
  flex-shrink: 0;
  min-height: 80px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 55%;
    height: 100%;
    background: linear-gradient(120deg, transparent, rgba(255,255,255,0.28), transparent);
    transition: left 0.5s ease;
    pointer-events: none;
  }

  .arrow {
    font-size: 20px;
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #A8E899;
    transform: translateY(-3px);
    box-shadow: 0 16px 48px rgba(192, 244, 171, 0.45),
                0 0 0 4px rgba(192, 244, 171, 0.15);

    &::before { left: 160%; }
    .arrow { transform: translateX(4px); }
  }

  &:active { transform: translateY(0); }

  @media (max-width: 900px) {
    min-height: 64px;
    padding: 0 40px;
    width: 100%;
  }

  @media (max-width: 480px) {
    min-height: 56px;
    padding: 0 28px;
    font-size: 13px;
  }
`;

const FooterText = styled.p`
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 500;
  color: rgba(31, 31, 31, 0.45);
  margin: 28px 0 0;
  font-style: italic;
  opacity: ${({ $v }) => ($v ? 1 : 0)};
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.6s;

  @media (max-width: 480px) { font-size: 12px; }
`;

function Offer() {
  const { openLeadModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) setIsVisible(true); },
      { threshold: 0.1, rootMargin: "0px 0px -80px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <Section id="oferta" ref={sectionRef}>
      <Container $v={isVisible}>
        <SectionLabel>Próximo passo</SectionLabel>

        <Headline>
          Pronto para parar<br />
          de improvisar?
        </Headline>

        <Subtitle>
          Vamos mapear onde o seu crescimento quebra
          e estruturar o que precisa ser construído.
        </Subtitle>

        <Divider />

        <CtaRow>
          <CtaInfo>
            <InfoTitle>Sessão Estratégica de Diagnóstico</InfoTitle>
            <InfoSub>30 minutos · Sem custo · Diagnóstico real</InfoSub>
          </CtaInfo>

          <CtaButton type="button" onClick={openLeadModal}>
            Agendar Sessão <span className="arrow">→</span>
          </CtaButton>
        </CtaRow>

        <FooterText $v={isVisible}>
          Para empresas que querem previsibilidade — não tentativa.
        </FooterText>
      </Container>
    </Section>
  );
}

export default Offer;
