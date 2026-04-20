.PHONY: dev dev-db dev-backend dev-all up down build rebuild logs shell ps clean \
        backend-logs backend-shell db-shell

# ── Development ──────────────────────────────────────────────────────────────

dev:
	docker compose -f docker-compose.dev.yml up

dev-db:
	docker compose -f docker-compose.dev.yml up mysql -d

dev-backend:
	docker compose -f docker-compose.dev.yml up mysql backend -d

dev-all:
	docker compose -f docker-compose.dev.yml up

backend-logs:
	docker compose -f docker-compose.dev.yml logs -f backend

backend-shell:
	docker compose -f docker-compose.dev.yml exec backend sh

db-shell:
	docker compose -f docker-compose.dev.yml exec mysql mysql -u appuser -papppass french_tutor

# ── Production ───────────────────────────────────────────────────────────────

up: rebuild
	docker compose up -d

down:
	docker compose down

build:
	docker compose build

rebuild:
	docker compose build --no-cache

logs:
	docker compose logs -f

shell:
	docker compose exec web sh

ps:
	docker compose ps

clean:
	docker compose down --rmi all --volumes --remove-orphans
