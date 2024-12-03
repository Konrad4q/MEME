const memeImage = document.getElementById("meme-img");
const memeText = document.getElementById("meme-text");
const tweetButton = document.getElementById("tweet-meme");
const darkModeButton = document.getElementById("dark-mode-toggle");

// Funkcja pobierania losowego mema
async function getRandomMeme() {
    try {
        // Pobranie losowego mema z API
        const response = await fetch("https://api.imgflip.com/get_memes");
        const data = await response.json();

        if (data.success) {
            const memes = data.data.memes;
            const randomMeme = memes[Math.floor(Math.random() * memes.length)];
            return randomMeme;
        } else {
            throw new Error("Nie udało się pobrać memów");
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

// Zmienianie trybu ciemnego
darkModeButton.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    document.querySelector(".container").classList.toggle("dark-mode");
    document.querySelectorAll("button").forEach(btn => btn.classList.toggle("dark-mode"));
    document.querySelectorAll("a").forEach(a => a.classList.toggle("dark-mode"));
});

// Losowanie nowego mema
document.getElementById("new-meme").addEventListener("click", async () => {
    const meme = await getRandomMeme();

    if (meme) {
        memeImage.src = meme.url;
        memeText.textContent = meme.name;
        tweetButton.href = `https://twitter.com/intent/tweet?text=Zobacz ten mem: ${meme.name}&url=${meme.url}`;
    }
});
