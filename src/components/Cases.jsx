import { useState, useEffect, useRef, useCallback } from "react";
import styled, { keyframes, css } from "styled-components";
import logo4Leader from "../assets/LOGO CLIENTES/4LEADER/04 - PNG - POSITIVO - FUNDO TRANSPARENTE.png";
import logoDuuGomes from "../assets/LOGO CLIENTES/DUU GOMES/Prancheta 7-Photoroom - 1080x1080.png";
import logoLeticia from "../assets/LOGO CLIENTES/LETICIA MUNIC/LE - LOGO-12.png";

const DURATION = 5000;
const CLICK_DELAY = 7000;

const revealUp = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const SLIDES = [
  {
    type: "stat",
    number: "00",
    stat: "100%",
    line1: "DOS CLIENTES RENOVARAM",
    line2: "CONTRATO POR 3× MAIS TEMPO.",
    sub: "que o contrato inicial.",
    bg: "#EA3B18",
    tc: "#0D0D0D",
    ac: "#0D0D0D",
    numOp: 0.1,
  },
  {
    type: "case",
    number: "01",
    label: "E-COMMERCE · FONES DE OUVIDO",
    company: "4LEADER",
    situation: "Empresa presa em e-commerces, sem conteúdo, sem diversificação de canais de aquisição.",
    action: "Construímos a presença digital do zero, estratégia de conteúdo, gestão de mídia e influenciadores.",
    results: [
      "Acompanhamos a marca do R$1M para R$5M de faturamento em 5 meses.",
      "Acabamos com o amadorismo digital com conteúdo e marketing de influência.",
    ],
    quote: "As principais mudanças após a contratação da Piligrin foram os números que trouxeram crescimento para nossa empresa e a comunicação tanto com os nossos clientes quanto com vocês é muito boa.",
    author: "Arthur · Founder da 4Leader",
    bg: "#0D0D0D",
    tc: "#F2F1EB",
    ac: "#EA3B18",
    numOp: 0.07,
    logo: logo4Leader,
    logoOpacity: 0.35,
    logoFilter: "none",
    logoSize:   "clamp(260px, 38vw, 560px)",
    logoRight:  "-10px",
    logoBottom: "clamp(-120px, -8.5vw, -60px)",
    logoLeft:   undefined,
    logoTop:    undefined,
  },
  {
    type: "case",
    number: "02",
    label: "BEBIDAS · CHOPP DE VINHO",
    company: "DUU GOMES",
    situation: "Marketing sem dados, sem conexão com o comercial. Marca estagnada e invisível no digital.",
    action: "Reposicionamento completo de marca — rebranding da logo à embalagem. Estrutura de marketing metrificada, integração ao comercial e dados para crescimento previsível.",
    results: [
      "Marca forte e desejada dentro e fora do digital.",
      "Sistema criado com previsibilidade e visão de crescimento.",
    ],
    quote: "Não vejo a Duu Gomes nos próximos anos sem a Piligrin.",
    author: "Thiago Gomes · CEO da Duu Gomes",
    bg: "#0F0F0F",
    tc: "#F2F1EB",
    ac: "#C0F4AB",
    numOp: 0.07,
    logo: logoDuuGomes,
    logoOpacity: 0.35,
    logoSize:   "clamp(260px, 38vw, 560px)",
    logoRight:  "-10px",
    logoBottom: "clamp(-120px, -8.5vw, -60px)",
    logoLeft:   undefined,
    logoTop:    undefined,
  },
  {
    type: "case",
    number: "03",
    label: "SERVIÇOS · DESIGN DE INTERIORES",
    company: "LETÍCIA MUNIQUE",
    situation: "Zero estrutura comercial, zero marketing, processo de entrega desorganizado — perdia clientes por falta de processo.",
    action: "Montamos marketing, processo comercial e estrutura de entrega do zero. Reposicionamos de projetos gerais para especialista em consultórios — nicho de maior ticket e menor concorrência.",
    results: [
      "Aumento no número de vendas com aquisição e conversão estruturados.",
      "Processo de entrega estruturado e escalável.",
    ],
    quote: "Tenho só elogios, vocês entenderam o meu negócio a fundo e com certeza, a empresa voltou a crescer com o trabalho de vocês, realmente foi entregue um alto valor.",
    author: "Letícia Munique · Founder e CEO da Letícia Munique Design de Interiores",
    bg: "#111111",
    tc: "#F2F1EB",
    ac: "#C0F4AB",
    numOp: 0.07,
    logo: logoLeticia,
    logoOpacity: 0.45,
    logoFilter: "invert(1) brightness(8) contrast(2)",
    logoSize:   "clamp(260px, 38vw, 560px)",
    logoRight:  "-40px",
    logoBottom: "clamp(-120px, -8vw, -60px)",
    logoLeft:   undefined,
    logoTop:    undefined,
  },
];

