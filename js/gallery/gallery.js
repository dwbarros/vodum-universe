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
            createAccordion();
            populateAccordionDetails();
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


function createAccordion() {
    const accordionContainer = document.querySelector('.accordion-container');

    if (!accordionContainer) {
        console.error('Elemento .accordion-container não encontrado');
        return;
    }

    const desiredKeys = ["intelligence", "wisdom", "interfacing", "mysticPower", "mysticPowerScore", "techPowerScore"];

    desiredKeys.forEach(key => {
        const button = document.createElement('button');
        button.classList.add('accordion-button');
        button.textContent = key;
        accordionContainer.appendChild(button);

        const panel = document.createElement('div');
        panel.classList.add('accordion-panel');
        const content = document.createElement('div');
        content.classList.add('accordion-content');
        panel.appendChild(content);
        accordionContainer.appendChild(panel);
    });

    toggleAccordion();
}

function populateAccordionDetails() {
    const panels = document.querySelectorAll('.accordion-panel');

    panels.forEach((panel, index) => {
        const content = panel.querySelector('.accordion-content');

        for (const key of Object.keys(characters[index])) {
            if (key === "name" || key === "poeticName" || key === "description" || key === "connection" || key === "fileType") {
                continue;
            }

            const value = characters[index][key];
            const p = document.createElement('p');
            p.textContent = `${key}: ${value}`;
            content.appendChild(p);
        }
    });
}


function toggleAccordion() {
    const accordions = document.querySelectorAll(".accordion-button");

    accordions.forEach((accordion) => {
        accordion.addEventListener("click", () => {
            accordion.classList.toggle("active");
            const panel = accordion.nextElementSibling;
            if (panel.style.maxHeight) {
                panel.style.maxHeight = null;
            } else {
                panel.style.maxHeight = `${panel.scrollHeight}px`;
            }
        });
    });
}

constructor();