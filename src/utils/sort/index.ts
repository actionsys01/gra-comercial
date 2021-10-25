
export function capitalize(string: string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}


export function comparations (a: any, b: any) {
if ( a.nome < b.nome ){
    return -1;
}
if ( a.nome > b.nome ){
    return 1;
}
return 0;
}