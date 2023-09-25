async function fetchNewsData(categoryId) {
    try {
        const apiUrl = `https://openapi.programming-hero.com/api/news/category/${categoryId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching news data:', error);
        return null;
    }
}

// Function to populate news cards
function populateNewsCards(categoryId, categoryName) {
    const container = document.getElementById('container');
    const template = document.getElementById('template-news-card');

    fetchNewsData(categoryId)
        .then((articleData) => {
            if (articleData) {
                articleData.forEach((article) => {
                    const clonedCard = template.content.cloneNode(true);
                    clonedCard.querySelector('h1').textContent = article.title;

                    const detailsParagraph = clonedCard.querySelector('p');
                    detailsParagraph.textContent = article.details;

                    // Check if article details are longer than 40 words
                    if (article.details.split(' ').length > 40) {
                        // Truncate the details to the first 40 words and add "Read More" link
                        const truncatedDetails = article.details.split(' ').slice(0, 40).join(' ');
                        detailsParagraph.textContent = truncatedDetails + '...';

                        // Add a "Read More" link
                        const readMoreLink = document.createElement('a');
                        readMoreLink.href = article.url; // Assuming 'article.url' contains the full article URL
                        readMoreLink.target = '_blank';
                        readMoreLink.textContent = 'Read More';
                        detailsParagraph.appendChild(readMoreLink);
                    }

                    clonedCard.querySelector('img').src = article.image_url;
                    clonedCard.querySelector('.author').textContent = `Author: ${article.author.name}`;
                    clonedCard.querySelector('.published-date').textContent = `Published Date: ${article.author.published_date}`;
                    clonedCard.querySelector('.rating').textContent = `Rating: ${article.rating.number} (${article.rating.badge})`;
                    clonedCard.querySelector('.view').textContent = `Views: ${article.total_view}`;
                    container.appendChild(clonedCard);
                });
            } else {
                console.error('No data received from the API.');
            }
        })
        .catch((error) => {
            console.error('Error populating news cards:', error);
        });
}

// Add event listeners to category buttons
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.menus');
    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const categoryId = button.getAttribute('onclick').split("'")[1];
            const categoryName = button.getAttribute('onclick').split("'")[3];
            populateNewsCards(categoryId, categoryName);
        });
    });
});
