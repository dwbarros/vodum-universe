let characters = [];

async function constructor() {
    try {
        const response = await fetch('/js/gallery/json/characters.json');

        if (!response.ok) {
            throw new Error(`Failed to fetch characters data (${response.status} ${response.statusText})`);
        }

        const data = await response.json();
        characters = data;

        if (characters) {
            initializeGallery();
        }
    } catch (error) {
        console.error('Erro ao carregar dados do JSON:', error);
    }
}

function initializeGallery() {
    let gallery = document.querySelector('.gallery-list');

    if (!gallery) {
        console.error('Elemento gallery não encontrado');
        return;
    }

    for (let i = 0; i < characters.length; i++) {
        const file = characters[i];
        const index = String(file.name.split('#')[1]).padStart(2, '0');

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = "";
        const figure = document.createElement('figure');
        const img = document.createElement('img');

        if (file && index !== undefined && file.fileType !== undefined) {
            img.src = `/assets/img/collection/${index}.${file.fileType}`;
        } else {
            console.error('Dados de arquivo ausentes ou incompletos:', file);
        }

        let attributesImg = document.createElement('img');
        attributesImg.id = 'atributes';
        console.log('Atributo ID definido para:', attributesImg.id);

        img.setAttribute('data-index', i + 1);
        figure.appendChild(img);
        a.appendChild(figure);
        li.appendChild(a);
        gallery.appendChild(li);
    }
}

constructor();