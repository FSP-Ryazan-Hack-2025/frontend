import { z } from 'zod';

export const verificationSchema = z.object({
    code: z.string().length(5, 'Код должен состоять из 6 цифр')
});

export type VerificationCodeType = z.infer<typeof verificationSchema>;
