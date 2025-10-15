const products = [
  { id: 1, name: "Gelang manik-manik", price: 10000, img: "gelangmanik.jpg", desc: "Gelang manik-manik, cocok untuk hadiah." },
  { id: 2, name: "Jepit anak", price: 15000, img: "jepitlucu.jpg", desc: "Jepit anak lucu cocok untuk anak anak membuat menjadi lebih cantik." },
  { id: 3, name: "Jedai kamboja", price: 10000, img: "jedaikamboja.jpg", desc: "jedai kamboja dengan tampilan cantik dan elegan membuat rambut terikat dengan bagus." },
  { id: 4, name: "Cincin", price: 25000, img: "cincin.jpg", desc: "Cincin  minimalis adjustable." },
];

let cart = {};

function formatRupiah(angka) {
  return "Rp" + angka.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function loadProducts() {
  const list = document.getElementById("product-list");
  products.forEach((p) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `
      <img src="${p.img}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>${p.desc}</p>
      <p><strong>${formatRupiah(p.price)}</strong></p>
      <button onclick="addToCart(${p.id})">Tambah ke Keranjang</button>
    `;
    list.appendChild(card);
  });
}

function addToCart(id) {
  const product = products.find((p) => p.id === id);
  if (!cart[id]) {
    cart[id] = { ...product, qty: 1 };
  } else {
    cart[id].qty++;
  }
  updateCart();
}

function updateCart() {
  const cartItems = document.getElementById("cart-items");
  const totalText = document.getElementById("total");
  cartItems.innerHTML = "";
  let total = 0;
  for (let id in cart) {
    const item = cart[id];
    total += item.price * item.qty;
    cartItems.innerHTML += `<p>${item.name} x${item.qty} = ${formatRupiah(item.price * item.qty)}</p>`;
  }
  totalText.textContent = "Total: " + formatRupiah(total);
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  if (Object.keys(cart).length === 0) {
    alert("Keranjang masih kosong!");
    return;
  }
  const nama = prompt("Masukkan nama Anda:");
  const alamat = prompt("Masukkan alamat pengiriman:");
  const kontak = prompt("Masukkan nomor WhatsApp Anda:");
  const ringkasan = Object.values(cart)
    .map((i) => `${i.name} x${i.qty} (${formatRupiah(i.price * i.qty)})`)
    .join("%0D%0A");
  const total = Object.values(cart).reduce((sum, i) => sum + i.price * i.qty, 0);
  const pesan = `Halo, saya ingin memesan:%0D%0A${ringkasan}%0D%0ATotal: ${formatRupiah(total)}%0D%0ANama: ${nama}%0D%0AAlamat: ${alamat}%0D%0AKontak: ${kontak}`;
  window.location.href = `https://wa.me/6281234567890?text=${pesan}`;
});

loadProducts();
