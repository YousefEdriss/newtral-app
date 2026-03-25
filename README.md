# Best Cars Dealership

A full-stack web application for browsing car dealerships, reading reviews, and posting your own reviews. Built with Django, React, MongoDB, and Flask.

## Project Overview

**Best Cars Dealership** is an IBM Full Stack Developer Capstone project that demonstrates a microservices-based architecture:

| Service | Technology | Port |
|---------|-----------|------|
| Web Application | Django 4.2 | 8000 |
| Dealer & Review API | Express + MongoDB | 3030 |
| Sentiment Analyzer | Flask | 5050 |
| Frontend SPA | React 18 | 3000 (dev) |

## Features

- Browse all car dealerships across the US
- Filter dealers by state
- View dealer details and customer reviews
- Sentiment analysis on each review (Positive / Negative / Neutral)
- User registration and authentication
- Post reviews for any dealership
- Django admin panel for managing cars and users
- CI/CD with GitHub Actions

## Tech Stack

- **Backend:** Python, Django, Django REST Framework
- **Frontend:** React 18, React Router, Bootstrap 5
- **Database:** SQLite (Django), MongoDB (dealers/reviews)
- **Microservices:** Node.js/Express, Flask
- **DevOps:** Docker, Docker Compose, GitHub Actions
- **Deployment:** Render

## Project Structure

```
├── server/                   # Django backend
│   ├── djangoproj/           # Django project settings
│   ├── djangoapp/            # Main application
│   └── frontend/             # React frontend
│       ├── static/           # Static HTML pages
│       └── src/components/   # React components
├── database/                 # Express/MongoDB microservice
│   └── data/                 # Seed data (dealers, reviews)
├── sentiment_analyzer/       # Flask sentiment analysis service
├── .github/workflows/        # GitHub Actions CI/CD
└── docker-compose.yml        # Docker orchestration
```

## Quick Start

### Prerequisites
- Python 3.11+
- Node.js 18+
- MongoDB (or Docker)

### Run with Docker Compose

```bash
docker-compose up --build
```

### Run services individually

**Django backend:**
```bash
cd server
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**Dealer service:**
```bash
cd database
npm install
npm start
```

**Sentiment analyzer:**
```bash
cd sentiment_analyzer
pip install -r requirements.txt
python app.py
```

## API Endpoints

### Django (port 8000)
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/djangoapp/login/` | User login |
| GET | `/djangoapp/logout/` | User logout |
| POST | `/djangoapp/register/` | User registration |
| GET | `/djangoapp/get_dealers/` | All dealers |
| GET | `/djangoapp/get_dealers/<state>/` | Dealers by state |
| GET | `/djangoapp/get_dealer/<id>/` | Dealer by ID |
| GET | `/djangoapp/reviews/dealer/<id>/` | Reviews for dealer |
| POST | `/djangoapp/add_review/` | Post a review |
| GET | `/djangoapp/get_cars/` | All car makes & models |

### Dealer Service (port 3030)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/fetchDealers` | All dealers |
| GET | `/fetchDealers/:state` | Dealers by state |
| GET | `/fetchDealer/:id` | Single dealer |
| GET | `/fetchReviews` | All reviews |
| GET | `/fetchReviews/dealer/:id` | Reviews by dealer |
| POST | `/insertReview` | Insert a review |

### Sentiment Analyzer (port 5050)
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/analyze/<text>` | Analyze sentiment of text |

## Admin Panel

Access Django admin at `http://localhost:8000/admin/`

Create a superuser:
```bash
cd server
python manage.py createsuperuser
```

## Deployment

The application is deployed at: `https://bestcars-dealership.onrender.com`

## License

This project was developed as part of the IBM Full Stack Developer Professional Certificate on Coursera.
