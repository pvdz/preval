# Preval test case

# auto_ident_unary_complex.md

> Normalize > Expressions > Bindings > Export > Auto ident unary complex
>
> Normalization of var decls should work the same everywhere they are

#TODO

## Input

`````js filename=intro
let x = 1;

export let a = typeof $(x);
$(a, x);
`````

## Pre Normal


`````js filename=intro
let x = 1;
let a = typeof $(x);
export { a };
$(a, x);
`````

## Normalized


`````js filename=intro
let x = 1;
const tmpUnaryArg = $(x);
let a = typeof tmpUnaryArg;
export { a };
$(a, x);
`````

## Output


`````js filename=intro
const tmpUnaryArg = $(1);
const a = typeof tmpUnaryArg;
export { a };
$(a, 1);
`````

## PST Output

With rename=true

`````js filename=intro
const a = $( 1 );
const b = typeof a;
export { b as a };
$( b, 1 );
`````

## Globals

None

## Result

Should call `$` with:
 - eval returned: ("<crash[ Unexpected token 'export' ]>")

Pre normalization calls: Same

Normalized calls: Same

Final output calls: Same
