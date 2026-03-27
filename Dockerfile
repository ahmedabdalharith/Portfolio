# ─────────────────────────────────────────────────────────────────────────────
# Stage 1: Build React frontend
# ─────────────────────────────────────────────────────────────────────────────
FROM node:20-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci
COPY frontend/ ./
RUN npm run build

# ─────────────────────────────────────────────────────────────────────────────
# Stage 2: Build Spring Boot backend
# ─────────────────────────────────────────────────────────────────────────────
FROM maven:3.9.9-eclipse-temurin-21-alpine AS backend-build
WORKDIR /app/backend
COPY backend/pom.xml ./
RUN mvn dependency:go-offline -q
COPY backend/src ./src
RUN mvn package -DskipTests -q

# ─────────────────────────────────────────────────────────────────────────────
# Stage 3: Runtime — Spring Boot serves the React build as static files
# ─────────────────────────────────────────────────────────────────────────────
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Copy Spring Boot JAR
COPY --from=backend-build /app/backend/target/*.jar app.jar

# Copy React build into Spring Boot's static resources folder
COPY --from=frontend-build /app/frontend/dist /app/static

# H2 data directory
RUN mkdir -p /app/data

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar", "--spring.web.resources.static-locations=file:/app/static/", "--spring.mvc.static-path-pattern=/**"]
