const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

const getDragAfterElement = (container, y) => {
  let draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, element) => {
    const box = element.getBoundingClientRect();
    // console.log(box)
    const offset = y - box.top - box.height / 2;
    // console.log(offset)    Below, numbers are positive, and negative when above

    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: element
      };
    } else {
      return closest;
    }

  },
    { offset: Number.NEGATIVE_INFINITY }).element;
};

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
  draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
});

containers.forEach(container => {
  container.addEventListener('dragover', evt => {
    evt.preventDefault();
    const afterElement = getDragAfterElement(container, evt.clientY);
    const draggable = document.querySelector('.dragging');
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});
