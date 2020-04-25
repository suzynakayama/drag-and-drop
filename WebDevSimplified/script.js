const draggables = document.querySelectorAll('.draggable');
const containers = document.querySelectorAll('.container');

const getDragAfterElement = (container, y) => {
  // spread the draggable elements inside the container in an array
  let draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')];

  return draggableElements.reduce((closest, element) => {

    // returns the size of an element and its position relative to the viewport
    const box = element.getBoundingClientRect();
    // console.log(box)

    // get the distance between the center of the box and the position of the mouse
    const offset = y - box.top - box.height / 2;
    // console.log(offset)    Below, numbers are positive, and negative when above

    // we only want offsets that are less than 0 and barely close to 0, so that means we are close to the middle of the element
    if (offset < 0 && offset > closest.offset) {
      return {
        offset: offset,
        element: element
      };
    } else {
      return closest;
    }

  },
    // use the minimum number possible, so all the offsets above will be smaller
    { offset: Number.NEGATIVE_INFINITY }).element;
};

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => draggable.classList.add('dragging'));
  draggable.addEventListener('dragend', () => draggable.classList.remove('dragging'));
});

containers.forEach(container => {
  container.addEventListener('dragover', evt => {
    // call event prevent default to change the cursor to be allow inside container
    evt.preventDefault();

    // call the function passing the container and the clientY which is the position Y of the mouse
    const afterElement = getDragAfterElement(container, evt.clientY);
    const draggable = document.querySelector('.dragging');

    // if we are above nothing, the afterElement will be null
    if (afterElement === null) {
      container.appendChild(draggable);
    } else {
      container.insertBefore(draggable, afterElement);
    }
  });
});
