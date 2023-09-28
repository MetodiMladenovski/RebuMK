FROM maven:3.8.5-openjdk-11
RUN mvn install
VOLUME /rebumk
COPY target/uber-0.0.1-SNAPSHOT.jar uber.jar
ENTRYPOINT ["java","-jar","/uber.jar"]
