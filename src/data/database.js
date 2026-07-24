const users = [];

const products = [
  { id: 1, name: "Nexus Quantum Watch", price: 1299, category: "Wearables", glow: "var(--primary)" },
  { id: 2, name: "AeroPods Pro 2", price: 899, category: "Áudio", glow: "var(--secondary)" },
  { id: 3, name: "Holo Vision Display", price: 4500, category: "Monitores", glow: "#ff007a" },
  { id: 4, name: "Teclado Mecânico Nova", price: 450, category: "Periféricos", glow: "#00f0ff" },
  { id: 5, name: "Nexus PowerBank 20k", price: 299, category: "Acessórios", glow: "var(--primary)" },
  { id: 6, name: "Luminária Smart Aura", price: 199, category: "Casa Inteligente", glow: "var(--secondary)" },
  { id: 7, name: "Mouse Óptico Zenith", price: 350, category: "Periféricos", glow: "#ff007a" },
  { id: 8, name: "Hub USB-C Infinity", price: 220, category: "Acessórios", glow: "#00f0ff" }
];

const offers = [
  { id: 11, name: "Nexus SmartRing Alpha", price: 899, originalPrice: 1499, discount: "-40%", category: "Wearables", glow: "#ff4757" },
  { id: 12, name: "SoundBar Sonic V2", price: 1200, originalPrice: 1600, discount: "-25%", category: "Áudio", glow: "#ffa502" },
  { id: 13, name: "Webcam 4K Iris", price: 399, originalPrice: 599, discount: "-33%", category: "Periféricos", glow: "#ff4757" },
  { id: 14, name: "Mochila Tech Pro", price: 450, originalPrice: 550, discount: "-18%", category: "Acessórios", glow: "#ffa502" }
];

module.exports = { users, products, offers };
