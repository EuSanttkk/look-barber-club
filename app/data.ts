export const barberShop = {
  name: "Look Barber Club",
  shortName: "LOOK",
  city: "Maceió - AL",
  address: "Av. Dona Constança de Góes Monteiro, 1174 D",
  neighborhood: "Mangabeiras / Jatiúca",
  postalCode: "57036-371",
  phone: "(82) 3025-6277",
  phoneHref: "tel:+558230256277",
  email: "lookbarberclub@gmail.com",
  instagramHandle: "@lookbarberclub",
  instagramUrl: "https://www.instagram.com/lookbarberclub/",
  bookingUrl: "https://sites.appbarber.com.br/lookbarberclub-y8at",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=Av.%20Dona%20Constan%C3%A7a%20de%20G%C3%B3es%20Monteiro%2C%201174%20D%2C%20Macei%C3%B3%20-%20AL%2C%2057036-371",
  reviewsUrl: "https://www.google.com/maps/search/?api=1&query=Look%20Barber%20Club%2C%20Av.%20Dona%20Constan%C3%A7a%20de%20G%C3%B3es%20Monteiro%2C%201174%20D%2C%20Macei%C3%B3%20-%20AL%2C%2057036-371",
  hours: [
    { days: "Segunda a sábado", time: "09:00 — 19:00" },
    { days: "Domingo", time: "Fechado" },
  ],
} as const;

export const serviceSlots = [
  { name: "Corte", description: "Opções e disponibilidade no agendamento." },
  { name: "Barba", description: "Opções e disponibilidade no agendamento." },
  { name: "Corte + Barba", description: "Opções e disponibilidade no agendamento." },
  { name: "Cuidados masculinos", description: "Consulte as opções disponíveis." },
] as const;

// Avaliações públicas conferidas em outubro de 2026 na fonte abaixo, que
// identifica a empresa pelo nome, endereço e telefone. A fonte não expõe a
// nota individual de cada comentário; por isso o site não atribui estrelas.
export const publicReviews = {
  sourceUrl: "https://avaliacoesbrasil.com/barbearia/maceio/look-barber-club-barbearia/",
  reviewCount: 51,
  commentCount: 40,
  items: [
    { author: "L. N.", text: "Atendimento excelente, ambiente descontraído. A melhor barbearia em Maceió." },
    { author: "j. l.", text: "Ótimo ambiente, serviço excepcional... Estão de parabéns!" },
    { author: "M. B.", text: "Incrível!! Atendimento excelente, profissionais super qualificados." },
    { author: "L. C.", text: "Lugar incrível!" },
  ],
} as const;
