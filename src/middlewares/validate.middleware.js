const validate = (schema) => {
    return (req, res, next) => {
        try {
            let payload = req.body;

            if (typeof payload === "string") {
                try {
                    payload = JSON.parse(payload);
                } catch {
                    payload = undefined;
                }
            }

            const candidates = [
                payload,
                { body: payload, params: req.params, query: req.query },
                { ...payload, params: req.params, query: req.query }
            ];

            let lastError = null;

            for (const candidate of candidates) {
                if (!candidate || typeof candidate !== "object" || Array.isArray(candidate)) {
                    continue;
                }

                const result = schema.safeParse(candidate);
                if (result.success) {
                    req.validatedData = result.data;
                    return next();
                }

                lastError = result.error;
            }

            const issues = lastError?.issues || [];

            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: issues.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message
                }))
            });
        } catch (error) {
            return res.status(400).json({
                success: false,
                message: "Validation failed",
                errors: error.issues?.map((issue) => ({
                    path: issue.path.join("."),
                    message: issue.message
                })) || []
            });
        }
    };
};

export default validate;