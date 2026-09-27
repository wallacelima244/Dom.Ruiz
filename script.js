// Ativa animações só quando o JS realmente carregou
document.documentElement.classList.add("js");

// ====== CONFIG ======
const WHATS_NUMBER = "5511957704065";
const INSTAGRAM_URL = "https://www.instagram.com/barbeariadomruiz";
const AGENDA_URL = "https://chat.inbarberapp.com/Agendadomruiz";

// ====== WhatsApp ======
function makeWhatsMessage({ service, price, time }) {
  const header = "Olá! Vim pelo site da Barbearia Dom Ruiz e quero agendar.";
  const line1 = service ? `\n\nServiço: ${service}` : "";
  const line2 = price ? `\nValor: ${price}` : "";
  const line3 = time ? `\nDuração: ${time}` : "";
  const line4 = "\n\nPreferência de dia/horário: ";
  const end = "\n\nObrigado!";
  return `${header}${line1}${line2}${line3}${line4}${end}`.trim();
}

function openWhats(message) {
  const url = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, "_blank");
}

// ====== Menu mobile ======
const btn = document.querySelector(".menuBtn");
const mobile = document.getElementById("mobileNav");

function toggleMobile() {
  if (!mobile || !btn) return;
  const open = mobile.classList.toggle("open");
  btn.setAttribute("aria-expanded", open ? "true" : "false");
  mobile.setAttribute("aria-hidden", open ? "false" : "true");
}

if (btn) btn.addEventListener("click", toggleMobile);

if (mobile) {
  mobile.addEventListener("click", (e) => {
    if (e.target.tagName === "A") mobile.classList.remove("open");
  });
}

// ====== Clique nos serviços => WhatsApp ======
document.querySelectorAll(".serviceCard").forEach((card) => {
  card.addEventListener("click", () => {
    const service = card.dataset.service || "";
    const price = card.dataset.price || "";
    const time = card.dataset.time || "";
    openWhats(makeWhatsMessage({ service, price, time }));
  });
});

// ====== Form => WhatsApp ======
const form = document.getElementById("form");
if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const nome = form.nome.value.trim();
    const servico = form.servico.value.trim();
    const msg = form.mensagem.value.trim();

    const texto = `
Olá! Vim pelo site da Barbearia Dom Ruiz e quero agendar.

Nome: ${nome}
Serviço: ${servico || "Não informado"}
Mensagem: ${msg}

Obrigado!
    `.trim();

    openWhats(texto);
  });
}

// ====== Links rápidos (se você quiser usar ids depois) ======
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

// ====== Reveal animations ======
const reveals = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);
reveals.forEach((el) => observer.observe(el));
