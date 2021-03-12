# Preval test case

# ident_ident_simple.md

> Normalize > Binding > Export-default > Ident ident simple
>
> Assignments of all kinds should be normalized in all circumstances

#TODO

## Input

`````js filename=intro
let b = 2, c = 3;
export let a = b = c;
$(a, b, c);
`````

## Pre Normal

`````js filename=intro
let b = 2,
  c = 3;
let a = (b = c);
export { a };
$(a, b, c);
`````

## Normalized

`````js filename=intro
let b = 2;
let c = 3;
b = c;
let a = b;
export { a };
$(a, b, c);
`````

## Output

`````js filename=intro
const a = 3;
export { a };
$(3, 3, 3);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
