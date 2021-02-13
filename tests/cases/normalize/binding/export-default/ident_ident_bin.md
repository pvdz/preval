# Preval test case

# ident_ident_bin.md

> normalize > assignment > export-default > ident_ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3, d = 4;
export let a = b = c + d;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
b = c + d;
let a = b;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 2;
let c = 3;
let d = 4;
b = c + d;
let a = b;
export { a };
$(a, b, c);
`````

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same