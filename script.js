
const STORAGE_KEY = "learn2code-data-v1";

const defaultData = {
    customCards: [],
    overrides: {},
    knownIds: [],
    notes: {}
};

function loadData() {
    try {
        const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));

        if (saved && typeof saved === "object") {
            return {
                ...defaultData,
                ...saved,
                customCards: Array.isArray(saved.customCards)
                    ? saved.customCards : [],
                overrides: saved.overrides &&
                    typeof saved.overrides === "object"
                    ? saved.overrides : {},
                knownIds: Array.isArray(saved.knownIds)
                    ? saved.knownIds : [],
                notes: saved.notes &&
                    typeof saved.notes === "object"
                    ? saved.notes : {}
            };
        }
    } catch (error) {
        console.warn("Unable to load saved data:", error);
    }

    return {
        ...defaultData,
        customCards: [],
        overrides: {},
        knownIds: [],
        notes: {}
    };
}

let data = loadData();

let currentIndex = 0;
let currentCardId = null;
let isEditing = false;
let editingCardId = null;

// Stores the order of cards in the current study session.
let filteredCards = [];

// Track which deck the current order belongs to.
let currentDeckKey = "";

// ==============================
// ELEMENT REFERENCES
// ==============================

const $ = (id) => document.getElementById(id);

const languageSelect = $("languageSelect");
const difficultySelect = $("difficultySelect");
const searchInput = $("searchInput");
const flashcard = $("flashcard");
const cardQuestion = $("cardQuestion");
const cardAnswer = $("cardAnswer");
const cardCode = $("cardCode");
const cardCounter = $("cardCounter");
const frontNumber = $("frontNumber");
const deckLabel = $("deckLabel");
const deckProgress = $("deckProgress");
const progressFill = $("progressFill");
const personalNote = $("personalNote");
const saveMessage = $("saveMessage");
const cardDialog = $("cardDialog");
const cardForm = $("cardForm");

// Create an empty-search message.
const emptyState = document.createElement("div");
emptyState.className = "empty-state";
emptyState.textContent =
    "No cards found. Try another search or create your own flashcard.";
emptyState.hidden = true;

cardCounter.insertAdjacentElement("afterend", emptyState);

// ==============================
// SAVE AND LOAD
// ==============================

function saveData() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        updateStats();
        return true;
    } catch (error) {
        console.error("Unable to save data:", error);
        return false;
    }
}

// ==============================
// CARD DATA
// ==============================

// Apply edits to starter cards without modifying cards.js.
function getEffectiveStarter(card) {
    const override = data.overrides[card.id];

    return override
        ? { ...card, ...override, id: card.id, starter: true }
        : card;
}

// Combine starter cards with cards created by the user.
function getAllCards() {
    const starterCards = window.STARTER_CARDS.map(getEffectiveStarter);

    return [...starterCards, ...data.customCards];
}

// ==============================
// SHUFFLE FUNCTION
// ==============================

// Fisher-Yates shuffle: randomly rearranges card positions.
function shuffleCards(cards) {
    const shuffled = [...cards];

    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));

        [shuffled[i], shuffled[j]] =
            [shuffled[j], shuffled[i]];
    }

    return shuffled;
}

// Get a unique key for the selected deck and search.
function getDeckKey() {
    return [
        languageSelect.value,
        difficultySelect.value,
        searchInput.value.trim().toLowerCase()
    ].join("|");
}

// Get cards that match the selected filters.
function getFilteredCards() {
    const language = languageSelect.value;
    const difficulty = difficultySelect.value;
    const search = searchInput.value.trim().toLowerCase();

    return getAllCards().filter((card) => {
        const matchesLanguage = card.language === language;
        const matchesDifficulty = card.difficulty === difficulty;

        const searchableText = [
            card.question,
            card.answer,
            card.code,
            card.language,
            card.difficulty
        ].join(" ").toLowerCase();

        const matchesSearch =
            !search || searchableText.includes(search);

        return matchesLanguage &&
            matchesDifficulty &&
            matchesSearch;
    });
}

// ==============================
// STATISTICS
// ==============================

function updateStats() {
    $("totalCount").textContent = window.STARTER_CARDS.length;
    $("knownCount").textContent = data.knownIds.length;
    $("customCount").textContent = data.customCards.length;
}

function updateProgress() {
    const deckCards = getAllCards().filter((card) =>
        card.language === languageSelect.value &&
        card.difficulty === difficultySelect.value
    );

    const mastered = deckCards.filter((card) =>
        data.knownIds.includes(card.id)
    ).length;

    deckLabel.textContent =
        `${languageSelect.value} · ${difficultySelect.value}`;

    deckProgress.textContent =
        `${mastered} / ${deckCards.length} mastered`;

    const percentage = deckCards.length
        ? (mastered / deckCards.length) * 100
        : 0;

    progressFill.style.width = `${percentage}%`;
}

