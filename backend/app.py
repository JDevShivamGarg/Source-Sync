from flask import Flask, request, jsonify
from flask_cors import CORS
# Assuming your main analysis logic is in a function called 'run_pipeline' in 'core.py'
from core import run_pipeline
import os
from dotenv import load_dotenv
load_dotenv()

app = Flask(__name__)

# Make sure the origin matches your React app's URL
CORS(app, resources={r"/*": {"origins": "http://localhost:8080"}})

@app.route("/analyze", methods=["POST"])
def analyze_files_sync():
    """
    Accepts files and runs the entire analysis pipeline synchronously.
    """
    api_key = os.getenv("GEMINI_API_KEY")
    
    if not api_key:
        return jsonify({"error": "API key is not configured on the server"}), 500

    if 'subtitle_file' not in request.files or 'source_file' not in request.files:
        return jsonify({"error": "Missing files"}), 400

    subtitle_file = request.files['subtitle_file']
    source_file = request.files['source_file']
    
    subtitle_content = subtitle_file.read().decode("utf-8")
    source_content = source_file.read().decode("utf-8")

    try:
        # --- CHANGE: Call the function directly, no Celery ---
        # The app will wait here until the analysis is complete.
        report = run_pipeline(subtitle_content, source_content, api_key)
        
        # --- CHANGE: Return the final report directly ---
        return jsonify(report), 200

    except Exception as e:
        # If anything goes wrong in the pipeline, return an error
        print(f"An error occurred during analysis: {e}")
        return jsonify({"error": "An internal error occurred during analysis."}), 500

if __name__ == '__main__':
    app.run(debug=True)