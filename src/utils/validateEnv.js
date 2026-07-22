const requiredEnv = [
    "DATABASE_URL",
    "CORS_ORIGINS",
    "NODE_ENV",
    "ACCESS_TOKEN_SECRET",
    "ACCESS_TOKEN_EXPIRY",
    "REFRESH_TOKEN_SECRET",
    "REFRESH_TOKEN_EXPIRY"
];

const validateEnv = () => {
    for (const variable of requiredEnv) {
        if (!process.env[variable]) {
            throw new Error(`Missing environment variable: ${variable}`);
        }
    }
};

export { validateEnv };
