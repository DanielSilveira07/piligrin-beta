import { useState, useEffect, useRef } from "react";
import styled, { keyframes } from "styled-components";
import { useModal } from "../context/ModalContext";
import logoHorizontal from "../assets/LogoRoxaHorizontal.png";

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const FooterWrapper = styled.footer`
  background: linear-gradient(180deg, #0D0D0D 0%, #1A1A1A 100%);
  color: #F2F1EB;
  position: relative;
  overflow: hidden;

  /* Grid analítico sutil */
  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image: 
      linear-gradient(rgba(234, 59, 24, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(234, 59, 24, 0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    pointer-events: none;
    opacity: 0.5;
  }
`;

const Container = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  position: relative;
  z-index: 2;

  @media (max-width: 768px) {
    padding: 0 24px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
  }
`;

const Top = styled.div`
  padding: 80px 0 60px;
  display: grid;
  grid-template-columns: 1.2fr 1fr 1fr;
  gap: 60px;
  opacity: ${props => props.$isVisible ? 1 : 0};
  transform: ${props => props.$isVisible ? 'translateY(0)' : 'translateY(20px)'};
  transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
              transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 1024px) {
    grid-template-columns: 1fr 1fr;
    gap: 48px;
    padding: 60px 0 50px;
  }

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 50px 0 40px;
  }

  @media (max-width: 640px) {
    gap: 32px;
    padding: 40px 0 32px;
  }

  @media (max-width: 480px) {
    gap: 24px;
    padding: 32px 0 24px;
  }
`;

const Brand = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  p {
    font-family: var(--font-primary);
    font-size: 16px;
    line-height: 1.6;
    color: rgba(242, 241, 235, 0.7);
    max-width: 320px;
  }

  @media (max-width: 768px) {
    p {
      font-size: 15px;
      max-width: 100%;
    }
  }

  @media (max-width: 480px) {
    gap: 16px;
    p {
      font-size: 13px;
    }
  }
`;

const BrandRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  img {
    width: 400px;
    height: auto;
  }

  a {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    font-family: var(--font-primary);
    font-size: 14px;
    font-weight: 600;
    color: #F2F1EB;
    text-decoration: none;
    transition: all 0.3s ease;
    width: fit-content;
    padding: 8px 16px;
    background: rgba(234, 59, 24, 0.1);
    border: 1px solid rgba(234, 59, 24, 0.3);
    border-radius: 8px;

    svg {
      width: 18px;
      height: 18px;
      fill: currentColor;
      transition: transform 0.3s ease;
    }

    &:hover {
      background: rgba(234, 59, 24, 0.18);
      border-color: rgba(234, 59, 24, 0.7);
      color: #EA3B18;
      transform: translateX(5px);
      box-shadow: 0 4px 16px rgba(234, 59, 24, 0.15);

      svg {
        transform: scale(1.15);
      }
    }
  }

  @media (max-width: 768px) {
    img {
      width: 100px;
    }
  }

  @media (max-width: 480px) {
    img {
      width: 80px;
    }
    gap: 16px;
  }
`;

const NavSection = styled.div`
  h3 {
    font-family: var(--font-primary);
    font-size: 18px;
    font-weight: 700;
    color: #F2F1EB;
    margin-bottom: 24px;
    position: relative;
    padding-bottom: 12px;

    &::after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 0;
      width: 40px;
      height: 2px;
      background: #EA3B18;
    }
  }

  @media (max-width: 768px) {
    h3 {
      font-size: 16px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    h3 {
      font-size: 14px;
      margin-bottom: 16px;
    }
  }
`;

const NavList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const NavItem = styled.li`
  a {
    font-family: var(--font-primary);
    font-size: 15px;
    color: rgba(242, 241, 235, 0.6);
    text-decoration: none;
    transition: color 0.25s ease, transform 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    display: inline-flex;
    align-items: center;
    gap: 8px;
    position: relative;

    /* seta que aparece no hover */
    &::before {
      content: '→';
      font-size: 12px;
      color: #EA3B18;
      opacity: 0;
      transform: translateX(-6px);
      transition: opacity 0.25s ease, transform 0.25s ease;
      flex-shrink: 0;
    }

    /* underline vermelho */
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
      color: #FFFFFF;
      transform: translateX(8px);

      &::before {
        opacity: 1;
        transform: translateX(0);
      }

      &::after {
        width: 100%;
      }
    }
  }

  @media (max-width: 768px) {
    a {
      font-size: 14px;
    }
  }

  @media (max-width: 480px) {
    a {
      font-size: 13px;
    }
  }
`;

const CtaSection = styled.div`
  background: rgba(31, 31, 31, 0.5);
  border: 1px solid rgba(234, 59, 24, 0.2);
  border-radius: 16px;
  padding: 32px;
  position: relative;
  overflow: hidden;
  backdrop-filter: blur(10px);
  transition: border-color 0.35s ease, box-shadow 0.35s ease;

  &:hover {
    border-color: rgba(234, 59, 24, 0.45);
    box-shadow: 0 0 48px rgba(234, 59, 24, 0.07),
                inset 0 0 32px rgba(234, 59, 24, 0.03);
  }

  /* Accent bar no topo */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: #EA3B18;
  }

  h3 {
    font-family: var(--font-primary);
    font-size: 20px;
    font-weight: 700;
    color: #F2F1EB;
    margin-bottom: 12px;
  }

  p {
    font-family: var(--font-primary);
    font-size: 14px;
    line-height: 1.6;
    color: rgba(242, 241, 235, 0.7);
    margin-bottom: 24px;
  }

  @media (max-width: 1024px) {
    grid-column: 1 / -1;
  }

  @media (max-width: 768px) {
    padding: 24px;

    h3 {
      font-size: 18px;
    }

    p {
      font-size: 13px;
      margin-bottom: 20px;
    }
  }

  @media (max-width: 480px) {
    padding: 18px;

    h3 {
      font-size: 16px;
    }

    p {
      font-size: 12px;
      margin-bottom: 16px;
    }
  }
