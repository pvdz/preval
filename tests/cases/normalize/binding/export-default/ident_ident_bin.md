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
export let a = (b = c + d);
$(a, b, c);
`````

## Output

`````js filename=intro
let b = 2;
export let a = (b = 7);
$(a, b, 7);
`````

## Result

Should call `$` with:
 - 0: <crash[ Unexpected token 'export' ]>

Normalized calls: Same

Final output calls: Same
