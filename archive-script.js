const form = document.querySelector('form');
      const fileInput = form.querySelector('input[type="file"]');
      const nameInput = form.querySelector('input[type="text"]');
      const textInput = form.querySelector('textarea');
      const gallery = document.getElementById('gallery');

      // Simple custom error popup
      function showError(message) {
        let existing = document.getElementById('errorPopup');
        if (existing) existing.remove();

        const popup = document.createElement('div');
        popup.id = 'errorPopup';
        popup.innerText = message;
        popup.style.position = 'fixed';
        popup.style.bottom = '30px';
        popup.style.left = '50%';
        popup.style.transform = 'translateX(-50%)';
        popup.style.background = '#222';
        popup.style.color = 'white';
        popup.style.padding = '12px 18px';
        popup.style.borderRadius = '999px';
        popup.style.boxShadow = '0 10px 30px rgba(0,0,0,0.2)';
        popup.style.zIndex = '9999';
        popup.style.fontSize = '0.9rem';

        document.body.appendChild(popup);
        setTimeout(() => {
          popup.style.opacity = '0';
          popup.style.transition = 'opacity 0.5s ease';
          setTimeout(() => popup.remove(), 500);
        }, 2500);
      }
// Load saved images from localStorage
      const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
      savedImages.forEach(item => addImageToGallery(item));

      function addImageToGallery(item) {
        const wrapper = document.createElement('div');
        wrapper.className = 'gallery-item';

        const img = document.createElement('img');
        img.src = item.src;
        img.alt = 'Archive Image';

        const overlay = document.createElement('div');
        overlay.className = 'overlay';
        overlay.innerText = item.text;

        wrapper.appendChild(img);
        wrapper.appendChild(overlay);
        gallery.appendChild(wrapper);
      }

      form.addEventListener('submit', function(e) {
        e.preventDefault();
const file = fileInput.files[0];
        const name = nameInput.value.trim();
        const text = textInput.value.trim();

        if (!file || !name || !text) {
          showError('Please complete all fields and upload an image before submitting.');
          return;
        }

        const reader = new FileReader();
        reader.onload = function(event) {
          const imageSrc = event.target.result;

          const existing = JSON.parse(localStorage.getItem('galleryImages')) || [];
          const newItem = { src: imageSrc, text: name + ': ' + text };
          existing.push(newItem);
          localStorage.setItem('galleryImages', JSON.stringify(existing));
addImageToGallery(newItem);
        };

        reader.readAsDataURL(file);
        form.reset();
      });