# SMS Spam Intelligence

AI-powered SMS spam/ham detector with a modern Streamlit UI and a lightweight TensorFlow model.

> Live Demo: update this after deploy (example) → https://spam-ham-classifier-01-sayanroy001.streamlit.app
>
> Source: https://github.com/SayanRoy001/Spam-Ham-Classifier-01

## Features
- Real-time spam probability with clean, professional UI (dark theme + glassmorphism)
- NLTK preprocessing (tokenization, stopword removal, Porter stemming)
- TensorFlow/Keras sequence model using fixed-length padding (maxlen=50)
- Visual metrics and risk assessment cards (High/Moderate/Safe)
- Cached model/tokenizer loading for fast inference

## Tech Stack
- Python, TensorFlow/Keras, Streamlit, NLTK, scikit-learn, NumPy, Pandas

## Quickstart (Windows PowerShell)
```powershell
# 1) Clone
git clone https://github.com/SayanRoy001/Spam-Ham-Classifier-01.git
cd Spam-Ham-Classifier-01

# 2) (Recommended) Create & activate virtual environment
python -m venv .venv
.\.venv\Scripts\Activate.ps1

# 3) Install dependencies
pip install -r requirements.txt

# 4) Run the app
streamlit run app.py
```

Then open the local URL Streamlit prints (usually http://localhost:8501).

## Project Structure
```
app.py                   # Streamlit app entry
model.h5                 # Trained TensorFlow model (~10 MB)
tokenizer.pkl            # Fitted tokenizer
requirements.txt         # Python dependencies
Spam_SMS.csv             # Dataset (if needed locally)
```

## Deployment
- Streamlit Community Cloud
  1. Push this repo to GitHub (already done if you can see this README)
  2. Go to https://streamlit.io/cloud → New app → pick this repo/branch
  3. App file: `app.py` → Deploy
  4. Replace the "Live Demo" link above with your generated URL

- Hugging Face Spaces (optional)
  - Create a Space → SDK: Streamlit → connect your repo → deploy

## Notes
- The app expects `model.h5` and `tokenizer.pkl` in the project root.
- If you see a Streamlit progress-bar error on some versions, it is handled by casting probabilities to 0–100 integer values.

## Dataset Attribution
- Trained on the Kaggle “SMS Spam Collection” dataset.
  - https://www.kaggle.com/datasets/uciml/sms-spam-collection-dataset (or equivalent SMS spam dataset on Kaggle)

## License
- If you add a license, reference it here (e.g., MIT). Otherwise, all rights reserved.
