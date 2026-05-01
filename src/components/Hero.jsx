import styled, { keyframes } from "styled-components";
import bgImg from "../assets/img/bg_img.png";
import { useModal } from "../context/ModalContext";

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(22px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const HeroSection = styled.section`
  min-height: 100vh;
  background: #EA3B18;
  background-image: url(${bgImg});
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  padding: 112px 64px 64px;
  position: relative;
  overflow: hidden;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      160deg,
      rgba(0, 0, 0, 0.05) 0%,
      transparent 45%,
      rgba(0, 0, 0, 0.22) 100%
    );
    pointer-events: none;
  }

  @media (max-width: 1024px) { padding: 100px 48px 56px; }
  @media (max-width: 768px)  { padding: 88px 32px 52px; }
  @media (max-width: 640px)  { padding: 80px 20px 44px; }
  @media (max-width: 480px)  { padding: 72px 16px 40px; }
`;

const TopLabel = styled.div`
  display: flex;
  align-items: center;
  gap: 20px;
  position: relative;
  z-index: 2;
  animation: ${slideUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.1s backwards;
`;

const LabelText = styled.span`
  font-family: var(--font-primary);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  color: rgba(255, 255, 255, 0.6);
  white-space: nowrap;
`;

const LabelLine = styled.div`
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.22);
`;

const MainTitle = styled.h1`
  font-family: var(--font-primary);
  font-size: clamp(60px, 11.5vw, 160px);
  font-weight: 800;
  line-height: 0.92;
  color: #FFFFFF;
  text-transform: uppercase;
  letter-spacing: -0.03em;
  margin: auto 0;
  padding: 52px 0;
  position: relative;
  z-index: 2;
  text-shadow: 0 4px 48px rgba(0, 0, 0, 0.12);
  animation: ${slideUp} 0.9s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;

  @media (max-width: 640px) {
    font-size: clamp(46px, 13vw, 80px);
    padding: 36px 0;
    line-height: 0.95;
  }

  @media (max-width: 480px) {
    font-size: clamp(36px, 14vw, 60px);
    padding: 28px 0;
  }

  @media (max-width: 375px) {
    font-size: clamp(30px, 15vw, 48px);
  }
`;

const HeroDivider = styled.div`
  height: 1px;
  background: rgba(255, 255, 255, 0.2);
  position: relative;
  z-index: 2;
  animation: ${slideUp} 0.7s cubic-bezier(0.4, 0, 0.2, 1) 0.3s backwards;
`;

const BottomRow = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 40px;
  padding-top: 36px;
  position: relative;
  z-index: 2;
  animation: ${slideUp} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.4s backwards;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 24px;
    padding-top: 28px;
  }

  @media (max-width: 480px) {
    padding-top: 22px;
    gap: 20px;
  }
`;

const HeroDesc = styled.p`
  font-family: var(--font-primary);
  font-size: clamp(12px, 1.4vw, 17px);
  font-weight: 400;
  line-height: 1.85;
  color: rgba(255, 255, 255, 0.72);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0;
`;

const HeroCta = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 16px 36px;
  background: #FFFFFF;
  color: #EA3B18;
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  white-space: nowrap;
  flex-shrink: 0;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.18);
  transition: background 0.25s ease, color 0.25s ease,
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;

  .arrow {
    display: inline-block;
    transition: transform 0.3s ease;
  }

  &:hover {
    background: #0D0D0D;
    color: #FFFFFF;
    transform: translateY(-2px);
    box-shadow: 0 14px 40px rgba(0, 0, 0, 0.28);

    .arrow { transform: translateX(4px); }
  }

  &:active { transform: translateY(0); }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 15px 32px;
  }

  @media (max-width: 480px) {
    padding: 14px 24px;
    font-size: 12px;
  }
`;

function Hero() {
  const { openLeadModal } = useModal();

  return (
    <HeroSection id="hero">
      <TopLabel>
        <LabelText>Piligrin | Engenharia de Crescimento</LabelText>
        <LabelLine />
      </TopLabel>

      <MainTitle>
        PARE <br />
        DE IMPROVISAR
      </MainTitle>

      <HeroDivider />

      <BottomRow>
        <HeroDesc>
          Aquisição&nbsp;&nbsp;·&nbsp;&nbsp;
          conversão e escala&nbsp;&nbsp;·&nbsp;&nbsp;
          Construímos o sistema que torna o crescimento previsível
        </HeroDesc>

        <HeroCta onClick={openLeadModal}>
          Agendar Sessão <span className="arrow">→</span>
        </HeroCta>
      </BottomRow>
    </HeroSection>
  );
}

export default Hero;
