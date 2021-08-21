FROM maven:3.3-jdk-8 as build

COPY . /usr/src/mymaven

WORKDIR /usr/src/mymaven

RUN mvn clean install

WORKDIR /usr/src/mymaven/target/

CMD ["java", "-jar", "wwb.game-0.0.1-SNAPSHOT.jar"]