/* ─── Estrutura base (mantida) ──────────────────────────────── */

const Section = styled.section`
  position: relative;
  width: 100%;
  min-height: 100vh;
  overflow: hidden;

  @media (max-width: 768px)  { min-height: 115vh; }
  @media (max-width: 480px)  { min-height: 130vh; }
  @media (max-width: 360px)  { min-height: 145vh; }
  background: ${({ $bg }) => $bg};
  transition: background 0.75s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: radial-gradient(circle, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 36px 36px;
    pointer-events: none;
    z-index: 0;
  }
`;

const AccentBar = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: ${({ $color }) => $color};
  opacity: 0.85;
  z-index: 10;
  transition: background 0.75s ease;
`;

const SlideWrapper = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 96px 96px 128px 96px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? "auto" : "none")};
  transition: opacity 0.65s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1024px) { padding: 88px 64px 120px; }
  @media (max-width: 768px)  { padding: 80px 40px 148px; }
  @media (max-width: 480px)  { padding: 72px 28px 164px; }
  @media (max-width: 360px)  { padding: 64px 18px 180px; }
`;

const BgWord = styled.div`
  position: absolute;
  right: -0.04em;
  bottom: -0.1em;
  font-family: var(--font-primary);
  font-size: clamp(100px, 22vw, 340px);
  font-weight: 800;
  line-height: 0.85;
  color: ${({ $color }) => $color};
  opacity: ${({ $opacity }) => $opacity};
  letter-spacing: -0.04em;
  user-select: none;
  pointer-events: none;
  white-space: nowrap;
  transition: opacity 0.5s ease;

  @media (max-width: 768px) { font-size: 40vw; }
`;

const BgLogo = styled.img`
  position: absolute;
  right:   ${({ $right })   => $right   ?? "-10px"};
  bottom:  ${({ $bottom })  => $bottom  ?? "-170px"};
  left:    ${({ $left })    => $left    ?? "unset"};
  top:     ${({ $top })     => $top     ?? "unset"};
  width: ${({ $size }) => $size ?? "clamp(260px, 38vw, 560px)"};
  height: ${({ $size }) => $size ?? "clamp(260px, 38vw, 560px)"};
  object-fit: contain;
  object-position: bottom right;
  opacity: ${({ $opacity }) => $opacity ?? 0.25};
  filter: ${({ $filter }) => $filter ?? "none"};
  mix-blend-mode: ${({ $blend }) => $blend ?? "normal"};
  z-index: 0;
  user-select: none;
  pointer-events: none;
  image-rendering: -webkit-optimize-contrast;

  @media (max-width: 1024px) {
    width: clamp(200px, 34vw, 400px);
    height: clamp(200px, 34vw, 400px);
    right: -10px;
    left: unset;
    bottom: -48px;
  }

  @media (max-width: 768px) {
    width: clamp(160px, 48vw, 380px);
    height: clamp(160px, 48vw, 380px);
    right: -8px;
    left: unset;
    bottom: -36px;
  }

  @media (max-width: 480px) {
    width: clamp(120px, 42vw, 220px);
    height: clamp(120px, 42vw, 220px);
    right: -6px;
    bottom: -24px;
  }

  @media (max-width: 360px) {
    width: clamp(100px, 38vw, 160px);
    height: clamp(100px, 38vw, 160px);
    right: -4px;
    bottom: -16px;
  }
`;

const SlideContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: clamp(320px, 60%, 780px);

  @media (max-width: 768px) { max-width: 55%; }
  @media (max-width: 480px) { max-width: 65%; }
  @media (max-width: 360px) { max-width: 72%; }

  ${({ $active }) =>
    $active &&
    css`
      animation: ${revealUp} 0.65s cubic-bezier(0.4, 0, 0.2, 1) 0.1s both;
    `}
`;

/* ── Stat slide ─────────────────────────────────────────────── */

const StatNumber = styled.div`
  font-family: var(--font-primary);
  font-size: clamp(80px, 18vw, 200px);
  font-weight: 800;
  line-height: 0.9;
  color: ${({ $color }) => $color};
  letter-spacing: -0.05em;
  margin-bottom: 24px;

  @media (max-width: 480px) { font-size: clamp(72px, 20vw, 120px); }
`;

const StatLine = styled.div`
  font-family: var(--font-primary);
  font-size: clamp(18px, 3.5vw, 42px);
  font-weight: 800;
  color: ${({ $color }) => $color};
  text-transform: uppercase;
  letter-spacing: -0.03em;
  line-height: 1.0;
  margin: 0;

  @media (max-width: 480px) { font-size: clamp(16px, 4.5vw, 28px); }
`;

const StatSub = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(14px, 1.8vw, 20px);
  font-weight: 400;
  color: ${({ $color }) => $color};
  opacity: 0.55;
  margin: 12px 0 0;
  letter-spacing: 0.02em;
`;

/* ── Case slide ─────────────────────────────────────────────── */

const Counter = styled.div`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  opacity: 0.45;
  letter-spacing: 0.3em;
  text-transform: uppercase;
  margin-bottom: 24px;
  display: flex;
  align-items: center;
  gap: 14px;

  &::before {
    content: '';
    display: block;
    width: 36px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }
`;

/* ── Layout dossiê ──────────────────────────────────────────── */

const CaseLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 28px;
  margin-bottom: 28px;

  @media (max-width: 480px) {
    gap: 20px;
    margin-bottom: 20px;
  }
`;

const CaseLeft = styled.div`
  display: flex;
  flex-direction: column;
`;

const CaseLabel = styled.p`
  font-family: var(--font-primary);
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.26em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  gap: 10px;

  &::before {
    content: '';
    display: block;
    width: 18px;
    height: 1px;
    background: currentColor;
    flex-shrink: 0;
  }
`;

const CompanyName = styled.h2`
  font-family: var(--font-primary);
  font-size: clamp(44px, 7.5vw, 104px);
  font-weight: 800;
  line-height: 0.88;
  color: ${({ $color }) => $color};
  text-transform: uppercase;
  letter-spacing: -0.035em;
  margin: 10px 0 0;

  @media (max-width: 1020px) { margin-top: 0; }
  @media (max-width: 768px) { font-size: clamp(40px, 9vw, 72px); }
  @media (max-width: 480px) { font-size: clamp(32px, 9.5vw, 56px); }
  @media (max-width: 360px) { font-size: clamp(28px, 9vw, 44px); }
`;

const CaseRight = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 2px;
`;

const DossierDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.07);
`;

const DossierRow = styled.div`
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 20px;
  padding: 14px 0;

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 5px;
    padding: 12px 0;
  }
`;

const DossierTag = styled.span`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  opacity: 1;
  padding-top: 2px;
  line-height: 1.5;
`;

const DossierText = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(12px, 1.1vw, 14px);
  font-weight: 400;
  color: rgba(242, 241, 235, 0.65);
  line-height: 1.7;
  margin: 0;

  @media (max-width: 480px) { font-size: 12px; }
`;

const ResultsList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 7px;
`;

const ResultItem = styled.li`
  font-family: var(--font-primary);
  font-size: clamp(12px, 1.1vw, 14px);
  font-weight: 600;
  color: ${({ $color }) => $color};
  line-height: 1.5;
  padding-left: 18px;
  position: relative;

  &::before {
    content: '↗';
    position: absolute;
    left: 0;
    font-size: 10px;
    line-height: 1.8;
    opacity: 0.75;
  }

  @media (max-width: 480px) { font-size: 12px; }
`;

/* ── Quote ──────────────────────────────────────────────────── */

const QuoteStrip = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.07);

  @media (max-width: 480px) { gap: 14px; padding-top: 16px; }
`;

