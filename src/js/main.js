// Gerekli kütüphaneleri ve stilleri import et
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// DOM Öğeleri
const searchForm = document.querySelector('#search-form');
const galleryContainer = document.querySelector('.gallery');
const loader = document.querySelector('.loader');

// Pixabay API Ayarları
const API_KEY = '32475203-0397f154fda8b2c2a6bae1f0a'; // <-- BURAYA KENDİ API ANAHTARINIZI GİRİN
const BASE_URL = 'https://pixabay.com/api/';

// SimpleLightbox Başlatma
// Galerideki 'a' etiketlerini hedefler.
// 'captionsData' ile alt etiketini açıklama olarak kullanır.
const lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Arama Formu Gönderme Olayı
searchForm.addEventListener('submit', onSearchSubmit);

async function onSearchSubmit(event) {
  event.preventDefault();
  event.stopPropagation();
  const form = event.currentTarget;
  const searchQuery = form.elements.searchQuery.value.trim();

  if (searchQuery === '') {
    iziToast.error({
      title: 'Hata',
      message: 'Arama kutusu boş olamaz!',
      position: 'topRight',
    });
    return;
  }

  // Yeni arama öncesi galeriyi temizle ve yükleyiciyi göster
  galleryContainer.innerHTML = '';
  showLoader();

  try {
    const data = await fetchImages(searchQuery);

    if (data.hits.length === 0) {
      // Sonuç bulunamadıysa bildirim göster
      iziToast.info({
        title: 'Bilgi',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      // Sonuç bulunduysa galeriyi oluştur
      renderGallery(data.hits);
      // SimpleLightbox'ı yeni eklenen öğeler için yenile
      lightbox.refresh();
    }
  } catch (error) {
    // API veya ağ hatası durumunda bildirim göster
    iziToast.error({
      title: 'Hata',
      message: `Bir hata oluştu: ${error.message}`,
      position: 'topRight',
    });
    console.error('Fetch Error:', error);
  } finally {
    // Arama tamamlandığında yükleyiciyi gizle
    hideLoader();
    form.reset(); // Formu temizle
  }
}

/**
 * Pixabay API'den görselleri çeker.
 * @param {string} query - Kullanıcının arama terimi.
 * @returns {Promise<object>} - API'den dönen veri.
 */
async function fetchImages(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
  });

  const response = await fetch(`${BASE_URL}?${params}`);

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

/**
 * Gelen görsel verisine göre galeri kartlarını oluşturur ve DOM'a ekler.
 * @param {Array} images - Görsel nesnelerinin dizisi (data.hits).
 */
function renderGallery(images) {
  const markup = images
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
        <li class="gallery-item">
          <a class="gallery-link" href="${largeImageURL}">
            <img
              class="gallery-image"
              src="${webformatURL}"
              alt="${tags}"
              loading="lazy"
            />
          </a>
          <div class="info">
            <p class="info-item"><b>Beğeni</b> ${likes}</p>
            <p class="info-item"><b>Görüntüleme</b> ${views}</p>
            <p class="info-item"><b>Yorum</b> ${comments}</p>
            <p class="info-item"><b>İndirme</b> ${downloads}</p>
          </div>
        </li>
      `;
      }
    )
    .join(''); // Tüm kartları tek bir string haline getir

  // Tüm kartları tek bir DOM işlemiyle galeriye ekle
  galleryContainer.innerHTML = markup;
}

// Yükleyici (Loader) Fonksiyonları
function showLoader() {
  loader.classList.remove('hidden');
}

function hideLoader() {
  loader.classList.add('hidden');
}