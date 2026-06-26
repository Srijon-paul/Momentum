import { z } from "zod";

const updateProfileSchema = z.object({
	name: z.string().trim()
	.min(3, "Name must be at least 3 characters long"),
	profile_picture: z.string().trim()
	.url("Invalid profile picture url")
	.nullable(),
	college: z.string().trim()
	.min(3, "College name must be at least 3 characters long")
	.max(60, "College name cannot exceed 60 characters")
	.nullable(),
	graduation_year: z.coerce.number()
	.int("Graduation year must be an integer")
	.min(2000, "Graduation year cannot be before 2000")
	.max(2100, "Graduation year cannot be after 2100")
});

const updateUserProfileSchema = updateProfileSchema.strict().partial();

export {
	updateUserProfileSchema
}