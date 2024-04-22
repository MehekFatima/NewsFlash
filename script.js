async function getNewsData() {
    const apiKey = "e447aa1853e44067b2bb94b4e9fdfbc4";
    const url = `https://newsapi.org/v2/top-headlines?sources=google-news-in&apiKey=${apiKey}`;

    try {
        const response = await fetch(url, {
            method: "GET",
            mode: 'cors',
            referrerPolicy: 'no-referrer-when-downgrade'
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (data.status !== "ok") {
            throw new Error("Error in fetching news data.");
        }

        const newsList = data.articles;

        if (!newsList || newsList.length === 0) {
            throw new Error("No articles found.");
        }

        const newsContainer = document.getElementById("newsList");
        newsList.forEach(article => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${article.url}" target="_blank">${article.title}</a>`;
            newsContainer.appendChild(li);
        });
    } catch (error) {
        console.error("Error:", error);
    }
}

// Call the function when the popup is opened
document.addEventListener("DOMContentLoaded", getNewsData);