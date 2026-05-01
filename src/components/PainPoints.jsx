import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useModal } from "../context/ModalContext";

const reveal = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
`;

/* ─── Section ──────────────────────────────────────────────── */

const Section = styled.section`
  background: #111111;
  padding: 120px 0;
  overflow: hidden;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(234,59,24,0.03) 1px, transparent 1px),
      linear-gradient(90deg, rgba(234,59,24,0.03) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 768px) { padding: 80px 0; }
  @media (max-width: 480px) { padding: 56px 0; }
`;

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 64px;
  position: relative;
  z-index: 2;

  @media (max-width: 1024px) { padding: 0 48px; }
  @media (max-width: 768px)  { padding: 0 32px; }
  @media (max-width: 480px)  { padding: 0 20px; }
`;

/* ─── Head ─────────────────────────────────────────────────── */

const Head = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  align-items: end;
  margin-bottom: 64px;
  opacity: ${({ $v }) => ($v ? 1 : 0)};
  transform: translateY(${({ $v }) => ($v ? 0 : 28)}px);
  transition: opacity 0.8s cubic-bezier(0.4,0,0.2,1),
              transform 0.8s cubic-bezier(0.4,0,0.2,1);

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 32px;
    margin-bottom: 48px;
  }
`;

const SectionLabel = styled.p`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #EA3B18;
  margin: 0 0 24px;
  display: flex;
  align-items: center;
  gap: 12px;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 2px;
    background: #EA3B18;
    flex-shrink: 0;
  }
`;

const Title = styled.h2`
  font-family: var(--font-primary);
  font-size: clamp(36px, 5vw, 68px);
  font-weight: 800;
  line-height: 0.95;
  color: #F2F1EB;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  margin: 0;

  @media (max-width: 480px) { font-size: clamp(32px, 8vw, 48px); }
`;

const HeadRight = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  gap: 28px;
`;

const Subtitle = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(15px, 1.4vw, 17px);
  font-weight: 400;
  color: rgba(242,241,235,0.68);
  line-height: 1.8;
  margin: 0;
`;

const HDivider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255,255,255,0.08);
`;

/* ─── Diagnostic rows ──────────────────────────────────────── */

const DiagRow = styled.div`
  display: grid;
  grid-template-columns: 72px minmax(180px, 260px) 1fr;
  gap: 56px;
  align-items: center;
  padding: 48px 0 48px 0;
  border-bottom: 1px solid rgba(255,255,255,0.07);
  position: relative;
  cursor: default;
  transition: background 0.35s ease, padding-left 0.35s cubic-bezier(0.4,0,0.2,1);
  animation: ${reveal} 0.75s cubic-bezier(0.4,0,0.2,1) ${({ $i }) => 0.3 + $i * 0.15}s both;
  animation-play-state: ${({ $v }) => ($v ? "running" : "paused")};

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 2px;
    background: #EA3B18;
    transform: scaleY(0);
    transform-origin: bottom;
    border-radius: 2px;
    transition: transform 0.4s cubic-bezier(0.4,0,0.2,1);
  }

  &:hover {
    background: rgba(234,59,24,0.025);
    padding-left: 14px;
    &::after { transform: scaleY(1); }
  }

  @media (max-width: 900px) {
    grid-template-columns: 48px 1fr;
    grid-template-rows: auto auto;
    gap: 10px 20px;
    padding: 36px 0;
  }

  @media (max-width: 480px) {
    grid-template-columns: 36px 1fr;
    gap: 8px 14px;
    padding: 28px 0;
  }
`;

const DiagNum = styled.span`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.22em;
  color: #EA3B18;
  opacity: 0.7;
  padding-top: 4px;

  @media (max-width: 900px) { grid-row: 1; }
`;

const DiagKeyword = styled.h3`
  font-family: var(--font-primary);
  font-size: clamp(28px, 3.2vw, 48px);
  font-weight: 800;
  color: #F2F1EB;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  line-height: 1.0;
  margin: 0;
  transition: transform 0.35s cubic-bezier(0.4,0,0.2,1);

  ${DiagRow}:hover & { transform: translateX(6px); }

  @media (max-width: 900px) {
    grid-row: 1;
    font-size: clamp(24px, 5.5vw, 36px);
  }
`;

const DiagContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media (max-width: 900px) {
    grid-column: 1 / -1;
    grid-row: 2;
  }
`;

const DiagLead = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(14px, 1.25vw, 17px);
  font-weight: 500;
  color: rgba(242,241,235,0.82);
  line-height: 1.65;
  margin: 0;
`;

