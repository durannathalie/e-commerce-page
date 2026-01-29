
const btnTop = document.getElementById("btnTop");
if (btnTop) {
    btnTop.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });
}


let cart = JSON.parse(localStorage.getItem("cart")) || [];


document.querySelectorAll(".add-to-cart").forEach(btn => {
    btn.addEventListener("click", () => {
        const name = btn.dataset.name;
        const price = Number(btn.dataset.price);

        const item = cart.find(p => p.name === name);
        if (item) {
            item.qty++;
        } else {
            cart.push({ name, price, qty: 1 });
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Producto agregado al carrito");
    });
});



if (document.getElementById("cartTable")) {
    const tbody = document.getElementById("cartTable");
    const totalSpan = document.getElementById("grandTotal");

    function renderCart() {
        tbody.innerHTML = "";
        let total = 0;

        cart.forEach((p, index) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${p.name}</td>
                <td>$${p.price}</td>
                <td>${p.qty}</td>
                <td>$${p.qty * p.price}</td>
                <td><button class="btn btn-danger btn-sm" data-index="${index}">X</button></td>
            `;

            tbody.appendChild(row);
            total += p.price * p.qty;
        });

        totalSpan.textContent = total.toLocaleString("es-CL");;
        localStorage.setItem("cart", JSON.stringify(cart));
    }

  
    document.addEventListener("click", e => {
        if (e.target.matches(".btn-danger")) {
            const id = e.target.dataset.index;
            cart.splice(id, 1);
            renderCart();
        }
    });

    renderCart();
}
