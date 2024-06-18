import { z } from 'zod';
import 'dotenv/config';

const notEmptyStringSchema = (variableName: string) =>
    z.string().refine((val) => val.trim() !== '', {
        message: `Please set ${variableName} in .env`,
        path: [variableName],
    });

const envSchema = z.object({
    PORT: z.coerce.number().default(5123),
    WALLET_KIT_PROJECT_ID: notEmptyStringSchema('WALLET_KIT_PROJECT_ID'),
    WALLET_KIT_API_TOKEN: notEmptyStringSchema('WALLET_KIT_API_TOKEN'),
    WALLET_KIT_API_URL: notEmptyStringSchema('WALLET_KIT_API_URL').and(z.string().url()),
});

const env = envSchema.parse(process.env);

export default env;