const DiagBullets = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const DiagBullet = styled.li`
  font-family: var(--font-primary);
  font-size: clamp(13px, 1.05vw, 14px);
  color: rgba(242,241,235,0.52);
  line-height: 1.6;
  padding-left: 20px;
  position: relative;

  &::before {
    content: '—';
    position: absolute;
    left: 0;
    color: #EA3B18;
    opacity: 0.65;
    font-size: 10px;
  }
`;

const DiagResult = styled.p`
  font-family: var(--font-primary);
  font-size: 12px;
  font-weight: 700;
  color: #EA3B18;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin: 10px 0 0;
  padding: 8px 14px;
  background: rgba(234,59,24,0.08);
  border-left: 2px solid rgba(234,59,24,0.5);
  border-radius: 0 4px 4px 0;
  align-self: flex-start;

  @media (max-width: 480px) {
    font-size: 11px;
    padding: 7px 12px;
    letter-spacing: 0.06em;
  }
`;

/* ─── CTA bottom ───────────────────────────────────────────── */

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 56px;
  gap: 32px;
  opacity: ${({ $v }) => ($v ? 1 : 0)};
  transform: translateY(${({ $v }) => ($v ? 0 : 16)}px);
  transition: opacity 0.8s ease 0.55s, transform 0.8s ease 0.55s;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const CtaTagline = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(15px, 1.6vw, 20px);
  font-weight: 600;
  color: rgba(242,241,235,0.58);
  letter-spacing: -0.01em;
  margin: 0;
  line-height: 1.4;

  span { color: rgba(242,241,235,0.92); }

  @media (max-width: 768px) { font-size: 15px; }
`;

const CtaButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: #EA3B18;
  border: none;
  border-radius: 6px;
  color: #FFFFFF;
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 4px 20px rgba(234,59,24,0.28);
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease;

  .arrow { transition: transform 0.3s ease; }

  &:hover {
    background: #C82D10;
    transform: translateY(-2px);
    box-shadow: 0 8px 28px rgba(234,59,24,0.4);
    .arrow { transform: translateX(5px); }
  }

  @media (max-width: 768px) { width: 100%; justify-content: center; }
  @media (max-width: 480px) { padding: 14px 24px; font-size: 12px; }
`;

/* ─── Data ─────────────────────────────────────────────────── */

const painItems = [
  {
    title: "Aquisição",
    lead: "Você gera demanda, mas os canais não conversam entre si.",
    bullets: [
      "Tráfego, conteúdo e vendas operam em silos",
      "Você não sabe qual canal gera receita real",
      "Não existe previsibilidade de demanda",
    ],
    result: "Crescimento inconsistente e CAC crescente",
  },
  {
    title: "Conversão",
    lead: "O lead chega, mas desaparece sem comprar.",
    bullets: [
      "Atendimento depende de pessoas, não de processo",
      "Follow-up inexistente ou manual",
      "Não existe padrão de venda replicável",
    ],
    result: "Você perde dinheiro todos os dias",
  },
  {
    title: "Escala",
    lead: "O crescimento depende de você estar em tudo.",
    bullets: [
      "Processos críticos não são automatizados",
      "Não existe escala sem contratar mais gente",
      "O dono vira gargalo da própria empresa",
    ],
    result: "Você trava exatamente quando começa a crescer",
  },
];

/* ─── Component ────────────────────────────────────────────── */

function PainPoints() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);
  const { openLeadModal } = useModal();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <Section id="dores" ref={sectionRef}>
      <Container>
        <Head $v={isVisible}>
          <div>
            <SectionLabel>O Diagnóstico</SectionLabel>
            <Title>
              ONDE O SEU<br />
              CRESCIMENTO<br />
              QUEBRA?
            </Title>
          </div>
          <HeadRight>
            <Subtitle>
              A maioria das PMEs não tem problema apenas de marketing.
              Tem problema de sistema.
            </Subtitle>
          </HeadRight>
        </Head>

        <HDivider />

        {painItems.map((item, i) => (
          <DiagRow key={i} $i={i} $v={isVisible}>
            <DiagNum>0{i + 1}</DiagNum>
            <DiagKeyword>{item.title}</DiagKeyword>
            <DiagContent>
              <DiagLead>{item.lead}</DiagLead>
              <DiagBullets>
                {item.bullets.map((b, bi) => (
                  <DiagBullet key={bi}>{b}</DiagBullet>
                ))}
              </DiagBullets>
              <DiagResult>→ {item.result}</DiagResult>
            </DiagContent>
          </DiagRow>
        ))}

        <CtaRow $v={isVisible}>
          <CtaTagline>
            Você se encaixa em <span>alguma dessas situações?</span>
          </CtaTagline>
          <CtaButton onClick={openLeadModal}>
            Quero a minha solução <span className="arrow">→</span>
          </CtaButton>
        </CtaRow>
      </Container>
    </Section>
  );
}

export default PainPoints;
