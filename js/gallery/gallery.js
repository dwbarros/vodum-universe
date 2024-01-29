    let charactersData = [];
    const totalImages = 54;
    const starString = '⭐';
    
    
    // Função para carregar os dados do arquivo JSON de forma assíncrona
    async function constructor() {
        try {
            const response = await fetch('/js/gallery/json/charactersData.json');
            if (!response.ok) {
                throw new Error(`Failed to fetch characters data (${response.status} ${response.statusText})`);
            }
            const data = await response.json();
            charactersData = data;
    
            if (charactersData) {
                initializeGallery();
            }
        } catch (error) {
            console.error('Erro ao carregar dados do JSON:', error);
        }
    }
     
    function initializeGallery() {
        let gallery = document.querySelector('.gallery-list'); // inicializa a variável global ou local

        if (!gallery) {
            console.error('Elemento gallery não encontrado');
            return;
        }
    
        for (let i = 0; i < charactersData.length; i++) {
            const file = charactersData[i];
            const li = document.createElement('li');
            const a = document.createElement('a');
            const figure = document.createElement('figure');
            const img = document.createElement('img');
            const index = String(file.name.split('#')[1]).padStart(2, '0');  // Isso vai pegar o número após o '#' e padronizar com zeros à esquerda
    
            if (file && index !== undefined && file.fileType !== undefined) {
                img.src = `/assets/img/collection/${index}.${file.fileType}`;
            } else {
                console.error('Dados de arquivo ausentes ou incompletos:', file);
            }
            const figcaption = document.createElement('figcaption');
    
            let attributesImg = document.createElement('img');
            attributesImg.id = 'atributes';
            console.log('Atributo ID definido para:', attributesImg.id);
    
            img.setAttribute('data-index', i + 1);
            figcaption.appendChild(attributesImg);
            figure.appendChild(img);
            figure.appendChild(figcaption);
            a.appendChild(figure);
            li.appendChild(a);
            gallery.appendChild(li);
        }
    }
    
    
    
    document.addEventListener('DOMContentLoaded', function () {
    
        // Conteiner para Galeria
        const galleryContainer = document.createElement('div');
        galleryContainer.className = 'gallery-container';
    
        let gallery = document.querySelector('ul.gallery');
        if (!gallery) {
            gallery = document.createElement('ul');
            gallery.className = 'gallery';
            galleryContainer.appendChild(gallery);
        }
        document.body.appendChild(galleryContainer);
    
    
        // Conteiner para Popup
        const popupContainer = document.createElement('div');
        popupContainer.className = 'popup-container';
        function openPopup(event) {
            if (event.target.id === 'atributes') {
                console.log('Função openPopup chamada');
    
                const overlay = document.createElement('div');
                overlay.className = 'overlay';
                document.body.appendChild(overlay);
                overlay.addEventListener('click', closePopup);
    
                const mainImageSrc = event.target.parentElement.previousElementSibling.src;
                currentImageIndex = event.target.parentElement.previousElementSibling.getAttribute('data-index');
                currentImageIndex = parseInt(event.target.parentElement.previousElementSibling.getAttribute('data-index'), 10);
    
                const popup = document.createElement('div');
                popup.className = 'popup';
                currentPopup = popup;
    
                const leftNavButton = document.createElement('div');
                leftNavButton.className = 'nav-button left';
                leftNavButton.innerHTML = '&lt;';
                leftNavButton.addEventListener('click', navigateImages.bind(null, -1));
                popup.appendChild(leftNavButton);
    
                const rightNavButton = document.createElement('div');
                rightNavButton.className = 'nav-button right';
                rightNavButton.innerHTML = '&gt;';
                rightNavButton.addEventListener('click', navigateImages.bind(null, 1));
                popup.appendChild(rightNavButton);
    
    
                const imgContainer = document.createElement('div');
                imgContainer.style.flex = '1';
    
                const img = document.createElement('img');
                img.src = mainImageSrc;
                imgContainer.appendChild(img);
    
    
                const info = document.createElement('div');
                info.className = 'info';
    
    
                const characterInfo = charactersData[currentImageIndex - 1];
                console.log('Índice da imagem atual :', currentImageIndex);
                console.log('Informações do personagem 1:', characterInfo);
    
                const nameElement = document.createElement('p');
                nameElement.id = `character-${characterInfo.name}-name`;
                nameElement.textContent = characterInfo.name;
                info.appendChild(nameElement);
    
                const vodumElement = document.createElement('p');
                const vodumTitle = document.createElement('span');
                const vodumValue = document.createElement('span');
    
                vodumTitle.id = `character-${characterInfo.name}-vodum-title`;
                vodumValue.id = `character-${characterInfo.name}-vodum-value`;
                vodumTitle.textContent = "Vodum: ";
                vodumValue.textContent = characterInfo.vodum;
                vodumElement.appendChild(vodumTitle);
                vodumElement.appendChild(vodumValue);
                info.appendChild(vodumElement);
    
                const intelligenceElement = document.createElement('p');
                const intelligenceTitle = document.createElement('span');
                const intelligenceValue = document.createElement('span');
                intelligenceTitle.className = 'intelligence-title';
                intelligenceValue.className = 'intelligence-value';
                intelligenceTitle.id = `character-${characterInfo.name}-intelligence-title`;
                intelligenceValue.id = `character-${characterInfo.name}-intelligence-value`;
                intelligenceTitle.textContent = "Intelligence: ";
                intelligenceValue.textContent = characterInfo.intelligence;
                intelligenceElement.appendChild(intelligenceTitle);
                intelligenceElement.appendChild(intelligenceValue);
                info.appendChild(intelligenceElement);
                intelligenceTitle.className = 'intelligence-title';
                intelligenceValue.className = 'intelligence-value';
    
    
                const wisdomElement = document.createElement('p');
                const wisdomTitle = document.createElement('span');
                const wisdomValue = document.createElement('span');
                wisdomTitle.className = 'wisdom-title';
                wisdomValue.className = 'wisdom-value';
                wisdomTitle.id = `character-${characterInfo.name}-wisdom-title`;
                wisdomValue.id = `character-${characterInfo.name}-wisdom-value`;
                intelligenceTitle.className = 'intelligence-title';
                intelligenceValue.className = 'intelligence-value';
                wisdomTitle.textContent = "Wisdom: ";
                wisdomValue.textContent = characterInfo.wisdom;
                wisdomElement.appendChild(wisdomTitle);
                wisdomElement.appendChild(wisdomValue);
                info.appendChild(wisdomElement);
    
                const interfacingElement = document.createElement('p');
                const interfacingTitle = document.createElement('span');
                const interfacingValue = document.createElement('span');
                interfacingTitle.className = 'interfacing-title';
                interfacingValue.className = 'interfacing-value';
                interfacingTitle.id = `character-${characterInfo.name}-interfacing-title`;
                interfacingValue.id = `character-${characterInfo.name}-interfacing-value`;
                interfacingTitle.textContent = "Interfacing: ";
                interfacingValue.textContent = characterInfo.interfacing;
                interfacingElement.appendChild(interfacingTitle);
                interfacingElement.appendChild(interfacingValue);
                info.appendChild(interfacingElement);
    
                const mysticPowerElement = document.createElement('p');
                const mysticPowerTitle = document.createElement('span');
                const mysticPowerValue = document.createElement('span');
                mysticPowerTitle.className = 'mysticPower-title';
                mysticPowerValue.className = 'mysticPower-value';
                mysticPowerTitle.id = `character-${characterInfo.name}-mysticPower-title`;
                mysticPowerValue.id = `character-${characterInfo.name}-mysticPower-value`;
                mysticPowerTitle.textContent = "Mystic Power: ";
                mysticPowerValue.textContent = characterInfo.mysticPower;
                mysticPowerElement.appendChild(mysticPowerTitle);
                mysticPowerElement.appendChild(mysticPowerValue);
                info.appendChild(mysticPowerElement);
    
    
                stars = starString.repeat(characterInfo.mysticPowerScore);
                const mysticPowerScoreElement = document.createElement('p');
                const mysticPowerScoreTitle = document.createElement('span');
                const mysticPowerScoreValue = document.createElement('span');
                mysticPowerScoreTitle.className = 'mysticPowerScore-title';
                mysticPowerScoreValue.className = 'mysticPowerScore-value';
                mysticPowerScoreTitle.id = `character-${characterInfo.name}-mysticPowerScore-title`;
                mysticPowerScoreValue.id = `character-${characterInfo.name}-mysticPowerScore-value`;
                mysticPowerScoreTitle.textContent = "Mystic Power Score: ";
                mysticPowerScoreValue.textContent = stars;  // Aqui usamos a string de estrelas
                mysticPowerScoreElement.appendChild(mysticPowerScoreTitle);
                mysticPowerScoreElement.appendChild(mysticPowerScoreValue);
                info.appendChild(mysticPowerScoreElement);
    
                const techPowerElement = document.createElement('p');
                const techPowerTitle = document.createElement('span');
                const techPowerValue = document.createElement('span');
                techPowerTitle.className = 'techPower-title';
                techPowerValue.className = 'techPower-value';
                techPowerTitle.id = `character-${characterInfo.name}-techPower-title`;
                techPowerValue.id = `character-${characterInfo.name}-techPower-value`;
                techPowerTitle.textContent = "Tech Power: ";
                techPowerValue.textContent = characterInfo.techPower;
                techPowerElement.appendChild(techPowerTitle);
                techPowerElement.appendChild(techPowerValue);
                info.appendChild(techPowerElement);
    
    
                stars = starString.repeat(characterInfo.techPowerScore);
                const techPowerScoreElement = document.createElement('p');
                const techPowerScoreTitle = document.createElement('span');
                const techPowerScoreValue = document.createElement('span');
                techPowerScoreTitle.className = 'techPowerScore-title';
                techPowerScoreValue.className = 'techPowerScore-value';
                techPowerScoreTitle.id = `character-${characterInfo.name}-techPowerScore-title`;
                techPowerScoreValue.id = `character-${characterInfo.name}-techPowerScore-value`;
                techPowerScoreTitle.textContent = "Tech Power Score: ";
                techPowerScoreValue.textContent = stars;
                techPowerScoreElement.appendChild(techPowerScoreTitle);
                techPowerScoreElement.appendChild(techPowerScoreValue);
                info.appendChild(techPowerScoreElement);
    
                const poeticNameElement = document.createElement('p');
                const poeticNameTitle = document.createElement('span');
                const poeticNameValue = document.createElement('span');
                poeticNameTitle.className = 'mastery-title';
                poeticNameValue.className = 'mastery-value';
                poeticNameTitle.id = `character-${characterInfo.name}-poeticName-title`;
                poeticNameValue.id = `character-${characterInfo.name}-poeticName-value`;
                poeticNameTitle.textContent = "Mastery: ";
                poeticNameValue.textContent = characterInfo.poeticName;
                poeticNameElement.appendChild(poeticNameTitle);
                poeticNameElement.appendChild(poeticNameValue);
                info.appendChild(poeticNameElement);
    
                const descriptionElement = document.createElement('p');
                const descriptionTitle = document.createElement('span');
                const descriptionValue = document.createElement('span');
                descriptionValue.className = 'description-value';
                descriptionTitle.id = `character-${characterInfo.name}-description-title`;
                descriptionValue.id = `character-${characterInfo.name}-description-value`;
                descriptionTitle.textContent = "";
                descriptionValue.textContent = characterInfo.description;
                descriptionElement.appendChild(descriptionTitle);
                descriptionElement.appendChild(descriptionValue);
                info.appendChild(descriptionElement);
    
                const connectionElement = document.createElement('p');
                const connectionTitle = document.createElement('span');
                const connectionValue = document.createElement('span');
                connectionValue.className = 'connection-value';
                connectionTitle.id = `character-${characterInfo.name}-connection-title`;
                connectionValue.id = `character-${characterInfo.name}-connection-value`;
                connectionTitle.textContent = "";
                connectionValue.textContent = characterInfo.connection;
                connectionElement.appendChild(connectionTitle);
                connectionElement.appendChild(connectionValue);
                info.appendChild(connectionElement);
    
    
                popup.appendChild(imgContainer);
                popup.appendChild(info);
                document.body.appendChild(popup);
                document.body.classList.add('no-scroll');
    
    
            }
    
    
        }
    
        function closePopup() {
            const overlay = document.querySelector('.overlay');
            if (overlay) {
                document.body.removeChild(overlay);
            }
    
            const popup = document.querySelector('.popup');
            if (popup) {
                document.body.removeChild(popup);
            }
            document.body.classList.remove('no-scroll');
    
        }
        let currentImageIndex = 1;
    
    
    
        function navigateImages(direction) {
            if (!currentPopup) return;
    
            currentImageIndex += direction;
    
            if (currentImageIndex < 1) {
                currentImageIndex = totalImages;
            } else if (currentImageIndex > totalImages) {
                currentImageIndex = 1;
            }
    
            const paddedIndex = String(currentImageIndex).padStart(2, '0');
            const fileType = charactersData[currentImageIndex - 1].fileType;
            const newSrc = `Collection/${paddedIndex}.${fileType}`;
    
            const mainImage = currentPopup.querySelector('img');
            mainImage.src = newSrc;
    
            function formatAttribute(attribute) {
                return attribute || "Nothing here";
            }
    
    
            const characterInfo = charactersData[currentImageIndex - 1];
    
            console.log('Informações do personagem 2:', characterInfo);
    
            if (characterInfo) {
                const paragraphs = currentPopup.querySelectorAll('p');
                const attributes = [
                    ` ${formatAttribute(characterInfo.name)}`,
                    `Vodum: ${formatAttribute(characterInfo.vodum)}`,
                    `Intelligence: ${formatAttribute(characterInfo.intelligence)}`,
                    `Wisdom: ${formatAttribute(characterInfo.wisdom)}`,
                    `Interfacing: ${formatAttribute(characterInfo.interfacing)}`,
                    `Mystic Power: ${formatAttribute(characterInfo.mysticPower)}`,
                    `Mystic Power Score: ${formatAttribute(characterInfo.mysticPowerScore)}`,
                    `Tech Power: ${formatAttribute(characterInfo.techPower)}`,
                    `Tech Power Score: ${formatAttribute(characterInfo.techPowerScore)}`,
                    `Mastery: ${formatAttribute(characterInfo.wisdom)}`,
                    ` ${formatAttribute(characterInfo.description)}`,
                    ` ${formatAttribute(characterInfo.connection)}`,
                ];
    
                paragraphs.forEach((p, index) => {
                    if (attributes[index]) {
                        p.textContent = attributes[index];
                    }
                });
            }
    
        }
    
        document.addEventListener('click', function (event) {
            if (event.target.id === 'atributes') {
                openPopup(event);
            }
        });
        document.addEventListener('keydown', function (event) {
            if (event.key === 'ArrowRight') {
                navigateImages(1);
            } else if (event.key === 'ArrowLeft') {
                navigateImages(-1);
            }
        });
    
        document.addEventListener('keydown', function (event) {
            if (event.key === 'Escape') {
                closePopup();
            }
        });
        document.body.appendChild(popupContainer);
    });

    constructor();