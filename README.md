# Source Sync



**Source Sync** is a web application that uses AI to perform a deep, contextual analysis comparing an anime adaptation to its original source material (e.g., a manga or light novel). It goes beyond simple text matching to identify and explain the narrative significance of scenes, character moments, and entire "mini-arcs" that were cut or altered in the anime adaptation.

This tool answers the common fan question: **"What did the anime leave out?"**

***

## ✨ Key Features

* **Effortless Comparison:** A simple, clean interface for users to upload an anime's subtitle file (`.srt`) and the corresponding source material (`.txt`).
* **AI-Powered Semantic Match:** The system uses a sophisticated AI pipeline to intelligently find all text from the source novel that has no matching equivalent in the anime's dialogue.
* **Thematic Clustering:** To preserve context, the application uses K-Means clustering to automatically group related missing scenes by topic (e.g., "Character Backstory," "Political Subplot").
* **Narrative Arc Analysis:** Each thematic cluster is analyzed by a Large Language Model which acts as a "story editor," summarizing the significant *scenes* and *mini-arcs* that were cut and explaining their importance.
* **Structured Reporting:** The final output is a clean, categorized report presented to the user, breaking down the missing content into categories like "Character Development," "World Building," or "Side Plots."

***

## 🚀 Tech Stack

Source Sync is built as a modern, scalable web application with a clear separation between the frontend and backend.

* **Frontend:** A responsive user interface built with **React** and **TypeScript**, designed for a seamless file upload and results-viewing experience.
* **Backend:** A powerful **Python** server using the **Flask** framework to handle API requests.
* **AI Pipeline:** A sophisticated pipeline leveraging **TensorFlow**, **TensorFlow Hub**, **FAISS**, **scikit-learn**, and the **Google Gemini API** for its analysis.
* **Deployment:** The application is containerized with **Docker** and designed for scalable cloud deployment on **Render**.

***

## ⚙️ How It Works

The application's backend executes a sophisticated, multi-stage pipeline:

1.  **Semantic Matching:** The system parses the subtitle file and uses **TensorFlow's Universal Sentence Encoder** to convert both the subtitle dialogue and the source text into vector embeddings. Using **FAISS**, it performs a similarity search to find all segments from the source material that have no corresponding match in the anime subtitles.
2.  **Topical Clustering:** A list of missing text lacks context. To solve this, the application uses the **K-Means clustering algorithm** on the embeddings of the missing segments. This groups the text into thematic clusters, ensuring related scenes are analyzed together.
3.  **Narrative Analysis with an LLM:** Each thematic cluster of text is sent to **Google's Gemini 1.5 Flash**. The LLM is given the role of a "skilled story editor" and is prompted to summarize the significant "scenes or mini-arcs" from each cluster, explaining their narrative purpose.
4.  **Structured Reporting:** The raw analysis from the LLM is fed back into the model one last time with a prompt to structure the findings into a clean **JSON object**. This JSON is what the frontend receives and displays to the user.

***

## 🛠️ Local Development Setup

To run this project locally, you will need Python 3.11, Node.js, and Docker installed.

### Backend Setup

1.  **Navigate to the backend directory:**
    ```bash
    cd backend
    ```
2.  **Create and activate a Python virtual environment:**
    ```bash
    # Create the environment
    python3 -m venv venv

    # Activate on macOS/Linux
    source venv/bin/activate

    # Activate on Windows (PowerShell)
    .\venv\Scripts\Activate.ps1
    ```
3.  **Install the required libraries:**
    ```bash
    pip install -r requirements.txt
    ```
4.  **Download NLTK data (one-time setup):**
    ```bash
    python -c "import nltk; nltk.download('punkt')"
    ```
5.  **Create a `.env` file** in the `backend` directory and add your API key:
    ```
    GEMINI_API_KEY=your_secret_api_key_here
    ```
6.  **Run the Flask development server:**
    ```bash
    flask --app app run
    ```
    The backend will be running at `http://localhost:5000`.

### Frontend Setup

1.  **Navigate to the frontend directory in a new terminal:**
    ```bash
    cd frontend
    ```
2.  **Install the required Node.js packages:**
    ```bash
    npm install
    ```
3.  **Run the React development server:**
    ```bash
    npm start
    ```
    The frontend will be running at `http://localhost:3000` (or another specified port).

***

## 📜 License

This project is licensed under the **Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License**. This means you are free to share and adapt the work for non-commercial purposes, provided you give appropriate credit and distribute your contributions under the same license.

