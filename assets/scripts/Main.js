const framer = new Framer();
const scene = new SceneManager(framer);

const assets = {
    get: (key) => {
        const m = JSON.parse(localStorage.getItem("assets"));
        if(!m) return null;
        return m[key];
    },
    save: (key, value) => {
        const m = JSON.parse(localStorage.getItem("assets")) || {};
        m[key] = value;

        localStorage.setItem("assets", JSON.stringify(m));
    },
    clear: () => {
        localStorage.clear();
    }
}

window.katQuestFollowUp = ({ challengeId, sceneName, seenKey, dialogs }) => {
    if (!Number.isInteger(challengeId) || challengeId < 1 || challengeId > 10 ||
        typeof sceneName !== "string" || sceneName.trim() === "" ||
        typeof seenKey !== "string" || seenKey.trim() === "" ||
        !Array.isArray(dialogs) || dialogs.length === 0) {
        throw new TypeError("Quest follow-up requires a challenge id, scene name, seen key, and dialogs.");
    }

    scene.create_scene(sceneName, {
        startOn: "immediate",
        endOn: "last-interaction",
        dialogs,
        afterItDoes: () => assets.save(seenKey, true),
        disableControls: true
    });

    let followUpTimer = null;
    const scheduleFollowUp = () => {
        if (assets.get(seenKey) === true || followUpTimer !== null) {
            return;
        }

        followUpTimer = window.setTimeout(() => {
            followUpTimer = null;
            const challengeOverlay = document.querySelector(".challenge-overlay");
            if (scene.currentScene || scene.activeAlert || framer.codeBox ||
                (challengeOverlay && !challengeOverlay.hidden)) {
                scheduleFollowUp();
                return;
            }
            scene.push(sceneName);
        }, 500);
    };

    document.addEventListener("kat:challenge-complete", (event) => {
        if (event.detail?.id === challengeId) {
            scheduleFollowUp();
        }
    });

    const completed = assets.get("completedChallenges");
    if (Array.isArray(completed) && completed.includes(challengeId)) {
        scheduleFollowUp();
    }
};

// Caminhos relativos para funcionar também no GitHub Pages (site em /nome-do-repo/).
const katCurrentPage = window.location.pathname.split("/").pop() || "index.html";
if (!assets.get('started') && katCurrentPage !== "index.html") window.location.href = "index.html";

// Guarda os avisos "desafio pronto" disparados antes de Challenges.js carregar,
// para o desafio abrir mesmo quando o script da cena roda primeiro.
window.katFiredReadyEvents = new Set();
for (let id = 1; id <= 10; id += 1) {
    const eventName = `kat:challenge-${id}-ready`;
    document.addEventListener(eventName, () => window.katFiredReadyEvents.add(eventName));
}

window.katCodeHighlighter = {
    render: (container, source) => {
        if (!(container instanceof Element) || typeof source !== "string") {
            throw new TypeError("Code highlighting requires an element and a source string.");
        }

        const keywords = new Set([
            "ALGORITMO", "FIMALGORITMO", "FUNCAO", "FIM_FUNCAO", "INICIO", "SE", "ENTÃO", "SENÃO", "FIM", "FIM_PARA", "FIM_SE", "FIM_ENQUANTO",
            "REPETIR", "FIM_REPETIR", "VEZES", "ENQUANTO", "PARA", "DE", "ATE", "FACA"
        ]);
        const logicalOperators = new Set(["E", "OU", "NÃO"]);
        const actions = new Set([
            "ABRIR", "APAGAR", "APAGAR_ARQUIVO", "ATIVAR", "DELETAR",
            "AGUARDAR_ENERGIA", "CORROMPIDO", "DESBLOQUEAR", "TESTAR", "ABRIR_SAIDA",
            "LOCALIZAR_NPC", "REINICIAR_NPC", "MOSTRAR_NPC", "APAGAR_NPC", "LOCALIZAR_ARQUIVO",
            "LIGAR_TERMINAL", "APAGAR_CODIGO", "OCULTAR_PORTAL",
            "EXECUTAR", "EXECUTAR_PROGRAMA", "EXECUTAR_SAIDA", "INSERIR_CODIGO",
            "LIBERAR", "LIBERAR_PORTAL", "LIGAR", "LOCALIZAR", "MOSTRAR",
            "MOSTRAR_ARQUIVO", "MOSTRAR_DICA", "OCULTAR", "OCULTAR_ARQUIVO",
            "REINICIAR", "REPARAR", "REPARAR_CAMINHO", "REMOVER_GLITCHS",
            "TELETRANSPORTAR", "VALIDAR", "VALIDAR_CODIGO"
        ]);
        const values = new Set([
            "ADM", "AZUL", "BEN", "FERRAMENTA", "PLATAFORMA_VERDE", "PLATAFORMA_VERMELHA", "PLATAFORMA_AZUL", "FALSO", "GATO", "LUZ", "NPC", "PORTA",
            "SOM", "VAZIO", "VERDADEIRO", "VERDE", "VERMELHO"
        ]);
        const functions = new Set(["MOD"]);
        const pattern = /[\p{L}_][\p{L}\p{N}_]*|\d+(?:\.\d+)?|<=|>=|==|!=|<-|[+\-*/%<>]|[()[\]{}:.,]/gu;
        const fragment = document.createDocumentFragment();
        let lastIndex = 0;
        let match;

        while ((match = pattern.exec(source)) !== null) {
            if (match.index > lastIndex) {
                fragment.appendChild(document.createTextNode(source.slice(lastIndex, match.index)));
            }

            const token = match[0];
            let tokenClass = "";
            if (keywords.has(token)) {
                tokenClass = "token-keyword";
            } else if (functions.has(token) || logicalOperators.has(token) ||
                ["+", "-", "*", "/", "%", "<", ">", "<=", ">=", "==", "!=", "<-"].includes(token)) {
                tokenClass = "token-operator";
            } else if (actions.has(token)) {
                tokenClass = "token-action";
            } else if (values.has(token)) {
                tokenClass = "token-value";
            } else if (/^\d/.test(token)) {
                tokenClass = "token-number";
            } else if (/^[\p{Ll}_]/u.test(token)) {
                tokenClass = "token-variable";
            }

            if (tokenClass) {
                const span = document.createElement("span");
                span.className = tokenClass;
                span.textContent = token;
                fragment.appendChild(span);
            } else {
                fragment.appendChild(document.createTextNode(token));
            }
            lastIndex = pattern.lastIndex;
        }

        if (lastIndex < source.length) {
            fragment.appendChild(document.createTextNode(source.slice(lastIndex)));
        }
        container.replaceChildren(fragment);
    }
};

