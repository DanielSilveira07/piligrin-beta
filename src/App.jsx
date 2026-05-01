import GlobalStyles from "./GlobalStyles";
import "./App.css";
import content from "./content";
import { ModalProvider } from "./context/ModalContext";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Hero from "./components/Hero";
import LeadModal from "./components/LeadModal";
import Offer from "./components/Offer";
import PainPoints from "./components/PainPoints";
import PrivacyPolicy from "./components/PrivacyPolicy";
import Pillars from "./components/Pillars";
import Cases from "./components/Cases";
import Marquee from "./components/Marquee";
import logoHorizontal from "./assets/LogoRoxaHorizontal.png";

function App() {
  const { navigation, footer, privacyPolicy, leadModal } = content;

  return (
    <ModalProvider>
      <GlobalStyles />

      <Header />

      <main>
        <Hero />
        <Marquee />
        <Pillars />
        <PainPoints />
        <Cases />
        <Offer />
      </main>

      <Footer navigation={navigation} footer={footer} />
      <PrivacyPolicy policy={privacyPolicy} />
      <LeadModal
        leadModal={leadModal}
        logoSrc={logoHorizontal}
        logoAlt="Logo Piligrin Marketing"
      />
    </ModalProvider>
  );
}

export default App;
