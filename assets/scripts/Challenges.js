(() => {
    const challengeData = [
        {
            title: "O primeiro algoritmo",
            concept: "Conceito de algoritmo",
            intro: "Um algoritmo é uma sequência de passos, em uma ordem definida, para resolver um problema, como uma receita. O NPC que guarda o arquivo travou. Dê o nome certo à estrutura e complete os passos na ordem para que ele volte a aparecer.",
            feedback: "Isso! Você escreveu seu primeiro algoritmo: passos simples, na ordem certa, resolvendo um problema.",
            mode: "fill",
            template: [
                { label: "", answer: "ALGORITMO", suffix: " \"reiniciar_npc\"", options: ["FIM", "ALGORITMO", "SENÃO"] },
                "INICIO",
                { label: "    ", answer: "LOCALIZAR_NPC", options: ["MOSTRAR_NPC", "LOCALIZAR_NPC", "APAGAR_NPC"] },
                "    REINICIAR_NPC",
                { label: "    ", answer: "MOSTRAR_NPC", options: ["LOCALIZAR_NPC", "APAGAR_NPC", "MOSTRAR_NPC"] },
                "FIMALGORITMO"
            ],
            effect: "O NPC apareceu! O arquivo pode ser pego.",
            hint: "Todo programa começa com a palavra ALGORITMO. Depois, pense na ordem: primeiro encontrar o NPC, depois reiniciar e, por fim, mostrar.",
            launcher: "Tela de código do Ben",
            readyEvent: "kat:challenge-1-ready",
            collectAdminFile: true,
            nextPage: "refuge.html"
        },
        {
            title: "A ferramenta do Célio",
            concept: "Parâmetros e funções",
            intro: "Uma função é um bloco de código com nome que pode ser reaproveitado. O parâmetro é o dado que você entrega a ela. Célio precisa reparar a PORTA e a FERRAMENTA: escreva a função REPARAR uma vez e chame-a para cada alvo.",
            feedback: "Certo! Você escreveu a função uma vez e a reaproveitou, mudando só o parâmetro.",
            mode: "fill",
            template: [
                "FUNCAO REPARAR(alvo)",
                { label: "    DESBLOQUEAR(", answer: "alvo", suffix: ")", options: ["PORTA", "alvo", "REPARAR"] },
                "    TESTAR(alvo)",
                "FIM_FUNCAO",
                "",
                "INICIO",
                { label: "    REPARAR(", answer: "PORTA", suffix: ")", options: ["PORTA", "alvo", "FUNCAO"] },
                { label: "    ", answer: "REPARAR(FERRAMENTA)", options: ["REPARAR()", "FUNCAO REPARAR(FERRAMENTA)", "REPARAR(FERRAMENTA)"] },
                "FIM"
            ],
            effect: "Célio restaurou a porta e a ferramenta!",
            hint: "Dentro da função, use o parâmetro alvo. Fora dela, chame REPARAR passando o objeto entre parênteses: primeiro PORTA, depois FERRAMENTA.",
            readyEvent: "kat:challenge-2-ready",
            nextPage: "garden.html"
        },
        {
            title: "Limpar os glitches do Jardim",
            concept: "Operadores aritméticos, relacionais e lógicos",
            intro: "Operadores aritméticos fazem contas (+ - * /), relacionais comparam valores (> < == >=) e lógicos juntam condições (E, OU, NÃO). Use um de cada para descobrir se ainda há glitches e se há energia para removê-los.",
            feedback: "Boa! A subtração fez a conta, o > comparou e o E exigiu as duas condições verdadeiras.",
            mode: "fill",
            template: [
                "ALGORITMO \"limpar_jardim\"",
                "INICIO",
                "    total_glitches <- 8",
                "    removidos <- 5",
                { label: "    restantes <- total_glitches ", answer: "-", suffix: " removidos", options: ["+", "-", "*"] },
                { label: "    tem_glitch <- restantes ", answer: ">", suffix: " 0", options: ["<", "==", ">"] },
                "    tem_energia <- energia >= 1",
                { label: "    SE tem_glitch ", answer: "E", suffix: " tem_energia ENTÃO", options: ["E", "OU", "NÃO"] },
                "        EXECUTAR(REMOVER_GLITCHS)",
                "    FIM_SE",
                "FIMALGORITMO"
            ],
            effect: "Os glitches sumiram e o primeiro arquivo ficou visível.",
            hint: "Restantes = total menos removidos. Há glitch quando restantes é maior que 0. E só é verdadeiro quando as duas condições são verdadeiras.",
            runLabel: "EXECUTAR SCRIPT",
            launcher: "Executar script do Jardim",
            readyEvent: "kat:challenge-3-ready",
            collectFragment: true,
            nextPage: "deepstrech.html"
        },
        {
            title: "A regra da Piona",
            concept: "Se / Senão",
            intro: "Com SE o programa toma uma decisão: se a condição for verdadeira, faz uma coisa; SENÃO, faz outra. Piona só libera o portal se o primeiro fragmento foi coletado; caso contrário, mostra uma dica.",
            feedback: "Isso! O SE escolheu o caminho certo e o SENÃO ficou como plano B.",
            effect: "Fragmento confirmado. O portal para o Refúgio foi liberado.",
            hint: "Quando o fragmento foi coletado, a ação é LIBERAR_PORTAL. O caminho alternativo começa com SENÃO.",
            mode: "fill",
            template: [
                "ALGORITMO \"portal_da_piona\"",
                "INICIO",
                "    fragmento_coletado <- VERDADEIRO",
                "    SE fragmento_coletado ENTÃO",
                { label: "        ", answer: "LIBERAR_PORTAL", options: ["MOSTRAR_DICA", "LIBERAR_PORTAL", "OCULTAR_PORTAL"] },
                { label: "    ", answer: "SENÃO", options: ["ENTÃO", "FIM_SE", "SENÃO"] },
                "        MOSTRAR_DICA",
                "    FIM_SE",
                "FIMALGORITMO"
            ],
            readyEvent: "kat:challenge-4-ready",
            nextPage: "refuge.html"
        },
        {
            title: "O objeto invisível",
            concept: "Depuração",
            intro: "Depurar é encontrar e corrigir erros (bugs) sem reescrever tudo. Este programa deveria revelar o arquivo, mas ele continua oculto. As partes em vermelho estão com bug: troque cada uma pela versão correta.",
            instructions: "Encontre as linhas com bug, escolha a correção e execute.",
            feedback: "Encontrou os bugs! Você corrigiu só o necessário, sem começar do zero.",
            mode: "fill",
            template: [
                "ALGORITMO \"revelar_arquivo\"",
                "INICIO",
                "    LOCALIZAR_ARQUIVO",
                { label: "    arquivo_visivel <- ", answer: "VERDADEIRO", bug: "FALSO", options: ["FALSO", "VERDADEIRO", "VAZIO"] },
                "    SE arquivo_visivel == VERDADEIRO ENTÃO",
                { label: "        ", answer: "MOSTRAR_ARQUIVO", bug: "OCULTAR_ARQUIVO", options: ["OCULTAR_ARQUIVO", "MOSTRAR_ARQUIVO", "APAGAR_ARQUIVO"] },
                "    FIM_SE",
                "FIMALGORITMO"
            ],
            effect: "O objeto escondido apareceu!",
            hint: "Para o SE ser verdadeiro, arquivo_visivel precisa valer VERDADEIRO. E, dentro do SE, a ação deve mostrar o arquivo, não escondê-lo.",
            readyEvent: "kat:challenge-5-ready",
            collectFragment: true,
            nextPage: "laboratorio.html"
        },
        {
            title: "O teletransporte repetitivo",
            concept: "Laços de repetição",
            intro: "Um laço repete instruções sem precisar escrevê-las várias vezes. O script antigo tinha TELETRANSPORTAR escrito 4 vezes seguidas. Troque tudo por um laço PARA que repita o comando 4 vezes.",
            feedback: "Certo! Uma linha dentro do laço fez o trabalho de quatro.",
            mode: "fill",
            template: [
                "ALGORITMO \"teletransporte\"",
                "INICIO",
                { label: "    PARA i DE 1 ATE ", answer: "4", suffix: " FACA", options: ["1", "4", "8"] },
                { label: "        ", answer: "TELETRANSPORTAR", options: ["TELETRANSPORTAR", "FIM_PARA", "PARA"] },
                { label: "    ", answer: "FIM_PARA", options: ["FIM_SE", "FIM_PARA", "FIMALGORITMO"] },
                "FIMALGORITMO"
            ],
            effect: "O teletransporte foi ajustado!",
            hint: "O laço deve ir de 1 até 4. Dentro dele fica só a ação que se repete, e todo PARA termina com FIM_PARA.",
            readyEvent: "kat:challenge-6-ready",
            collectFragment: true,
            nextPage: "teleport.html"
        },
        {
            title: "O sinal correto",
            concept: "Condicionais avançadas",
            intro: "Quando há mais de dois caminhos, use SE, SENÃO SE e SENÃO. Há três plataformas: vermelha, verde e azul. O teletransporte só pode usar a plataforma cujo sinal é VERDE e só se houver energia.",
            feedback: "Correto! O programa testou cada caso em ordem e escolheu a plataforma verde.",
            mode: "fill",
            template: [
                "ALGORITMO \"escolher_plataforma\"",
                "INICIO",
                "    sinal <- VERDE",
                "    energia <- 2",
                "    SE sinal == VERMELHO ENTÃO",
                "        MOSTRAR_DICA",
                { label: "    SENÃO SE sinal ", answer: "==", suffix: " VERDE E energia >= 1 ENTÃO", options: ["!=", "==", "<-"] },
                { label: "        TELETRANSPORTAR(", answer: "PLATAFORMA_VERDE", suffix: ")", options: ["PLATAFORMA_VERMELHA", "PLATAFORMA_VERDE", "PLATAFORMA_AZUL"] },
                { label: "    ", answer: "SENÃO", options: ["SENÃO", "ENTÃO", "SE"] },
                "        AGUARDAR_ENERGIA",
                "    FIM_SE",
                "FIMALGORITMO"
            ],
            effect: "A plataforma verde foi ativada!",
            hint: "Para comparar use == (o <- guarda valores). A plataforma precisa ser a VERDE, e o último caso, que pega todo o resto, é o SENÃO.",
            readyEvent: "kat:challenge-7-ready",
            collectFragment: true,
            nextPage: "deepstrech.html"
        },
        {
            title: "Os quatro fragmentos",
            concept: "Algoritmo completo",
            intro: "Hora de juntar as peças! Você trouxe os quatro arquivos para Piona. Monte o programa de saída: nomeie o algoritmo, insira cada fragmento com um laço e só execute se todos estiverem válidos.",
            feedback: "Você juntou sequência, laço e condição num programa completo. Isso merece comemoração!",
            mode: "fill",
            template: [
                { label: "", answer: "ALGORITMO", suffix: " \"programa_de_saida\"", options: ["FUNCAO", "ALGORITMO", "PARA"] },
                "INICIO",
                "    LIGAR_TERMINAL",
                "    PARA i DE 1 ATE 4 FACA",
                { label: "        ", answer: "INSERIR_CODIGO(fragmentos[i])", options: ["INSERIR_CODIGO(fragmentos[i])", "APAGAR_CODIGO(fragmentos[i])", "EXECUTAR_PROGRAMA()"] },
                "    FIM_PARA",
                { label: "    SE fragmentos_validos == ", answer: "4", suffix: " ENTÃO", options: ["0", "1", "4"] },
                "        EXECUTAR_PROGRAMA()",
                "    FIM_SE",
                "FIMALGORITMO"
            ],
            effect: "Os quatro fragmentos formaram o programa!",
            hint: "Todo programa começa com ALGORITMO. Dentro do laço, insira o fragmento da posição i. O programa só roda quando os 4 fragmentos são válidos.",
            requiresAllFiles: true,
            celebrate: true,
            readyEvent: "kat:challenge-8-ready",
            nextPage: "binary-room.html"
        },
        {
            title: "O último erro",
            concept: "Se e então dentro de laços",
            intro: "Um laço também pode depender de uma condição. Chromicos quer conferir os 4 arquivos um por um: ENQUANTO ainda houver arquivo para ver, SE ele estiver corrompido, ENTÃO repare. No fim, execute a saída.",
            feedback: "Algoritmo corrigido! O laço passou por cada arquivo e o SE reparou só os que precisavam.",
            mode: "fill",
            template: [
                "ALGORITMO \"conferir_arquivos\"",
                "INICIO",
                "    arquivo <- 1",
                { label: "    ENQUANTO arquivo ", answer: "<=", suffix: " 4 FACA", options: ["<=", ">", "=="] },
                "        SE CORROMPIDO(arquivo) ENTÃO",
                { label: "            ", answer: "REPARAR(arquivo)", options: ["APAGAR(arquivo)", "REPARAR(arquivo)", "EXECUTAR_SAIDA"] },
                "        FIM_SE",
                { label: "        arquivo <- arquivo ", answer: "+ 1", options: ["- 1", "* 1", "+ 1"] },
                "    FIM_ENQUANTO",
                "    EXECUTAR_SAIDA",
                "FIMALGORITMO"
            ],
            effect: "O acesso ao terminal final foi liberado!",
            hint: "O laço continua enquanto arquivo for menor ou igual a 4. Repare o arquivo corrompido e some 1 para passar ao próximo; senão o laço nunca termina.",
            readyEvent: "kat:challenge-9-ready",
            nextPage: "final-commit.html"
        },
        {
            title: "FINALCOMMIT",
            concept: "Desafio final: funções, condições e laços",
            intro: "Chromicos abre o terminal. Este é o algoritmo mais completo: a função ABRIR_SAIDA valida e executa a saída. Se o sinal estiver verde e houver energia, repare o caminho duas vezes e chame a função; senão, mostre uma dica.",
            feedback: "Código correto! A saída foi ativada.",
            mode: "fill",
            template: [
                "ALGORITMO \"final_commit\"",
                "",
                "FUNCAO ABRIR_SAIDA()",
                "    VALIDAR_CODIGO",
                "    EXECUTAR_SAIDA",
                "FIM_FUNCAO",
                "",
                "INICIO",
                "    LIGAR_TERMINAL",
                "    sinal <- VERDE",
                "    energia <- 2",
                { label: "    SE sinal == VERDE ", answer: "E", suffix: " energia >= 2 ENTÃO", options: ["E", "OU", "NÃO"] },
                "        PARA i DE 1 ATE 2 FACA",
                { label: "            ", answer: "REPARAR_CAMINHO", options: ["EXECUTAR_SAIDA", "REPARAR_CAMINHO", "MOSTRAR_DICA"] },
                "        FIM_PARA",
                { label: "        ", answer: "ABRIR_SAIDA()", options: ["FUNCAO ABRIR_SAIDA()", "FIM_FUNCAO", "ABRIR_SAIDA()"] },
                { label: "    ", answer: "SENÃO", options: ["SENÃO", "FIM_PARA", "ENTÃO"] },
                "        MOSTRAR_DICA(\"Verifique o sinal!\")",
                "    FIM_SE",
                "FIMALGORITMO"
            ],
            effect: "O terminal abriu a saída!",
            hint: "As duas condições precisam ser verdadeiras (E). Repare o caminho dentro do laço, chame a função pelo nome com () e use SENÃO para o caminho alternativo.",
            requiresAllFiles: true,
            celebrate: true,
            readyEvent: "kat:challenge-10-ready",
            ending: true
        }
    ];

    const pages = [
        "binary-room.html",
        "marketplace.html",
        "garden.html",
        "deepstrech.html",
        "refuge.html",
        "laboratorio.html",
        "teleport.html",
        "deepstrech.html",
        "binary-room.html",
        "final-commit.html"
    ];

    let assetState = JSON.parse(localStorage.getItem("assets") || "{}");
    const completed = Array.isArray(assetState.completedChallenges)
        ? assetState.completedChallenges.filter((id) => Number.isInteger(id) && id >= 1 && id <= 10)
        : [];
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    const currentChallengeId = completed.length + 1;
    const currentChallenge = challengeData[currentChallengeId - 1];
    if (!currentChallenge || pages[currentChallengeId - 1] !== currentPage) {
        return;
    }
    let adminRecoveryRequired = assetState["admin-access-lost"] === true;
    let challengeReady = false;
    let failurePending = false;
    if (currentChallenge.requiresAllFiles && !window.encryptedFiles.allCollected()) {
        return;
    }

    const launcher = document.createElement("button");
    launcher.className = "challenge-launcher";
    launcher.type = "button";
    launcher.textContent = currentChallenge.launcher || `Desafio ${currentChallengeId}/10`;
    launcher.setAttribute("aria-haspopup", "dialog");
    launcher.hidden = Boolean(currentChallenge.readyEvent);
    document.body.appendChild(launcher);

    const overlay = document.createElement("section");
    overlay.className = "challenge-overlay";
    overlay.hidden = true;
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-labelledby", "challenge-title");
    overlay.innerHTML = `
        <div class="challenge-panel">
            <header class="challenge-header">
                <div>
                    <p class="challenge-kicker">DESAFIO ${currentChallengeId} DE 10 · ${currentChallenge.concept}</p>
                    <h1 id="challenge-title"></h1>
                </div>
                <button class="challenge-close" type="button" aria-label="Fechar desafio">×</button>
            </header>
            <p class="challenge-intro"></p>
            <p class="challenge-instructions"></p>
            <div class="challenge-stage"></div>
            <p class="challenge-feedback" aria-live="polite"></p>
            <footer class="challenge-footer">
                <span class="challenge-progress"></span>
            </footer>
        </div>`;
    document.body.appendChild(overlay);

    const panel = overlay.querySelector(".challenge-panel");
    const title = overlay.querySelector("#challenge-title");
    const intro = overlay.querySelector(".challenge-intro");
    const instructions = overlay.querySelector(".challenge-instructions");
    const stage = overlay.querySelector(".challenge-stage");
    const feedback = overlay.querySelector(".challenge-feedback");
    const progress = overlay.querySelector(".challenge-progress");
    const closeButton = overlay.querySelector(".challenge-close");

    title.textContent = currentChallenge.title;
    intro.textContent = currentChallenge.intro;
    progress.textContent = `${completed.length} de 10 desafios concluídos`;

    function openChallenge() {
        if (adminRecoveryRequired || failurePending || completed.includes(currentChallengeId)) {
            return;
        }
        overlay.hidden = false;
        closeButton.focus();
    }

    function closeChallenge() {
        overlay.hidden = true;
        if (!launcher.hidden) {
            launcher.focus();
        }
    }

    function showError(message) {
        feedback.textContent = message;
        feedback.className = "challenge-feedback is-error";
    }

    function loseAdminAccess() {
        const latestState = JSON.parse(localStorage.getItem("assets") || "{}");
        if (!latestState["have-admin-file"]) {
            return false;
        }

        latestState["have-admin-file"] = false;
        latestState["admin-access-lost"] = true;
        localStorage.setItem("assets", JSON.stringify(latestState));
        assetState = latestState;
        document.dispatchEvent(new CustomEvent("kat:admin-access-lost", {
            detail: { challengeId: currentChallengeId }
        }));
        return true;
    }

    function handleWrongAnswer() {
        if (window.katSound) {
            window.katSound.play("error");
        }
        if (!loseAdminAccess()) {
            return false;
        }

        failurePending = true;
        launcher.hidden = true;
        closeChallenge();
        const benCharacter = typeof ben === "undefined" ? framer.character_main_scene : ben;
        const gatoCharacter = typeof gato === "undefined" ? framer.character_main_scene : gato;
        if (!scene.scenes.has("admin-access-lost-dialog")) {
            scene.create_scene("admin-access-lost-dialog", {
                startOn: "immediate",
                endOn: "last-interaction",
                dialogs: [
                    {
                        from: benCharacter,
                        to: gatoCharacter,
                        about: "A permissão ADM foi perdida. Vamos ao Bazar Oculto falar com Célio para restaurá-la."
                    }
                ],
                disableControls: true
            });
        }
        scene.push("admin-access-lost-dialog");
        return true;
    }

    function solvedProgram() {
        return currentChallenge.template.map((line) => typeof line === "string"
            ? line
            : `${line.label}${line.answer}${line.suffix || ""}`);
    }

    function celebrate() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
            return;
        }
        const layer = document.createElement("div");
        layer.className = "challenge-confetti";
        layer.setAttribute("aria-hidden", "true");
        const colors = ["#54a96c", "#4388c1", "#f2c14e", "#b63c58", "#ffffff"];
        for (let i = 0; i < 80; i += 1) {
            const piece = document.createElement("i");
            piece.style.left = `${Math.random() * 100}%`;
            piece.style.background = colors[i % colors.length];
            piece.style.animationDelay = `${Math.random() * 0.8}s`;
            piece.style.animationDuration = `${2.2 + Math.random() * 1.6}s`;
            piece.style.setProperty("--drift", `${(Math.random() - 0.5) * 160}px`);
            layer.appendChild(piece);
        }
        document.body.appendChild(layer);
        window.setTimeout(() => layer.remove(), 4800);
    }

    function markComplete() {
        if (completed.includes(currentChallengeId)) {
            return;
        }
        completed.push(currentChallengeId);
        const latestState = JSON.parse(localStorage.getItem("assets") || "{}");
        latestState.completedChallenges = completed;
        if (currentChallengeId === 2) {
            latestState["have-repair-tool"] = true;
        }
        assetState.completedChallenges = completed;
        localStorage.setItem("assets", JSON.stringify(latestState));
        document.dispatchEvent(new CustomEvent("kat:challenge-complete", {
            detail: { id: currentChallengeId }
        }));
        if (window.katSound) {
            window.katSound.play("success");
        }
        feedback.textContent = currentChallenge.feedback;
        feedback.className = "challenge-feedback is-success";
        const worldEffect = document.createElement("p");
        worldEffect.className = "challenge-world-effect";
        worldEffect.textContent = currentChallenge.effect;
        stage.appendChild(worldEffect);
        progress.textContent = `${completed.length} de 10 desafios concluídos`;
        launcher.hidden = true;
        panel.classList.add("challenge-complete");
        stage.querySelectorAll("button, input").forEach((button) => {
            button.disabled = true;
        });
        if (currentChallenge.celebrate) {
            celebrate();
        }
        if (currentChallenge.ending) {
            if (!window.finalTerminal || typeof window.finalTerminal.run !== "function") {
                throw new Error("The final program terminal is not available.");
            }
            overlay.hidden = true;
            window.finalTerminal.run(solvedProgram().filter((line) => line.trim() !== "")).then(showEnding).catch((error) => {
                console.error("Failed to execute the final program.", error);
            });
            return;
        }
        window.setTimeout(closeChallenge, 1100);
    }
