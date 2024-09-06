FROM maven:3.8.4-openjdk-17-slim AS build
WORKDIR /app
COPY . .
RUN mvn clean package -DskipTests

FROM openjdk:17-slim
WORKDIR /app
COPY --from=build /app/target/komfy-0.0.1-SNAPSHOT.jar app.jar
COPY --from=build /app/uploads uploads

EXPOSE 8088
CMD ["java","-jar","app.jar"]