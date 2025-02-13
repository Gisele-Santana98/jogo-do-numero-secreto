let listaDeNumerosSorteados = [];  // Criando um array vazio para armazenar os números sorteados ou o processo de tentativa.
let numeroLimite = 15;  // Definindo o limite máx. de tentativas ou o intervalo para o número sorteado.
let numeroSecreto = gerarNumeroAleatorio();  // Chama uma função que gera um número aleatório, e armazena o número na variável "numeroSecreto".
let tentativas = 1;  // Criando uma variável que controla o número de tentativas feitas, começando de 1.

// Função para exibir um texto em uma tag HTML específica e falar o texto usando a Web Speech API.
function exibirTextoNaTela(tag, texto) {  
    let campo = document.querySelector(tag);  // Seleciona o elemento HTML que corresponde à tag passada como argumento.
    campo.innerHTML = texto;  // Definindo o conteúdo HTML desse elemento com o texto passado como argumento.

    // Verifica se a Web Speech API é suportada pelo navegador
    if ('speechSynthesis' in window) {  
        let utterance = new SpeechSynthesisUtterance(texto);  // Criando um objeto de "fala" que contém o texto que será falado.
        utterance.lang = 'pt-BR';  // Definindo o idioma da fala como português do Brasil.
        utterance.rate = 1.2;  // Ajustando a velocidade da fala.
        window.speechSynthesis.speak(utterance);  // Faz o navegador falar o texto configurado na variável "utterance".
    } else {  
        console.log("Web Speech API não suportada neste navegador.");  // Caso a Web Speech API não seja suportada, imprime uma mensagem de erro no console.
    }
}

// Função que exibe as mensagens iniciais do jogo
function exibirMensagemInicial() {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');  // Chamando a função exibirTextoNaTela para exibir o título.
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 15.');  // Chamando a função exibirTextoNaTela para exibir a instrução. 
}
exibirMensagemInicial();  // Chamando a função exibirMensagemInicial para exibir as mensagens iniciais na tela.

// Função que verifica se o chute do jogador está correto ou não
function verificarChute() {
    let chute = document.querySelector('input').value;  // Obtém o valor digitado no campo de input (campo que insere o número).
    if (chute == numeroSecreto) {  // Se o chute for igual ao número secreto.
        exibirTextoNaTela('h1', 'Acertou!');  // Exibe a mensagem "Acertou!" no título <h1>.

        // Usando operador ternário para escolher se usa "tentativas" ou "tentativa" dependendo do número de tentativas
        let palavraTentativa = tentativas > 1 ? 'tentativas' : 'tentativa';
        
        // Cria uma mensagem indicando quantas tentativas foram feitas
        let mensagemTentativas = `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela('p', mensagemTentativas);  // Exibe a mensagem de tentativas no parágrafo <p>
        document.getElementById('reiniciar').removeAttribute('disabled');  // Habilita o botão de reinício 
    } else {  // Se o chute não for o número secreto.
        if (chute > numeroSecreto) {  // Se o chute for maior que o número secreto
            exibirTextoNaTela('p', 'O número secreto é menor.');  // Informa ao jogador que o número secreto é menor.
        } else {  // Se o chute for menor que o número secreto.
            exibirTextoNaTela('p', 'O número secreto é maior.');  // Informa ao jogador que o número secreto é maior.
        }
        tentativas++;  // Incrementa o contador de tentativas a cada erro.
        limparCampo();  // Chama a função limparCampo.
    }
}

function gerarNumeroAleatorio() { // Função que gera um número aleatório
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);  // Gera um número aleatório entre 1 e "numeroLimite" (10). A função Math.random() gera um número entre 0 e 1, que é multiplicado por "numeroLimite" e arredondado para inteiro com parseInt().
    
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;  // Armazena a quantidade de números já sorteados na lista.
    if (quantidadeDeElementosNaLista == numeroLimite) {  // Se a quantidade de números sorteados atingiu o limite.
        listaDeNumerosSorteados = [];  // Reseta a lista de números sorteados, permitindo um novo ciclo de sorteio.
    }
    // Se o número sorteado já está na lista de números sorteados, chama a função novamente.
    if (listaDeNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio();  // Gera outro número se o sorteado já estiver na lista
    } else {
        listaDeNumerosSorteados.push(numeroEscolhido);  // Se o número não estiver na lista, adiciona ele à lista de números sorteados.
        console.log(listaDeNumerosSorteados);  // Exibe no console a lista de números sorteados até o momento.
        return numeroEscolhido;  // Retorna o número sorteado, que será usado como o número secreto.
    }
}
function limparCampo() { // Função que limpa o campo de entrada onde o jogador coloca o chute.
    chute = document.querySelector('input');  // Seleciona o campo de input onde o jogador insere o número.
    chute.value = '';  // Limpa o valor do campo de input, deixando-o vazio.
}
function reiniciarJogo() { // Função que reinicia o jogo.
    numeroSecreto = gerarNumeroAleatorio();  // Gera um novo número secreto chamando a função gerarNumeroAleatorio().
    limparCampo();  // Limpa o campo de entrada de chute.
    tentativas = 1;  // Reseta o contador de tentativas para 1.
    exibirMensagemInicial();  // Chama a função que exibe as mensagens iniciais do jogo.
    document.getElementById('reiniciar').setAttribute('disabled', true);  // Desabilita o botão de reinício para evitar que o jogador o clique novamente enquanto o jogo está em rodando.
}
