const fs = require('fs');
const path = require('path');


/**
 * 
 * Attempt @1
 * 
 */


// function convertSwaggerToOpenAPI(swaggerPath, outputPath) {
//   // Load the Swagger 2.0 file
//   const swaggerData = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

//   // Initialize the OpenAPI 3.0 structure
//   const openAPI = {
//     openapi: '3.0.0',
//     info: swaggerData.info,
//     servers: [
//       {
//         url: `https://${swaggerData.host || 'localhost'}${swaggerData.basePath || ''}`,
//       },
//     ],
//     paths: {},
//     components: {
//       schemas: swaggerData.definitions || {},
//       parameters: {},
//       responses: {},
//       securitySchemes: swaggerData.securityDefinitions || {},
//     },
//   };

//   // Convert paths
//   for (const [path, methods] of Object.entries(swaggerData.paths)) {
//     openAPI.paths[path] = {};
//     for (const [method, operation] of Object.entries(methods)) {
//       openAPI.paths[path][method] = {
//         summary: operation.summary,
//         description: operation.description,
//         tags: operation.tags,
//         operationId: operation.operationId,
//         parameters: operation.parameters?.map(convertParameter) || [],
//         responses: convertResponses(operation.responses),
//         requestBody: convertRequestBody(operation.parameters),
//       };
//     }
//   }

//   // Save to output file
//   fs.writeFileSync(outputPath, JSON.stringify(openAPI, null, 2));
//   console.log(`OpenAPI 3.0 spec written to: ${outputPath}`);
// }

// // Helper: Convert parameters to OpenAPI 3.0 format
// function convertParameter(param) {
//   if (param.in === 'body') return null; // Handled in requestBody
//   return {
//     name: param.name,
//     in: param.in,
//     required: param.required || false,
//     description: param.description || '',
//     schema: param.schema || { type: param.type || 'string' },
//   };
// }

// // Helper: Convert body parameters to requestBody
// function convertRequestBody(parameters) {
//   const bodyParam = parameters?.find((param) => param.in === 'body');
//   if (bodyParam) {
//     return {
//       description: bodyParam.description || '',
//       required: bodyParam.required || false,
//       content: {
//         'application/json': {
//           schema: bodyParam.schema,
//         },
//       },
//     };
//   }
//   return undefined;
// }

// // Helper: Convert responses to OpenAPI 3.0 format
// function convertResponses(responses) {
//   const result = {};
//   for (const [status, response] of Object.entries(responses)) {
//     result[status] = {
//       description: response.description || '',
//       content: {
//         'application/json': {
//           schema: response.schema || {},
//         },
//       },
//     };
//   }
//   return result;
// }

// // Run the conversion
// const swaggerFile = path.join(__dirname, 'swagger.json'); // Input Swagger file
// const outputFile = path.join(__dirname, 'openapi.json'); // Output OpenAPI file
// convertSwaggerToOpenAPI(swaggerFile, outputFile);

/**
 * 
 * Attempt @2
 * 
 */

// function convertSwaggerToOpenAPI(swaggerPath, outputPath) {
//   const swaggerData = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

//   const openAPI = {
//     openapi: '3.0.0',
//     info: swaggerData.info,
//     servers: [
//       {
//         url: `https://${swaggerData.host || 'localhost'}${swaggerData.basePath || ''}`,
//       },
//     ],
//     paths: {},
//     components: {
//       schemas: swaggerData.definitions || {}, // Convert definitions to schemas
//       parameters: {},
//       responses: {},
//       securitySchemes: swaggerData.securityDefinitions || {},
//     },
//   };

//   // Convert paths and update $ref
//   for (const [path, methods] of Object.entries(swaggerData.paths)) {
//     openAPI.paths[path] = {};
//     for (const [method, operation] of Object.entries(methods)) {
//       openAPI.paths[path][method] = {
//         summary: operation.summary,
//         description: operation.description,
//         tags: operation.tags,
//         operationId: operation.operationId,
//         parameters: operation.parameters?.map(convertParameter) || [],
//         responses: convertResponses(operation.responses),
//         requestBody: convertRequestBody(operation.parameters),
//       };
//     }
//   }

//   // Update definitions $ref paths to components.schemas
//   fixReferences(openAPI);

//   fs.writeFileSync(outputPath, JSON.stringify(openAPI, null, 2));
//   console.log(`OpenAPI 3.0 spec written to: ${outputPath}`);
// }

// function fixReferences(apiSpec) {
//   const jsonString = JSON.stringify(apiSpec);
//   const fixedString = jsonString.replace(/"#\/definitions\//g, '"#/components/schemas/');
//   return JSON.parse(fixedString);
// }

