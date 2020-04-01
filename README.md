# Stubi Backend Angular API Client Generator

- [Docker Image](https://hub.docker.com/repository/docker/it4kidsac/openapi-generator)

## Development
## Requirements
- Java 8
- Maven 3.6.x

## Important Files & Directories
- [Sample](./samples/client/petstore/stubi-backend-angular-api)
- [Templates](./modules/openapi-generator/src/main/resources/typescript-angular)
- [Codegen](./modules/openapi-generator/src/main/java/org/openapitools/codegen/languages/TypeScriptAngularClientCodegen.java)

## Getting Started
- `mvn install` in root directory
- `./bin/stubi.sh` in root directory

This generates the [Sample](./samples/client/petstore/stubi-backend-angular-api).
