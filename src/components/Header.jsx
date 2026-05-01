import { useState, useEffect, useCallback } from "react";
import styled, { css } from "styled-components";
import logoBranca from "../assets/logoBranca.png";
import { useModal } from "../context/ModalContext";
import content from "../content";

/* ─── Scroll progress bar ───────────────────────────────────── */

const ProgressBar = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  z-index: 1001;
  pointer-events: none;
`;

const ProgressFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => `${($pct * 100).toFixed(2)}%`};
  background: linear-gradient(90deg, #EA3B18 0%, #3B5B65 55%, #C0F4AB 100%);
  transform-origin: left;
  transition: width 0.1s linear;
`;

/* ─── Nav ───────────────────────────────────────────────────── */

const NavWrap = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  transition: background 0.45s cubic-bezier(0.4, 0, 0.2, 1),
              border-color 0.45s ease;
  border-bottom: 1px solid transparent;

  ${({ $scrolled }) =>
    $scrolled &&
    css`
      background: rgba(13, 13, 13, 0.97);
      backdrop-filter: blur(20px);
      -webkit-backdrop-filter: blur(20px);
      border-color: rgba(255, 255, 255, 0.20);
    `}
`;

const NavInner = styled.div`
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;

  @media (max-width: 768px) {
    padding: 0 24px;
    height: 64px;
  }

  @media (max-width: 480px) {
    padding: 0 16px;
    height: 58px;
  }
`;

const Logo = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  z-index: 2;
  cursor: pointer;

  img {
    height: 40px;
    width: auto;
    transition: opacity 0.2s ease;

    @media (max-width: 480px) {
      height: 22px;
    }
  }

  &:hover img {
    opacity: 0.75;
  }
`;

