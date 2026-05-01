import { useState } from "react";
import styled, { keyframes } from "styled-components";

const scroll = keyframes`
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const Strip = styled.div`
  width: 100%;
  background: #0D0D0D;
  border-top: 1px solid rgba(255, 255, 255, 0.06);
  border-bottom: 1px solid rgba(255, 255, 255, 0.06);
  padding: 20px 0;
  overflow: hidden;
  position: relative;
  z-index: 5;
  cursor: default;

  @media (max-width: 480px) { padding: 14px 0; }
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 80s linear infinite;
  animation-play-state: ${({ $paused }) => ($paused ? "paused" : "running")};
`;

const Group = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;
`;

const Item = styled.div`
  display: flex;
  align-items: center;
  gap: 22px;
  padding: 0 28px;

  @media (max-width: 640px) { gap: 16px; padding: 0 20px; }
  @media (max-width: 480px) { gap: 12px; padding: 0 14px; }
`;

const Label = styled.span`
  font-family: var(--font-primary);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${({ $paused }) =>
    $paused ? "rgba(255, 255, 255, 0.55)" : "rgba(255, 255, 255, 0.2)"};
  white-space: nowrap;
  transition: color 0.3s ease;

  @media (max-width: 480px) { font-size: 10px; letter-spacing: 0.1em; }
`;

const Dot = styled.span`
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background: #EA3B18;
  opacity: 0.45;
  flex-shrink: 0;
`;

const ITEMS = [
  "Aquisição",
  "Demanda Previsível",
  "Mídia Paga",
  { statement: "Não somos uma Agência de Marketing!" },
  "Conteúdo",
  "Influenciadores",
  "Posicionamento",
  "Branding",
  "Conversão",
  { statement: "Não somos uma Agência de Marketing!" },
  "Funis",
  "Vendas",
  "CRM",
  "Automações",
  "Dados",
  "IA",
  "Operação",
  "Escala",
  "Consultoria",
  { statement: "Não somos uma Agência de Marketing!" },
  "Software",
];

function Marquee() {
  const [paused, setPaused] = useState(false);

  return (
    <Strip
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <Track $paused={paused}>
        {[0, 1].map((g) => (
          <Group key={g}>
            {ITEMS.map((item, idx) => {
              const text = typeof item === "object" ? item.statement : item;
              return (
                <Item key={`${g}-${idx}`}>
                  <Label $paused={paused}>{text}</Label>
                  <Dot />
                </Item>
              );
            })}
          </Group>
        ))}
      </Track>
    </Strip>
  );
}

export default Marquee;