`;

const Button = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 16px 32px;
  background: #EA3B18;
  border: 2px solid #EA3B18;
  border-radius: 8px;
  color: #F2F1EB;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease,
              transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s ease;
  position: relative;
  overflow: hidden;
  box-shadow: 0 4px 16px rgba(234, 59, 24, 0.3);
  width: 100%;
  justify-content: center;

  /* shimmer */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 55%;
    height: 100%;
    background: linear-gradient(
      120deg,
      transparent 0%,
      rgba(255, 255, 255, 0.18) 50%,
      transparent 100%
    );
    transition: left 0.45s ease;
    pointer-events: none;
  }

  &:hover {
    background: #C82D10;
    border-color: #C82D10;
    transform: translateY(-2px);
    box-shadow: 0 10px 28px rgba(234, 59, 24, 0.5),
                0 0 0 3px rgba(234, 59, 24, 0.15);

    &::before {
      left: 160%;
    }
  }

  &:active {
    transform: translateY(0);
    box-shadow: 0 4px 12px rgba(234, 59, 24, 0.35);
  }

  span {
    position: relative;
    z-index: 1;
  }

  @media (max-width: 768px) {
    padding: 14px 28px;
    font-size: 13px;
  }

  @media (max-width: 480px) {
    padding: 12px 20px;
    font-size: 12px;
  }
`;

const InstagramButton = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 15px 32px;
  background: transparent;
  border: 1.5px solid rgba(234, 59, 24, 0.6);
  border-radius: 8px;
  color: #f0623e;
  font-family: var(--font-primary);
  font-size: 14px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: background 0.3s ease, border-color 0.3s ease,
              color 0.3s ease, transform 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              box-shadow 0.3s ease;
  width: 100%;
  justify-content: center;
  text-decoration: none;
  margin-top: 12px;

  &:hover {
    background: rgba(234, 59, 24, 0.1);
    border-color: #EA3B18;
    color: #EA3B18;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(234, 59, 24, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  svg {
    width: 18px;
    height: 18px;
    fill: currentColor;
    transition: transform 0.3s ease;
    flex-shrink: 0;
  }

  &:hover svg {
    transform: scale(1.15) rotate(-5deg);
  }

  @media (max-width: 768px) {
    padding: 13px 28px;
    font-size: 13px;
    margin-top: 10px;
  }

  @media (max-width: 480px) {
    padding: 11px 20px;
    font-size: 12px;
    margin-top: 8px;
  }
`;

const Divider = styled.div`
  height: 1px;
  background: linear-gradient(90deg, 
    transparent 0%, 
    rgba(234, 59, 24, 0.3) 20%, 
    rgba(59, 91, 101, 0.3) 50%, 
    rgba(192, 244, 171, 0.3) 80%, 
    transparent 100%
  );
  margin: 0 auto;
  max-width: 1200px;
`;

const Bottom = styled.div`
  padding: 40px 0;
  text-align: center;
  animation: ${fadeIn} 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s backwards;

  p {
    font-family: var(--font-primary);
    font-size: 14px;
    line-height: 1.8;
    color: rgba(242, 241, 235, 0.5);

    a {
      color: rgba(242, 241, 235, 0.7);
      text-decoration: none;
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
        color: #F2F1EB;

        &::after {
          width: 100%;
        }
      }
    }
  }

  @media (max-width: 768px) {
    padding: 32px 0;

    p {
      font-size: 13px;
    }
  }

  @media (max-width: 480px) {
    padding: 24px 0;

    p {
      font-size: 11px;
      line-height: 1.7;
    }
  }
`;

function Footer({ navigation, footer }) {
  const { openLeadModal } = useModal();
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    if (footerRef.current) {
      observer.observe(footerRef.current);
    }

    return () => {
      if (footerRef.current) {
        observer.unobserve(footerRef.current);
      }
    };
  }, []);

  return (
    <FooterWrapper ref={footerRef}>
      <Container>
        <Top $isVisible={isVisible}>
          <Brand>
            <BrandRow>
              <img
                src={logoHorizontal}
                alt="Logo Piligrin Marketing"
              />
            </BrandRow>
            <p>{footer.description}</p>
          </Brand>

          <NavSection>
            <h3>Navegação</h3>
            <NavList>
              {navigation.links.map((link) => (
                <NavItem key={link.href}>
                  <a href={link.href}>{link.label}</a>
                </NavItem>
              ))}
            </NavList>
          </NavSection>

          <CtaSection>
            <h3>{footer.ctaTitle}</h3>
            <p>{footer.ctaText}</p>
            <Button type="button" onClick={openLeadModal}>
              <span>{footer.ctaButton}</span>
            </Button>
            <InstagramButton
              href={footer.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              Instagram
            </InstagramButton>
          </CtaSection>
        </Top>

        <Divider />

        <Bottom>
          <p>
            {footer.copyright}
            <br />
            <a href="#politica-privacidade">{footer.privacyLinkLabel}</a>
          </p>
        </Bottom>
      </Container>
    </FooterWrapper>
  );
}

export default Footer;
