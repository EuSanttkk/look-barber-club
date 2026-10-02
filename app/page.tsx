"use client";

import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUp, Check, ChevronDown, Mail, MapPin, Menu, Phone, X } from "lucide-react";
import { barberShop, galleryItems, serviceSlots, type GalleryItem } from "./data";

const navItems = [["Início", "inicio"], ["A Look", "a-look"], ["Nosso Trabalho", "trabalho"], ["Serviços", "servicos"], ["Equipe", "equipe"], ["Localização", "localizacao"]] as const;

function Brand({ compact = false }: { compact?: boolean }) {
  return <a href="#inicio" className="brand" aria-label="Look Barber Club — início"><span className="brand-mark">L</span><span className="brand-words"><b>LOOK</b>{!compact && <small>BARBER CLUB</small>}</span></a>;
}

function BookingLink({ className = "", label = "AGENDE JÁ" }: { className?: string; label?: string }) {
  return <a className={`button button-primary ${className}`} href={barberShop.bookingUrl} target="_blank" rel="noopener noreferrer"><span>{label}</span><ArrowRight aria-hidden="true" size={17} strokeWidth={1.8} /></a>;
}

function PhotoPlaceholder({ item, index }: { item?: GalleryItem; index?: number }) {
  return <div className="photo-placeholder" aria-label="Espaço reservado para fotografia real da Look Barber Club"><span className="photo-index">{String(index ?? item?.id ?? 1).padStart(2, "0")}</span><div><small>FOTO REAL</small><strong>{item?.title ?? "Look Barber Club"}</strong><span>Adicionar arquivo em alta resolução</span></div><i aria-hidden="true" /></div>;
}

