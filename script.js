// ====== CONFIG (edita aqui em 10s) ======
const WHATS_NUMBER = "5511957704065"; // 55 + DDD + número
const INSTAGRAM_URL = "https://instagram.com/"; // coloca o @ certo depois
const MAPS_URL =
  "https://www.google.com/maps?q=R.%20Cidade%20de%20S%C3%A3o%20Paulo,%20221%20-%20Vila%20Engenho%20Novo,%20Barueri%20-%20SP,%2006415-070";

// Mensagem base
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

// CTA links fixos
function setCtas() {
  const defaultMsg = makeWhatsMessage({});
  const waTargets = [
    "ctaWhatsHero",
    "ctaWhatsCard",
    "ctaWhatsServices",
    "ctaWhatsContact",
    "ctaWhatsAbout",
    "ctaWhatsHeader",
    "waFloat",
  ];

  waTargets.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = `https://wa.me/${WHATS_NUMBER}?text=${encodeURIComponent(defaultMsg)}`;
  });

  const instaTargets = ["ctaInstaCard", "ctaInstaHeader", "ctaInstaLocal", "ctaInstaContact"];
  instaTargets.forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = INSTAGRAM_URL;
  });

  const mapsBtn = document.getElementById("ctaMaps");
  if (mapsBtn) mapsBtn.href = MAPS_URL;

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

setCtas();

// ====== Menu mobile ======
const btn = document.querySelector(".menuBtn");
const mobile = document.getElementById("mobileNav");

function toggleMobile() {
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

// ====== Clique nos serviços => WhatsApp com mensagem pronta ======
document.querySelectorAll(".serviceCard").forEach((card) => {
  const go = () => {
    const service = card.dataset.service || "";
    const price = card.dataset.price || "";
    const time = card.dataset.time || "";
    openWhats(makeWhatsMessage({ service, price, time }));
  };

  card.addEventListener("click", (e) => {
    // se clicou no botão, também agenda
    if (e.target.classList.contains("btnMini")) go();
    else go();
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

// ====== Reveal animations ao rolar ======
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