const QuoteMark = styled.span`
  font-family: var(--font-primary);
  font-size: clamp(44px, 5.5vw, 72px);
  font-weight: 800;
  line-height: 0.65;
  color: ${({ $color }) => $color};
  opacity: 0.3;
  flex-shrink: 0;
  user-select: none;
  margin-top: 4px;

  @media (max-width: 480px) { font-size: 40px; }
`;

const QuoteBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
  min-width: 0;
`;

const QuoteText = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(12px, 1.2vw, 15px);
  font-weight: 400;
  color: ${({ $color }) => $color};
  opacity: 0.58;
  line-height: 1.72;
  margin: 0;
  font-style: italic;

  @media (max-width: 480px) { font-size: 12px; }
`;

const QuoteAuthor = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(9px, 0.82vw, 11px);
  font-weight: 700;
  color: ${({ $color }) => $color};
  opacity: 0.38;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  margin: 0;
`;

/* ── Side label ─────────────────────────────────────────────── */

const SideLabel = styled.div`
  position: absolute;
  right: 36px;
  top: 50%;
  transform: translateY(-50%) rotate(90deg);
  font-family: var(--font-primary);
  font-size: 9px;
  font-weight: 700;
  letter-spacing: 0.4em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  opacity: 0.2;
  user-select: none;
  z-index: 5;
  white-space: nowrap;
  transition: color 0.75s ease;

  @media (max-width: 768px) { display: none; }
`;

/* ── Navigation ─────────────────────────────────────────────── */

const NavArea = styled.div`
  position: absolute;
  bottom: 44px;
  left: 96px;
  right: 96px;
  z-index: 10;
  display: flex;
  align-items: flex-end;
  gap: 0;

  @media (max-width: 1024px) { left: 64px; right: 64px; }
  @media (max-width: 768px)  { left: 40px; right: 40px; bottom: 36px; }
  @media (max-width: 480px)  { left: 28px; right: 28px; bottom: 28px; }
  @media (max-width: 360px)  { left: 18px; right: 18px; bottom: 20px; }
`;

const NavDot = styled.button`
  background: none;
  border: none;
  padding: 0 16px 0 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
  opacity: ${({ $active }) => ($active ? 1 : 0.38)};
  transition: opacity 0.3s ease;

  &:hover { opacity: ${({ $active }) => ($active ? 1 : 0.65)}; }

  @media (max-width: 480px) { padding-right: 8px; gap: 6px; }
  @media (max-width: 360px) { padding-right: 6px; }
`;

const DotLabel = styled.span`
  font-family: var(--font-primary);
  font-size: 10px;
  font-weight: 700;
  color: ${({ $color }) => $color};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  display: block;
  transition: color 0.75s ease;

  @media (max-width: 480px) { font-size: 8px; letter-spacing: 0.1em; }
  @media (max-width: 360px) { font-size: 7px; }
`;

const DotTrack = styled.div`
  width: 64px;
  height: 3px;
  background: ${({ $color }) => $color};
  opacity: 0.22;
  position: relative;
  overflow: hidden;
  border-radius: 3px;
  transition: background 0.75s ease, opacity 0.3s ease;

  ${NavDot}:hover & { opacity: 0.42; }

  @media (max-width: 640px) { width: 44px; height: 2px; }
  @media (max-width: 480px) { width: 36px; }
  @media (max-width: 360px) { width: 26px; }
`;

const DotFill = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: ${({ $pct }) => `${($pct * 100).toFixed(2)}%`};
  background: ${({ $color }) => $color};
  border-radius: 2px;
  transition: background 0.75s ease;
`;

const DOT_LABELS = ["GERAL", "4LEADER", "DUU GOMES", "LETÍCIA"];

/* ─── Component ─────────────────────────────────────────────── */