function showEnding() {
        overlay.hidden = true;
        const ending = document.createElement("section");
        ending.className = "game-ending";
        ending.setAttribute("role", "dialog");
        ending.setAttribute("aria-modal", "true");
        ending.setAttribute("aria-live", "polite");
        ending.innerHTML = `
            <div class="game-ending-scene">
                <p class="game-ending-kicker">programa executado.</p>
                <div class="game-ending-visual">
                    <img class="game-ending-portrait" alt="" hidden>
                    <video class="game-ending-video" playsinline muted preload="auto" hidden>
                        <source src="assets/sprites/SpriteSheets/KAT_bye.mp4" type="video/mp4">
                    </video>
                    <p class="game-ending-dialog" aria-live="polite" hidden></p>
                </div>
                <button class="game-ending-video-play" type="button" hidden>Reproduzir vídeo</button>
                <div class="terminal-container" style="display: none;">
                    <p class="game-ending-message terminal-text"></p>
                </div>
                <section class="game-ending-credits" aria-label="Créditos" style="display: none;">
                    <h2>Desenvolvedores</h2>
                    <ul class="game-ending-developers"></ul>
                    <button class="game-ending-music" type="button" hidden>Tocar música final</button>
                </section>
                <button class="game-ending-restart" type="button" style="display: none;">Jogar novamente</button>
            </div>`;
        document.body.appendChild(ending);

        const dialog = ending.querySelector(".game-ending-dialog");
        const portrait = ending.querySelector(".game-ending-portrait");
        const video = ending.querySelector(".game-ending-video");
        const videoPlayButton = ending.querySelector(".game-ending-video-play");
        const terminalContainer = ending.querySelector(".terminal-container");
        const message = ending.querySelector(".game-ending-message");
        const credits = ending.querySelector(".game-ending-credits");
        const developers = ending.querySelector(".game-ending-developers");
        const musicButton = ending.querySelector(".game-ending-music");
        const restart = ending.querySelector(".game-ending-restart");
        const characters = document.querySelectorAll(".character, .npc");
        
        const developerNames = [
            "LETÍCIA (INSTRUTORA - SENAI)",
            "EZEQUIEL",
            "YASMIN",
            "GABRIEL"
        ];
        developerNames.forEach((name) => {
            const developer = document.createElement("li");
            developer.textContent = "> " + name;
            developers.appendChild(developer);
        });

        // Música original do código mantida
        const endingMusic = new Audio("assets/effects/game_end.mp3");
        endingMusic.preload = "auto";
        endingMusic.volume = 0.65;
        const playEndingMusic = () => {
            const playback = endingMusic.play();
            if (playback && typeof playback.catch === "function") {
                playback.catch((error) => {
                    console.error("Failed to play the ending music.", error);
                    musicButton.hidden = false;
                });
            }
        };
        musicButton.addEventListener("click", () => {
            const playback = endingMusic.play();
            if (playback && typeof playback.then === "function") {
                playback.then(() => {
                    musicButton.hidden = true;
                }).catch((error) => {
                    console.error("Failed to play the ending music after user interaction.", error);
                });
            }
        });
        playEndingMusic();

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const wait = (duration) => new Promise((resolve) => window.setTimeout(resolve, duration));

        characters.forEach((character) => character.classList.add("game-ending-depart"));
        ending.classList.add("is-visible", "is-white");
        window.setTimeout(() => {
            characters.forEach((character) => character.classList.add("game-ending-disappear"));
        }, reducedMotion ? 0 : 700);

        const showFarewell = (text) => {
            dialog.hidden = false;
            dialog.textContent = text;
            dialog.classList.remove("is-speaking");
            requestAnimationFrame(() => dialog.classList.add("is-speaking"));
        };

        const showPortrait = async (source, alt, text, duration) => {
            portrait.src = source;
            portrait.alt = alt;
            portrait.hidden = false;
            portrait.classList.remove("is-visible");
            showFarewell(text);
            await new Promise((resolve) => requestAnimationFrame(resolve));
            portrait.classList.add("is-visible");
            await wait(reducedMotion ? 300 : duration);
            portrait.classList.remove("is-visible");
            await wait(reducedMotion ? 0 : 500);
            portrait.hidden = true;
        };

        const typeTerminalText = (element, text, speed = 50) => {
            return new Promise((resolve) => {
                terminalContainer.style.display = "flex";
                element.textContent = "";
                let index = 0;
                function type() {
                    if (index < text.length) {
                        element.textContent += text.charAt(index);
                        index++;
                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                }
                type();
            });
        };

        void (async () => {
            // 1ª Cena: Chromicos
            await showPortrait(
                "assets/sprites/SpriteSheets/Chromicos_bye.png",
                "Chromicos se despedindo de KAT",
                "Chromicos: Você conseguiu, siga sua jornada.",
                7000
            );

            // 2ª Cena: Ben
            await showPortrait(
                "assets/sprites/SpriteSheets/Ben_bye.png",
                "Ben se despedindo de KAT",
                "Ben: Foi ótimo te acompanhar, Gato.",
                7000
            );

            dialog.hidden = true;
            
            // 3ª Cena: Vídeo original do código (KAT_bye.mp4)
            video.hidden = false;
            video.currentTime = 0;
            videoPlayButton.addEventListener("click", () => {
                if (video.dataset.failed === "true") {
                    startTerminalSequence();
                    return;
                }
                videoPlayButton.hidden = true;
                video.play().catch((error) => {
                    console.error("Failed to play the KAT farewell video.", error);
                    video.controls = true;
                    videoPlayButton.hidden = false;
                });
            });

            video.addEventListener("ended", () => {
                window.setTimeout(startTerminalSequence, reducedMotion ? 0 : 1000);
            }, { once: true });
            
            video.addEventListener("error", () => {
                console.error("Failed to load the KAT farewell video.");
                video.dataset.failed = "true";
                video.controls = false;
                videoPlayButton.textContent = "Continuar";
                videoPlayButton.hidden = false;
            }, { once: true });

            video.play().catch((error) => {
                console.error("Autoplay was blocked for the KAT farewell video.", error);
                video.controls = true;
                videoPlayButton.hidden = false;
            });
        })().catch((error) => {
            console.error("Failed to play the ending cutscene.", error);
        });

        // 4ª e 5ª Cenas: Transição para o terminal e créditos
        function startTerminalSequence() {
            if (ending.classList.contains("is-terminal-mode")) {
                return;
            }
            video.pause();
            video.hidden = true;
            videoPlayButton.hidden = true;
            dialog.hidden = true;
            
            const visualContainer = ending.querySelector(".game-ending-visual");
            const kicker = ending.querySelector(".game-ending-kicker");
            if (visualContainer) visualContainer.style.display = "none";
            if (kicker) kicker.hidden = true;
            
            // Ativa o modo de tela preta total (estilo terminal)
            ending.classList.add("is-terminal-mode");

            // 4ª Cena: Frase digitada no terminal
            typeTerminalText(message, "Simulação executada por: KAT", 45).then(() => {
                // 5ª Cena: Revela os créditos e a caixinha com os devs logo abaixo
                window.setTimeout(() => {
                    credits.style.display = "block";
                    restart.style.display = "inline-block";
                    restart.focus();
                }, 1000);
            });
        }

        restart.addEventListener("click", () => {
            const reset = { ...assetState, completedChallenges: [] };
            localStorage.setItem("assets", JSON.stringify(reset));
            window.location.assign("index.html");
        });
    }

    function renderFill() {
        stage.replaceChildren();
        const steps = document.createElement("ol");
        steps.className = "challenge-how-to";
        [
            "Escolha uma opção para cada lacuna.",
            "Confira o programa preenchido.",
            "Clique em EXECUTAR para testar."
        ].forEach((instruction) => {
            const step = document.createElement("li");
            step.textContent = instruction;
            steps.appendChild(step);
        });
        stage.appendChild(steps);

        const legend = document.createElement("div");
        legend.className = "challenge-code-legend";
        [
            ["token-keyword", "Regra"],
            ["token-action", "Comando"],
            ["token-value", "Valor"],
            ["token-operator", "Operador"]
        ].forEach(([tokenClass, label]) => {
            const item = document.createElement("span");
            item.className = "challenge-code-legend-item";
            const sample = document.createElement("code");
            sample.className = tokenClass;
            sample.textContent = label;
            item.appendChild(sample);
            legend.appendChild(item);
        });
        stage.appendChild(legend);

        const code = document.createElement("div");
        code.className = "challenge-fill-code";
        const gaps = [];
        currentChallenge.template.forEach((line) => {
            const row = document.createElement("div");
            row.className = "challenge-fill-line";
            const source = typeof line === "string" ? line : line.label;
            const indent = source.length - source.trimStart().length;
            if (indent > 0) {
                row.style.paddingLeft = `${indent}ch`;
            }
            if (typeof line === "string") {
                const text = document.createElement("span");
                window.katCodeHighlighter.render(text, line.trimStart());
                row.appendChild(text);
            } else {
                const label = document.createElement("span");
                window.katCodeHighlighter.render(label, line.label.trimStart());
                const gap = document.createElement("span");
                gap.className = "challenge-code-gap";
                window.katCodeHighlighter.render(gap, line.bug || "ESCOLHA UMA OPÇÃO");
                if (line.bug) {
                    gap.classList.add("is-bug");
                }
                gap.setAttribute("aria-live", "polite");
                const selection = { line, value: "", gap };
                gaps.push(selection);
                const suffix = document.createElement("span");
                window.katCodeHighlighter.render(suffix, line.suffix || "");
                row.append(label, gap, suffix);

                const group = document.createElement("fieldset");
                group.className = "challenge-choice-group";
                const legend = document.createElement("legend");
                legend.textContent = `Etapa ${gaps.length}: escolha uma opção`;
                group.appendChild(legend);
                const choices = document.createElement("div");
                choices.className = "challenge-choice-list";
                line.options.forEach((option, index) => {
                    const choiceLabel = document.createElement("label");
                    choiceLabel.className = "challenge-choice";
                    const input = document.createElement("input");
                    input.type = "radio";
                    input.name = `challenge-${currentChallengeId}-gap-${gaps.length}`;
                    input.value = option;
                    input.addEventListener("change", () => {
                        selection.value = option;
                        window.katCodeHighlighter.render(gap, option);
                        gap.classList.remove("is-empty", "is-wrong", "is-bug");
                        feedback.textContent = "";
                        feedback.className = "challenge-feedback";
                        choiceLabel.parentElement.querySelectorAll(".challenge-choice")
                            .forEach((choice) => choice.classList.remove("is-selected"));
                        choiceLabel.classList.add("is-selected");
                    });
                    const choiceText = document.createElement("span");
                    choiceText.textContent = option;
                    choiceLabel.append(input, choiceText);
                    choices.appendChild(choiceLabel);
                });
                group.appendChild(choices);
                stage.appendChild(group);
            }
            code.appendChild(row);
        });
        stage.insertBefore(code, steps.nextSibling);
        const runButton = document.createElement("button");
        runButton.type = "button";
        runButton.className = "challenge-action";
        runButton.textContent = currentChallenge.runLabel || "EXECUTAR PROGRAMA";
        runButton.addEventListener("click", () => {
            const allFilled = gaps.every(({ value }) => value !== "");
            const correct = gaps.every(({ line, value }) => value === line.answer);
            if (allFilled && correct) {
                markComplete();
                return;
            }
            showError(allFilled
                    ? (currentChallenge.hint || "Há um comando incompatível. Confira a ordem e tente de novo.")
                : "Escolha uma opção para cada lacuna antes de executar.");
            const hasIncorrectAnswer = gaps.some(({ line, value }) =>
                value !== "" && value !== line.answer
            );
            if (hasIncorrectAnswer) {
                handleWrongAnswer();
            }
            gaps.forEach(({ line, value, gap }) => {
                gap.classList.toggle("is-wrong", value !== "" && value !== line.answer);
                gap.classList.toggle("is-empty", value === "");
            });
        });
        stage.appendChild(runButton);
    }

    instructions.textContent = currentChallenge.instructions || "Complete somente as lacunas do código e execute.";
    renderFill();

    launcher.addEventListener("click", openChallenge);
    if (currentChallenge.readyEvent) {
        const onReady = () => {
            if (challengeReady) {
                return;
            }
            challengeReady = true;
            if (adminRecoveryRequired || completed.includes(currentChallengeId)) {
                return;
            }
            launcher.hidden = false;
            openChallenge();
        };
        document.addEventListener(currentChallenge.readyEvent, onReady, { once: true });
        // O aviso pode ter sido disparado antes deste script carregar.
        if (window.katFiredReadyEvents && window.katFiredReadyEvents.has(currentChallenge.readyEvent)) {
            onReady();
        }
    }
    document.addEventListener("kat:admin-access-lost", () => {
        adminRecoveryRequired = true;
    });
    document.addEventListener("kat:admin-access-restored", () => {
        adminRecoveryRequired = false;
        failurePending = false;
        if (challengeReady && !completed.includes(currentChallengeId)) {
            launcher.hidden = false;
            openChallenge();
        }
    });
    closeButton.addEventListener("click", closeChallenge);
    overlay.addEventListener("click", (event) => {
        if (event.target === overlay) {
            closeChallenge();
        }
    });
    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && !overlay.hidden && !currentChallenge.ending) {
            closeChallenge();
        }
    });
})();
