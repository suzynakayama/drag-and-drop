const fill = document.querySelector('.fill');
const empties = document.querySelectorAll('.empty');

// Fill Listeners
fill.addEventListener('dragstart', dragStart);
fill.addEventListener('dragend', dragEnd);

// Loop through Empties and call drag events
for (let empty of empties) {
  empty.addEventListener('dragover', dragOver);
  empty.addEventListener('dragenter', dragEnter);
  empty.addEventListener('dragleave', dragLeave);
  empty.addEventListener('drop', dragDrop);
}

// Drag Functions
function dragStart() {
  this.className += " hold";
  setTimeout(() => (this.className = 'invisible'), 0);
};

function dragEnd() {
  this.className = 'fill';
};

function dragOver(evt) {
  evt.preventDefault();
};

function dragEnter(evt) {
  evt.preventDefault();
  this.className += ' hovered';
};

function dragLeave() {
  this.className = 'empty';
};

function dragDrop() {
  this.className = 'empty';
  this.append(fill);
};