function Cases() {
  const [current, setCurrent] = useState(0);
  const [manualDelay, setManualDelay] = useState(false);
  const [progress, setProgress] = useState(0);
  const [inView, setInView] = useState(false);
  const sectionRef = useRef(null);
  const rafRef = useRef(null);
  const timerRef = useRef(null);

  const slide = SLIDES[current];

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.unobserve(el);
  }, []);

  const goTo = useCallback((idx) => {
    setCurrent(idx);
    setManualDelay(true);
    setProgress(0);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setManualDelay(false), CLICK_DELAY);
  }, []);

  useEffect(() => {
    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    setProgress(0);
    if (!inView || manualDelay) return;

    const start = performance.now();
    const tick = (now) => {
      const pct = Math.min((now - start) / DURATION, 1);
      setProgress(pct);
      if (pct < 1) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        setCurrent((c) => (c + 1) % SLIDES.length);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [current, manualDelay, inView]);

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <Section id="cases" ref={sectionRef} $bg={slide.bg}>
      <AccentBar $color={slide.ac} />

      {SLIDES.map((s, i) => (
        <SlideWrapper key={s.number} $active={i === current}>
          {s.logo ? (
            <BgLogo
              src={s.logo}
              alt=""
              $opacity={s.logoOpacity}
              $filter={s.logoFilter}
              $blend={s.logoBlend}
              $size={s.logoSize}
              $right={s.logoRight}
              $bottom={s.logoBottom}
              $left={s.logoLeft}
              $top={s.logoTop}
            />
          ) : (
            <BgWord $color={s.tc} $opacity={s.numOp}>
              {s.type === "stat" ? s.stat : s.number}
            </BgWord>
          )}

          <SlideContent $active={i === current}>
            {s.type === "stat" ? (
              <>
                <Counter $color={s.tc}>
                  {s.number} / {String(SLIDES.length - 1).padStart(2, "0")}
                </Counter>
                <StatNumber $color={s.tc}>{s.stat}</StatNumber>
                <StatLine $color={s.tc}>{s.line1}</StatLine>
                <StatLine $color={s.tc}>{s.line2}</StatLine>
                <StatSub $color={s.tc}>{s.sub}</StatSub>
              </>
            ) : (
              <>
                <Counter $color={s.tc}>
                  {s.number} / {String(SLIDES.length - 1).padStart(2, "0")}
                </Counter>

                <CaseLayout>
                  <CaseLeft>
                    <CaseLabel $color={s.ac}>{s.label}</CaseLabel>
                    <CompanyName $color={s.tc}>{s.company}</CompanyName>
                  </CaseLeft>

                  <CaseRight>
                    <DossierRow>
                      <DossierTag $color={s.ac}>Situação anterior</DossierTag>
                      <DossierText>{s.situation}</DossierText>
                    </DossierRow>
                    <DossierDivider />
                    <DossierRow>
                      <DossierTag $color={s.ac}>O que foi feito</DossierTag>
                      <DossierText>{s.action}</DossierText>
                    </DossierRow>
                    <DossierDivider />
                    <DossierRow>
                      <DossierTag $color={s.ac}>Resultados</DossierTag>
                      <ResultsList>
                        {s.results.map((r, ri) => (
                          <ResultItem key={ri} $color={s.ac}>{r}</ResultItem>
                        ))}
                      </ResultsList>
                    </DossierRow>
                  </CaseRight>
                </CaseLayout>

                <QuoteStrip>
                  <QuoteMark $color={s.ac}>"</QuoteMark>
                  <QuoteBody>
                    <QuoteText $color={s.tc}>{s.quote}</QuoteText>
                    <QuoteAuthor $color={s.tc}>— {s.author}</QuoteAuthor>
                  </QuoteBody>
                </QuoteStrip>
              </>
            )}
          </SlideContent>
        </SlideWrapper>
      ))}

      <SideLabel $color={slide.tc}>Piligrin — Cases Reais</SideLabel>

      <NavArea>
        {SLIDES.map((s, i) => (
          <NavDot
            key={s.number}
            $active={i === current}
            onClick={() => goTo(i)}
            aria-label={`Case ${s.number}`}
          >
            <DotLabel $color={slide.tc}>{DOT_LABELS[i]}</DotLabel>
            <DotTrack $color={slide.tc}>
              <DotFill
                $color={slide.tc}
                $pct={i === current ? progress : 0}
              />
            </DotTrack>
          </NavDot>
        ))}
      </NavArea>
    </Section>
  );
}

export default Cases;
