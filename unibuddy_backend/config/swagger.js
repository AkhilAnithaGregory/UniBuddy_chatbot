import swaggerJsDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "UniBuddy API Documentation",
            version: "1.0.0",
            description: "API documentation for UniBuddy backend"
        },
        servers: [
            { url: process.env.BASE_URL, description: "Production" },
            { url: process.env.LOCAL_BASE_URL, description: "Development" }
        ],
        components: {
            securitySchemes: {
                BearerAuth: {
                    type: "http",
                    scheme: "bearer",
                    bearerFormat: "JWT"
                }
            }
        },
        security: [
            {
                BearerAuth: []
            }
        ]
    },
    apis: ["./routes/*.js", "./swagger/*.js"],
};

const swaggerSpec = swaggerJsDoc(options);

export default { swaggerUi, swaggerSpec };
