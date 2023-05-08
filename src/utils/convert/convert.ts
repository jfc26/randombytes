


export function toInt(v:any) {
    if(v === undefined || v === '' || v === null) return undefined;
    return parseInt(v);
}