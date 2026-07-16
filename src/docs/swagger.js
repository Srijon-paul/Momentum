import swaggerJSDoc from "swagger-jsdoc";

const options = {
	definition: {
		openapi: "3.0.0",
		info: {
			title: "Momentum API",
			version: "1.0.0",
			description: "API documentation for Momentum - Opportunities & Internships Platform"
		},
		servers: [
			{
				url: "http://localhost:4600/api/v1/",
				description: "Development server"
			},
			{
				url: "https://momentum-oi7v.onrender.com/api/v1/",
				description: "Production server"
			}
		],
		components: {
			securitySchemes: {
				bearerAuth: {
					type: "http",
					scheme: "bearer",
					bearerFormat: "JWT",
					description: "Enter JWT token"
				}
			},
			schemas: {
				// Request Schemas
				RegisterRequest: {
					type: "object",
					required: ["name", "email", "password"],
					properties: {
						name: {
							type: "string",
							minLength: 3,
							description: "User's full name",
							example: "Srijon Paul"
						},
						email: {
							type: "string",
							format: "email",
							description: "User's email address",
							example: "srijon@test.com"
						},
						password: {
							type: "string",
							minLength: 6,
							description: "Password must contain at least one special character (!@#$%^&*)",
							example: "Srijon@123"
						}
					}
				},
				LoginRequest: {
					type: "object",
					required: ["email", "password"],
					properties: {
						email: {
							type: "string",
							format: "email",
							description: "User's email address",
							example: "srijon@test.com"
						},
						password: {
							type: "string",
							description: "User's password",
							example: "Srijon@123"
						}
					}
				},
				CreateOpportunityRequest: {
					type: "object",
					required: ["title", "description", "organization", "type", "apply_url", "deadline"],
					properties: {
						title: {
							type: "string",
							minLength: 3,
							maxLength: 150,
							description: "Opportunity title",
							example: "Summer Internship - Software Development"
						},
						description: {
							type: "string",
							minLength: 20,
							maxLength: 5000,
							description: "Detailed description of the opportunity",
							example: "We are looking for talented software developers..."
						},
						organization: {
							type: "string",
							minLength: 2,
							maxLength: 100,
							description: "Organization name",
							example: "Tech Company Inc"
						},
						type: {
							type: "string",
							enum: ["INTERNSHIP", "SCHOLARSHIP", "HACKATHON", "COMPETITION", "WORKSHOP"],
							description: "Type of opportunity",
							example: "INTERNSHIP"
						},
						status: {
							type: "string",
							enum: ["OPEN", "CLOSED"],
							description: "Status of the opportunity",
							example: "OPEN"
						},
						location: {
							type: "string",
							maxLength: 100,
							description: "Optional location of the opportunity",
							example: "San Francisco, CA"
						},
						apply_url: {
							type: "string",
							format: "uri",
							description: "Application link for the opportunity",
							example: "https://example.com/apply"
						},
						start_date: {
							type: "string",
							pattern: "^\\d{1,2}/\\d{1,2}/\\d{4}$",
							description: "Start date in DD/MM/YYYY format. Must not be in the past",
							example: "15/06/2026"
						},
						deadline: {
							type: "string",
							pattern: "^\\d{1,2}/\\d{1,2}/\\d{4}$",
							description: "Deadline in DD/MM/YYYY format. Must be after start_date and not in the past",
							example: "30/06/2026"
						}
					}
				},
				UpdateOpportunityRequest: {
					type: "object",
					properties: {
						title: {
							type: "string",
							minLength: 3,
							maxLength: 150,
							description: "Opportunity title",
							example: "Summer Internship - Software Development"
						},
						description: {
							type: "string",
							minLength: 20,
							maxLength: 5000,
							description: "Detailed description of the opportunity",
							example: "We are looking for talented software developers..."
						},
						organization: {
							type: "string",
							minLength: 2,
							maxLength: 100,
							description: "Organization name",
							example: "Tech Company Inc"
						},
						type: {
							type: "string",
							enum: ["INTERNSHIP", "SCHOLARSHIP", "HACKATHON", "COMPETITION", "WORKSHOP"],
							description: "Type of opportunity",
							example: "INTERNSHIP"
						},
						status: {
							type: "string",
							enum: ["OPEN", "CLOSED"],
							description: "Status of the opportunity",
							example: "OPEN"
						},
						location: {
							type: "string",
							maxLength: 100,
							nullable: true,
							description: "Location of the opportunity",
							example: "San Francisco, CA"
						},
						apply_url: {
							type: "string",
							format: "uri",
							description: "Application link for the opportunity",
							example: "https://example.com/apply"
						},
						start_date: {
							type: "string",
							pattern: "^\\d{1,2}/\\d{1,2}/\\d{4}$",
							description: "Optional start date in DD/MM/YYYY format. If provided, it must not be in the past",
							example: "15/06/2026"
						},
						deadline: {
							type: "string",
							pattern: "^\\d{1,2}/\\d{1,2}/\\d{4}$",
							description: "Optional deadline in DD/MM/YYYY format. If provided, it must be after start_date and not in the past",
							example: "30/06/2026"
						}
					}
				},
				UpdateUserProfileRequest: {
					type: "object",
					properties: {
						name: {
							type: "string",
							minLength: 3,
							description: "User's full name",
							example: "Srijon Paul"
						},
						profile_picture_url: {
							type: "string",
							format: "uri",
							nullable: true,
							description: "URL to user's profile picture",
							example: "https://example.com/profile.jpg"
						},
						college: {
							type: "string",
							minLength: 3,
							maxLength: 60,
							nullable: true,
							description: "User's college name",
							example: "MIT"
						},
						graduation_year: {
							type: "integer",
							minimum: 2000,
							maximum: 2100,
							description: "Expected graduation year",
							example: 2026
						}
					}
				},
				// Response Schemas
				User: {
					type: "object",
					properties: {
						id: {
							type: "string",
							format: "uuid",
							description: "Unique user identifier",
							example: "550e8400-e29b-41d4-a716-446655440000"
						},
						name: {
							type: "string",
							description: "User's full name",
							example: "Srijon Paul"
						},
						email: {
							type: "string",
							format: "email",
							description: "User's email address",
							example: "srijon@test.com"
						},
						role: {
							type: "string",
							enum: ["USER", "ADMIN"],
							description: "User's role in the system",
							example: "USER"
						},
						college: {
							type: "string",
							nullable: true,
							description: "User's college name",
							example: "MIT"
						},
						graduation_year: {
							type: "integer",
							nullable: true,
							description: "Expected graduation year",
							example: 2026
						},
						profile_picture_url: {
							type: "string",
							format: "uri",
							nullable: true,
							description: "URL to user's profile picture",
							example: "https://example.com/profile.jpg"
						},
						created_at: {
							type: "string",
							format: "date-time",
							description: "Account creation timestamp",
							example: "2026-06-14T19:33:42.000Z"
						},
						updated_at: {
							type: "string",
							format: "date-time",
							description: "Last profile update timestamp",
							example: "2026-06-24T18:42:23.000Z"
						}
					}
				},
				AuthResponse: {
					type: "object",
					properties: {
						user: {
							$ref: "#/components/schemas/User"
						},
						accessToken: {
							type: "string",
							description: "JWT access token for authentication",
							example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
						},
						refreshToken: {
							type: "string",
							description: "JWT refresh token for token renewal",
							example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
						}
					}
				},
				Opportunity: {
					type: "object",
					properties: {
						id: {
							type: "string",
							format: "uuid",
							description: "Unique opportunity identifier",
							example: "550e8400-e29b-41d4-a716-446655440000"
						},
						title: {
							type: "string",
							description: "Opportunity title",
							example: "Summer Internship - Software Development"
						},
						description: {
							type: "string",
							description: "Detailed description of the opportunity",
							example: "We are looking for talented software developers..."
						},
						organization: {
							type: "string",
							description: "Organization name",
							example: "Tech Company Inc"
						},
						type: {
							type: "string",
							enum: ["INTERNSHIP", "SCHOLARSHIP", "HACKATHON", "COMPETITION", "WORKSHOP"],
							description: "Type of opportunity",
							example: "INTERNSHIP"
						},
						status: {
							type: "string",
							enum: ["OPEN", "CLOSED"],
							description: "Status of the opportunity",
							example: "OPEN"
						},
						location: {
							type: "string",
							nullable: true,
							description: "Location of the opportunity",
							example: "San Francisco, CA"
						},
						apply_url: {
							type: "string",
							format: "uri",
							description: "Application link for the opportunity",
							example: "https://example.com/apply"
						},
						start_date: {
							type: "string",
							format: "date-time",
							nullable: true,
							description: "Start date of the opportunity",
							example: "2026-06-15T00:00:00.000Z"
						},
						deadline: {
							type: "string",
							format: "date-time",
							description: "Application deadline",
							example: "2026-06-30T00:00:00.000Z"
						},
						created_by: {
							type: "string",
							format: "uuid",
							description: "ID of the admin who created this opportunity",
							example: "550e8400-e29b-41d4-a716-446655440000"
						},
						created_at: {
							type: "string",
							format: "date-time",
							description: "Creation timestamp",
							example: "2026-06-14T19:33:42.000Z"
						},
						updated_at: {
							type: "string",
							format: "date-time",
							description: "Last update timestamp",
							example: "2026-06-24T18:42:23.000Z"
						}
					}
				},
				Bookmark: {
					type: "object",
					properties: {
						id: {
							type: "string",
							format: "uuid",
							description: "Unique bookmark identifier",
							example: "550e8400-e29b-41d4-a716-446655440000"
						},
						user_id: {
							type: "string",
							format: "uuid",
							description: "ID of the user who bookmarked",
							example: "550e8400-e29b-41d4-a716-446655440000"
						},
						opportunity_id: {
							type: "string",
							format: "uuid",
							description: "ID of the bookmarked opportunity",
							example: "550e8400-e29b-41d4-a716-446655440000"
						},
						opportunity: {
							$ref: "#/components/schemas/Opportunity"
						},
						created_at: {
							type: "string",
							format: "date-time",
							description: "Bookmark creation timestamp",
							example: "2026-06-14T19:33:42.000Z"
						},
						updated_at: {
							type: "string",
							format: "date-time",
							description: "Last update timestamp",
							example: "2026-06-24T18:42:23.000Z"
						}
					}
				},
				ErrorResponse: {
					type: "object",
					properties: {
						statusCode: {
							type: "number",
							description: "HTTP status code",
							example: 400
						},
						message: {
							type: "string",
							description: "Error message",
							example: "Bad Request"
						},
						errors: {
							type: "object",
							description: "Detailed error information",
							additionalProperties: true
						}
					}
				}
			},
			responses: {
				BadRequestError: {
					description: "Bad Request - Invalid input",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse"
							},
							example: {
								statusCode: 400,
								message: "Validation failed",
								errors: {
									email: ["Invalid email format"]
								}
							}
						}
					}
				},
				UnauthorizedError: {
					description: "Unauthorized - Invalid or missing authentication token",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse"
							},
							example: {
								statusCode: 401,
								message: "Invalid token or token has expired"
							}
						}
					}
				},
				ForbiddenError: {
					description: "Forbidden - Insufficient permissions",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse"
							},
							example: {
								statusCode: 403,
								message: "You do not have permission to perform this action"
							}
						}
					}
				},
				NotFoundError: {
					description: "Not Found - Resource not found",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse"
							},
							example: {
								statusCode: 404,
								message: "Resource not found"
							}
						}
					}
				},
				InternalServerError: {
					description: "Internal Server Error",
					content: {
						"application/json": {
							schema: {
								$ref: "#/components/schemas/ErrorResponse"
							},
							example: {
								statusCode: 500,
								message: "Internal server error"
							}
						}
					}
				}
			}
		},
		tags: [
			{
				name: "Authentication",
				description: "User authentication endpoints"
			},
			{
				name: "Admin",
				description: "Admin-only endpoints for user management"
			},
			{
				name: "Opportunities",
				description: "Public opportunities endpoints"
			},
			{
				name: "Opportunities (Admin)",
				description: "Admin-only opportunities management endpoints"
			},
			{
				name: "Bookmarks",
				description: "User bookmark endpoints"
			},
			{
				name: "Users",
				description: "User profile endpoints"
			}
		]
	},
	apis: [
		"./src/modules/admin/*.js",
		"./src/modules/auth/*.js",
		"./src/modules/bookmarks/*.js",
		"./src/modules/opportunities/*.js",
		"./src/modules/users/*.js"
	]
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;