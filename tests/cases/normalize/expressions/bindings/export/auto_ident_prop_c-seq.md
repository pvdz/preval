# Preval test case

# auto_ident_prop_c-seq.md

> Normalize > Expressions > Bindings > Export > Auto ident prop c-seq
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = { c: 1 };

export let a = (1, 2, $(b)).c;
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = { c: 1 };
let a = (1, 2, $(b)).c;
export { a };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = { c: 1 };
const tmpCompObj = $(b);
let a = tmpCompObj.c;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const b = { c: 1 };
const tmpCompObj = $(b);
const a = tmpCompObj.c;
export { a };
$(a, b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
