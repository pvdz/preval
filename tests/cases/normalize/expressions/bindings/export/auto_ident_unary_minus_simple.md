# Preval test case

# auto_ident_unary_minus_simple.md

> Normalize > Expressions > Bindings > Export > Auto ident unary minus simple
>
> Normalization of var decls should work the same everywhere they are

## Input

`````js filename=intro
let arg = 1;

export let a = -arg;
$(a, arg);
`````

## Pre Normal


`````js filename=intro
let arg = 1;
let a = -arg;
export { a };
$(a, arg);
`````

## Normalized


`````js filename=intro
let arg = 1;
let a = -arg;
export { a };
$(a, arg);
`````

## Output


`````js filename=intro
const a /*:undefined*/ = undefined;
export { a };
$(-1, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = undefined;
export { a as a };
$( -1, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
