"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ArrowRight, ArrowUp, Check, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { barberShop, publicReviews, serviceSlots } from "./data";

const navItems = [["Início", "inicio"], ["A Look", "a-look"], ["Serviços", "servicos"], ["Experiência", "experiencia"], ["Instagram", "instagram"], ["Localização", "localizacao"]] as const;

function Logo({ footer = false }: { footer?: boolean }) {
  return <a href="#inicio" className={`brand ${footer ? "brand-footer" : ""}`} aria-label="Look Barber Club — início"><Image src="/logo-look.jpg" alt="Look Barber Club" width={520} height={517} priority={!footer} /></a>;
}

function BookingLink({ className = "", label = "AGENDE JÁ" }: { className?: string; label?: string }) {
  return <a className={`button button-primary ${className}`} href={barberShop.bookingUrl} target="_blank" rel="noopener noreferrer"><span>{label}</span><ArrowRight aria-hidden="true" size={17} /></a>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, []);

  return <main>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner"><Logo /><nav className="desktop-nav" aria-label="Navegação principal">{navItems.map(([label,id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="header-actions"><BookingLink className="header-cta" /><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div></div>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>{navItems.map(([label,id],index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>{String(index+1).padStart(2,"0")}</span>{label}</a>)}</div>
    </header>

    <section id="inicio" className="hero">
      <div className="orbit orbit-a" /><div className="orbit orbit-b" /><div className="hero-slab" /><span className="hero-number">01</span>
      <div className="container hero-grid">
        <div className="hero-copy-block"><p className="eyebrow hero-kicker">BARBEARIA EM MACEIÓ <span>ALAGOAS</span></p><h1><span>LOOK</span><br />BARBER CLUB</h1><p className="hero-line">Seu estilo começa aqui.</p><p className="hero-copy">Um ambiente único para cuidar do seu visual.</p><div className="hero-buttons"><BookingLink /><a className="button button-ghost" href="#a-look">CONHEÇA A LOOK</a></div></div>
        <div className="hero-logo"><div className="logo-halo" /><Image src="/logo-look.jpg" alt="Logo oficial Look Barber Club" width={520} height={517} priority /></div>
      </div>
      <a href="#a-look" className="scroll-cue" aria-label="Rolar para conhecer a Look"><span>DESCUBRA</span><ChevronDown size={18} /></a>
    </section>

    <section id="a-look" className="section about-section"><div className="container about-grid"><Reveal className="about-copy"><p className="eyebrow">01 / A LOOK</p><h2>MAIS QUE<br />UM CORTE<span className="gold-dot">.</span></h2><p>Um ambiente pensado para você cuidar do seu estilo, relaxar e viver uma experiência diferente.</p><div className="micro-rule"><span /> LOOK BARBER CLUB — MACEIÓ</div></Reveal><Reveal className="identity-panel"><div className="identity-ring ring-one" /><div className="identity-ring ring-two" /><Image src="/logo-look.jpg" alt="Logo oficial da Look Barber Club" width={520} height={517} /><span>IDENTIDADE / ESTILO / EXPERIÊNCIA</span></Reveal></div></section>

    <section id="servicos" className="section services-section"><div className="container"><Reveal className="section-heading"><p className="eyebrow">02 / SERVIÇOS</p><h2>SEUS CUIDADOS,<br /><em>DO SEU JEITO.</em></h2></Reveal><div className="service-list">{serviceSlots.map((service,index) => <Reveal className="service-row" key={service.name}><span>{String(index+1).padStart(2,"0")}</span><h3>{service.name}</h3><p>{service.description}</p><Check aria-hidden="true" /></Reveal>)}</div><div className="services-footer"><p>Consulte as opções e a disponibilidade atual no AppBarber.</p><BookingLink /></div></div></section>

    <section id="experiencia" className="experience-section"><div className="experience-rings"><i /><i /><i /></div><div className="container experience-copy"><p>SEU MOMENTO.</p><p>SEU ESTILO.</p><p>SEU ESPAÇO.</p><span>LOOK BARBER CLUB</span></div></section>

    <section className="principles-section"><div className="container principles-intro"><Reveal><p className="eyebrow">03 / A EXPERIÊNCIA</p><h2>DO SEU<br />JEITO<span className="wine-dot">.</span></h2></Reveal><p>Um espaço pensado em cada detalhe para o seu momento.</p></div><div className="container principles-grid">{["Ambiente único", "Trabalho em detalhes", "Experiência completa", "Atendimento"].map((item,index) => <Reveal className="principle" key={item}><span>{String(index+1).padStart(2,"0")}</span><p>{item}</p></Reveal>)}</div></section>

    <section id="avaliacoes" className="section social-proof-section">
      <div className="container reviews-head">
        <Reveal>
          <p className="eyebrow">04 / AVALIAÇÕES</p>
          <h2>O QUE OS<br />CLIENTES <em>DIZEM.</em></h2>
        </Reveal>
        <Reveal className="review-counts" aria-label={`${publicReviews.reviewCount} avaliações e ${publicReviews.commentCount} comentários públicos`}>
          <strong>{publicReviews.reviewCount}</strong><span>avaliações<br />públicas</span>
          <i />
          <strong>{publicReviews.commentCount}</strong><span>comentários<br />publicados</span>
        </Reveal>
      </div>
      <div className="container reviews-grid">
        {publicReviews.items.map((review, index) => <Reveal className="review-card" key={`${review.author}-${index}`}>
          <div className="review-top"><span>“</span><small>{String(index + 1).padStart(2, "0")}</small></div>
          <blockquote>{review.text}</blockquote>
          <p>{review.author}</p>
        </Reveal>)}
      </div>
      <div className="container reviews-footer">
        <p>Trechos de avaliações públicas. A fonte consultada não informa a nota individual de cada comentário.</p>
        <div>
          <a className="source-link" href={publicReviews.sourceUrl} target="_blank" rel="noopener noreferrer">CONSULTAR FONTE</a>
          <a className="button button-review" href={barberShop.reviewsUrl} target="_blank" rel="noopener noreferrer">VER TODAS AS AVALIAÇÕES <ArrowRight size={17} /></a>
        </div>
      </div>
    </section>

    <section id="instagram" className="section instagram-section"><div className="container instagram-grid"><Reveal className="instagram-copy"><p className="eyebrow">05 / INSTAGRAM</p><h2>SIGA<br />A LOOK</h2><p>{barberShop.instagramHandle}</p><a className="button button-outline" href={barberShop.instagramUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">@</span> VER INSTAGRAM</a></Reveal><Reveal className="instagram-art"><div className="insta-word">LOOK</div><Image src="/logo-look.jpg" alt="Look Barber Club no Instagram" width={520} height={517} /><span>ACOMPANHE A LOOK</span></Reveal></div></section>

    <section id="localizacao" className="section location-section"><div className="container location-grid"><Reveal className="location-intro"><p className="eyebrow">06 / LOCALIZAÇÃO</p><h2>ENCONTRE<br />A LOOK<span className="wine-dot">.</span></h2><a className="button button-primary" href={barberShop.mapsUrl} target="_blank" rel="noopener noreferrer"><span>COMO CHEGAR</span><MapPin size={17} /></a></Reveal><Reveal className="contact-panel"><div className="contact-block"><MapPin /><div><small>ENDEREÇO</small><p>{barberShop.address}<br />{barberShop.city}<br />CEP {barberShop.postalCode}</p></div></div><div className="contact-block"><span className="contact-symbol">09</span><div><small>HORÁRIO</small>{barberShop.hours.map((hour) => <p key={hour.days}><b>{hour.days}</b><br />{hour.time}</p>)}</div></div><div className="contact-links"><a href={barberShop.phoneHref}><Phone size={17} />{barberShop.phone}</a><a href={`mailto:${barberShop.email}`}><Mail size={17} />{barberShop.email}</a></div></Reveal></div></section>

    <section className="final-cta"><div className="final-cta-line" aria-hidden="true">LOOK • LOOK • LOOK • LOOK</div><div className="container final-cta-inner"><p className="eyebrow">PRONTO PARA A PRÓXIMA?</p><h2>SEU PRÓXIMO CORTE<br />COMEÇA <em>AQUI.</em></h2><p>Escolha seu horário e venha viver a experiência Look Barber Club.</p><BookingLink /></div></section>

    <footer><div className="container footer-grid"><Logo footer /><div className="footer-links"><a href={barberShop.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a><a href={barberShop.bookingUrl} target="_blank" rel="noopener noreferrer">Agendamento</a><a href={barberShop.mapsUrl} target="_blank" rel="noopener noreferrer">Localização</a><a href={barberShop.phoneHref}>Telefone</a></div><div className="footer-address"><p>{barberShop.address}<br />{barberShop.city}</p><p>{barberShop.phone}<br />{barberShop.email}</p></div></div><div className="container footer-bottom"><span>© 2026 Look Barber Club. Todos os direitos reservados.</span><a href="#inicio">VOLTAR AO TOPO <ArrowUp size={15} /></a></div></footer>
  </main>;
}
