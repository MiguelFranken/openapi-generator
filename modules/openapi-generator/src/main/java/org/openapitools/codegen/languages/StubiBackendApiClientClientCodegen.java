package org.openapitools.codegen.languages;

import org.openapitools.codegen.*;
import java.io.File;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class StubiBackendApiClientClientCodegen extends DefaultCodegen implements CodegenConfig {
    public static final String PROJECT_NAME = "projectName";

    static Logger LOGGER = LoggerFactory.getLogger(StubiBackendApiClientClientCodegen.class);

    public CodegenType getTag() {
        return CodegenType.CLIENT;
    }

    public String getName() {
        return "stubi-backend-api-client";
    }

    public String getHelp() {
        return "Generates a stubi-backend-api-client client.";
    }

    public StubiBackendApiClientClientCodegen() {
        super();

        outputFolder = "generated-code" + File.separator + "stubi-backend-api-client";
        modelTemplateFiles.put("model.mustache", ".zz");
        apiTemplateFiles.put("api.mustache", ".zz");
        embeddedTemplateDir = templateDir = "stubi-backend-api-client-client";
        apiPackage = File.separator + "Apis";
        modelPackage = File.separator + "Models";
        supportingFiles.add(new SupportingFile("README.mustache", "", "README.md"));
        // TODO: Fill this out.
    }
}
