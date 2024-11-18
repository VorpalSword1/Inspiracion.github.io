document.addEventListener('DOMContentLoaded', function () {
    const musicToggle = document.getElementById('music-toggle');
    const audio = document.getElementById('background-music');
    const popup = document.getElementById('popup');
    const popupMessage = document.getElementById('popup-message');
    const closePopupButton = document.getElementById('close-popup');

    let popupTimeout = null;

    // Función para mostrar el pop-up con el mensaje
    const showPopup = (message) => {
        popupMessage.textContent = message;
        popup.classList.remove('hidden');

        // Limpiar cualquier timeout previo
        if (popupTimeout) {
            clearTimeout(popupTimeout);
        }

        // Cerrar popup después de 5 segundos
        popupTimeout = setTimeout(() => {
            hidePopup();
        }, 5000);
    };

    // Función para ocultar el pop-up
    const hidePopup = () => {
        popup.classList.add('hidden');
        if (popupTimeout) {
            clearTimeout(popupTimeout);
            popupTimeout = null;
        }
    };

    // Añadir eventos de clic a las imágenes (flip ya manejado por CSS)
    const images = document.querySelectorAll('.flip-card');
    images.forEach((card) => {
        card.addEventListener('click', () => {
            const backContent = card.querySelector('.flip-card-back p').textContent;
            showPopup(backContent);
        });
    });

    // Evento de clic para el botón de cierre del pop-up
    if (closePopupButton) {
        closePopupButton.addEventListener('click', hidePopup);
    }

    // Cerrar el pop-up al presionar la tecla Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !popup.classList.contains('hidden')) {
            hidePopup();
        }
    });

    // Función para actualizar el ícono del botón de música
    const updateMusicIcon = () => {
        if (audio.paused) {
            musicToggle.textContent = '🔇'; // Icono de sonido apagado
        } else {
            musicToggle.textContent = '🔊'; // Icono de sonido encendido
        }
    };

    // Evento de clic para el botón de control de música
    if (musicToggle) {
        musicToggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play().catch(() => {
                    console.log('Reproducción automática bloqueada por el navegador.');
                });
            } else {
                audio.pause();
            }
            updateMusicIcon();
        });
    }

    // Intentar reproducir música automáticamente al interactuar
    document.body.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(() => {
                console.log('Reproducción automática bloqueada por el navegador.');
            });
            updateMusicIcon();
        }
    }, { once: true });

    // Actualizar el ícono cuando la música se pausa o se reproduce
    audio.addEventListener('play', updateMusicIcon);
    audio.addEventListener('pause', updateMusicIcon);

    // Inicializar el ícono de música
    updateMusicIcon();
});
