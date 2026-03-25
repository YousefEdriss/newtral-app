import requests
import os
from dotenv import load_dotenv

load_dotenv()

DEALER_SERVICE_URL = os.getenv('DEALER_SERVICE_URL', 'http://localhost:3030')
SENTIMENT_ANALYZER_URL = os.getenv('SENTIMENT_ANALYZER_URL', 'http://localhost:5050')


def get_request(endpoint, **kwargs):
    params = ""
    if kwargs:
        for key, value in kwargs.items():
            params += f"{key}={value}&"
    request_url = f"{DEALER_SERVICE_URL}{endpoint}"
    if params:
        request_url += f"?{params}"
    print(f"GET from {request_url}")
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(f"Network exception occurred: {e}")
        return None


def analyze_review_sentiments(text):
    request_url = f"{SENTIMENT_ANALYZER_URL}/analyze/{text}"
    try:
        response = requests.get(request_url)
        return response.json()
    except Exception as e:
        print(f"Sentiment analyzer exception: {e}")
        return {"sentiment": "neutral"}


def post_review(data_dict):
    request_url = f"{DEALER_SERVICE_URL}/insertReview"
    try:
        response = requests.post(request_url, json=data_dict)
        return response.json()
    except Exception as e:
        print(f"Post review exception: {e}")
        return None
