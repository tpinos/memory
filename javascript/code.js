// Updated to use the .jpg local format extension
        const frogSpecies = [
            { name: "Ecuadoriaanse Gifkikker", file: "../kikker1.jpg" },
            { name: "Pacmanhoornkikker", file: "../kikker2.jpg" },
            { name: "Spookglaskikker", file: "../kikker3.jpg" },
            { name: "Gladiatorkikker", file: "../kikker4.jpg" },
            { name: "Amazone Aapmaki Kikker", file: "../kikker5.jpg" },
            { name: "Clownboomkikker", file: "../kikker6.jpg" },
            { name: "Rookbaskikker", file: "../kikker7.jpg" },
            { name: "Zuid-Amerikaanse Pad", file: "../kikker8.jpg" }
        ];

        let deck = [...frogSpecies, ...frogSpecies];
        let card1 = null;
        let card2 = null;
        let lockBoard = false;
        let moveCount = 0;

        const gameBoard = document.getElementById("game-board");
        const movesDisplay = document.getElementById("moves");

        function shuffle(array) {
            return array.sort(() => Math.random() - 0.5);
        }

        function createBoard() {
            gameBoard.innerHTML = "";
            shuffle(deck);
            card1 = null;
            card2 = null;
            lockBoard = false;
            
            deck.forEach((frog, index) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.dataset.name = frog.name;
                card.addEventListener("click", flipCard);

                card.innerHTML = `
                    <div class="card-face card-back">🐸</div>
                    <div class="card-face card-front">
                        <div class="frog-img-container">
                            <img class="frog-photo" src="${frog.file}" alt="${frog.name}" loading="eager">
                        </div>
                        <div class="frog-name">${frog.name}</div>
                    </div>
                `;
                
                gameBoard.appendChild(card);
            });
        }

        function flipCard() {
            if (lockBoard) return;
            if (this === card1) return;
            if (this.classList.contains("matched")) return;

            this.classList.add("flipped");

            if (!card1) {
                card1 = this;
                return;
            }

            card2 = this;
            moveCount++;
            movesDisplay.textContent = moveCount;

            checkMatch();
        }

        function checkMatch() {
            let isMatch = card1.dataset.name === card2.dataset.name;
            if (isMatch) {
                disableCards();
            } else {
                unflipCards();
            }
        }

        function disableCards() {
            card1.classList.add("matched");
            card2.classList.add("matched");
            resetTurn();
            
            setTimeout(() => {
                const allMatched = document.querySelectorAll(".card.matched").length === deck.length;
                if (allMatched) {
                    alert(`Gefeliciteerd! Je hebt alle kikkers gevonden in ${moveCount} beurten! 🏆`);
                }
            }, 500);
        }

        function unflipCards() {
            lockBoard = true;
            setTimeout(() => {
                card1.classList.remove("flipped");
                card2.classList.remove("flipped");
                resetTurn();
            }, 1100);
        }

        function resetTurn() {
            card1 = null;
            card2 = null;
            lockBoard = false;
        }

        function resetGame() {
            moveCount = 0;
            movesDisplay.textContent = moveCount;
            createBoard();
        }

        createBoard();