// ==============================
// RENDER FLASHCARD
// ==============================

function renderCard() {
    const card = filteredCards[currentIndex];

    updateStats();
    updateProgress();

    if (!card) {
        currentCardId = null;

        flashcard.hidden = true;
        emptyState.hidden = false;

        cardCounter.textContent = "No matching cards";

        cardQuestion.textContent = "";
        cardAnswer.textContent = "";
        cardCode.textContent = "";

        $("flipBtn").disabled = true;
        $("prevBtn").disabled = true;
        $("nextBtn").disabled = true;
        $("knownBtn").disabled = true;
        $("reviewBtn").disabled = true;
        $("editCardBtn").disabled = true;
        $("saveNoteBtn").disabled = true;
        $("deleteCardBtn").hidden = true;

        personalNote.value = "";
        saveMessage.textContent =
            "Choose a card to write a personal note.";

        return;
    }

    currentCardId = card.id;

    flashcard.hidden = false;
    emptyState.hidden = true;

    $("flipBtn").disabled = false;
    $("prevBtn").disabled = false;
    $("nextBtn").disabled = false;
    $("knownBtn").disabled = false;
    $("reviewBtn").disabled = false;
    $("editCardBtn").disabled = false;
    $("saveNoteBtn").disabled = false;

    // Always display the front of a card after navigation.
    flashcard.classList.remove("is-flipped");
    $("flipBtn").textContent = "Reveal answer";

    cardQuestion.textContent = card.question;
    cardAnswer.textContent = card.answer;
    cardCode.textContent = card.code || "";

    cardCode.hidden = !card.code;

    frontNumber.textContent =
        String(currentIndex + 1).padStart(2, "0");

    cardCounter.textContent =
        `Card ${currentIndex + 1} of ${filteredCards.length}`;

    if (data.knownIds.includes(card.id)) {
        cardCounter.textContent += " · ✓ Mastered";
    }

    personalNote.value = data.notes[card.id] || "";

    saveMessage.textContent =
        "Your notes are saved in this browser.";

    // Only allow deleting custom cards.
    $("deleteCardBtn").hidden = Boolean(card.starter);
}

// ==============================
// NAVIGATION AND SHUFFLING
// ==============================

// Start a fresh deck when the language, difficulty,
// or search term changes.
function refreshDeck() {
    currentDeckKey = getDeckKey();
    filteredCards = getFilteredCards();
    currentIndex = 0;

    renderCard();
}

// Move between cards.
// Reaching the last card and clicking Next will shuffle
// the deck and start a new round at card 1.
function changeCard(direction) {
    if (!filteredCards.length) return;

    const lastIndex = filteredCards.length - 1;

    if (direction === 1 && currentIndex === lastIndex) {
        // Finished the current round.
        filteredCards = shuffleCards(filteredCards);
        currentIndex = 0;

    } else if (direction === -1 && currentIndex === 0) {
        // Going backwards from the first card also shuffles.
        filteredCards = shuffleCards(filteredCards);
        currentIndex = 0;

    } else {
        currentIndex += direction;
    }

    renderCard();
}

// ==============================
// FLIP ANIMATION
// ==============================

function flipCard() {
    if (!currentCardId) return;

    flashcard.classList.toggle("is-flipped");

    $("flipBtn").textContent =
        flashcard.classList.contains("is-flipped")
            ? "Show question"
            : "Reveal answer";
}

// ==============================
// MASTERY TRACKING
// ==============================

function markKnown() {
    if (!currentCardId) return;

    if (!data.knownIds.includes(currentCardId)) {
        data.knownIds.push(currentCardId);
        saveData();
    }

    renderCard();
}

function markForReview() {
    if (!currentCardId) return;

    data.knownIds = data.knownIds.filter(
        (id) => id !== currentCardId
    );

    saveData();
    renderCard();
}

// ==============================
// PERSONAL NOTES
// ==============================

function savePersonalNote() {
    if (!currentCardId) return;

    const note = personalNote.value.trim();

    if (note) {
        data.notes[currentCardId] = note;
    } else {
        delete data.notes[currentCardId];
    }

    const saved = saveData();

    saveMessage.textContent = saved
        ? "✓ Your personal note has been saved."
        : "Unable to save. Check your browser storage settings.";
}

// ==============================
// ADD NEW FLASHCARD
// ==============================

