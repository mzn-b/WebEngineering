# =========================
# 1) Dev stage
# =========================
FROM maven:3.9.9-eclipse-temurin-21 AS development
WORKDIR /app

# Dependencies cachen
COPY pom.xml ./
# Falls du ein Maven Wrapper benutzt (empfohlen), kannst du den auch kopieren
# COPY .mvn .mvn
# COPY mvnw mvnw
RUN mvn -B -e -DskipTests dependency:go-offline

# Source rein
COPY . .

EXPOSE 8080
# Dev run (kein echtes "Hot Reload" ohne devtools + volume, aber läuft als dev-stage)
CMD ["mvn", "-B", "-DskipTests", "spring-boot:run"]

# =========================
# 2) Build stage
# =========================
FROM maven:3.9.9-eclipse-temurin-21 AS build
WORKDIR /app

COPY pom.xml ./
RUN mvn -B -e -DskipTests dependency:go-offline
COPY . .
RUN mvn -B -DskipTests clean package

# =========================
# 3) Runtime stage
# =========================
FROM eclipse-temurin:21-jre AS production
WORKDIR /app

# Spring Boot "fat jar" (typisch im target/)
COPY --from=build /app/target/*.jar /app/app.jar

EXPOSE 8080
ENV JAVA_OPTS=""
ENTRYPOINT ["sh", "-c", "java $JAVA_OPTS -jar /app/app.jar"]
