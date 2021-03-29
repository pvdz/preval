# Preval test case

# auto_base_assign_ident.md

> Normalize > Expressions > Bindings > Export > Auto base assign ident
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let b = 1;

export let a = (b = $(2));
$(a, b);
`````

## Pre Normal

`````js filename=intro
let b = 1;
let a = (b = $(2));
export { a };
$(a, b);
`````

## Normalized

`````js filename=intro
let b = 1;
b = $(2);
let a = b;
export { a };
$(a, b);
`````

## Output

`````js filename=intro
const tmpSSA_b = $(2);
const a = tmpSSA_b;
export { a };
$(tmpSSA_b, tmpSSA_b);
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