function openNewCardForm() {
    isEditing = false;
    editingCardId = null;

    cardForm.reset();

    $("dialogTitle").textContent = "Create a flashcard";
    $("formLanguage").value = languageSelect.value;
    $("formDifficulty").value = difficultySelect.value;

    cardDialog.showModal();
}

// ==============================
// EDIT FLASHCARD
// ==============================

function openEditCardForm() {
    const card = getAllCards().find(
        (item) => item.id === currentCardId
    );

    if (!card) return;

    isEditing = true;
    editingCardId = card.id;

    $("dialogTitle").textContent = "Edit flashcard";

    $("formLanguage").value = card.language;
    $("formDifficulty").value = card.difficulty;
    $("formQuestion").value = card.question;
    $("formAnswer").value = card.answer;
    $("formCode").value = card.code || "";

    cardDialog.showModal();
}

// ==============================
// SAVE FLASHCARD
// ==============================

function submitCardForm(event) {
    event.preventDefault();

    const cardDetails = {
        language: $("formLanguage").value,
        difficulty: $("formDifficulty").value,
        question: $("formQuestion").value.trim(),
        answer: $("formAnswer").value.trim(),
        code: $("formCode").value.trim()
    };

    if (!cardDetails.question || !cardDetails.answer) {
        return;
    }

    if (isEditing) {
        const starterCard = window.STARTER_CARDS.find(
            (card) => card.id === editingCardId
        );

        if (starterCard) {
            // Keep the original starter card unchanged.
            data.overrides[editingCardId] = cardDetails;
        } else {
            const customCard = data.customCards.find(
                (card) => card.id === editingCardId
            );

            if (customCard) {
                Object.assign(customCard, cardDetails);
            }
        }

        currentCardId = editingCardId;

    } else {
        const newCard = {
            id: `custom-${Date.now()}-${Math.random()
                .toString(36).slice(2, 8)}`,
            ...cardDetails,
            starter: false
        };

        data.customCards.push(newCard);
        currentCardId = newCard.id;
    }

    saveData();
    cardDialog.close();

    // Switch to the language and difficulty of the saved card.
    languageSelect.value = cardDetails.language;
    difficultySelect.value = cardDetails.difficulty;
    searchInput.value = "";

    currentDeckKey = getDeckKey();
    filteredCards = getFilteredCards();

    const savedIndex = filteredCards.findIndex(
        (card) => card.id === currentCardId
    );

    currentIndex = savedIndex >= 0 ? savedIndex : 0;

    renderCard();
}

// ==============================
// DELETE CUSTOM FLASHCARD
// ==============================

function deleteCustomCard() {
    const card = data.customCards.find(
        (item) => item.id === currentCardId
    );

    if (!card) return;

    const confirmed = window.confirm(
        "Delete this flashcard permanently from this browser?"
    );

    if (!confirmed) return;

    data.customCards = data.customCards.filter(
        (item) => item.id !== currentCardId
    );

    data.knownIds = data.knownIds.filter(
        (id) => id !== currentCardId
    );

    delete data.notes[currentCardId];

    saveData();

    refreshDeck();
}

// ==============================
// EVENT LISTENERS
// ==============================

flashcard.addEventListener("click", flipCard);

$("flipBtn").addEventListener("click", flipCard);

$("prevBtn").addEventListener("click", () => {
    changeCard(-1);
});

$("nextBtn").addEventListener("click", () => {
    changeCard(1);
});

$("knownBtn").addEventListener("click", markKnown);
$("reviewBtn").addEventListener("click", markForReview);

languageSelect.addEventListener("change", refreshDeck);
difficultySelect.addEventListener("change", refreshDeck);
searchInput.addEventListener("input", refreshDeck);

$("saveNoteBtn").addEventListener("click", savePersonalNote);
$("addCardBtn").addEventListener("click", openNewCardForm);
$("editCardBtn").addEventListener("click", openEditCardForm);
$("deleteCardBtn").addEventListener("click", deleteCustomCard);

cardForm.addEventListener("submit", submitCardForm);

$("closeDialogBtn").addEventListener("click", () => {
    cardDialog.close();
});

$("cancelDialogBtn").addEventListener("click", () => {
    cardDialog.close();
});

// ==============================
// KEYBOARD SHORTCUTS
// ==============================

document.addEventListener("keydown", (event) => {
    if (cardDialog.open) return;

    const tag = document.activeElement?.tagName;

    if (["INPUT", "TEXTAREA", "SELECT"].includes(tag)) {
        return;
    }

    if (event.key === "ArrowLeft") {
        changeCard(-1);
    } else if (event.key === "ArrowRight") {
        changeCard(1);
    } else if (event.code === "Space") {
        event.preventDefault();
        flipCard();
    }
});

// ==============================
// INITIAL SETUP
// ==============================

refreshDeck();
