import z, {ZodTypeDef, ZodTypeAny} from 'zod';

export const createValidator = <
    Output = any,
    Def extends ZodTypeDef = ZodTypeDef,
    Input = Output
>(zSchema:z.ZodType<Output, Def, Input>) => {
    return (v:unknown): v is z.infer<typeof zSchema> => {
        return zSchema.safeParse(v).success;
    }
}


export const bufferEncodings = Object.freeze([
    'ascii',
    'utf8',
    'utf-8',
    'utf16le',
    'ucs2',
    'ucs-2',
    'base64',
    'base64url',
    'latin1',
    'binary',
    'hex'
] as const);


export function bufferEncoding(message?:string){
    return z.enum(bufferEncodings);
}

export const isBufferEncoding = createValidator(bufferEncoding());