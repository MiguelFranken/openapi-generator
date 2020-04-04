#!/bin/sh

executable="./modules/openapi-generator-cli/target/openapi-generator-cli.jar"

if [ ! -f "$executable" ]
then
  mvn -B clean package -DskipTests
fi

# if you've executed sbt assembly previously it will use that instead.
if [ "$#" -ne 1 ]
then
#  export JAVA_OPTS="${JAVA_OPTS} -Xmx1024M -DloggerPath=conf/log4j.properties -DdebugModels"
  export JAVA_OPTS="${JAVA_OPTS} -Xmx1024M -DloggerPath=conf/log4j.properties -DdebugOperations"
else
  export JAVA_OPTS="${JAVA_OPTS} -Xmx1024M -DloggerPath=conf/log4j.properties -Dlog.level=debug -agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005"
fi

ags="generate -i modules/openapi-generator/src/test/resources/2_0/petstore-mini.yaml -g typescript-angular -t modules/openapi-generator/src/main/resources/typescript-angular -c bin/stubi-config.json -o samples/client/petstore/stubi-backend-angular-api-client"

java $JAVA_OPTS -jar $executable $ags
