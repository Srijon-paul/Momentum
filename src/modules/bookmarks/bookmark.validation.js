import { z } from "zod";

const bookmarkSchema = z.object({
    params: z.object({
        opportunityId: z.uuid()
    })
});

export { bookmarkSchema };
