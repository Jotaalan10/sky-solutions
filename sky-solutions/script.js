const totalElement = document.getElementById('total');
const quoteWhatsapp = document.getElementById('quoteWhatsapp');
const checkboxes = document.querySelectorAll('#cotizador input[type="checkbox"]');
const phone = '529991234567';

function updateTotal() {
  let total = 0;
  const selected = [];
  checkboxes.forEach((box) => {
    if (box.checked) {
      total += Number(box.value);
      selected.push(box.parentElement.textContent.trim());
    }
  });
  totalElement.textContent = `$${total.toLocaleString('es-MX')} MXN`;
  const message = `Hola, quiero cotizar con Sky Solutions. Me interesa: ${selected.join(', ') || 'una solución digital'}. Estimado: $${total.toLocaleString('es-MX')} MXN`;
  quoteWhatsapp.href = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}

checkboxes.forEach((box) => box.addEventListener('change', updateTotal));
updateTotal();

function demoMessage() {
  const output = document.getElementById('demo-output');
  output.textContent = 'Hola, quiero pedir 1 Brownie clásico ($35) y 1 Gomitas enchiladas ($50). Total: $85 MXN.';
}