function Reveal({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`reveal ${className}`}>{children}</div>;
}

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [filter, setFilter] = useState("Todos");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const filteredItems = useMemo(() => filter === "Todos" ? galleryItems : galleryItems.filter((item) => item.category === filter), [filter]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    onScroll(); window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [filter]);

  useEffect(() => {
    if (lightbox === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightbox(null);
      if (event.key === "ArrowRight") setLightbox((lightbox + 1) % filteredItems.length);
      if (event.key === "ArrowLeft") setLightbox((lightbox - 1 + filteredItems.length) % filteredItems.length);
    };
    document.body.style.overflow = "hidden"; window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = ""; window.removeEventListener("keydown", onKey); };
  }, [lightbox, filteredItems.length]);

  return <main>
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner"><Brand /><nav className="desktop-nav" aria-label="Navegação principal">{navItems.map(([label, id]) => <a key={id} href={`#${id}`}>{label}</a>)}</nav><div className="header-actions"><BookingLink className="header-cta" /><button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menu" aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button></div></div>
      <div className={`mobile-menu ${menuOpen ? "is-open" : ""}`}>{navItems.map(([label, id], index) => <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}><span>{String(index + 1).padStart(2, "0")}</span>{label}</a>)}</div>
    </header>

    <section id="inicio" className="hero">
      <div className="hero-photo"><PhotoPlaceholder index={1} /></div><div className="hero-vignette" />
      <div className="container hero-content"><p className="eyebrow hero-kicker">BARBEARIA EM MACEIÓ <span>ALAGOAS</span></p><h1><span>LOOK</span><br />BARBER CLUB</h1><div className="hero-bottom"><div><p className="hero-line">Seu estilo começa aqui.</p><p className="hero-copy">Um ambiente único para cuidar do seu visual.</p></div><div className="hero-buttons"><BookingLink /><a className="button button-ghost" href="#a-look">CONHEÇA A LOOK</a></div></div></div>
      <a href="#a-look" className="scroll-cue" aria-label="Rolar para conhecer a Look"><span>DESCUBRA</span><ChevronDown size={18} /></a>
    </section>

    <section id="a-look" className="section about-section"><div className="container about-grid"><Reveal className="about-copy"><p className="eyebrow">01 / A LOOK</p><h2>MAIS QUE<br />UM CORTE<span className="gold-dot">.</span></h2><p>Um ambiente pensado para você cuidar do seu estilo, relaxar e viver uma experiência diferente.</p><div className="micro-rule"><span /> LOOK BARBER CLUB — MACEIÓ</div></Reveal><Reveal className="about-photo-wrap"><div className="about-photo"><PhotoPlaceholder index={2} /></div><span className="frame-label">AMBIENTE / DETALHES / EXPERIÊNCIA</span></Reveal></div></section>

    <section id="trabalho" className="section work-section"><div className="container"><Reveal className="section-heading split-heading"><div><p className="eyebrow">02 / PORTFÓLIO</p><h2>NOSSO<br />TRABALHO</h2></div><p>Cada detalhe faz parte do resultado.</p></Reveal><div className="filters" role="group" aria-label="Filtrar galeria">{["Todos", "Cortes", "Barba", "Ambiente", "Equipe"].map((category) => <button key={category} className={filter === category ? "active" : ""} onClick={() => setFilter(category)}>{category}</button>)}</div><div className="gallery-grid">{filteredItems.map((item, index) => <button key={item.id} className={`gallery-item ratio-${item.ratio} reveal`} onClick={() => setLightbox(index)} aria-label={`Ampliar: ${item.title}`}>{item.src ? <img src={item.src} alt={item.title} loading="lazy" /> : <PhotoPlaceholder item={item} />}<span className="gallery-meta"><b>{item.title}</b><small>{item.category}</small></span></button>)}</div><p className="media-note">As fotografias reais da Look Barber Club serão adicionadas aqui sem alterar o layout.</p></div></section>

    <section id="servicos" className="section services-section"><div className="container"><Reveal className="section-heading"><p className="eyebrow">03 / SERVIÇOS</p><h2>SEUS CUIDADOS,<br /><em>DO SEU JEITO.</em></h2></Reveal><div className="service-list">{serviceSlots.map((service, index) => <Reveal className="service-row" key={service.name}><span>{String(index + 1).padStart(2, "0")}</span><h3>{service.name}</h3><p>{service.description}</p><Check aria-hidden="true" /></Reveal>)}</div><div className="services-footer"><p>Valores, duração e disponibilidade atualizados estão no AppBarber.</p><BookingLink label="VER OPÇÕES E AGENDAR" /></div></div></section>

    <section className="experience-section" aria-label="Experiência Look"><div className="experience-photo"><PhotoPlaceholder index={3} /></div><div className="experience-overlay" /><div className="container experience-copy"><p>SEU MOMENTO.</p><p>SEU ESTILO.</p><p>SEU ESPAÇO.</p><span>LOOK BARBER CLUB</span></div></section>

    <section id="equipe" className="section team-section"><div className="container team-grid"><Reveal><p className="eyebrow">04 / EQUIPE</p><h2>QUEM FAZ<br />A LOOK</h2></Reveal><Reveal className="team-placeholder"><span className="team-number">+</span><div><h3>Perfis em preparação</h3><p>Este espaço está pronto para receber as fotos, nomes, especialidades e perfis reais dos profissionais.</p></div></Reveal></div></section>

    <section className="principles-section"><div className="container principles-grid">{["Ambiente único", "Trabalho em detalhes", "Experiência completa", "Atendimento"].map((item, index) => <Reveal className="principle" key={item}><span>{String(index + 1).padStart(2, "0")}</span><p>{item}</p></Reveal>)}</div></section>

    <section className="section social-proof-section"><div className="container two-column"><Reveal><p className="eyebrow">05 / AVALIAÇÕES</p><h2>A EXPERIÊNCIA<br />DE QUEM PASSA<br />POR AQUI.</h2></Reveal><Reveal className="reviews-placeholder"><p>Veja as avaliações da Look Barber Club</p><span>O link público de avaliações poderá ser adicionado aqui quando estiver disponível.</span></Reveal></div></section>

    <section className="section instagram-section"><div className="container"><Reveal className="instagram-head"><div><p className="eyebrow">06 / INSTAGRAM</p><h2>SIGA A LOOK</h2><p>{barberShop.instagramHandle}</p></div><a className="button button-outline" href={barberShop.instagramUrl} target="_blank" rel="noopener noreferrer"><span aria-hidden="true">@</span> VER INSTAGRAM</a></Reveal><div className="instagram-grid">{[4, 5, 6].map((index) => <Reveal key={index} className="instagram-tile"><PhotoPlaceholder index={index} /></Reveal>)}</div></div></section>

    <section id="localizacao" className="section location-section"><div className="container location-grid"><Reveal className="location-intro"><p className="eyebrow">07 / LOCALIZAÇÃO</p><h2>ENCONTRE<br />A LOOK<span className="wine-dot">.</span></h2><a className="button button-primary" href={barberShop.mapsUrl} target="_blank" rel="noopener noreferrer"><span>COMO CHEGAR</span><MapPin size={17} /></a></Reveal><Reveal className="contact-panel"><div className="contact-block"><MapPin /><div><small>ENDEREÇO</small><p>{barberShop.address}<br />{barberShop.city}<br />CEP {barberShop.postalCode}</p></div></div><div className="contact-block"><span className="contact-symbol">⌚</span><div><small>HORÁRIO</small>{barberShop.hours.map((hour) => <p key={hour.days}><b>{hour.days}</b><br />{hour.time}</p>)}</div></div><div className="contact-links"><a href={barberShop.phoneHref}><Phone size={17} />{barberShop.phone}</a><a href={`mailto:${barberShop.email}`}><Mail size={17} />{barberShop.email}</a></div></Reveal></div></section>

    <section className="final-cta"><div className="final-cta-line" aria-hidden="true">LOOK • LOOK • LOOK • LOOK</div><div className="container final-cta-inner"><p className="eyebrow">PRONTO PARA A PRÓXIMA?</p><h2>SEU PRÓXIMO CORTE<br />COMEÇA <em>AQUI.</em></h2><p>Escolha seu horário e venha viver a experiência Look Barber Club.</p><BookingLink /></div></section>

    <footer><div className="container footer-grid"><Brand /><div className="footer-links"><a href={barberShop.instagramUrl} target="_blank" rel="noopener noreferrer">Instagram</a><a href={barberShop.bookingUrl} target="_blank" rel="noopener noreferrer">Agendamento</a><a href={barberShop.mapsUrl} target="_blank" rel="noopener noreferrer">Localização</a><a href={barberShop.phoneHref}>Telefone</a></div><div className="footer-address"><p>{barberShop.address}<br />{barberShop.city}</p><p>{barberShop.phone}<br />{barberShop.email}</p></div></div><div className="container footer-bottom"><span>© 2026 Look Barber Club. Todos os direitos reservados.</span><a href="#inicio">VOLTAR AO TOPO <ArrowUp size={15} /></a></div></footer>

    {lightbox !== null && filteredItems[lightbox] && <div className="lightbox" role="dialog" aria-modal="true" aria-label="Visualização da galeria"><button className="lightbox-close" onClick={() => setLightbox(null)} aria-label="Fechar"><X /></button><button className="lightbox-nav prev" onClick={() => setLightbox((lightbox - 1 + filteredItems.length) % filteredItems.length)} aria-label="Imagem anterior"><ArrowLeft /></button><div className="lightbox-content">{filteredItems[lightbox].src ? <img src={filteredItems[lightbox].src!} alt={filteredItems[lightbox].title} /> : <PhotoPlaceholder item={filteredItems[lightbox]} />}<p>{filteredItems[lightbox].title} <span>{lightbox + 1} / {filteredItems.length}</span></p></div><button className="lightbox-nav next" onClick={() => setLightbox((lightbox + 1) % filteredItems.length)} aria-label="Próxima imagem"><ArrowRight /></button></div>}
  </main>;
}
