import {Command} from 'commander';
import * as crypto from 'node:crypto';
import { z } from 'zod';
import convert from './utils/convert';
import g from './utils/g';



function parseArgs(){
    const program = new Command();
    
    program.name('randombytes')
    .description('Random Bytes')
    .version('1.0.0')
    
    program.argument(
        '<size>',
        'The number of bytes to generate. The size must not be larger than 2**31 - 1'
    );
    
    program.option(
        '--encoding [string]',
        '[ascii, utf8, utf-8, utf16le, ucs2, ucs-2, base64, base64url, latin1, binary, hex]',
    );
    program.option(
        '--debug'
    );

    const argsObjSchema = z.object({
        args: z.tuple([
            z.preprocess(
                convert.toInt,
                z.number().int().positive().max(2**31 - 1)
            )
        ]),
        opts: z.object({
            encoding: g.bufferEncoding().default('hex')
        })
    });

    program.parse();

    const opts = {
        ...program.opts()
    };
    
    const args = [...program.processedArgs] as string[];

    if(opts.debug){
        console.group(new Date(), 'process.argv')
        console.debug(process.argv);
        console.groupEnd();
    }

    try {
        const argsObj = argsObjSchema.parse({
            args,
            opts 
        });

        if(opts.debug){
            console.group(new Date(), 'argsObj')
            console.dir(argsObj, {depth: Infinity});
            console.groupEnd();
        }

        return argsObj;
    }
    catch(e){
        if(opts.debug){
            console.group(new Date(), 'parseArgs error')
            console.error(e);
            console.groupEnd();
        }
        
        if(e instanceof z.ZodError){
            const issues = e.issues.map(item => {
                return {
                    path: item.path,
                    message: item.message,
                }
            });
            console.dir(issues, {depth: Infinity});
        }
        else {
            console.error(e);
        }
        process.exit();
    }
}


const main = () => {
    const argsObj = parseArgs();
    const result = crypto.randomBytes(argsObj.args[0]).toString(argsObj.opts.encoding);
    console.log(result);
}

main();