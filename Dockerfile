FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY komfy-backend /app/komfy-backend
RUN mvn package -f /app/komfy-backend/pom.xml

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/komfy-backend/target/komfy-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /app/komfy-backend/uploads uploads

EXPOSE 8088
CMD ["java","-jar","app.jar"]

#docker build -t komfy-spring:1.0.0 -f ./DockerfileJavaSpring .
#docker login
#create kiennguyen11/komfy-spring:1.0.0 repository on DockerHub
#docker tag komfy-spring:1.0.4 sunlight4d/komfy-spring:1.0.0
#docker push kiennguyen11/komfy-spring:1.0.0

