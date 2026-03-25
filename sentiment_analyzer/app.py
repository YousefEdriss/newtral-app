from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

POSITIVE_WORDS = {
    "fantastic", "great", "excellent", "wonderful", "amazing", "outstanding",
    "superb", "brilliant", "perfect", "awesome", "love", "loved", "best",
    "good", "nice", "friendly", "helpful", "recommend", "happy", "satisfied",
    "pleasant", "smooth", "efficient", "professional", "transparent", "honest",
    "knowledgeable", "above", "beyond", "pleased", "impressed", "exceptional",
}

NEGATIVE_WORDS = {
    "terrible", "awful", "horrible", "worst", "bad", "poor", "rude", "angry",
    "disappointed", "disappointing", "pushy", "hidden", "scam", "fraud",
    "unprofessional", "dishonest", "long", "wait", "avoid", "never", "waste",
    "overpriced", "regret", "unhappy", "useless", "dreadful", "disgusting",
}


def analyze(text: str) -> str:
    words = text.lower().split()
    pos_count = sum(1 for w in words if w.strip(".,!?;:'\"") in POSITIVE_WORDS)
    neg_count = sum(1 for w in words if w.strip(".,!?;:'\"") in NEGATIVE_WORDS)
    if pos_count > neg_count:
        return "positive"
    elif neg_count > pos_count:
        return "negative"
    return "neutral"


@app.route("/analyze/<text>", methods=["GET"])
def sentiment_analyzer(text):
    sentiment = analyze(text)
    return jsonify({"sentiment": sentiment, "text": text})


@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "ok"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5050, debug=True)
