import time
import math
import numpy as np
import faiss
import tensorflow_hub as hub
from nltk.tokenize import sent_tokenize, word_tokenize
import pysrt
from sklearn.cluster import KMeans
import google.generativeai as genai
import json
import nltk

# --- ONE-TIME SETUP ---
# Run these two lines once in your terminal or a separate setup script
# to download the necessary NLTK data.
# python -c "import nltk; nltk.download('punkt')"

def parse_subtitle_file(subtitle_content):
    """Parses a .srt subtitle file's content and extracts dialogue."""
    print("⚙️  Running: Subtitle Parsing...")
    try:
        subs = pysrt.from_string(subtitle_content)
        return " ".join([sub.text for sub in subs])
    except Exception as e:
        print(f"❌ Error parsing subtitle content: {e}")
        return None

def segment_text(text, is_source_text=False):
    """Splits text into meaningful segments."""
    print("⚙️  Running: Text Segmentation...")
    if is_source_text:
        segments = [p.strip() for p in text.split('\n') if p.strip()]
    else:
        segments = sent_tokenize(text)
    return [s for s in segments if len(word_tokenize(s)) > 3]

def find_matches(source_segments, transcript_segments):
    """Generates embeddings and finds matches between segments."""
    print("⚙️  Running: Semantic Matching...")
    model_url = "https://tfhub.dev/google/universal-sentence-encoder/4"
    model = hub.load(model_url)
    
    source_embeddings = model(source_segments).numpy()
    transcript_embeddings = model(transcript_segments).numpy()
    
    dimension = source_embeddings.shape[1]
    faiss.normalize_L2(source_embeddings)
    index = faiss.IndexFlatIP(dimension)
    index.add(source_embeddings)
    
    faiss.normalize_L2(transcript_embeddings)
    distances, indices = index.search(transcript_embeddings, k=1)
    
    return distances, indices, source_embeddings

def analyze_and_structure_report(missing_segments, missing_embeddings, api_key):
    """Clusters missing text, analyzes it with an LLM, and structures the final report."""
    print("⚙️  Running: LLM Analysis and Reporting...")
    genai.configure(api_key=api_key)
    model = genai.GenerativeModel('gemini-1.5-flash-latest')

    n_clusters = min(5, len(missing_segments))
    if n_clusters <= 1:
        clusters = {0: missing_segments}
    else:
        kmeans = KMeans(n_clusters=n_clusters, random_state=42, n_init='auto').fit(missing_embeddings)
        clusters = {i: [] for i in range(n_clusters)}
        for i, segment in enumerate(missing_segments):
            clusters[kmeans.labels_[i]].append(segment)

    full_analysis_text = ""
    for i, segments in clusters.items():
        if not segments: continue
        
        cluster_text = "\n\n---\n\n".join(segments)
        prompt = f"""
        You are a story editor. Read the following text, which was cut from an anime adaptation.
        Your goal is to identify the significant scenes or 'mini-arcs'.
        For each significant scene, write a short summary (2-3 sentences) explaining what happens and its narrative purpose.
        Ignore trivial details. Focus on story beats.

        TEXT CHUNK:
        ---
        {cluster_text}
        ---

        Summarize the significant missing scenes or mini-arcs below:
        """
        try:
            response = model.generate_content(prompt)
            full_analysis_text += f"\n\n--- Topic Cluster {i+1} ---\n{response.text}"
            time.sleep(20) # Delay to manage request frequency
        except Exception as e:
            print(f"❌ Error analyzing cluster {i+1}: {e}")

    structuring_prompt = f"""
    Based on the following detailed analysis of missing content, structure the output into a JSON object.
    The JSON should have two keys: "summary" (a string summarizing the total findings) and "categories" (an array of objects).
    Each object in "categories" should have "title" (string, e.g., "Character Backstory"), "missing" (integer representing the number of items in that category), and "description" (string, a summary of that category's missing content).
    Infer the category titles and counts from the analysis.

    ANALYSIS TEXT:
    ---
    {full_analysis_text}
    ---

    JSON OUTPUT:
    """
    try:
        structured_response = model.generate_content(structuring_prompt)
        json_string = structured_response.text.strip().replace("```json", "").replace("```", "")
        return json.loads(json_string)
    except Exception as e:
        print(f"❌ Error structuring JSON: {e}")
        return {"summary": "Analysis complete, but failed to structure the report.", "categories": []}

def run_pipeline(subtitle_content, source_content, api_key):
    """The main pipeline function that orchestrates the entire analysis."""
    print("🚀 Starting analysis pipeline...")
    
    transcript_text = parse_subtitle_file(subtitle_content)
    if not transcript_text:
        raise ValueError("Failed to parse subtitle file.")

    transcript_segments = segment_text(transcript_text, is_source_text=False)
    source_segments = segment_text(source_content, is_source_text=True)

    if not source_segments or not transcript_segments:
        raise ValueError("One of the inputs resulted in zero valid text segments.")

    distances, indices, source_embeddings = find_matches(source_segments, transcript_segments)

    SIMILARITY_THRESHOLD = 0.5
    matched_source_indices = set()
    for i, dist in enumerate(distances):
        if dist[0] > SIMILARITY_THRESHOLD:
            matched_source_indices.add(indices[i][0])
            
    unmatched_segments = []
    unmatched_embeddings = []
    for i, segment in enumerate(source_segments):
        if i not in matched_source_indices:
            unmatched_segments.append(segment)
            unmatched_embeddings.append(source_embeddings[i])

    if unmatched_segments:
        report = analyze_and_structure_report(unmatched_segments, np.array(unmatched_embeddings), api_key)
        return report
    else:
        return {"summary": "No significant differences found.", "categories": []}