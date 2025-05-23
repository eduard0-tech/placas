function verificarPlaca() {
    const placaInput = document.getElementById('placa').value;
    const placa = placaInput.toUpperCase().replace(/[^A-Z0-9]/g, '');
    const resultado = document.getElementById('resultado');

    // Resetar estilos
    resultado.classList.remove('alert-success', 'alert-danger', 'alert-warning');
    resultado.innerHTML = '';

    // Validação básica
    if (placa.length !== 7) {
        resultado.textContent = '❌ Placa inválida. Formato correto: LLLNLNN';
        resultado.classList.add('alert-danger');
        return;
    }

    // Validação do formato
    const formato = /^[A-Z]{3}\d[A-Z]\d{2}$/;
    if (!formato.test(placa)) {
        resultado.textContent = '❌ Formato inválido. Use o padrão LLLNLNN';
        resultado.classList.add('alert-danger');
        return;
    }

    // Extrair letras iniciais
    const letras = placa.substring(0, 3);

    // Configuração dos estados
    const estados = {
        'Paraíba': /^JQ[K-N]|^NXV|^NXX|^O[L-O][A-Z]/,
        'Pernambuco': /^JWF|^J[W-X][A-Z]|^KZ[A-Z]/,
        'Rio Grande do Norte': /^KNW|^K[O-R][A-Z]|^OXP/
    };

    // Verificar correspondência
    let estadoEncontrado = '';
    for (const [estado, padrao] of Object.entries(estados)) {
        if (padrao.test(letras)) {
            estadoEncontrado = estado;
            break;
        }
    }

    // Exibir resultado
    if (estadoEncontrado) {
        resultado.innerHTML = `
            ✅ Placa identificada:<br>
            <strong>${placaInput}</strong><br>
            Estado: <strong>${estadoEncontrado}</strong>
        `;
        resultado.classList.add('alert-success');
    } else {
        resultado.innerHTML = `
            ⚠️ Placa não identificada nos estados:<br>
            Paraíba, Pernambuco ou Rio Grande do Norte
        `;
        resultado.classList.add('alert-warning');
    }
}