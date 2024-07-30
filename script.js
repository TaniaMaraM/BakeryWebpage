document.addEventListener('DOMContentLoaded', () => {
    const cartIcon = document.getElementById('cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeModal = document.getElementsByClassName('close')[0];
    const cartItems = document.getElementById('cart-items');
    const orderButtons = document.querySelectorAll('.order-button');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.getElementById('total-price');
    let cart = [];
    let totalPrice = 0;

    // Adiciona itens ao carrinho
    orderButtons.forEach(button => {
        button.addEventListener('click', () => {
            const itemSection = button.closest('section'); // Obtém a seção mais próxima que contém o item
            const itemName = itemSection.querySelector('h4, h5').textContent;
            const itemPrice = parseFloat(button.textContent.match(/€(\d+\.\d+)/)[1]);
            const itemImage = itemSection.querySelector('img').src;

            addToCart({ name: itemName, price: itemPrice, image: itemImage });

            // Mostra uma mensagem temporária de adicionado ao carrinho
            button.textContent = 'Added!';
            setTimeout(() => {
                button.textContent = `ADD TO BAG - €${itemPrice.toFixed(2)}`;
            }, 1000);
        });
    });

    cartIcon.addEventListener('click', () => {
        updateCartModal();
        cartModal.style.display = 'block';
    });

    closeModal.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });

    window.addEventListener('click', (event) => {
        if (event.target === cartModal) {
            cartModal.style.display = 'none';
        }
    });

    function addToCart(item) {
        // Verifica se o item já está no carrinho
        const existingItem = cart.find(cartItem => cartItem.name === item.name);

        if (existingItem) {
            // Atualiza a quantidade e o preço total se o item já estiver no carrinho
            existingItem.quantity += 1;
            totalPrice += item.price;
        } else {
            // Adiciona o item ao carrinho com quantidade 1
            item.quantity = 1;
            cart.push(item);
            totalPrice += item.price;
        }

        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function removeFromCart(index) {
        totalPrice -= cart[index].price * cart[index].quantity; // Atualiza o preço total
        cart.splice(index, 1); // Remove o item do array
        updateCartModal(); // Atualiza a visualização do carrinho
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
    }

    function updateCartModal() {
        cartItems.innerHTML = '';
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            const img = document.createElement('img');
            img.src = item.image;
            img.alt = item.name;
            img.style.width = '50px'; // tamanho da imagem
            img.style.height = '50px'; // tamanho da imagem

            const itemName = document.createElement('span');
            itemName.textContent = `${item.name} ${item.quantity}x`; // Formato Nx
            itemName.style.marginLeft = '10px';

            const itemPrice = document.createElement('span');
            itemPrice.textContent = `€${(item.price * item.quantity).toFixed(2)}`;
            itemPrice.style.marginLeft = '10px';

            const deleteBtn = document.createElement('span');
            deleteBtn.textContent = '🗑️'; // Ícone de lixeira
            deleteBtn.className = 'delete-btn';
            deleteBtn.addEventListener('click', () => removeFromCart(index));

            li.appendChild(img);
            li.appendChild(itemName);
            li.appendChild(itemPrice);
            li.appendChild(deleteBtn);
            cartItems.appendChild(li);
        });

        totalPriceElement.textContent = `Total: €${totalPrice.toFixed(2)}`;
    }
});
