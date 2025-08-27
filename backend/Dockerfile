# Use an official Python runtime as a parent image
FROM python:3.11-slim

# Set the working directory in the container
WORKDIR /app

# Copy the requirements file into the container
COPY ./requirements.txt /app/

# Install the Python dependencies
RUN pip install --no-cache-dir -r requirements.txt

# Download the required NLTK data during the build process
RUN python -c "import nltk; nltk.download('punkt')"

# Copy the rest of your application's code into the container
COPY ./ /app/

# Gunicorn will be the entry point in production.
# This command tells Docker what to run when the container starts.
# It starts 4 worker processes for the Flask app on port 5000.
CMD ["gunicorn", "--workers", "4", "--bind", "0.0.0.0:5000", "app:app"]