const NavLinks = styled.div`
  display: flex;
  align-items: center;
  gap: 28px;

  @media (max-width: 1024px) {
    gap: 20px;
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const NavLink = styled.a`
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 500;
  color: ${({ $active }) => ($active ? "#FFFFFF" : "rgba(255, 255, 255, 0.6)")};
  text-decoration: none;
  letter-spacing: 0.03em;
  white-space: nowrap;
  position: relative;
  transition: color 0.25s ease;
  cursor: pointer;

  &::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: ${({ $active }) => ($active ? "100%" : "0")};
    height: 2px;
    background: #EA3B18;
    border-radius: 2px;
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }

  &:hover {
    color: #FFFFFF;

    &::after {
      width: 100%;
    }
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  @media (max-width: 768px) {
    display: none;
  }
`;

const CtaBtn = styled.button`
  font-family: var(--font-primary);
  font-size: 13px;
  font-weight: 600;
  padding: 10px 22px;
  border-radius: 6px;
  cursor: pointer;
  letter-spacing: 0.04em;
  text-transform: uppercase;
  transition: background 0.25s ease, transform 0.25s ease, box-shadow 0.25s ease,
              color 0.25s ease, border-color 0.25s ease;

  ${({ $scrolled }) =>
    $scrolled
      ? css`
          background: #EA3B18;
          color: #FFFFFF;
          border: none;
          box-shadow: 0 4px 16px rgba(234, 59, 24, 0.25);

          &:hover {
            background: #C82D10;
            transform: translateY(-1px);
            box-shadow: 0 6px 22px rgba(234, 59, 24, 0.38);
          }
        `
      : css`
          background: rgba(255, 255, 255, 0.15);
          color: #FFFFFF;
          border: 1.5px solid rgba(255, 255, 255, 0.55);
          backdrop-filter: blur(6px);
          -webkit-backdrop-filter: blur(6px);
          box-shadow: none;

          &:hover {
            background: rgba(255, 255, 255, 0.28);
            border-color: rgba(255, 255, 255, 0.9);
            transform: translateY(-1px);
          }
        `}

  &:active {
    transform: translateY(0);
  }
`;

/* ─── Burger ────────────────────────────────────────────────── */

const Burger = styled.button`
  display: none;
  flex-direction: column;
  gap: 5px;
  padding: 8px;
  background: none;
  border: none;
  cursor: pointer;
  z-index: 2;

  @media (max-width: 768px) {
    display: flex;
  }
`;

const BLine = styled.span`
  display: block;
  width: 22px;
  height: 2px;
  background: #ffffff;
  border-radius: 2px;
  transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.25s;
  will-change: transform;

  ${({ $line, $open }) => {
    if ($line === 1)
      return css`transform: ${$open ? "translateY(7px) rotate(45deg)" : "none"};`;
    if ($line === 2)
      return css`opacity: ${$open ? 0 : 1};`;
    if ($line === 3)
      return css`transform: ${$open ? "translateY(-7px) rotate(-45deg)" : "none"};`;
  }}
`;

/* ─── Mobile overlay ────────────────────────────────────────── */

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  top: 64px;
  background: #0D0D0D;
  z-index: 80;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 36px;
  padding: 40px 24px;
  transform: translateX(${({ $open }) => ($open ? "0" : "100%")});
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  overflow-y: auto;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(234, 59, 24, 0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(234, 59, 24, 0.02) 1px, transparent 1px);
    background-size: 48px 48px;
    pointer-events: none;
  }
`;

const MobLink = styled.a`
  font-family: var(--font-primary);
  font-size: clamp(24px, 5vw, 32px);
  font-weight: 700;
  color: ${({ $active }) => ($active ? "#EA3B18" : "rgba(255, 255, 255, 0.8)")};
  text-decoration: none;
  letter-spacing: -0.01em;
  text-align: center;
  transition: color 0.25s ease, transform 0.25s ease;
  position: relative;
  z-index: 1;
  cursor: pointer;

  &:hover {
    color: #EA3B18;
    transform: translateX(6px);
  }
`;

const MobCta = styled.button`
  font-family: var(--font-primary);
  font-size: 15px;
  font-weight: 700;
  padding: 18px 48px;
  background: #EA3B18;
  color: #FFFFFF;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-top: 8px;
  position: relative;
  z-index: 1;
  box-shadow: 0 8px 24px rgba(234, 59, 24, 0.3);
  transition: background 0.25s ease, transform 0.25s ease;

  &:hover {
    background: #C82D10;
    transform: translateY(-2px);
  }
`;

/* ─── Component ─────────────────────────────────────────────── */

const NAV_HEIGHT = 72;

function Header() {
  const { openLeadModal } = useModal();
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const { navigation } = content;

  const sectionIds = navigation.links.map((l) => l.href.replace("#", ""));

  useEffect(() => {
    const onScroll = () => {
      const top = document.documentElement.scrollTop;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(top > 40);
      setProgress(max > 0 ? top / max : 0);

      /* Active section: last section whose top edge is above the midpoint */
      const threshold = NAV_HEIGHT + 120;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top - threshold <= 0) {
          current = id;
        }
      }
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 768) setMenuOpen(false);
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const SECTION_OFFSETS = {
    hero:    0,
    pilares: 60,
    dores:   60,
    cases:   70,
    oferta:  0,
  };

  const scrollTo = useCallback((href) => {
    const id = href.replace("#", "");
    const el = document.getElementById(id);
    if (!el) return;
    const extra = SECTION_OFFSETS[id] ?? 0;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT + extra;
    window.scrollTo({ top: Math.max(0, top), behavior: "smooth" });
  }, []);

  const handleNavClick = useCallback(
    (e, href) => {
      e.preventDefault();
      scrollTo(href);
    },
    [scrollTo]
  );

  const close = () => setMenuOpen(false);

  return (
    <>
      <ProgressBar>
        <ProgressFill $pct={progress} />
      </ProgressBar>

      <NavWrap $scrolled={scrolled || menuOpen}>
        <NavInner>
          <Logo
            href="#hero"
            onClick={(e) => {
              e.preventDefault();
              close();
              scrollTo("#hero");
            }}
          >
            <img src={logoBranca} alt="Piligrin" />
          </Logo>

          <NavLinks>
            {navigation.links.map((link) => (
              <NavLink
                key={link.href}
                href={link.href}
                $active={activeSection === link.href.replace("#", "")}
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.label}
              </NavLink>
            ))}
          </NavLinks>

          <NavRight>
            <CtaBtn $scrolled={scrolled} onClick={openLeadModal}>
              Agendar Sessão
            </CtaBtn>
          </NavRight>

          <Burger
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
          >
            <BLine $line={1} $open={menuOpen} />
            <BLine $line={2} $open={menuOpen} />
            <BLine $line={3} $open={menuOpen} />
          </Burger>
        </NavInner>
      </NavWrap>

      <MobileOverlay $open={menuOpen}>
        {navigation.links.map((link) => (
          <MobLink
            key={link.href}
            href={link.href}
            $active={activeSection === link.href.replace("#", "")}
            onClick={(e) => {
              e.preventDefault();
              close();
              setTimeout(() => scrollTo(link.href), 320);
            }}
          >
            {link.label}
          </MobLink>
        ))}
        <MobCta
          onClick={() => {
            close();
            openLeadModal();
          }}
        >
          Agendar Sessão
        </MobCta>
      </MobileOverlay>
    </>
  );
}

export default Header;
