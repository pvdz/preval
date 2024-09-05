# Preval test case

# auto_ident_prop_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident prop simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let b = { c: 1 };

export let a = b.c;
$(a, b);
`````

## Pre Normal


`````js filename=intro
let b = { c: 1 };
let a = b.c;
export { a };
$(a, b);
`````

## Normalized


`````js filename=intro
let b = { c: 1 };
let a = b.c;
export { a };
$(a, b);
`````

## Output


`````js filename=intro
const a = 1;
export { a };
const b = { c: 1 };
$(1, b);
`````

## PST Output

With rename=true

`````js filename=intro
const a = 1;
export { a as a };
const b = { c: 1 };
$( 1, b );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
