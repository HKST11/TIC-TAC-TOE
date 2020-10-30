class Game{
    constructor(){
      this.elements={
        turnElement: document.getElementById("turn"),
        table: document.querySelector(".grid"),
        gridCells : document.querySelectorAll(".cell"),
        resetButton: document.querySelector("button"),
        msgElement: document.getElementById("msg")
      }
      this.init();
      this.addEventListeners();
    }
  
    init = () => {
      this.state = {
        currPlayer: true, //true=> X, false=> O
        alreadyClicked: [false,false,false,false,false,false,false,false,false],
        clickedCellsCount: 0,
        isWinnerX: false,
        isWinnerO: false,
        tied: false,
        winningCombo: {
          one: [0,1,2],
          two: [3,4,5],
          three: [6,7,8],
          four: [0,3,6],
          five: [1,4,7],
          six: [2,5,8],
          seven: [0,4,8],
          eight: [2,4,6]
        },
        posX: new Set(),
        posO: new Set()
      }
      this.elements.gridCells.forEach(cell=>{cell.classList.add("shadow")});
    }
  
    addEventListeners = ()=>{
      this.elements.gridCells.forEach((cell)=>{
        cell.addEventListener('click',this.gotClicked)
      })
      this.elements.resetButton.addEventListener('click',this.resetGame)
    }
    
    gotClicked = (event)=>{
      if(this.state.alreadyClicked[event.target.id]) return;
  
      this.state.clickedCellsCount++;
      this.checkStatus(event.target.id);
      this.state.alreadyClicked[event.target.id] = true;
      this.state.currPlayer = !this.state.currPlayer
    }
  
    checkStatus = (index)=>{
      if(this.state.currPlayer){
        this.state.posX.add(parseInt(index));
        this.state.isWinnerX = Object.values(this.state.winningCombo).some((criteria)=>criteria.every(value=>this.state.posX.has(value)));
      }
      if(!this.state.currPlayer){
        this.state.posO.add(parseInt(index));
        this.state.isWinnerO = Object.values(this.state.winningCombo).some((criteria)=>criteria.every(value=>this.state.posO.has(value)));
      }
      if((!this.state.isWinnerX)&&(!this.state.isWinnerO)&&(this.state.clickedCellsCount===9)) this.state.tied = true;

      if((this.state.isWinnerX)||(this.state.isWinnerO)||(this.state.tied)) this.state.alreadyClicked.forEach((item,ind)=>{this.state.alreadyClicked[ind]=true});
  
      this.render(index);
    }
  
    resetGame = ()=>{
      this.init();
      this.render();
    }
  
    render = (index)=>{
      if(index){
        document.getElementById(index).innerText = `${this.state.currPlayer?"X":"O"}`
        document.getElementById(index).classList.remove("shadow")
        this.elements.turnElement.innerText = `Next Turn: ${this.state.currPlayer?"O":"X"}`
      }
      else {
        this.elements.gridCells.forEach((cell)=>cell.innerText="");
        this.elements.msgElement.innerText = ""
        this.elements.turnElement.innerText = `Next Turn: X`
      }
  
      if(this.state.isWinnerX){
        this.elements.msgElement.innerText = `Congratulations Player X, you Win!`
        this.elements.turnElement.innerText = ""
      }
      if(this.state.isWinnerO){
        this.elements.msgElement.innerText = `Congratulations Player O, you Win!`
        this.elements.turnElement.innerText = ""
      }
      if(this.state.tied){
        this.elements.msgElement.innerText = `It's a Tie!`
        this.elements.turnElement.innerText = ""
      }
    }
  }
  new Game();