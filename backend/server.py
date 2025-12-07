from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import nltk
import string
import numpy as np
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from nltk.corpus import stopwords
from nltk.stem.porter import PorterStemmer
import os
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

# Load model and tokenizer
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, 'model.h5')
TOKENIZER_PATH = os.path.join(BASE_DIR, 'tokenizer.pkl')

if not os.path.exists(MODEL_PATH):
    print(f"Error: Model file not found at {MODEL_PATH}")
if not os.path.exists(TOKENIZER_PATH):
    print(f"Error: Tokenizer file not found at {TOKENIZER_PATH}")

try:
    model = load_model(MODEL_PATH)
    with open(TOKENIZER_PATH, 'rb') as file:
        tokenizer = pickle.load(file)
    print("Model and tokenizer loaded successfully.")
except Exception as e:
    print(f"Error loading model/tokenizer: {e}")

# Setup NLTK resources
try:
    nltk.data.find('tokenizers/punkt')
    nltk.data.find('tokenizers/punkt_tab')
except LookupError:
    nltk.download('punkt')
    nltk.download('punkt_tab')

try:
    nltk.data.find('corpora/stopwords')
except LookupError:
    nltk.download('stopwords')

ps = PorterStemmer()

def transform_text(text):
    text = text.lower()
    text = nltk.word_tokenize(text)
    y = [i for i in text if i.isalnum()]
    y = [ps.stem(i) for i in y if i not in stopwords.words('english') and i not in string.punctuation]
    return " ".join(y)

@app.route('/api/predict', methods=['POST'])
def predict():
    try:
        data = request.json
        text = data.get('text', '')
        
        if not text:
            return jsonify({'error': 'No text provided'}), 400

        # Process and predict
        transformed_text = transform_text(text)
        sms_sequence = tokenizer.texts_to_sequences([transformed_text])
        sms_padded = pad_sequences(sms_sequence, maxlen=73)
        
        prediction = model.predict(sms_padded)
        prob = float(prediction[0][0])
        
        label = 'spam' if prob > 0.5 else 'ham'
        
        # Create explanation
        explanation = []
        words = transformed_text.split()
        for word in words:
            explanation.append({
                'token': word,
                'score': 0.1 if label == 'spam' else -0.1
            })

        response = {
            'id': str(uuid.uuid4()),
            'label': label,
            'probability': prob,
            'explanation': explanation,
            'timestamp': datetime.now().isoformat(),
            'originalText': text
        }
        
        return jsonify(response)
    except Exception as e:
        print(f"Prediction error: {e}")
        return jsonify({'error': str(e)}), 500

@app.route('/api/health', methods=['GET'])
def health():
    return jsonify({'status': 'healthy', 'model_loaded': model is not None})

if __name__ == '__main__':
    app.run(debug=True, port=5000)
