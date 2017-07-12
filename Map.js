function Map(rows, collumns) {
  this.SIZE = 32;
  this.enemies = [];
  this.cells = [];
  for (var r = 0; r < rows; r++) {
    this.cells[r] = [];
    for (var c = 0; c < collumns; c++) {
      this.cells[r][c] = 0;
    }
  }
}

Map.prototype.desenhar = function (ctx) {
  for (var r = 0; r < this.cells.length; r++) {
    for (var c = 0; c < this.cells[0].length; c++) {
      if(this.cells[r][c]==1){
        ctx.fillStyle = "brown";
        ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      else if(this.cells[r][c]==0 || this.cells[r][c]==2 || this.cells[r][c]==3) {
      	ctx.fillStyle = "gray";
	ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      else if(this.cells[r][c]==-1) {
      	ctx.fillStyle = "red";
	ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      else if(this.cells[r][c] == 4) {
      	ctx.fillStyle = "green";
	ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
      else {
      	ctx.fillStyle = "white";
	ctx.fillRect(c*this.SIZE, r*this.SIZE, this.SIZE, this.SIZE);
      }
    }
  }
};

Map.prototype.setCells = function (newCells) {
  for (var i = 0; i < newCells.length; i++) {
    for (var j = 0; j < newCells[i].length; j++) {
	this.cells[i][j] = newCells[i][j];
    }
  }
};

Map.prototype.mover = function (dt) {
};
