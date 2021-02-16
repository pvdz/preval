# Preval test case

# ident_bin.md

> normalize > assignment > export-default > ident_bin
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = b + c;
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
let a = b + c;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
const a = 5;
export { a };
$(5, 2, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Normalized calls: Same

Final output calls: Same
