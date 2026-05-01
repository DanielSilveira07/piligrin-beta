import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";

const reveal = keyframes`
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const lineGrow = keyframes`
  from { width: 0; }
  to   { width: 100%; }
`;

const ruleGrow = keyframes`
  from { width: 0; opacity: 0; }
  to   { width: 32px; opacity: 0.8; }
`;

const ghostFade = keyframes`
  from { opacity: 0; }
  to   { opacity: 0.055; }
`;

const PILLARS = [
  {
    num: "01",
    title: "AQUISIÇÃO",
    tagline: "Demanda previsível, não sorte.",
    desc: "Canais, conteúdo e mídia paga funcionando como um sistema orientado a receita.",
    accent: "#EA3B18",
    glow: "234, 59, 24",
  },
  {
    num: "02",
    title: "CONVERSÃO",
    tagline: "Lead que chega tem que comprar.",
    desc: "Funil, oferta e processo comercial desenhados para fechar com consistência.",
    accent: "#C0F4AB",
    glow: "192, 244, 171",
  },
  {
    num: "03",
    title: "OPERAÇÃO",
    tagline: "Escala sem depender de você.",
    desc: "Dados, automação e consultoria aplicados para o sistema rodar sem esforço manual.",
    accent: "#F2F1EB",
    glow: "242, 241, 235",
  },
];

/* ─── Layout ────────────────────────────────────────────────── */

const Section = styled.section`
  background: #080808;
  padding: 120px 64px;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(242, 241, 235, 0.012) 1px, transparent 1px),
      linear-gradient(90deg, rgba(242, 241, 235, 0.012) 1px, transparent 1px);
    background-size: 72px 72px;
    pointer-events: none;
    z-index: 0;
  }

  @media (max-width: 1024px) { padding: 100px 48px; }
  @media (max-width: 768px)  { padding: 80px 32px; }
  @media (max-width: 480px)  { padding: 64px 20px; }
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
`;

const Top = styled.div`
  margin-bottom: 72px;
  opacity: ${({ $v }) => ($v ? 1 : 0)};
  transform: translateY(${({ $v }) => ($v ? "0" : "28px")});
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1),
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) { margin-bottom: 56px; }
  @media (max-width: 480px) { margin-bottom: 44px; }
`;

const HeadlineCol = styled.div`
  max-width: 1060px;
`;

const SectionLabel = styled.p`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: #EA3B18;
  margin: 0 0 28px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::before {
    content: '';
    display: block;
    width: 28px;
    height: 2px;
    background: #EA3B18;
    flex-shrink: 0;
  }
`;

const HLine = styled.div`
  font-family: var(--font-primary);
  font-size: clamp(32px, 4.8vw, 68px);
  font-weight: 800;
  line-height: 1.0;
  letter-spacing: -0.03em;
  text-transform: uppercase;
  opacity: ${({ $v }) => ($v ? 1 : 0)};
  transform: translateY(${({ $v }) => ($v ? "0" : "36px")});
  transition:
    opacity  0.75s cubic-bezier(0.4, 0, 0.2, 1) ${({ $d }) => $d ?? "0s"},
    transform 0.75s cubic-bezier(0.4, 0, 0.2, 1) ${({ $d }) => $d ?? "0s"};

  &.white { color: #F2F1EB; }
  &.red   { color: #EA3B18; }

  @media (max-width: 768px) { font-size: clamp(28px, 5.5vw, 52px); }
  @media (max-width: 480px) { font-size: clamp(26px, 7vw, 42px); }
`;

const HSep = styled.div`
  width: 48px;
  height: 3px;
  background: #EA3B18;
  border-radius: 2px;
  margin: 24px 0 28px;
  opacity: ${({ $v }) => ($v ? 0.9 : 0)};
  transform: scaleX(${({ $v }) => ($v ? 1 : 0)});
  transform-origin: left;
  transition:
    opacity  0.5s ease ${({ $d }) => $d ?? "0s"},
    transform 0.5s cubic-bezier(0.4, 0, 0.2, 1) ${({ $d }) => $d ?? "0s"};
`;

const Subtitle = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(14px, 1.4vw, 17px);
  font-weight: 400;
  color: rgba(242, 241, 235, 0.48);
  line-height: 1.75;
  margin: 0;
  max-width: 560px;

  @media (max-width: 480px) { font-size: 14px; }
`;

const Divider = styled.div`
  width: 100%;
  height: 1px;
  background: rgba(255, 255, 255, 0.08);
  margin-bottom: 72px;

  @media (max-width: 768px) { margin-bottom: 56px; }
  @media (max-width: 480px) { margin-bottom: 44px; }
`;

/* ─── Cards ─────────────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 12px;
  }
`;

const Card = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.02);
  border: 1px solid rgba(255, 255, 255, 0.065);
  padding: 48px 40px 52px;
  cursor: default;
  transition:
    background 0.45s ease,
    border-color 0.45s ease,
    box-shadow 0.45s ease,
    transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  animation: ${reveal} 0.8s cubic-bezier(0.4, 0, 0.2, 1) ${({ $i }) => 0.2 + $i * 0.14}s both;

  /* top accent bar */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accent }) => $accent};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    background: rgba(${({ $glow }) => $glow}, 0.038);
    border-color: rgba(${({ $glow }) => $glow}, 0.2);
    box-shadow:
      0 0 48px rgba(${({ $glow }) => $glow}, 0.08),
      inset 0 0 80px rgba(${({ $glow }) => $glow}, 0.03);
    transform: translateY(-4px);

    &::before { transform: scaleX(1); }
  }

  @media (max-width: 900px) {
    padding: 40px 32px 44px;
    &:hover { transform: translateY(-2px); }
  }

  @media (max-width: 480px) { padding: 32px 20px 36px; }
