// Функция для создания баннера продукта
function createBanner(product) {
    const banner = document.createElement('div');

    const periodText = product.product_key === 'mcafee_total_3_1_m' ? '/mo' : '/per year';
    banner.classList.add('main-content__banner');
    banner.innerHTML = `
        <div class="main-content__banner-amount-container">
            ${product.is_best ? '<div class="label-top">Best value</div>' : ''}
            ${product.price_key === '50%' ? '<div class="discount"><img src="icons/50-off.png"/></div>' : ''}
            <div class="main-content__banner-amount-number">
                 <span>$${product.amount}</span>${periodText}
            </div>
        </div>
        <div class="main-content__banner-content">
            <div class="main-content__banner-content-name-prod">${product.name_prod}</div>
            <div class="main-content__banner-content-license-name">${product.license_name}</div>
            <a href="${product.link}" class="main-content__banner-button" data-link="${product.link}">
                <div class="main-content__banner-button-text">Download</div>
                <div class="main-content__banner-button-icon"></div>
            </a>
        </div>
    `;

    return banner;
}

// AJAX-запрос для получения данных
function fetchProducts() {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://veryfast.io/t/front_test_api.php', true);

    xhr.onload = function() {
        if (xhr.status === 200) {
            handleResponse(JSON.parse(xhr.responseText));
        } else {
            console.error('Ошибка загрузки данных:', xhr.statusText);
        }
    };

    xhr.onerror = function() {
        console.error('Произошла ошибка запроса');
    };

    xhr.send();
}

function handleResponse(data) {
    if (data.state === 'ok') {
        const products = data.result.elements;
        console.log(products);
        const bannersContainer = document.getElementById('banners');

        products.forEach(product => {
            const banner = createBanner(product);
            bannersContainer.appendChild(banner);
        });

        addDownloadListeners();
    } else {
        console.error('Ошибка в ответе сервера');
    }
}

// Функция добавления обработчиков событий на кнопки скачивания
function addDownloadListeners() {
    document.querySelectorAll('.main-content__banner-button').forEach(button => {
        button.addEventListener('click', function(event) {
            event.preventDefault();
            const link = this.getAttribute('data-link');
            downloadFile(link);
            showArrow();
        });
    });
}

// Функция для скачивания файла
function downloadFile(link) {
    const a = document.createElement('a');
    a.href = link;
    a.download = '';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Функция для показа анимации стрелки
function showArrow() {
    const arrow = document.getElementById('arrow');
    arrow.style.display = 'flex';
    // setTimeout(() => {
    //     arrow.style.display = 'none';
    // }, 5000);
}

if (typeof document !== 'undefined') {
    document.addEventListener('DOMContentLoaded', fetchProducts);
}