// // Helper: Convert parameters to OpenAPI 3.0 format
// function convertParameter(param) {
//   if (param.in === 'body') return null; // Handled in requestBody
//   return {
//     name: param.name,
//     in: param.in,
//     required: param.required || false,
//     description: param.description || '',
//     schema: param.schema || { type: param.type || 'string' },
//   };
// }

// // Helper: Convert body parameters to requestBody
// function convertRequestBody(parameters) {
//   const bodyParam = parameters?.find((param) => param.in === 'body');
//   if (bodyParam) {
//     return {
//       description: bodyParam.description || '',
//       required: bodyParam.required || false,
//       content: {
//         'application/json': {
//           schema: bodyParam.schema,
//         },
//       },
//     };
//   }
//   return undefined;
// }

// // Helper: Convert responses to OpenAPI 3.0 format
// function convertResponses(responses) {
//   const result = {};
//   for (const [status, response] of Object.entries(responses)) {
//     result[status] = {
//       description: response.description || '',
//       content: {
//         'application/json': {
//           schema: response.schema || {},
//         },
//       },
//     };
//   }
//   return result;
// }

// // Run the conversion
// const swaggerFile = 'swagger.json'; // Input Swagger 2.0 file
// const outputFile = 'openapi.json'; // Output OpenAPI 3.0 file
// convertSwaggerToOpenAPI(swaggerFile, outputFile);



/**
 * 
 * Attempt @3
 * 
 */
function convertSwaggerToOpenAPI(swaggerPath, outputPath) {
  const swaggerData = JSON.parse(fs.readFileSync(swaggerPath, 'utf-8'));

  const openAPI = {
    openapi: '3.0.0',
    info: swaggerData.info,
    servers: [
      {
        url: `https://${swaggerData.host || 'localhost'}${swaggerData.basePath || ''}`,
      },
    ],
    paths: {},
    components: {
      schemas: swaggerData.definitions || {},
      parameters: {},
      responses: {},
      securitySchemes: swaggerData.securityDefinitions || {},
    },
  };

  // Convert paths and update $ref
  for (const [path, methods] of Object.entries(swaggerData.paths)) {
    openAPI.paths[path] = {};
    for (const [method, operation] of Object.entries(methods)) {
      openAPI.paths[path][method] = {
        summary: operation.summary,
        description: operation.description,
        tags: operation.tags,
        operationId: operation.operationId,
        parameters: operation.parameters?.map(convertParameter).filter(Boolean) || [],
        responses: convertResponses(operation.responses),
        requestBody: convertRequestBody(operation.parameters),
      };
    }
  }

  // Update definitions $ref paths to components.schemas
  const fixedOpenAPI = fixReferences(openAPI);

  fs.writeFileSync(outputPath, JSON.stringify(fixedOpenAPI, null, 2));
  console.log(`OpenAPI 3.0 spec written to: ${outputPath}`);
}

function fixReferences(apiSpec) {
  const jsonString = JSON.stringify(apiSpec);
  const fixedString = jsonString.replace(/"#\/definitions\//g, '"#/components/schemas/');
  return JSON.parse(fixedString);
}

// Helper: Convert parameters to OpenAPI 3.0 format
function convertParameter(param) {
  if (param.in === 'body') return null; // Handled in requestBody
  return {
    name: param.name,
    in: param.in,
    required: param.required || false,
    description: param.description || '',
    schema: param.schema || { type: param.type || 'string' },
  };
}

// Helper: Convert body parameters to requestBody
function convertRequestBody(parameters) {
  const bodyParam = parameters?.find((param) => param.in === 'body');
  if (bodyParam) {
    return {
      description: bodyParam.description || '',
      required: bodyParam.required || false,
      content: {
        'application/json': {
          schema: bodyParam.schema,
        },
      },
    };
  }
  return undefined;
}

// Helper: Convert responses to OpenAPI 3.0 format
function convertResponses(responses) {
  const result = {};
  for (const [status, response] of Object.entries(responses)) {
    result[status] = {
      description: response.description || '',
      content: {
        'application/json': {
          schema: response.schema || {},
        },
      },
    };
  }
  return result;
}

// Run the conversion
const swaggerFile = path.join(__dirname, 'swagger.json'); // Input Swagger 2.0 file
const outputFile = path.join(__dirname, 'openapi.json'); // Output OpenAPI 3.0 file
convertSwaggerToOpenAPI(swaggerFile, outputFile);