`;

const GhostNum = styled.div`
  position: absolute;
  right: -0.04em;
  bottom: -0.12em;
  font-family: var(--font-primary);
  font-size: clamp(130px, 17vw, 210px);
  font-weight: 800;
  line-height: 0.85;
  color: ${({ $color }) => $color};
  opacity: 0.055;
  letter-spacing: -0.04em;
  user-select: none;
  pointer-events: none;
  animation: ${ghostFade} 0.9s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay}s both;
  transition: opacity 0.5s ease;

  ${Card}:hover & { opacity: 0.1; }

  @media (max-width: 900px) { font-size: clamp(100px, 22vw, 160px); }
`;

const CardNum = styled.span`
  display: block;
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
  color: ${({ $color }) => $color};
  opacity: 0.6;
  margin-bottom: 20px;
  position: relative;
  z-index: 1;
`;

const CardTitle = styled.h3`
  font-family: var(--font-primary);
  font-size: clamp(38px, 4vw, 58px);
  font-weight: 800;
  color: #F2F1EB;
  letter-spacing: -0.04em;
  line-height: 0.9;
  text-transform: uppercase;
  margin: 0 0 28px;
  position: relative;
  z-index: 1;

  @media (max-width: 900px) { font-size: clamp(40px, 9vw, 64px); }
  @media (max-width: 480px) { font-size: clamp(34px, 9vw, 50px); }
`;

const CardRule = styled.div`
  width: 32px;
  height: 2px;
  background: ${({ $color }) => $color};
  border-radius: 2px;
  margin-bottom: 22px;
  opacity: 0.8;
  position: relative;
  z-index: 1;
  animation: ${ruleGrow} 0.55s cubic-bezier(0.4, 0, 0.2, 1) ${({ $delay }) => $delay}s both;
  transition: width 0.4s ease;

  ${Card}:hover & { width: 52px; }
`;

const CardTagline = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(14px, 1.25vw, 16px);
  font-weight: 700;
  color: #F2F1EB;
  margin: 0 0 12px;
  line-height: 1.35;
  letter-spacing: -0.01em;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) { font-size: 14px; }
`;

const CardDesc = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(13px, 1vw, 15px);
  font-weight: 400;
  color: rgba(242, 241, 235, 0.44);
  line-height: 1.75;
  margin: 0;
  position: relative;
  z-index: 1;

  @media (max-width: 480px) { font-size: 13px; }
`;

/* ─── Component ─────────────────────────────────────────────── */

function Pillars() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => { if (sectionRef.current) observer.unobserve(sectionRef.current); };
  }, []);

  return (
    <Section id="pilares" ref={sectionRef}>
      <Container>
        <Top $v={isVisible}>
          <HeadlineCol>
            <SectionLabel>O Sistema</SectionLabel>
            <HLine className="white" $v={isVisible} $d="0.05s">A INFRAESTRUTURA</HLine>
            <HLine className="white" $v={isVisible} $d="0.15s">POR TRÁS DE EMPRESAS</HLine>
            <HLine className="white" $v={isVisible} $d="0.27s">QUE CRESCEM COM</HLine>
            <HLine className="red"   $v={isVisible} $d="0.4s">PREVISIBILIDADE</HLine>
            <HSep $v={isVisible} $d="0.56s" />
            <Subtitle>
              Enquanto o mercado executa ações isoladas, nós
              construímos o sistema que sustenta o crescimento.
            </Subtitle>
          </HeadlineCol>
        </Top>

        <Divider />

        <Grid>
          {PILLARS.map((p, i) => (
            <Card key={p.num} $i={i} $accent={p.accent} $glow={p.glow}>
              <GhostNum $color={p.accent} $delay={0.45 + i * 0.14}>{p.num}</GhostNum>

              <CardNum $color={p.accent}>{p.num} —</CardNum>
              <CardTitle>{p.title}</CardTitle>
              <CardRule $color={p.accent} $delay={0.55 + i * 0.14} />
              <CardTagline>{p.tagline}</CardTagline>
              <CardDesc>{p.desc}</CardDesc>
            </Card>
          ))}
        </Grid>
      </Container>
    </Section>
  );
}

export default Pillars;
