# Preval test case

# auto_ident_unary_typeof_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary typeof simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = typeof arg;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = typeof arg;
export { a };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = typeof arg;
export { a };
$(a, arg);
`````

## Output


`````js filename=intro
const a = `number`;
export { a };
$(`number`, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = "number";
export { a as a };
$( "number", 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
