class Minesweeper {
    constructor() {
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.mines = [];
        this.gameOver = false;
        this.gameWon = false;
        this.timer = 0;
        this.timerInterval = null;
        this.firstClick = true;
        
        this.difficulties = {
            easy: { rows: 9, cols: 9, mines: 10 },
            medium: { rows: 16, cols: 16, mines: 40 },
            hard: { rows: 16, cols: 30, mines: 99 }
        };
        
        this.currentDifficulty = 'medium';
        this.init();
    }
    
    init() {
        this.setupEventListeners();
        this.newGame();
    }
    
    setupEventListeners() {
        document.getElementById('new-game').addEventListener('click', () => this.newGame());
        document.getElementById('difficulty').addEventListener('change', (e) => {
            this.currentDifficulty = e.target.value;
            this.newGame();
        });
        document.getElementById('modal-restart').addEventListener('click', () => {
            this.hideModal();
            this.newGame();
        });
    }
    
    newGame() {
        this.stopTimer();
        this.timer = 0;
        this.updateTimer();
        this.gameOver = false;
        this.gameWon = false;
        this.firstClick = true;
        
        const { rows, cols, mines } = this.difficulties[this.currentDifficulty];
        this.rows = rows;
        this.cols = cols;
        this.mineCount = mines;
        
        this.initializeBoard();
        this.renderBoard();
        this.updateStats();
    }
    
    initializeBoard() {
        this.board = [];
        this.revealed = [];
        this.flagged = [];
        this.mines = [];
        
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            this.revealed[i] = [];
            this.flagged[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i][j] = 0;
                this.revealed[i][j] = false;
                this.flagged[i][j] = false;
            }
        }
    }
    
    placeMines(excludeRow, excludeCol) {
        let minesPlaced = 0;
        while (minesPlaced < this.mineCount) {
            const row = Math.floor(Math.random() * this.rows);
            const col = Math.floor(Math.random() * this.cols);
            
            if (this.board[row][col] !== -1 && !(row === excludeRow && col === excludeCol)) {
                this.board[row][col] = -1;
                this.mines.push({ row, col });
                minesPlaced++;
                
                for (let dr = -1; dr <= 1; dr++) {
                    for (let dc = -1; dc <= 1; dc++) {
                        if (dr === 0 && dc === 0) continue;
                        const nr = row + dr;
                        const nc = col + dc;
                        if (nr >= 0 && nr < this.rows && nc >= 0 && nc < this.cols && this.board[nr][nc] !== -1) {
                            this.board[nr][nc]++;
                        }
                    }
                }
            }
        }
    }
    
    renderBoard() {
        const boardElement = document.getElementById('game-board');
        boardElement.innerHTML = '';
        boardElement.style.gridTemplateColumns = `repeat(${this.cols}, 1fr)`;
        
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                const cell = document.createElement('button');
                cell.className = 'cell';
                cell.dataset.row = i;
                cell.dataset.col = j;
                
                cell.addEventListener('click', (e) => this.handleCellClick(e));
                cell.addEventListener('contextmenu', (e) => this.handleRightClick(e));
                
                boardElement.appendChild(cell);
            }
        }
    }
    
    handleCellClick(e) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        if (this.gameOver || this.flagged[row][col]) return;
        
        if (this.firstClick) {
            this.firstClick = false;
            this.placeMines(row, col);
            this.startTimer();
        }
        
        this.revealCell(row, col);
    }
    
    handleRightClick(e) {
        e.preventDefault();
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        
        if (this.gameOver || this.revealed[row][col]) return;
        
        this.flagged[row][col] = !this.flagged[row][col];
        this.updateCell(row, col);
        this.updateStats();
    }
    
    revealCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) return;
        if (this.revealed[row][col] || this.flagged[row][col]) return;
        
        this.revealed[row][col] = true;
        this.updateCell(row, col);
        
        if (this.board[row][col] === -1) {
            this.gameOver = true;
            this.stopTimer();
            this.revealAllMines();
        } else if (this.board[row][col] === 0) {
            for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                    if (dr === 0 && dc === 0) continue;
                    this.revealCell(row + dr, col + dc);
                }
            }
        }
        
        this.checkWin();
    }
    
    updateCell(row, col) {
        const cell = document.querySelector(`[data-row="${row}"][data-col="${col}"]`);
        
        if (this.flagged[row][col]) {
            cell.classList.add('flagged');
            cell.textContent = '🚩';
        } else {
            cell.classList.remove('flagged');
            cell.textContent = '';
            
            if (this.revealed[row][col]) {
                cell.classList.add('revealed');
                if (this.board[row][col] === -1) {
                    cell.classList.add('mine');
                    cell.textContent = '💣';
                } else if (this.board[row][col] > 0) {
                    cell.textContent = this.board[row][col];
                    cell.classList.add(`number-${this.board[row][col]}`);
                }
            }
        }
    }
    
    revealAllMines() {
        for (const mine of this.mines) {
            this.revealed[mine.row][mine.col] = true;
            this.updateCell(mine.row, mine.col);
        }
    }
    
    checkWin() {
        let cellsToReveal = 0;
        let cellsRevealed = 0;
        
        for (let i = 0; i < this.rows; i++) {
            for (let j = 0; j < this.cols; j++) {
                if (this.board[i][j] !== -1) {
                    cellsToReveal++;
                    if (this.revealed[i][j]) {
                        cellsRevealed++;
                    }
                }
            }
        }
        
        if (cellsRevealed === cellsToReveal) {
            this.gameWon = true;
            this.gameOver = true;
            this.stopTimer();
            this.showModal('Congratulations! 🎉', `You won in ${this.timer} seconds!`);
        }
    }
    
    updateStats() {
        const flagCount = this.flagged.flat().filter(f => f).length;
        document.getElementById('mine-count').textContent = this.mineCount - flagCount;
        document.getElementById('flag-count').textContent = flagCount;
    }
    
    startTimer() {
        this.timerInterval = setInterval(() => {
            this.timer++;
            this.updateTimer();
        }, 1000);
    }
    
    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }
    
    updateTimer() {
        document.getElementById('timer').textContent = String(this.timer).padStart(3, '0');
    }
    
    showModal(title, message) {
        document.getElementById('modal-title').textContent = title;
        document.getElementById('modal-message').textContent = message;
        document.getElementById('game-over-modal').classList.remove('hidden');
    }
    
    hideModal() {
        document.getElementById('game-over-modal').classList.add('hidden');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new Minesweeper();
});