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

            const combinedCandidate = { body: payload, params: req.params, query: req.query };
            const mergedCandidate = { ...payload, params: req.params, query: req.query };

            const candidates =
                req.method === "GET"
                    ? [req.query, req.params, payload, req.body, combinedCandidate, mergedCandidate]
                    : [
                          payload,
                          req.body,
                          req.params,
                          req.query,
                          combinedCandidate,
                          mergedCandidate
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
                errors:
                    error.issues?.map((issue) => ({
                        path: issue.path.join("."),
                        message: issue.message
                    })) || []
            });
        }
    };
};

export default validate;
