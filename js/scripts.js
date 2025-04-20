// Função de tradução para elementos manuais
function updateLanguage(lang) {
    document.body.setAttribute('data-lang', lang);
    document.querySelectorAll('[data-pt]').forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });

    // Atualizar o href do botão de download do currículo
    const resumeDownloadButton = document.querySelector('.resume-download');
    if (resumeDownloadButton) {
        const href = resumeDownloadButton.getAttribute(`data-${lang}-href`);
        if (href) {
            resumeDownloadButton.setAttribute('href', href);
        } else {
            console.warn(`Nenhum href encontrado para o idioma ${lang}`);
        }
    }

    // Tradução automática para elementos com data-translate
    document.querySelectorAll('[data-translate]').forEach(element => {
        const originalText = element.getAttribute('data-pt');
        element.textContent = originalText; // Reset para português
        if (lang !== 'pt') {
            translateText(element, originalText, lang);
        }
    });
}

// Função de tradução automática simulada (sem API externa por enquanto)
function translateText(element, text, targetLang) {
    // Simulação simples: usar valores pré-definidos se existirem
    const translated = element.getAttribute(`data-${targetLang}`);
    if (translated) {
        element.textContent = translated;
        return;
    }
    // Caso não haja tradução pré-definida, manter o original (podemos adicionar API aqui depois)
    element.textContent = text;
}

// Evento do seletor de idioma
document.addEventListener('DOMContentLoaded', () => {
    const languageSelector = document.querySelector('.language-selector');
    const savedLang = localStorage.getItem('preferredLanguage') || 'pt';
    
    languageSelector.value = savedLang;
    updateLanguage(savedLang);

    languageSelector.addEventListener('change', function() {
        updateLanguage(this.value);
        localStorage.setItem('preferredLanguage', this.value);
    });

    // Verificar se Bootstrap está carregado
    if (typeof bootstrap === 'undefined') {
        console.error('Bootstrap JS não foi carregado corretamente.');
    } else {
        console.log('Bootstrap JS carregado com sucesso.');
    }
});