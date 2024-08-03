// src/utils/draggable.js
export const makeModalDraggable = () => {
    const modal = document.querySelector('.modal-dialog');
    let isMouseDown = false;
    let offsetX, offsetY;

    modal.addEventListener('mousedown', (event) => {
        isMouseDown = true;
        const rect = modal.getBoundingClientRect();
        offsetX = event.clientX - rect.left;
        offsetY = event.clientY - rect.top;
    });

    document.addEventListener('mousemove', (event) => {
        if (isMouseDown) {
            modal.style.position = 'absolute';
            modal.style.left = `${event.clientX - offsetX}px`;
            modal.style.top = `${event.clientY - offsetY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
    });
};
