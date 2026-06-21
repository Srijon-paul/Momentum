import { z } from "zod";

const opportunityTypes = [
	"INTERNSHIP",
	"SCHOLARSHIP",
	"HACKATHON",
	"COMPETITION",
	"WORKSHOP"
];

const opportunityStatuses = [
	"OPEN",
	"CLOSED"
];

const createOpportunitySchema = z.object({
	title: z.string()
		.trim()
		.min(3, "Title must be at least 3 characters long")
		.max(150, "Title cannot exceed 150 characters"),

	description: z.string()
		.trim()
		.min(20, "Description must be at least 20 characters long")
		.max(5000, "Description cannot exceed 5000 characters"),

	organization: z.string()
		.trim()
		.min(2, "Organization name must be at least 2 characters long")
		.max(100, "Organization name cannot exceed 100 characters"),

	type: z.enum(opportunityTypes, {
		message: "Invalid opportunity type"
	}),

	status: z.enum(opportunityStatuses, {
		message: "Invalid opportunity status"
	}).optional(),

	location: z.string()
		.trim()
		.max(100, "Location cannot exceed 100 characters")
		.nullable()
		.optional(),

	apply_url: z.url("Invalid application link"),

	start_date: z.coerce.date()
		.optional(),

	deadline: z.coerce.date()
}).refine(
	(data) => {
		if(!data.start_date || !data.deadline) return true;
		return data.deadline > data.start_date;
	},
	{
		message: "Deadline must be after start date",
		path: ["deadline"]
	}
).refine(
	(data) => {
		if(!data.start_date) return true;
		return data.start_date >= new Date();
	},
	{
		message: "Start date cannot be in the past",
		path: ["start_date"]
	}
);

const updateOpportunitySchema = z.object({
	title: z.string()
		.trim()
		.min(3)
		.max(150)
		.optional(),

	description: z.string()
		.trim()
		.min(20)
		.max(5000)
		.optional(),

	organization: z.string()
		.trim()
		.min(2)
		.max(100)
		.optional(),

	type: z.enum(opportunityTypes).optional(),

	status: z.enum(opportunityStatuses).optional(),

	location: z.string()
		.trim()
		.max(100)
		.optional(),

	apply_url: z.url()
		.optional(),

	start_date: z.coerce.date()
		.optional(),

	deadline: z.coerce.date()
		.optional()
});

const getAllOpportunitiesSchema = z.object({
	page: z.coerce.number()
		.int()
		.min(1)
		.default(1),

	limit: z.coerce.number()
		.int()
		.min(1)
		.max(50)
		.default(5),

	search: z.string()
		.trim()
		.optional(),

	type: z.enum(opportunityTypes)
		.optional(),

	status: z.enum(opportunityStatuses)
		.optional()
});

const opportunityIdSchema = z.object({
	id: z.uuid("Invalid opportunity id")
});

export {
	createOpportunitySchema,
	updateOpportunitySchema,
	getAllOpportunitiesSchema,
	opportunityIdSchema
}