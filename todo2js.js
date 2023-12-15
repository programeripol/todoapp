document.addEventListener("DOMContentLoaded", function () {


    // Initial delay before starting the animation
    setTimeout(function () {
        fadeWelcomeLines();
    }, 1000); // 1000 milliseconds (1 second)

    function fadeWelcomeLines() {
        const line1 = document.getElementById('welcome-line1');
        const line2 = document.getElementById('welcome-line2');
        const h2 = document.querySelector('h2');
        const todoContainer = document.getElementById('todo-container');

        // Hide line 1, h2, and to-do container initially
        hideElement(line1);
        hideElement(h2);
        hideElement(todoContainer);

        // Fade in line 1
        fadeIn(line1, function () {
            // Pause for 1 second
            setTimeout(function () {
                // Fade out line 1 and pause for 0.9 seconds
                fadeOutAndPause(line1, 900, function () {
                    // Fade in line 2 and pause for 2 seconds
                    fadeInAndPause(line2, 2000, function () {
                        // Fade out line 2 and pause for 0.5 seconds
                        fadeOutAndPause(line2, 500, function () {
                            // Fade in to-do container and h2
                            fadeIn(todoContainer);
                            fadeIn(h2);
                        });
                    });
                });
            }, 1000);
        });
    }

    function hideElement(element) {
        element.style.opacity = 0;
    }

    function fadeIn(element, callback) {
        element.style.opacity = 1;
        element.style.transition = 'opacity 1s ease-in-out';
        setTimeout(callback, 800); // Adjust the timeout to match the transition duration
    }

    function fadeOutAndPause(element, pauseDuration, callback) {
        element.style.opacity = 0;
        element.style.transition = 'opacity 0.7s ease-in-out';
        setTimeout(callback, pauseDuration);
    }

    function fadeInAndPause(element, pauseDuration, callback) {
        element.style.opacity = 1;
        element.style.transition = 'opacity 0.7s ease-in-out';
        setTimeout(callback, pauseDuration);
    }

    // Add event listener for the "Enter" key press on the input field
    document.getElementById('new-todo').addEventListener('keyup', function (event) {
        if (event.key === 'Enter') {
            addTodo();
        }
    });
});




// JavaScript for adding new to-do items
function addTodo() {
    // Get the value from the input field
    const todoText = document.getElementById('new-todo').value.trim();

    // Check if the input is not empty and the maximum limit is not reached
    const todoList = document.getElementById('todo-list');
    if (todoText !== '' && todoList.children.length < 7) {
        // Create a new list item
        const newTodoItem = createTodoElement(todoText);

        // Add the new item to the todo list
        todoList.appendChild(newTodoItem);

        // Clear the input field
        document.getElementById('new-todo').value = '';
    } else if (todoList.children.length >= 7) {
        // Display a message when attempting to add the 8th item
        alert("Did you know about Miller's Law? It suggests that our brains handle around seven items effectively. That's why we limit our to-do list to 7 items—it helps prevent overwhelm, making it easier to focus and prioritize. This balance keeps productivity up without juggling too much at once.");
    }
}


// Update the JavaScript for marking a to-do item as done
function toggleCompleted(event) {
    const todoItem = event.target.parentNode;
    todoItem.classList.toggle('completed');

    // Add starburst confetti when checkbox is checked
    if (event.target.checked) {
        createConfetti(todoItem);
    }
}

// Improved confetti animation
function createConfetti(todoItem) {
    const confettiContainer = document.createElement('div');
    confettiContainer.classList.add('confetti-container');
    todoItem.appendChild(confettiContainer);

    for (let i = 0; i < 1000; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');
        setConfettiStyles(confetti);
        confettiContainer.appendChild(confetti);
    }

    // Remove confetti container after the animation ends
    confettiContainer.addEventListener('animationend', () => {
        confettiContainer.remove();
    });
}

// Set confetti styles as before
function setConfettiStyles(confetti) {
    const angle = Math.random() * 360;
    const distance = Math.random() * 100;
    const leftPosition = Math.cos(angle) * distance;
    const topPosition = Math.sin(angle) * distance;
    confetti.style.left = `${leftPosition}vw`;
    confetti.style.top = `${topPosition}vh`;
    confetti.style.backgroundColor = getRandomBrightColor();
    confetti.style.animationDuration = `${Math.random() * 1 + 0.5}s`; /* Adjust the animation duration */
}

function getRandomBrightColor() {
    const colors = ['#ff0000', '#ffff00', '#0000ff', '#800080']; /* Add more colors as needed */
    return colors[Math.floor(Math.random() * colors.length)];
}

// Add this inside your JavaScript code where you trigger the confetti animation
document.body.classList.add('confetti-active');

// Remove this inside your JavaScript code when the confetti animation is complete
document.body.classList.remove('confetti-active');




// JavaScript for deleting a to-do item
function deleteTodo(event) {
    const todoItem = event.target.parentNode;
    todoItem.remove();
}

function createTodoElement(todoText) {
    const newTodoItem = document.createElement('li');
    newTodoItem.innerHTML = `
        <input type="checkbox" class="todo-checkbox" onchange="toggleCompleted(event)">
        <label>${todoText}</label>
        <button onclick="deleteTodo(event)">Delete</button>
    `;

    return newTodoItem;
}

/* da se vidi text do kraja ak je predugačak */
newTodoItem.innerHTML = `
    <input type="checkbox" class="todo-checkbox" onchange="toggleCompleted(event)">
    <label data-full-text="${todoText}">${todoText}</label>
    <button onclick="deleteTodo(event)">Delete</button>
`;

  // Get all draggable elements
  const todoList = document.getElementById('todo-list');

    // Add dragstart event listener to each draggable item
    todoList.addEventListener('dragstart', handleDragStart);
    todoList.addEventListener('dragover', handleDragOver);
    todoList.addEventListener('drop', handleDrop);
    function handleDragStart(e) {
        // Set the data being dragged (you can use any data)
        e.dataTransfer.setData("text/plain", e.target.id);
    }
    
    function handleDragOver(e) {
        e.preventDefault();
    }
    
    function handleDrop(e) {
        e.preventDefault();
    
        // Get the dragged data
        const data = e.dataTransfer.getData("text/plain");
    
        // Find the drop target
        const dropTarget = e.target.closest('li');
    
        // If there's a drop target, swap the positions of the dragged item and the drop target
        if (dropTarget) {
            const draggedItem = document.getElementById(data);
            const dropTargetIndex = Array.from(dropTarget.parentNode.children).indexOf(dropTarget);
            const draggedItemIndex = Array.from(draggedItem.parentNode.children).indexOf(draggedItem);
    
            // Swap positions
            if (draggedItemIndex < dropTargetIndex) {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget.nextSibling);
            } else {
                dropTarget.parentNode.insertBefore(draggedItem, dropTarget);
            }
    
            // Update the order of the to-do items
            updateTodoOrder();
        }
    }
    
    // Function to update the order of the to-do items
    function updateTodoOrder() {
        const todoList = document.getElementById('todo-list');
        const todoItems = todoList.children;
    
        // Loop through the to-do items and update their order
        for (let i = 0; i < todoItems.length; i++) {
            const todoItem = todoItems[i];
            // Update the order information in your data model or perform any necessary actions
        }
    }