// Ao sair da aba (notificação, troca de app, tela bloqueada) o progresso é mantido.
document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
        return;
    }
    const notice = document.createElement("div");
    notice.className = "kat-resume-notice";
    notice.setAttribute("role", "status");
    notice.textContent = "Bem-vindo de volta! Seu progresso foi mantido.";
    document.body.appendChild(notice);
    window.setTimeout(() => notice.remove(), 2600);
});

// Mantém NPCs e personagens dentro da tela (celular, janela pequena, girar a tela).
// O personagem controlado já é limitado pelo Framer, então fica de fora.
window.katKeepCharactersOnScreen = () => {
    const main = typeof framer !== "undefined" && framer.character_main_scene
        ? framer.character_main_scene.character_dom
        : null;
    document.querySelectorAll(".character").forEach((element) => {
        if (element === main || element.style.display === "none") {
            return;
        }
        const width = element.offsetWidth;
        const height = element.offsetHeight;
        const left = parseFloat(element.style.left);
        const top = parseFloat(element.style.top);
        if (!Number.isNaN(left)) {
            element.style.left = `${Math.max(0, Math.min(left, window.innerWidth - width))}px`;
        }
        if (!Number.isNaN(top)) {
            element.style.top = `${Math.max(0, Math.min(top, window.innerHeight - height))}px`;
        }
    });
};
window.addEventListener("load", () => {
    window.katKeepCharactersOnScreen();
    window.setTimeout(window.katKeepCharactersOnScreen, 800);
});
window.addEventListener("resize", () => window.katKeepCharactersOnScreen());

