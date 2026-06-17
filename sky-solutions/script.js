const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const themeText = document.getElementById('themeText');
const savedTheme = localStorage.getItem('sky-theme');

if (savedTheme) {
  root.setAttribute('data-theme', savedTheme);
  themeText.textContent = savedTheme === 'light' ? 'Claro' : 'Oscuro';
}

themeToggle?.addEventListener('click', () => {
  const current = root.getAttribute('data-theme') || 'dark';
  const next = current === 'dark' ? 'light' : 'dark';
  root.setAttribute('data-theme', next);
  localStorage.setItem('sky-theme', next);
  themeText.textContent = next === 'light' ? 'Claro' : 'Oscuro';
});

const cart = [];
const cartPreview = document.getElementById('cartPreview');
const sampleMessage = document.getElementById('sampleMessage');
const phone = '529991234567';

function renderCart() {
  if (!cart.length) {
    cartPreview.textContent = 'Tu carrito está vacío.';
    return;
  }

  const grouped = cart.reduce((acc, item) => {
    acc[item.name] = acc[item.name] || { ...item, qty: 0 };
    acc[item.name].qty += 1;
    return acc;
  }, {});

  const items = Object.values(grouped);
  const total = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  cartPreview.innerHTML = items.map(item => `${item.qty}x ${item.name} — $${item.price * item.qty}`).join('<br>') + `<br><b>Total: $${total} MXN</b>`;

  sampleMessage.innerHTML = `Hola, quiero hacer un pedido:<br>${items.map(item => `• ${item.qty}x ${item.name} - $${item.price * item.qty}`).join('<br>')}<br><br>Total: $${total} MXN<br>Entrega: En la universidad`;
}

document.querySelectorAll('[data-name][data-price]').forEach(button => {
  button.addEventListener('click', () => {
    cart.push({ name: button.dataset.name, price: Number(button.dataset.price) });
    renderCart();
  });
});

document.getElementById('sendDemoOrder')?.addEventListener('click', () => {
  const message = sampleMessage.innerText.replaceAll('\n', '%0A');
  window.open(`https://wa.me/${phone}?text=${message}`, '_blank');
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));