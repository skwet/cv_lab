function displaySystemInfo() {
    const systemInfo = {
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        language: navigator.language,
        screenResolution: `${window.screen.width}x${window.screen.height}`,
        timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone
    };

    localStorage.setItem('systemInfo', JSON.stringify(systemInfo));

    const infoDiv = document.createElement('div');
    infoDiv.className = 'system-info';

    infoDiv.innerHTML = `
        <h3>Системна інформація</h3>
        <p>User Agent: ${systemInfo.userAgent}</p>
        <p>Platform: ${systemInfo.platform}</p>
        <p>Language: ${systemInfo.language}</p>
        <p>Screen Resolution: ${systemInfo.screenResolution}</p>
        <p>Time Zone: ${systemInfo.timeZone}</p>
    `;

    const footer = document.querySelector('.social-footer');
    if (footer) {
        footer.parentNode.insertBefore(infoDiv, footer); 
    }
}

async function fetchComments() {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/5/comments');
    const comments = await response.json();

    const commentsSection = document.createElement('div');
    commentsSection.className = 'comments-section';
    commentsSection.innerHTML = '<h2>Коментарі</h2>';

    comments.forEach(comment => {
        const commentDiv = document.createElement('div');
        commentDiv.className = 'comment';
        commentDiv.innerHTML = `
            <div class="comment-header">
                <p id="comment-name"><strong>${comment.name}</strong></p>
                <p id="comment-email">${comment.email}</p>
            </div>
            <p id="comment-body">${comment.body}</p>
        `;
        commentsSection.appendChild(commentDiv);
    });

    const footer = document.querySelector('.footer-container');
    footer.parentNode.insertBefore(commentsSection, footer); 
}


function showFeedbackModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h2>Форма зворотнього зв'язку</h2>
            <form action="https://formspree.io/f/mnndqrpk" method="POST">
                <input type="text" name="name" placeholder="Ім'я" required>
                <input type="email" name="email" placeholder="Email" required>
                <input type="tel" name="phone" placeholder="Номер телефону" required>
                <textarea name="comment" placeholder="Коментар" required></textarea>
                <button type="submit">Send</button>
            </form>
        </div>
    `;
    document.body.appendChild(modal);

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
}

setTimeout(showFeedbackModal, 60000);

function toggleTheme() {
    const body = document.body;
    body.classList.toggle('night-theme');
    localStorage.setItem('theme', body.classList.contains('night-theme') ? 'night' : 'day');
}

function setAutoTheme() {
    const hour = new Date().getHours();
    const isNight = hour < 7 || hour >= 21;
    const body = document.body;

    if (isNight) {
        body.classList.add('night-theme');
    } else {
        body.classList.remove('night-theme');
    }

    localStorage.setItem('theme', isNight ? 'night' : 'day');
}

function createThemeToggle() {
    const header = document.querySelector('header');
    const toggleButton = document.createElement('button');
    toggleButton.textContent = 'Переключити тему';
    toggleButton.className = 'theme-toggle';
    toggleButton.addEventListener('click', toggleTheme);
    header.appendChild(toggleButton);
}

fetchComments();
displaySystemInfo();
setAutoTheme();
createThemeToggle();

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'night') {
    document.body.classList.add('night-theme');
}
