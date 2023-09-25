# News App Readme

This is a JavaScript code for a simple news application that fetches and displays news articles based on different categories. The code uses asynchronous functions and event listeners to populate news cards dynamically.

## How to Use

To use this code in your project, follow these steps:

1. Include the JavaScript code in your HTML file.

```html
<script src="news-app.js"></script>
```

2. Create an HTML structure with a container for news cards and buttons for different categories.

```html
<div id="container">
    <!-- News cards will be added here -->
</div>

<button class="menus" onclick="fetchNews('category1', 'Category 1')">Category 1</button>
<button class="menus" onclick="fetchNews('category2', 'Category 2')">Category 2</button>
<!-- Add more category buttons as needed -->
```

3. Ensure you have an HTML template for the news cards. This template should be placed inside a `<template>` tag with an `id` attribute.

```html
<template id="template-news-card">
    <div class="news-card">
        <h1></h1>
        <img src="" alt="News Image">
        <p></p>
        <div class="author"></div>
        <div class="published-date"></div>
        <div class="rating"></div>
        <div class="view"></div>
    </div>
</template>
```

4. Modify the `fetchNews` function to match your API endpoint. Replace `https://openapi.programming-hero.com/api/news/category/` with the URL of your news API.

```javascript
async function fetchNews(categoryId, categoryName) {
    try {
        const apiUrl = `https://your-api-url.com/news/${categoryId}`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.data;
    } catch (error) {
        console.error('Error fetching news data:', error);
        return null;
    }
}
```

5. Initialize the news app by adding event listeners to the category buttons. Make sure to replace `'category1'` and `'Category 1'` with your actual category identifiers and names.

```javascript
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.menus');
    categoryButtons.forEach((button) => {
        button.addEventListener('click', () => {
            const categoryId = button.getAttribute('onclick').split("'")[1];
            const categoryName = button.getAttribute('onclick').split("'")[3];
            fetchNews(categoryId, categoryName);
        });
    });
});
```

6. Customize the news card template and card population logic to match your design and data structure.

7. Test your news application by opening the HTML file in a web browser. Clicking on category buttons should load and display news articles dynamically.
