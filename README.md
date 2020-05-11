# Backend Angular API Client Generator

- [Docker Image](https://hub.docker.com/repository/docker/it4kidsac/openapi-generator)

## Development
## Requirements
- Java 8
- Maven 3.6.x

## Important Files & Directories
- [Sample](./samples/client/petstore/stubi-backend-angular-api-client)
- [Templates](./modules/openapi-generator/src/main/resources/typescript-angular)
- [Codegen](./modules/openapi-generator/src/main/java/org/openapitools/codegen/languages/TypeScriptAngularClientCodegen.java)

## Getting Started
- `mvn clean package -DskipTests` in root directory
- `./bin/stubi.sh` in root directory

This generates the [sample](./samples/client/petstore/stubi-backend-angular-api-client).

Once the project was built you can test out template changes which don't require recompilation of the entire project just by executing `./bin/stubi.sh`  

## Debugging
- `./bin/stubi.sh debug` in root directory
- Run [Remote Debugger](./remote.png) in IntelliJ
