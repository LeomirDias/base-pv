/**
 * Form Dialog Component
 * Componente de dialog com formulário de captura de leads
 */

/**
 * Padroniza o nome completo (primeira letra de cada palavra em maiúscula)
 * @param {string} name - Nome a ser padronizado
 * @returns {string} - Nome padronizado
 */
function standardizeName(name) {
    return name
        .trim()
        .toLowerCase()
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

/**
 * Valida se o email contém @
 * @param {string} email - Email a ser validado
 * @returns {boolean} - True se válido
 */
function validateEmail(email) {
    return email.includes('@') && email.trim().length > 3;
}

/**
 * Formata o número de telefone no padrão (99) 9 9999-9999
 * @param {string} phone - Número a ser formatado
 * @returns {string} - Número formatado
 */
function formatPhone(phone) {
    // Remove todos os caracteres que não são números
    const numbers = phone.replace(/\D/g, '');
    
    // Formata no padrão (99) 9 9999-9999
    if (numbers.length === 11) {
        return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 3)} ${numbers.substring(3, 7)}-${numbers.substring(7, 11)}`;
    } else if (numbers.length === 10) {
        return `(${numbers.substring(0, 2)}) ${numbers.substring(2, 6)}-${numbers.substring(6, 10)}`;
    }
    
    return phone;
}

/**
 * Valida se o telefone está no formato correto
 * @param {string} phone - Telefone a ser validado
 * @returns {boolean} - True se válido
 */
function validatePhone(phone) {
    const numbers = phone.replace(/\D/g, '');
    return numbers.length === 10 || numbers.length === 11;
}

/**
 * Abre o dialog do formulário
 */
function openFormDialog() {
    const dialog = document.getElementById('formDialog');
    if (dialog) {
        dialog.classList.remove('hidden');
        dialog.classList.add('flex');
        // Previne scroll do body quando o dialog está aberto
        document.body.style.overflow = 'hidden';
    }
}

/**
 * Fecha o dialog do formulário
 */
function closeFormDialog() {
    const dialog = document.getElementById('formDialog');
    if (dialog) {
        dialog.classList.add('hidden');
        dialog.classList.remove('flex');
        // Restaura scroll do body
        document.body.style.overflow = 'auto';
        // Limpa o formulário
        document.getElementById('leadForm').reset();
        // Remove mensagens de erro
        hideAllErrors();
    }
}

/**
 * Esconde todas as mensagens de erro
 */
function hideAllErrors() {
    document.getElementById('fullNameError').classList.add('hidden');
    document.getElementById('emailError').classList.add('hidden');
    document.getElementById('phoneError').classList.add('hidden');
}

/**
 * Mostra mensagem de erro para um campo específico
 * @param {string} fieldId - ID do campo com erro
 */
function showError(fieldId) {
    document.getElementById(`${fieldId}Error`).classList.remove('hidden');
}

/**
 * Inicializa o dialog e seus event listeners
 */
function initFormDialog() {
    const dialog = document.getElementById('formDialog');
    const closeBtn = document.getElementById('closeDialogBtn');
    const form = document.getElementById('leadForm');
    const phoneInput = document.getElementById('phone');
    const fullNameInput = document.getElementById('fullName');

    // Fecha o dialog ao clicar no botão de fechar
    if (closeBtn) {
        closeBtn.addEventListener('click', closeFormDialog);
    }

    // Fecha o dialog ao clicar fora dele
    if (dialog) {
        dialog.addEventListener('click', (e) => {
            if (e.target === dialog) {
                closeFormDialog();
            }
        });
    }

    // Fecha o dialog ao pressionar ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeFormDialog();
        }
    });

    // Formata o telefone em tempo real
    if (phoneInput) {
        phoneInput.addEventListener('input', (e) => {
            e.target.value = formatPhone(e.target.value);
        });
    }

    // Padroniza o nome ao sair do campo
    if (fullNameInput) {
        fullNameInput.addEventListener('blur', (e) => {
            e.target.value = standardizeName(e.target.value);
        });
    }

    // Submissão do formulário
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            hideAllErrors();

            const fullName = document.getElementById('fullName').value;
            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;

            let hasError = false;

            // Valida nome completo (deve ter pelo menos 2 palavras)
            if (fullName.trim().split(' ').length < 2) {
                showError('fullName');
                hasError = true;
            }

            // Valida email
            if (!validateEmail(email)) {
                showError('email');
                hasError = true;
            }

            // Valida telefone
            if (!validatePhone(phone)) {
                showError('phone');
                hasError = true;
            }

            // Se não houver erros, redireciona
            if (!hasError) {
                // Aqui você pode adicionar código para enviar os dados para um servidor
                console.log('Dados do formulário:', {
                    fullName: standardizeName(fullName),
                    email: email.trim(),
                    phone: formatPhone(phone)
                });

                // Fecha o dialog
                closeFormDialog();

                // Pega o link do botão de submit
                const submitBtn = document.getElementById('submitDialogBtn');
                const redirectLink = submitBtn ? submitBtn.getAttribute('data-redirect-link') : '';

                // Redireciona para o link em uma nova aba
                if (redirectLink) {
                    window.open(redirectLink, '_blank', 'noopener,noreferrer');
                }
            }
        });
    }
}

// Exporta funções para uso global
window.openFormDialog = openFormDialog;
window.closeFormDialog = closeFormDialog;
window.initFormDialog = initFormDialog;