// Controles de toque: imitam as teclas do teclado para jogar no celular.
;(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
    if (!isTouch) {
        return;
    }
    document.documentElement.classList.add("kat-touch");

    const keys = {
        up: { code: "ArrowUp", key: "ArrowUp" },
        down: { code: "ArrowDown", key: "ArrowDown" },
        left: { code: "ArrowLeft", key: "ArrowLeft" },
        right: { code: "ArrowRight", key: "ArrowRight" },
        e: { code: "KeyE", key: "e" },
        c: { code: "KeyC", key: "c" },
        p: { code: "KeyP", key: "p" }
    };
    const send = (type, { code, key }) => {
        window.dispatchEvent(new KeyboardEvent(type, { code, key, bubbles: true }));
    };
    // Um toque rápido pode durar menos que um quadro do jogo; segura a tecla um pouco.
    const MIN_PRESS = 120;
    const tap = (name) => {
        send("keydown", keys[name]);
        window.setTimeout(() => send("keyup", keys[name]), MIN_PRESS);
    };

    const pad = document.createElement("div");
    pad.className = "kat-touch-controls";
    pad.setAttribute("aria-label", "Controles de toque");
    pad.innerHTML = `
        <div class="kat-dpad">
            <button type="button" data-key="up" aria-label="Cima">▲</button>
            <button type="button" data-key="left" aria-label="Esquerda">◀</button>
            <button type="button" data-key="right" aria-label="Direita">▶</button>
            <button type="button" data-key="down" aria-label="Baixo">▼</button>
        </div>
        <div class="kat-actions">
            <button type="button" data-tap="p" aria-label="Usar portal (P)">P</button>
            <button type="button" data-tap="c" aria-label="Continuar cena (C)">C</button>
            <button type="button" data-tap="e" aria-label="Falar (E)">E</button>
        </div>`;
    document.body.appendChild(pad);

    // O jogo foi desenhado para tela larga: na vertical, sugere girar o celular.
    const rotateHint = document.createElement("div");
    rotateHint.className = "kat-rotate-hint";
    rotateHint.setAttribute("role", "dialog");
    rotateHint.innerHTML = `
        <div class="kat-rotate-hint-panel">
            <div class="kat-rotate-hint-icon" aria-hidden="true">📱↻</div>
            <p>Gire o celular para jogar na horizontal.</p>
            <button type="button">Continuar assim mesmo</button>
        </div>`;
    rotateHint.querySelector("button").addEventListener("click", () => {
        document.documentElement.classList.add("kat-rotate-dismissed");
    });
    document.body.appendChild(rotateHint);

    pad.querySelectorAll("[data-key]").forEach((button) => {
        const key = keys[button.dataset.key];
        let pressedAt = 0;
        let held = false;
        const press = (event) => {
            event.preventDefault();
            if (held) {
                return;
            }
            held = true;
            pressedAt = performance.now();
            button.classList.add("is-pressed");
            if (button.setPointerCapture && event.pointerId !== undefined) {
                button.setPointerCapture(event.pointerId);
            }
            send("keydown", key);
        };
        const release = () => {
            if (!held) {
                return;
            }
            held = false;
            button.classList.remove("is-pressed");
            const wait = Math.max(0, MIN_PRESS - (performance.now() - pressedAt));
            window.setTimeout(() => send("keyup", key), wait);
        };
        button.addEventListener("pointerdown", press);
        button.addEventListener("pointerup", release);
        button.addEventListener("pointercancel", release);
        button.addEventListener("lostpointercapture", release);
        button.addEventListener("contextmenu", (event) => event.preventDefault());
    });

    pad.querySelectorAll("[data-tap]").forEach((button) => {
        button.addEventListener("pointerdown", (event) => {
            event.preventDefault();
            tap(button.dataset.tap);
        });
        button.addEventListener("contextmenu", (event) => event.preventDefault());
    });

    // Tocar na caixa de diálogo avança a conversa, como o E.
    const dialogBox = document.querySelector(".dialog-box");
    if (dialogBox) {
        dialogBox.addEventListener("click", () => {
            if (!dialogBox.classList.contains("closed")) {
                tap("e");
            }
        });
    }
})();

;(() => {
    const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;
    if (!AudioContextConstructor) {
        console.error("Web Audio is not available; game sound effects are disabled.");
        window.katSound = {
            unlocked: false,
            unlock: () => {},
            play: () => {}
        };
        return;
    }

    let audioContext = null;
    let audioUnlocked = false;
    const sounds = {
        teleport: [440, 660, 880],
        success: [523, 659, 784],
        error: [220, 165],
        terminal: [440]
    };

    window.katSound = {
        get unlocked() {
            return audioUnlocked;
        },
        unlock: () => {
            audioContext = audioContext || new AudioContextConstructor();
            audioUnlocked = true;
            if (audioContext.state === "suspended") {
                audioContext.resume().catch((error) => {
                    console.error("Failed to resume game audio.", error);
                });
            }
            document.dispatchEvent(new CustomEvent("kat:audio-unlocked"));
        },
        play: (name) => {
            const notes = sounds[name];
            if (!notes) {
                throw new TypeError(`Unsupported game sound "${name}".`);
            }

            if (!audioUnlocked) {
                return;
            }

            const now = audioContext.currentTime;
            notes.forEach((frequency, index) => {
                const oscillator = audioContext.createOscillator();
                const gain = audioContext.createGain();
                const start = now + index * 0.075;
                oscillator.type = "square";
                oscillator.frequency.setValueAtTime(frequency, start);
                gain.gain.setValueAtTime(0.0001, start);
                gain.gain.exponentialRampToValueAtTime(0.07, start + 0.012);
                gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.12);
                oscillator.connect(gain);
                gain.connect(audioContext.destination);
                oscillator.start(start);
                oscillator.stop(start + 0.13);
            });
        }
    };

    const unlockGameAudio = () => window.katSound.unlock();
    window.addEventListener("pointerdown", unlockGameAudio, { once: true });
    window.addEventListener("keydown", unlockGameAudio, { once: true });
})();
