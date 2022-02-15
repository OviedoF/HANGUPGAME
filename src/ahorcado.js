(() => {
    /* Declaraciones */

    let words = ['COMPUTADOR', 'FOTO', 'MARCO', 'CONTROL', 'BOTELLA', 'CELULAR', 'MUEBLE', 'PERRO', 'GATO'];
    let random =  Math.floor(Math.random() * words.length);
    let chooseWord = words[random];
    let chooseWordIndexs;

    let isPlaying = false;
    let fails = 0;
    let canvas = document.getElementById('ahorcado');
    let ctx = canvas.getContext('2d');

    let wordsContainer = document.getElementById('words-container');
    let textInput = document.querySelector('.text-input');
    let wrongsLetters = document.getElementById('wrong-letters');

    /* Funciones */

    const writeWord = (word) => {

        for (let i = 0; i < word.length; i++) {
            let span = document.createElement('span');
            span.classList.add('span-game');
            span.textContent = '  ';
            
            wordsContainer.appendChild(span);
        }
    };

    const deleteWord = () => {
        wordsContainer.innerHTML = '';
    }

    const handleKeys = (e) => {
        var reg=new RegExp("[A-Z]");
        let noLetters = ['CapsLock', 'Enter', 'Shift', 'Tab', 'Control', 'Meta', 'Alt', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Backspace', 'AltGraph'];
        let winCondition = 0;

        if (!e.key.match(reg) || noLetters.includes(e.key)) {
            document.getElementById('requeriments').style.animation = 'zoom 0.5s';
            setTimeout(() => {
                document.getElementById('requeriments').style.animation = "";
            }, 500);
            return;
        } else {
            for(i=0; i<chooseWord.length; i++){
    
                if(chooseWord.charAt(i) === e.key) {
    
                    chooseWordIndexs[i].textContent = e.key;
                }
            } 
    
            if(chooseWord.includes(e.key) === false) {
                if(wrongsLetters.textContent.indexOf(e.key) != -1) return;

                fails += 1;
                wrongsLetters.textContent += e.key;
    
                switch (fails) {
                    case 1:                   
                        /* Head */
                        ctx.beginPath();
                        ctx.arc(900,287,25,0,90);
                        ctx.stroke();
                        ctx.closePath();
                        break;
                    case 2:
                            /* Body */ 
                            ctx.beginPath();
                            ctx.lineTo(900, 314);
                            ctx.lineTo(900, 360);
                            ctx.stroke();
                            ctx.closePath();
                            break;
                    case 3: 
                                /* Right Arm */
                                ctx.beginPath();
                                ctx.lineTo(900, 322);
                                ctx.lineTo(940, 350);
                                ctx.stroke();
                                ctx.closePath();
                                break;
                    case 4:
                            /* Left Arm */
                            ctx.beginPath();
                            ctx.lineTo(900, 322);
                            ctx.lineTo(860, 350);
                            ctx.stroke();
                            ctx.closePath();
                            break;
                    case 5: 
                                /* Right Leg */
                            ctx.beginPath();
                            ctx.lineTo(900, 360);
                            ctx.lineTo(940, 388);
                            ctx.stroke();
                            ctx.closePath();
                            break;
                    case 6:
                            /* Left Leg */
                            ctx.beginPath();
                            ctx.lineTo(900, 360);
                            ctx.lineTo(860, 388);
                            ctx.stroke();
                            ctx.closePath();
    
                            document.getElementById('alerts').style.display= 'block';
                            document.getElementById('lose-alert').style.zIndex= '10';
                            window.removeEventListener('keyup', handleKeys);
                            
                            break;
                }
            }
        };

        chooseWordIndexs.forEach(element => {
            if (element.innerHTML != "  ") winCondition += 1;
        });

        if (winCondition == chooseWordIndexs.length) {
           document.getElementById('alerts').style.display= 'block';
           document.getElementById('win-alert').style.zIndex = '10';
           window.removeEventListener('keyup', handleKeys);
        };
    }

    const handlePlay = () => {
        if (isPlaying === true) {
            window.addEventListener('keyup', handleKeys);
        } else {
            window.removeEventListener('keyup', handleKeys);
        }
    }

    const drawPaths = () => {
        /* Base */
        ctx.lineWidth= '4';
        ctx.beginPath();
        ctx.lineTo(500,580);
        ctx.lineTo(650,480);
        ctx.stroke();
        ctx.lineTo(650, 480);
        ctx.lineTo(800, 580);
        ctx.stroke();
        ctx.lineTo(650, 480);
        ctx.lineTo(650, 200);
        ctx.stroke();
        ctx.lineTo(650, 200);
        ctx.lineTo(900, 200);
        ctx.stroke();
        ctx.lineTo(900, 200);
        ctx.lineTo(900, 260);
        ctx.stroke();
        ctx.closePath();
    }

    /* Ejecuciones */

    document.getElementById('iniciar-juego').addEventListener('click', () => {
        document.getElementById('wrong-letters').innerHTML = "";
        fails = 0;
        document.getElementById('lose-alert').style.zIndex = '1';
        document.getElementById('win-alert').style.zIndex = '1';
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawPaths();

        document.getElementById('ahorcado-game').style.top = '0';
        random =  Math.floor(Math.random() * words.length);
        chooseWord = words[random];
        
        isPlaying = true;
        writeWord(chooseWord);
        chooseWordIndexs = document.querySelectorAll('.span-game');

        handlePlay();
    });

    document.getElementById('close-button').addEventListener('click', () => {
        document.getElementById('ahorcado-game').style.top = '-100%';

        isPlaying = false;
        handlePlay();
        deleteWord();
    });

    document.getElementById('nueva-palabra').addEventListener('click', (e) => {
        e.preventDefault();

        if(textInput.value === '' || textInput.value.length == 1) {
            alert('Escribe una palabra.');
        } else {
            words.push(textInput.value.toUpperCase());
            
            textInput.value = '';

            document.getElementById('success-added').style.opacity = '1';

            setTimeout(() => {
                document.getElementById('success-added').style.opacity = '0';
            }, 500);
        }   
    });

    document.querySelector('.reset-button').addEventListener('click', (e) => {
        document.querySelector('#alerts').style.display = 'none';
        document.querySelector('#ahorcado-game').style.top = '-100%';
        isPlaying = false;
        handlePlay();
        deleteWord();
    });

    document.getElementById('win-button').addEventListener('click', (e) => {
        document.querySelector('#alerts').style.display = 'none';
        document.querySelector('#ahorcado-game').style.top = '-100%';
        isPlaying = false;
        handlePlay();
        deleteWord();
    })

    drawPaths();


}) ();

